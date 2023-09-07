(() => {
   console.log("init...");
   // Add more sections for more slides (content could be images, web pages etc)
   const SLIDE_URLS = [
      "http://yeoman.io/static/illustration-home-inverted.91b07808be.png",
      "https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-pwa-course.png",
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
   ];

   const slidesContainerRef = document.getElementById("slidesContainerId");
   if (!slidesContainerRef) {
      console.log("Failed locate slides container");
   }

   SLIDE_URLS.forEach((url) => {
      const section = document.createElement("section");
      section.setAttribute("data-background-iframe", url);
      slidesContainerRef.appendChild(section);
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

   let backgroundFrames = null;

   Reveal.addEventListener("slidechanged", function (event) {
      if (!backgroundFrames) {
         const backgroundsContainerRef = document.querySelector(
            "div [class = 'backgrounds' ]"
         );

         const iframeContainerRefs =
            backgroundsContainerRef.querySelectorAll("iframe");

         backgroundFrames = iframeContainerRefs;
      }
      var prevIndex = event.indexh - 1;
      if (prevIndex < 0) {
         prevIndex = Reveal.getTotalSlides() - 1;
      }

      if (backgroundFrames[prevIndex].hasAttribute("useCache")) {
         backgroundFrames[prevIndex].removeAttribute("useCache");
         console.log("Keeping slide cache");
      } else {
         backgroundFrames[prevIndex].setAttribute("useCache", "true");
         console.log("Reloading slide: " + backgroundFrames[prevIndex].src);
         backgroundFrames[prevIndex].src = backgroundFrames[prevIndex].src;
      }
   });
})();
