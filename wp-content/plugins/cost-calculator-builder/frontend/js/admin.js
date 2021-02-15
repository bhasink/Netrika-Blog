import store from './data';
String.prototype.replaceAll = function (search, replace) {
    return this.split(search).join(replace);
};

(function ($) {
    $(document).ready(function () {
        if(typeof DatePicker !== "undefined")
            Vue.component('date-picker', DatePicker.default);

        var iteration = 0;
        $('.ccb-main-calc').each(function () {
            new Vue({
                el: $(this)[0],
                store,
                components: {
                    'sketch-picker': VueColor.Chrome
                },
                data: function () {
                    return {
                        temp: '',
                        date: [],
                        order: 0,
                        drag: false,
                        formula: [],
                        tempVal: {},
                        load: false,
                        settings: [],
                        styles: null,
                        create: true,
                        listings: [],
                        response: {},
                        fieldId: null,
                        extraInfo: [],
                        access: false,
                        conditions: [],
                        calcTotal: [],
                        valuesStore: {},
                        stmCalcData: {},
                        wcProducts: [],
                        modalField: '',
                        showForm: true,
                        oderFields: [],
                        removeId: null,
                        newIndex: null,
                        modalData: null,
                        isActive: false,
                        projectId: null,
                        styleStore: {},
                        projectName: '',
                        readyFields: [],
                        preloader: true,
                        navZIndex: true,
                        contactForms: [],
                        nextButton: true,
                        settingsId: null,
                        hasAccess: false,
                        showTools: false,
                        showStripe: false,
                        showPayPal: false,
                        toolZIndex: false,
                        custom_fields: {},
                        stmDisplay: false,
                        toggleColor: false,
                        redirectData: null,
                        isCalcReady: false,
                        dateDescription: [],
                        iteration: iteration,
                        removeArrayId: false,
                        conditionOpen: false,
                        previewSuccess: false,
                        stmMainContainer: true,
                        showWooCommerce: false,
                        currency_settings: null,
                        container: "v-container",
                        location_url: '',
                        paymentMethod: '',

                        textCopy: "Copy shortcode",

                        demoImport: {
                            // Custom demo import
                            image: {
                                file: null
                            },
                            files: null,
                            file: null,
                            custom: false,
                            noFile: 'No file chosen',

                            // Default demo import
                            load:true,
                            progress_load:false,
                            progress:0,
                            step_progress: null,
                            step:[],
                            info: {
                                "calculators": 0,
                            },
                            info_progress: [],
                            finish: false,
                            progress_data: ""
                        },

                        background: {
                            v_container: {
                                type: 'solid'
                            }
                        },

                        stripe: {
                            stripe: '',
                            stripeCard: '',
                            stripeComplete: '',
                        },

                        payment: {
                            status: '',
                            message: '',
                        },

                        modal: {
                            isOpen: false,
                            hasMask: true,
                            canClickMask: false,
                            hasX: false
                        },
                        list: [],
                    }
                },

                mounted() {
                    let vm = this;
                    vm.preloader = false;
                    if(this.$refs.calc)
                        vm.stmCalcData = window['stmCalc_' + this.$refs.calc.dataset.calcId];

                    if ( typeof vm.stmCalcData.defaults !== "undefined") {
                        window.stripe_id = '';
                        if(typeof stripeData !== "undefined") window.stripe_id = stripeData.id;
                        vm.location_url = vm.stmCalcData.siteurl;

                        if(typeof vm.stmCalcData.defaults !== "undefined"){
                            vm.projectId = vm.stmCalcData.id;
                            vm.styleStore = Object.assign({}, vm.styleStore, vm.stmCalcData.defaults);
                        }

                        vm.response = vm.stmCalcData.autoCalc;
                        vm.stmAutoCalc();

                        if(typeof vm.stmCalcData.conditions !== "undefined"){
                            vm.conditions = vm.stmCalcData.conditions[0];
                            vm.startCondition();
                        }
                    } else if(typeof stmCalcAdmin !== "undefined"){
                        vm.location_url = stmCalcAdmin.siteurl;
                        vm.initListings();
                        vm.editItem();
                    }

                    vm.customizeListing();
                    if (typeof DatePicker !== "undefined")
                        vm.setCalendarCss();
                },

                computed: {
                    dragOptions() {
                        return {
                            animation: 200,
                            group: "description",
                            disabled: false,
                            ghostClass: "ghost"
                        };
                    },

                    isLastStep: function () {
                        let vm = this;
                        return (vm.step === vm.max)
                    },
                },

                watch: {
                    readyFields() {
                        this.checkAvailable();
                    },

                    paymentMethod: function (value) {
                        let vm = this;
                        if (value === 'stripe') {
                            vm.generateStripe();
                        } else {
                            vm.payment.status = '';
                            vm.payment.message = '';
                        }
                    }
                },

                methods: {

                    initListings: function(){
                        let vm = this;
                        vm.getListings().then(function (response) {
                            if (response.body.success) {
                                vm.listings = response.body.message.main;
                                vm.contactForms = response.body.message.forms;
                                vm.wcProducts = response.body.message.products;
                            }
                        });
                    },

                    storeStyles: function(name, obj, field, index){
                        let vm = this;
                        vm.custom_fields[name].fields[index] = field;

                        if(typeof obj === "object")
                            for(let o in obj)
                                vm.$set(vm.styleStore[name], o, obj[o]);
                    },

                    changeStyles: function () {
                        let vm = this;

                        let id = vm.checkURI('id');
                        vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/save-styles/', {
                            id: id,
                            styles: vm.styleStore,
                            fields: vm.custom_fields,
                        }).then(function (response) {
                            vm.stmCloseModal('.ccb-changes-saved');
                            document.location.reload(true)
                        });
                    },

                    customizeListing: function() {
                        let vm = this;
                        let id = vm.checkURI('id');
                        if (vm.checkURI('action') === 'customize' && id) {
                            vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/edit-listing/', {id: id}).then(function (response) {
                                let data = response.body.message.field;
                                if (response.body.success) {
                                    vm.readyFields = data.field;
                                    vm.projectName = data.project_name;
                                    vm.custom_fields = data.custom_fields;
                                    vm.formula = response.body.message.formula[0];
                                    vm.styleStore = Object.assign({}, vm.styleStore, data.defaults);

                                    vm.settings = data.settings[0];
                                    if(vm.settings && vm.settings.currency)
                                        vm.currency_settings = vm.settings.currency;
                                    setTimeout(function () {
                                        vm.hasAccess = true;
                                    }, 1000)
                                }
                            });
                        } else if (vm.checkURI('action') === 'listing') {
                            vm.create = true;
                            document.querySelector('#ccb-create-calc').removeAttribute('checked');
                            document.querySelector('#ccb-calc-list').setAttribute('checked', 'checked');
                        }
                    },

                    currencyFormat: function(val){
                        let vm = this;
                        if(vm.currency_settings){
                            let test = this.get_currency_format(val, vm.currency_settings.num_after_integer, vm.currency_settings.decimal_separator, vm.currency_settings.thousands_separator);
                        }

                        return val;
                    },

                    currencyFormatPreview: function(val, element){
                        let vm = this;

                        if(element && element.hasOwnProperty('allowRound') && element.allowRound)
                            return Math.round(val);

                        if(vm.currency_settings){

                            val = this.get_currency_format(
                                val,
                                vm.currency_settings.num_after_integer,
                                vm.currency_settings.decimal_separator,
                                vm.currency_settings.thousands_separator
                            );

                            vm.currency_settings.currency = vm.currency_settings.currency
                                ? vm.currency_settings.currency
                                : '';

                            if(vm.currency_settings.currencyPosition === 'left'){
                                val = vm.currency_settings.currency + val;
                            }

                            if(vm.currency_settings.currencyPosition === 'right'){
                                val = val + vm.currency_settings.currency;
                            }

                            if(vm.currency_settings.currencyPosition === 'left_with_space'){
                                val = val + ' ' + vm.currency_settings.currency;
                            }

                            if(vm.currency_settings.currencyPosition === 'right_with_space'){
                                val = vm.currency_settings.currency + ' ' + val;
                            }
                        }

                        return val;
                    },

                    checkAvailable() {
                        let vm = this;
                        if(typeof vm.readyFields !== "undefined")
                        vm.readyFields.forEach((value, index) => {
                            if (typeof value === "undefined" || !value.hasOwnProperty('_id')) {
                                vm.readyFields.splice(index, 1);
                            }
                        });
                    },

                    log: function (event) {

                        let vm = this;
                        let current = event.added;

                        if (current) {
                            vm.newIndex = current.newIndex;
                            vm.getField(current.element.type);
                        }
                    },

                    generateStripe: function (access = true) {
                        let vm = this;
                        Vue.nextTick(function () {

                            if (!stripe_id.length && access) {
                                vm.payment.status = 'danger';
                                vm.payment.message = 'Something went wrong';
                                return false;
                            } else if(access) {
                                vm.payment.status = '';
                                vm.payment.message = '';
                            }

                            vm.stripe.stripe = Stripe(stripe_id);
                            let elements = vm.stripe.stripe.elements();
                            vm.stripe.stripeCard = elements.create('card');
                            vm.stripe.stripeCard.mount('#stm-lms-stripe_' + vm.projectId);
                            vm.stripe.stripeCard.addEventListener('change', function (event) {
                                vm.stripe.stripeComplete = event.complete;
                            });
                        });
                    },

                    toggleModal: function (event) {
                        let vm = this;
                        if(typeof event !== "undefined" && !event.screenX){
                            return;
                        }

                        vm.calcTotal = [];
                        vm.toolZIndex = !vm.toolZIndex;
                        vm.modal.isOpen = !vm.modal.isOpen;

                        if (this.modal.isOpen) {
                            vm.temp = vm.checkTotalFields();
                            vm.previewSuccess = true;

                            vm.response = {
                                'stm-formula': vm.temp,
                                'stm-fields': vm.readyFields,
                            };
                            vm.stmAutoCalc();

                            setTimeout(function () {
                                vm.$sections = vm.$el.querySelectorAll('.ccb-modal-section');
                                vm.max = vm.$sections.length;
                            }, 1000);
                        }
                    },

                    finish: function () {
                        let vm = this;
                        vm.toggleModal()
                    },

                    getListings: function () {
                        let vm = this;
                        return vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/stm-listing/');
                    },

                    checkURI: function (parameterName) {
                        let result = '',
                            temp = [];
                        let uri = location.search.substr(1).split("&");
                        for (let index = 0; index < uri.length; index++) {
                            temp = uri[index].split("=");
                            if (temp[0] === parameterName) result = decodeURIComponent(temp[1]);
                        }
                        return result;
                    },

                    sendForm: function (data) {
                        let vm = this;
                        let totalDesc = [];
                        vm.redirectData = data.redirect;

                        let dateCount = 0;
                        if(data && typeof data.descriptions !== "undefined")
                        data.descriptions.forEach(function (element) {
                            const eValue = vm.calcTotal[element.key] ? vm.calcTotal[element.key].value : 0;
                            let value = element.allow_currency
                                ? vm.currencyFormat(eValue)
                                : eValue;

                            if(element.alias && element.alias.indexOf('datePicker') !== -1) {
                                let dataVal = vm.dateDescription[dateCount] ? vm.dateDescription[dateCount].value : 0;
                                dateCount++;
                                value += dataVal +'\n';
                            }

                            let options = '';
                            if(vm.calcTotal[element.key].options && vm.calcTotal[element.key].options.length > 0 ){
                                options += ' (' + vm.calcTotal[element.key].options.map(e => e.label).join(', ') + ') ';
                            }

                            totalDesc.push({
                                value,
                                options,
                                label: element.label,
                                allow_currency: element.allow_currency,
                                alias: vm.calcTotal[element.key] ? vm.calcTotal[element.key].label : '',

                            });
                        });

                        vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/send-form/', {
                            mainInfo: {
                                fields: totalDesc,
                                subject: data.subject,
                                currency: data.currency,
                                userEmail: data.userEmail,
                                clientEmail: data.clientEmail,
                            },
                            redirect:  vm.redirectData,
                            calcTotals: vm.formula,
                            sendFields: data.fields,
                            ccb_recaptcha: data.ccb_recaptcha,
                            currency: vm.currency_settings,
                        }).then(function (response) {
                            let body = response.body;
                            if(body.success && body.redirect){
                                if(body.redirect.type === "woocommerce") {
                                    vm.wooCommerceCallback( vm.redirectData.params,  vm.redirectData.item_name,  vm.redirectData.descriptions,  vm.redirectData.payment, 2000);
                                }else if(body.redirect.type === 'paypal') {
                                    vm.paymentMethod = 'paypal';
                                    vm.paymentMethodCallback( vm.redirectData.params,  vm.redirectData.item_name,  vm.redirectData.payment, 1000);
                                } else if(body.redirect.type === 'stripe') {
                                    vm.showStripe = true;
                                }
                            }
                        })
                    },

                    sendFromStripe(stripe) {
                        let vm = this;

                        if(!stripe) return;

                        vm.stripe = stripe;
                        vm.stripe.stripe.createToken(vm.stripe.stripeCard).then(function (result) {
                            vm.redirectData.stripe = result;
                            vm.stripeResult( vm.redirectData.params,  vm.redirectData.item_name,  vm.redirectData.stripe,  vm.redirectData.payment);
                        });
                    },

                    wooCommerceCallback: function (params, item_name, descriptions, payment, timeout = 0) {
                        let vm = this;
                        let desc = [];

                        if(typeof descriptions !== "undefined")
                        descriptions.forEach(function (element) {
                            desc.push({
                                alias: element.label,
                                value: vm.calcTotal[element.key] ? vm.calcTotal[element.key].value : 0
                            });
                        });

                        if(vm.formula.length === 0){
                            return;
                        }

                        $.ajax({
                            type: 'POST',
                            url: '/wp-admin/admin-ajax.php',
                            beforeSend: function() {
                                if(timeout === 0) vm.isCalcReady = false;
                            },
                            data: {
                                action: 'stm_woo_callback',
                                descriptions: desc,
                                item_name: item_name,
                                payment: payment,
                                calcTotals: vm.formula,
                                woo_info: params[0].wooCommerce,
                            },
                            success: function (data) {
                                if (data.status) {
                                    data.page = data.page ? data.page : '';

                                    vm.isActive = false;

                                    vm.showForm = false;
                                    vm.showWooCommerce = true;
                                    setTimeout(function () {

                                        window.location.href = data.page;
                                    }, timeout);
                                }
                            },
                            error: function() {
                                alert('Something went wrong, please try again!');
                                vm.isCalcReady = true;
                            },
                        });
                    },

                    paymentMethodCallback: function (data, item_name, payment, timeout = 0) {

                        let vm = this;
                        if (vm.paymentMethod.length > 0) {
                            vm.payment.status = '';
                            if (vm.paymentMethod === 'paypal') {
                                data = data[0] || {};
                                vm.payment.status = 'success';
                                vm.payment.message = 'Redirecting to PayPal';

                                vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/ccb-paypal/', {
                                    payment: payment,
                                    item_name: item_name,
                                    calcTotals: vm.formula,
                                    paypal_info: data.paypal,
                                    thousands_separator: data.currency.thousands_separator,
                                }).then(function (response) {
                                    if (response.body.success) {
                                        vm.showForm = false;
                                        vm.showPayPal = true;
                                        setTimeout(function () {
                                            window.location.replace(response.body.url);
                                        }, timeout)
                                    }
                                });
                            } else if (vm.paymentMethod === 'stripe') {
                                vm.stripe.stripe.createToken(vm.stripe.stripeCard).then(function (result) {
                                    vm.stripeResult(data, item_name, result);
                                })
                            }
                        } else {
                            vm.payment.status = 'danger';
                            vm.payment.message = 'No payment method selected';
                        }
                    },

                    stripeResult(data, item_name, result, payment) {
                        let vm = this;
                        if (result.error) {
                            vm.payment.message = result.error.message;
                            vm.payment.status = result.error;
                        } else {
                            data = data[0];
                            vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/ccb-stripe/', {
                                payment: payment,
                                item_name: item_name,
                                calcTotals: vm.formula,
                                stripe_info: data.stripe,
                                token_id: result.token.id,
                            }).then(function (data) {
                                vm.payment.status = data.body.status;
                                vm.payment.message = data.body.message;
                                setTimeout(function () {
                                    if (data.body.reload) document.location.reload(true);
                                }, 1500);
                            });
                        }
                    },

                    saveCalc: function (event, isSave) {
                        let vm = this;
                        let temp = vm.checkTotalFields();
                        let id = vm.projectId ? vm.projectId : null;

                        if(vm.settings.length === 0 || !vm.settings[0].hasOwnProperty('general')){

                            vm.settings[0] = {
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
                                }
                            };
                        }

                        vm.extraInfo = [];
                        vm.extraInfo.push(id);
                        vm.extraInfo.push(vm.projectName);
                        vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/save-settings/', {
                            formula: temp,
                            settings: vm.settings,
                            extraInfo: vm.extraInfo,
                            conditions: vm.conditions,
                            readyFields: vm.readyFields,
                        }).then(function (response) {
                            if(response.body.success){
                                let calc_id = response.body.calc_id;
                                let className = '.ccb-create-calc';
                                if(isSave)
                                    className = '.ccb-save-msg';

                                vm.stmCloseModal(className, 1500);
                                setTimeout(function () {
                                    window.location.replace(vm. location_url + '/wp-admin/admin.php?page=cost_calculator_builder&action=edit&id=' + calc_id);
                                }, 1000)
                            }
                        });
                    },

                    copyText(id) {
                        const copyText = document.querySelector(`.calc-short-code[data-id='${id}']`);
                        copyText.setAttribute('type', 'text')

                        copyText.select();
                        copyText.setSelectionRange(0, 99999);
                        document.execCommand("copy");
                        copyText.setAttribute('type', 'hidden')
                        this.textCopy = 'Copied';
                    },

                    checkTotalFields: function () {
                        let _formula = '',
                            vm = this,
                            temp = [];
                        vm.formula = [];
                        if(typeof vm.readyFields !== "undefined")
                        vm.readyFields.forEach(function (element) {
                            if (element.type === 'Total') {
                                vm.formula.push({
                                    id: element.id,
                                    label: element.label,
                                    formula: element.costCalcFormula,
                                    symbol: element.symbol
                                });
                            }
                        });

                        if (!vm.formula.length && typeof vm.readyFields !== "undefined") {
                            vm.readyFields.forEach(function (element) {
                                if (element.alias) {
                                    _formula += element.alias + ' + ';
                                }
                            });

                            let last = _formula.lastIndexOf(" ") - 1;
                            _formula = _formula.substring(0, last);
                            temp = [{label: 'Total', formula: _formula, symbol: ''}];

                        } else {
                            temp = vm.formula;
                        }
                        return temp;
                    },

                    removeFields: function (id, order_id) {
                        let vm = this;
                        vm.formula.splice(id, 1);
                        vm.readyFields.splice(id, 1);
                        if (order_id) {
                            vm.calcTotal.splice(order_id - 1, 1);
                        }
                    },

                    closeModal: function () {
                        let vm = this;
                        vm.fieldId = null;
                        vm.modalData = null;
                        vm.modalField = false;
                        vm.stmDisplay = false;
                    },

                    getField: function (type) {
                        let vm = this;
                        vm.modalField = type;
                        vm.stmDisplay = true;
                    },

                    checkSettings: function (type, id) {
                        let vm = this;
                        vm.fieldId = id;
                        vm.modalField = type;
                        vm.stmDisplay = true;
                    },

                    showContainer: function () {
                        let vm = this;
                        if (vm.projectName.length) {
                            vm.access = true;
                            vm.hasAccess = true;
                            vm.showTools = true;
                            vm.navZIndex = false;
                            vm.stmMainContainer = false;
                        }
                    },

                    setSettings: function (field, id) {
                        let vm = this;
                        vm.closeModal();
                        vm.settingsId = id;
                        vm.settings[id] = field;

                        vm.currency_settings = vm.settings[0].currency;
                    },

                    removePrevent: function(e) {
                        e.preventDefault();
                    },

                    applyContactForm: function(cfForm, redirect) {
                        let vm = this, input;
                        if(typeof wpcf7 !== "undefined") {
                            $( 'div.wpcf7 > form' ).each( function() {
                                let $form = $( this );
                                wpcf7.initForm( $form );
                                if ( wpcf7.cached ) {
                                    wpcf7.refill( $form );
                                }
                            });
                            if($('.ajax-loader').length > 1) $('.ajax-loader').last().remove();

                            if(typeof redirect !== "undefined") {
                                document.addEventListener( 'wpcf7mailsent', function( event ) {

                                    if(event.detail.inputs) {
                                        input = event.detail.inputs.filter(element => element.name && element.name === 'ccb-action');

                                        if(vm.redirectData.type === "woocommerce") {
                                            vm.wooCommerceCallback(vm.redirectData.params, vm.redirectData.item_name, vm.redirectData.descriptions, vm.redirectData.payment);
                                        } else if(vm.redirectData.type === 'paypal') {
                                            vm.paymentMethod = 'paypal';
                                            vm.paymentMethodCallback(vm.redirectData.params, vm.redirectData.item_name, vm.redirectData.payment);
                                        } else if(vm.redirectData.type === 'stripe') {


                                            if(document.querySelector('#stm-lms-stripe_' + vm.projectId)){
                                                vm.clearDom('block', 'none');
                                            }else {

                                                let stripe = document.createElement('div');
                                                stripe.id = 'stm-lms-stripe_'  + vm.projectId;

                                                let stripeBtnWrap = document.createElement('div');
                                                let stripeBtn = document.createElement('button');

                                                stripeBtn.type = 'button';
                                                stripeBtn.className = 'btn btn-success';
                                                stripeBtn.innerText = 'Purchase';

                                                stripeBtnWrap.className = 'ccb-stripeBtn-wrap';
                                                stripeBtnWrap.appendChild(stripeBtn);

                                                setTimeout(function () {
                                                    let cf7Message = document.querySelector('.wpcf7-mail-sent-ok');


                                                    if(cf7Message && cf7Message.innerText !== "") {

                                                        let thanksMsg = document.createElement('div');

                                                        thanksMsg.innerHTML = cf7Message.innerHTML;
                                                        thanksMsg.className = cf7Message.className;
                                                        thanksMsg.id = 'ccb-thanks-message';

                                                        thanksMsg.style.display = "block";
                                                        cfForm.parentNode.parentNode.insertBefore(thanksMsg, cfForm.parentNode);
                                                    }

                                                    cfForm.parentNode.parentNode.insertBefore(stripe, cfForm.parentNode);
                                                    cfForm.parentNode.parentNode.insertBefore(stripeBtnWrap, cfForm.parentNode);
                                                    cfForm.style.display = 'none';
                                                    vm.generateStripe(false);

                                                    stripeBtn.addEventListener('click', function () {
                                                        vm.stripe.stripe.createToken(vm.stripe.stripeCard).then(function (result) {
                                                            vm.redirectData.stripe = result;
                                                            vm.stripeResult(vm.redirectData.params, vm.redirectData.item_name, vm.redirectData.stripe, vm.redirectData.payment);
                                                        });
                                                    })

                                                }, 500)

                                            }
                                        }
                                    }
                                }, false );
                            }
                        }
                    },

                    nextButtonCallback: function (forms, descriptions, currency) {
                        let i = 0;
                        let vm = this;
                        let subtotal = '';
                        let totalFound = '';
                        let text = forms[0].formFields.body;
                        vm.nextButton = false;
                        let dateCount = 0;
                        if(typeof descriptions !== "undefined")
                        descriptions.forEach(function (element) {
                            let value = vm.calcTotal[element.key] ? vm.calcTotal[element.key].value : 0;
                            let alias = vm.calcTotal[element.key] ? vm.calcTotal[element.key].label : '';
                            subtotal += element.label +': ';

                            if(alias) subtotal += ' ('+ alias +') ';
                            if(vm.calcTotal[element.key] && vm.calcTotal[element.key].options && vm.calcTotal[element.key].options.length > 0)
                                subtotal += ' (' + vm.calcTotal[element.key].options.map(e => e.label).join(', ') + ') ';

                            if(element.allow_currency)
                                subtotal += vm.getCurrencyPos(value, currency);
                            else
                                if(element.alias && element.alias.indexOf('datePicker') !== -1) {
                                    let dataVal = vm.dateDescription[dateCount] ? vm.dateDescription[dateCount].value : 0;
                                    dateCount++;
                                    subtotal += dataVal +'\n';
                                } else
                                    subtotal += value +'\n';
                        });


                        if (vm.formula && vm.formula.length > 0) {
                            vm.formula.forEach(function (element, index) {
                                if (text.indexOf('[ccb-total-' + index + ']') !== -1) {
                                    let regex = '[ccb-total-' + index + ']';
                                    text = text.replaceAll(regex, vm.getCurrencyPos(element.total, currency))
                                }
                            });
                        }

                        if (text.indexOf('[ccb-subtotal]') !== -1) {
                            let regex = '[ccb-subtotal]';
                            text = text.replaceAll(regex, subtotal);
                        }

                        let j = 0;
                        let replacement = '[ccb-total-';
                        while (text.indexOf(replacement) !== -1 && forms[0].formFields.allowContactForm) {

                            totalFound = replacement + i + ']';
                            let position = text.indexOf(totalFound);

                            if (position !== -1)
                                text = text.replace(text.substr(position, totalFound.length), 0);
                            else
                                i++;

                            j++;
                            if(j === 100) break;
                        }

                        if (document.querySelector('.ccb-contact-form7')) {
                            let $form = document.querySelector('.ccb-contact-form7 form');
                            $('.ccb-contact-form7 form ccb-action').remove();

                            if($form.querySelector('.wpcf7-submit')) $form.querySelector('.wpcf7-submit').parentElement.style.display = 'block';
                            let textarea = document.querySelectorAll('.ccb-contact-form7')[vm.iteration].querySelector('textarea');

                            const texts = document.querySelectorAll('.ccb-inner-wrapper.text-area textarea');
                            const textAreasText = Array.from(texts).map(el => el && el.value + '\n').join('');

                            if(textAreasText) text = textAreasText + '\n' + text;
                            if(textarea) textarea.value = text;
                            let redirect;


                            if(forms[0].formFields.payment && forms[0].formFields.paymentMethod){
                                redirect = true;
                                vm.redirectData = {
                                    params: forms,
                                    item_name:  forms[0].general.title,
                                    payment: forms[0].formFields.payment,
                                    type: forms[0].formFields.paymentMethod,
                                    descriptions: descriptions,
                                };

                                if($form.querySelector('.ccb-action')) $form.querySelector('.ccb-action').remove();
                                let ccbInp = document.createElement('input');
                                ccbInp.type = 'hidden';
                                ccbInp.name = 'ccb-action';
                                ccbInp.value = '1';
                                $form.appendChild(ccbInp);
                            }

                            vm.applyContactForm($form, redirect);
                        }
                    },

                    getCurrencyPos(value, currency) {
                        let subtotal = '', vm = this;
                        if(vm.currency_settings.currency_position === 'left')
                            subtotal = currency + vm.currencyFormat(value) +'\n';

                        else if(vm.currency_settings.currency_position === 'right')
                            subtotal = vm.currencyFormat(value) + currency +'\n';

                        else if(vm.currency_settings.currency_position === 'right_with_space')
                            subtotal = vm.currencyFormat(value) + ' ' + currency +'\n';

                        else {
                            subtotal = currency + ' ' + vm.currencyFormat(value) +'\n';
                        }

                        return subtotal;
                    },

                    editField: function (key) {
                        let vm = this;
                        let gotFieldByKey = vm.readyFields[key];

                        let type = vm.readyFields[key].type.toLowerCase().replace(' ', '-');
                        vm.fieldId = key;
                        vm.modalField = type;
                        vm.modalData = gotFieldByKey;

                        vm.stmDisplay = true;
                    },

                    editItem: function () {
                        let vm = this;
                        let id = vm.checkURI('id');
                        if (vm.checkURI('action') === 'edit' && id) {
                            vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/edit-listing/', {id: id}).then(function (response) {
                                let data = response.body.message.field;
                                if (response.body.success) {
                                    vm.access = true;
                                    vm.create = false;
                                    vm.showTools = true;
                                    vm.hasAccess = true;
                                    vm.navZIndex = false;
                                    vm.projectId = data.id;;
                                    vm.stmMainContainer = false;
                                    vm.readyFields = data.field;
                                    vm.projectName = data.project_name;
                                    vm.formula = response.body.message.formula;
                                    vm.custom_fields = data.custom_fields;
                                    vm.styleStore = Object.assign({}, vm.styleStore, data.defaults);

                                    let condition = response.body.message.conditions;
                                    vm.conditions = Array.isArray(condition) && condition.length ? condition[0] : [];
                                    data.settings = Array.isArray(data.settings) ? data.settings : [data.settings];

                                    if (data.settings.length) {
                                        vm.settingsId = 0;
                                        vm.settings = data.settings;
                                        if(vm.settings[0] && vm.settings[0].currency)
                                            vm.currency_settings = vm.settings[0].currency;
                                    }

                                    setTimeout(() => {
                                        vm.isCalcReady = true;
                                    }, 1000)
                                }
                            });
                        } else if (vm.checkURI('action') === 'listing') {
                            vm.create = true;
                            setTimeout(() => {
                                vm.isCalcReady = true;
                            }, 1000);
                            document.querySelector('#ccb-create-calc').removeAttribute('checked');
                            document.querySelector('#ccb-calc-list').setAttribute('checked', 'checked');
                        }else {
                            setTimeout(() => {
                                vm.isCalcReady = true;
                            }, 1000);
                        }
                    },

                    saveCondition: function(data, isFree){
                        let vm = this;
                        if(!isFree)
                            vm.conditions = data;
                    },

                    saveField: function (data, id = null, index = null) {
                        let vm = this;
                        if (id === null) {
                            if (index || index === 0) {
                                let len = vm.readyFields.length + 1;
                                let current = vm.readyFields[index];
                                for (let i = index; i < len; i++) {
                                    let next = vm.readyFields[i + 1];
                                    vm.readyFields[i + 1] = current;
                                    current = next;
                                }
                                vm.readyFields[index] = data;
                                vm.checkAvailable();
                            } else {
                                vm.readyFields.push(data);
                            }
                        } else {
                            vm.readyFields[id] = data;
                        }
                        vm.newIndex = null;
                        vm.closeModal();
                    },

                    stmCalendarField: function (index, total, id, alias, value = null) {

                        let vm = this;
                        let time = null;

                        if (value.length) {
                            time = value[1] - value[0];
                            vm.dateDescription[index] = {
                                alias: alias,
                                value: value[0].toLocaleDateString() + ' - ' + value[1].toLocaleDateString()
                            };
                        } else {
                            let date = new Date(value);
                            time = (date - Date.now());
                            vm.dateDescription[index] = {alias: alias, value: date.toLocaleDateString()};
                        }

                        time = time > 0 ? Math.round(time / 1000 / 3600 / 24) : 0;
                        time = typeof time === 'number' ? time : 0;

                        vm.stmToCalculate(time, total, id, alias);
                    },

                    stmCancel: function () {
                        let vm = this;
                        window.location.replace(vm.location_url + '/wp-admin/admin.php?page=cost_calculator_builder&action=listing');
                    },

                    cloneVal(val) {
                        return JSON.parse(JSON.stringify(val));
                    },

                    stmAutoCalc: function () {
                        let vm = this;
                        let formula = vm.response['stm-formula'];
                        if(vm.response['currency_settings'])
                            vm.currency_settings = vm.stmCalcData.currency;
                        if (vm.response['stm-fields'] && vm.response['stm-fields'].length) {

                            vm.response['stm-fields'].forEach(function (elem, index) {
                                let value;
                                let unit = elem.hasOwnProperty('unit') ? elem.unit : 1;

                                if (elem.alias && elem.hasOwnProperty('default') && elem.type !== 'Date Picker') {

                                    let defaultVal = elem.default;
                                    if(elem.default.indexOf('_') !== -1){
                                        defaultVal = vm.cloneVal(elem.default.split('_')[0]);
                                        let option = elem.options.find(_item => _item.optionValue === defaultVal);
                                        value = {value: defaultVal, label: option.optionText};
                                    }

                                    value = value || defaultVal;

                                    vm.stmToCalculate(value, formula, index, elem.alias, unit);
                                }else if(elem && elem.alias && elem._tag === 'cost-checkbox') {
                                    vm.stmToCalculate([], formula, index, elem.alias, 1, elem.allowCurrency);
                                }
                            });

                            let noFields = vm.response['stm-fields'].find(element =>  element.hasOwnProperty('default') || (element._tag === 'cost-checkbox'|| element.type !== 'Total' || element.type === 'Date Picker'));
                            if(noFields === undefined && typeof vm.response['stm-fields'] !== "undefined") {
                                vm.response['stm-fields'].forEach(element => {
                                    vm.formula = [];
                                    if(element.costCalcFormula.indexOf('_field_id_') === -1){
                                        let summary = eval(element.costCalcFormula);
                                        summary = summary !== summary || !isFinite(summary) ? 0 : summary;
                                        let val = summary;
                                        if(vm.currency_settings)
                                            val = vm.get_currency_format(summary, vm.currency_settings.num_after_integer, vm.currency_settings.decimal_separator, vm.currency_settings.thousands_separator);

                                        vm.formula.push({
                                            total: val,
                                            id: element.id,
                                            label: element.label

                                        });
                                    }
                                });
                            }
                        }

                        setTimeout(function () {
                            vm.isCalcReady = true;
                        }, 2000);
                    },


                    startCondition: function() {
                        let vm = this;
                        let timeId = setInterval(() => {
                            if(vm.isCalcReady || vm.modal.isOpen) {
                                if(vm.conditions && typeof vm.conditions.links !== "undefined")
                                vm.conditions.links.forEach((element, eIndex) => {
                                    // get current calc
                                    const $form = $('*[data-calc-id="'+ vm.projectId +'"]');
                                    // options
                                    const optionsTo = element.options_to;
                                    const optionsFrom = element.options_from;

                                    // option left wrap for action
                                    let elementRightWrap = $form.find('.wrap_' + optionsTo.alias);
                                    // if is not calculable
                                    if( (!optionsTo.hasOwnProperty('alias') && elementRightWrap.length === 0)) {
                                        elementRightWrap = $form.find('.id_for_label_' + optionsTo._id);
                                    }

                                    if(element && typeof element.condition !== "undefined" && typeof optionsFrom !== "undefined") {
                                        element.condition.forEach((condition, index) => {
                                            let found = vm.calcTotal.find(e => e && e.alias === optionsFrom.alias);
                                            const key = 'element_' + eIndex + index;
                                            vm.valuesStore[key] = typeof vm.valuesStore[key] !== "undefined" ? vm.valuesStore[key] : {};
                                            if(typeof found !== "undefined" && vm.valuesStore[key][found.alias] !== found.value ){
                                                vm.valuesStore[key][found.alias] = JSON.parse(JSON.stringify(found.value));
                                                let result = eval( found.value + condition.condition + condition.value + '');
                                                if(result ) {
                                                    vm.renderCondition(elementRightWrap, condition.action, optionsTo, found.value)
                                                }else {
                                                    vm.renderConditionToggle(elementRightWrap, condition.action, optionsTo, found.value)
                                                }

                                            }
                                        });
                                    }
                                  });

                                clearInterval(timeId);
                            }
                        }, 1000)

                     },

                    renderCondition(elementRightWrap, action, optionsTo, value) {
                        let vm = this;
                        switch (action) {
                            case 'Hide (leave in Total)': {
                                elementRightWrap.slideUp();
                                break
                            }
                            case 'Show': {
                                let val = 0;
                                vm.calcTotal = vm.calcTotal.map((calc, index) => {
                                    if(calc.alias === optionsTo.alias) {
                                        if(typeof vm.tempVal[optionsTo.alias] !== "undefined") {
                                            calc.value = JSON.parse(JSON.stringify(vm.tempVal[optionsTo.alias]));
                                            val = JSON.parse(JSON.stringify(vm.tempVal[optionsTo.alias]));
                                            calc.hide = false;
                                            elementRightWrap.slideDown();
                                            delete vm.tempVal[optionsTo.alias];
                                            vm.stmToCalculate(val, vm.response['stm-formula'], index, optionsTo.alias, optionsTo.unit ? optionsTo.unit : 1, false, false);

                                        }
                                    }

                                    return calc;
                                });
                                break
                            }

                            case 'Set value': {
                                vm.calcTotal = vm.calcTotal.map((calc, index) => {
                                    if(calc.alias === optionsTo.alias) {
                                        calc.value = value;
                                        vm.setValue(value, elementRightWrap, calc.alias, index);
                                        vm.stmToCalculate(calc.value, vm.response['stm-formula'], index, optionsTo.alias, optionsTo.unit ? optionsTo.unit : 1, false, false );
                                    }
                                    return calc;
                                }); break
                            }

                            case 'Set value and disable': {
                                vm.calcTotal = vm.calcTotal.map((calc, index) => {
                                    if(calc.alias === optionsTo.alias) {
                                        calc.value = value;
                                        vm.setValue(value, elementRightWrap, calc.alias, index);
                                        elementRightWrap.addClass('calc-field-disable');
                                        vm.stmToCalculate(calc.value, vm.response['stm-formula'], index, optionsTo.alias, optionsTo.unit ? optionsTo.unit : 1, false, false );
                                    }

                                    return calc;
                                }); break
                            }
                            case 'Hide': {
                                elementRightWrap.slideUp();
                                vm.calcTotal = vm.calcTotal.map((calc, index) => {

                                    if(calc.alias === optionsTo.alias) {
                                            vm.tempVal[optionsTo.alias] = JSON.parse(JSON.stringify(calc.value));
                                            calc.value = 0;
                                            calc.hide = true;
                                            vm.stmToCalculate(0, vm.response['stm-formula'], index, optionsTo.alias, optionsTo.unit ? optionsTo.unit : 1, false, false );
                                    }

                                    return calc;
                                });
                                break
                            }
                            default: break;
                        }
                    },

                    renderConditionToggle(elementRightWrap, action, optionsTo) {
                        let vm = this;
                        switch (action) {
                            case 'Hide (leave in Total)': {
                                elementRightWrap.slideDown();
                                break
                            }
                            case 'Hide': {
                                elementRightWrap.slideDown();
                                let val = 0;
                                 vm.calcTotal = vm.calcTotal.map((calc, index) => {
                                    if(calc.alias === optionsTo.alias) {
                                        if(typeof vm.tempVal[optionsTo.alias] !== "undefined") {
                                            calc.value = JSON.parse(JSON.stringify(vm.tempVal[optionsTo.alias]));
                                            val = JSON.parse(JSON.stringify(vm.tempVal[optionsTo.alias]));
                                            calc.hide = false;
                                            delete vm.tempVal[optionsTo.alias];
                                            vm.stmToCalculate(val, vm.response['stm-formula'], index, optionsTo.alias, optionsTo.unit ? optionsTo.unit : 1, false, false);
                                        }
                                    }

                                    return calc;
                                });
                                break
                            }

                            case 'Set value and disable': {
                                if(typeof vm.calcTotal !== "undefined")
                                vm.calcTotal.forEach(calc => {
                                    if(calc.alias === optionsTo.alias) {
                                        elementRightWrap.removeClass('calc-field-disable');
                                    }
                                });
                                break
                            }
                            default: break;
                        }
                    },

                    setValue(value, elementRight, alias, index) {
                        if(alias.indexOf('range') !== -1){
                            if(typeof this.$refs[alias] !== "undefined")
                                this.$refs[alias].changeVal(value)
                            this.calcTotal[index].value = value;
                        }

                        else if(alias.indexOf('dropDown') !== -1) {
                            elementRight.find('select option').each((v, k) => {
                                if(k.value === value + '_' + v) {
                                    elementRight.find('select').val(k.value);
                                }
                            });
                        }

                        else if(alias.indexOf('radio') !== -1) {
                            elementRight.find(`input.radio_${alias}`).each((v, k) => {
                                k.checked = k.value === value + '_' + v
                            });
                        }

                        else if(alias.indexOf('checkbox') !== -1) {
                            elementRight.find(`input.checkbox_${alias}`).each((v, k) => {
                                k.checked = parseInt(k.value) === parseInt(value);
                            });
                        }

                        else if(alias.indexOf('quantity') !== -1) {
                            elementRight.find('input').val(value);
                        }
                    },

                    applyImporter: function() {
                        let vm = this;
                        let demo = vm.demoImport;
                        demo.file = document.querySelector('#ccb-file');
                        demo.file.click();
                    },

                    loadImage: function () {
                        let vm = this;
                        let demo = vm.demoImport;

                        if(demo.file.value)
                            demo.noFile = demo.file.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
                        else
                            demo.noFile = 'No file chosen';

                        let fileToUpload = vm.$refs['image-file'].files[0];

                        if (fileToUpload) {
                            demo.files = fileToUpload;
                        }
                    },

                    importNewLayout: function(){
                        let vm = this;
                        let demo = vm.demoImport;
                        if(demo.files){
                            let formData = new FormData();
                            formData.append('type', 'single');
                            formData.append('file', demo.files);

                            vm.$set(demo.image, 'message', '');
                            vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/custom-demo-import/', formData).then(function (response) {
                                if(response.body.success) {
                                    demo.files = null;
                                    demo.noFile = 'No file chosen';
                                    vm.$set(demo.image, 'file', '');

                                    demo.info = response.body.message;
                                    for(let index in demo.info)
                                        demo.info_progress[index] = 0;
                                    demo.custom = true;
                                    vm.importDemos();
                                }
                            });
                        }
                    },

                    getImportData: function(){
                        let vm = this;
                        vm.demoImport.load = true;
                        vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/demo-import/').then(function(response){
                            vm.demoImport.load = false;
                            vm.demoImport.info = response.body;
                            for(let index in vm.demoImport.info)
                                vm.demoImport.info_progress[index] = 0;
                        });
                    },

                    importDemos: function(){
                        let vm = this;

                        vm.demoImport.progress_load = true;
                        vm.demoImport.step = Object.keys(vm.demoImport.info);
                        vm.demoImport.step_progress = vm.demoImport.step[0];

                        vm.progressImport();
                    },

                    progressImport: function(){
                        let vm = this;
                        let demo = vm.demoImport;
                        let params = { step:demo.step_progress, key:demo.info_progress[demo.step_progress] };
                        if(demo.custom) params['is_custom_import'] = true;

                        vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/demo-import-run/', params).then(function(response){

                            demo.progress_data += response.body.data+" \n ";
                            let textarea = document.querySelector('#progress_data_textarea');
                            textarea.scrollTop = textarea.scrollHeight;
                            if(demo.info[demo.step_progress] > demo.info_progress[demo.step_progress]) {
                                demo.info_progress[demo.step_progress] = response.body.key;
                                demo.progress = Math.ceil( (response.body.key / demo.info[demo.step_progress]) * 100 );
                            }

                            if(demo.info[demo.step_progress] === demo.info_progress[demo.step_progress]) {
                                demo.step_progress = vm.nextKey(demo.info, demo.step_progress);
                                demo.progress = 0;
                                vm.initListings();
                            }

                            if(demo.step_progress != null && response.body.success){
                                vm.progressImport();
                            }

                            if(demo.step_progress == null){
                                demo.finish = true;
                                demo.progress_load = false;
                            }
                        });
                    },

                    nextKey: function(db, key) {
                        let keys = Object.keys(db), i = keys.indexOf(key); i++;
                        if(typeof keys[i] != "undefined")
                            return keys[i];
                        return null;
                    },

                    clearDom: function(hide, show) {
                        if(document.querySelector('#ccb-thanks-message')) document.querySelector('#ccb-thanks-message').style.display = hide;
                            if(document.querySelector('#stm-lms-stripe_' + this.projectId)) document.querySelector('#stm-lms-stripe_' + this.projectId).style.display = hide;
                        if(document.querySelector('.ccb-stripeBtn-wrap')) document.querySelector('.ccb-stripeBtn-wrap').style.display = hide;
                        if(document.querySelector('.ccb-contact-form7 form')) document.querySelector('.ccb-contact-form7 form').style.display = show;
                    },

                    stmToCalculate(value, mainFormula, id, alias, unit = 1, allowRound = false, condition = true) {
                        let vm = this;

                        vm.nextButton = true;
                        vm.showStripe = false;
                        vm.errorMessage = false;

                        let [,field_id] = alias.split('_id_');
                        if(typeof wpcf7 !== "undefined") {
                            vm.clearDom('none', 'block');
                        }

                        let _formula = JSON.parse(JSON.stringify(mainFormula));
                        if (typeof value === 'string' || typeof value === 'number') {
                            vm.calcTotal[id] = {value: value ? value * unit : 0, alias: alias, id: parseInt(field_id)};
                        } else if (Array.isArray(value)) {
                            let total = 0;
                            const options = [];
                            for (let j in value) {
                                total += value[j].value || value[j] || 0;

                                if(value[j] && value[j].value) {
                                    options.push({
                                        label: value[j].label,
                                        value: value[j].value,
                                    });
                                }
                            }

                            vm.calcTotal[id] = {
                                alias,
                                options,
                                value: total,
                                id: parseFloat(field_id),
                            };

                        } else if(typeof value === 'object'){
                            vm.calcTotal[id] = {
                                alias,
                                value: value.value,
                                label: value.label,
                                id: parseFloat(field_id)};
                        }

                        let temp = JSON.parse(JSON.stringify(vm.calcTotal));

                        if(typeof _formula !== "undefined")
                        _formula.forEach(function (item) {
                            vm.calcTotal.forEach(element => {
                                if(!element.hasOwnProperty('alias')) return;

                                if(allowRound)
                                    element.value = Math.round(element.value);
                                let count = 0;

                                while (item.formula.indexOf(element.alias) !== -1) {
                                    item.formula.trim();
                                    let posStart = item.formula.indexOf(element.alias);
                                    let length = element.alias.length;
                                    let last = item.formula[posStart + length];
                                    last = last === ' ' ? NaN : last;
                                    if(isNaN(last)){
                                        item.formula = item.formula.replace(element.alias, element.value);
                                    }else {
                                        let alias = element.alias + last;
                                        let found = temp.find(elem => elem && elem.alias === alias);

                                        if(typeof found !== "undefined" && found.alias)
                                           item.formula = item.formula.replace(found.alias, found.value);
                                    }

                                    count++;
                                    if(count === 5) break;
                                }
                            });
                        });

                        let replacement = ['range_field_id_', 'radio_field_id_', 'quantity_field_id_', 'dropDown_field_id_', 'checkbox_field_id_', 'datePicker_field_id_'];
                        if(typeof _formula !== "undefined")
                        _formula.forEach(function (element) {
                            let i = 0;
                            while (element.formula.indexOf('_field_id_') !== -1) {
                                let position = element.formula.indexOf(replacement[i]);
                                if (position !== -1) {
                                    let temp = element.formula.substr(position, replacement[i].length + 2);
                                    let lastIndex = temp[temp.length - 1];

                                    if(parseInt(lastIndex) !== parseInt(lastIndex)) {
                                        temp = element.formula.substr(position, replacement[i].length + 1);
                                    }
                                    element.formula = element.formula.replace(temp, 0);

                                } else {
                                    i++;
                                }
                            }
                        });

                        vm.formula = [];

                        if(typeof _formula !== "undefined")
                        _formula.forEach(function (element) {
                            let summary = eval(element.formula);
                            summary = summary !== summary || !isFinite(summary) ? 0 : summary;

                            let val = summary;

                            if(vm.currency_settings)
                                val = vm.get_currency_format(summary, vm.currency_settings.num_after_integer, vm.currency_settings.decimal_separator, vm.currency_settings.thousands_separator);

                            vm.formula.push({
                                total: val,
                                id: element.id,
                                label: element.label
                            });
                        });

                        if(typeof vm.stmCalcData.conditions !== "undefined" || vm.modal.isOpen)
                            vm.startCondition();
                    },

                    toggleCondition() {
                        this.conditionOpen = !this.conditionOpen;
                        setTimeout(() => {
                            if(this.conditionOpen)
                                jQuery('.ccb-condition').slideDown();
                            else
                                jQuery('.ccb-condition').slideUp();
                        }, 0);
                    },

                    get_currency_format:function(amount, decimalCount = 2, decimal = ".", thousands = ",") {
                        try {
                            decimalCount = Math.abs(decimalCount);
                            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                            const negativeSign = amount < 0 ? "-" : "";
                            amount = parseFloat(amount);
                            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                            let j = (i.length > 3) ? i.length % 3 : 0;

                            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
                        } catch (e) {
                            w.log(e)
                        }
                    },

                    duplicateListing: function(id){
                        let vm = this;
                        vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/duplicate-listing/', {
                            id: id,
                        }).then(function (response) {
                            if (response.body.success) {
                                vm.listings = response.body.calculators;
                                vm.stmCloseModal('.ccb-duplicate-calc');
                            }
                        });

                    },

                    removeFromListing: function (id, index) {
                        let vm = this;
                        vm.removeId = id;
                        vm.removeArrayId = index;
                    },

                    removeItem: function () {
                        let vm = this;
                        vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/remove-existing/', {
                            id: vm.removeId,
                        }).then(function (response) {
                            if (response.body.success) {
                                vm.listings.splice(vm.removeArrayId, 1);
                                vm.stmCloseModal('.ccb-delete-calc');
                            }
                        });
                    },

                    stmCloseModal: function (selector, speed = 2500, needle = 'ccb-msg-active') {
                        $(selector).addClass(needle);
                        $({to: 0}).animate({to: 1}, speed, function () {
                            $(selector).removeClass(needle);
                        });
                    },

                    changePosition: function (event) {
                        let selector = '.ccb-side-bar-tools',
                            hide = 'ccb-tools-hide',
                            posSelector = 'ccb-li-position-relative';

                        let labelAttrFor = event.target.getAttribute('for');
                        let liSelector = $('#' + labelAttrFor).attr('class');

                        let stmArr = liSelector.split(' ');

                        $('.' + posSelector).removeClass(posSelector);
                        $('.' + hide).removeClass(hide);
                        $('li.' + stmArr[1]).addClass(posSelector);

                        if (labelAttrFor === 'ccb-create-calc') {
                            $(selector).removeClass(hide);
                        } else {
                            $(selector).addClass(hide);
                        }
                    },

                    generateId: function () {

                        let vm = this;
                        let id = 0;
                        let hasAccess = true;

                        const ids = [];
                        vm.readyFields.forEach(e => ids.push(parseInt(e._id)))
                        for(let i = 0; i < ids.length; i++) {
                            if(!ids.includes(i) && hasAccess) {
                                hasAccess = false;
                                id = i;
                            }
                        }

                        if(hasAccess) id = vm.readyFields.length;
                        return id;
                     },

                    setCalendarCss: function () {

                        if(!this.styleStore['date-picker']) return;

                        let styleId = 'custom_styles';
                        let $ = jQuery;
                        if($('#' + styleId).length) $('#' + styleId).remove();

                        let datePickerStyles = this.styleStore['date-picker'];
                        let color = datePickerStyles['background-color'] ? datePickerStyles['background-color'] : '#ffffff';


                        let innerStyle = '<style id="' + styleId + '"> .mx-datepicker-popup { background-color: ' + datePickerStyles['background-color'] + ' !important;}</style>';
                        $('head').append(innerStyle);
                    }
                },

                updated() {
                    let vm = this;
                    if(typeof vm.location_url !== 'undefined'){
                        vm.order = vm.generateId();
                    }
                },
            });

            iteration++;
        });
    })
})(jQuery);