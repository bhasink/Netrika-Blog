<?php
global $recaptcha;
global $recaptcha_info;
function stm_update_or_create_post($stm_temp, $extra, $formula, $settings, $conditions, $fields = null, $styles = null)
{
    $title = is_string($extra) ? $extra : $extra[1];
    $my_post = array(
        'post_type' => 'cost-calc',
        'post_title' => $title,
        'post_status' => 'publish',
    );


    $id = wp_insert_post($my_post);
    update_post_meta($id, 'stm-name', $title);
    update_post_meta($id, 'stm-fields', $stm_temp);
    update_post_meta($id, 'stm-formula', $formula);
    update_post_meta($id, 'stm-conditions', $conditions);
    update_option('stm_ccb_form_settings_' . $id, $settings);

    if(!is_null($fields))
        update_post_meta($id, 'ccb-custom-fields', $fields);

    if(!is_null($styles))
        update_post_meta($id, 'ccb-custom-styles', $styles);

    return $id;
}


function stm_calc_get_all_posts($post_type)
{
    $args = array(
        'post_type' => $post_type,
        'posts_per_page' => -1,
        'post_status' => array('publish')
    );

    $resources = new WP_Query($args);

    $resources_json = array();

    if ($resources->have_posts()) {
        while ($resources->have_posts()) {
            $resources->the_post();
            $id = get_the_ID();
            $resources_json[$id] = get_the_title();
        }
    }

    return $resources_json;
}

function stm_sanitize_data($data)
{
    $data = json_decode(urldecode($data['data']));
    return $data;
}

function stm_sanitize_extra($data)
{
    $extra = json_decode(urldecode($data['extra']));
    $temp['name'] = $extra[1];

    return $temp;
}

function stm_calc_short_code($atts)
{
    $v = CALC_VERSION;
    wp_enqueue_script("jquery");
    wp_enqueue_script('ccb-vue', plugins_url('/frontend/js/libs/vue.min.js', STM_CALCULATE));
    wp_enqueue_script('ccb-vuex', plugins_url('/frontend/js/libs/vuex.js', STM_CALCULATE));
    wp_enqueue_style('ccb-fontawesome', plugins_url('/frontend/css/fontawesome.min.css', STM_CALCULATE));
    wp_enqueue_script('ccb-vue-resource', plugins_url('/frontend/js/libs/vue-resource.min.js', STM_CALCULATE));
    wp_enqueue_script('ccb-vue-draggable', plugins_url('/frontend/js/libs/vuedraggable.js', STM_CALCULATE));

    wp_enqueue_style('cc-bcalc-form', plugins_url('/frontend/css/calc-form.css', STM_CALCULATE), []);
    wp_enqueue_script('ccb-vue-hr-component', plugins_url('/frontend/js/components/cost-line.js', STM_CALCULATE));
    wp_enqueue_script('ccb-vue-text-component', plugins_url('/frontend/js/components/cost-text.js', STM_CALCULATE));
    wp_enqueue_script('ccb-vue-html-component', plugins_url('/frontend/js/components/cost-html.js', STM_CALCULATE));
    wp_enqueue_script('ccb-vue-range-component', plugins_url('/frontend/js/components/cost-range.js', STM_CALCULATE));
    wp_enqueue_script('ccb-vue-radio-component', plugins_url('/frontend/js/components/cost-radio.js', STM_CALCULATE));
    wp_enqueue_script('ccb-vue-quantity-component', plugins_url('/frontend/js/components/cost-quantity.js', STM_CALCULATE));
    wp_enqueue_script('ccb-vue-checkbox-component', plugins_url('/frontend/js/components/cost-checkbox.js', STM_CALCULATE));
    wp_enqueue_script('ccb-vue-drop-down-component', plugins_url('/frontend/js/components/cost-drop-down.js', STM_CALCULATE), array('jquery'));
    wp_enqueue_script('ccb-form', plugins_url('/frontend/js/form.js', STM_CALCULATE), array('jquery', 'ccb-vue', 'ccb-vue-resource'), time(), true);
    wp_enqueue_script('ccb-color', plugins_url('/frontend/js/vue-color.min.js', STM_CALCULATE), array(), time(), true);
    wp_enqueue_script('ccb-bundle', plugins_url('/frontend/dist/bundle.js', STM_CALCULATE), array('jquery', 'ccb-vue', 'ccb-vue-resource'), time(), true);
    do_action('ccb-pro-enqueue-front-scripts');

    $params = shortcode_atts(array(
        'id' => null,
    ), $atts);
    $param_id = (int)$params['id'];
    $post = get_post_meta($param_id);

    return ccb_get_template_calc($post, $param_id);
}

