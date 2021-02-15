Vue.component('radio-button', {
    props: ['field', 'id', 'order', 'index'],
    data: function () {
        return {
            btnMsg: 'Add',
            radioField: this.resetValue(),
        }
    },

    created() {
        if (this.id === null) {
            this.radioField = this.resetValue();
            this.radioField._id = this.order;
            this.radioField.alias = this.radioField.alias + this.radioField._id;
        } else {
            this.btnMsg = 'Save';
            this.radioField = this.field;
        }

        if(!this.radioField.default)  this.radioField.default = '';
    },

    methods: {

        changeDefault(event, val, index) {
            const vm = this;
            let [,indexValue] = vm.radioField.default.split('_');
            if(indexValue == index) vm.radioField.default = val + '_' + index;
        },

        removeOption(index, optionValue) {
            if(this.radioField.default === optionValue + '_' + index)
                this.radioField.default = '';
            this.radioField.options.splice(index, 1)
        },


        resetValue: function () {
            return {
                label: '',
                _id: null,
                default: '',
                onValue: null,
                description: '',
                _event: 'change',
                allowRound: false,
                additionalCss: '',
                _tag: 'cost-radio',
                additionalStyles: '',
                allowCurrency: false,
                type: 'Radio Button',
                icon: 'fa-dot-circle',
                alias: 'radio_field_id_',
                options: [
                    {
                        optionText: '',
                        optionValue: '',
                    }
                ],
            };
        },

        addOption: function () {
            this.radioField.options.push({optionText: '', optionValue: '',});
        },
    },

    template: `  <div class="ccb-modal-view" data-id="3">
                    <div class="ccb-modal-row">
                        <h4 class="ccb-title">
                            <i v-bind:class="radioField.icon"></i>
                            {{radioField.type}}
                        </h4>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Label" v-model="radioField.label"/>
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Description" v-model="radioField.description"/>
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                    </div>
                    
                    <div class="ccb-input-group ccb-input-group-icon">
                        <select v-model="radioField.default">
                            <option value="">Select a default value</option>
                            <option v-for="(value, index) in radioField.options" :key="index" :value="value.optionValue + '_' + index">{{value.optionText}}</option>
                        </select>
                        <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                    </div>
                    <div class="ccb-currency-allow">
                        <div class="ccb-available-form-fields-container">
                            <ul class="ccb-form-checkboxes">
                                <li><input type="checkbox" id="allowCurrency" v-model="radioField.allowCurrency"><label for="allowCurrency">{{ radioField.allowCurrency ? 'Currency symbol on total description displayed' : 'Currency symbol on total description hidden' }}</label></li>
                                <li><input type="checkbox" id="allowRound" v-model="radioField.allowRound" value="1"><label for="allowRound">{{ radioField.allowRound ? 'Round value to Whole enabled' : 'Round value to Whole disabled' }}</label></li>
                            </ul>
                        </div>      
                    </div>
                    <div class="ccb-modal-row">
                        <div id="ccb-add-option" class="ccb-col-half">
                            <h4>Add Radio</h4>
                            <div id="ccb-add-option-btn" class="ccb-add-form" v-on:click="addOption">
                                <i class="fa fa-plus plus"></i>
                            </div>
                        </div>
                    </div>
                
                    <div class="ccb-options">
                        <div class="ccb-item">
                            <template v-for="(option, index) in radioField.options">
                                <div class="ccb-col-half">
                                    <div class="ccb-input-group ccb-input-group-icon">
                                        <input type="text" placeholder="Radio Button Label"
                                               v-model="option.optionText"@input="changeDefault(event, option.optionValue, index)"/>
                                        <div class="ccb-input-icon"><i class="far fa-bookmark"></i></div>
                                    </div>
                                </div>
                                <div class="ccb-col-half">
                                    <div class="ccb-input-group ccb-input-group-icon">
                                        <input type="number" placeholder="Radio Button Value"
                                               v-model="option.optionValue" @input="changeDefault(event, option.optionValue, index)"/>
                                        <div class="ccb-input-icon"><i class="fas fa-calculator"></i></div>
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
                        <input type="text" v-model="radioField.additionalStyles">
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional css
                            </h4>
                        </div>
                        <textarea type="text" v-model="radioField.additionalCss"></textarea>
                    </div>
                    <button v-on:click="$emit(\'click\', radioField, id, index)" class="ccb-submit-button">{{btnMsg}}</button>
                </div>`,
});
