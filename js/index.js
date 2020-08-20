var topButton = $(".top-button");
var lastId,
    nav = $(".nav__list"),
    navHeight = nav.outerHeight() + 15,
    navItems = nav.find("a"),
    scrollItems = navItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) return item;
    });

$(".nav-toggle").click(() => {
    document.body.classList.toggle('nav-open');
});

$(".nav__link").click(() => {
    document.body.classList.remove('nav-open');
});

$(window).scroll(() => {
    if (pageYOffset >= 200) {
        topButton.addClass('top-button--show');
        topButton.removeClass('top-button--hide');
    } else {
        topButton.addClass('top-button--hide');
        topButton.removeClass('top-button--show');
    }

    var fromTop = $(this).scrollTop() + navHeight;

    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop) {
            return this;
        }
    });

    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        navItems
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
    }
});