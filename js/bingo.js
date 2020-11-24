$('td').click(function() {
    const el = $(this);
    if (el.hasClass("unchecked")) {
        el.removeClass("unchecked");
        el.addClass("checked");
    } else if (el.hasClass("checked")) {
        el.removeClass("checked");
        el.addClass("blocked");
    } else if (el.hasClass("blocked")) {
        el.removeClass("blocked");
        el.addClass("unchecked");
    }
});