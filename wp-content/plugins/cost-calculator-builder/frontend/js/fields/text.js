Vue.component('text-area-field', {
    props: ['field', 'id', 'order', 'index'],
    data: function () {
        return {
            btnMsg: 'Add',
            textField: this.resetValue(),
        }
    },

    created() {
        if (this.id === null) {
            this.textField = this.resetValue();
            this.textField._id = this.order;
        } else {
            this.btnMsg = 'Save';
            this.textField = this.field;
        }

    },
    methods: {
        resetValue: function () {
            return {
                label: '',
                _event: '',
                _id: null,
                description: '',
                placeholder: '',
                _tag: 'cost-text',
                type: 'Text Area',
                additionalCss: '',
                additionalStyles: '',
                icon: 'far fa-pencil',
            };
        },
    },
    template: `
                <div class="ccb-modal-view" data-id="8">
                    <div class="ccb-modal-row">
                        <h4 class="ccb-title">
                            <i v-bind:class="textField.icon"></i>
                            {{textField.type}}
                        </h4>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Label" v-model="textField.label" />
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Description" v-model="textField.description" />
                            <div class="ccb-input-icon"><i class="far fa-quote-right"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <input type="text" placeholder="Placeholder" v-model="textField.placeholder" />
                            <div class="ccb-input-icon"><i class="fas fa-ellipsis-h"></i></div>
                        </div>
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional classes
                            </h4>
                        </div>
                        <input type="text" v-model="textField.additionalStyles">
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional css
                            </h4>
                        </div>
                        <textarea type="text" v-model="textField.additionalCss"></textarea>
                    </div>
                    <button v-on:click="$emit(\'click\', textField, id, index)" class="ccb-submit-button">{{btnMsg}}</button>
                </div>
              `,
});
