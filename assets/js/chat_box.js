$('#chat-minimize').click(function (e) {
    if ($('#messages')[0].className.indexOf('d-none') == -1) {
        $('#messages').addClass('d-none').removeClass('d-flex');
        $('#chat-footer').addClass('d-none').removeClass('d-flex');
    } else {
        $('#messages').addClass('p-0 p-3 m-0 d-flex flex-column overflow-auto').removeClass('d-none');
        $('#chat-footer').addClass('d-flex').removeClass('d-none');
    }


});