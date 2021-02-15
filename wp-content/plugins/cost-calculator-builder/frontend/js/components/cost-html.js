Vue.component('cost-html', {
    props: ['args', 'styles'],
    data: function(){
        return {
            classes: '',
            description: '',
            htmlContent: '',
            additionalCss: '',

        }
    },

    created(){
        if(this.args){
            this.classes = this.args.additionalStyles;
            this.htmlContent = this.args.htmlContent ? this.args.htmlContent : '';
            this.additionalCss = this.args.hasOwnProperty('additionalCss') ? this.args.additionalCss : '';
        }

    },


    template: `<template>
                    <div class="ccb-inner-wrapper" v-bind:style="additionalCss" v-html="htmlContent" :class="classes"></div>
               </template>
             `,
});