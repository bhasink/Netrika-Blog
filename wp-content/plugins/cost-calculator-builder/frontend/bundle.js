/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/js/admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/js/admin.js":
/*!******************************!*\
  !*** ./frontend/js/admin.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./frontend/js/data/index.js");

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
                store: _data__WEBPACK_IMPORTED_MODULE_0__["default"],
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
                        location_url: stmCalc.siteurl,
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

                created() {
                    let vm = this;
                    if (typeof stmCalc !== "undefined" && typeof stmCalc.autoCalc !== "undefined") {
                        window.stripe_id = '';
                        if(typeof stripeData !== "undefined") window.stripe_id = stripeData.id;

                        if(typeof stmCalc.defaults !== "undefined"){
                            vm.projectId = stmCalc.calc_id;
                            vm.styleStore = Object.assign({}, vm.styleStore, stmCalc.defaults);
                        }

                        vm.response = stmCalc.autoCalc;
                        vm.stmAutoCalc();

                        if(typeof stmCalc.conditions !== "undefined"){
                            vm.conditions = stmCalc.conditions[0];
                            vm.startCondition();
                        }
                    } else {
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
                        if(vm.currency_settings)
                            val = this.get_currency_format(val, vm.currency_settings.num_after_integer, vm.currency_settings.decimal_separator, vm.currency_settings.thousands_separator);

                        return val;
                    },

                    currencyFormatPreview: function(val, element){
                        let vm = this;

                        if(element && element.hasOwnProperty('allowRound') && element.allowRound)
                            return Math.round(val);

                        if(vm.currency_settings){
                            val = this.get_currency_format(val, vm.currency_settings.num_after_integer, vm.currency_settings.decimal_separator, vm.currency_settings.thousands_separator);
                            vm.currency_settings.currency = vm.currency_settings.currency ? vm.currency_settings.currency : '';
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
                                vm.payment.message = 'Publish key is empty';
                                return false;
                            } else if(access) {
                                vm.payment.status = '';
                                vm.payment.message = '';
                            }

                            vm.stripe.stripe = Stripe(stripe_id);
                            let elements = vm.stripe.stripe.elements();
                            vm.stripe.stripeCard = elements.create('card');
                            vm.stripe.stripeCard.mount('#stm-lms-stripe');
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

                        if(data && typeof data.descriptions !== "undefined")
                        data.descriptions.forEach(function (element) {
                            totalDesc.push({
                                label: element.label,
                                value: vm.calcTotal[element.key] ? vm.calcTotal[element.key].value : 0,
                                alias: vm.calcTotal[element.key] ? vm.calcTotal[element.key].label : ''
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


                                            if(document.querySelector('#stm-lms-stripe')){
                                                vm.clearDom('block', 'none');
                                            }else {

                                                let stripe = document.createElement('div');
                                                stripe.id = 'stm-lms-stripe';

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
                        if(typeof descriptions !== "undefined")
                        descriptions.forEach(function (element) {
                            let value = vm.calcTotal[element.key] ? vm.calcTotal[element.key].value : 0;
                            let alias = vm.calcTotal[element.key] ? vm.calcTotal[element.key].label : '';
                            subtotal += element.label +': ';

                            if(alias) subtotal += ' ('+ alias +') ';

                            subtotal += value +'\n';
                        });

                        if (vm.formula && vm.formula.length > 0) {
                            vm.formula.forEach(function (element, index) {
                                if (text.indexOf('[ccb-total-' + index + ']') !== -1) {
                                    let regex = '[ccb-total-' + index + ']';
                                    text = text.replaceAll(regex, currency + element.total);
                                }
                            });
                        }

                        if (text.indexOf('[ccb-subtotal]') !== -1) {
                            let regex = '[ccb-subtotal]';
                            text = text.replaceAll(regex, subtotal);
                        }

                        let replacement = '[ccb-total-';

                        let j = 0;
                        while (text.indexOf(replacement) !== -1 && forms[0].formFields.allowContactForm) {
                            totalFound = replacement + i + ']';
                            let position = text.indexOf(totalFound);
                            if (position !== -1) {
                                text = text.replace(text.substr(position, totalFound.length), 0);
                            } else {
                                i++;
                            }

                            j++;
                            if(j === 100) break;
                        }

                        if (document.querySelector('.ccb-contact-form7')) {
                            let $form = document.querySelector('.ccb-contact-form7 form');
                            $('.ccb-contact-form7 form ccb-action').remove();

                            if($form.querySelector('.wpcf7-submit')) $form.querySelector('.wpcf7-submit').parentElement.style.display = 'block';
                            let textarea = document.querySelectorAll('.ccb-contact-form7')[vm.iteration].querySelector('textarea');
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


                                    if (data.settings.length) {
                                        vm.settingsId = 0;
                                        vm.settings = data.settings;
                                        if(vm.settings[0] && vm.settings[0].currency)
                                            vm.currency_settings = vm.settings[0].currency;
                                    }
                                }
                            });
                        } else if (vm.checkURI('action') === 'listing') {
                            vm.create = true;
                            document.querySelector('#ccb-create-calc').removeAttribute('checked');
                            document.querySelector('#ccb-calc-list').setAttribute('checked', 'checked');
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

                    stmAutoCalc: function () {
                        let vm = this;
                        let formula = vm.response['stm-formula'];
                        if(vm.response['currency_settings'])
                            vm.currency_settings = vm.response['currency_settings'];
                        if (vm.response['stm-fields'] && vm.response['stm-fields'].length) {

                            vm.response['stm-fields'].forEach(function (elem, index) {
                                let value;
                                let unit = elem.hasOwnProperty('unit') ? elem.unit : 1;
                                if (elem.alias && elem.hasOwnProperty('default') && elem.type !== 'Date Picker') {
                                    if(elem.default.indexOf('_') !== -1){
                                        elem.default = elem.default.split('_')[0];
                                        let option = elem.options.find(_item => _item.optionValue === elem.default);
                                        value = {value: elem.default, label: option.optionText};
                                    }
                                    value = value || elem.default;

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

                                    if(element && typeof element.condition !== "undefined" && typeof optionsFrom !== "undefined")
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
                                        vm.setValue(value, elementRightWrap, calc.alias);
                                        vm.stmToCalculate(calc.value, vm.response['stm-formula'], index, optionsTo.alias, optionsTo.unit ? optionsTo.unit : 1, false, false );
                                    }
                                    return calc;
                                }); break
                            }

                            case 'Set value and disable': {
                                vm.calcTotal = vm.calcTotal.map((calc, index) => {
                                    if(calc.alias === optionsTo.alias) {
                                        calc.value = value;
                                        vm.setValue(value, elementRightWrap, calc.alias);
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

                    setValue(value, elementRight, alias) {
                        if(alias.indexOf('range') !== -1){
                            elementRight.find('.ccb-range-slider__range').val(value);
                            elementRight.find('.ccb-range-slider__value').text(value);
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
                        if(document.querySelector('#stm-lms-stripe')) document.querySelector('#stm-lms-stripe').style.display = hide;
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
                            for (let j in value) {
                                total += value[j];
                            }
                            vm.calcTotal[id] = {value: total, alias: alias, id: parseInt(field_id)};
                        } else if(typeof value === 'object'){
                            vm.calcTotal[id] = {value: value.value, alias: alias, label: value.label, id: parseInt(field_id)};
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

                        if(typeof stmCalc.conditions !== "undefined" || vm.modal.isOpen)
                            vm.startCondition();
                    },

                    get_currency_format:function(amount, decimalCount = 2, decimal = ".", thousands = ",") {
                        try {
                            decimalCount = Math.abs(decimalCount);
                            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                            const negativeSign = amount < 0 ? "-" : "";

                            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                            let j = (i.length > 3) ? i.length % 3 : 0;

                            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
                        } catch (e) {
                            console.log(e)
                        }
                    },

                    duplicateListing: function(id){
                        let vm = this;
                        vm.$http.post(vm.location_url + '/wp-json/cost-calc/v1/duplicate-listing/', {
                            id: id,
                        }).then(function (response) {
                            if (response.body.success) {
                                vm.listings = response.body.listings;
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

                mounted: function () {
                    let vm = this;
                    vm.preloader = false;
                }
            });

            iteration++;
        });

    })

})(jQuery);

/***/ }),

