const avatar = document.querySelector(".avatar");
const cursor = document.querySelector(".cursor");
const hoverItems = document.querySelectorAll("a, .avatar");

document.addEventListener("mousemove", (e) => {

    let xAxis = (e.pageX - window.innerWidth / 2) / 80;
    let yAxis = (e.pageY - window.innerHeight / 2) / 80;

    avatar.style.transform =
    `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;

});


gsap.from(".left-section", {
    opacity: 0,
    x: -100,
    duration: 1.5,
    ease: "power3.out"
});

gsap.from(".center-section", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    delay: 0.3,
    ease: "power3.out"
});

gsap.from(".right-section", {
    opacity: 0,
    x: 100,
    duration: 1.5,
    delay: 0.6,
    ease: "power3.out"
});

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

});

hoverItems.forEach((item) => {

    item.addEventListener("mouseenter", () => {
        cursor.style.transform =
        "translate(-50%, -50%) scale(2)";
    });

    item.addEventListener("mouseleave", () => {
        cursor.style.transform =
        "translate(-50%, -50%) scale(1)";
    });

});