function ccb_get_template_calc($post, $calc_id)
{
    if (!empty($post)) {
        $totals = [];
        $f_models = [];
        $project_name = isset($post['stm-name'][0]) ? $post['stm-name'][0] : '';
        $formula = isset($post['stm-formula'][0]) ? unserialize($post['stm-formula'][0]) : [];
        $post = isset($post['stm-fields'][0]) ? unserialize($post['stm-fields'][0]) : [];

        $form = get_option('stm_ccb_form_settings_' . $calc_id);
        if(isset($form[0]['general'])) $form[0]['general']['title'] = $project_name;

        if(isset($form[0]['stripe']['publishKey']))
            wp_localize_script('ccb-bundle', 'stripeData', array( 'id' => esc_attr($form[0]['stripe']['publishKey'])));
        $parsed_form = json_encode($form);

        $titles = [
          'title' => isset( $form[0]['general']['header_title']) ? $form[0]['general']['header_title'] : '',
          'send_form_btn' => !empty($form[0]['formFields']['submitBtnText']) ? $form[0]['formFields']['submitBtnText'] : __('Submit', 'cost-calculator-builder'),

        ];

        $currency  = isset($form[0]['currency']['currency']) ? $form[0]['currency']['currency'] : '$';
        $box_style = isset($form[0]['general']['boxStyle'] ) ? $form[0]['general']['boxStyle'] : 'vertical';


        $args = [
            'currency'            => $currency,
            'num_after_integer'   => isset($form[0]['currency']['num_after_integer']) ? $form[0]['currency']['num_after_integer'] : 2,
            'decimal_separator'   => isset($form[0]['currency']['decimal_separator']) ? $form[0]['currency']['decimal_separator'] : '.',
            'thousands_separator' => isset($form[0]['currency']['thousands_separator']) ? $form[0]['currency']['thousands_separator'] : ',',
            'currency_position'   => isset($form[0]['currency']['currencyPosition']) ? $form[0]['currency']['currencyPosition'] : 'left_with_space',
        ];

        if(count($formula) > 0) {
            foreach ($formula as $item) {
                if (!empty($item)) {
                    $item['currency_settings'] = $args;
                    $f_models[] = $item;
                    $totals[] = ['label' => $item['label'], 'symbol' => $currency];
                }
            }
        }

        $conditions = apply_filters('ccb-get-conditions', $calc_id);
        $styles = !empty(get_post_meta($calc_id,'ccb-custom-styles')[0]) ? get_post_meta($calc_id,'ccb-custom-styles')[0] : \STM_CALC\backend\includes\Controllers\STM_CustomFields::custom_default_styles();
        $ccb_custom = apply_filters('ccb-custom-styles', ['id' => $calc_id, 'data' =>  $styles]);
        $defaults = !empty(get_post_meta($calc_id,'ccb-custom-styles')[0]) ? $ccb_custom['data'] : $ccb_custom['data'];

        $calc_data = ['id' => $calc_id, 'currency' => $args, 'conditions' => $conditions,  'siteurl' => home_url(), 'defaults' => $defaults, 'autoCalc' => \STM_CALC\backend\includes\Controllers\STM_Rest_Api_Callbacks::get_data($calc_id)];
        wp_localize_script('ccb-bundle', 'stmCalc_' . $calc_id, $calc_data);

        if ($box_style === 'vertical') {
            return ccb_get_vertical_template($project_name, $f_models, $post, $totals, $form, $parsed_form, $calc_id, $titles, $args);
        } elseif ($box_style) {
            return ccb_get_horizontal_template($project_name, $f_models, $post, $totals, $form, $parsed_form, $calc_id, $titles, $args);
        }

    }

    return __('No calculator was found', 'cost-calculator-builder');
}

