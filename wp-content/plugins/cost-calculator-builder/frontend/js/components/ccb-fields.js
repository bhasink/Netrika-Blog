function randomID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function hexToRgbA(hex, opacity = 1){
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + opacity + ')';
    }
    throw new Error('Bad Hex');
}

Vue.component('ccb-custom-color-field', {
    components: {
        'sketch-picker': VueColor.Chrome
    },
    props: ['field'],
    data() {
        return {
            colors: {
                hex: '#000000',
            },
            colorValue: '',
            displayPicker: false,
        }
    },
    mounted() {
            this.colorValue = this.field.default;
    },
    methods: {
        setColor(color) {
            this.updateColors(color);
            this.colorValue = color;
        },
        updateColors(color) {
            if(color.slice(0, 1) == '#') {
                this.colors = {
                    hex: color
                };
            }
            else if(color.slice(0, 4) == 'rgba') {
                var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
                    hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
                this.colors = {
                    hex: hex,
                    a: rgba[3],
                }
            }
        },
        showPicker() {
            document.addEventListener('click', this.documentClick);
            this.displayPicker = true;
        },
        hidePicker() {
            document.removeEventListener('click', this.documentClick);
            this.displayPicker = false;
        },
        togglePicker() {
            this.displayPicker ? this.hidePicker() : this.showPicker();
        },
        updateFromInput() {
            this.updateColors(this.colorValue);
        },
        updateFromPicker(color) {
            this.colors = color;
            if(color.rgba.a == 1) {
                this.colorValue = color.hex;
            }
            else {
                this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
            }
        },
        documentClick(e) {
            var el = this.$refs.colorpicker,
                target = e.target;
            if(el !== target && !el.contains(target)) {
                this.hidePicker()
            }
        },
        clear: function() {
            this.colorValue = "";
            this.field.value = "";
            this.field.__ob__.dep.notify()
        }
    },
    watch: {
        colorValue(val) {
            if(val) {
                this.updateColors(val);
                this.field.value = val;
                this.$emit('changed', null, null, val);
                this.field.__ob__.dep.notify()
            }
        }
    },
    template:`
		<div class="ccb-color-picer m-b-15">
			<label>{{field.label}}</label>
			<div class="input-group color-picker" ref="colorpicker">
				<span class="form-control color-picker-container" :style="'background-color: ' + colorValue" @click="togglePicker()"> </span>
				<sketch-picker :value="colors" @input="updateFromPicker" v-if="displayPicker"></sketch-picker>
				
				<div class="input-group-append">
					<button type="button" class="btn btn-light" @click="clear()">
                        <i class="fa fa-times-circle" aria-hidden="true"></i>
					</button>
				 </div>
			</div>
		</div>
	`,
});


Vue.component('ccb-custom-border-field', {
    props: [ 'element', 'field', 'index'],
    data: function(){
        return {
            store:  {},
            defaults: null,
            id: randomID(),
            dimension: 'px',
        }
    },
    created() {
        let vm       = this;
        vm.defaults  = vm.field.default;
        vm.color     = vm.defaults.color.value;
        vm.dimension = vm.field.dimension;
    },

    methods: {
        change: function (event, isGlobal = false) {
            let val = [], vm = this;
            for(let key in vm.defaults.width.options){
                if(isGlobal){
                    val.push(vm.defaults.value + vm.dimension);
                    vm.defaults.width.options[key].value = vm.defaults.value;
                } else{
                    val.push(vm.defaults.width.options[key].value + vm.dimension);
                }
            }


            vm.store[vm.defaults.width.name] = val.join(' ');
            vm.store[vm.defaults.style.name] = vm.defaults.style.value;
            vm.store[vm.defaults.color.name] = vm.defaults.color.value;
            vm.defaults.color.default = vm.defaults.color.value;
            vm.$emit('change',vm.element.name, vm.store, vm.field, vm.index);
        }
    },

    template: `           
                <ul class="list-group" id="generator-option" >
                    <li class="list-group-item">
                        <div class="option_name ccb-border-radius">
                            {{defaults.style.label}}
                        </div>
                        <div class="ccb-border-radius">                     
                           <select :id="'ccb_label_0_calc_id_' + id" v-model="defaults.style.value" @change="change">
                                <optgroup label="Drop Down field">
                                    <template v-for="(element) in defaults.style.options">
                                        {{element}}
                                        <option :value="element">{{element}}</option>
                                    </template>
                                </optgroup>
                            </select>
                        </div>    
                    </li>
                    <li class="list-group-item">
                        <div class="ccb-color-picker m-b-15">
                            <ccb-custom-color-field @changed="change" v-model="defaults.color.value" :field="defaults.color" :id="randomID()"></ccb-custom-color-field>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="option_name ccb-border-radius">
                            {{field.default.label}}
                        </div>
                        <div class="ccb-range-slider">
                            <input type="range" :min="defaults.min" @change="change(event, true)" v-model="defaults.value" :step="defaults.step" :max="defaults.max" class="ccb-range-slider__range">
                            <span class="ccb-range-slider__value">{{defaults.value}}{{field.dimension}}</span>
                        </div>
                    </li>
                    <li class="list-group-item" v-for="(element,key) in defaults.width.options">
                        <div class="option_name ccb-border-radius">
                            {{element.label}}
                        </div>
                        <div class="ccb-range-slider">                     
                            <input type="range" :min="defaults.min" @change="change" v-model=" defaults.width.options[key].value" :step="defaults.step" :max="defaults.max" class="ccb-range-slider__range">
                            <span class="ccb-range-slider__value">{{defaults.width.options[key].value}}{{dimension}}</span>
                        </div>    
                    </li>
                </ul>
                `,
});

