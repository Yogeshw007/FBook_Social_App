$.each($('.react-logo'), function (i, ele) {
    $(ele).click(function (e) {
        let btn = $($(ele)[0].nextElementSibling);
        if (btn.css('visibility') === 'visible') {
            btn.css({ 'visibility': 'hidden' })
        } else {
            btn.css({ 'visibility': 'visible' });
        }
    });
})