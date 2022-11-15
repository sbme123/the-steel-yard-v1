barba.init({
  transitions: [
    {
      name: "opacity-transition",

      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5,
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5,
        });
      },
    },
  ],
  views: [
    {
      namespace: "whats",
      // beforeEnter or afterEnter works here
      beforeEnter({ next }) {
        let script = document.createElement("script");
        console.log(window);
        script.src = "https://widgets.dice.fm/dice-event-list-widget.js";
        next.container.appendChild(script);

        gsap.set(".dice-widget-container", {
          opacity: 0,
          y: 300,
          x: "-50%",
          duration: 0.8,
        });

        if (
          script.src === "https://widgets.dice.fm/dice-event-list-widget.js"
        ) {
          setTimeout(() => {
            DiceEventListWidget.create({
              information: "full",
              eventTitle: "event",
              showImages: false,
              showAudio: true,
              showNewBadge: false,
              layout: "list",
              roundButtons: false,
              theme: "dark",
              fontFamily: "inherit",
              partnerId: "ca4be586",
              apiKey: "BOPJlQwh5G7RidWh6ZBth3MVRPQblXxJ6Iz5yh5V",
              version: 2,
              highlightColour: "white",
              venues: ["The Steel Yard"],
            });
          }, 600);
        }
      },

      afterEnter({ next }) {
        let moveUp = gsap.from(".dice-widget-container", {
          opacity: 1,
          y: 300,
          duration: 0.8,
        });
        gsap.to(".dice-widget-container", {
          opacity: 1,
          y: 0,
          duration: 0.8,
        });

        let currentDelay = moveUp.delay();
        myAnimation.delay(1);
      },
    },

    {
      namespace: "hire",
      // beforeEnter or afterEnter works here
      // afterEnter({ next }) {
      afterEnter(data) {
        // Resetting the postion of the loading screen.
        // This is animating the horizontal scroll sections
        let sections = gsap.utils.toArray(".panel");

        let scrollTween = gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none", // <-- IMPORTANT!
          scrollTrigger: {
            trigger: ".horizontal-scroll-container",
            pin: true,
            scrub: 1,
            start: "+=1",
            end: "+=3000",
          },
        });

        // ////////////////////

        // let sections = gsap.utils.toArray(".panel");

        // let scrollTween = gsap.to(sections, {
        //   xPercent: -100 * (sections.length - 1),
        //   ease: "none", // <-- IMPORTANT!
        //   scrollTrigger: {
        //     // It's targetting the entire container class
        //     trigger: ".horizontal-scroll-container",
        //     // invalidateOnRefresh: true,
        //     pin: true,
        //     // toggleActions: "play reverse play reverse",
        //     scrub: 0.1,
        //     //snap: directionalSnap(1 / (sections.length - 1)),
        //     // I thoguht having a start postion would stop the auto play but it has not.
        //     // start: "+=1",
        //     // start: "top " + sections.offsetTop,
        //     end: "+=3000",
        //   },
        // });
        // This is stopping the animation on load
        //  scrollTween.pause();

        // This is controlling teh card effects on the horizontal scroll.
        const cards = gsap.utils.toArray(".card");
        cards.forEach((card) => {
          gsap.from(card, {
            scale: 0.8,
            opacity: 0.5,
            duration: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "right 96%",
              end: "left 4%",
              toggleActions: "play reverse play reverse",
              // scrub: true,
              id: "2",
              // markers: true,
            },
          });
        });

        const cardGrid = gsap.utils.toArray(".card-grid");
        cardGrid.forEach((card) => {
          gsap.from(card, {
            scale: 0.8,
            opacity: 0.5,
            duration: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "right 96%",
              end: "left 4%",
              toggleActions: "play reverse play reverse",
              // scrub: true,
              id: "2",
              // markers: true,
            },
          });
        });
        // ScrollTrigger.disable(false, true);

        window.history.scrollRestoration = "manual";
      },
    },
  ],
});
