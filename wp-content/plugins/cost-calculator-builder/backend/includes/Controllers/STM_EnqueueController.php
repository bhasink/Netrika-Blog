<?php

namespace STM_CALC\backend\includes\Controllers;

class STM_EnqueueController
{
    private static $instance = null;

    public function stm_enqueue_admin_scripts()
    {
        $page = !empty($_GET['page']) ? sanitize_text_field($_GET['page']) : null;

        if ($page && ($page === 'cost_calculator_builder' || $page === 'cost_calculator_custom') ) {

            $v = CALC_VERSION;

            wp_enqueue_script("jquery");

//            if(defined('STM_CALCULATE_PRO')) {
//                wp_enqueue_script('ccb-jq-concat', plugins_url('/frontend/js/libs/jquery.concat.js', STM_CALCULATE_PRO));
//                wp_enqueue_script('ccb-jq-ui', plugins_url('/frontend/js/libs/jquery-ui.js', STM_CALCULATE_PRO));
//            }

            wp_enqueue_style('ccb-admin', plugins_url('/frontend/css/admin.css', STM_CALCULATE), [], $v);
            wp_enqueue_style('ccb-calc-form', plugins_url('/frontend/css/calc-form.css', STM_CALCULATE), []);
            wp_enqueue_script('ccb-free-vue', plugins_url('/frontend/js/libs/vue.min.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_style('ccb-modal-css', plugins_url('/frontend/css/modal.min.css', STM_CALCULATE));
            wp_enqueue_script('ccb-modal-js', plugins_url('/frontend/js/libs/modal.min.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_style('ccb-bootstrap', plugins_url('/frontend/css/bootstrap.min.css', STM_CALCULATE));
            wp_enqueue_style('ccb-ionicons', plugins_url('/frontend/css/ionicons.min.css', STM_CALCULATE));
            wp_enqueue_style('ccb-fontawesome', plugins_url('/frontend/css/fontawesome.min.css', STM_CALCULATE));
            wp_enqueue_script('ccb-vuex', plugins_url('/frontend/js/libs/vuex.js', STM_CALCULATE), array(), time(), true);

            wp_enqueue_script('ccb-vue-resource', plugins_url('/frontend/js/libs/vue-resource.min.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-stm-show-preview', plugins_url('/frontend/js/components/stm-show-preview.js', STM_CALCULATE), array(), time(), true);

            wp_enqueue_script('ccb-vue-index', plugins_url('/frontend/dist/index.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-html', plugins_url('/frontend/js/fields/html.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-text', plugins_url('/frontend/js/fields/text.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-line', plugins_url('/frontend/js/fields/line.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-Sortable', plugins_url('/frontend/js/Sortable.min.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-total', plugins_url('/frontend/js/fields/total.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-range', plugins_url('/frontend/js/fields/range.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-checkbox', plugins_url('/frontend/js/fields/checkbox.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-quantity', plugins_url('/frontend/js/fields/quantity.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-radio-button', plugins_url('/frontend/js/fields/radio.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-drop-down', plugins_url('/frontend/js/fields/drop-down.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-draggable', plugins_url('/frontend/js/libs/vuedraggable.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-hr-component', plugins_url('/frontend/js/components/cost-line.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-condition-free', plugins_url('/frontend/js/components/ccb-condition-free.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-html-component', plugins_url('/frontend/js/components/cost-html.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-text-component', plugins_url('/frontend/js/components/cost-text.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-field-component', plugins_url('/frontend/js/components/cost-field.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-modal-component', plugins_url('/frontend/js/components/cost-modal.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-range-component', plugins_url('/frontend/js/components/cost-range.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-radio-component', plugins_url('/frontend/js/components/cost-radio.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-free-date', plugins_url('/frontend/js/components/ccb-free-datepicker.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-checkbox-component', plugins_url('/frontend/js/components/cost-checkbox.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-drop-down-component', plugins_url('/frontend/js/components/cost-drop-down.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-ccb-vue-quantity-component', plugins_url('/frontend/js/components/cost-quantity.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-vue-free-main-settings', plugins_url('/frontend/js/components/free-main-settings.js', STM_CALCULATE), array(), time(), true);
            wp_enqueue_script('ccb-form', plugins_url('/frontend/js/form.js', STM_CALCULATE), array('ccb-free-vue', 'ccb-vue-resource'), time(), true);
            wp_enqueue_script('ccb-color', plugins_url('/frontend/js/vue-color.min.js', STM_CALCULATE), array(), time(), true);

            if( $page === 'cost_calculator_custom'){
                wp_enqueue_script('ccb-fields', plugins_url('/frontend/js/components/ccb-fields.js', STM_CALCULATE), array(), time(), true);
                wp_enqueue_script('ccb-customize', plugins_url('/frontend/js/customize.js', STM_CALCULATE), array(), time(), true);
            }

            wp_enqueue_script('ccb-bundle', plugins_url('/frontend/dist/bundle.js', STM_CALCULATE), array('ccb-free-vue', 'ccb-vue-resource'), time(), true);
            wp_localize_script('ccb-bundle', 'stmCalcAdmin', array( 'siteurl' => get_option('siteurl') ));

            do_action('ccb-pro-add-admin-scripts');

            if (empty(get_option("permalink_structure"))) {
                wp_enqueue_script('ccb-permalink', plugins_url('/frontend/js/permalink.js', STM_CALCULATE), array('ccb-free-vue', 'ccb-vue-resource'), time(), true);
            }
        }
    }

    public static function stmGetInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}

