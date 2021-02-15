<?php

namespace STM_CALC\backend\includes\Controllers;

class STM_CustomFields
{
    public static function customize_calc()
    {
        $data = array(
            "field" => array(
                "id"           => 2195,
                "project_name" => __("Customize your calculator", "cost-calculator-builder"),
                "field" => array(
                    [
                        "_id"              => 0,
                        "type"             => "Drop Down",
                        "_tag"             => "cost-drop-down",
                        "icon"             => "fas fa-chevron-down",
                        "label"            => "Drop Down field",
                        "alias"            => "dropDown_field_id_0",
                        "_event"           => "change",
                        "default"          => 10,
                        "allowRound"       => false,
                        "description"      => "[drop down for customize]",
                        "additionalCss"    => "",
                        "allowCurrency"    => true,
                        "additionalStyles" => "",
                        "options"          => [

                            [
                                "optionText"  => "First Option",
                                "optionValue" => 10,
                            ],

                            [
                                "optionText"  => "Second Option",
                                "optionValue" => 20
                            ],

                            [
                                "optionText"  => "Third Option",
                                "optionValue" => 30
                            ],
                        ],
                    ],
                    [
                        "_id"              => 1,
                        "_tag"             => "cost-radio",
                        "type"             => "Radio Button",
                        "icon"             => "fa-dot-circle",
                        "alias"            => "radio_field_id_1",
                        "label"            => "Radio Button field",
                        "_event"           => "change",
                        "onValue"          => null,
                        "default"          => 20,
                        "allowRound"       => false,
                        "description"      => "[radio button for customize]",
                        "additionalCss"    => "",
                        "allowCurrency"    => true,
                        "additionalStyles" => "",
                        "options"          => [

                            [
                                "optionText"  => "First Option",
                                "optionValue" => 10,
                            ],

                            [
                                "optionText"  => "Second Option",
                                "optionValue" => 20
                            ],

                            [
                                "optionText"  => "Third Option",
                                "optionValue" => 30
                            ],
                        ],
                    ],
                    [
                        "_id"              => 2,
                        "type"             => "Checkbox",
                        "_tag"             => "cost-checkbox",
                        "label"            => "Checkbox Field",
                        "icon"             => "fas fa-check-circle",
                        "alias"            => "checkbox_field_id_2",
                        "_event"           => "change",
                        "allowRound"       => false,
                        "description"      => "[checkbox field for customize]",
                        "additionalCss"    => "",
                        "allowCurrency"    => true,
                        "additionalStyles" => "",
                        "options"          => [

                            [
                                "optionText"  => "First Option",
                                "optionValue" => 10,
                            ],

                            [
                                "optionText"  => "Second Option",
                                "optionValue" => 20
                            ],

                            [
                                "optionText"  => "Third Option",
                                "optionValue" => 30
                            ],
                        ],
                    ],
                    [
                        "step"             => 1,
                        "unit"             => 1,
                        "_id"              => 3,
                        "_tag"             => "cost-range",
                        "type"             => "Range Button",
                        "icon"             => "far fa-exchange",
                        "alias"            => "range_field_id_3",
                        "label"            => "Range Button field",
                        "_event"           => "change",
                        "default"          => 20,
                        "minValue"         => 0,
                        "maxValue"         => 100,
                        "allowRound"       => false,
                        "description"      => "[range button for customize]",
                        "additionalCss"    => "",
                        "allowCurrency"    => true,
                        "additionalStyles" => "",
                    ],
                    [
                        "unit"             => 1,
                        "label"            => "Quantity Field",
                        "_id"              => 4,
                        "type"             => "Quantity",
                        "_tag"             => "cost-quantity",
                        "icon"             => "fas fa-calculator",
                        "alias"            => "quantity_field_id_4",
                        "_event"           => "keyup",
                        "default"          => 20,
                        "allowRound"       => false,
                        "description"      => "[quantity field for customize]",
                        "placeholder"      => "quantity field",
                        "additionalCss"    => "",
                        "allowCurrency"    => true,
                        "additionalStyles" => "",
                    ],

                    [
                        "_id"              => 5,
                        "_tag"             => "cost-text",
                        "type"             => "Text Area",
                        "icon"             => "far fa-pencil",
                        "label"            => "Text Field",
                        "_event"           => "",
                        "placeholder"      => "text field",
                        "description"      => "[text field for custimize]",
                        "additionalCss"    => "",
                        "additionalStyles" => "",
                    ],
                    [
                        "_id"              => 6,
                        "size"             => "4px",
                        "type"             => "Line",
                        "len"              => "100%",
                        "style"            => "solid",
                        "_tag"             => "cost-line",
                        "icon"             => "fas fa-ellipsis-h",
                        "_event"           => "",
                        "additionalCss"    => "",
                        "additionalStyles" => "",
                    ],
                ),
                "settings" => [
                    "general" => [
                        "boxStyle"     => "vertical",
                        "descriptions" => "show",
                        "header_title" => "Total Summary",
                    ],
                    "currency" => [
                        "currency"            => "$",
                        "num_after_integer"   => 2,
                        "decimal_separator"   => ".",
                        "currencyPosition"    => "left_with_space",
                        "thousands_separator" => ",",
                    ],
                    "payments" => false,
                ],
            ),
            "formula" => [
                "label"   => "Total",
                "formula" => "dropDown_field_id_0 + radio_field_id_1 + checkbox_field_id_2 + range_field_id_3 + quantity_field_id_4 ",
                "symbol"  => "",
            ],
        );

        return $data;
    }

