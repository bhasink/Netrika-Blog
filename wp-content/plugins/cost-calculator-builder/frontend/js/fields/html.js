
Vue.component('html-field', {
    props: ['field', 'id', 'order', 'index'],

    data: function () {
        return {
            btnMsg: 'Add',
            htmlField: this.resetValue(),
        }
    },

    methods: {
        resetValue: function () {
            return {
                _id: null,
                _event: '',
                type: 'Html',
                htmlContent: '',
                placeholder: '',
                _tag: 'cost-html',
                additionalCss: '',
                additionalStyles: '',
                icon: 'fab fa-html5',
                label: '',
            }
        },

        saveItems: function () {
            let vm = this;
            vm.$emit('click', vm.htmlField, vm.id, this.index);
        },
    },

    created() {
        if (this.id === null) {
            this.htmlField = this.resetValue();
            this.htmlField._id = this.order;
        } else {
            this.btnMsg = 'Save';
            this.htmlField = this.field;
        }

        this.htmlField.label = `Html (${this.htmlField._id})`;
    },

    mounted() {


    },

    template: `
                 <div class="ccb-modal-view" >
                    <div class="ccb-modal-row">
                        <h4 class="ccb-title">
                            <i v-bind:class="htmlField.icon"></i>
                            {{htmlField.type}}
                        </h4>
                    </div>
                    <div class="ccb-modal-row">
                    <textarea name="" id="" v-model="htmlField.htmlContent"></textarea>
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional classes
                            </h4>
                        </div>
                        <input type="text" v-model="htmlField.additionalStyles">
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional css
                            </h4>
                        </div>
                        <textarea type="text" v-model="htmlField.additionalCss"></textarea>
                    </div>
                    <button v-on:click.prevent="saveItems" class="ccb-submit-button">{{btnMsg}}</button>
                 </div>
              `,
});