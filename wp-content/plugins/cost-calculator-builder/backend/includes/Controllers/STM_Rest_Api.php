<?php

namespace STM_CALC\backend\includes\Controllers;

use WP_REST_Server;

class STM_Rest_Api
{
    public $callbacks;

    public function stm_init()
    {
        $this->callbacks = new STM_Rest_Api_Callbacks();

        add_action('rest_api_init', array($this, 'stm_form_field'));
        add_action('rest_api_init', array($this, 'stm_demo_import'));
        add_action('rest_api_init', array($this, 'stm_get_listing'));
        add_action('rest_api_init', array($this, 'stm_save_styles'));
        add_action('rest_api_init', array($this, 'stm_save_settings'));
        add_action('rest_api_init', array($this, 'stm_edit_existing'));
        add_action('rest_api_init', array($this, 'stm_auto_cost_calc'));
        add_action('rest_api_init', array($this, 'stm_duplicate_calc'));
        add_action('rest_api_init', array($this, 'stm_demo_import_run'));
        add_action('rest_api_init', array($this, 'stm_remove_existing'));
        add_action('rest_api_init', array($this, 'stm_demo_import_custom'));
    }

    public function stm_save_settings()
    {
        register_rest_route('cost-calc/v1', '/save-settings/', array('methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this->callbacks, 'stm_save_calc'),
        ));
    }


    public function stm_save_styles()
    {
        register_rest_route('cost-calc/v1', '/save-styles/', array('methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this->callbacks, 'stm_save_styles_callback'),
        ));
    }

    public function stm_edit_existing()
    {
        register_rest_route('cost-calc/v1', '/edit-listing/', array('methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this->callbacks, 'stm_edit_existing_callback'),
        ));
    }

    public function stm_duplicate_calc(){
        register_rest_route('cost-calc/v1', '/duplicate-listing/', array('methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this->callbacks, 'stm_duplicate_calc_callback'),
        ));
    }

    public function stm_demo_import(){
        register_rest_route('cost-calc/v1', '/demo-import/', array('methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this->callbacks, 'stm_demo_import_callback'),
        ));
    }

    public function stm_demo_import_run(){
        register_rest_route('cost-calc/v1', '/demo-import-run/', array('methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this->callbacks, 'stm_demo_import_run_callback'),
        ));
    }

    public function stm_demo_import_custom(){
        register_rest_route('cost-calc/v1', '/custom-demo-import/', array('methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this->callbacks, 'stm_demo_import_custom_callback'),
        ));
    }

    public function stm_remove_existing()
    {
        register_rest_route('cost-calc/v1', '/remove-existing/', array('methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this->callbacks, 'stm_remove_existing_callback'),
        ));
    }

    public function stm_get_listing()
    {
        register_rest_route('cost-calc/v1', '/stm-listing/', array('methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this->callbacks, 'stm_get_listing_callback'),
        ));
    }

    public function stm_auto_cost_calc()
    {
        register_rest_route('cost-calc/v1', '/auto-calc/', array('methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this->callbacks, 'stm_auto_calc'),
        ));
    }

    public function stm_form_field()
    {
        register_rest_route('cost-calc/v1', '/form-field/', array('methods' => WP_REST_Server::READABLE,
            'callback' => array($this->callbacks, 'stm_get_field'),
        ));
    }
}
