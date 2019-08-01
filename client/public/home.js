
      const parallaxEls = document.querySelectorAll("[data-speed]");
      
      window.addEventListener("scroll", scrollHandler);
      
      function scrollHandler() {
        for (const parallaxEl of parallaxEls) {
          const direction = parallaxEl.dataset.direction == "up" ? "-" : "";
          const transformY = this.pageYOffset * parallaxEl.dataset.speed;
          if (parallaxEl.classList.contains("banner-title")) {
            parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-10deg)`;
          } else if (parallaxEl.classList.contains("banner-subtitle")) {
            parallaxEl.style.transform = `translate3d(0,${direction}${transformX}px,0) rotate(-1deg)`;
          } else {
            parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0)`;
          }
        }
      }
      
      