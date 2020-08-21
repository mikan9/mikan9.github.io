/* Scroll */

const topButton = $(".top-button");
const nav = $(".nav__list"),
    navHeight = nav.outerHeight() + 15,
    navItems = nav.find("a"),
    scrollItems = navItems.map(function () {
        const item = $($(this).attr("href"));
        if (item.length) return item;
    });

let lastId = 0;

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

    const fromTop = $(this).scrollTop() + navHeight;

    let cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop) {
            return this;
        }
    });

    cur = cur[cur.length - 1];
    let id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        navItems
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
    }
});

$(".slideshow__button--left").click(() => {
    nextSlide(-1);
});

$(".slideshow__button--right").click(() => {
    nextSlide(1);
});


/* Slideshow */

let slideIndex = 0;
let slides = $(".slideshow__item");
showSlide(slideIndex);

function nextSlide(n) {
    showSlide(slideIndex += n);
}

function showSlide(n) {
    if (n > slides.length - 1) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    $.each(slides, function (i, slide) {
        $(slide).removeClass("active");
    });

    $(slides[slideIndex]).addClass("active");
}

/* Modal */

$(".slideshow__item").click((e) => {
    e.stopPropagation();
    const modal = $(".modal")[0];
    const modalContent = $(".modal__content");
    const imgSrc = $(slides[slideIndex]).attr("src");
    console.log($(modalContent.children(0)));
    modalContent.children(0).attr("src", imgSrc);
    $(modal).css("display", "flex");
    $("body").addClass("modal-open");
});

$(".modal__content").click((e) => {
    e.stopPropagation();
});

$("body").click((e) => {
    e.stopPropagation();
    $(".modal").css("display", "none");
    $("body").removeClass("modal-open");
});