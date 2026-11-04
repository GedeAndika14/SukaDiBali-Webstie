
/* =========================================================
   SUKA DI BALI
   TOUR & TRANSPORT
   Main JavaScript
========================================================= */


/* =========================================================
   01. CONFIGURATION
========================================================= */

// Ganti dengan nomor WhatsApp bisnis.
// Gunakan format internasional tanpa +, spasi, atau tanda -.
// Contoh: 6281234567890

const WHATSAPP_NUMBER = "6281234567890";

const MOBILE_BREAKPOINT = 900;


/* =========================================================
   02. DOM ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const whatsappLinks = document.querySelectorAll(".whatsapp-direct");
const yearElement = document.getElementById("year");


/* =========================================================
   03. WHATSAPP FUNCTION
========================================================= */

function openWhatsApp(message) {

    const phone = WHATSAPP_NUMBER.replace(/\D/g, "");

    if (!phone || phone.length < 8) {
        alert("Please configure your WhatsApp number first.");
        return;
    }

    const defaultMessage =
        "Hello Suka Di Bali! I would like to ask about your services.";

    const finalMessage = message || defaultMessage;

    const whatsappURL =
        `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;

    // Open WhatsApp in a new tab.
    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );
}


/* =========================================================
   04. WHATSAPP BUTTON EVENTS
========================================================= */

whatsappLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const message = this.dataset.message ||
            "Hello Suka Di Bali! I would like to ask about your services.";

        openWhatsApp(message);

    });

});


/* =========================================================
   05. MOBILE NAVIGATION
========================================================= */

function openMenu() {

    if (!menuToggle || !navLinks) return;

    navLinks.classList.add("active");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");

    menuToggle.textContent = "✕";
}


function closeMenu() {

    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");

    menuToggle.textContent = "☰";
}


function toggleMenu() {

    if (!navLinks) return;

    const isOpen = navLinks.classList.contains("active");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }

}


// Hamburger button.
if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", toggleMenu);


    // Close menu after selecting a navigation link.
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    // Close menu when clicking outside.
    document.addEventListener("click", function(event) {

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }

    });


    // Close menu using Escape key.
    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    // Close mobile menu when returning to desktop layout.
    window.addEventListener("resize", function() {

        if (window.innerWidth > MOBILE_BREAKPOINT) {
            closeMenu();
        }

    });

}


/* =========================================================
   06. SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetID = this.getAttribute("href");

        // Ignore empty anchors such as href="#".
        if (!targetID || targetID === "#") return;

        const targetElement = document.querySelector(targetID);

        if (!targetElement) return;

        event.preventDefault();

        closeMenu();

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   07. FAQ
========================================================= */

// Native HTML <details> already supports opening and closing.
// This code makes the FAQ behave like an accordion:
// only one question remains open at a time.

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    item.addEventListener("toggle", function() {

        if (!this.open) return;

        faqItems.forEach(otherItem => {

            if (otherItem !== this) {
                otherItem.open = false;
            }

        });

    });

});


/* =========================================================
   08. COPYRIGHT YEAR
========================================================= */

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =========================================================
   09. IMAGE ERROR HANDLING
========================================================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", function() {

        this.classList.add("image-error");

        this.alt = this.alt || "Image unavailable";

    });

});


/* =========================================================
   10. ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");

const navigationItems = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window && sections.length) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const currentID = entry.target.id;

                navigationItems.forEach(link => {

                    const isActive =
                        link.getAttribute("href") === `#${currentID}`;

                    if (isActive) {
                        link.classList.add("active-link");
                    } else {
                        link.classList.remove("active-link");
                    }

                });

            });

        },
        {
            root: null,
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* =========================================================
   11. PAGE READY
========================================================= */

document.documentElement.classList.add("js-enabled");

// =====================================
// BACKGROUND MUSIC - AUTO PLAY
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const backgroundMusic = document.getElementById("backgroundMusic");
    const musicToggle = document.getElementById("musicToggle");
    const musicIcon = musicToggle?.querySelector(".music-icon");

    if (!backgroundMusic || !musicToggle || !musicIcon) return;

    backgroundMusic.volume = 0.3;

    let musicStarted = false;

    function updateMusicButton(isPlaying) {
        musicToggle.classList.toggle("playing", isPlaying);

        musicIcon.textContent = isPlaying ? "Ⅱ" : "♫";

        musicToggle.setAttribute(
            "aria-label",
            isPlaying ? "Jeda musik" : "Putar musik"
        );
    }

    async function playMusic() {
        try {
            await backgroundMusic.play();

            musicStarted = true;
            updateMusicButton(true);

            return true;

        } catch (error) {
            console.log("Autoplay diblokir browser:", error);
            updateMusicButton(false);

            return false;
        }
    }

    // Coba putar otomatis ketika website dibuka
    playMusic();

    // Jika autoplay diblokir, mulai musik saat interaksi pertama
    function startMusicOnInteraction() {
        if (!musicStarted) {
            playMusic();
        }

        document.removeEventListener("click", startMusicOnInteraction);
        document.removeEventListener("touchstart", startMusicOnInteraction);
        document.removeEventListener("keydown", startMusicOnInteraction);
    }

    document.addEventListener("click", startMusicOnInteraction);
    document.addEventListener("touchstart", startMusicOnInteraction);
    document.addEventListener("keydown", startMusicOnInteraction);

    // Tombol Play / Pause
    musicToggle.addEventListener("click", async function () {

        if (backgroundMusic.paused) {
            await playMusic();
        } else {
            backgroundMusic.pause();
            musicStarted = false;
            updateMusicButton(false);
        }
    });

    // Jika musik selesai atau mengalami error
    backgroundMusic.addEventListener("ended", function () {
        updateMusicButton(false);
    });

    backgroundMusic.addEventListener("error", function () {
        console.error("File musik gagal dimuat. Periksa lokasi file MP3.");
        updateMusicButton(false);
    });

});