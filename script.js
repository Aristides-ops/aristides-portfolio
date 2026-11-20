
document.addEventListener("DOMContentLoaded", () => {
    // =====================================
    // IDIOMAS PT / EN
    // =====================================

    const languageButtons = document.querySelectorAll(".lang-btn");
    const translatableElements = document.querySelectorAll("[data-pt][data-en]");

    function changeLanguage(language) {
        document.documentElement.lang = language;

        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${language}`);

            if (translation !== null) {
                // Preserva elementos internos, como spans e ícones.
                if (element.children.length === 0) {
                    element.textContent = translation;
                }
            }
        });

        // Atualiza os botões do idioma.
        languageButtons.forEach(button => {
            const isActive = button.dataset.lang === language;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        // Atualiza atributos aria-label quando existirem.
        document.querySelectorAll("[data-pt-aria-label][data-en-aria-label]")
            .forEach(element => {
                element.setAttribute(
                    "aria-label",
                    element.getAttribute(`data-${language}-aria-label`)
                );
            });

        localStorage.setItem("site-language", language);
    }

    languageButtons.forEach(button => {
        button.addEventListener("click", () => {
            changeLanguage(button.dataset.lang);
        });
    });

    const savedLanguage = localStorage.getItem("site-language");
    changeLanguage(savedLanguage === "en" ? "en" : "pt");


    // =====================================
    // VÍDEOS DOS PROJETOS
    // =====================================

    const projectVideos = document.querySelectorAll(".project-video");

    projectVideos.forEach(video => {
        const card = video.closest(".motion-media");
        const playButton = card?.querySelector(".video-play");

        if (!playButton) return;

        function updateButton() {
            const isPlaying = !video.paused;

            playButton.classList.toggle("playing", isPlaying);
            playButton.textContent = isPlaying ? "Ⅱ" : "▶";
            playButton.setAttribute(
                "aria-label",
                isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"
            );
        }

        playButton.addEventListener("click", async () => {
            if (video.paused) {
                // Evita reproduzir vários vídeos ao mesmo tempo.
                projectVideos.forEach(otherVideo => {
                    if (otherVideo !== video) {
                        otherVideo.pause();
                    }
                });

                try {
                    await video.play();
                } catch (error) {
                    console.error("Não foi possível reproduzir o vídeo:", error);
                }
            } else {
                video.pause();
            }

            updateButton();
        });

        video.addEventListener("play", updateButton);
        video.addEventListener("pause", updateButton);
        video.addEventListener("ended", updateButton);
    });


    // =====================================
    // ANIMAÇÕES DE ENTRADA
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-label, .section-title, .section-description, " +
        ".motion-card, .web-content, .web-visual, " +
        ".about-image, .about-content, .contact-section > *, " +
        ".footer-top, .footer-bottom"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            element.classList.add("motion-reveal");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });
    }


    // =====================================
    // NAVEGAÇÃO ATIVA
    // =====================================

    const sections = document.querySelectorAll(
        "#inicio, #motion, #web, #sobre, #contacto"
    );

    const navigationLinks = document.querySelectorAll(".menu-link");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;

                        navigationLinks.forEach(link => {
                            const isActive =
                                link.getAttribute("href") === `#${sectionId}`;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                threshold: 0.35
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    // =====================================
    // MENU MOBILE
    // =====================================

    const menu = document.querySelector(".menu");
    const menuToggle = document.querySelector(".menu-toggle");

    if (menu && menuToggle) {
        menuToggle.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("menu-open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navigationLinks.forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("menu-open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

});
