<?php
/**
 * Plugin Name: Cost Calculator Builder
 * Plugin URI: https://wordpress.org/plugins/cost-calculator-builder/
 * Description: WP Cost Calculator helps you to build any type of estimation forms on a few easy steps. The plugin offers its own calculation builder.
 * Author: StylemixThemes
 * Author URI: https://stylemixthemes.com/
 * License: GNU General Public License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: cost-calculator-builder
 * Version: 1.2.9
 */

namespace STM_CALC;
if (!defined('ABSPATH')) exit;

use STM_CALC\backend\includes\Controllers\STM_Rest_Api;
use STM_CALC\backend\includes\Controllers\STM_EnqueueController;
use STM_CALC\backend\includes\Controllers\STM_SettingsController;

define('CALC_VERSION', '1.2.9');
define('STM_CALCULATE', __FILE__);
define('STM_CALCULATE_PATH', dirname(__FILE__));
define('STM_CALCULATE_URL', plugins_url('', __FILE__));
update_option('ccb_version', sanitize_text_field(CALC_VERSION));

spl_autoload_register(__NAMESPACE__ . '\\stm_autoload');
add_action('plugins_loaded', array(new STM_CALC, 'stm_init'));

require STM_CALCULATE_PATH . '/backend/includes/autoload.php';
register_activation_hook( __FILE__,  'ccb_plugin_activation');
register_uninstall_hook( __FILE__, 'ccb_plugin_uninstall');

class STM_CALC
{
    private $rest_api;
    public static $settings;

    public function __construct()
    {
        $this->rest_api = new STM_Rest_Api();
        load_plugin_textdomain('cost-calculator-builder', false, basename(dirname(__FILE__)) . '/languages');
        $this->stm_init();
    }

    public function ccb_widgets_load()
    {
        // Check required version
        $elementor_version_required = '2.6.7';
        if ( defined('ELEMENTOR_VERSION') && ! version_compare( ELEMENTOR_VERSION, $elementor_version_required, '>=' ) ) {
            add_action( 'admin_notices', array($this, 'ccb_widgets_fail_load_out_of_date') );
            return;
        }

        // Require the main plugin file
        require( __DIR__ . '/plugin.php' );
    }

    public function ccb_widgets_fail_load_out_of_date()
    {
        if ( ! current_user_can( 'update_plugins' ) ) {
            return;
        }

        $file_path = 'elementor/elementor.php';

        $upgrade_link = wp_nonce_url( self_admin_url( 'update.php?action=upgrade-plugin&plugin=' ) . $file_path, 'upgrade-plugin_' . $file_path );
        $message = '<p>' . __( 'Elementor CCB Widgets is not working because you are using an old version of Elementor.', 'cost-calculator' ) . '</p>';
        $message .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', $upgrade_link, __( 'Update Elementor Now', 'cost-calculator' ) ) . '</p>';

        echo '<div class="error">' . $message . '</div>';
    }
    
    public function stm_init()
    {
        add_action('init', array($this->rest_api, 'stm_init'));
        load_plugin_textdomain('cost-calculator-builder', false, basename(dirname(__FILE__)) . '/languages');
        add_action('admin_enqueue_scripts', array(STM_EnqueueController::stmGetInstance(), 'stm_enqueue_admin_scripts'));
        add_action('admin_menu', array(STM_SettingsController::stmGetInstance(), 'stm_init'));
        add_action( 'plugins_loaded', array($this, 'ccb_widgets_load') );
    }
}

function stm_autoload($class = '')
{
    if (strpos($class, 'STM_CALC') !== 0) {
        return;
    }

    $return = str_replace('STM_CALC\\', '', $class);
    $return = str_replace('\\', '/', $return);
    require $return . '.php';
}