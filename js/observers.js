/*  =========
    observers
    =========   */

function callback(entries) {
    entries.forEach(entry => {
        const hash = "#" + entry.target.id;
        const nav = document.querySelector(`[href="${hash}"]`);

        if (entry.isIntersecting) {
            nav.parentElement.classList.add("active");
            updateHistory(hash);

            if (entry.target.classList.contains("from-left") ||
                entry.target.classList.contains("from-right"))
                entry.target.classList.add("appear");
        } else
            nav.parentElement.classList.remove("active");
    });
}

/* Intro */

const sectionIntro = document.querySelector("#home");
const sectionIntroOptions = {
    threshold: 1
};

const sectionIntroObserver = new IntersectionObserver(
    callback,
    sectionIntroOptions);

sectionIntroObserver.observe(sectionIntro);

/* Services */

const sectionServices = document.querySelector("#services");
const sectionServicesOptions = {
    threshold: 1,
    rootMargin: "0px 0px -200px 0px"
};

const sectionServicesObserver = new IntersectionObserver(
    callback,
    sectionServicesOptions);

sectionServicesObserver.observe(sectionServices);

/* About */

const sectionAbout = document.querySelector("#about");
const sectionAboutOptions = {
    threshold: .8,
    rootMargin: "0px 0px -200px 0px"
};

const sectionAboutObserver = new IntersectionObserver(
    callback,
    sectionAboutOptions);

sectionAboutObserver.observe(sectionAbout);

/* Projects */

const sectionProjects = document.querySelector("#projects");
const sectionProjectsOptions = {
    threshold: 0.9
};

const sectionProjectsObserver = new IntersectionObserver(
    callback,
    sectionProjectsOptions);

sectionProjectsObserver.observe(sectionProjects);