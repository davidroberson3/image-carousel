// theodinproject.com/courses/javascript-and-jquery/lessons/
// creating-an-image-carousel-slider
'use strict';





var carousel = (function () {

    ///////////////////////////////////////////////////////////////////////////
    // Function to toggle class, to hide/show a css element
    ///////////////////////////////////////////////////////////////////////////
    function toggleImageVisibility(chosenImage) {
        if (chosenImage.classList.contains('image-visible')) {
            chosenImage.classList.remove('image-visible');
        } else {
            chosenImage.classList.add('image-visible');
        }
    }





    ///////////////////////////////////////////////////////////////////////////
    // Function to change the current active nav button
    ///////////////////////////////////////////////////////////////////////////
    function updateActiveNavButton(oldImageNumber, newImageNumber) {
        var oldActiveNavButton = document.getElementById('nav-' + oldImageNumber);
        oldActiveNavButton.classList.remove('active-nav-button');

        var newActiveNavButton = document.getElementById('nav-' + newImageNumber);
        newActiveNavButton.classList.add('active-nav-button');
    }





    ///////////////////////////////////////////////////////////////////////////
    // Function to show the next image in the carousel
    ///////////////////////////////////////////////////////////////////////////
    var showNextImage = function () {
        console.log('showNextImage');

        var imageList = document.querySelectorAll('#image-carousel .carousel-image');

        // toggle visibility of current and next images
        for (var i = 0; i < imageList.length; i += 1) {
            if (imageList[i].classList.contains('image-visible')) {
                // hide current visible image
                toggleImageVisibility(imageList[i]);
                // show next image, or start over with first image
                if (imageList[i + 1]) {
                    toggleImageVisibility(imageList[i + 1]);
                    updateActiveNavButton(i, i + 1);
                } else {
                    toggleImageVisibility(imageList[0]);
                    updateActiveNavButton(i, 0);
                }

                resetCarouselTimer();
                return;
            }
        }
    };





    ///////////////////////////////////////////////////////////////////////////
    // Function to show the previous image in the carousel
    ///////////////////////////////////////////////////////////////////////////
    var showPreviousImage = function () {
        console.log('showPreviousImage');

        var imageList = document.querySelectorAll('#image-carousel .carousel-image');

        // toggle visibility of current and previous images
        for (var i = 0; i < imageList.length; i += 1) {
            if (imageList[i].classList.contains('image-visible')) {
                // hide current visible image
                toggleImageVisibility(imageList[i]);
                // show previous image, or loop around to final image
                if (imageList[i - 1]) {
                    toggleImageVisibility(imageList[i - 1]);
                    updateActiveNavButton(i, i - 1);
                } else {
                    toggleImageVisibility(imageList[imageList.length - 1]);
                    updateActiveNavButton(i, imageList.length - 1);
                }

                resetCarouselTimer();
                return;
            }
        }
    };





    ///////////////////////////////////////////////////////////////////////////
    // Function to manually choose an image in the carousel
    ///////////////////////////////////////////////////////////////////////////
    var goToImage = function (id) {
        console.log('goToImage');

        var chosenImageNumber = id.slice(4);
        var imageList = document.querySelectorAll('#image-carousel .carousel-image');

        for (var i = 0; i < imageList.length; i += 1) {
            if (imageList[i].classList.contains('image-visible')) {
                // hide current visible image
                toggleImageVisibility(imageList[i]);
                // show chosen image
                toggleImageVisibility(imageList[chosenImageNumber]);

                updateActiveNavButton(i, chosenImageNumber);

                resetCarouselTimer();
                return;
            }
        }
    };





    ///////////////////////////////////////////////////////////////////////////
    // Function to initialize and reset the carousel timer
    ///////////////////////////////////////////////////////////////////////////
    var CAROUSELINTERVAL = 3000;
    var timerID;
    var resetCarouselTimer = function () {
        if (timerID) {
            clearInterval(timerID);
        }
        timerID = setInterval(function () {
            showNextImage();
        }, CAROUSELINTERVAL);
    };





    return {
        resetCarouselTimer: resetCarouselTimer,
        showNextImage: showNextImage,
        showPreviousImage: showPreviousImage,
        goToImage: goToImage
    };

})();





///////////////////////////////////////////////////////////////////////////////
// Add event listeners to buttons
///////////////////////////////////////////////////////////////////////////////

// navigation buttons
var navButtonList = document.getElementsByClassName('nav-button');

var navButtonClickEvent = function (x) {
    return (function () {
        carousel.goToImage(navButtonList[x].id);
    });
};

for (var i = 0; i < navButtonList.length; i += 1) {
    navButtonList[i].onclick = navButtonClickEvent(i);
}

// previous and next buttons
document.getElementById('previous-button').onclick = carousel.showPreviousImage;
document.getElementById('next-button').onclick = carousel.showNextImage;





///////////////////////////////////////////////////////////////////////////////
// Initialize carousel timer
///////////////////////////////////////////////////////////////////////////////
carousel.resetCarouselTimer();
