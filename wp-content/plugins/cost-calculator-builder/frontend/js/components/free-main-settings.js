Vue.component('free-main-settings', {
    props: ['field', 'id', 'forms', 'products'],
    settingsField: null,
    data: function(){
        return {
            settingsField: null,
        }
    },
    methods: {
        saveSettings(){
            let vm = this;
            vm.$emit('set-settings', this.settingsField, 0);
        },
        resetValue(){
            return {
                general: {
                    header_title: 'Total Summary',
                    descriptions: 'show',
                    boxStyle: 'vertical',
                },
                currency: {
                    currency: '$',
                    num_after_integer: 2,
                    decimal_separator: '.',
                    thousands_separator: ',',
                    currencyPosition: 'left_with_space',
                },

                formFields: {
                    fields: [],
                    emailSubject: '',
                    submitBtnText: '',
                    contactFormId: '',
                    accessEmail: false,
                    adminEmailAddress: '',
                    allowContactForm: false,
                    body: 'Total: [ccb-total-0]',
                },

                paypal: {
                    enable: false,
                    description: '[ccb-total-0]',
                    paypal_email: '',
                    currency_code: '',
                    paypal_mode: 'sandbox',
                },

                wooCommerce: {
                    enable: false,
                    product_id: '',
                    description: '[ccb-total-0]',
                    redirect_to: 'cart',
                },

                stripe: {
                    enable: false,
                    secretKey: '',
                    publishKey: '',
                    description: '[ccb-total-0]',
                },
                recaptcha: {
                    enable: false,
                    siteKey: '',
                    secretKey: '',
                },

                icon: 'fas fa-cogs',
                type: 'Cost Calculator Settings',
            }
        }
    },

    created() {
        let vm = this;
        if (vm.id === null || !vm.field) {
            vm.settingsField = vm.resetValue();
        } else {
            vm.settingsField = vm.field;
            if(!vm.settingsField.hasOwnProperty('descriptions'))
                vm.settingsField.description = 'show';
        }
    },

    template: `
        <div class="ccb-modal-view" >
            <div class="ccb-modal-row ccb-settings-title">
                <h4 class="ccb-title">
                    <i class="fas fa-cogs"></i>
                    COST CALCULATOR SETTINGS
                </h4>
            </div>
            <main class="ccb-main-wrapper">
                <input id="ccb-general-radio" type="radio" name="ccb-tabs" checked>
                <input id="ccb-form-radio" type="radio" name="ccb-tabs">
                <input id="ccb-currency-radio" type="radio" name="ccb-tabs">
                <input id="ccb-form-radio" type="radio" name="ccb-tabs">
                <input id="ccb-woocommerce-radio" type="radio" name="ccb-tabs">
                <input id="ccb-stripe-radio" type="radio" name="ccb-tabs">
                <input id="ccb-paypal-radio" type="radio" name="ccb-tabs">
                <input id="ccb-recaptcha-radio" type="radio" name="ccb-tabs">
                <div id="ccb-tabs-wrap">
                    <label id="ccb-general" for="ccb-general-radio"><i class="fas fa-cog"></i>General</label>
                    <label id="ccb-currency" for="ccb-currency-radio"><i class="fas fa-money-bill"></i>Currency</label>
                    <label id="ccb-form" for="ccb-form-radio"><i class="fas fa-envelope"></i>Send Form</label>
                    <label id="ccb-woocommerce" for="ccb-woocommerce-radio"><i class="fab fa-woocommerce"></i>WooCommerce</label>
                    <label id="ccb-stripe" for="ccb-stripe-radio"><i class="fab fa-cc-stripe"></i>Stripe</label>
                    <label id="ccb-paypal" for="ccb-paypal-radio"><i class="fab fa-paypal"></i>PayPal</label>
                    <label id="ccb-recaptcha" for="ccb-recaptcha-radio"><i class="fab fas-recaptcha"></i>reCAPTCHA</label>
                </div>
                <div id="ccb-content">
                    <section id="ccb-general" v-if="settingsField.general">
                           <div>
                              <h4 class="ccb-title">Total Header Title</h4>
                              <div class="ccb-input-group ccb-input-group-icon">
                                  <input type="text" placeholder="Enter title" v-model="settingsField.general.header_title"/>
                                  <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                              </div>
                          </div>
                          <div>
                              <h4 class="ccb-title">Select Box Style of Form</h4>
                              <div class="ccb-input-group ccb-input-group-icon">
                                 <select v-model="settingsField.general.boxStyle">
                                    <option value="vertical">Vertical</option>
                                    <option value="horizontal">Horizontal</option>
                                 </select>
                                <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                             </div>
                          </div>
                          <div>
                              <h4 class="ccb-title">Show/Hide Total descriptions</h4>
                              <div class="ccb-input-group ccb-input-group-icon">
                                 <select v-model="settingsField.general.descriptions">
                                    <option value="show">show</option>
                                    <option value="hide">hide</option>
                                 </select>
                                <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                             </div>
                          </div>
                    </section>
                    
                    <section id="ccb-currency" v-if="settingsField.currency">
                          <div>
                              <h4 class="ccb-title">Enter a currency symbol</h4>
                              <div class="ccb-input-group ccb-input-group-icon">
                                 <input type="text" placeholder="Currency" v-model="settingsField.currency.currency"/>
                                 <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                              </div>
                          </div>
                          <div>
                              <h4 class="ccb-title">Currency Position</h4>
                              <div class="ccb-input-group ccb-input-group-icon">
                                 <select v-model="settingsField.currency.currencyPosition">
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                    <option value="left_with_space">Left with space</option>
                                    <option value="right_with_space">Right with space</option>
                                 </select>
                                <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                             </div>
                          </div>
                          <div>
                              <h4 class="ccb-title">Thousands separator</h4>
                              <div class="ccb-input-group ccb-input-group-icon">
                                  <input type="text" placeholder="Thousands separator" v-model="settingsField.currency.thousands_separator"/>
                                  <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                              </div>
                          </div>
                          <div>
                              <h4 class="ccb-title">Decimal separator</h4>
                              <div class="ccb-input-group ccb-input-group-icon">
                                  <input type="text" placeholder="Decimal separator" v-model="settingsField.currency.decimal_separator"/>
                                  <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                              </div>
                          </div>
                          <div>
                              <h4 class="ccb-title">Number of characters after integer</h4>
                              <div class="ccb-input-group ccb-input-group-icon">
                                  <input type="text" placeholder="Number after integer" v-model="settingsField.currency.num_after_integer"/>
                                  <div class="ccb-input-icon"><i class="fas fa-list"></i></div>
                              </div>
                          </div>
                    </section>
                    
                    <section id="ccb-general" v-else>
                        <div class="ccb-locked-section">
                            <span>
                              <h4 class="ccb-general-locked">For this calculator General is not available. Please create new to open this tab!</h4>
                            </span>
                        </div>
                    </section>
                    <section id="ccb-content-form">
                        <div class="ccb-locked-section">
                            <span>
                              <i class="fas fa-lock"></i>
                              <h4>This feature is part of Premium Add-on</h4>
                              <a href="https://stylemixthemes.com/cost-calculator-plugin/" target="_blank"
                                 class="ccb-plugin-buy-now-btn">Buy Now</a>
                            </span>
                        </div>        
                    </section>
                    <section id="ccb-content-woocommerce">
                        <div class="ccb-locked-section">
                            <span>
                              <i class="fas fa-lock"></i>
                              <h4>This feature is part of Premium Add-on</h4>
                              <a href="https://stylemixthemes.com/cost-calculator-plugin/" target="_blank"
                                 class="ccb-plugin-buy-now-btn">Buy Now</a>
                            </span>
                        </div>
                    </section>
                    <section id="ccb-content-stripe">
                         <div class="ccb-locked-section">
                            <span>
                              <i class="fas fa-lock"></i>
                              <h4>This feature is part of Premium Add-on</h4>
                              <a href="https://stylemixthemes.com/cost-calculator-plugin/" target="_blank"
                                 class="ccb-plugin-buy-now-btn">Buy Now</a>
                            </span>
                         </div>
                    </section>
                    <section id="ccb-content-paypal">
                        <div class="ccb-locked-section">
                            <span>
                              <i class="fas fa-lock"></i>
                              <h4>This feature is part of Premium Add-on</h4>
                              <a href="https://stylemixthemes.com/cost-calculator-plugin/" target="_blank"
                                 class="ccb-plugin-buy-now-btn">Buy Now</a>
                            </span>
                        </div>
                    </section>
                    <section id="ccb-content-recaptcha">
                        <div class="ccb-locked-section">
                            <span>
                              <i class="fas fa-lock"></i>
                              <h4>This feature is part of Premium Add-on</h4>
                              <a href="https://stylemixthemes.com/cost-calculator-plugin/" target="_blank"
                                 class="ccb-plugin-buy-now-btn">Buy Now</a>
                            </span>
                        </div> 
                    </section>
                </div>
            </main>
            <button v-on:click.prevent="saveSettings" class="ccb-submit-button">Save</button>
        </div>
    `,
});