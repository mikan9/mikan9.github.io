const DEBUG = false;

function log(content) {
    if (!DEBUG) return;

    console.log(content);
}

/*  =========
    nav
    =========   */

const topButton = $(".top-button");
let destination = "";

$(".nav-toggle").on("click", () => {
    document.body.classList.toggle("nav-open");
});

$(".nav__link").on("click", (e) => {
    document.body.classList.remove("nav-open");
    destination = e.currentTarget.hash;
});

$(".top-button").on("click", (e) => {
    destination = e.currentTarget.hash;
});

function updateHistory(hash) {
    clearTimeout(updateHistory.timeout);
    updateHistory.timeout = setTimeout(function () {
        if (window.location.hash !== "")
            if (location.hash !== "")
                history.pushState({}, window.title, hash);
            else
                history.replaceState({}, window.title, hash);
    }, 500);
}

window.addEventListener('hashchange', function (e) {
    const sectionToShow = $(window.location.hash)[0];
    sectionToShow.scrollIntoView();
    e.preventDefault();
}, false);

$(window).on("scroll", () => {
    if (pageYOffset >= 200) {
        topButton.addClass("top-button--show");
        topButton.removeClass("top-button--hide");
    } else {
        topButton.addClass("top-button--hide");
        topButton.removeClass("top-button--show");
    }
});

/*  =========
    slideshow & modal
    =========   */

$(".slideshow__button--left").on("click", () => {
    nextSlide(-1);
});

$(".slideshow__button--right").on("click", () => {
    nextSlide(1);
});

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
    setModalContent();
}

/*  =========
    modal
    =========   */

$(".slideshow__item").on("click", (e) => {
    e.stopPropagation();
    showModal();
});

$(".slideshow__item").on("keypress", (e) => {
    e.stopPropagation();
    showModal();
});

function setModalContent() {
    const modalContent = $(".modal__content");
    const imgSrc = $(slides[slideIndex]).attr("src");
    modalContent.children(0).attr("src", imgSrc);
}

function showModal() {
    const modal = $(".modal")[0];
    $(modal).css("display", "flex");
    $("body").addClass("modal-open");
}

$(".modal__content").on("click", (e) => {
    e.stopPropagation();
});

$("body").on("click", (e) => {
    e.stopPropagation();
    $(".modal").css("display", "none");
    $("body").removeClass("modal-open");
});
