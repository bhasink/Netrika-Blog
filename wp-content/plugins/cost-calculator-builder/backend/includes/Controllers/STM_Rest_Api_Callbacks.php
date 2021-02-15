<?php

namespace STM_CALC\backend\includes\Controllers;

class STM_Rest_Api_Callbacks
{
    public function stm_save_styles_callback($data)
    {
        $params = $data->get_json_params();

        $id     = $params['id'];
        $styles = $params['styles'];
        $fields = $params['fields'];

        update_post_meta($id, 'CCB_UPDATE', true);
        update_post_meta($id,'ccb-custom-styles', ccb_sanitize_array($styles));
        update_post_meta($id,'ccb-custom-fields', ccb_sanitize_array($fields));

        wp_send_json(['success' => true, 'message' => 'styles saved successfully']);
    }

    public function stm_edit_existing_callback($data)
    {
        $params = $data->get_json_params();

        $id = $params['id'];
        $post = get_post_meta($id);
        $formula = !empty($post['stm-formula'][0]) ? unserialize($post['stm-formula'][0]) : [];

        $styles   =  !empty(get_post_meta($id, 'ccb-custom-styles')[0]) ? apply_filters('ccb-custom-styles', ['data' => get_post_meta($id, 'ccb-custom-styles')[0], 'id' => $id])  : apply_filters('ccb-custom-styles', ['data' => STM_CustomFields::custom_default_styles(), 'id' => $id]) ;
        $defaults =  !empty(get_post_meta($id, 'ccb-custom-fields')[0]) ? apply_filters('ccb-custom-fields', ['data' => get_post_meta($id, 'ccb-custom-fields')[0], 'id' => $id])  : apply_filters('ccb-custom-fields', ['data' => STM_CustomFields::custom_fields(), 'id' => $id]) ;

//        delete_post_meta($id,'CCB_UPDATE');
        if(empty(get_post_meta($id,'CCB_UPDATE')[0]) && isset($styles['data']['range-button']) && isset($styles['data']['range-button'])) {
            $_data = STM_CustomFields::custom_default_styles();

            $styles['data']['radio-button'] = $_data['radio-button'];
            if(isset($defaults['data']['radio-button']))
                $defaults['data']['radio-button'] = STM_CustomFields::custom_fields()['radio-button'];

            $styles['data']['checkbox'] = $_data['checkbox'];
            if(isset($defaults['data']['checkbox']))
                $defaults['data']['checkbox'] = STM_CustomFields::custom_fields()['checkbox'];
        }

        if (!empty($post)) {
            $temp['id'] = $id;
            $temp['project_name'] = get_the_title($id);
            $temp['field'] = !empty($post['stm-fields'][0]) ? unserialize($post['stm-fields'][0]) : [];
            $temp['defaults'] = isset($styles['data'][0]) ? $styles['data'][0] : $styles['data'];
            $temp['custom_fields'] = $defaults['data'];
            $temp['settings'] = get_option('stm_ccb_form_settings_' . $id);

            $conditions = get_post_meta($id, 'stm-conditions');

            wp_send_json(['success' => true, 'message' => ['field' => $temp, 'formula' => $formula, 'conditions' => $conditions]]);
        } else {
            wp_send_json(['success' => false, 'message' => 'post not found']);
        }

    }

    public static function stm_demo_import_custom_callback() {
        $result = [
            'message' => [],
            'success' => false,

        ];

        $files = $_FILES;

        if(!empty($files['file']) && file_exists($files['file']['tmp_name'])){
            $content = file_get_contents($files['file']['tmp_name']);
            $content = is_string($content) ? json_decode($content) : $content;

            if(is_array($content)){
                $content = ccb__sanitize_array($content);
                $result['success'] = true;
                $result['message']['calculators'] = count($content);
                $content = json_encode($content);
                update_option('ccb_demo_import_content', sanitize_text_field($content));
            }
        }

        wp_send_json($result);
    }

