history.scrollRestoration = "manual";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

gsap.registerPlugin(ScrollTrigger);

const avatar = document.querySelector(".avatar");
const cursor = document.querySelector(".cursor");
const hoverItems = document.querySelectorAll("a, .avatar");

// document.addEventListener("mousemove", (e) => {

//     let xAxis = (e.pageX - window.innerWidth / 2) / 80;
//     let yAxis = (e.pageY - window.innerHeight / 2) / 80;

//     avatar.style.transform =
//     `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;

// });

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
}

gsap.to(".tech-title", {
    scrollTrigger: {
        trigger: ".tech-section",
        start: "top 70%",
        end: "top 30%",
        scrub: 1
    },
    opacity: 1,
    y: 0
});