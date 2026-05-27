history.scrollRestoration = "manual";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

gsap.registerPlugin(ScrollTrigger);

const avatar = document.querySelector(".avatar");
const cursor = document.querySelector(".cursor");
const hoverItems = document.querySelectorAll("a, .avatar");
const categoryWrap = document.querySelectorAll(".category-wrap");
const hexes = document.querySelectorAll(".hex");
const projectCards = document.querySelectorAll(".project-card");
const projectsTrack = document.querySelector(".projects-track");

let mouseX = 0;
let mouseY = 0;
let scrollRotate = 0;
let aboutProgress = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = (e.pageX - window.innerWidth / 2) / 80;
    mouseY = (e.pageY - window.innerHeight / 2) / 80;
    gsap.to(".avatar", {
        rotateY: mouseX + scrollRotate,
        rotateX: -mouseY * (1 - aboutProgress),
        duration: 0.3
    });

});

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

const introTl = gsap.timeline({
    onComplete: initScrollAnimations
});

introTl.fromTo(".left-section",
{
    x: -400,
    opacity: 0
},
{
    x: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out"
})

.fromTo(".center-section",
{
    y: 50,
    opacity: 0
},
{
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out"
}, "-=1")

.fromTo(".right-section",
{
    x: 400,
    opacity: 0
},
{
    x: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out"
}, "-=1");

function initScrollAnimations() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scene",
            start: "top top",
            end: "+=1500",
            scrub: 1,
            pin: true
        }
    });

    tl.to(".left-section", {
        x: -200,
        opacity: 0
    }, 0)

    .to(".right-section", {
        x: 200,
        opacity: 0
    }, 0)

    .to(".center-section", {
    x: -300,
    onUpdate: () => {
        if (tl.progress() > 0.2) {
            document
            .querySelector(".scene")
            .classList.add("about-active");
        } else {
            document
            .querySelector(".scene")
            .classList.remove("about-active");
        }
    }
}, 0)

    .to(".avatar", {
        rotateY: 20,
        onUpdate: function () {
            scrollRotate = gsap.getProperty(".avatar", "rotateY");
            aboutProgress = tl.progress();
        }
    }, 0)

    .to(".about-content", {
        opacity: 1,
        x: 0
    }, 0.3);

    const techTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".tech-section",
        start: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
    }
});

techTl.to(".tech-title", {
    opacity: 1,
    scale: 1,
    y: -250
}, 0)

.to(".tech-title", {
    fontSize: "4rem",
    y: -250,
    letterSpacing: "4px"
}, 0.5)

.to(".honeycomb-wrapper", {
    opacity: 1,
    y: -100
}, 0.7);

gsap.set(projectsTrack, {
    x: 850
});

const projTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".projects-section",
        start: "top top",
        end: "+=4000",
        scrub: 1,
        pin: true,
    }
});

projTl.to(".projects-title", {
    opacity: 1,
    y: -250,
    duration: 1
}, 0)

.to(".projects-title", {
    fontSize: "4rem",
    letterSpacing: "4px",
    duration: 1
}, 1)

.to(".projects-wrapper", {
    opacity: 1,
    y: 0,
    duration: 1
}, 1.5)

.to(projectsTrack, {

        x: () => -(projectsTrack.scrollWidth - window.innerWidth) - 850,

    ease: "none",

    onUpdate: () => {

        const center =
        window.innerWidth / 2;

        projectCards.forEach(card => {

            const rect =
            card.getBoundingClientRect();

            const cardCenter =
            rect.left + rect.width / 2;

            const distance =
            Math.abs(center - cardCenter);

            if (distance < 450) {

                card.classList.add("active");

            }

            else {

                card.classList.remove("active");

            }

        });

    }

}, 3);

}

const categoryWraps = document.querySelectorAll(".category-wrap");

categoryWraps.forEach(wrap => {

    wrap.addEventListener("mouseenter", () => {

        const category =
        wrap.querySelector(".category");

        const selectedCategory =
        category.dataset.category;

        hexes.forEach(hex => {

            const hexCategory =
            hex.dataset.category;

            if (hexCategory === selectedCategory) {

                hex.classList.add("active");
                hex.classList.remove("dim");

            }

            else {

                hex.classList.add("dim");
                hex.classList.remove("active");

            }

        });

    });

    wrap.addEventListener("mouseleave", () => {

        hexes.forEach(hex => {

            hex.classList.remove("active");
            hex.classList.remove("dim");

        });

    });

});

ScrollTrigger.refresh();