Vue.component('range-field', {
    props: ['field', 'id', 'order', 'index'],
    data: function () {
        return {
            btnMsg: 'Add',
            rangeField: this.resetValue(),
        }
    },

    created() {
        if (this.id === null) {
            this.rangeField = this.resetValue();
            this.rangeField._id = this.order;
            this.rangeField.alias = this.rangeField.alias + this.rangeField._id;
        } else {
            this.btnMsg = 'Save';
            this.rangeField = this.field;
        }
    },

    methods: {
        resetValue: function () {
            return {
                step: 1,
                unit: 1,
                label: '',
                default: '',
                _id:  null,
                minValue: 0,
                maxValue: 100,
                description: '',
                _event: 'change',
                additionalCss: '',
                allowRound: false,
                _tag: 'cost-range',
                additionalStyles: '',
                allowCurrency: false,
                type: 'Range Button',
                icon: 'far fa-exchange',
                alias: 'range_field_id_',
            }
        },
    },

    template: `
                <div class="ccb-modal-view">
                    <div class="ccb-modal-row">
                        <h4 class="ccb-title">
                            <i v-bind:class="rangeField.icon"></i>
                            {{rangeField.type}}
                        </h4>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Label" v-model="rangeField.label" />
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Description" v-model="rangeField.description" />
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="number" placeholder="Min Value" class="ccb-num"
                                   v-model="rangeField.minValue"/>
                            <div class="ccb-input-icon"><i class="fas fa-backward"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon ccb-num">
                            <input type="number" placeholder="Max Value" class="ccb-num"
                                   v-model="rangeField.maxValue"/>
                            <div class="ccb-input-icon"><i class="fas fa-forward"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon ccb-num">
                            <input type="number" placeholder="Step" class="ccb-num" v-model="rangeField.step"/>
                            <div class="ccb-input-icon"><i class="far fa-signal"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Default Value" v-model="rangeField.default" />
                            <div class="ccb-input-icon"><i class="fas fa-calculator"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon ccb-num">
                            <input type="number" placeholder="Add A Unit" class="ccb-num" v-model="rangeField.unit"/>
                            <div class="ccb-input-icon"><i class="fas fa-calculator"></i></div>
                        </div>
                    </div>
                    <div class="ccb-currency-allow">
                        <div class="ccb-available-form-fields-container">
                            <ul class="ccb-form-checkboxes">
                                <li><input type="checkbox" id="allowCurrency" v-model="rangeField.allowCurrency"><label for="allowCurrency">{{ rangeField.allowCurrency ? 'Currency symbol on total description displayed' : 'Currency symbol on total description hidden' }}</label></li>
                                <li><input type="checkbox" id="allowRound" v-model="rangeField.allowRound" value="1"><label for="allowRound">{{ rangeField.allowRound ? 'Round value to Whole enabled' : 'Round value to Whole disabled' }}</label></li>
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
                        <input type="text" v-model="rangeField.additionalStyles">
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional css
                            </h4>
                        </div>
                        <textarea type="text" v-model="rangeField.additionalCss"></textarea>
                    </div>
                    <button v-on:click="$emit(\'click\', rangeField, id, index)" class="ccb-submit-button">{{btnMsg}}</button>
                </div>
            `,
});
