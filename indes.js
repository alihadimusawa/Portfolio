// Initialize GSAP animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate the title
gsap.from(".title", {
    opacity: 0,
    duration: 0.5,
})

gsap.from(".title h1, .title h3", {
    opacity: 0,
    delay: 0.5,
    stagger: 0.2,
    duration: 0.5,
})


// Animate each element inside the about me section
gsap.from(".aboutme *, .aboutme", {
    opacity: 0,
    y: -100,
    duration: 2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".aboutme *",
        start: "top top",
        toggleActions: "play none none none"
    }
});

// Animate the proficiency section
gsap.from(".proficiency", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".proficiency",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animate individual skill icons
gsap.from(".skillContainer .col", {
    opacity: 0,
    scale: 0.5,
    stagger: 0.2,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".skillContainer",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animate each element inside the benefits section (workingBenefit)
gsap.from(".workingBenefit *, .workingBenefit", {
    opacity: 0,
    y: -100,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".workingBenefit *, .workingBenefit",
        start: "top 80%",
        toggleActions: "play none none none",
        
    }
});

// Animate project showcase
gsap.from(".projectShowcase h1", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".projectShowcase h1",
        start: "top 80%",
        scrub: true, 
        toggleActions: "play none none none"
    }
});

gsap.from(".projectContainer", {
    opacity: 0,
    x: -100,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".projects",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});