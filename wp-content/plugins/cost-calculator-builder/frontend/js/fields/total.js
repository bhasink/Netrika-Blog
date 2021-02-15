Vue.component('total-field', {
    props: ['available', 'field', 'id', 'order', 'index'],
    data: function () {
        return {
            btnMsg: 'Add',
            totalField: this.resetValue(),
        }
    },
    methods: {
        resetValue: function () {
            return {
                _id: null,
                currency: '$',
                type: 'Total',
                _tag: 'cost-total',
                costCalcFormula: '',
                additionalStyles: '',
                icon: 'fa-money-bill-alt',
                label: 'Total description',
            }
        },

        insertAtCursor: function (myValue) {
            let myField = document.querySelector('#ccb-formula-' + this.id);
            if (myField.selectionStart || myField.selectionStart === 0) {
                let startPos = myField.selectionStart;
                let endPos = myField.selectionEnd;
                myField.value = myField.value.substring(0, startPos)
                    + ' ' + myValue + ' '
                    + myField.value.substring(endPos, myField.value.length);
            } else {
                myField.value += ' ' + myValue;
            }
            this.totalField.costCalcFormula = myField.value;
        },
    },

    created() {
        if (this.id === null) {
            this.totalField = this.resetValue();
            this.totalField._id = this.order;

        } else {
            this.btnMsg = 'Save';
            this.totalField = this.field;
            this.order = this.order - 1;
        }
    },

    template: `
                <div class="ccb-modal-view">
                    <div class="ccb-modal-row">
                        <h4 class="ccb-title">
                            <i v-bind:class="totalField.icon"></i>
                            {{totalField.type}}
                        </h4>  
                    </div>
                    <div class="ccb-input-group ccb-input-group-icon">
                        <input type="text" placeholder="Label" v-model="totalField.label" />
                        <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                    </div>
                    <div class="ccb-modal-total-field-formula">
                        <h6 class="ccb-title">
                            Calculator formula
                        </h6>  
                        <textarea name="message" :id="'ccb-formula-' + id" placeholder="Enter any formula to calculate..." class="ccb-calc-input total-formula" v-model="totalField.costCalcFormula"></textarea>
                    </div>
                    <div class="ccb-tools-opacity ccb-form-wrap">  
                        <h6 class="ccb-title">
                            Available Fields
                        </h6>
                        <div class="ccb-cost-calc-block">
                            <template v-for="(item, index) in available" :key="index" v-if="item.alias">
                                <span :title="'This is available field'" class="formula-title"  v-on:click="insertAtCursor(item.alias)">
                                    {{item.alias}}                                
                                </span>
                            </template>
                        </div>
                    </div>
                    
                    <div class="ccb-tools-opacity ccb-form-wrap">  
                        <h6 class="ccb-title">
                            Available Operators
                        </h6>
                        <div class="ccb-cost-calc-block">
                            <span class="formula-title" title="Addition (+)" v-on:click="insertAtCursor('+')">+</span>
                            <span class="formula-title" title="Subtraction (-)" v-on:click="insertAtCursor('-')">-</span>
                            <span class="formula-title" title="Division (/)" v-on:click="insertAtCursor('/')">/</span>
                            <span class="formula-title" title="Remainder (%)" v-on:click="insertAtCursor('%')">%</span>
                            <span class="formula-title" title="Multiplication (*)" v-on:click="insertAtCursor('*')">*</span>
                            <span class="formula-title" title="Open bracket '('" v-on:click="insertAtCursor('(')">(</span>
                            <span class="formula-title" title="Close bracket ')'" v-on:click="insertAtCursor(')')">)</span>
                            <span class="formula-title" title="Math.round(x) returns the value of x rounded to its nearest integer:" v-on:click="insertAtCursor('Math.round(')">round</span>
                            <span class="formula-title" title="Math.pow(x, y) returns the value of x to the power of y:" v-on:click="insertAtCursor('Math.pow(')">pow</span>
                            <span class="formula-title" title="Math.sqrt(x) returns the square root of x:" v-on:click="insertAtCursor('Math.sqrt(')">sqrt</span>
                            <span class="formula-title" title="Math.abs(x) returns the absolute (positive) value of x:" v-on:click="insertAtCursor('Math.abs(')">abs</span>
                            <span class="formula-title" title="Math.ceil(x) returns the value of x rounded up to its nearest integer:" v-on:click="insertAtCursor('Math.ceil(')">ceil</span>
                            <span class="formula-title" title="Math.floor(x) returns the value of x rounded down to its nearest integer:" v-on:click="insertAtCursor('Math.floor(')">floor</span>
                        </div>
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional classes
                            </h4>
                        </div>
                        <input type="text" v-model="totalField.additionalStyles">
                    </div>
                    <button v-on:click="$emit(\'click\', totalField, id, index)" class="ccb-submit-button">{{btnMsg}}</button>
                </div>
              `,
});