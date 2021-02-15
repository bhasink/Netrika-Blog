Vue.component('quantity-field', {
    props: ['field', 'id', 'order', 'index'],
    data: function () {
        return {
            btnMsg: 'Add',
            quantityField: this.resetValue(),
        }
    },

    created() {
        if (this.id === null) {
            this.quantityField = this.resetValue();
            this.quantityField._id = this.order;
            this.quantityField.alias = this.quantityField.alias + this.quantityField._id;
        } else {
            this.btnMsg = 'Save';
            this.quantityField = this.field;
        }
    },

    methods: {
        resetValue: function () {
            return {
                unit: 1,
                label: '',
                _id:  null,
                default: '',
                description: '',
                placeholder: '',
                _event: 'keyup',
                type: 'Quantity',
                allowRound: false,
                additionalCss: '',
                additionalStyles: '',
                allowCurrency: false,
                _tag: 'cost-quantity',
                icon: 'fas fa-calculator',
                alias: 'quantity_field_id_',
            };
        },
    },

    template: `
                <div class="ccb-modal-view" >
                    <div class="ccb-modal-row">
                        <h4 class="ccb-title">
                            <i v-bind:class="quantityField.icon"></i>
                            {{quantityField.type}}
                        </h4>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Label" v-model="quantityField.label" />
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Description" v-model="quantityField.description" />
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Placeholder" v-model="quantityField.placeholder" />
                            <div class="ccb-input-icon"><i class="fas fa-ellipsis-h"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Default Value" v-model="quantityField.default" />
                            <div class="ccb-input-icon"><i class="fas fa-calculator"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="number" placeholder="Add A Unit" v-model="quantityField.unit" />
                            <div class="ccb-input-icon"><i class="fas fa-calculator"></i></div>
                        </div>
                    </div>
                    <div class="ccb-currency-allow">
                        <div class="ccb-available-form-fields-container">
                            <ul class="ccb-form-checkboxes">
                                <li><input type="checkbox" id="allowCurrency" v-model="quantityField.allowCurrency"><label for="allowCurrency">{{ quantityField.allowCurrency ? 'Currency symbol on total description displayed' : 'Currency symbol on total description hidden' }}</label></li>
                                <li><input type="checkbox" id="allowRound" v-model="quantityField.allowRound" value="1"><label for="allowRound">{{ quantityField.allowRound ? 'Round value to Whole enabled' : 'Round value to Whole disabled' }}</label></li>
                            </ul>
                        </div>      
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional classes
                            </h4>
                        </div>
                        <input type="text" v-model="quantityField.additionalStyles">
                    </div>
                    
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional css
                            </h4>
                        </div>
                        <textarea type="text" v-model="quantityField.additionalCss"></textarea>
                    </div>
                    <button v-on:click="$emit(\'click\', quantityField, id, index)" class="ccb-submit-button">{{btnMsg}}</button>
                </div>
        `,
});
