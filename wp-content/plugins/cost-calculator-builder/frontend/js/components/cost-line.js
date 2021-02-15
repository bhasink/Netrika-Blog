Vue.component('cost-line', {
    props: ['args'],

    data: function () {
        return {
            styles: {
                width: '',
                classes: '',
                borderWidth: '',
                borderStyle: '',
                additionalCss: '',
            }
        }
    },

    created() {
        if (this.args) {
            this.classes = this.args.additionalStyles;
            this.styles.width = this.args.len ? this.args.len : 0;
            this.styles.borderWidth = this.args.size ? this.args.size : 0;
            this.styles.borderStyle = this.args.style ? this.args.style : 0;
            this.additionalCss = this.args.hasOwnProperty('additionalCss') ? this.args.additionalCss : '';
        }

        this.setExtraCss();

    },

    methods: {
        setExtraCss: function()
        {
            let type = typeof this.additionalCss;
            if(!(type === "undefined" || type === "string")) {
                this.additionalCss = this.additionalCss.split(';');
                if(this.additionalCss && this.additionalCss.length) {
                    for(let i = 0; i < this.additionalCss.length; i++) {
                        if(typeof this.styles === "object"){
                            if(typeof this.additionalCss[i] === "string"){
                                let temp = this.additionalCss[i].split(':');
                                this.styles['hr-line'][temp[0]] = temp[1];
                            }
                        }
                    }
                }
            }
        },
    },

    template: `
                <div class="ccb-inner-wrapper">
                    <hr class="ccb-hr" :style="styles['hr-line']" :class="classes" :style="styles">
                </div>
              `,
});