Vue.component('cost-quantity', {
    props: ['args', 'total', 'id', 'styles', 'calc', 'css'],

    data: function () {
        return {
            unit: 1,
            alias: '',
            label: '',
            classes: '',
            description: '',
            placeholder: '',
            quantityValue: 0,
            additionalCss: '',
            allowRound: false,
            id_for_label: 'quantity_',
        }
    },

    mounted() {
        let vm = this;

        if (vm.args) {
            vm.alias = vm.args.alias;
            vm.classes = vm.args.additionalStyles;
            vm.label = vm.args.label ? vm.args.label : '';
            vm.placeholder = vm.args.placeholder ? vm.args.placeholder : '';
            vm.unit = parseFloat(vm.args.unit) ? parseFloat(vm.args.unit) : 1;
            vm.id_for_label = vm.id_for_label + vm.id + '_calc_id_' + vm.calc;
            vm.quantityValue = parseFloat(vm.args.default) ? parseFloat(vm.args.default) : null;
            vm.description = vm.args.hasOwnProperty('description') ? vm.args.description : '';
            vm.additionalCss = vm.args.hasOwnProperty('additionalCss') ? vm.args.additionalCss : '';
            vm.allowRound = vm.args.hasOwnProperty('allowRound') && vm.args.allowRound ? vm.args.allowRound : vm.allowRound;
        }

        vm.setExtraCss();
    },

    methods: {
        setExtraCss: function() {
            let type = typeof this.additionalCss;
            if(!(type === "undefined" || type === "string")){
                this.additionalCss = this.additionalCss.split(';');
                if(this.additionalCss.length) {
                    for(let i = 0; i < this.additionalCss.length; i++) {
                        if(typeof this.styles === "object"){
                            if(typeof this.additionalCss[i] === "string"){
                                let temp = this.additionalCss[i].split(':');
                                this.styles['quantity'][temp[0]] = temp[1];
                            }
                        }
                    }
                }
            }
        },
    },

    template: `
                 <div class="ccb-inner-wrapper" :class="'wrap_' + alias">
                    <label :style="styles.labels" :for="id_for_label" v-if="styles">{{label}}:</label>
                    <input type="number" :style="styles['quantity']" :data-alias="alias"  v-bind:style="additionalCss" :class="classes" :placeholder="placeholder" :id="id_for_label" v-model="quantityValue"  v-on:input="$emit('keyup', quantityValue, total, id, alias, unit, allowRound)">
                    <p class="ccb-inner-description" :style="styles['descriptions']"><small>{{description}}</small></p>
                </div>
              `,
});