((jquery) => {
   // Add more sections for more slides (content could be images, web pages etc)
   const SLIDE_URLS = [
      "http://yeoman.io/static/illustration-home-inverted.91b07808be.png",
      "https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-pwa-course.png",
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
   ];

   const slidesContainerRef = jquery("#slidesContainerId");
   if (slidesContainerRef.length !== 1) {
      console.log("Failed locate slides container");
   }

   SLIDE_URLS.forEach((url) => {
      slidesContainerRef.append(
         `<section data-background-iframe="${url}"></section>`
      );
   });

   // Change for adapt presentation like speed, transition etc
   Reveal.initialize({
      autoSlide: 10000, // Speed in ms
      autoSlideStoppable: false,
      loop: true,
      progress: false,
      controls: false,
      transitionSpeed: "slow",
      backgroundTransitionSpeed: "slow",
   });

   Reveal.addEventListener("slidechanged", function (event) {
      if (!window.backgroundFrames) {
         window.backgroundFrames = $(
            "div [ class ^= 'slide-background']"
         ).children("iframe");
      }
      var prevIndex = event.indexh - 1;
      if (prevIndex < 0) {
         prevIndex = Reveal.getTotalSlides() - 1;
      }

      if (window.backgroundFrames[prevIndex].hasAttribute("useCache")) {
         window.backgroundFrames[prevIndex].removeAttribute("useCache");
         console.log("Keeping slide cache");
      } else {
         window.backgroundFrames[prevIndex].setAttribute("useCache", "true");
         console.log(
            "Reloading slide: " + window.backgroundFrames[prevIndex].src
         );
         window.backgroundFrames[prevIndex].src =
            window.backgroundFrames[prevIndex].src;
      }
   });
})(window.$);
