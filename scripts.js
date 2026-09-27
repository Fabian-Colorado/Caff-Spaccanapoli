/* =========================
   LANGUAGE SYSTEM
========================= */

const languageButtons = document.querySelectorAll("[data-language]");
const translatableElements = document.querySelectorAll("[data-it]");

function changeLanguage(language) {

    translatableElements.forEach(function(element) {

        const translation = element.dataset[language];

        if (translation) {
            element.textContent = translation;
        }

    });

    document.documentElement.lang = language;

    localStorage.setItem("language", language);
}

languageButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const language = button.dataset.language;

        changeLanguage(language);

    });

});

const savedLanguage = localStorage.getItem("language") || "it";

changeLanguage(savedLanguage);


/* =========================
   GALLERY
========================= */

const galleryTrack = document.querySelector(".gallery-track");
const galleryItems = document.querySelectorAll(".gallery-item");
const previousButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");
const galleryCounter = document.querySelector("#gallery-counter");

if (galleryTrack && galleryItems.length > 0) {

    let currentIndex = 0;

    function getItemsPerView() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        return 3;
    }


    function updateGallery() {

        const itemsPerView = getItemsPerView();

        const itemWidth = galleryItems[0].offsetWidth;

        const gap = parseFloat(
            window.getComputedStyle(galleryTrack).gap
        ) || 0;

        const moveDistance = itemWidth + gap;

        galleryTrack.style.transform =
            `translateX(-${currentIndex * moveDistance}px)`;

        galleryCounter.textContent =
            `${currentIndex + 1} / ${galleryItems.length}`;
    }


    function nextImage() {

        const itemsPerView = getItemsPerView();

        const maxIndex =
            galleryItems.length - itemsPerView;

        if (currentIndex < maxIndex) {

            currentIndex++;

        } else {

            currentIndex = 0;

        }

        updateGallery();
    }


    function previousImage() {

        const itemsPerView = getItemsPerView();

        const maxIndex =
            galleryItems.length - itemsPerView;

        if (currentIndex > 0) {

            currentIndex--;

        } else {

            currentIndex = maxIndex;

        }

        updateGallery();
    }


    previousButton.addEventListener(
        "click",
        previousImage
    );

    nextButton.addEventListener(
        "click",
        nextImage
    );


    /* =========================
       MOBILE SWIPE
    ========================= */

    let touchStartX = 0;
    let touchEndX = 0;

    galleryTrack.addEventListener(
        "touchstart",
        function(event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    galleryTrack.addEventListener(
        "touchend",
        function(event) {

            touchEndX =
                event.changedTouches[0].screenX;

            const swipeDistance =
                touchEndX - touchStartX;

            if (Math.abs(swipeDistance) < 50) {
                return;
            }

            if (swipeDistance < 0) {

                nextImage();

            } else {

                previousImage();

            }

        },
        { passive: true }
    );


    window.addEventListener(
        "resize",
        function() {

            const itemsPerView = getItemsPerView();

            const maxIndex =
                galleryItems.length - itemsPerView;

            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }

            updateGallery();

        }
    );


    updateGallery();

}
