Vue.component('cost-modal', {
    props: ['hasX', 'hasMask', 'canClickMask'],

    methods: {
        methods: {
            clickX: function () {
                this.$emit('toggle')
            },
        }
    },

    template: `
                <transition name="ccb-calc-preview">
                  <div class="ccb-calc-preview">
                    <div class="ccb-calc-preview-mask" v-if="hasMask"></div>
                    <div class="ccb-calc-preview-wrapper">
                      <slot></slot>
                      <div class="ccb-calc-preview-x" v-if="hasX" @click="clickX">&times;</div>
                    </div>
                  </div>
                </transition>
              `,
});