const DEBUG = false;

function log(content) {
    if (!DEBUG) return;

    console.log(content);
}

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
let destination = "";

$(".nav-toggle").click(() => {
    document.body.classList.toggle("nav-open");
});

$(".nav__link").click((e) => {
    document.body.classList.remove("nav-open");
    destination = e.currentTarget.hash;
});

$(".top-button").click((e) => {
    destination = e.currentTarget.hash;
});

$(window).scroll(() => {
    if (pageYOffset >= 200) {
        topButton.addClass("top-button--show");
        topButton.removeClass("top-button--hide");
    } else {
        topButton.addClass("top-button--hide");
        topButton.removeClass("top-button--show");
    }

    if (window.location.pathname !== "/index.html" &&
        window.location.pathname !== "/")
        return;

    const fromTop = $(this).scrollTop() + navHeight;

    let cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop) {
            return this;
        }
    });

    cur = cur[cur.length - 1];
    let id = cur && cur.length ? cur[0].id : "";
    if (destination === "#" + id)
        destination = "";

    if (lastId !== id) {
        lastId = id;
        navItems
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
        if (destination.length === 0)
            location.hash = id;
    }
});

$(".slideshow__button--left").click(() => {
    nextSlide(-1);
});

$(".slideshow__button--right").click(() => {
    nextSlide(1);
});


/* Slideshow & Modal */

let isModalOpen = false;
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
    showModal();
});

$(".slideshow__item").keypress((e) => {
    e.stopPropagation();
    showModal();
});

function showModal() {
    const modal = $(".modal")[0];
    const modalContent = $(".modal__content");
    const imgSrc = $(slides[slideIndex]).attr("src");
    modalContent.children(0).attr("src", imgSrc);
    $(modal).css("display", "flex");
    $("body").addClass("modal-open");
}

$(".modal__content").click((e) => {
    e.stopPropagation();
});

$("body").click((e) => {
    e.stopPropagation();
    $(".modal").css("display", "none");
    $("body").removeClass("modal-open");
});