function ccb_get_vertical_template($project_name, $f_models, $post, $totals, $form, $parsed_form, $calc_id, $titles, $args)
{

    $title = $titles['title'];
    $send_form_btn = $titles['send_form_btn'];


    $currency = $args['currency'];

    $output = '<div class="ccb-main-calc" ref="calc" data-calc-id="'. esc_attr($calc_id) .'">
                      <div style="display: none" class="ccb-main-wrapper" :class="{\'is-block\': isCalcReady}" v-if="isCalcReady">
                        <div class="form-wrapper">
		                    <div v-bind:style="styleStore[\'v-container\']" class="form-wrapper-content ccb-left-form-wrapper">';

    $i = 0;
    $descriptions = [];
    $output .= "<h3 :style=\"{color: styleStore['labels'].color, fontFamily: styleStore['labels']['font-family']}\">{$project_name}</h3>";
    $total = json_encode($f_models);


    if(count($post) > 0)
    {
        $total_id = 0;
        foreach ($post as $key => $value) {

            $data = json_encode($value);


            if ($value['type'] !== 'Total' && $value['type'] !== 'Date Picker') {

                if ($value['type'] !== 'Html' && $value['type'] !== 'Text Area' && $value['type'] !== 'Line' && $value['type'] !== 'Input') {
                    $descriptions[] = ['label' => $value['label'], 'key' => $key, 'allow_currency' => isset($value['allowCurrency']) ? $value['allowCurrency'] : 0];
                }

                $alias_data = (array)json_decode($data);
                $alias = isset($alias_data['alias']) ? $alias_data['alias'] : '';

                $output .= "<{$value['_tag']} ref=\"{$alias}\" v-on:{$value['_event']}='stmToCalculate' v-bind:calc='" . $calc_id . "'
                             :styles=\"styleStore\" v-bind:args='" . $data . "' v-bind:total='" . esc_attr($total) . "' v-bind:id=\"'{$key}'\"></{$value['_tag']}>";
            } elseif ($value['type'] === 'Date Picker') {

                $descriptions[] = ['label' => $value['label'], 'key' => $key, 'alias' => $value['alias'], 'date' => true];
                $data = (array)json_decode($data);
                $field_desc = isset($data['description']) ? $data['description'] : "";

                $output .= '<div class="ccb-inner-wrapper"><label :style="styleStore.label">' . $data['label'] . '</label><div class="ccb-date-picker">';
                $range = filter_var($value['range'], FILTER_VALIDATE_BOOLEAN) ? 'range' : '';
                $output .= "<{$value['_tag']} :style=\"styleStore['date-picker']\" v-on:change='stmCalendarField($i, $total, $key, \" " . $data['alias'] . " \", date[{$i}])' 
                    format='DD/MM/YYYY' v-model='date[{$i}]' :clearable='false' {$range} :first-day-of-week='1' confirm lang='en'></{$value['_tag']}>";

                $output .= '</div><p class="ccb-inner-description" :style="styleStore[\'description\']"><small>' . $field_desc . '</small></p></div>';
                $i++;
            }elseif($value['type'] === 'Total') {
                $totals[$total_id]['id'] = $value['_id'];
                $total_id++;
            }
        }
    }

    $output .= '</div><div class="ccb-form-right-wrapper" :style="styleStore[\'v-container\']" class="ccb-calc-description form-wrapper-content"><div>
                     <div class="ccb-total-description">
                        <ul><li :style="styleStore[\'total-summary\']" class="ccb-summary-title"><span><h4>' . $title . '</h4></span><span></span></li>';

    $descriptions_display = isset($form[0]['general']) && isset($form[0]['general']['descriptions']) ? $form[0]['general']['descriptions'] : 'show';

    if ($descriptions_display === 'show') {
        $ccb_date = 0;

        foreach ($descriptions as $desc) {
            if (!isset($desc['date'])) {

                $subject = "<li :style=\"styleStore['total-summary']\" v-if='calcTotal.length &&  calcTotal[{$desc['key']}] && !calcTotal[{$desc['key']}].hide'><span>{$desc['label']}</span>";

                if(isset($desc['allow_currency']) && $desc['allow_currency']){
                  $subject .= "<span>[left][left_with_space]{{calcTotal.length ? calcTotal[{$desc['key']}] ? currencyFormat(calcTotal[{$desc['key']}].value) : 0 : 0}}[right][right_with_space]</span>";
                }else{
                  $subject .= "<span>{{calcTotal.length ? calcTotal[{$desc['key']}] ? calcTotal[{$desc['key']}].value : 0 : 0}}</span>";
                }

                $subject .= "</li>";

                $output .= get_currency_format($desc, $currency, $args, $subject);

            } else {

                $output .= "<li :style=\"styleStore['total-summary']\">
                             <span>{$desc['label']}</span>
                             <span>
                                 {{ dateDescription[$ccb_date] ? dateDescription[{$ccb_date}].value : 0 }}
                            </span>
                           </li>";
                $ccb_date++;
            }
        }
    }

    foreach ($totals as $key => $_total) {

        $_total['id'] = !empty($_total['id']) ? $_total['id'] : 0;
        $total_subject = "<li :style=\"styleStore['total-summary']\" :class='`wrap_total_id_` + {$_total['id']} '><span class=\"ccb-summary-desc\">{$_total['label']}: </span><span :style=\"styleStore['total-button']\" class=\"ccb-summary-value\">[left][left_with_space]{{formula.length ? formula[{$key}].total : 0}}[right][right_with_space]</span></li>";
        $output .= get_currency_format(false, $currency, $args, $total_subject);
    }

    $output .= '</ul></div>';

    $has_premiums = false;
    $has_premiums = apply_filters('ccb-pro-exist', $has_premiums);


    if ($has_premiums && (is_array($form) && count($form) > 0)) {

        $contactForm = isset($form[0]['formFields']['contactFormId']) ? $form[0]['formFields']['contactFormId'] : '';
        $paypal = isset($form[0]['paypal']['enable']) ? filter_var($form[0]['paypal']['enable'], FILTER_VALIDATE_BOOLEAN) : false;
        $stripe = isset($form[0]['stripe']['enable']) ? filter_var($form[0]['stripe']['enable'], FILTER_VALIDATE_BOOLEAN) : false;
        $email = isset($form[0]['formFields']['accessEmail']) ? filter_var($form[0]['formFields']['accessEmail'], FILTER_VALIDATE_BOOLEAN) : false;
        $use_payment = isset($form[0]['formFields']['payment']) && $email ? filter_var($form[0]['formFields']['payment'], FILTER_VALIDATE_BOOLEAN) : false;
        $recaptcha_enable = isset($form[0]['recaptcha']['enable']) ? filter_var($form[0]['recaptcha']['enable'], FILTER_VALIDATE_BOOLEAN) : false;
        $wooCommerce = isset($form[0]['wooCommerce']['enable']) ? (filter_var($form[0]['wooCommerce']['enable'], FILTER_VALIDATE_BOOLEAN) && !empty($form[0]['wooCommerce']['product_id'])) : false;

        global $recaptcha;
        global $recaptcha_info;
        $recaptcha = false;
        $recaptcha_info = isset($form[0]['recaptcha']) ? $form[0]['recaptcha'] : null;

        $recaptcha_access = ($recaptcha_enable && !empty($recaptcha_info['siteKey']));

        if (!$wooCommerce || $use_payment) {
            if (!(($paypal || $stripe) && !$use_payment) && $email) {
                if (empty($contactForm)) {
                    if (count($form) > 0) {
                        $form = json_encode($form[0]);
                        $parsed_value = json_encode($recaptcha_access);

                        $id = uniqid();
                        $output .= "<div v-if='showPayPal' class=\"ccb-thanks-message\"> " . __('Thank you for your message. It has been sent. Redirecting to PayPal…', 'cost-calculator-builder') . "</div>";
                        $output .= "<div v-if='showWooCommerce' class=\"ccb-thanks-message\"> " . __('Thank you for your message. It has been sent. Redirecting to WooCommerce…', 'cost-calculator-builder') . " </div>";
                        $output .= "<div class='cbb-mt-40 form-wrapper-content form-inner-content' v-show='!nextButton' style='background: transparent'>
                                        <cost-send-form :styles='styleStore[\"submit-button\"]' id=\"{$id}\" :iteration='iteration' value=\"{$recaptcha_info['siteKey']}\" :recaptcha=\"{$parsed_value}\" v-on:send-form='sendForm' :enable='showStripe' v-bind:currency='" . json_encode($currency) . "' v-bind:field='" . esc_attr($form) . "' description='" . json_encode($descriptions) . "' :formula='formula' v-on:generate-stripe='sendFromStripe'  inline-template>
                                                                                     
                                            <form v-show='showForm' method=\"post\" class=\"form-inner-content ccb-send-form-wrapper\" style=\"background: transparent\">
                                                <fieldset v-show=\"!enable\">
                                                    <legend><span class=\"number\"><i class=\"fas fa-info\"></i></span>". __('Contact Form', 'cost-calculator-builder') ."</legend>
                                                      <p>
                                                    <label :class=\"{'fillable-fields' : sendFields[0].required, 'require-fields' : requires[0].required}\">". __('Name', 'cost-calculator-builder') .":</label>
                                                    <input type=\"text\" v-model=\"sendFields[0].value\">
                                                    </p>
                                                    <p>
                                                        <label  :class=\"{'fillable-fields' : sendFields[1].required, 'require-fields' : requires[1].required}\" >". __('Email', 'cost-calculator-builder') .":</label>
                                                        <input type=\"email\" v-model=\"sendFields[1].value\">  
                                                    </p>
                                                    <p>
                                                      <label :class=\"{'fillable-fields' : sendFields[2].required, 'require-fields' : requires[2].required}\">". __('Phone', 'cost-calculator-builder') .":</label>
                                                        <input type=\"number\"  v-model=\"sendFields[2].value\">
                                                    </p>
                                                    <p>
                                                        <label :class=\"{'fillable-fields' : sendFields[3].required, 'require-fields' : requires[3].required}\">". __('Message', 'cost-calculator-builder') .":</label>
                                                        <textarea name=\"message\" v-model=\"sendFields[3].value\"></textarea>
                                                    </p>
                                               
                                                    <div  v-if=\"Boolean(recaptcha) && Boolean(value)\" :id=\"id\" class=\"g-rec\"></div>
                                         
                                                    <p v-if=\"errorMessage || errorCaptcha\" class=\"ccb-error-message\">". __('One more fields have an error. Please check and try again!', 'cost-calculator-builder') ."</p>
                                                    <p>
                                                        <button  :style=\"styles\" type=\"submit\" @click.prevent=\"checkForm\">{$send_form_btn}</button>
                                                    </p>
                                                </fieldset>
                                                <p>                                                
                                                    <p v-if=\"successMessage || enable\" class=\"ccb-thanks-message\">". __('Thank you for your message. It has been sent.', 'cost-calculator-builder') ."</p>
                                                    <div v-show=\"enable\" id=\"stm-lms-stripe_". $calc_id ."\"></div>
                                                    <button v-show=\"enable\" type=\"submit\" @click.prevent=\"getStripe\">". __('Purchase', 'cost-calculator-builder') ."</button>
                                                </p>
                                            </form>
                                        </cost-send-form>
                                    </div>";
                        if ($recaptcha_access && !$recaptcha) {
                            ?>
                            <script>
                                var ccbCaptchaFnc = function () {
                                    setTimeout(function () {
                                        jQuery('.g-rec').each(function () {
                                            if (jQuery(this).attr('id')) {
                                                let ccb_id = grecaptcha.render(jQuery(this).attr('id'), {'sitekey': '<?php echo $recaptcha_info['siteKey']?>'});
                                                jQuery(this).data('widget_id', ccb_id);
                                            }
                                        });
                                    }, 1000);
                                }
                            </script>
                            <?php
                            echo '<script src="https://www.google.com/recaptcha/api.js?onload=ccbCaptchaFnc&render=explicit" async defer></script>';
                            $recaptcha = true;
                        }
                    }
                } else {
                    $output .= '<div v-show="!nextButton" class="ccb-contact-form7">';
                    $output .= do_shortcode('[contact-form-7 id="' . $contactForm . '"]');
                    $output .= '</div>';
                }
                $output .= "<div v-show='nextButton' class='ccb-action'><button :style='styleStore[\"submit-button\"]' @click.prevent='nextButtonCallback(". esc_attr($parsed_form) ."," . json_encode($descriptions) . ", " . json_encode($currency) . ")' class='btn btn-success'>{$send_form_btn}</div>";
            }
            $output .= '</div>';

            if (($paypal || $stripe) && !$use_payment) {

                $output .= '<div class="ccb-calc-description form-wrapper-content form-inner-content"><div class="ccb-total-description">
                        <ul id="ccb_payments"><li class="ccb-summary-title" :style="styleStore[\'total-summary\']"><span><h4 class="ccb_payment_methods">' . __('Payment Methods', 'cost-calculator-builder') . '</h4></span></li>';

                if ($form[0]['paypal']['enable']) {
                    $output .= '<li class="ccb-payment-method-paypal" :style="styleStore[\'total-summary\']"><input type="radio" v-model="paymentMethod" value="paypal" name="payment_methods" id="payment_methods_paypal"><label for="payment_methods_paypal"><i>' . __('Pay', 'cost-calculator-builder') . '</i><i>' . __('Pal', 'cost-calculator-builder') . '</i></label></li>';
                }

                if ($form[0]['stripe']['enable']) {
                    $output .= '<li class="ccb-payment-method-stripe" :style="styleStore[\'total-summary\']"><input type="radio" v-model="paymentMethod" value="stripe" name="payment_methods" id="payment_methods_stripe"><label class="payment_methods_stripe" for="payment_methods_stripe">' . __('Stripe', 'cost-calculator-builder') . '</label></li>';
                }

                $output .= '<div v-show="paymentMethod === \'stripe\'" id="stm-lms-stripe_'. $calc_id .'"></div>';
                $output .= '</ul></div></div><div class="no-methods" :class="payment.status">{{payment.message}}</div><button :style="styleStore[\'submit-button\']" class="ccb-purchase"';
                $output .= "@click.prevent='paymentMethodCallback($parsed_form, \"$project_name\")'";
                $output .= '>' . __('Purchase', 'cost-calculator-builder') . '</button>';
            }
        } else {
            $descriptions = json_encode($descriptions);
            $output .= "<div v-show='nextButton' class='ccb-action'><button :style='styleStore[\"submit-button\"]' @click.prevent='wooCommerceCallback($parsed_form,  \"$project_name\", $descriptions)' class='btn btn-success'>". __('Submit', 'cost-calculator-builder')  ."</div>";
        }
        $output .= '</div></div></div><div class="ccb-preloader-wrapper" v-show="!isCalcReady"><div class="ccb-spinner"> <div :style="styleStore.spinner"></div> <div :style="styleStore.spinner"></div> <div :style="styleStore.spinner"></div> <div :style="styleStore.spinner"></div> <div :style="styleStore.spinner"></div></div></div></div>';

    } else {
        $output .= '</div></div></div></div><div class="ccb-preloader-wrapper" v-show="!isCalcReady"><div class="ccb-spinner"> <div  :style="styleStore.spinner"></div> <div  :style="styleStore.spinner"></div> <div  :style="styleStore.spinner"></div> <div  :style="styleStore.spinner"></div> <div  :style="styleStore.spinner"></div></div></div></div>';
    }

    return $output;
}

