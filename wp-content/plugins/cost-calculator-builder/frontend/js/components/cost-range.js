Vue.component('cost-range', {
    props: ['args', 'id', 'styles', 'total', 'calc'],
    data: function () {
        return {
            unit: 1,
            label: '',
            alias: '',
            step : null,
            bgColor: '',
            classes: '',
            rangeValue: 0,
            minValue: null,
            maxValue: null,
            description: '',
            additionalCss: '',
            allowRound: false,
        }
    },

    mounted() {
        let vm = this;
        if (vm.args) {
            vm.alias = vm.args.alias;
            vm.classes = vm.args.additionalStyles;
            vm.label = vm.args.label ? vm.args.label : '';
            vm.unit = Number(vm.args.unit) ? Number(vm.args.unit) : 1;
            vm.step = Number(vm.args.step) ? Number(vm.args.step) : 100;
            vm.minValue = Number(vm.args.minValue) ? Number(vm.args.minValue) : 0;
            vm.maxValue = Number(vm.args.maxValue) ? Number(vm.args.maxValue) : 100;
            vm.description = vm.args.hasOwnProperty('description') ? vm.args.description : '';
            vm.additionalCss = vm.args.hasOwnProperty('additionalCss') ? vm.args.additionalCss : '';

            let defVal = Number(vm.args.default) ? Number(vm.args.default) : vm.rangeValue;
            defVal = defVal > vm.maxValue || defVal < vm.minValue ? vm.rangeValue : defVal;
            vm.rangeValue = defVal;

            if(vm.args.hasOwnProperty('allowRound') && vm.args.allowRound)
                vm.allowRound = vm.args.allowRound;
        }

        vm.applyCSS();
        vm.setExtraCss();
    },

    methods: {

        changeVal(val) {
            this.rangeValue = val;
        },

        applyCSS: function () {
            let vm = this;
            let rangeStyles = vm.styles['range-button'];
            Vue.nextTick(function () {
                let $ = jQuery;
                let style = '';
                let id = 'ccb-range-slider-style';
                style += '.ccb-range-slider__range::-webkit-slider-thumb {background: '+ rangeStyles.circleColor +'  !important;}';
                style += '.ccb-inner-wrapper .ccb-range-slider__value:after {border-right: 7px solid ' + rangeStyles.lineColor + ';} .ccb-inner-wrapper .ccb-range-slider input, .ccb-inner-wrapper .ccb-range-slider__value{ background: '+ rangeStyles.lineColor +' }';
                style += '.ccb-range-slider__range::-webkit-slider-thumb:hover { background: ' +rangeStyles.bColor + ' !important;} .ccb-range-slider__range:focus::-webkit-slider-thumb { box-shadow: 0 0 0 3px #fff, 0 0 0 6px '+ rangeStyles.bColor  +'; } .ccb-range-slider__range:active::-webkit-slider-thumb { background: ' + rangeStyles.bColor + ' !important;}';

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
                                this.styles['range-button'][temp[0]] = temp[1];
                            }
                        }
                    }
                }
            }
        },
    },

    template: `
                  <div class="ccb-inner-wrapper" :class="'wrap_' + alias">
                        <label :style="styles.labels" v-if="styles">{{label}}:</label>
                        <div class="ccb-range-slider">
                            <input :style="styles['range-button']" :data-alias="alias" class="ccb-range-slider__range" v-bind:style="additionalCss" type="range" value="0" :class="classes" :min="minValue" :step="step" :max="maxValue" v-model="rangeValue" v-on:change="$emit(\'change\', rangeValue, total, id, alias, unit, allowRound)">
                            <span class="ccb-range-slider__value" :style="{'color': styles['range-button']['fColor']}">{{rangeValue}}</span>
                        </div>
                        <p class="ccb-inner-description" :style="styles['descriptions']"><small>{{description}}</small></p>
                  </div>
              `,
});