    public function stm_demo_import_run_callback() {
        $result = [
            "success" => true,
            "step" => null,
            "key" => 0,
        ];

        $request_body = file_get_contents('php://input');
        $request_data = json_decode($request_body, true);



        $file_name = "cost_calculator_data.txt";
        $file      = STM_CALCULATE_PATH."/demo-sample/".$file_name;

        if(isset($request_data['step']) && isset($request_data['key'])){
            $result['step'] = $request_data['step'];
            $result['key']  = $request_data['key'];

            $contents = null;
            $result['success'] = false;

            if(file_exists($file) && empty($request_data['is_custom_import'])){

                $contents = file_get_contents($file);
                $contents = json_decode($contents, true);

            } elseif(!empty($request_data['is_custom_import']) && !empty(get_option('ccb_demo_import_content'))) {
                $contents = get_option('ccb_demo_import_content');
                $contents = is_string($contents) ? json_decode($contents) : $contents;
            }

            $contents = json_decode(json_encode($contents), true);
            $item = $contents[$result['key']];

            if(!empty($item['stm-fields']) && count($item['stm-fields']) > 0) {

                $title = !empty($item['stm-name']) ? sanitize_text_field($item['stm-name']) : 'empty';
                $my_post = array(
                    'post_type' => 'cost-calc',
                    'post_title' => $title,
                    'post_status' => 'publish',
                );

                $id = wp_insert_post($my_post);

                $item['stm-fields'] = isset($item['stm-fields']) ? (array) $item['stm-fields']: [];
                $item['stm-formula'] = isset($item['stm-formula']) ? (array) $item['stm-formula'] : [];
                $item['stm-conditions'] = isset($item['stm-conditions']) ? (array) $item['stm-conditions'] : [];
                $item['ccb-custom-fields'] = isset($item['ccb-custom-fields']) ? (array) $item['ccb-custom-fields'] : [];
                $item['ccb-custom-styles'] = isset($item['ccb-custom-styles']) ? (array) $item['ccb-custom-styles'] : [];

                update_post_meta($id, 'stm-fields', $item['stm-fields']);
                update_post_meta($id, 'stm-formula', $item['stm-formula']);
                update_post_meta($id, 'stm-conditions',  $item['stm-conditions']);
                update_post_meta($id, 'ccb-custom-fields', $item['ccb-custom-fields']);
                update_post_meta($id, 'ccb-custom-styles',  $item['ccb-custom-styles']);
                update_post_meta($id, 'stm-name', isset($item['stm-name']) ? sanitize_text_field($item['stm-name']) : 'empty');


                $item['stm_ccb_form_settings'] = (array)$item['stm_ccb_form_settings'];
                update_option('stm_ccb_form_settings_' . $id, $item['stm_ccb_form_settings']);

                $result['key']++;
                $result['data'] = "Create Calculator: " . $title;
                $result['success'] = true;
            }
        }

        wp_send_json($result);
    }

    public function stm_demo_import_callback() {

        $file_name = "cost_calculator_data.txt";
        $file      = STM_CALCULATE_PATH."/demo-sample/".$file_name;
        $info_data = [];

        if(file_exists($file)){
            $contents = file_get_contents($file);
            $contents = json_decode($contents, true);
            $info_data['calculators'] = count($contents);
        }

        wp_send_json($info_data);
    }

    public function stm_duplicate_calc_callback($data)
    {
        $response = [
            'calculators' => [],
            'success' => false,
            'message' => 'Invalid id',
        ];

        $params = $data->get_json_params();
        $id = $params['id'];

        if (!empty($id)) {
            $post = get_post_meta($id);
            $title = get_the_title($id);
            $fields = unserialize($post['stm-fields'][0]);
            $formula = unserialize($post['stm-formula'][0]);
            $settings = get_option('stm_ccb_form_settings_' . $id);
            $styles   = unserialize($post['ccb-custom-styles'][0]);
            $custom   = unserialize($post[ 'ccb-custom-fields'][0]);
            $conditions = unserialize($post['stm-conditions'][0]);

            stm_update_or_create_post($fields, $title, $formula, $settings, $conditions, $custom, $styles);

            $main = [];
            foreach (stm_calc_get_all_posts('cost-calc') as $key => $value) {
                $temp = [];
                $post = get_post_meta($key);
                $temp['id'] = $key;
                $temp['project_name'] = !empty($value) ? $value : 'name is empty';
                $temp['field'] = unserialize($post['stm-fields'][0]);
                $main[] = $temp;
            }


            $response['success'] = true;
            $response['calculators'] = $main;
            $response['message'] = 'Post duplicated successfully';
        }

        wp_send_json($response);
        die();
    }

    public function stm_remove_existing_callback($data)
    {
        $params = $data->get_json_params();
        wp_delete_post($params['id']);
        delete_post_meta($params['id'], 'cost-calc');
        wp_send_json(['success' => true, 'message' => $params]);
    }

