<main class="ccb-custom-main">
    <div class="ccb-main-calc" >
        <div class="ccb-header  clear-both">
            <span class="title"><?php echo __('Cost Calculator Custom Page', 'cost-calculator-builder');?></span>
            <div style="float: right">
                <span class="ccb-action">
				<input type="submit" @click.prevent="changeStyles" class="btn btn-success" value="<?php echo __("Save Changes", "cost-calculator-builder");?>">
			</span>
                <span class="ccb-action">
                <a href="javascript:void(0)" @click.prevent="stmCancel" class="btn btn-primary" ><?php echo __("Existing Calculators", "cost-calculator-builder");?></a>
			</span>
                <span class="ccb-action">
                <a href='<?php echo esc_url(admin_url() . "admin.php?page=cost_calculator_builder");?>' class="btn btn-primary" ><?php echo __("Create Calculator", "cost-calculator-builder");?></a>
			</span>
            </div>
        </div>

        <div id="customize_wrapper" :class="{'is-active': !hasAccess}">
            <div class="ccb-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

        <div class="ccb-sticky-wrapper">
            <div style="position: sticky; align-self: flex-start; top: 0;" class="container" v-if="hasAccess">
                <div>
                    <div class="ccb-wrapper" :class="{showContent : !preloader}">
                        <div class="ccb-layout">
                            <input name="nav" type="radio" class="nav ccb-container-radio" id="home" checked="checked"/>
                            <div class="ccb-custom-page">
                                <div class="ccb-page-contents">
                                    <section class="ccb-modal-section" id="custom-page">
                                        <div class="form-wrapper">
                                            <template>
                                                <div class="form-wrapper-content form-inner-content ccb-left-form-wrapper" id="left_preview" :style='styleStore["v-container"]'>
                                                    <h3 :style="{color: styleStore['labels'].color, fontFamily: styleStore['labels']['font-family']}">{{projectName}}</h3>
                                                    <stm-show-preview v-for="(value, key) in readyFields"
                                                                      :key="key" :id="key" :styles="styleStore" :total="temp"
                                                                      :field="value">
                                                    </stm-show-preview>
                                                </div>
                                                <div class="ccb-calc-description form-wrapper-content form-inner-content" id="right_preview" :style="styleStore['v-container']">
                                                    <div class="ccb-total-description">
                                                        <ul>
                                                            <li class="ccb-summary-title" :style="styleStore['total-summary']" v-if="settings && settings.general && settings.general.header_title">
                                                            <span>
                                                              <h4>{{settings.general.header_title}}</h4>
                                                           </span>
                                                            </li>
                                                            <template v-for="(value, key) in readyFields">
                                                                <li class=ccb-summary-title" :style="styleStore['total-summary']" v-if="value.type !== 'Total' && value.type !== 'Date Picker' && value.type !== 'Html' && value.type !== 'Line' && value.type !== 'Text Area' && value.type !== 'Input'">
                                                                    <span>{{value.label}}</span>
                                                                    <span>0</span>
                                                                </li>
                                                                <li v-else-if="value.type === 'Date Picker'" :style="styleStore['total-summary']" class=ccb-summary-title">
                                                                    <span>{{value.label}}</span>
                                                                    <span v-if="dateDescription.length">
                                                                    <template v-for="element in dateDescription">
                                                                        {{ element && element.alias === value.alias ? element.value : ''}}
                                                                    </template>
                                                                </span>
                                                                    <span v-else>
                                                                    0
                                                                </span>
                                                                </li>
                                                            </template>
                                                            <li :style="styleStore['total-summary']" >
                                                                <span class="ccb-summary-desc">{{formula.label}}: </span>
                                                                <span class="ccb-summary-value" :style="styleStore['total-button']">0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <label class="label-custom-page nav" for="home" @click="container = 'v-container'"><span>V-Container</span></label>
                            <input name="nav" type="radio" class="ccb-container-radio" id="about"/>
                            <div class="ccb-custom-page">
                                <div class="ccb-page-contents">
                                    <section class="ccb-modal-section" id="custom-page">
                                        <div class="form-wrapper" >
                                            <template>
                                                <div class="form-wrapper-content ccb-left-form-wrapper">
                                                    <div class="ccb-horizontal-calc-wrapper" :style='styleStore["h-container"]'>
                                                        <h3 :style="{color: styleStore['labels'].color, fontFamily: styleStore['labels']['font-family']}">{{projectName}}</h3>
                                                        <div id="ccb-horizontal-main">
                                                            <stm-show-preview v-for="(value, key) in readyFields"
                                                                              :key="key" :id="key" :styles="styleStore" :total="temp"
                                                                              :field="value" >
                                                            </stm-show-preview>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ccb-horizontal-calc-wrapper form-wrapper-horizontal-summary" :style='styleStore["h-container"]'>
                                                    <div id="ccb-horizontal-total-summary">
                                                        <ul>
                                                            <li :style="styleStore['total-summary']" class="ccb-horizontal-summary-title ccb-summary-title" v-if="settings && settings.general && settings.general.header_title">
                                                            <span>
                                                                <h4>{{settings.general.header_title}}</h4>
                                                            </span>
                                                            </li>
                                                            <template v-for="(value, key) in readyFields">
                                                                <li :style="styleStore['total-summary']" class="ccb-horizontal-summary-list" v-if="value.type !== 'Total' && value.type !== 'Date Picker' && value.type !== 'Html' && value.type !== 'Line' && value.type !== 'Text Area' && value.type !== 'Input'">
                                                                    <span >{{value.label}}</span>
                                                                    <span>0</span>
                                                                </li>
                                                                <li :style="styleStore['total-summary']" v-else-if="value.type === 'Date Picker'">
                                                                    <span>{{value.label}}</span>
                                                                    <span v-if="dateDescription.length">
                                                                    0
                                                                </span>
                                                                </li>
                                                            </template>
                                                            <li :style="styleStore['total-summary']" class="ccb-horizontal-summary-list">
                                                                <span class="ccb-summary-desc">{{formula.label}}: </span>
                                                                <span class="ccb-summary-value" :style="styleStore['total-button']">0</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <label class="label-custom-page nav" for="about" @click="container = 'h-container'"><span>H-Container</span></label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ccb-custom-sidebar" v-if="hasAccess">
                <div class="ccb-accordion ccb-js-accordion">
                    <template v-for="(field, key) in custom_fields">
                        <template v-if="key === 'v-container' || key === 'h-container'">
                            <div class="ccb-accordion__item ccb-js-accordion-item ccb-active"  v-show="container === key">
                                <div class="ccb-accordion-header ccb-js-accordion-header">{{key}}</div>
                                <div class="ccb-accordion-body ccb-js-accordion-body">
                                    <div class="ccb-accordion ccb-js-accordion">
                                        <div class="ccb-accordion__item ccb-js-accordion-item"  v-for="(value, index) in field.fields">
                                            <div class="ccb-accordion-header ccb-js-accordion-header">{{value.label}}</div>
                                            <div class="ccb-accordion-body ccb-js-accordion-body">
                                                <div class="ccb-accordion-body__contents">
                                                    <component v-bind:is="'ccb-custom-' + value.type+'-field'"
                                                               v-bind:index="index"
                                                               @change="storeStyles"
                                                               v-bind:element="field"
                                                               v-bind:data="field.fields"
                                                               v-bind:field="value">
                                                    </component>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <div class="ccb-accordion__item ccb-js-accordion-item ccb-active">
                                <div class="ccb-accordion-header ccb-js-accordion-header">{{key}}</div>
                                <div class="ccb-accordion-body ccb-js-accordion-body">
                                    <div class="ccb-accordion ccb-js-accordion">
                                        <div class="ccb-accordion__item ccb-js-accordion-item"  v-for="(value, index) in field.fields">
                                            <div class="ccb-accordion-header ccb-js-accordion-header">{{value.label}}</div>
                                            <div class="ccb-accordion-body ccb-js-accordion-body">
                                                <div class="ccb-accordion-body__contents">
                                                    <component v-bind:is="'ccb-custom-' + value.type+'-field'"
                                                               v-bind:index="index"
                                                               @change="storeStyles"
                                                               v-bind:element="field"
                                                               v-bind:data="field.fields"
                                                               v-bind:field="value">
                                                    </component>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</main>

<?php

require_once STM_CALCULATE_PATH . '/backend/includes/admin/view/partials/info.php';