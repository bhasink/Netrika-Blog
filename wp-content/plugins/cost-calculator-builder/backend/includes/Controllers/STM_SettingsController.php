<?php

namespace STM_CALC\backend\includes\Controllers;

class STM_SettingsController
{
    private static $instance = null;

    public function stm_init()
    {
        add_menu_page(
            __('Cost Calculator', 'cost-calculator-builder'),
            __('Cost Calculator', 'cost-calculator-builder '),
            'manage_options',
            'cost_calculator_builder',
            array($this, 'stm_calculate_create_page'),
            'dashicons-welcome-widgets-menus', 110
        );

        add_submenu_page( null, 'Custom Calculator', 'Custom Calculator', 'manage_options', 'cost_calculator_custom',  array($this, 'stm_calculate_custom_page'));
    }

    public function stm_calculate_create_page()
    {
        require STM_CALCULATE_PATH . '/backend/includes/admin/view/main.php';
    }

    public function stm_calculate_custom_page()
    {
        require STM_CALCULATE_PATH . '/backend/includes/admin/view/partials/custom-page.php';
    }

    public static function stmGetInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }
}