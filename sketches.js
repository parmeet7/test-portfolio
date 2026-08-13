
// =========================================================
// SKETCH CAROUSEL
// =========================================================

const carouselImage = document.getElementById("carouselImage");
const prevSketch = document.getElementById("prevSketch");
const nextSketch = document.getElementById("nextSketch");
const sketchCounter = document.getElementById("sketchCounter");
const carouselTitle = document.getElementById("carouselTitle");


// =========================================================
// YOUR SKETCHES
// =========================================================

const sketches = [

    {
        image: "assets/gallery/02.png",
        title: "Sketch 01"
    },

    {
        image: "assets/gallery/01.png",
        title: "Sketch 02"
    },

    {
        image: "assets/gallery/03.png",
        title: "Sketch 03"
    },

    {
        image: "assets/gallery/04.png",
        title: "Sketch 04"
    },

    {
        image: "assets/gallery/05.png",
        title: "Sketch 05"
    },

    {
        image: "assets/gallery/06.png",
        title: "Sketch 06"
    },

    {
        image: "assets/gallery/07.png",
        title: "Sketch 07"
    },

    {
        image: "assets/gallery/08.png",
        title: "Sketch 08"
    },

    {
        image: "assets/gallery/09.png",
        title: "Sketch 09"
    }


];


// =========================================================
// CURRENT SKETCH
// =========================================================

let currentSketch = 0;


// =========================================================
// SHOW SKETCH
// =========================================================

function showSketch(index) {

    if (!carouselImage) {
        return;
    }

    currentSketch = index;

    carouselImage.style.opacity = "0";

    setTimeout(() => {

        carouselImage.src = sketches[currentSketch].image;

        carouselImage.alt = sketches[currentSketch].title;

        if (carouselTitle) {
            carouselTitle.textContent =
                sketches[currentSketch].title;
        }

        if (sketchCounter) {

            sketchCounter.textContent =
                String(currentSketch + 1).padStart(2, "0")
                + " / " +
                String(sketches.length).padStart(2, "0");

        }

        carouselImage.style.opacity = "1";

    }, 150);
}


// =========================================================
// NEXT BUTTON
// =========================================================

nextSketch?.addEventListener("click", () => {

    currentSketch++;

    if (currentSketch >= sketches.length) {
        currentSketch = 0;
    }

    showSketch(currentSketch);

});


// =========================================================
// PREVIOUS BUTTON
// =========================================================

prevSketch?.addEventListener("click", () => {

    currentSketch--;

    if (currentSketch < 0) {
        currentSketch = sketches.length - 1;
    }

    showSketch(currentSketch);

});


// =========================================================
// LIGHTBOX
// =========================================================

const lightbox =
    document.getElementById("imageLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


// =========================================================
// OPEN IMAGE
// =========================================================

carouselImage?.addEventListener("click", () => {

    if (!lightbox || !lightboxImage) {
        return;
    }

    lightboxImage.src = carouselImage.src;

    lightboxImage.alt = carouselImage.alt;

    lightbox.classList.add("active");

    document.body.classList.add("lightbox-open");

});


// =========================================================
// CLOSE IMAGE
// =========================================================

lightboxClose?.addEventListener("click", () => {

    lightbox?.classList.remove("active");

    document.body.classList.remove("lightbox-open");

});


// =========================================================
// CLICK OUTSIDE TO CLOSE
// =========================================================

lightbox?.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        lightbox.classList.remove("active");

        document.body.classList.remove("lightbox-open");

    }

});


// =========================================================
// ESCAPE TO CLOSE
// =========================================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        lightbox?.classList.remove("active");

        document.body.classList.remove("lightbox-open");

    }

});


// =========================================================
// KEYBOARD ARROWS
// =========================================================

document.addEventListener("keydown", (event) => {

    if (
        lightbox &&
        lightbox.classList.contains("active")
    ) {
        return;
    }

    if (event.key === "ArrowRight") {

        currentSketch++;

        if (currentSketch >= sketches.length) {
            currentSketch = 0;
        }

        showSketch(currentSketch);

    }

    if (event.key === "ArrowLeft") {

        currentSketch--;

        if (currentSketch < 0) {
            currentSketch = sketches.length - 1;
        }

        showSketch(currentSketch);

    }

});


// =========================================================
// LOAD FIRST IMAGE
// =========================================================


console.log("SCRIPT IS WORKING");
if (carouselImage) {
    showSketch(0);
}