/***/ "./frontend/js/data/data.js":
/*!**********************************!*\
  !*** ./frontend/js/data/data.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
    {id: 1, type: 'html', icon: 'fab fa-html5', _name: 'Html', description: 'html elements'},
    {id: 2, type: 'drop-down', icon: 'fas fa-chevron-down', _name: 'Drop Down', description: 'drop-down fields'},
    {id: 3, type: 'radio-button', icon: 'fa-dot-circle', _name: 'Radio button', description: 'html radio buttons'},
    {id: 4, type: 'checkbox', icon: 'fas fa-check-circle', _name: 'Checkbox', description: 'checkbox fields'},
    {id: 5, type: 'range-button', icon: 'far fa-exchange', _name: 'Range button', description: 'range buttons'},
    {id: 6, type: 'quantity', icon: 'fas fa-calculator', _name: 'Quantity', description: 'quantity filed'},
    {id: 7, type: 'text-area', icon: 'far fa-pencil', _name: 'Text', description: 'text field'},
    {id: 8, type: 'line', icon: 'fas fa-ellipsis-h', _name: 'Line', description: 'horizontal rule'},
    {id: 9, type: 'date-picker', icon: 'fa-calendar-week', _name: 'Date Picker', description: 'date-picker field'},
    {id: 10, type: 'total', icon: 'fa-money-bill-alt', _name: 'Total', description: 'total field'},
]);

/***/ }),