    public function stm_get_listing_callback()
    {
        // getting woo products
        $all_products = [];
        $all_products = apply_filters('ccb_getting_woo_products', $all_products);

        // getting contact forms 7
        $forms[] = ['ID' => '', 'title' => 'Contact-form 7 not found'];
        $forms = apply_filters('ccb_getting_contact_forms', $forms);

        // getting all the calculators
        $main = [];
        $calc_posts = stm_calc_get_all_posts('cost-calc');
        foreach ($calc_posts as $key => $value) {
            $temp = [];
            $post = get_post_meta($key);
            $temp['id'] = $key;
            $temp['project_name'] = !empty($value) ? $value : 'name is empty';
            $temp['field'] = !empty($post['stm-fields'][0]) ? unserialize($post['stm-fields'][0]) : [];
            $main[] = $temp;
        }

        wp_send_json(['success' => true, 'message' => ['main' => $main, 'forms' => $forms, 'products' => $all_products]]);
    }

    public function stm_auto_calc($data) {

        $result = ['success' => false, 'message' => 'post auto calc not found'];
        $post = self::get_data($data['id']);
        if(!empty($post)){
            $result['success'] = true;
            $result['message'] = $post;
        }

        wp_send_json($result);
    }

    public static function get_data($id)
    {
        $post = get_post_meta($id);
        $form = get_option('stm_ccb_form_settings_' . $id);

        $args = [
            'currency' => isset($form[0]['currency']['currency']) ? $form[0]['currency']['currency'] : '$',
            'num_after_integer' => isset($form[0]['currency']['num_after_integer']) ? $form[0]['currency']['num_after_integer'] : 2,
            'decimal_separator' => isset($form[0]['currency']['decimal_separator']) ? $form[0]['currency']['decimal_separator'] : '.',
            'thousands_separator' => isset($form[0]['currency']['thousands_separator']) ? $form[0]['currency']['thousands_separator'] : ',',
            'currency_position' => isset($form[0]['general']['currencyPosition']) ? $form[0]['general']['currencyPosition'] : 'left_with_space',
        ];

        if (!empty($post) && isset($post['stm-fields'])) {
            $post['stm-fields'] = unserialize($post['stm-fields'][0]);

            foreach ($post['stm-formula'] as $key => $value) {
                $post['stm-formula'] = unserialize($value);
            }

            $total_index = 0;
            foreach ( $post['stm-fields'] as $key => $value) {
                if(!empty($value['_tag']) && $value['_tag'] === 'cost-total' && isset($post['stm-formula'][$total_index])) {
                    $post['stm-formula'][$total_index++]['id'] = $value['_id'];
                }
            }

            $post['currency_settings'] = $args;
            $post['stm-conditions'] = get_post_meta($id, 'stm-conditions');
            return $post;
        }

        return [];
    }

    public function stm_save_calc($data)
    {
        $params = $data->get_json_params();
        $formula = (isset($params['formula'])) ? $params['formula'] : [];
        $extra = (isset($params['extraInfo'])) ? $params['extraInfo'] : [];
        $settings = (isset($params['settings'])) ? $params['settings'] : [];
        $data = (isset($params['readyFields'])) ? $params['readyFields'] : [];
        $conditions = isset($params['conditions']) ? $params['conditions'] : [];

        $calc_posts = stm_calc_get_all_posts('cost-calc');

        if (empty($calc_posts) || empty($extra[0])) {
            $id = stm_update_or_create_post(
                ccb__sanitize_array($data),
                apply_filters('ccb-sanitize-data', $extra),
                apply_filters('ccb-sanitize-data', $formula),
                apply_filters('ccb-sanitize-data', $settings),
                apply_filters('ccb-sanitize-data', $conditions));
        } else {
            $id = (int)$extra[0];
            update_option('stm_ccb_form_settings_' . $extra[0], $settings);
            foreach ($calc_posts as $key => $value) {
                if ($key === (int)$extra[0]) {
                    $calc_update = ['ID' => $key, 'post_title' => $extra[1]];
                    wp_update_post($calc_update);
                    update_post_meta($key, 'stm-fields', ccb__sanitize_array($data));
                    update_post_meta($key, 'stm-name', apply_filters('ccb-sanitize-data', $extra[1]));
                    update_post_meta($key, 'stm-formula', apply_filters('ccb-sanitize-data', $formula));
                    update_post_meta($key, 'stm-conditions', apply_filters('ccb-sanitize-data', $conditions));
                }
            }
        }
        wp_send_json(['success' => true, 'message' => 'Form created successfully', 'calc_id' => $id]);
    }
}