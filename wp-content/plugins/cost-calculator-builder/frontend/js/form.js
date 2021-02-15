(function ($) {
    $(document).on("click", ".ccb-custom-container .ccb-custom-menu div", function () {
        let numberIndex = $(this).index();
        let selector = '.ccb-custom-container';
        if (!$(this).is("ccb-custom-active")) {
            $(selector + " .ccb-custom-menu div").removeClass("ccb-custom-active");
            $(selector + " ul li").removeClass("ccb-custom-active");

            $(this).addClass("ccb-custom-active");
            $(selector + " ul").find("li:eq(" + numberIndex + ")").addClass("ccb-custom-active");

            let listItemHeight = $(selector + " ul")
                .find("li:eq(" + numberIndex + ")")
                .innerHeight();
            $(selector + " ul").height(listItemHeight + "px");
        }
    });
})(jQuery);