Vue.component('ccb-custom-border-radius-field', {
    props: [ 'element', 'field', 'index'],
    data: function(){
        return {
            store:  {},
            defaults: null,
            id: randomID(),
            dimension: 'px',
        }
    },
    created() {
        let vm = this;
        vm.defaults  = vm.field.default;
        vm.demension = vm.field.demension;
    },

    methods: {
        change: function (event, isGlobal = false) {
            let val = [], vm = this;
            for(let key in vm.defaults.radius.options){
                if(isGlobal){
                    val.push(vm.defaults.value + vm.dimension);
                    vm.defaults.radius.options[key].value = vm.defaults.value;
                } else{
                    val.push(vm.defaults.radius.options[key].value + vm.dimension);
                }
            }

            vm.store[vm.defaults.radius.name] = val.join(' ');

            vm.$emit('change',vm.element.name, vm.store, vm.field, vm.index);
        }
    },

    template: `           
                <ul class="list-group" id="generator-option" >
                    <li class="list-group-item">
                        <div class="option_name ccb-border-radius">
                            {{field.default.label}}
                        </div>
                        <div class="ccb-range-slider">
                            <input type="range" :min="defaults.min" @change="change(event, true)" v-model="defaults.value" :step="defaults.step" :max="defaults.max" class="ccb-range-slider__range">
                            <span class="ccb-range-slider__value">{{defaults.value}}{{field.dimension}}</span>
                        </div>
                    </li>
                    <li class="list-group-item" v-for="(element,key) in defaults.radius.options">
                        <div class="option_name ccb-border-radius">
                            {{element.label}}
                        </div>
                        <div class="ccb-range-slider">                     
                            <input type="range" :min="defaults.min" @change="change" v-model=" defaults.radius.options[key].value" :step="defaults.step" :max="defaults.max" class="ccb-range-slider__range">
                            <span class="ccb-range-slider__value">{{defaults.radius.options[key].value}}{{field.dimension}}</span>
                        </div>    
                    </li>
                </ul>
                `,
});

Vue.component('ccb-custom-indentation-field', {
    props: ['element', 'field', 'index'],
    data: function(){
        return {
            store: {},
            defaults: null,
            dimension: 'px',
            id: randomID(),
        }
    },

    created() {
        let vm = this;
        vm.defaults  = vm.field.default;
    },

    methods: {
        change: function (event, isGlobal = false) {
            let val = [], vm = this;

            for(let key in vm.defaults.options)
                val.push(vm.defaults.options[key].value);

            vm.store[vm.field.name] = val.join(' ');
            vm.$emit('change',vm.element.name, vm.store, vm.field, vm.index);
        }
    },

    template: `                                       
                <ul class="list-group" id="generator-option" >
                    <li class="list-group-item" v-for="(element,key) in defaults.options">
                        <div class="option_name ccb-border-radius">
                            {{element.label}}
                        </div>
                        <div >                     
                            <input type="text" @input="change" v-model="defaults.options[key].value" class="ccb-indentation-field">
                        </div>    
                    </li>
                </ul>
                `,
});

