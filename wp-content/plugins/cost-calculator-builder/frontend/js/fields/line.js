Vue.component('line-field', {
    props: ['field', 'id', 'order', 'index'],
    data: function () {
        return {
            btnMsg: 'Add',
            lineField: this.resetValue(),
        }
    },

    created() {
        if (this.id === null) {
            this.lineField = this.resetValue();
            this.lineField._id = this.order;
        } else {
            this.btnMsg = 'Save';
            this.lineField = this.field;
        }
    },

    methods: {
        resetValue: function () {
            return {
                _id: null,
                _event: '',
                size: '1px',
                type: 'Line',
                len: 'medium',
                style: 'solid',
                _tag: 'cost-line',
                additionalCss: '',
                additionalStyles: '',
                icon: 'fas fa-ellipsis-h',
            };
        },
    },

    template:   `<div class="ccb-modal-view" data-id="9">
                    <div class="ccb-modal-row">
                        <h4 class="ccb-title">
                            <i :class="lineField.icon"></i>
                            {{lineField.type}}
                        </h4>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <select v-model="lineField.size" >
                                <option value="" selected>Select size</option>
                                <option value="1px">small</option>
                                <option value="2px">medium</option>
                                <option value="4px">large</option>
                            </select>
                            <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                        </div>
                         <div class="ccb-input-group ccb-input-group-icon">
                            <select v-model="lineField.style" >
                                <option value="" selected>Select style</option>
                                <option value="solid">solid</option>
                                <option value="dashed">dashed</option>
                            </select>
                            <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                        </div>
                        <div class="ccb-input-group ccb-input-group-icon">
                            <select v-model="lineField.len" >
                                <option value="" selected>Select length</option>
                                <option value="25%">short</option>
                                <option value="50%">medium</option>
                                <option value="100%">long</option>
                            </select>
                            <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                        </div>
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional classes
                            </h4>
                        </div>
                        <input type="text" v-model="lineField.additionalStyles">
                    </div>
                    <div class="ccb-additional-classes">
                        <div class="ccb-modal-row">
                            <h4 class="ccb-title">
                              <i class="fab fa-css3"></i>
                                Additional css
                            </h4>
                        </div>
                        <textarea type="text" v-model="lineField.additionalCss"></textarea>
                    </div>
                    <button @click="$emit(\'click\', lineField, id, index)" class="ccb-submit-button">{{btnMsg}}</button>
                </div class="ccb-modal-view">`,
});