/***/ "./frontend/js/data/index.js":
/*!***********************************!*\
  !*** ./frontend/js/data/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libs_vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/vuex */ "./frontend/js/libs/vuex.js");
/* harmony import */ var _libs_vuex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_libs_vuex__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./frontend/js/data/data.js");



Vue.use(_libs_vuex__WEBPACK_IMPORTED_MODULE_0___default.a);

/* harmony default export */ __webpack_exports__["default"] = (new _libs_vuex__WEBPACK_IMPORTED_MODULE_0___default.a.Store({
    state: {
        formFields: _data__WEBPACK_IMPORTED_MODULE_1__["default"],
        hasAccess: false,
    },
    getters: {
        getFields: state => {
            return state.formFields;
        },

        getStyles: state => {
            return state.styleData;
        },
    },
}));

/***/ }),

/***/ "./frontend/js/libs/vuex.js":
/*!**********************************!*\
  !*** ./frontend/js/libs/vuex.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * vuex v3.1.1
 * (c) 2019 Evan You
 * @license MIT
 */
(function (global, factory) {
     true ? module.exports = factory() :
        undefined;
}(this, function () { 'use strict';

    function applyMixin (Vue) {
        var version = Number(Vue.version.split('.')[0]);

        if (version >= 2) {
            Vue.mixin({ beforeCreate: vuexInit });
        } else {
            // override init and inject vuex init procedure
            // for 1.x backwards compatibility.
            var _init = Vue.prototype._init;
            Vue.prototype._init = function (options) {
                if ( options === void 0 ) options = {};

                options.init = options.init
                    ? [vuexInit].concat(options.init)
                    : vuexInit;
                _init.call(this, options);
            };
        }

        /**
         * Vuex init hook, injected into each instances init hooks list.
         */

        function vuexInit () {
            var options = this.$options;
            // store injection
            if (options.store) {
                this.$store = typeof options.store === 'function'
                    ? options.store()
                    : options.store;
            } else if (options.parent && options.parent.$store) {
                this.$store = options.parent.$store;
            }
        }
    }

    var target = typeof window !== 'undefined'
        ? window
        : typeof global !== 'undefined'
            ? global
            : {};
    var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

    function devtoolPlugin (store) {
        if (!devtoolHook) { return }

        store._devtoolHook = devtoolHook;

        devtoolHook.emit('vuex:init', store);

        devtoolHook.on('vuex:travel-to-state', function (targetState) {
            store.replaceState(targetState);
        });

        store.subscribe(function (mutation, state) {
            devtoolHook.emit('vuex:mutation', mutation, state);
        });
    }

    /**
     * Get the first item that pass the test
     * by second argument function
     *
     * @param {Array} list
     * @param {Function} f
     * @return {*}
     */

    /**
     * forEach for object
     */
    function forEachValue (obj, fn) {
        Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
    }

    function isObject (obj) {
        return obj !== null && typeof obj === 'object'
    }

    function isPromise (val) {
        return val && typeof val.then === 'function'
    }

    function assert (condition, msg) {
        if (!condition) { throw new Error(("[vuex] " + msg)) }
    }

    function partial (fn, arg) {
        return function () {
            return fn(arg)
        }
    }

    // Base data struct for store's module, package with some attribute and method
    var Module = function Module (rawModule, runtime) {
        this.runtime = runtime;
        // Store some children item
        this._children = Object.create(null);
        // Store the origin module object which passed by programmer
        this._rawModule = rawModule;
        var rawState = rawModule.state;

        // Store the origin module's state
        this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
    };

    var prototypeAccessors = { namespaced: { configurable: true } };

    prototypeAccessors.namespaced.get = function () {
        return !!this._rawModule.namespaced
    };

    Module.prototype.addChild = function addChild (key, module) {
        this._children[key] = module;
    };

    Module.prototype.removeChild = function removeChild (key) {
        delete this._children[key];
    };

    Module.prototype.getChild = function getChild (key) {
        return this._children[key]
    };

    Module.prototype.update = function update (rawModule) {
        this._rawModule.namespaced = rawModule.namespaced;
        if (rawModule.actions) {
            this._rawModule.actions = rawModule.actions;
        }
        if (rawModule.mutations) {
            this._rawModule.mutations = rawModule.mutations;
        }
        if (rawModule.getters) {
            this._rawModule.getters = rawModule.getters;
        }
    };

    Module.prototype.forEachChild = function forEachChild (fn) {
        forEachValue(this._children, fn);
    };

    Module.prototype.forEachGetter = function forEachGetter (fn) {
        if (this._rawModule.getters) {
            forEachValue(this._rawModule.getters, fn);
        }
    };

    Module.prototype.forEachAction = function forEachAction (fn) {
        if (this._rawModule.actions) {
            forEachValue(this._rawModule.actions, fn);
        }
    };

    Module.prototype.forEachMutation = function forEachMutation (fn) {
        if (this._rawModule.mutations) {
            forEachValue(this._rawModule.mutations, fn);
        }
    };

    Object.defineProperties( Module.prototype, prototypeAccessors );

    var ModuleCollection = function ModuleCollection (rawRootModule) {
        // register root module (Vuex.Store options)
        this.register([], rawRootModule, false);
    };

    ModuleCollection.prototype.get = function get (path) {
        return path.reduce(function (module, key) {
            return module.getChild(key)
        }, this.root)
    };

    ModuleCollection.prototype.getNamespace = function getNamespace (path) {
        var module = this.root;
        return path.reduce(function (namespace, key) {
            module = module.getChild(key);
            return namespace + (module.namespaced ? key + '/' : '')
        }, '')
    };

    ModuleCollection.prototype.update = function update$1 (rawRootModule) {
        update([], this.root, rawRootModule);
    };

    ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
        var this$1 = this;
        if ( runtime === void 0 ) runtime = true;

        {
            assertRawModule(path, rawModule);
        }

        var newModule = new Module(rawModule, runtime);
        if (path.length === 0) {
            this.root = newModule;
        } else {
            var parent = this.get(path.slice(0, -1));
            parent.addChild(path[path.length - 1], newModule);
        }

        // register nested modules
        if (rawModule.modules) {
            forEachValue(rawModule.modules, function (rawChildModule, key) {
                this$1.register(path.concat(key), rawChildModule, runtime);
            });
        }
    };

    ModuleCollection.prototype.unregister = function unregister (path) {
        var parent = this.get(path.slice(0, -1));
        var key = path[path.length - 1];
        if (!parent.getChild(key).runtime) { return }

        parent.removeChild(key);
    };

    function update (path, targetModule, newModule) {
        {
            assertRawModule(path, newModule);
        }

        // update target module
        targetModule.update(newModule);

        // update nested modules
        if (newModule.modules) {
            for (var key in newModule.modules) {
                if (!targetModule.getChild(key)) {
                    {
                        console.warn(
                            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
                            'manual reload is needed'
                        );
                    }
                    return
                }
                update(
                    path.concat(key),
                    targetModule.getChild(key),
                    newModule.modules[key]
                );
            }
        }
    }

    var functionAssert = {
        assert: function (value) { return typeof value === 'function'; },
        expected: 'function'
    };

    var objectAssert = {
        assert: function (value) { return typeof value === 'function' ||
            (typeof value === 'object' && typeof value.handler === 'function'); },
        expected: 'function or object with "handler" function'
    };

    var assertTypes = {
        getters: functionAssert,
        mutations: functionAssert,
        actions: objectAssert
    };

    function assertRawModule (path, rawModule) {
        Object.keys(assertTypes).forEach(function (key) {
            if (!rawModule[key]) { return }

            var assertOptions = assertTypes[key];

            forEachValue(rawModule[key], function (value, type) {
                assert(
                    assertOptions.assert(value),
                    makeAssertionMessage(path, key, type, value, assertOptions.expected)
                );
            });
        });
    }

    function makeAssertionMessage (path, key, type, value, expected) {
        var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
        if (path.length > 0) {
            buf += " in module \"" + (path.join('.')) + "\"";
        }
        buf += " is " + (JSON.stringify(value)) + ".";
        return buf
    }

    var Vue; // bind on install

    var Store = function Store (options) {
        var this$1 = this;
        if ( options === void 0 ) options = {};

        // Auto install if it is not done yet and `window` has `Vue`.
        // To allow users to avoid auto-installation in some cases,
        // this code should be placed here. See #731
        if (!Vue && typeof window !== 'undefined' && window.Vue) {
            install(window.Vue);
        }

        {
            assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
            assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
            assert(this instanceof Store, "store must be called with the new operator.");
        }

        var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
        var strict = options.strict; if ( strict === void 0 ) strict = false;

        // store internal state
        this._committing = false;
        this._actions = Object.create(null);
        this._actionSubscribers = [];
        this._mutations = Object.create(null);
        this._wrappedGetters = Object.create(null);
        this._modules = new ModuleCollection(options);
        this._modulesNamespaceMap = Object.create(null);
        this._subscribers = [];
        this._watcherVM = new Vue();

        // bind commit and dispatch to self
        var store = this;
        var ref = this;
        var dispatch = ref.dispatch;
        var commit = ref.commit;
        this.dispatch = function boundDispatch (type, payload) {
            return dispatch.call(store, type, payload)
        };
        this.commit = function boundCommit (type, payload, options) {
            return commit.call(store, type, payload, options)
        };

        // strict mode
        this.strict = strict;

        var state = this._modules.root.state;

        // init root module.
        // this also recursively registers all sub-modules
        // and collects all module getters inside this._wrappedGetters
        installModule(this, state, [], this._modules.root);

        // initialize the store vm, which is responsible for the reactivity
        // (also registers _wrappedGetters as computed properties)
        resetStoreVM(this, state);

        // apply plugins
        plugins.forEach(function (plugin) { return plugin(this$1); });

        var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
        if (useDevtools) {
            devtoolPlugin(this);
        }
    };

    var prototypeAccessors$1 = { state: { configurable: true } };

    prototypeAccessors$1.state.get = function () {
        return this._vm._data.$$state
    };

    prototypeAccessors$1.state.set = function (v) {
        {
            assert(false, "use store.replaceState() to explicit replace store state.");
        }
    };

    Store.prototype.commit = function commit (_type, _payload, _options) {
        var this$1 = this;

        // check object-style commit
        var ref = unifyObjectStyle(_type, _payload, _options);
        var type = ref.type;
        var payload = ref.payload;
        var options = ref.options;

        var mutation = { type: type, payload: payload };
        var entry = this._mutations[type];
        if (!entry) {
            {
                console.error(("[vuex] unknown mutation type: " + type));
            }
            return
        }
        this._withCommit(function () {
            entry.forEach(function commitIterator (handler) {
                handler(payload);
            });
        });
        this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

        if (
            options && options.silent
        ) {
            console.warn(
                "[vuex] mutation type: " + type + ". Silent option has been removed. " +
                'Use the filter functionality in the vue-devtools'
            );
        }
    };

    Store.prototype.dispatch = function dispatch (_type, _payload) {
        var this$1 = this;

        // check object-style dispatch
        var ref = unifyObjectStyle(_type, _payload);
        var type = ref.type;
        var payload = ref.payload;

        var action = { type: type, payload: payload };
        var entry = this._actions[type];
        if (!entry) {
            {
                console.error(("[vuex] unknown action type: " + type));
            }
            return
        }

        try {
            this._actionSubscribers
                .filter(function (sub) { return sub.before; })
                .forEach(function (sub) { return sub.before(action, this$1.state); });
        } catch (e) {
            {
                console.warn("[vuex] error in before action subscribers: ");
                console.error(e);
            }
        }

        var result = entry.length > 1
            ? Promise.all(entry.map(function (handler) { return handler(payload); }))
            : entry[0](payload);

        return result.then(function (res) {
            try {
                this$1._actionSubscribers
                    .filter(function (sub) { return sub.after; })
                    .forEach(function (sub) { return sub.after(action, this$1.state); });
            } catch (e) {
                {
                    console.warn("[vuex] error in after action subscribers: ");
                    console.error(e);
                }
            }
            return res
        })
    };

    Store.prototype.subscribe = function subscribe (fn) {
        return genericSubscribe(fn, this._subscribers)
    };

    Store.prototype.subscribeAction = function subscribeAction (fn) {
        var subs = typeof fn === 'function' ? { before: fn } : fn;
        return genericSubscribe(subs, this._actionSubscribers)
    };

    Store.prototype.watch = function watch (getter, cb, options) {
        var this$1 = this;

        {
            assert(typeof getter === 'function', "store.watch only accepts a function.");
        }
        return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
    };

    Store.prototype.replaceState = function replaceState (state) {
        var this$1 = this;

        this._withCommit(function () {
            this$1._vm._data.$$state = state;
        });
    };

    Store.prototype.registerModule = function registerModule (path, rawModule, options) {
        if ( options === void 0 ) options = {};

        if (typeof path === 'string') { path = [path]; }

        {
            assert(Array.isArray(path), "module path must be a string or an Array.");
            assert(path.length > 0, 'cannot register the root module by using registerModule.');
        }

        this._modules.register(path, rawModule);
        installModule(this, this.state, path, this._modules.get(path), options.preserveState);
        // reset store to update getters...
        resetStoreVM(this, this.state);
    };

    Store.prototype.unregisterModule = function unregisterModule (path) {
        var this$1 = this;

        if (typeof path === 'string') { path = [path]; }

        {
            assert(Array.isArray(path), "module path must be a string or an Array.");
        }

        this._modules.unregister(path);
        this._withCommit(function () {
            var parentState = getNestedState(this$1.state, path.slice(0, -1));
            Vue.delete(parentState, path[path.length - 1]);
        });
        resetStore(this);
    };

    Store.prototype.hotUpdate = function hotUpdate (newOptions) {
        this._modules.update(newOptions);
        resetStore(this, true);
    };

    Store.prototype._withCommit = function _withCommit (fn) {
        var committing = this._committing;
        this._committing = true;
        fn();
        this._committing = committing;
    };

    Object.defineProperties( Store.prototype, prototypeAccessors$1 );

    function genericSubscribe (fn, subs) {
        if (subs.indexOf(fn) < 0) {
            subs.push(fn);
        }
        return function () {
            var i = subs.indexOf(fn);
            if (i > -1) {
                subs.splice(i, 1);
            }
        }
    }

    function resetStore (store, hot) {
        store._actions = Object.create(null);
        store._mutations = Object.create(null);
        store._wrappedGetters = Object.create(null);
        store._modulesNamespaceMap = Object.create(null);
        var state = store.state;
        // init all modules
        installModule(store, state, [], store._modules.root, true);
        // reset vm
        resetStoreVM(store, state, hot);
    }

    function resetStoreVM (store, state, hot) {
        var oldVm = store._vm;

        // bind store public getters
        store.getters = {};
        var wrappedGetters = store._wrappedGetters;
        var computed = {};
        forEachValue(wrappedGetters, function (fn, key) {
            // use computed to leverage its lazy-caching mechanism
            // direct inline function use will lead to closure preserving oldVm.
            // using partial to return function with only arguments preserved in closure enviroment.
            computed[key] = partial(fn, store);
            Object.defineProperty(store.getters, key, {
                get: function () { return store._vm[key]; },
                enumerable: true // for local getters
            });
        });

        // use a Vue instance to store the state tree
        // suppress warnings just in case the user has added
        // some funky global mixins
        var silent = Vue.config.silent;
        Vue.config.silent = true;
        store._vm = new Vue({
            data: {
                $$state: state
            },
            computed: computed
        });
        Vue.config.silent = silent;

        // enable strict mode for new vm
        if (store.strict) {
            enableStrictMode(store);
        }

        if (oldVm) {
            if (hot) {
                // dispatch changes in all subscribed watchers
                // to force getter re-evaluation for hot reloading.
                store._withCommit(function () {
                    oldVm._data.$$state = null;
                });
            }
            Vue.nextTick(function () { return oldVm.$destroy(); });
        }
    }

    function installModule (store, rootState, path, module, hot) {
        var isRoot = !path.length;
        var namespace = store._modules.getNamespace(path);

        // register in namespace map
        if (module.namespaced) {
            store._modulesNamespaceMap[namespace] = module;
        }

        // set state
        if (!isRoot && !hot) {
            var parentState = getNestedState(rootState, path.slice(0, -1));
            var moduleName = path[path.length - 1];
            store._withCommit(function () {
                Vue.set(parentState, moduleName, module.state);
            });
        }

        var local = module.context = makeLocalContext(store, namespace, path);

        module.forEachMutation(function (mutation, key) {
            var namespacedType = namespace + key;
            registerMutation(store, namespacedType, mutation, local);
        });

        module.forEachAction(function (action, key) {
            var type = action.root ? key : namespace + key;
            var handler = action.handler || action;
            registerAction(store, type, handler, local);
        });

        module.forEachGetter(function (getter, key) {
            var namespacedType = namespace + key;
            registerGetter(store, namespacedType, getter, local);
        });

        module.forEachChild(function (child, key) {
            installModule(store, rootState, path.concat(key), child, hot);
        });
    }

    /**
     * make localized dispatch, commit, getters and state
     * if there is no namespace, just use root ones
     */
    function makeLocalContext (store, namespace, path) {
        var noNamespace = namespace === '';

        var local = {
            dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
                var args = unifyObjectStyle(_type, _payload, _options);
                var payload = args.payload;
                var options = args.options;
                var type = args.type;

                if (!options || !options.root) {
                    type = namespace + type;
                    if (!store._actions[type]) {
                        console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
                        return
                    }
                }

                return store.dispatch(type, payload)
            },

            commit: noNamespace ? store.commit : function (_type, _payload, _options) {
                var args = unifyObjectStyle(_type, _payload, _options);
                var payload = args.payload;
                var options = args.options;
                var type = args.type;

                if (!options || !options.root) {
                    type = namespace + type;
                    if (!store._mutations[type]) {
                        console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
                        return
                    }
                }

                store.commit(type, payload, options);
            }
        };

        // getters and state object must be gotten lazily
        // because they will be changed by vm update
        Object.defineProperties(local, {
            getters: {
                get: noNamespace
                    ? function () { return store.getters; }
                    : function () { return makeLocalGetters(store, namespace); }
            },
            state: {
                get: function () { return getNestedState(store.state, path); }
            }
        });

        return local
    }

    function makeLocalGetters (store, namespace) {
        var gettersProxy = {};

        var splitPos = namespace.length;
        Object.keys(store.getters).forEach(function (type) {
            // skip if the target getter is not match this namespace
            if (type.slice(0, splitPos) !== namespace) { return }

            // extract local getter type
            var localType = type.slice(splitPos);

            // Add a port to the getters proxy.
            // Define as getter property because
            // we do not want to evaluate the getters in this time.
            Object.defineProperty(gettersProxy, localType, {
                get: function () { return store.getters[type]; },
                enumerable: true
            });
        });

        return gettersProxy
    }

    function registerMutation (store, type, handler, local) {
        var entry = store._mutations[type] || (store._mutations[type] = []);
        entry.push(function wrappedMutationHandler (payload) {
            handler.call(store, local.state, payload);
        });
    }

    function registerAction (store, type, handler, local) {
        var entry = store._actions[type] || (store._actions[type] = []);
        entry.push(function wrappedActionHandler (payload, cb) {
            var res = handler.call(store, {
                dispatch: local.dispatch,
                commit: local.commit,
                getters: local.getters,
                state: local.state,
                rootGetters: store.getters,
                rootState: store.state
            }, payload, cb);
            if (!isPromise(res)) {
                res = Promise.resolve(res);
            }
            if (store._devtoolHook) {
                return res.catch(function (err) {
                    store._devtoolHook.emit('vuex:error', err);
                    throw err
                })
            } else {
                return res
            }
        });
    }

    function registerGetter (store, type, rawGetter, local) {
        if (store._wrappedGetters[type]) {
            {
                console.error(("[vuex] duplicate getter key: " + type));
            }
            return
        }
        store._wrappedGetters[type] = function wrappedGetter (store) {
            return rawGetter(
                local.state, // local state
                local.getters, // local getters
                store.state, // root state
                store.getters // root getters
            )
        };
    }

    function enableStrictMode (store) {
        store._vm.$watch(function () { return this._data.$$state }, function () {
            {
                assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
            }
        }, { deep: true, sync: true });
    }

    function getNestedState (state, path) {
        return path.length
            ? path.reduce(function (state, key) { return state[key]; }, state)
            : state
    }

    function unifyObjectStyle (type, payload, options) {
        if (isObject(type) && type.type) {
            options = payload;
            payload = type;
            type = type.type;
        }

        {
            assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
        }

        return { type: type, payload: payload, options: options }
    }

    function install (_Vue) {
        if (Vue && _Vue === Vue) {
            {
                console.error(
                    '[vuex] already installed. Vue.use(Vuex) should be called only once.'
                );
            }
            return
        }
        Vue = _Vue;
        applyMixin(Vue);
    }

    /**
     * Reduce the code which written in Vue.js for getting the state.
     * @param {String} [namespace] - Module's namespace
     * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
     * @param {Object}
     */
    var mapState = normalizeNamespace(function (namespace, states) {
        var res = {};
        normalizeMap(states).forEach(function (ref) {
            var key = ref.key;
            var val = ref.val;

            res[key] = function mappedState () {
                var state = this.$store.state;
                var getters = this.$store.getters;
                if (namespace) {
                    var module = getModuleByNamespace(this.$store, 'mapState', namespace);
                    if (!module) {
                        return
                    }
                    state = module.context.state;
                    getters = module.context.getters;
                }
                return typeof val === 'function'
                    ? val.call(this, state, getters)
                    : state[val]
            };
            // mark vuex getter for devtools
            res[key].vuex = true;
        });
        return res
    });

    /**
     * Reduce the code which written in Vue.js for committing the mutation
     * @param {String} [namespace] - Module's namespace
     * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
     * @return {Object}
     */
    var mapMutations = normalizeNamespace(function (namespace, mutations) {
        var res = {};
        normalizeMap(mutations).forEach(function (ref) {
            var key = ref.key;
            var val = ref.val;

            res[key] = function mappedMutation () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                // Get the commit method from store
                var commit = this.$store.commit;
                if (namespace) {
                    var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
                    if (!module) {
                        return
                    }
                    commit = module.context.commit;
                }
                return typeof val === 'function'
                    ? val.apply(this, [commit].concat(args))
                    : commit.apply(this.$store, [val].concat(args))
            };
        });
        return res
    });

    /**
     * Reduce the code which written in Vue.js for getting the getters
     * @param {String} [namespace] - Module's namespace
     * @param {Object|Array} getters
     * @return {Object}
     */
    var mapGetters = normalizeNamespace(function (namespace, getters) {
        var res = {};
        normalizeMap(getters).forEach(function (ref) {
            var key = ref.key;
            var val = ref.val;

            // The namespace has been mutated by normalizeNamespace
            val = namespace + val;
            res[key] = function mappedGetter () {
                if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
                    return
                }
                if (!(val in this.$store.getters)) {
                    console.error(("[vuex] unknown getter: " + val));
                    return
                }
                return this.$store.getters[val]
            };
            // mark vuex getter for devtools
            res[key].vuex = true;
        });
        return res
    });

    /**
     * Reduce the code which written in Vue.js for dispatch the action
     * @param {String} [namespace] - Module's namespace
     * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
     * @return {Object}
     */
    var mapActions = normalizeNamespace(function (namespace, actions) {
        var res = {};
        normalizeMap(actions).forEach(function (ref) {
            var key = ref.key;
            var val = ref.val;

            res[key] = function mappedAction () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                // get dispatch function from store
                var dispatch = this.$store.dispatch;
                if (namespace) {
                    var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
                    if (!module) {
                        return
                    }
                    dispatch = module.context.dispatch;
                }
                return typeof val === 'function'
                    ? val.apply(this, [dispatch].concat(args))
                    : dispatch.apply(this.$store, [val].concat(args))
            };
        });
        return res
    });

    /**
     * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
     * @param {String} namespace
     * @return {Object}
     */
    var createNamespacedHelpers = function (namespace) { return ({
        mapState: mapState.bind(null, namespace),
        mapGetters: mapGetters.bind(null, namespace),
        mapMutations: mapMutations.bind(null, namespace),
        mapActions: mapActions.bind(null, namespace)
    }); };

    /**
     * Normalize the map
     * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
     * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
     * @param {Array|Object} map
     * @return {Object}
     */
    function normalizeMap (map) {
        return Array.isArray(map)
            ? map.map(function (key) { return ({ key: key, val: key }); })
            : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
    }

    /**
     * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
     * @param {Function} fn
     * @return {Function}
     */
    function normalizeNamespace (fn) {
        return function (namespace, map) {
            if (typeof namespace !== 'string') {
                map = namespace;
                namespace = '';
            } else if (namespace.charAt(namespace.length - 1) !== '/') {
                namespace += '/';
            }
            return fn(namespace, map)
        }
    }

    /**
     * Search a special module from store by namespace. if module not exist, print error message.
     * @param {Object} store
     * @param {String} helper
     * @param {String} namespace
     * @return {Object}
     */
    function getModuleByNamespace (store, helper, namespace) {
        var module = store._modulesNamespaceMap[namespace];
        if (!module) {
            console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
        }
        return module
    }

    var index = {
        Store: Store,
        install: install,
        version: '3.1.1',
        mapState: mapState,
        mapMutations: mapMutations,
        mapGetters: mapGetters,
        mapActions: mapActions,
        createNamespacedHelpers: createNamespacedHelpers
    };

    return index;

}));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map