Vue.component('ccb-custom-width-field', {
    props: [ 'element', 'field', 'index'],
    data(){
        return {
            defaults: null,
            dimension: 'px',
        }
    },

    created(){
        let vm = this;
        vm.defaults  = this.field.default;
        vm.dimension = this.field.dimension;
    },

    methods: {
        change: function () {
            let vm = this, val = {};
            val[vm.field.name] = vm.defaults.value + vm.dimension;
            vm.$emit('change',vm.element.name, val, vm.field, vm.index);
        },
    },

    template: `<ul class="list-group-item">
                        <li class="list-group">
                            <div class="ccb-range-slider">
                                <input type="range" @change="change" :min="defaults.min" v-model="defaults.value" :step="defaults.step" :max="defaults.max" class="ccb-range-slider__range">
                                <span class="ccb-range-slider__value">{{defaults.value}}{{dimension}}</span>
                            </div>
                        </li>
               </ul>
              `,
});

Vue.component('ccb-custom-text-settings-field', {
    props: ['element', 'field', 'index'],
    data(){
        return {
            store: {},
            id: randomID(),
            range: null,
            color: null,
            position: null,
            drop_down: null,
            text_shadow: null,
        }
    },

    created(){
        let vm = this;
        vm.range       = vm.field.range;
        vm.color       = vm.field.color;
        vm.position    = vm.field.position;
        vm.drop_down   = vm.field.drop_down;
        vm.text_shadow = vm.field.text_shadow;
    },

    methods: {
        change: function () {
            let vm = this, keys = [];

            for(let key in vm.drop_down)
                vm.store[vm.drop_down[key].name] = vm.drop_down[key].value === 'select' ? 'inherit' : vm.drop_down[key].value;

            for(let key in vm.range)
                vm.store[vm.range[key].name] = vm.range[key].default.value + vm.range[key].dimension;

            for(let key in vm.text_shadow.options)
                keys.push(vm.text_shadow.options[key].value + vm.text_shadow.options[key].dimension);

            vm.store[vm.color.name] = vm.color.value ? vm.color.value : vm.color.default;
            vm.store[vm.text_shadow.name] = keys.join(' ') + ' ' + hexToRgbA(vm.text_shadow.color.value,vm.text_shadow.opacity.value);

            vm.field.color.default = vm.store[vm.color.name];
            vm.$emit('change',vm.element.name, vm.store, vm.field, vm.index);
        }
    },

    template: `                                       
                 <ul class="list-group">
                    <li class="list-group-item">
                        <ccb-custom-color-field @changed="change" :field="color" :id="randomID()"></ccb-custom-color-field>
                    </li>
                    <li class="list-group-item" v-for="item in drop_down">
                        <div class="option_name ccb-border-radius">
                            {{item.label}}
                        </div>
                        <div class="ccb-border-radius">                     
                           <select @change="change" :id="'ccb_label_0_calc_id_' + id" v-model="item.value">
                                <optgroup label="Drop Down field">
                                    <template v-for="(element) in item.options">
                                        {{element}}
                                        <option :value="element">{{element === 'select' ? 'inherit' : element}}</option>
                                    </template>
                                </optgroup>
                            </select>
                        </div>    
                    </li>
                    <li class="list-group-item" v-for="element in range">
                         <div class="option_name ccb-border-radius">
                            {{element.label}}
                        </div>
                        <div class="ccb-range-slider">
                            <input type="range" @change="change" :min="element.default.min" v-model="element.default.value" :step="element.default.step" :max="element.default.max" class="ccb-range-slider__range">
                            <span class="ccb-range-slider__value">{{element.default.value}}{{element.default.dimension}}</span>
                        </div>
                    </li> 
                    <li class="list-group-item">
                        <div class="option_name">
                            {{text_shadow.label}}
                        </div>
                        <div class="text-shadow-wrapper">                     
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <template v-for="element in text_shadow.options">
                                         <div>
                                              <div class="option_name">
                                                   {{element.label}}
                                              </div>
                                              <div class="ccb-range-slider">
                                                  <input type="range" @change="change" :min="element.min" v-model="element.value" :step="element.step" :max="element.max" class="ccb-range-slider__range">
                                                  <span class="ccb-range-slider__value">{{element.value}}{{element.dimension}}</span>
                                              </div> 
                                         </div>
                                    </template>
                                    
                                        <div>
                                              <div class="option_name">
                                                   {{text_shadow.opacity.label}}
                                              </div>
                                              <div class="ccb-range-slider">
                                                  <input type="range" @change="change" :min="text_shadow.opacity.min" v-model="text_shadow.opacity.value" :step="text_shadow.opacity.step" :max="text_shadow.opacity.max" class="ccb-range-slider__range">
                                                  <span class="ccb-range-slider__value">{{text_shadow.opacity.value}}</span>
                                              </div> 
                                         </div>
                                      
                                    <ccb-custom-color-field @changed="change" :field="text_shadow.color" :id="randomID()"></ccb-custom-color-field>
                                </li>
                            </ul>
                        </div>    
                    </li>
                </ul>     
              `,
});

