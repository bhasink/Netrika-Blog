Vue.component('cost-text', {
    props: ['args', 'id', 'styles', 'calc'],
    data: function(){
        return {
            label: '',
            classes: '',
            placeholder: '',
            description: '',
            additionalCss: '',
            id_for_label: 'text_area',
        }
    },

    mounted(){
        if(this.args){
            this.classes = this.args.additionalStyles;
            this.id_for_label = this.id_for_label + this.id + '_calc_id_' + this.calc;
            this.label = this.args.label ? this.args.label : '';
            this.description = this.args.hasOwnProperty('description') ? this.args.description : '';
            this.additionalCss = this.args.hasOwnProperty('additionalCss') ? this.args.additionalCss : '';
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
                                this.styles['text-area'][temp[0]] = temp[1];
                            }
                        }
                    }
                }
            }
        },
    },

    template: `
                <div class="ccb-inner-wrapper text-area" :class="'id_for_label_' + args._id">
                    <label :for="id_for_label" :style="styles.labels" v-if="styles">{{label}}:</label>
                    <textarea :style="styles['text-area']" :id="id_for_label" v:style="additionalCss" :placeholder="placeholder"></textarea>
                    <p class="ccb-inner-description" :style="styles['descriptions']"><small>{{description}}</small></p>
                </div>
              `,
});