Vue.component('stm-show-preview', {
    props: ['field', 'styles', 'total', 'id'],

    data: function(){
        return {
            value: null,
            range: false,
        }
    },

    created(){
        this.range = this.field.range && Boolean(parseInt(this.field.range)) ? true : this.range;
        this.applyCSS();
    },

    watch : {
        styles : {
            deep : true,
            handler : function(value) {
                this.applyCSS();
            }
        }
    },

    methods: {
        stmCallback: function (value, total, id, alias, unit) {
            this.$emit('stm-callback', value, total, id, alias, unit);
        },
        applyCSS : function() {
            let _this = this;
            Vue.nextTick(function () {
                if(!_this.styles['date-picker']) return;
                let styleId = 'custom_styles';
                let $ = jQuery;
                if($('#' + styleId).length) $('#' + styleId).remove();

                let datePickerStyles = _this.styles['date-picker'];
                let innerStyle = '<style id="' + styleId + '"> .mx-datepicker-popup { background-color: ' + datePickerStyles['background-color'] + '}</style>';
                $('head').append(innerStyle);
            })
        }
    },
    template: `
                <template v-if="field._tag === 'cost-quantity'">
                    <cost-quantity 
                        :id="id"
                        :args="field"
                        :total="total"
                        :styles="styles"
                        v-on:keyup="stmCallback">
                    </cost-quantity>
                </template>
                
                <template v-else-if="field._tag === 'cost-range'">
                    <cost-range 
                        :id="id"
                        :args="field"
                        :total="total"
                        v-on:change="stmCallback"
                        :styles="styles"
                        >
                    </cost-range>
                </template>
                
                <template v-else-if="field._tag === 'cost-drop-down'">
                    <cost-drop-down 
                        :id="id"
                        :args="field"
                        :total="total"
                        v-on:change="stmCallback"
                        :styles="styles"
                        >
                    </cost-drop-down>
                </template>
                
                <template v-else-if="field._tag === 'cost-checkbox'">
                    <cost-checkbox 
                        :id="id"
                        :args="field"
                        :total="total"
                        v-on:change="stmCallback"
                        :styles="styles"
                        >
                    </cost-checkbox>
                </template>
                
                <template v-else-if="field._tag === 'cost-radio'">
                    <cost-radio 
                        :id="id"
                        :args="field"
                        :total="total"
                        v-on:change="stmCallback"
                       :styles="styles"
                        >
                    </cost-radio>
                </template>
                              
                <template v-else-if="field._tag === 'cost-html'">
                    <cost-html :styles="styles" :args="field"></cost-html>
                </template>
                                
                <template v-else-if="field._tag === 'date-picker'">
                    <div class="ccb-inner-wrapper">
                        <label>{{field.label}}</label>
                        <div class="ccb-date-picker">
                            <date-picker
                                :range="range"
                                confirm lang='en'
                                :clearable='false'
                                format='DD/MM/YYYY'
                                :first-day-of-week='1'
                                v-model="value"
                                :style="styles['date-picker']"
                                v-on:change="$emit('calendar-event', field._id, total, id, field.alias, value)"
                            >
                            </date-picker>
                        </div>
                    </div>
                </template>
                
                <template v-else-if="field._tag === 'cost-line'">
                    <cost-line :args="field"></cost-line>
                </template>
                
                <template v-else-if="field._tag === 'cost-text'">
                    <cost-text :styles="styles" :id="id" :args="field"></cost-text>
                </template>
              `,
});