function ccb_get_horizontal_template($project_name, $f_models, $post, $totals, $form, $parsed_form, $calc_id, $titles, $args)
{

    $title = $titles['title'];
    $send_form_btn = $titles['send_form_btn'];

    $currency = $args['currency'];

    $output = '<div class="ccb-main-calc ccb-main-horizontal" ref="calc" data-calc-id="'. esc_attr($calc_id) .'">
                      <div class="ccb-main-wrapper" style="display: none" :class="{\'is-block\': isCalcReady}" v-if="isCalcReady">
                        <div class="form-wrapper">
		                    <div class="form-wrapper-content ccb-left-form-wrapper">';

    $output .= '<div class="ccb-horizontal-calc-wrapper" :style="styleStore[\'h-container\']">';

    $i = 0;
    $count = 0;
    $descriptions = [];
    $output .= "<h3 :style=\"{color: styleStore['labels'].color, fontFamily: styleStore['labels']['font-family']}\">{$project_name}</h3>";
    $total = json_encode($f_models);
    $output .= '<div id="ccb-horizontal-main">';

    foreach ($post as $key => $value) {
        $data = json_encode($value);
        if ($value['type'] !== 'Total' && $value['type'] !== 'Date Picker') {

            if ($value['type'] !== 'Html' && $value['type'] !== 'Text Area' && $value['type'] !== 'Line' && $value['type'] !== 'Input') {
                $descriptions[] = ['label' => $value['label'], 'key' => $key, 'allow_currency' => isset($value['allowCurrency']) ? $value['allowCurrency'] : 0];
            }

            $alias_data = (array)json_decode($data);
            $alias = isset($alias_data['alias']) ? $alias_data['alias'] : '';

            $output .= "<{$value['_tag']} ref=\"{$alias}\" v-on:{$value['_event']}='stmToCalculate' v-bind:calc='" . $calc_id . "' 
                              :styles='styleStore' v-bind:args='" . $data . "' v-bind:total='" . esc_attr($total) . "' v-bind:id=\"'{$key}'\"></{$value['_tag']}>";
        } elseif ($value['type'] === 'Date Picker') {

            $descriptions[] = ['label' => $value['label'], 'key' => $key, 'alias' => $value['alias'], 'date' => true];
            $data = json_decode($data);
            $data = (array)$data;

            $field_desc = isset($data['description']) ? $data['description'] : "";

            $output .= '<div class="ccb-inner-wrapper"><label :style=\'styleStore.label\'>' . esc_attr($data['label']) . '</label><div class="ccb-date-picker">';
            $range = filter_var($value['range'], FILTER_VALIDATE_BOOLEAN) ? 'range' : '';
            $output .= "<{$value['_tag']} :style=\"styleStore['date-picker']\"  v-on:change='stmCalendarField($i, $total, $key, \" " . esc_attr($data['alias']) . " \", date[{$i}])' 
                    format='DD/MM/YYYY' v-model='date[{$i}]' :clearable='false' {$range} :first-day-of-week='1' confirm lang='en'></{$value['_tag']}>";

            $output .= '</div><p class="ccb-inner-description" :style="styleStore[\'description\']"><small>' . $field_desc . '</small></p></div>';
            $i++;
        }
        $count++;
    }

    $output .= '</div></div><div class="ccb-horizontal-calc-wrapper" :style="styleStore[\'h-container\']"><div id="ccb-horizontal-total-summary"><ul><li class="ccb-horizontal-summary-title"><span><h4>' . $title . '</h4></span><span></span></li>';
    $ccb_date = 0;

    $descriptions_display = isset($form[0]['general']) && isset($form[0]['general']['descriptions']) ? $form[0]['general']['descriptions'] : 'show';
    if ($descriptions_display === 'show') {

        foreach ($descriptions as $desc) {

            if (!isset($desc['date'])) {

                $subject = "<li class='ccb-horizontal-summary-list' :style=\"styleStore['total-summary']\"><span>{$desc['label']}</span>";

                if(isset($desc['allow_currency']) && $desc['allow_currency']){
                    $subject .= "<span>[left][left_with_space]{{calcTotal.length ? calcTotal[{$desc['key']}] ? currencyFormat(calcTotal[{$desc['key']}].value) : 0 : 0}}[right][right_with_space]</span>";
                }else{
                    $subject .= "<span>{{calcTotal.length ? calcTotal[{$desc['key']}] ? calcTotal[{$desc['key']}].value : 0 : 0}}</span>";
                }

                $subject .= "</li>";

                $output .= get_currency_format($desc, $currency, $args, $subject);

            } else {
                $output .= "<li :style=\"styleStore['total-summary']\" class='ccb-horizontal-summary-list' v-if='calcTotal.length &&  calcTotal[{$desc['key']}] && !calcTotal[{$desc['key']}].hide'>
                             <span>{$desc['label']}</span>
                             <span>
                                {{ dateDescription[$ccb_date] ? dateDescription[{$ccb_date}].value : 0 }}
                            </span>
                           </li>";
                $ccb_date++;
            }
        }
    }

    foreach ($totals as $key => $_total) {
        $output .= "<li class='ccb-horizontal-summary-list'><span><b>{$_total['label']}:</b></span><span :style=\"styleStore['total-button']\" class=\"ccb-summary-value\">{$_total['symbol']} {{formula.length ? formula[{$key}].total : 0}}</span></li>";
    }

    $output .= '</ul>';
    $has_premiums = false;
    $has_premiums = apply_filters('ccb-pro-exist', $has_premiums);

    if ($has_premiums && count($form) > 0) {

        $contactForm = $form[0]['formFields']['contactFormId'];
        $paypal = filter_var($form[0]['paypal']['enable'], FILTER_VALIDATE_BOOLEAN);
        $stripe = filter_var($form[0]['stripe']['enable'], FILTER_VALIDATE_BOOLEAN);
        $email = filter_var($form[0]['formFields']['accessEmail'], FILTER_VALIDATE_BOOLEAN);
        $use_payment = isset($form[0]['formFields']['payment']) ? filter_var($form[0]['formFields']['payment'], FILTER_VALIDATE_BOOLEAN) : false;
        $recaptcha_enable = filter_var($form[0]['recaptcha']['enable'], FILTER_VALIDATE_BOOLEAN);
        $wooCommerce = (filter_var($form[0]['wooCommerce']['enable'], FILTER_VALIDATE_BOOLEAN) && !empty($form[0]['wooCommerce']['product_id']));

        global $recaptcha;
        global $recaptcha_info;
        $recaptcha = false;
        $recaptcha_info = $form[0]['recaptcha'];
        $recaptcha_access = ($recaptcha_enable && !empty($recaptcha_info['siteKey']));

        if (!$wooCommerce || $use_payment) {
            if (!(($paypal || $stripe) && !$use_payment) && $email) {
                if (empty($contactForm)) {
                    if (count($form) > 0) {
                        $form = json_encode($form[0]);
                        $parsed_value = json_encode($recaptcha_access);
                        $id = uniqid();
                        $output .= "<div class='cbb-mt-40 form-wrapper-content form-inner-content' v-show='!nextButton' style='background: transparent'>
                                    <cost-send-form :styles='styleStore[\"submit-button\"]' id=\"{$id}\" :iteration='iteration' value=\"{$recaptcha_info['siteKey']}\" :recaptcha=\"{$parsed_value}\" v-on:send-form='sendForm' :enable='showStripe' v-bind:currency='" . json_encode($currency) . "' v-bind:field='" . esc_attr($form) . "' description='" . json_encode($descriptions) . "' :formula='formula' v-on:generate-stripe='sendFromStripe'  inline-template>
                                        <form v-show='showForm' method=\"post\" class=\"form-inner-content ccb-send-form-wrapper\" style=\"background: transparent\">
                                            <fieldset v-show=\"!enable\">
                                                 <legend><span class=\"number\"><i class=\"fas fa-info\"></i></span>". __('Contact Form', 'cost-calculator-builder') ."</legend>
                                              
                                                <p>
                                                    <label :class=\"{'fillable-fields' : sendFields[0].required, 'require-fields' : requires[0].required}\">". __('Name', 'cost-calculator-builder') .":</label>
                                                    <input type=\"text\" v-model=\"sendFields[0].value\">
                                                </p>
                                                <p>
                                                    <label  :class=\"{'fillable-fields' : sendFields[1].required, 'require-fields' : requires[1].required}\" >". __('Email', 'cost-calculator-builder') .":</label>
                                                    <input type=\"email\" v-model=\"sendFields[1].value\">  
                                                </p>
                                                <p>
                                                  <label :class=\"{'fillable-fields' : sendFields[2].required, 'require-fields' : requires[2].required}\">". __('Phone', 'cost-calculator-builder') .":</label>
                                                    <input type=\"number\"  v-model=\"sendFields[2].value\">
                                                </p>
                                                <p>
                                                    <label :class=\"{'fillable-fields' : sendFields[3].required, 'require-fields' : requires[3].required}\">". __('Message', 'cost-calculator-builder') .":</label>
                                                    <textarea name=\"message\" v-model=\"sendFields[3].value\"></textarea>
                                                </p>
                                                <div  v-if=\"Boolean(recaptcha) && Boolean(value)\" :id=\"id\" class=\"g-rec\"></div>
               
                                                <p v-if=\"errorMessage || errorCaptcha\" class=\"ccb-error-message\">". __('One more fields have an error. Please check and try again!', 'cost-calculator-builder') ."</p>                                                                           
                                                <p>       
                                                     <button  :style=\"styles\" type=\"submit\" @click.prevent=\"checkForm\">{$send_form_btn}</button>
                                                </p>
                                            </fieldset>
                                                <p>
                                                    <p v-if=\"successMessage || enable\" class=\"ccb-thanks-message\">". __('Thank you for your message. It has been sent.', 'cost-calculator-builder') ."</p>
                                                    <div v-show=\"enable\" id=\"stm-lms-stripe_". $calc_id ."\"></div>
                                                    <button v-show=\"enable\" type=\"submit\" @click.prevent=\"getStripe\">". __('Purchase', 'cost-calculator-builder') ."</button>
                                                </p>
                                        </form>
                                    </cost-send-form></div>";

                        if ($recaptcha_access && !$recaptcha) {
                            ?>
                            <script>
                                var ccbCaptchaFnc = function () {
                                    setTimeout(function () {
                                        jQuery('.g-rec').each(function () {
                                            if (jQuery(this).attr('id')) {
                                                let ccb_id = grecaptcha.render(jQuery(this).attr('id'), {'sitekey': '<?php echo $recaptcha_info['siteKey']?>'});
                                                jQuery(this).data('widget_id', ccb_id);
                                            }
                                        });
                                    }, 1000);
                                }
                            </script>
                            <?php
                            echo '<script src="https://www.google.com/recaptcha/api.js?onload=ccbCaptchaFnc&render=explicit" async defer></script>';
                            $recaptcha = true;
                        }
                    }
                } else {
                    $output .= '<div v-show="!nextButton" class="ccb-horizontal-contact-form7 ccb-contact-form7">';
                    $output .= do_shortcode('[contact-form-7 id="' . $contactForm . '"]');
                    $output .= '</div>';
                }

                $output .= "<div v-show='nextButton' class='ccb-action' :class=\"{'next-button-active': nextButton}\"><button :style='styleStore[\"submit-button\"]' @click.prevent='nextButtonCallback(". esc_attr($parsed_form) ."," . json_encode($descriptions) . ", " . json_encode($currency) . ")' class='btn btn-success'>{$send_form_btn}</div>";

            }
            if (($paypal || $stripe) && !$use_payment) {

                $output .= '<div class="ccb-calc-description form-wrapper-content form-inner-content"><div class="ccb-total-description">
                        <ul id="ccb_payments"><li class="ccb-summary-title" :style="styleStore[\'total-summary\']"><span><h4 class="ccb_payment_methods">' . __('Payment Methods', 'cost-calculator-builder') . '</h4></span></li>';

                if ($form[0]['paypal']['enable']) {
                    $output .= '<li class="ccb-payment-method-paypal" :style="styleStore[\'total-summary\']"><input type="radio" v-model="paymentMethod" value="paypal" name="payment_methods" id="payment_methods_paypal"><label for="payment_methods_paypal"><i>' . __('Pay', 'cost-calculator-builder') . '</i><i>' . __('Pal', 'cost-calculator-builder') . '</i></label></li>';
                }

                if ($form[0]['stripe']['enable']) {
                    $output .= '<li class="ccb-payment-method-stripe" :style="styleStore[\'total-summary\']"><input type="radio" v-model="paymentMethod" value="stripe" name="payment_methods" class="payment_methods_stripe" id="payment_methods_stripe"><label for="payment_methods_stripe">' . __('Stripe', 'cost-calculator-builder') . '</label></li>';
                }

                $output .= '<div v-show="paymentMethod === \'stripe\'" id="stm-lms-stripe_'. $calc_id .'"></div>';
                $output .= '</ul></div></div><div class="no-methods" :class="payment.status">{{payment.message}}</div><button :style="styleStore[\'submit-button\']" class="ccb-purchase"';
                $output .= "@click.prevent='paymentMethodCallback($parsed_form, \"$project_name\")'";
                $output .= '>' . __('Purchase', 'cost-calculator-builder') . '</button>';
            }
        } else {
            $descriptions = json_encode($descriptions);
            $output .= "<div v-show='nextButton' class='ccb-action' :class=\"{'next-button-active': nextButton}\"><button :style='styleStore[\"submit-button\"]' @click.prevent='wooCommerceCallback($parsed_form,  \"$project_name\", $descriptions)' class='btn btn-success'>". __('Submit', 'cost-calculator-builder')  ."</div>";
        }
    }
    $output .= '</div></div></div></div></div><div class="ccb-preloader-wrapper" v-show="!isCalcReady"><div class="ccb-spinner"><div  :style="styleStore.spinner"></div> <div  :style="styleStore.spinner"></div> <div :style="styleStore.spinner"></div> <div :style="styleStore.spinner"></div> <div :style="styleStore.spinner"></div></div></div></div>';

    return $output;
}

