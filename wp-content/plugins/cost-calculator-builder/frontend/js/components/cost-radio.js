Vue.component('cost-radio',{
    props: ['args', 'total', 'id', 'styles', 'calc'],

    data:function () {
        return {
            label: '',
            alias: '',
            classes: '',
            radioValue: [],
            description: '',
            allowRound: false,
            additionalCss: '',
            labelFor: '',
            radioButtons: null,
        }
    },

    methods: {
        randomID: function() {
            return '_' + Math.random().toString(36).substr(2, 9);
        },

        change: function(event, label){
            let vm = this, value = vm.radioValue;

            if(value.indexOf('_') !== -1){
                value = value.split('_')[0];
            }

            vm.$emit('change', {value: value, label: label}, vm.total, vm.id, vm.alias, 1, vm.allowRound)
        },

        applyCSS: function () {
            let vm = this;
            let radioStyles = vm.styles['radio-button'];
            Vue.nextTick(function () {
                let $ = jQuery;
                let style = '';
                let id = 'ccb-radio-button-style';

                if(radioStyles.radioBackground) {
                    style +='.ccb-inner-wrapper  input[type=\'radio\'] {background:'+ radioStyles.radioBackground +' !important; border-color: '+ radioStyles.radioBackground +' !important}';
                    style +='.ccb-inner-wrapper input[type=\'radio\']:checked:before {background:'+ radioStyles.radioColor +' !important}';
                }

                if($('#' + id).length) $('#' + id).remove();
                let innerStyle = '<style type="text/css" id="' + id + '">'+ style +' </style>';

                $('head').append(innerStyle);
            })
        },

        setExtraCss: function() {
            let type = typeof this.additionalCss;
            if(!(type === "undefined" || type === "string")) {
                this.additionalCss = this.additionalCss.split(';');
                if(this.additionalCss.length) {
                    for(let i = 0; i < this.additionalCss.length; i++) {
                        if(typeof this.styles === "object"){
                            if(typeof this.additionalCss[i] === "string"){
                                let temp = this.additionalCss[i].split(':');
                                this.styles['radio-button'][temp[0]] = temp[1];
                            }
                        }
                    }
                }
            }
        },
    },

    mounted(){
        let vm = this;

        vm.labelFor = 'option' + vm.randomID();

        if(vm.args){
            vm.alias = vm.args.alias;
            vm.classes = vm.args.additionalStyles;
            vm.label = vm.args.label ? vm.args.label : '';
            vm.radioButtons = vm.args.options ? vm.args.options : [];
            vm.description = vm.args.hasOwnProperty('description') ? vm.args.description : '';
            vm.radioValue = vm.args.hasOwnProperty('default') ?  vm.args.default : [];
            vm.additionalCss = vm.args.hasOwnProperty('additionalCss') ? vm.args.additionalCss : '';

            if(vm.args.hasOwnProperty('allowRound') && vm.args.allowRound)
                vm.allowRound = vm.args.allowRound;
        }

        vm.applyCSS();
        vm.setExtraCss();
    },

    template: `
               <div class="ccb-inner-wrapper" :class="'wrap_' + alias">
                    <label :style="styles.labels" v-if="styles">{{label}}:</label>
                    <template v-for="(item, index) in radioButtons" :key="index">
                        <input type="radio" :class="'radio_' + alias"  :id="labelFor + '_' + index" @change="change(event, item.optionText)" v-model="radioValue" :name="labelFor" :value="item.optionValue + '_' + index">
                        <label :style="styles['radio-button']" :for="labelFor + '_' + index" class="light" :class="classes">{{item.optionText}}</label><br>
                    </template>
                    <p class="ccb-inner-description" :style="styles['descriptions']"><small>{{description}}</small></p>
               </div>
              `,
});