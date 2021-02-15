<div class="show-content" :class="{'is-ready': isCalcReady}" v-if="isCalcReady">
    <div id="ccb-crete">
        <label for="create-input" class="ccb-create-input">
            <input type="text" id="create-input" placeholder="&nbsp;" v-model="projectName">
            <span class="ccb-label-1"><?php echo __("Name", "cost-calculator-builder"); ?></span>
            <span class="border"></span>

            <div v-on:click="showContainer()" id="ccb-add-form" v-if="create">
                <i class="fa fa-plus" id="plus"></i>
            </div>
        </label>
    </div>

    <div class="ccb-page-wrap" >
        <div class="">
            <?php
            $template = '
                <ccb-condition-free v-bind:toggle="conditionOpen" ></ccb-condition-free>
            ';

            echo apply_filters('ccb_condition_binding', $template);
            ?>

        </div>
        <div class="create-page-wrapper">
            <div class="ccb-create-left">
                <div class="ccb-temp-sidebar">
                    <div class="ccb-sidebar-info" v-show="access" v-bind:class="{'ccb-tools-opacity' : hasAccess, 'ccb-modal-active': toolZIndex}">
                        <div class="ccb-tooltip" v-if="!create">
                            <span  @mouseleave="textCopy = 'Copy shortcode'" class="ccb-short-code-name" :class="{allow: !create}" @click.prevent="copyText(projectId)">{{'[stm-calc id="' + projectId +'"]'}}</span>
                            <span class="ccb-tooltip-text">{{textCopy}}</span>
                            <input type="hidden" class="calc-short-code" :data-id="projectId" :value='`[stm-calc id="` + projectId +`"]`'>
                        </div>
                    </div>
                    <div class="ccb-modal-body" v-bind:class="{ 'ccb-tools-opacity' : readyFields.length }">
                        <p class="preview-button" >
                            <button type="button" class="settings" v-on:click="checkSettings('main-settings', settingsId)"><?php echo __('Settings', 'cost-calculator-builder') ?></button>
                        </p>
                        <p class="preview-button">
                            <button type="button" v-if="!create" class="condition" :disable="!projectId" @click.prevent="toggleCondition"><?php echo __('Condition', 'cost-calculator-builder') ?></button>
                        </p>
                        <p class="preview-button" v-if="!create">
                            <button type="button" class="accent" @click.prevent="toggleModal(event, 'preview')"><?php echo __('Preview', 'cost-calculator-builder') ?></button>
                        </p>

                        <cost-modal v-if="modal.isOpen" :has-mask="modal.hasMask" :can-click-mask="modal.canClickMask"
                                    :has-x="modal.hasX" @toggle.prevent="toggleModal()" v-bind:data-calc-id="projectId">
                            <article v-cloak>
                                <section class="ccb-modal-section" v-if="previewSuccess">
                                    <div class="form-wrapper">
                                        <template v-if="settings[0] && settings[0].general && settings[0].general.boxStyle === 'horizontal'">
                                            <div class="form-wrapper-content ccb-left-form-wrapper" >
                                                <div class="ccb-horizontal-calc-wrapper" :style='styleStore["h-container"]'>
                                                    <h3 :style="{color: styleStore['labels'].color, fontFamily: styleStore['labels']['font-family']}">{{projectName}}</h3>
                                                    <div id="ccb-horizontal-main">
                                                        <stm-show-preview v-for="(value, key) in readyFields"
                                                                          v-on:calendar-event='stmCalendarField'
                                                                          :key="key" :styles="styleStore" :id="key" :total="temp"
                                                                          :field="value" v-on:stm-callback="stmToCalculate">
                                                        </stm-show-preview>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ccb-horizontal-calc-wrapper form-wrapper-horizontal-summary" :style='styleStore["h-container"]'>
                                                <div id="ccb-horizontal-total-summary">
                                                    <ul>
                                                        <li class="ccb-horizontal-summary-title" :style="styleStore['total-summary']">
                                                            <span v-if="settings[0] && settings[0].general && settings[0].general.header_title">
                                                                <h4>{{settings[0].general.header_title}}</h4>
                                                            </span>
                                                        </li>
                                                        <template v-for="(value, key) in readyFields" v-if="settings[0] && settings[0].general && settings[0].general.descriptions === 'show'">
                                                            <li :style="styleStore['total-summary']" class="ccb-horizontal-summary-list" v-if="value.type !== 'Total' && value.type !== 'Date Picker' && value.type !== 'Html' && value.type !== 'Line' && value.type !== 'Text Area' && value.type !== 'Input'">
                                                                <span>{{value.label}}</span>
                                                                <span v-if="value.allowCurrency">{{calcTotal.length ? calcTotal[key] ? currencyFormatPreview( calcTotal[key].value, value ) : 0 : 0}}</span>
                                                                <span v-else-if="value.allowRound">{{calcTotal.length ? calcTotal[key] ? Math.round(calcTotal[key].value) : 0 : 0}}</span>
                                                                <span v-else>{{calcTotal.length ? calcTotal[key] ? calcTotal[key].value : 0 : 0}}</span>
                                                            </li>
                                                            <li :style="styleStore['total-summary']" v-else-if="value.type === 'Date Picker'">
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
                                                        <li :style="styleStore['total-summary']" class="ccb-horizontal-summary-list" v-for="(value, key) in formula" :key="key">
                                                            <span class="ccb-summary-desc">{{value.label}}: </span>
                                                            <span :style="styleStore['total-button']" class="ccb-summary-value" v-if="currency_settings && currency_settings.currencyPosition === 'left'">{{currency_settings.currency ? currency_settings.currency : ''}}{{value.total ? value.total : 0}}</span>
                                                            <span :style="styleStore['total-button']" class="ccb-summary-value" v-else-if="currency_settings && currency_settings.currencyPosition === 'left_with_space'">{{currency_settings.currency ? currency_settings.currency : ''}} {{value.total ? value.total : 0}}</span>
                                                            <span :style="styleStore['total-button']" class="ccb-summary-value" v-else-if="currency_settings && currency_settings.currencyPosition === 'right'">{{value.total ? value.total : 0 }}{{currency_settings.currency ? currency_settings.currency : ''}}</span>
                                                            <span :style="styleStore['total-button']" class="ccb-summary-value" v-else-if="currency_settings && currency_settings.currencyPosition === 'right_with_space'">{{value.total ? value.total : 0}} {{currency_settings.currency ? currency_settings.currency : ''}}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="form-wrapper-content form-inner-content" id="left_preview" :style='styleStore["v-container"]'>
                                                <h3 :style="{color: styleStore['labels'].color, fontFamily: styleStore['labels']['font-family']}">{{projectName}}</h3>
                                                <stm-show-preview v-for="(value, key) in readyFields"
                                                                  v-on:calendar-event='stmCalendarField'
                                                                  :key="key" :id="key" :styles="styleStore" :total="temp"
                                                                  :field="value" v-on:stm-callback="stmToCalculate">
                                                </stm-show-preview>
                                            </div>
                                            <div class="ccb-calc-description form-wrapper-content form-inner-content"
                                                 id="right_preview" :style='styleStore["v-container"]'>
                                                <div class="ccb-total-description">
                                                    <ul>
                                                        <li class="ccb-summary-title" :style="styleStore['total-summary']">
                                                            <span v-if="settings[0] && settings[0].general && settings[0].general.header_title">
                                                                <h4>{{settings[0].general.header_title}}</h4>
                                                            </span>
                                                        </li>
                                                        <template v-for="(value, key) in readyFields" v-if="settings[0] && settings[0].general && settings[0].general.descriptions === 'show'">
                                                            <li :style="styleStore['total-summary']" v-if="value.type !== 'Total' && value.type !== 'Date Picker' && value.type !== 'Html' && value.type !== 'Line' && value.type !== 'Text Area' && value.type !== 'Input'">
                                                                <span>{{value.label}}</span>
                                                                <span v-if="value.allowCurrency">{{calcTotal.length ? calcTotal[key] ? currencyFormatPreview( calcTotal[key].value, value ) : 0 : 0}}</span>
                                                                <span v-else-if="value.allowRound">{{calcTotal.length ? calcTotal[key] ? Math.round(calcTotal[key].value) : 0 : 0}}</span>
                                                                <span v-else>{{calcTotal.length ? calcTotal[key] ? calcTotal[key].value : 0 : 0}}</span>
                                                            </li>
                                                            <li :style="styleStore['total-summary']" v-else-if="value.type === 'Date Picker'">
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
                                                        <li :style="styleStore['total-summary']" v-for="(value, key) in formula" :key="key">
                                                            <span :style="styleStore['total-summary']" class="ccb-summary-desc">{{value.label}}: </span>
                                                            <span :style="styleStore['total-button']" class="ccb-summary-value" v-if="currency_settings && currency_settings.currencyPosition === 'left'">{{currency_settings.currency ? currency_settings.currency : ''}}{{value.total ? value.total : 0}}</span>
                                                            <span :style="styleStore['total-button']" class="ccb-summary-value" v-else-if="currency_settings && currency_settings.currencyPosition === 'left_with_space'">{{currency_settings.currency ? currency_settings.currency : ''}} {{value.total ? value.total : 0}}</span>
                                                            <span :style="styleStore['total-button']" class="ccb-summary-value" v-else-if="currency_settings && currency_settings.currencyPosition === 'right'">{{value.total ? value.total : 0 }}{{currency_settings.currency ? currency_settings.currency : ''}}</span>
                                                            <span :style="styleStore['total-button']" class="ccb-summary-value" v-else-if="currency_settings && currency_settings.currencyPosition === 'right_with_space'">{{value.total ? value.total : 0}} {{currency_settings.currency ? currency_settings.currency : ''}}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </template>
                                    </div>

                                </section>
                            </article>
                            <footer>
                                <div class="forward-actions">
                                    <button class="accent save" :disabled="!isLastStep" v-show="isLastStep"
                                            @click.prevent="finish"><i
                                                class="fa fa-fw fa-lg fa-check"></i></button>
                                </div>
                            </footer>
                        </cost-modal>
                    </div>
                </div>

                <div v-bind:class="{'ccb-tools-opacity' : hasAccess, 'ccb-modal-active': toolZIndex}" class="ccb-form-wrap">
                    <div class="ccb-cost-calc-block">
                        <span v-if="!readyFields.length" class="ccb-empty-field"><?php echo __('Please drag & drop calculator elements here', 'cost-calculator-builder');?></span>
                        <draggable  v-if="!readyFields.length"
                                    group="fields"
                                    :list="readyFields"
                                    v-model="readyFields"
                                    v-bind="dragOptions"
                                    @change="log"
                                    class="ccb-empty-field-hide"
                        ></draggable>
                        <draggable group="fields"
                                   :list="readyFields"
                                   v-model="readyFields"
                                   v-bind="dragOptions"
                                   @change="log"
                        >
                            <transition-group type="transition" name="flip-list">
                                <cost-field
                                        v-for="(field,key) in readyFields"
                                        v-bind:id="key" v-bind:key="key" v-bind:field="field"
                                        v-on:remove="removeFields" v-bind:order="order"
                                        v-on:click="editField">
                                </cost-field>
                            </transition-group>
                        </draggable>
                    </div>
                </div>

                <div class="ccb-buttons-wrapper">
                    <div class="ccb-extra-buttons"
                         v-bind:class="{'ccb-tools-opacity' : readyFields.length, 'ccb-modal-active': toolZIndex}"
                         v-if="create">
                        <button type="submit" class="ccb-box">
                            <a href="#" v-on:click.prevent="saveCalc"
                               class="ccb-extra-btn ccb-btn-white ccb-btn-animation-1"><?php echo __("Create", "cost-calculator-builder"); ?></a>
                        </button>
                    </div>
                </div>
                <div class="ccb-buttons-wrapper" v-if="!create">
                    <div class="ccb-extra-buttons"
                         v-bind:class="{'ccb-tools-opacity' : readyFields.length, 'ccb-modal-active': toolZIndex}">
                        <button type="submit" class="ccb-box">
                            <a href="#" v-on:click.prevent="saveCalc(event,true)"
                               class="ccb-extra-btn ccb-btn-white ccb-btn-animation-1"><?php echo __("Save", "cost-calculator-builder"); ?></a>
                        </button>
                    </div>
                    <div class="ccb-extra-buttons"
                         v-bind:class="{'ccb-tools-opacity' : readyFields.length, 'ccb-modal-active': toolZIndex}">
                        <button type="submit" class="ccb-box ccb-cancel">
                            <a href="#" v-on:click.prevent="stmCancel"
                               class="ccb-extra-btn ccb-btn-red ccb-btn-animation-1"><?php echo __("Cancel", "cost-calculator-builder-pro"); ?></a>
                        </button>
                    </div>
                </div>
            </div>

            <div v-bind:class="{ 'ccb-tools-opacity': showTools, 'ccb-modal-active': toolZIndex, 'ccb-zIndex' : navZIndex }"
                 class="ccb-side-bar-tools">
                <nav class="ccb-nav">
                    <ul class="ccb-tools">
                        <draggable
                                :list="$store.getters.getFields"
                                :group="{ name: 'fields', pull: 'clone', put: false }"
                                @change="log"
                                :sort="false"
                        >
                            <li v-for="tool in $store.getters.getFields" v-bind:key="tool.id"
                                v-on:click.prevent="getField(tool.type)">

                                <a href="">
                                    <i v-bind:class="tool.icon"></i>
                                    <strong>{{tool._name}}</strong>
                                    <small>{{tool.description}}</small>
                                </a>
                            </li>
                        </draggable>

                    </ul>
                </nav>
            </div>
        </div>


    </div>

</div>