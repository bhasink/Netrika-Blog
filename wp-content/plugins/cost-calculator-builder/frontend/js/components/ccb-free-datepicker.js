Vue.component('ccb-free-datepicker', {
    data: function(){
        return {

        }
    },
    template: `
            <div class="ccb-modal-view">
                <div class="ccb-modal-row">
                    <h4 class="ccb-title">
                        <i class="fa-calendar-week"></i>
                        Date Picker
                    </h4>
                </div>
                <div class="ccb-locked-section">
                    <span>
                      <i class="fas fa-lock"></i>
                      <h4>This feature is part of Premium Add-on</h4>
                      <a href="https://stylemixthemes.com/cost-calculator-plugin/" target="_blank"
                         class="ccb-plugin-buy-now-btn">Buy Now</a>
                    </span>
                </div>
                <button v-on:click="$emit(\'click\')" class="ccb-submit-button">Close</button>
            </div>
   `,
});