Vue.component('drop-down-field', {
    props: ['field', 'id', 'order', 'index'],
    data: function () {
        return {
            btnMsg: 'Add',
            dropField: this.resetValue(),
        }
    },

    created() {
        if (this.id === null) {
            this.dropField = this.resetValue();
            this.dropField._id = this.order;
            this.dropField.alias = this.dropField.alias + this.dropField._id;
        } else {
            this.btnMsg = 'Save';
            this.dropField = this.field;
        }

        if(!this.dropField.default)  this.dropField.default = '';
    },

    methods: {
        changeDefault(event, val, index) {
            const vm = this;
            let [,indexValue] = vm.dropField.default.split('_');
            if(indexValue == index) vm.dropField.default = val + '_' + index;
        },

        removeOption(index, optionValue) {
            if(this.dropField.default === optionValue + '_' + index)
                this.dropField.default = '';
            this.dropField.options.splice(index, 1)
        },

        resetValue: function () {
            return {
                label: '',
                _id: null,
                default: '',
                description: '',
                _event: 'change',
                type: 'Drop Down',
                allowRound: false,
                additionalCss: '',
                additionalStyles: '',
                allowCurrency: false,
                _tag: 'cost-drop-down',
                icon: 'fas fa-chevron-down',
                alias: 'dropDown_field_id_',
                options: [
                    {
                        optionText: '',
                        optionValue: '',
                    },
                ],
            };
        },

        addOption: function () {
            this.dropField.options.push({optionValue: '', optionText: ''});
        },
    },

    template: ` <div class="ccb-modal-view" data-id="2">
                    <div class="ccb-modal-row">
                        <h4 class="ccb-title">
                           <i v-bind:class="dropField.icon"></i>
                           {{dropField.type}}
                        </h4>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Label" v-model="dropField.label"/>
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Description" v-model="dropField.description"/>
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                    </div>
                    <div class="ccb-input-group ccb-input-group-icon"> 
                        <select v-model="dropField.default">
                            <option value="">Select a default value</option>
                            <option v-for="(value, index) in dropField.options" :key="index" :value="value.optionValue + '_' + index">{{value.optionText}}</option>
                        </select>
                        <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                    </div>
                    <div class="ccb-currency-allow">
                        <div class="ccb-available-form-fields-container">
                            <ul class="ccb-form-checkboxes">
                                <li><input type="checkbox" id="allowCurrency" v-model="dropField.allowCurrency"><label for="allowCurrency">{{ dropField.allowCurrency ? 'Currency symbol on total description displayed' : 'Currency symbol on total description hidden' }}</label></li>
                                <li><input type="checkbox" id="allowRound" v-model="dropField.allowRound" value="1"><label for="allowRound">{{ dropField.allowRound ? 'Round value to Whole enabled' : 'Round value to Whole disabled' }}</label></li>
                            </ul>
                        </div>      
                    </div>
                    <div class="ccb-modal-row">
                        <div id="ccb-add-option" class="ccb-col-half">
                            <h4>Add Option</h4>
                            <div id="ccb-add-option-btn" class="ccb-add-form" v-on:click="addOption">
                                <i class="fa fa-plus plus"></i>
                            </div>
                        </div>
                    </div>
                    <div class="ccb-options">
                        <div class="ccb-item">
                            <template v-for="(option, index) in dropField.options">
                                <div>
                                     <div class="ccb-col-half">
                                        <div class="ccb-input-group ccb-input-group-icon">
                                            <input type="text" placeholder="Option Text" v-model="option.optionText" @input="changeDefault(event, option.optionValue, index)"/>
                                            <div class="ccb-input-icon"><i class="far fa-bookmark"></i></div>
                                        </div>
                                     </div>
                                     <div class="ccb-col-half">
                                         <div class="ccb-input-group ccb-input-group-icon">
                                             <input type="number" placeholder="Option Value" v-model="option.optionValue" @input="changeDefault(event, option.optionValue, index)"/>
                                             <div class="ccb-input-icon"><i class="fas fa-calculator"></i></div>
                                         </div>
                                     </div>
                                     <div class="ccb-col-half delete-option">
                                        <button class="ccb-delete-option" v-on:click.prevent="removeOption(index, option.optionValue)"><i class="fa fa-trash"></i></button>
                                    </div>
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
                        <input type="text" v-model="dropField.additionalStyles">
                    </div>
                    
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional css
                            </h4>
                        </div>
                        <textarea type="text" v-model="dropField.additionalCss"></textarea>
                    </div>
                    <button v-on:click="$emit(\'click\', dropField, id, index)" class="ccb-submit-button">{{btnMsg}}</button>
                </div>`,
});
