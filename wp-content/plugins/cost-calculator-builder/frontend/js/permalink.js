(function ($) {
    let append_ = `<div id="permalink-modal" class="modal">
                        <h3 class="ccb-red">Notice</h3>
                        <p>Cost calculator plugin requires <b>Permalink</b> Structure rather than Plain. We recommend to use <b>Post name</b> Permalink Structure.</p>
                   </div>`
    $('.ccb-calc-main').append(append_);
    $('#permalink-modal').modal();
    $('#permalink-modal .close-modal').remove();
    $(document).on('click', '.jquery-modal', function (e) {
        e.preventDefault();
    })

})(jQuery);