<?php

class STM_COST_CALC_POST
{
    public function __construct()
    {
        add_action('init', array($this, 'stm_post_types_init'));
    }

    function stm_post_types_init()
    {

        $post_types = $this->stm_post_types();

        foreach ($post_types as $post_type => $post_type_info) {
            $add_args = (!empty($post_type_info['args'])) ? $post_type_info['args'] : array();
            $args = $this->stm_post_type_args(
                $this->stm_post_types_labels(
                    $post_type_info['single'],
                    $post_type_info['plural']
                ),
                $post_type,
                $add_args
            );

            register_post_type($post_type, $args);
        }
    }

    function stm_post_types()
    {
        return array(
            'cost-calc' => array(
                'single'         => 'Cost Calculator',
                'plural'         => 'Cost Calculator',
            ),
        );
    }

    function stm_post_types_labels($singular, $plural, $admin_bar_name = '')
    {
        $admin_bar_name = (!empty($admin_bar_name)) ? $admin_bar_name : $plural;
        return array(
            'name'               => _x(sprintf('%s', $plural), 'post type general name', 'cost-calculator-builder'),
            'singular_name'      => sprintf(_x('Calc', 'post type singular name', 'cost-calculator-builder'), $singular),
            'menu_name'          => _x(sprintf('%s', $plural), 'admin menu', 'cost-calculator-builder'),
            'name_admin_bar'     => sprintf(_x('%s', 'Admin bar ' . $singular . ' name', 'cost-calculator-builder'), $admin_bar_name),
            'add_new_item'       => sprintf(__('Add New %s', 'cost-calculator-builder'), $singular),
            'new_item'           => sprintf(__('New %s', 'cost-calculator-builder'), $singular),
            'edit_item'          => sprintf(__('Edit %s', 'cost-calculator-builder'), $singular),
            'view_item'          => sprintf(__('View %s', 'cost-calculator-builder'), $singular),
            'all_items'          => sprintf(_x('%s', 'Admin bar ' . $singular . ' name', 'cost-calculator-builder'), $admin_bar_name),
            'search_items'       => sprintf(__('Search %s', 'cost-calculator-builder'), $plural),
            'parent_item_colon'  => sprintf(__('Parent %s:', 'cost-calculator-builder'), $plural),
            'not_found'          => sprintf(__('No %s found.', 'cost-calculator-builder'), $plural),
            'not_found_in_trash' => sprintf(__('No %s found in Trash.', 'cost-calculator-builder'), $plural),
        );
    }

    function stm_post_type_args($labels, $slug, $args = array())
    {
        $default_args = array(
            'labels'             => $labels,
            'public'             => false,
            'publicly_queryable' => false,
            'show_ui'            => true,
            'show_in_menu'       => false,
            'query_var'          => false,
            'rewrite'            => array('slug' => $slug),
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array('title')
        );

        return wp_parse_args($args, $default_args);
    }

}

new STM_COST_CALC_POST();
