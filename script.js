document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    console.log("GSAP Premium Loaded");

    // --- 1. HERO ENTRANCE ---
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    heroTl
        .from(".hero-bg-image img", {
            scale: 1.4,
            opacity: 0,
            duration: 1.8,
            ease: "expo.out"
        })
        .from(".huge-text", {
            y: 150,
            opacity: 0,
            duration: 1.5,
            stagger: 0.15,
            skewY: 5
        }, "-=1.2")
        .from(".nav-link", {
            y: -20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05
        }, "-=1")
        .from([".hero-info", ".hero-text"], {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1
        }, "-=0.8");

    // --- 2. GENERAL SECTION TITLES & TEXT ---
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
        if (section.id === 'hero') return;

        // Titles
        const title = section.querySelector(".section-title");
        const hugeTitle = section.querySelector(".huge-text-team, .huge-contact-title");
        const number = section.querySelector(".section-number");

        // Trigger generic elements when section enters viewport
        // Note: Due to sticky stacking, "entering" often means "being revealed" or "scrolling into view"
        // We use a safe offset of start: "top 75%"

        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                x: -30,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        }

        if (hugeTitle) {
            gsap.from(hugeTitle, {
                scrollTrigger: {
                    trigger: hugeTitle,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                skewY: 2,
                ease: "power3.out"
            });
        }

        if (number) {
            gsap.from(number, {
                scrollTrigger: {
                    trigger: number,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            });
        }

        // Stagger paragraphs and lists
        const textElements = section.querySelectorAll("p, li, .box-number-text, .member");
        if (textElements.length > 0) {
            gsap.from(textElements, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.out"
            });
        }

        // Image Reveal (Parallax/Scale)
        const images = section.querySelectorAll("img:not(.hero-bg-image img)");
        if (images.length > 0) {
            images.forEach(img => {
                gsap.fromTo(img,
                    { scale: 1.1, filter: "grayscale(100%) brightness(0.8)" },
                    {
                        scale: 1,
                        filter: "grayscale(100%) brightness(1)",
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: img,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }
    });

    // --- 3. SPECIFIC SECTION TWEAKS ---

    // Team: Animate the divider line
    const teamLine = document.querySelector(".number-line");
    if (teamLine) {
        gsap.from(teamLine, {
            scrollTrigger: {
                trigger: ".section-team",
                start: "top 60%"
            },
            width: "0%",
            duration: 1.2,
            ease: "power3.inOut"
        });
    }

    // Contact: Image Slide In
    const contactImg = document.querySelector(".contact-image-wrapper img");
    if (contactImg) {
        gsap.from(contactImg, {
            scrollTrigger: {
                trigger: ".section-contact",
                start: "top 60%"
            },
            xPercent: 20,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });
    }

    // Parallax Effect on scroll
    // Only apply a subtle parallax to images to make them feel "floating" inside their sticky containers
    sections.forEach(section => {
        const imgs = section.querySelectorAll("img");
        if (imgs.length) {
            gsap.to(imgs, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    });

});
