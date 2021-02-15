Vue.component('cost-checkbox', {
    props: ['args', 'total', 'id', 'styles', 'calc'],
    data: function () {
        return {
            label: '',
            alias: '',
            styles: '',
            classes: '',
            checkboxes: '',
            description: '',
            checkboxValue: [],
            additionalCss: '',
            allowRound: false,
            labelFor: '',
        }
    },

    mounted() {
        let vm = this;

        vm.labelFor = 'option' + vm.randomID();

        if (vm.args) {
            vm.alias = vm.args.alias;
            vm.classes = vm.args.additionalStyles;
            vm.label = vm.args.label ? this.args.label : '';
            vm.checkboxes = vm.args.options ? vm.args.options : '';
            vm.description = vm.args.hasOwnProperty('description') ? vm.args.description : '';
            vm.additionalCss = vm.args.hasOwnProperty('additionalCss') ? vm.args.additionalCss : '';

            if(vm.args.hasOwnProperty('allowRound') && vm.args.allowRound)
                vm.allowRound = vm.args.allowRound;
        }
        vm.applyCSS();
        vm.setExtraCss();
    },

    methods: {
        changed: function (event, label) {
            let vm = this;
            let removed = true;
            if (event.target.checked) {
                vm.checkboxValue.push({value: parseFloat(event.target.value), label});
            } else {
                vm.checkboxValue.forEach(function (element, index) {
                    if (element.value + '_' + index === event.target.value + '_' + index && removed) {
                        removed = false;
                        vm.checkboxValue.splice(index, 1);
                    }
                });
            }

            vm.$emit('change', vm.checkboxValue, vm.total, vm.id, vm.alias, 1, vm.allowRound)
        },

        randomID: function() {
            return '_' + Math.random().toString(36).substr(2, 9);
        },

        applyCSS: function () {
            let vm = this;
            let checkbox = vm.styles['checkbox'];
            vm.styles['checkbox'].padding = '';
            vm.styles['checkbox'].width = '';
            Vue.nextTick(function () {
                let $ = jQuery;
                let style = '';
                let id = 'ccb-checkbox-style';

                if(checkbox.b_color) {
                    style +='.ccb-inner-wrapper .ccb-checkboxes label:before {background:'+ checkbox.bg_color +' !important; border-color: '+ checkbox.b_color +' !important}';
                    style +='.ccb-inner-wrapper .ccb-checkboxes input[type="checkbox"]:checked ~ label:before {border-color: '+ checkbox.b_color +' !important}';
                    style +='.ccb-inner-wrapper .ccb-checkboxes label:after {border-bottom: 2px solid '+ checkbox.checkedColor +' !important; border-left: 2px solid '+ checkbox.checkedColor +' !important}';
                }

                if($('#' + id).length) $('#' + id).remove();
                let innerStyle = '<style type="text/css" id="' + id + '">'+ style +' </style>';

                $('head').append(innerStyle);
            })
        },

        setExtraCss: function()
        {
            let type = typeof this.additionalCss;
            if(!(type === "undefined" || type === "string")){
                this.additionalCss = this.additionalCss.split(';');
                if(this.additionalCss.length) {
                    for(let i = 0; i < this.additionalCss.length; i++) {
                        if(typeof this.styles === "object"){
                            if(typeof this.additionalCss[i] === "string"){
                                let temp = this.additionalCss[i].split(':');
                                this.styles['checkbox'][temp[0]] = temp[1];
                            }
                        }
                    }
                }
            }
        },

    },

    template: `<div class="ccb-inner-wrapper " :class="'wrap_' + alias">
                  <label :style="styles.labels" v-if="styles">{{label}}:</label>
                  <div v-for="(item, index) in checkboxes" :key="index" class="ccb-checkboxes">
                     <input type="checkbox" v-bind:style="additionalCss" :id="labelFor + '_' + index" type="checkbox" :class="'checkbox_' + alias"  :value="item.optionValue" @change="changed(event,item.optionText)">
                     <label :style="styles['checkbox']" class="light" :for="labelFor + '_' + index" :class="classes"><span>{{item.optionText}}</span></label><br>
                  </div>
                  <p class="ccb-inner-description" :style="styles['descriptions']"><small>{{description}}</small></p>
              </div>
              `,
});