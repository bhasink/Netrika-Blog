let $accordion;
let $accordion_header;

function render() {
    let accordion = (function ($) {

        let settings = {
            speed: 400,
            oneOpen: false
        };

        return {
            init: function ($settings) {
                $accordion_header.on('click', function () {
                    accordion.toggle($(this));

                });

                $.extend(settings, $settings);

                if (settings.oneOpen && $('.ccb-js-accordion-item.ccb-active').length > 1) {
                    $('.ccb-js-accordion-item.ccb-active:not(:first)').removeClass('ccb-active');
                }

                $('.ccb-js-accordion-item.ccb-active').find('> .ccb-js-accordion-body').show();
            },
            toggle: function ($this) {

                if (settings.oneOpen && $this[0] != $this.closest('.ccb-js-accordion').find('> .ccb-js-accordion-item.ccb-active > .ccb-js-accordion-header')[0]) {
                    $this.closest('.ccb-js-accordion')
                        .find('> .ccb-js-accordion-item')
                        .removeClass('ccb-active')
                        .find('.ccb-js-accordion-body')
                        .slideUp()
                }

                $this.closest('.ccb-js-accordion-item').toggleClass('ccb-active');
                $this.next().stop().slideToggle(settings.speed);
            }
        }
    })(jQuery);

    return accordion;
}

let timeId = setInterval(function () {
    $accordion = jQuery('.ccb-js-accordion');
    $accordion_header = $accordion.find('.ccb-js-accordion-header');
    if (jQuery('.ccb-js-accordion-header').length) {
        jQuery(document).ready(function () {
            render().init({speed: 300, oneOpen: true});
        });
        clearInterval(timeId);
    }
}, 2000);


