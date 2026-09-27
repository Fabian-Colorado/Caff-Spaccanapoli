/* =========================================
   LANGUAGE SYSTEM
========================================= */

const languageButtons = document.querySelectorAll("[data-language]");

const translatableElements =
    document.querySelectorAll("[data-en]");


function changeLanguage(language) {

    translatableElements.forEach(function(element) {

        element.textContent =
            element.dataset[language];

    });

    document.documentElement.lang = language;

    localStorage.setItem("language", language);

}


languageButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const language =
            button.dataset.language;

        changeLanguage(language);

    });

});


const savedLanguage =
    localStorage.getItem("language") || "en";


changeLanguage(savedLanguage);


/* =========================================
   GALLERY
========================================= */

const track =
    document.querySelector(".gallery-track");

const images =
    document.querySelectorAll(".gallery-track img");

const nextButton =
    document.getElementById("next");

const previousButton =
    document.getElementById("previous");

const currentNumber =
    document.getElementById("current-number");


let currentImage = 0;


function isMobile() {

    return window.innerWidth <= 700;

}


function getMaxIndex() {

    if (isMobile()) {

        return images.length - 1;

    }

    return images.length - 3;

}


function updateGallery() {

    const gap =
        isMobile() ? 0 : 20;


    const imageWidth =
        isMobile()

            ? track.parentElement.offsetWidth

            : (track.parentElement.offsetWidth - 40) / 3;


    const move =
        (imageWidth + gap) * currentImage;


    track.style.transform =
        `translateX(-${move}px)`;


    currentNumber.textContent =
        currentImage + 1;

}


function nextImage() {

    currentImage++;


    if (currentImage > getMaxIndex()) {

        currentImage = 0;

    }


    updateGallery();

}


function previousImage() {

    currentImage--;


    if (currentImage < 0) {

        currentImage = getMaxIndex();

    }


    updateGallery();

}


nextButton.addEventListener(
    "click",
    nextImage
);


previousButton.addEventListener(
    "click",
    previousImage
);


window.addEventListener(
    "resize",
    updateGallery
);


/* =========================================
   MOBILE SWIPE
========================================= */

let startTouch = 0;


track.addEventListener(
    "touchstart",
    function(event) {

        startTouch =
            event.touches[0].clientX;

    }
);


track.addEventListener(
    "touchend",
    function(event) {

        const endTouch =
            event.changedTouches[0].clientX;


        const difference =
            startTouch - endTouch;


        if (Math.abs(difference) > 50) {

            if (difference > 0) {

                nextImage();

            } else {

                previousImage();

            }

        }

    }
);


/* =========================================
   MOBILE AUTO SLIDE
========================================= */

setInterval(function() {

    if (isMobile()) {

        nextImage();

    }

}, 4000);


/* =========================================
   INITIALIZE
========================================= */

updateGallery();