add_shortcode('stm-calc', 'stm_calc_short_code');

function ccb_sanitize_array($items)
{
    $items = (array)$items;
    foreach ($items as $key => $val) {
        if (!is_array($val))
            $items[$key] = sanitize_text_field($val);
        else {
            $val = (array)$val;
            foreach ($val as $k => $v) {
                if (!is_array($v))
                    $items[$key][$k] = sanitize_text_field($v);
                else
                    $items[$key][$k] = ccb_sanitize_array($v);
            }
        }
    }
    return $items;
}

function ccb__sanitize_array($items)
{
    foreach ($items as $key => $val) {
        if (!is_array($val))
            $val = sanitize_text_field($val);
        else {
            foreach ($val as $k => $v) {
                if (!is_array($v))
                    $v = sanitize_text_field($v);
                else
                    $v = ccb_sanitize_array($v);
            }
        }
    }
    return $items;
}

function get_currency_format($desc, $currency, $args, $subject)
{
    $currency_position = $args['currency_position'];

    if( $desc ){
        $symbol = isset($desc['allow_currency']) && boolval($desc['allow_currency']) ? $currency : '';
        $currency = $symbol ? $currency : false;

        if( !$currency ) {
            $replacement = ['[left]' ,'[right]', '[right_with_space]', '[left_with_space]'];
            return str_replace($replacement, '', $subject);
        }
    }


    if ($currency_position === 'left') {
        $output = str_replace('[left]', $currency, $subject);
        $output = str_replace(['[right]', '[right_with_space]', '[left_with_space]'], '', $output);
    } elseif ( $currency_position === 'right' ) {
        $output = str_replace('[right]', $currency, $subject);
        $output = str_replace(['[left]', '[right_with_space]', '[left_with_space]'], '', $output);
    } elseif ( $currency_position === 'right_with_space' ) {
        $output = str_replace('[right_with_space]', ' ' . $currency, $subject);
        $output = str_replace(['[left]', '[right]', '[left_with_space]'], '', $output);
    } else {
        $output = str_replace('[left_with_space]', $currency . ' ', $subject);
        $output = str_replace(['[left]', '[right]', '[right_with_space]'], '', $output);
    }


    return $output;
}

function ccb_all_calculators()
{
    $lists = array(esc_html__('select', 'cost-calculator-builder') => 'Select');
    $args = array(
        'post_type' => 'cost-calc',
        'posts_per_page' => -1,
        'post_status' => 'publish',
    );
    $data = new \WP_Query( $args );
    $data = $data->posts;

    if(count($data) > 0)
        foreach ($data as $value)
            $lists[$value->ID] = $value->post_title;

    return $lists;
}