Vue.component('ccb-custom-box-shadow-field', {
    props: [ 'element', 'field', 'index'],
    data: function(){
        return {
            id: null,
            type: 'outline',
            store: {},
            line: null,
            range: null,
            color: null,
        }
    },
    created() {
        let vm   = this;
        vm.id    = randomID();
        vm.line  = vm.field.line.options;
        vm.range = vm.field.range;
        vm.color = vm.field.color;
    },

    methods: {
        change: function (event, type = '') {
            let vm = this, keys = [];

            if(type && type !== "null"){
                vm.type = type;
                type = type === "outline" ? '' : type;
            }

            for(let key in vm.range)
                keys.push(vm.range[key].value + vm.range[key].dimension);

            vm.store[vm.field.name] = type + ' ' + keys.join(' ') + ' ' + hexToRgbA(vm.field.color.shadow_color.value, vm.field.opacity.value);
            vm.$emit('change',vm.element.name, vm.store, vm.field, vm.index);
        },
    },

    template: `  <ul class="list-group " id="generator-option">
                    <li class="list-group-item" v-for="(element) in range">
                        <div class="option_name ccb-border-radius">
                            {{element.label}}
                        </div>
                        <div class="ccb-range-slider">
                            <input type="range" @change="change" :min="element.min" v-model="element.value" :step="element.step" :max="element.max" class="ccb-range-slider__range">
                            <span class="ccb-range-slider__value">{{element.value}}{{element.dimension}}</span>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="option_name ccb-border-radius">
                            {{field.opacity.label}}
                        </div>
                        <div class="ccb-range-slider">
                            <input type="range" :min="field.opacity.min" @change="change" v-model="field.opacity.value" :step="field.opacity.step" :max="field.opacity.max" class="ccb-range-slider__range">
                            <span class="ccb-range-slider__value">{{field.opacity.value}}</span>
                        </div>
                    </li>
                    <li class="list-group-item" v-for="(element) in color">
                         <div class="option_name">
                            <div class="ccb-color-picker m-b-15">
                                <ccb-custom-color-field @changed="change" :field="element" :id="randomID()"></ccb-custom-color-field>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item ccb-radio">
                        <div class="ccb-toggle">
                            <template v-for="(element, key) in line">
                                <input type="radio" @change="change(event, element.value)" :name="'line-' + id" :id="element.label + id" :checked="element.value === type"/>
                                <label :for="element.label + id"> {{element.label}}</label>
                            </template>
                        </div>
                    </li>
                </ul>`,
});


