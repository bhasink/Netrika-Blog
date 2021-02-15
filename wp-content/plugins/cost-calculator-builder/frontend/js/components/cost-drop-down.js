(function ($) {
    Vue.component('cost-drop-down', {
        props: ['args', 'total', 'id', 'styles', 'calc'],
        data: function () {
            return {
                alias: '',
                label: '',
                classes: '',
                options: null,
                optionData: [],
                selectValue: '',
                description: '',
                additionalCss: '',
                allowRound: false,
                label_id: 'ccb_label',
            }
        },

        created() {
            let vm = this;
            if (vm.args) {
                vm.alias = vm.args.alias;
                vm.classes = vm.args.additionalStyles;
                vm.label = vm.args.label ? vm.args.label : '';
                vm.label_id += '_' + vm.id + '_calc_id_' + vm.calc;
                vm.options = vm.args.options ? vm.getOptions(vm.args.options) : '';
                vm.description = vm.args.hasOwnProperty('description') ? vm.args.description : '';
                vm.selectValue = vm.args.default && vm.args.default ? vm.args.default : '';
                vm.additionalCss = vm.args.hasOwnProperty('additionalCss') ? vm.args.additionalCss : '';
                if(vm.args.hasOwnProperty('allowRound') && vm.args.allowRound)
                    vm.allowRound = vm.args.allowRound;
            }
        },

        mounted() {
            if (jQuery.fn.select2) {
                this.listeningForSelect2();
            }

            this.setExtraCss();
        },

        methods: {

            setExtraCss: function() {
                let type = typeof this.additionalCss;
                if(!(type === "undefined" || type === "string")) {
                    this.additionalCss = this.additionalCss.split(';');
                    if(this.additionalCss.length) {
                        for(let i = 0; i < this.additionalCss.length; i++) {
                            if(typeof this.styles === "object"){
                                if(typeof this.additionalCss[i] === "string"){
                                    let temp = this.additionalCss[i].split(':');
                                    this.styles['drop-down'][temp[0]] = temp[1];
                                }
                            }
                        }
                    }
                }
            },

            getOptions: function (options) {

                let readyOptions = '<optgroup label="' + this.label + '">';
                let i = 0;

                for (let optionCount in options) {
                    if(typeof options[optionCount] !== "function") {
                        this.optionData.push({value: options[optionCount].optionValue, label: options[optionCount].optionText});
                        let value = options[optionCount].optionValue ? options[optionCount].optionValue : 0;
                        readyOptions += '<option value="' + value + '_' + i +'">' + options[optionCount].optionText + '</option>';
                        i++
                    }
                }

                readyOptions += '<optgroup>';
                return readyOptions;
            },

            listeningForSelect2: function () {
                let vm = this;
                $('#' + vm.label_id).on('select2:select', function (e) {
                    let selectedVal = $(this).select2('val');
                    vm.$emit('change', selectedVal, vm.total, vm.id, vm.alias);
                });
            },

            change: function () {
                let [val, index] = this.selectValue.split('_');
                let option = null;
                this.optionData.forEach((element, key) => {
                    if(!option && element.value == val && index == key){
                        option = JSON.parse(JSON.stringify(element));
                    }
                });

                this.$emit('change', {value: val, label: option.label}, this.total, this.id, this.alias, 1, this.allowRound)
            }
        },

        template: ` <div class="ccb-inner-wrapper" :class="'wrap_' + alias">
                        <label :style="styles.labels" v-if="styles">{{label}}:</label>
                        <select :style="styles['drop-down']" :data-alias="alias" :id="label_id" v-model="selectValue" v-on:change="change" v-html="options"></select>
                        <p class="ccb-inner-description" :style="styles['descriptions']"><small>{{description}}</small></p>
                    </div>
              `,
    });
})(jQuery);