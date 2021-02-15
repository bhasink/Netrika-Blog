<?php
    $template = '<template v-else-if="modalField === \'date-picker\'">
                    <ccb-free-datepicker v-on:click="closeModal"></ccb-free-datepicker>
                </template>';

    $main_settings_template = '<template v-else-if="modalField === \'main-settings\'">
                                   <free-main-settings v-on:set-settings="setSettings" v-bind:products="wcProducts" v-bind:forms="contactForms" v-bind:field="settings[settingsId]" v-bind:id="settingsId"></free-main-settings>
                               </template>'
?>

<div id="ccbModal" class="ccb-modal" v-bind:class="{'ccb-display' : stmDisplay}">
    <div class="ccb-modal-content">
        <span class="ccb-close" v-on:click="closeModal">&times;</span>
        <div class="ccb-modal-container">
            <template v-if="modalField === 'input'">
                <input-field v-bind:field="modalData" :index="newIndex" v-bind:order="order" v-bind:id="fieldId" v-on:click="saveField"></input-field>
            </template>
            <template v-else-if="modalField === 'drop-down'">
                <drop-down-field v-bind:field="modalData" :index="newIndex" v-bind:order="order" v-bind:id="fieldId" v-on:click="saveField"></drop-down-field>
            </template>
            <template v-else-if="modalField === 'radio-button'">
                <radio-button v-bind:field="modalData" v-bind:order="order" :index="newIndex" v-bind:id="fieldId" v-on:click="saveField"></radio-button>
            </template>
            <template v-else-if="modalField === 'checkbox'">
                <checkbox-field v-bind:field="modalData" v-bind:order="order" :index="newIndex" v-bind:id="fieldId" v-on:click="saveField"></checkbox-field>
            </template>
            <template v-else-if="modalField === 'range-button'">
                <range-field v-bind:field="modalData" v-bind:order="order" :index="newIndex" v-bind:id="fieldId" v-on:click="saveField"></range-field>
            </template>
            <template v-else-if="modalField === 'quantity'">
                <quantity-field v-bind:field="modalData" v-bind:order="order" :index="newIndex" v-bind:id="fieldId" v-on:click="saveField"></quantity-field>
            </template>
            <template v-else-if="modalField === 'text-area'">
                <text-area-field v-bind:field="modalData" v-bind:order="order" :index="newIndex" v-bind:id="fieldId" v-on:click="saveField"></text-area-field>
            </template>
            <template v-else-if="modalField === 'html'">
                <html-field v-bind:field="modalData" v-bind:order="order" :index="newIndex" v-bind:id="fieldId" v-on:click="saveField"></html-field>
            </template>
            <template v-else-if="modalField === 'line'">
                <line-field v-bind:field="modalData" v-bind:order="order" :index="newIndex" v-bind:id="fieldId" v-on:click="saveField"></line-field>
            </template>
            <?php
                $template = apply_filters('ccb_date_picker', $template);
                $main_settings_template = apply_filters('ccb_main_settings', $main_settings_template);

                echo apply_filters('ccb-no-echo-variable', $template);
                echo apply_filters('ccb-no-echo-variable', $main_settings_template);
            ?>

            <template v-else-if="modalField === 'total'">
                <total-field v-bind:available="readyFields"
                             v-bind:id="fieldId"
                             v-bind:order="order"
                             v-on:click="saveField"
                             v-bind:index="newIndex"
                             v-bind:field="modalData" >
                </total-field>
            </template>
        </div>
    </div>
</div>

<div id="listing-delete-modal" class="modal">
    <p><?php echo __('Are you sure to delete this item?', 'cost-calculator-builder') ?></p>
    <a href="#" rel="modal:close" v-on:click.prevent="removeItem"><?php echo __('Delete', 'cost-calculator-builder') ?></a>
</div>

<div id="ccb-demo-import" class="modal" style="position: relative; max-width: 800px; transform: translateY(-50%); text-align: center;">
    <h2 style="text-align: center; padding-bottom: 20px"><?php echo __('Demo Import', 'cost-calculator-builder') ?></h2>
    <div v-if="demoImport.finish" class="panel-custom p-t-30 p-b-30 text-center">
        <h2><?php _e("Finish :)", "cost-calculator-builder")?></h2>
    </div>
    <div v-if="!demoImport.finish">
        <div class="p-t-15">
            <div class="text-center p-t-15 p-b-15" v-if="demoImport.step_progress" >
                <h4> <?php _e("Import step progress", "cost-calculator-builder")?> : <strong>{{demoImport.step_progress}}</strong></h4>
            </div>

            <div v-if="demoImport.progress_load" class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar"   v-bind:aria-valuenow="demoImport.progress" aria-valuemin="0" aria-valuemax="100" v-bind:style="'width: '+demoImport.progress+'%'">
                    {{demoImport.progress}}%
                </div>
            </div>

            <hr>
        </div>
        <div v-if="demoImport.load" class="panel-custom p-t-30 p-b-30 text-center">
            <div class="ccb-spinner"> <div></div> <div></div> <div></div> <div></div> <div></div> </div>
        </div>
        <template v-if="!demoImport.load && !demoImport.progress_load">

            <div class="demo-btn-wrapper">
                <div class="demo-btn-item">
                    <span class="ccb-demo-import-button default" @click="importDemos"><?php echo __('Run Default Demo Import', 'cost-calculator-builder') ?></span>
                </div>
                <span class="demo-btn-item or">OR</span>

                <div class="demo-btn-item ccb-file-upload">
                    <input v-model="demoImport.image['file']"
                           type="file"
                           id="ccb-file"
                           hidden="hidden"
                           accept=".txt"
                           @change="loadImage()"
                           ref="image-file" />
                    <div class="ccb-file-container">
                        <span id="ccb-upload" @click="applyImporter"><?php echo __('Choose File', 'cost-calculator-builder');?></span>
                        <span id="ccb-file-text">{{demoImport.noFile}}</span>
                    </div>
                    <span class="ccb-demo-import-button" @click="importNewLayout" :disabled="demoImport.noFile === 'No file chosen'" id="ccb-file-button"><?php echo __('Run Custom Default Demo Import', 'cost-calculator-builder') ?></span>
                </div>

            </div>

        </template>
        <textarea v-if="demoImport.progress_load"  rows="7" disabled id="progress_data_textarea" class="form-control" v-model="demoImport.progress_data"></textarea>
    </div>
</div>