Vue.component('ccb-custom-single-color-field', {
    props: [ 'element', 'field', 'index'],
    data(){
        return {
            id: randomID(),
            store: {},
        }
    },

    methods: {
        change: function () {
            let vm = this;
            vm.store[vm.field.name] = vm.field.value;
            vm.field.default = vm.field.value;
            if(vm.element.name === 'range-button')
                vm.applyCss();
            else if(vm.element.name === 'radio-button')
                vm.renderRadio();
            else if(vm.element.name === 'checkbox')
                vm.renderCheckboxes();

            vm.$emit('change',vm.element.name, vm.store, vm.field, vm.index);
        },


        renderCheckboxes() {
            let vm = this;
            Vue.nextTick(function () {
                let $ = jQuery;
                let style = '';
                let id = 'ccb-checkbox-style';

                style +='.ccb-inner-wrapper .ccb-checkboxes label:before {background:'+ vm.element.fields[2].value +' !important; border-color: '+ vm.element.fields[1].value +' !important}';
                style +='.ccb-inner-wrapper .ccb-checkboxes input[type="checkbox"]:checked ~ label:before {border-color: '+ vm.element.fields[1].value +' !important}';
                style +='.ccb-inner-wrapper .ccb-checkboxes label:after {border-bottom: 2px solid '+ vm.element.fields[3].value +' !important; border-left: 2px solid '+ vm.element.fields[3].value +' !important}';

                if($('#' + id).length) $('#' + id).remove();
                let innerStyle = '<style type="text/css" id="' + id + '">'+ style +' </style>';

                $('head').append(innerStyle);
            })
        },

        renderRadio() {
            let vm = this;
            Vue.nextTick(function () {
                let $ = jQuery;
                let style = '';
                let id = 'ccb-radio-style';

                style +='.ccb-inner-wrapper  input[type=\'radio\'] {background:'+ vm.element.fields[2].value +' !important; border-color: '+ vm.element.fields[2].value +' !important}';
                style +='.ccb-inner-wrapper input[type=\'radio\']:checked:before {background:'+ vm.element.fields[1].value +' !important}';

                if($('#' + id).length) $('#' + id).remove();
                let innerStyle = '<style type="text/css" id="' + id + '">'+ style +' </style>';

                $('head').append(innerStyle);
            })
        },

        applyCss: function () {
            let vm = this;

            Vue.nextTick(function () {
                let $ = jQuery;
                let style = '';
                let id = 'ccb-range-slider-style';

                style += '.ccb-inner-wrapper .ccb-range-slider__range::-webkit-slider-thumb {background: '+ vm.element.fields[2].value +'  !important;}';
                style += '.ccb-inner-wrapper .ccb-range-slider__value {color: 7px solid ' + vm.element.fields[0].value + ' !important;}';
                style += '.ccb-inner-wrapper .ccb-range-slider__value:after {border-right: 7px solid ' + vm.element.fields[1].value + ' !important;} .ccb-inner-wrapper .ccb-range-slider input, .ccb-inner-wrapper .ccb-range-slider__value{ background: '+ vm.element.fields[1].value +' }';
                style += '.ccb-inner-wrapper .ccb-range-slider__range::-webkit-slider-thumb:hover { background: ' + vm.element.fields[3].value + ' !important;} .ccb-inner-wrapper .ccb-range-slider__range:focus::-webkit-slider-thumb { box-shadow: 0 0 0 3px #fff, 0 0 0 6px '+ vm.element.fields[3].value  +'; } .ccb-inner-wrapper .ccb-range-slider__range:active::-webkit-slider-thumb { background: ' + vm.element.fields[3].value + ' !important;}';

                if($('#' + id).length) $('#' + id).remove();
                let innerStyle = '<style type="text/css" id="' + id + '">'+ style +' </style>';

                $('head').append(innerStyle);
            })
        },

    },

    template: `
                 <ul class="list-group" id="generator-option">
                    <li class="list-group-item">
                        <div class="option_name">
                            <div class="ccb-color-picker m-b-15">
                                <ccb-custom-color-field @changed="change" :field="field" :id="randomID()"></ccb-custom-color-field>
                            </div>
                        </div>
                    </li>
                </ul>
    `,

});

Vue.component('ccb-custom-background-color-field', {
    props: [ 'element', 'field', 'index'],
    data(){
        return {
            id: randomID(),
            store: {},
            type: 'solid',
            solid_id: '',
            gradientDefault: '',
            solidDefault: '',
            gradient_id: '',
        }
    },
    created(){
        let vm = this;
        vm.type = vm.field.default;
        vm.solid_id = 'solid_' + randomID();
        vm.gradient_id = 'gradient' + randomID();
    },

    methods: {
        change: function () {
            let vm = this, current = vm.field[vm.type];
            vm.field.default = vm.type;
            vm.field[vm.type].default = current.value;

            if(vm.type === 'solid'){
                vm.store['background-image'] = '';
                vm.store['background-color'] = current.value;
            }
            else{
                vm.store['background-image'] = '';
                vm.store['background-image'] = 'linear-gradient(to right, ' + current[0].value  +', '+ current[1].value +')';

                vm.field[vm.type][0].default = current[0].value;
                vm.field[vm.type][1].default = current[1].value;
            }

            setTimeout(function () {
                vm.$emit('change',vm.element.name, vm.store, vm.field, vm.index);
            }, 10)
        },
    },

    watch: {

        type: function (val) {
            this.change();
        }
    },

    template: `
                <div>
                    <div class="ccb-toggle">
                        <input type="radio" @change="type = 'solid'" :name="'radio-' + id" :id="solid_id" :checked="type === 'solid'" />
                        <label :for="solid_id">Solid</label>
                        <input type="radio" @change="type = 'gradient'" :name="'radio-' + id" :id="gradient_id" :checked="type === 'gradient'"/>
                        <label :for="gradient_id">Gradient</label>
                    </div>
                    
                    <ul class="list-group" id="generator-option" v-if="type === 'solid'">
                        <li class="list-group-item">
                            <div class="option_name">
                                <div class="ccb-color-picker m-b-15">
                                    <keep-alive>
                                        <ccb-custom-color-field @changed="change" :field="field.solid" :id="randomID()"></ccb-custom-color-field>
                                    </keep-alive>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul class="list-group" id="generator-option" v-else>
                        <li class="list-group-item">
                            <div class="option_name">
                                <div class="ccb-color-picker m-b-15 ccb-gradient-picker">
                                    <template v-for="gradient_field in field.gradient">   
                                        <ccb-custom-color-field @changed="change" :field="gradient_field" :id="randomID()"></ccb-custom-color-field>
                                    </template>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
    `,
});