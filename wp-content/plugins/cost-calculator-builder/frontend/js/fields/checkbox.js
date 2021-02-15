Vue.component('checkbox-field', {
    props: ['field', 'id', 'order', 'index', 'default'],
    data: function () {
        return {
            btnMsg: 'Add',
            checkboxField: this.resetValue(),
        }
    },

    created() {
        if (this.id === null) {
            this.checkboxField = this.resetValue();
            this.checkboxField._id = this.order;
            this.checkboxField.alias = this.checkboxField.alias + this.checkboxField._id;
        } else {
            this.btnMsg = 'Save';
            this.checkboxField = this.field;
        }

        if(!this.checkboxField.default)  this.checkboxField.default = '';
    },

    methods: {

        changeDefault(event, val, index) {
            const vm = this;
            let [,indexValue] = vm.checkboxField.default.split('_');
            if(indexValue == index) vm.checkboxField.default = val + '_' + index;
        },

        removeOption(index, optionValue) {
            if(this.checkboxField.default === optionValue + '_' + index)
                this.checkboxField.default = '';
            this.checkboxField.options.splice(index, 1)
        },

        resetValue: function () {
            return {
                _id: null,
                label: '',
                description: '',
                _event: 'change',
                type: 'Checkbox',
                allowRound: false,
                additionalCss: '',
                additionalStyles: '',
                allowCurrency: false,
                _tag: 'cost-checkbox',
                icon: 'fas fa-check-circle',
                alias: 'checkbox_field_id_',
                options: [
                    {
                        optionText: '',
                        optionValue: '',
                    }
                ],
            };
        },
        addOption: function () {
            this.checkboxField.options.push({optionText: '', optionValue: '',});
        },
    },

    template: `<div class="ccb-modal-view">
                    <div class="ccb-modal-row">
                        <h4 class="ccb-title">
                            <i v-bind:class="checkboxField.icon"></i>
                            {{checkboxField.type}}
                        </h4>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Label" v-model="checkboxField.label" />
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Description" v-model="checkboxField.description" />
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                    </div>
                    <div class="ccb-currency-allow">
                        <div class="ccb-available-form-fields-container">
                            <ul class="ccb-form-checkboxes">
                                <li><input type="checkbox" id="allowCurrency" v-model="checkboxField.allowCurrency" value="1"><label for="allowCurrency">{{ checkboxField.allowCurrency ? 'Currency symbol on total description displayed' : 'Currency symbol on total description hidden' }}</label></li>
                                <li><input type="checkbox" id="allowRound" v-model="checkboxField.allowRound" value="1"><label for="allowRound">{{ checkboxField.allowRound ?  'Round value to Whole enabled' : 'Round value to Whole disabled' }}</label></li>
                            </ul>
                        </div>      
                    </div>
                    
                    <div class="ccb-modal-row">
                        <div id="ccb-add-option" class="ccb-col-half">
                            <h4>Add Checkbox</h4>
                            <div id="ccb-add-option-btn" class="ccb-add-form" v-on:click="addOption">
                                <i class="fa fa-plus plus"></i>
                            </div>
                        </div>
                    </div>
                   
                    <div class="ccb-options">
                        <div class="ccb-item">
                            <template v-for="(option, index) in checkboxField.options">
                                <div class="ccb-col-half">
                                   <div class="ccb-input-group ccb-input-group-icon">
                                        <input type="text" placeholder="Checkbox Label"
                                           v-model="option.optionText" @input="changeDefault(event, option.optionValue, index)"/>
                                        <div class="ccb-input-icon"><i class="far fa-bookmark"></i></div>
                                    </div>
                                </div>
                                <div class="ccb-col-half">
                                    <div class="ccb-input-group ccb-input-group-icon">
                                        <input type="number" placeholder="Checkbox Value"
                                               v-model="option.optionValue" @input="changeDefault(event, option.optionValue, index)"/>
                                        <div class="ccb-input-icon"><i class="fas fa-calculator"></i></i></div>
                                    </div>
                                </div>
                           
                                <div class="ccb-col-half delete-option">
                                    <button class="ccb-delete-option" v-on:click.prevent="removeOption(index, option.optionValue)"><i class="fa fa-trash"></i></button>
                                </div>
                            </template>    
                        </div>
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional classes
                            </h4>
                        </div>
                        <input type="text" v-model="checkboxField.additionalStyles">
                    </div>
                    
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional css
                            </h4>
                        </div>
                        <textarea type="text" v-model="checkboxField.additionalCss"></textarea>
                    </div>
                    
                   <button v-on:click="$emit(\'click\', checkboxField, id, index)" class="ccb-submit-button">{{btnMsg}}</button>
              </div>`,
});
