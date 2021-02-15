Vue.component('ccb-condition-free', {
    props: ['toggle'],
    methods: {
        saveConditionSettings() {
            this.$emit('save', [], true);
        },

        toggleCondition(val) {
            setTimeout(() => {
                if(val){
                    jQuery('.ccb-condition').slideDown();
                }
                else
                {
                    jQuery('.ccb-condition').slideUp();
                }
            }, 0);
        }
    },

    created() {
        let vm = this;
        vm.toggleCondition(this.toggle);
    },


    watch: {
        toggle(val){
            this.toggleCondition(val);
        }
    },

    computed: {
        containerDisplay() {
            return {
                'style': this.toggle ? 'block' : 'none'
            }
        }
    },

    template: `
        <div class="ccb-condition">
            <div class="ccb-condition-wrap is-open">
                <div class="ccb-c-container free">
                    <div class="ccb-locked-section">
                        <span>
                          <i class="fas fa-lock"></i>
                          <h4>This feature is part of Premium Add-on</h4>
                          <a href="https://stylemixthemes.com/cost-calculator-plugin/" target="_blank"
                             class="ccb-plugin-buy-now-btn">Buy Now</a>
                        </span>
                    </div>
                </div> 
            </div>
        </div>
              
    `
});