    public static function custom_fields()
    {
        $data = [
            "v-container" => [
                "name"    => "v-container",
                "fields"  => [
                    self::generate_width("Width", "width", 0, 100, 1, 45, '%'),
                    self::generate_bg_color("Container background", "background-color", "#f4f7f8", "#f4f7f8", "#f4f7f8"),
                    self::generate_border(0, 100, 1, 0, 0, 0, 0, 0, '0', '#ffffff', 'px'),
                    self::generate_border_radius(0, 100, 1, 8, 8, 8, 8, 8, null, null, 'px'),
                    self::generate_box_shadow( self::container_box_shadow() ),
                    self::generate_indentations("Margin", "margin","25px", "auto", "15px", "auto"),
                    self::generate_indentations("Padding", "padding", "10px", "20px", "10px", "20px"),
                ],
            ],

            "h-container" => [
                "name"    => "h-container",
                "fields"  => [
                    self::generate_width("Width", "width",0, 100, 1, 100, '%'),
                    self::generate_bg_color("Container background", "background-color", "rgb(244, 247, 248)", "rgb(244, 247, 248)", "rgb(244, 247, 248)"),
                    self::generate_border(0, 100, 1, 0, 0, 0, 0, 0, '0', '#ffffff', 'px'),
                    self::generate_border_radius(0, 100, 1, 8, 8, 8, 8, 8, null, null, 'px'),
                    self::generate_box_shadow(self::container_box_shadow()),
                    self::generate_indentations("Margin","margin", "30px", "0px", "30px", "0px"),
                    self::generate_indentations("Padding", "padding", "10px", "20px", "10px", "20px"),
                ],
            ],

            "total-summary" => [
                "name"   => "total-summary",
                "fields" => [
                    self::generate_text_settings(
                        [
                            'label'     => 'Text-color',
                            'value'     => '#000000',
                        ],
                        [
                            'label'     => 'Font-size',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 16,
                            'dimension' => 'px'
                        ],
                        [
                            'label'     => 'Letter-spacing',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 0,
                            'dimension' => 'px'
                        ],
                        [
                            "blur"        => ["min" =>  0,  "max" => 20, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "opacity"     => ["min" =>  0,  "max" => 1,  "step" => 0.01, "value" => 0, "dimension" => "px"],
                            "shift_right" => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "shift_down"  => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "color"       => '#ffffff',
                        ],
                        [
                            "value" => '400',
                        ],
                        [
                            "value" => 'normal'
                        ]
                    ),
                    self::generate_indentations("Margin","margin", "0px", "0px", "6px", "0px"),
                    self::generate_indentations("Padding", "padding", "15px", "25px", "15px", "25px"),
                    self::generate_border(0, 100, 1, 0, 1, 0, 0, 0, '', '#ccc', 'px'),
                ],
            ],

            "labels"     => [
                "name"   => "labels",
                "fields" => [
                    self::generate_text_settings(
                        [
                            'label'     => 'Text-color',
                            'value'     => '#000000',
                        ],
                        [
                            'label'     => 'Font-size',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 16,
                            'dimension' => 'px'
                        ],
                        [
                            'label'     => 'Letter-spacing',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 0,
                            'dimension' => 'px'
                        ],
                        [
                            "blur"        => ["min" =>  0,  "max" => 20, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "opacity"     => ["min" =>  0,  "max" => 1,  "step" => 0.01, "value" => 0, "dimension" => "px"],
                            "shift_right" => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "shift_down"  => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "color"       => '#ffffff',
                        ],
                        [
                            "value" => '400',
                        ],
                        [
                            "value" => 'normal'
                        ]
                    ),
                    self::generate_width("Width", "width",0, 100, 1, 100, '%'),
                    self::generate_width("Height","height",0, 100, 1, 24, 'px'),
                    self::generate_bg_color("Label background", "background-color", "", "", ""),
                    self::generate_border(0, 100, 1, 0, 0, 0, 0, 0, '0', '', 'px'),
                    self::generate_border_radius(0, 100, 1, 0, 0, 0, 0, 0, null, null, 'px'),
                    self::generate_box_shadow(self::container_box_shadow()),
                    self::generate_indentations("Margin","margin", "0px", "0px", "8px", "0px"),
                    self::generate_indentations("Padding", "padding", "0px", "0px", "0px", "0px"),
                ]

            ],

            "descriptions" => [
                "name"     => "descriptions",
                "fields"   => [
                    self::generate_text_settings(
                        [
                            'label'     => 'Text-color',
                            'value'     => '#a29f9f',
                        ],
                        [
                            'label'     => 'Font-size',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 80,
                            'dimension' => '%'
                        ],
                        [
                            'label'     => 'Letter-spacing',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 0,
                            'dimension' => 'px'
                        ],
                        [
                            "blur"        => ["min" =>  0,  "max" => 20, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "opacity"     => ["min" =>  0,  "max" => 1,  "step" => 0.01, "value" => 0, "dimension" => "px"],
                            "shift_right" => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "shift_down"  => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "color"       => '#ffffff',
                        ],
                        [
                            "value" => '400',
                        ],
                        [
                            "value" => 'normal',
                        ]
                    ),
                    self::generate_width("Width", "width",0, 100, 1, 100, '%'),
                    self::generate_width("Height", "height", 0, 100, 1, 0, '%'),
                    self::generate_bg_color("Description background",  "background-color","", "", ""),
                    self::generate_border(0, 100, 1, 0, 0, 0, 0, 0, '0', '#ffffff', 'px'),
                    self::generate_border_radius(0, 100, 1, 0, 0, 0, 0, 0, null, null, '%'),
                    self::generate_box_shadow(self::container_box_shadow()),
                    self::generate_indentations("Margin","margin",  "3px", "0px", "3px", "0px"),
                    self::generate_indentations("Padding", "padding", "0px", "0px", "0px", "0px"),
                ]

            ],

            "drop-down"  => [
                "name"   => "drop-down",
                "fields" => [
                    self::generate_text_settings(
                        [
                            'label'     => 'Text-color',
                            'value'     => '#8a97a0',
                        ],
                        [
                            'label'     => 'Font-size',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 14,
                            'dimension' => 'px'
                        ],
                        [
                            'label'     => 'Letter-spacing',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 0,
                            'dimension' => 'px'
                        ],
                        [
                            "blur"        => ["min" =>  0,  "max" => 20, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "opacity"     => ["min" =>  0,  "max" => 1,  "step" => 0.01, "value" => 0, "dimension" => "px"],
                            "shift_right" => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "shift_down"  => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "color"       => '#ffffff',
                        ],
                        [
                            "value" => '400'
                        ],
                        [
                            "value" => 'normal'
                        ]
                    ),
                    self::generate_width("Width", "width",0, 100, 1, 100, '%'),
                    self::generate_width("Height","height",0, 100, 1, 48, 'px'),
                    self::generate_bg_color("Drop-down background",  "background-color","#e8eeef", "#e8eeef", "#e8eeef"),
                    self::generate_border(0, 100, 1, 0, 0, 0, 0, 0, '0', '#ffffff', 'px'),
                    self::generate_border_radius(0, 100, 1, 2, 2, 2, 2, 2, null, null, 'px'),
                    self::generate_box_shadow(self::container_box_shadow()),
                    self::generate_indentations("Margin","margin", "0px", "0px", "0px", "0px"),
                    self::generate_indentations("Padding", "padding", "6px", "6px", "6px", "6px"),
                ]

            ],

            "radio-button" => [
                "name"     => "radio-button",
                "fields"   => [
                    self::generate_text_settings(
                        [
                            'label'     => 'Text-color',
                            'value'     => '#000000',
                        ],
                        [
                            'label'     => 'Font-size',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 16,
                            'dimension' => 'px'
                        ],
                        [
                            'label'     => 'Letter-spacing',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 0,
                            'dimension' => 'px'
                        ],
                        [
                            "blur"        => ["min" =>  0,  "max" => 20, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "opacity"     => ["min" =>  0,  "max" => 1,  "step" => 0.01, "value" => 0, "dimension" => "px"],
                            "shift_right" => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "shift_down"  => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "color"       => '#ffffff',
                        ],
                        [
                            "value" => "400"
                        ],
                        [
                            "value" => "normal"
                        ]
                    ),
                    self::generate_single_color("Circle color",  "radioColor",""),
                    self::generate_single_color("Circle Background",  "radioBackground",""),
                ],
            ],

            "checkbox"   => [
                "name"   => "checkbox",
                "fields" => [
                    self::generate_text_settings(
                        [
                            'label'     => 'Text-color',
                            'value'     => '#000000',
                        ],
                        [
                            'label'     => 'Font-size',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 16,
                            'dimension' => 'px'
                        ],
                        [
                            'label'     => 'Letter-spacing',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 0,
                            'dimension' => 'px'
                        ],
                        [
                            "blur"        => ["min" =>  0,  "max" => 20, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "opacity"     => ["min" =>  0,  "max" => 1,  "step" => 0.01, "value" => 0, "dimension" => "px"],
                            "shift_right" => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "shift_down"  => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "color"       => '#ffffff',
                        ],
                        [
                            "value" => "400"
                        ],
                        [
                            "value" => "normal"
                        ]
                    ),
                    self::generate_single_color("Border color", "b_color","#000"),
                    self::generate_single_color("Background color", "bg_color","#fff"),
                    self::generate_single_color("Checked color", "checkedColor","#000"),
                ],
            ],

            "range-button" => [
                "name"     => "range-button",
                "fields"   => [
                    self::generate_single_color("Font color",   "fColor","#ffffff"),
                    self::generate_single_color("Range color",  "lineColor","#d7dcdf"),
                    self::generate_single_color("Circle color", "circleColor","#2c3e50"),
                    self::generate_single_color("border color", "bColor","#1abc9c"),
                ],
            ],

            "quantity"   => [
                "name"   => "quantity",
                "fields" => [
                    self::generate_text_settings(
                        [
                            'label'     => 'Text-color',
                            'value'     => '#111111',
                        ],
                        [
                            'label'     => 'Font-size',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 16,
                            'dimension' => 'px'
                        ],
                        [
                            'label'     => 'Letter-spacing',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 0,
                            'dimension' => 'px'
                        ],
                        [
                            "blur"        => ["min" =>  0,  "max" => 20, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "opacity"     => ["min" =>  0,  "max" => 1,  "step" => 0.01, "value" => 0, "dimension" => "px"],
                            "shift_right" => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "shift_down"  => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "color"       => '#ffffff',
                        ],
                        [
                            "value" => "400"
                        ],
                        [
                            "value" => "normal"
                        ]
                    ),
                    self::generate_width("Width","width", 0, 100, 1, 100, '%'),
                    self::generate_width("Height", "height",0, 100, 1, 34, 'px'),
                    self::generate_bg_color("Input color", "background-color","#fff", "#fff", "#fff"),
                    self::generate_border(0, 100, 1, 1, 1, 1, 1, 1, '2', '#7d8993', 'px'),
                    self::generate_border_radius(0, 100, 1, 4, 4, 4, 4, 4, null, null, 'px'),
                    self::generate_indentations("Margin","margin", "0px", "0px", "0px", "0px"),
                    self::generate_indentations("Padding","padding", "0px", "8px", "0px", "8px"),
                ],
            ],

            "text-area"  => [
                "name"   => "text-area",
                "fields" => [
                    self::generate_text_settings(
                        [
                            'label'     => 'Text-color',
                            'value'     => '#8a97a0',
                        ],
                        [
                            'label'     => 'Font-size',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 16,
                            'dimension' => 'px'
                        ],
                        [
                            'label'     => 'Letter-spacing',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 0,
                            'dimension' => 'px'
                        ],
                        [
                            "blur"        => ["min" =>  0,  "max" => 20, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "opacity"     => ["min" =>  0,  "max" => 1,  "step" => 0.01, "value" => 0, "dimension" => "px"],
                            "shift_right" => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "shift_down"  => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0, "dimension" => "px"],
                            "color"       => '#ffffff',
                        ],
                        [
                            "value" => '400',
                        ],
                        [
                            "value" => 'normal'
                        ]
                    ),
                    self::generate_width("Width","width", 0, 100, 1, 100, 'p%'),
                    self::generate_bg_color("Background color", "background-color","#e8eeef", "#e8eeef", "#e8eeef"),
                    self::generate_border( 0, 100, 1, 0, 0, 0, 0, 0, 0, '', 'px'),
                    self::generate_border_radius(0, 100, 1, 3, 3, 3, 3, 3, null, null, 'px'),
                    self::generate_indentations("Margin","margin", "0px", "0px", "0px", "0px"),
                    self::generate_indentations("Padding", "padding", "0px", "0px", "0px", "0px"),
                ],
            ],

            "hr-line"    => [
                "name"   => "hr-line",
                "fields" => [
                    self::generate_width("Width", "width",0, 100, 1, 100, '%'),
                    self::generate_bg_color("Line color", "background-color","#2c3e50", "#2c3e50", "#2c3e50"),
                    self::generate_border(0, 100, 1, 4, 4, 4, 4, 4, 4, '#2c3e50', 'px'),
                    self::generate_indentations("Margin","margin",  "0", "0", "0", "0"),
                    self::generate_indentations("Padding", "padding", "0", "0", "0", "0"),
                ],
            ],

            "total-button" => [
                "name"   => "total-button",
                "fields" => [
                    self::generate_bg_color("Button Background", "background-color","#4eb5e5", "#4eb5e5", "#389ed5"),
                    self::generate_text_settings(
                        [
                            'label'     => 'Text-color',
                            'value'     => '#fbfbfb',
                        ],
                        [
                            'label'     => 'Font-size',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 15,
                            'dimension' => 'px'
                        ],
                        [
                            'label'     => 'Letter-spacing',
                            'min'       => 0,
                            'max'       => 100,
                            'step'      => 1,
                            'value'     => 0,
                            'dimension' => 'px'
                        ],
                        [
                            "blur"        => ["min" =>  0,  "max" => 20, "step" => 1,    "value" => 1, "dimension" => "px"],
                            "opacity"     => ["min" =>  0,  "max" => 1,  "step" => 0.01, "value" => 1, "dimension" => "px"],
                            "shift_right" => ["min" => -40, "max" => 40, "step" => 1,    "value" => 1, "dimension" => "px"],
                            "shift_down"  => ["min" => -40, "max" => 40, "step" => 1,    "value" => 0.4, "dimension" => "px"],
                            "color"       => '#000000',
                        ],
                        [
                            "value" => '600',
                        ],
                        [
                            "value" => 'normal'
                        ],
                        "right"
                    ),
                    self::generate_box_shadow(
                        [
                            "vertical_length" => [
                                "min"       => -200,
                                "max"       => 200,
                                "step"      => 1,
                                "value"     => 0,
                                "dimension" => "px"
                            ],

                            "horizontal_length" => [
                                "min"       => -200,
                                "max"       => 200,
                                "step"      => 1,
                                "value"     => 3,
                                "dimension" => "px"
                            ],

                            "blur_radius" => [
                                "min"       => 0,
                                "max"       => 300,
                                "step"      => 1,
                                "value"     => 0,
                                "dimension" => "px"
                            ],

                            "spread_radius" => [
                                "min"       => -200,
                                "max"       => 200,
                                "step"      => 1,
                                "value"     => 0,
                                "dimension" => "px"
                            ],

                            "opacity" => [
                                "min"       => 0,
                                "max"       => 1,
                                "step"      => 0.01,
                                "value"     => 0.2,
                                "dimension" => ""
                            ],

                            "shadow_color" => [
                                "color" => "#000000"
                            ],
                        ]
                    ),
                    self::generate_border( 0, 100, 1, 0, 0, 0, 4, 0, 0, '#2b8bc6', 'px'),
                    self::generate_border_radius(0, 100, 1, 5, 5, 5, 5, 5, null, null, 'px'),
                    self::generate_width("Min-Width", "min-width",0, 250, 1, 130, 'px'),
                    self::generate_width("Height", "height",0, 250, 1, 40, 'px'),
                    self::generate_width("Line-Height", "line-height",0, 250, 1, 40, 'px'),
                    self::generate_indentations("Padding","padding", "0px", "12px", "0px", "25px"),
                ],
            ],

            "spinner"    => [
                "name"   => "spinner",
                "fields" => [
                    self::generate_bg_color("Background-color", "background-color","#17A2B6", "#17A2B6", "#17A2B6"),
                ],
            ],

        ];

        return $data;
    }

    public static function generate_single_color($label, $name, $color)
    {
        return [
            "label"   => $label,
            "name"    => $name,
            "type"    => "single-color",
            "value"   => $color,
            "default" => $color,
        ];
    }

    public static function generate_bg_color($label, $name,  $default_1, $default_2, $default_3, $alias = '')
    {
        if(empty($_name)) $alias = $name;

        return [
            "label"   => $label,
            "name"    => $name,
            "alias"   => $alias,
            "default" => "solid",
            "type"    => "background-color",
            "solid" => [
                "label"   => $label,
                "value"   => $default_1,
                "default" => $default_1,
                "alias"   => "backgroundColor",
            ],
            "gradient" => [
                [
                    "label"   => "Gradient to",
                    "value"   => $default_2,
                    "default" => $default_2,
                    "alias"   => "backgroundImage",
                ],
                [
                    "label"   => "Gradient right",
                    "value"   => $default_3,
                    "default" => $default_3,
                    "alias"   => "backgroundImage",
                ]
            ],
        ];
    }

    public static function generate_border($min, $max, $step, $g_v, $t_l, $t_r, $b_l, $b_r, $width, $color,  $dimension)
    {
        return [
            "label"    => "Border",
            "type"     => 'border',
            "name"     => "border",
            "default"  => [
                "label"     => "All Corners Width",
                "value"     => $g_v,
                "min"       => $min,
                "max"       => $max,
                "step"      => $step,
                "width"     => [
                    "value" => $width,
                    "label" => "Border Width",
                    "name"  => "border-width",
                    "options"     => [
                        "top_left"   => [
                            "value" => $t_l,
                            "label" => "Top",
                        ],
                        "top_right"  => [
                            "value" => $t_r,
                            "label" => "Right",
                        ],
                        "bottom_left"    => [
                            "value" => $b_l,
                            "label" => "Bottom",
                        ],
                        "bottom_right" => [
                            "value" => $b_r,
                            "label" => "Left",
                        ],
                    ],
                ],
                "style"     => [
                    "value"   => "solid",
                    "name"    => "border-style",
                    "label"   => "Border Style",
                    "options" => ["solid", "dotted", "dashed", "double", "groove", "ridge", "inset", "outset", "inherit", "hidden", "none"],
                ],
                "color"     => [
                    "label"   => "Border Color",
                    "name"  => "border-color",
                    "value"   => $color,
                    "default" => $color,
                ],
            ],
            "dimension" => $dimension
        ];
    }

    public static function generate_border_radius($min, $max, $step, $g_v, $t_l, $t_r, $b_l, $b_r, $width, $color,  $dimension)
    {
        return [
            "label"    => "Border-radius",
            "type"     => 'border-radius',
            "name"     => 'border-radius',
            "default"  => [
                "label"     => "All Corners Radius",
                "value"     => $g_v,
                "min"       => $min,
                "max"       => $max,
                "step"      => $step,
                "radius"     => [
                    "value" => $width,
                    "label" => "Border Radius",
                    "name"  => "border-radius",
                    "options"     => [
                        "top_left"   => [
                            "value" => $t_l,
                            "label" => "Top Left",
                        ],
                        "top_right"  => [
                            "value" => $t_r,
                            "label" => "Top Right",
                        ],
                        "bottom_left"    => [
                            "value" => $b_l,
                            "label" => "Bottom Left",
                        ],
                        "bottom_right" => [
                            "value" => $b_r,
                            "label" => "Bottom Right",
                        ],
                    ],
                ],
            ],
            "dimension" => $dimension
        ];
    }

    public static function generate_width($label, $name, $min, $max, $step, $value, $dimension)
    {
        return [
            "name"      => $name,
            "label"     => $label,
            "type"      => "width",
            "dimension" => $dimension,
            "default"   => [
                "min"       => $min,
                "max"       => $max,
                "step"      => $step,
                "value"     => $value,
            ],
        ];
    }

    public static function generate_text_color($label, $default)
    {
        return [
            "label"   => $label,
            "name"    => "color",
            "type"    => "text-color",
            "default" => $default,
            "value"   => '',
        ];
    }

    public static function generate_text_settings($text_color, $font_size, $letter_spacing, $text_shadow, $font_weight, $font_style, $position = 'left')
    {
        return [
            "label"       => "Font settings",
            "type"        => "text-settings",
            "color"       => self::generate_text_color($text_color['label'], $text_color['value']),
            "drop_down"   => [
                "font_family" => [
                    "name"    => "font-family",
                    "value"   => "",
                    "label"  => "Font-family",
                    "options" => ['inherit',  'Arial', 'Helvetica', 'Verdana', 'Trebuchet MS', '"Open Sans"', 'Gill Sans', 'Noto Sans', 'Avantgarde', 'Georgia', 'sans-serif'],
                ],
                "font_wight" => [
                    "name"    => "font-weight",
                    "value"   => $font_weight['value'],
                    "label"  => "Font-Weight",
                    "options" => ['inherit', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'bold', 'bolder'],
                ],
                "font_style" => [
                    "name"    => "font-style",
                    "value"   => $font_style['value'],
                    "label"  => "Font-Style",
                    "options" => ['inherit', 'normal', 'italic', 'oblique', 'inherit'],
                ],
                "position"     => [
                    "name"    => "text-align",
                    "label"   => "Text position",
                    "value"   => $position,
                    'options' => ['left', 'center', 'right'],
                ],
            ],

            "range"       => [
                "font_size"      => self::generate_width($font_size['label'], "font-size", $font_size['min'], $font_size['max'], $font_size['step'], $font_size['value'], $font_size['dimension']),
                "letter_spacing" => self::generate_width($letter_spacing['label'], "letter-spacing", $letter_spacing['min'], $letter_spacing['max'], $letter_spacing['step'], $letter_spacing['value'], $letter_spacing['dimension']),
            ],

            "text_shadow" => [
                "label"   => "Text Shadow",
                "name"    => "text-shadow",
                "options" => [
                    "shift_right" => [
                        "label"     => "Shift Right",
                        "min"       => $text_shadow['shift_right']['min'],
                        "max"       => $text_shadow['shift_right']['max'],
                        "step"      => $text_shadow['shift_right']['step'],
                        "value"     => $text_shadow['shift_right']['value'],
                        "dimension" => $text_shadow['shift_right']['dimension'],
                    ],
                    "shift_down"  => [
                        "label"     => "Shift Down",
                        "min"       => $text_shadow['shift_down']['min'],
                        "max"       => $text_shadow['shift_down']['max'],
                        "step"      => $text_shadow['shift_down']['step'],
                        "value"     => $text_shadow['shift_down']['value'],
                        "dimension" => $text_shadow['shift_down']['dimension'],
                    ],
                    "blur"        => [
                        "label"     => "Blur",
                        "min"       => $text_shadow['blur']['min'],
                        "max"       => $text_shadow['blur']['max'],
                        "step"      => $text_shadow['blur']['step'],
                        "value"     => $text_shadow['blur']['value'],
                        "dimension" => $text_shadow['blur']['dimension'],
                    ],
                ],

                "opacity"     => [
                    "label"     => "Opacity",
                    "min"       => $text_shadow['opacity']['min'],
                    "max"       => $text_shadow['opacity']['max'],
                    "step"      => $text_shadow['opacity']['step'],
                    "value"     => $text_shadow['opacity']['value'],
                ],

                "color" => [
                    "name"    => "color",
                    "label"   => "Color",
                    "value"   => $text_shadow['color'],
                    "default" => $text_shadow['color'],
                ]
            ],
        ];
    }



    public static function generate_indentations($label, $name, $t_l, $t_r, $b_l, $b_r){
        return [
            "label" => $label,
            "name"  => $name,
            "type"  => "indentation",
            "default"  => [
                "label"       => "All Corners",
                "options"     => [
                    "top_left"   => [
                        "label" => "Top",
                        "value" => $t_l,
                    ],
                    "top_right"  => [
                        "label" => "Right",
                        "value" => $t_r,
                    ],
                    "bottom_left"    => [
                        "label" => "Bottom",
                        "value" => $b_l,
                    ],
                    "bottom_right" => [
                        "label" => "Left",
                        "value" => $b_r,
                    ],
                ],
            ]
        ];
    }

    public static function generate_box_shadow($args)
    {
        return [
            "label"   => "box-shadow",
            "type"    => "box-shadow",
            "name"    => "box-shadow",
            "range"   => [
                "vertical_length" => [
                    "label"     => "Vertical Length",
                    "min"       => $args['vertical_length']['min'],
                    "max"       => $args['vertical_length']['max'],
                    "step"      => $args['vertical_length']['step'],
                    "value"     => $args['vertical_length']['value'],
                    "dimension" => $args['vertical_length']['dimension']
                ],
                "horizontal_length" => [
                    "label"     => "Horizontal Length",
                    "min"       => $args['horizontal_length']['min'],
                    "max"       => $args['horizontal_length']['max'],
                    "step"      => $args['horizontal_length']['step'],
                    "value"     => $args['horizontal_length']['value'],
                    "dimension" => $args['horizontal_length']['dimension']
                ],
                "blur_radius"   => [
                    "label"     => "Blur Radius",
                    "min"       => $args['blur_radius']['min'],
                    "max"       => $args['blur_radius']['max'],
                    "step"      => $args['blur_radius']['step'],
                    "value"     => $args['blur_radius']['value'],
                    "dimension" => $args['blur_radius']['dimension']
                ],
                "spread_radius" => [
                    "label"     => "Spread Radius",
                    "min"       => $args['spread_radius']['min'],
                    "max"       => $args['spread_radius']['max'],
                    "step"      => $args['spread_radius']['step'],
                    "value"     => $args['spread_radius']['value'],
                    "dimension" => $args['spread_radius']['dimension']
                ],
            ],

            "opacity"       => [
                "label"     => "Opacity",
                "min"       => $args['opacity']['min'],
                "max"       => $args['opacity']['max'],
                "step"      => $args['opacity']['step'],
                "value"     => $args['opacity']['value'],
                "dimension" => $args['opacity']['dimension']
            ],

            "color"        => [
                "shadow_color"  => [
                    "label"   => "Shadow Color",
                    "value"   => "#542554",
                    "default" => $args['shadow_color']['color'],
                ],
            ],

            "line"          => [
                'value'   => '',
                "options" => [
                    "outline" => [
                        "label" => "Outline",
                        "value" => 'outline'
                    ],
                    "inset"   => [
                        "label" => "Inset",
                        "value" => 'inset'
                    ],
                ]
            ],
        ];
    }

    public static function container_box_shadow()
    {
        return [
            "vertical_length" => [
                "min"       => -200,
                "max"       => 200,
                "step"      => 1,
                "value"     => 0,
                "dimension" => "px"
            ],

            "horizontal_length" => [
                "min"       => -200,
                "max"       => 200,
                "step"      => 1,
                "value"     => 0,
                "dimension" => "px"
            ],

            "blur_radius" => [
                "min"       => 0,
                "max"       => 300,
                "step"      => 1,
                "value"     => 0,
                "dimension" => "px"
            ],

            "spread_radius" => [
                "min"       => -200,
                "max"       => 200,
                "step"      => 1,
                "value"     => 0,
                "dimension" => "px"
            ],

            "opacity" => [
                "min"       => 0,
                "max"       => 1,
                "step"      => 0.01,
                "value"     => 0,
                "dimension" => ""
            ],

            "shadow_color" => [
                "color" => "#ffffff"
            ],
        ];
    }

    public static function custom_default_styles()
    {
        $data = [
            "v-container" => [
                "width"           => "45% ",
                "margin"          => "10px auto 10px auto ",
                "padding"         => "10px 20px 10px 20px ",
                "box-shadow"       => "0px 0px 0px 0px rgba(255,255,255,0) ",
                "border-width"     => "0px 0px 0px 0px ",
                "border-style"     => "solid ",
                "border-color"     => "#ffffff ",
                "border-radius"    => "8px 8px 8px 8px ",
                "background-color" => "#f4f7f8 ",
            ],
            "h-container" => [
                "width"           => "100% ",
                "margin"          => "30px 0px 30px 0px ",
                "padding"         => "10px 20px 10px 20px ",
                "box-shadow"       => "0px 0px 0px 0px rgba(255,255,255,0) ",
                "border-width"     => "0px 0px 0px 0px ",
                "border-style"     => "solid ",
                "border-color"     => "#ffffff ",
                "border-radius"    => "8px 8px 8px 8px ",
                "background-color" => "rgb(244, 247, 248) ",
            ],

            "total-summary" =>  [
                "color"          => "#000000",
                "font-style"     => "normal ",
                "font-size"      => "16px",
                "text-align"     => "left ",
                "font-weight"    => "400 ",
                "font-family"    => "",
                "text-shadow"    => "0px 0px 0px rgba(255,255,255,0) ",
                "border-width"   => "1px 0px 0px 0px",
                "border-style"   => "solid",
                "border-color"   => "#ccc ",
                "letter-spacing" => "0px",
            ],

            "labels"    => [
                "color"           => "#000000",
                "width"           => "100% ",
                "height"          => "24px ",
                "margin"          => "0px 0px 8px 0px ",
                "padding"         => "0px 0px 0px 0px ",
                "font-size"        => "16px",
                "text-align"       => "left ",
                "box-shadow"       => "0px 0px 0px 0px rgba(255,255,255,0) ",
                "font-style"       => "normal ",
                "font-weight"      => "400 ",
                "text-shadow"      => "0px 0px 0px rgba(255,255,255,0) ",
                "font-family"      => "",
                "border-width"     => "0px 0px 0px 0px ",
                "border-color"     => " ",
                "border-style"     => "solid ",
                "border-radius"    => "0px 0px 0px 0px ",
                "letter-spacing"   => "0px",
                "background-color" => "rgb(244, 247, 248) ",
            ],
            "descriptions" => [
                "color"           => "#a29f9f",
                "width"           => "100% ",
                "height"          => "0% ",
                "margin"          => "3px 0px 3px 0px ",
                "padding"         => "0px 0px 0px 0px ",
                "font-size"        => "80%",
                "text-align"       => "left ",
                "box-shadow"       => "0px 0px 0px 0px rgba(255,255,255,0) ",
                "font-style"       => "normal ",
                "font-weight"      => "400 ",
                "font-family"      => "",
                "text-shadow"      => "0px 0px 0px rgba(255,255,255,0) ",
                "border-width"     => "0px 0px 0px 0px ",
                "border-style"     => "solid ",
                "border-color"     => "#ffffff ",
                "border-radius"    => "0px 0px 0px 0px ",
                "letter-spacing"   => "0px",
                "background-color" => "rgb(244, 247, 248) ",
            ],
            "drop-down" => [
                "color"           => "#8a97a0",
                "width"           => "100% ",
                "height"          => "48px ",
                "margin"          => "0px 0px 0px 0px ",
                "padding"         => "6px 6px 6px 6px "  ,
                "font-size"        => "14px",
                "text-align"       => "left ",
                "box-shadow"       => "0px 0px 0px 0px rgba(255,255,255,0) ",
                "font-style"       => "normal ",
                "font-weight"      => "400 ",
                "font-family"      => "",
                "text-shadow"      => "0px 0px 0px rgba(255,255,255,0) ",
                "border-width"     => "0px 0px 0px 0px ",
                "border-style"     => "solid ",
                "border-color"     => "#ffffff ",
                "border-radius"    => "2px 2px 2px 2px ",
                "letter-spacing"   => "0px",
                "background-color" => "#e8eeef ",
            ],
            "radio-button" => [
                "color"           => "#000000",
                "font-size"        => "16px",
                "text-align"       => "left ",
                "font-style"       => "normal ",
                "font-weight"      => "400 ",
                "text-shadow"      => "0px 0px 0px rgba(255,255,255,0) ",
                "font-family"      => "",
                "letter-spacing"   => "0px",
                "radioColor"       => "green",
                "radioBackground"  => "#fff",
            ],
            "checkbox"     => [
                "color"           => "#000000",
                "font-size"        => "16px",
                "text-align"       => "left ",
                "font-style"       => "normal ",
                "font-weight"      => "400 ",
                "text-shadow"      => "0px 0px 0px rgba(255,255,255,0) ",
                "font-family"      => "",
                "letter-spacing"   => "0px",
                "b_Color"          => "#000",
                "bg_color"         => "#fff",
                "checkedColor"     => "#000",
            ],

            "range-button" => [
                "fColor"           => "#fff ",
                "circleColor"      => "#2c3e50 ",
                "bColor"           => "#1abc9c ",
                "lineColor"        => "#d7dcdf ",
            ],

            "quantity"     => [
                "color"            => "#111111",
                "width"            => "100% ",
                "height"           => "34px ",
                "margin"           => "0px 0px 0px 0px ",
                "padding"          => "0px 8px 0px 8px ",
                "font-size"        => "16px",
                "text-align"       => "left ",
                "font-style"       => "normal ",
                "font-family"      => "",
                "font-weight"      => "400 ",
                "text-shadow"      => "0px 0px 0px rgba(255,255,255,0) ",
                "border-width"     => "1px 1px 1px 1px ",
                "border-style"     => "solid ",
                "border-color"     => "#7d8993 ",
                "border-radius"    => "4px 4px 4px 4px ",
                "letter-spacing"   => "0px",
                "background-color" => "#fff ",
            ],

            "text-area"    => [
                "color"            => "#8a97a0",
                "width"            => "100p% ",
                "margin"           => "0px 0px 0px 0px ",
                "padding"          => "0px 0px 0px 0px ",
                "font-size"        => "16px",
                "text-align"       => "left ",
                "font-style"       => "normal ",
                "font-weight"      => "400 ",
                "text-shadow"      => "0px 0px 0px rgba(255,255,255,0) ",
                "font-family"      => "",
                "border-style"     => "solid ",
                "border-width"     => "0px 0px 0px 0px ",
                "border-color"     => " ",
                "border-radius"    => "3px 3px 3px 3px ",
                "letter-spacing"   => "0px",
                "background-color" => " ",
            ],
            "hr-line"      => [
                "width"            => "100% ",
                "margin"           => "0px 0px 0px 0px ",
                "padding"          => "0px 0px 0px 0px ",
                "border-width"     => "4px 4px 4px 4px ",
                "border-style"     => "solid ",
                "border-color"     => "#2c3e50 ",
                "background-color" => "#2c3e50 ",
            ],
            "total-button" => [
                "color"            => "#fbfbfb",
                "height"           => "40px",
                "padding"          => "0px 12px 0px 25px ",
                "min-width"        => "130px",
                "font-size"        => "15px",
                "box-shadow"       => "0px 3px 0px 0px rgba(0,0,0,0.2) ",
                "font-style"       => "normal ",
                "text-align"       => "right ",
                "font-family"      => "",
                "font-weight"      => "600 ",
                "text-shadow"      => "1px 0.4px 1px rgba(0,0,0,1) ",
                "line-height"      => "40px",
                "border-width"     => "0px 0px 4px 0px",
                "border-style"     => "solid",
                "border-color"     => "#2b8bc6 ",
                "border-radius"    => "5px 5px 5px 5px ",
                "letter-spacing"   => "0px",
                "background-color" => "#4eb5e5 ",
            ],
            "spinner"      => [
                "background-color" => "#17A2B6 ",
            ],
        ];

        return $data;
    }
}