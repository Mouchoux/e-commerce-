document.addEventListener("DOMContentLoaded", function () {
  /****************************************
   * MENU MOBILE
   ****************************************/
  const menuBtn = document.querySelector(".menu-btn");
  const navMenu = document.querySelector("nav ul");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      menuBtn.classList.toggle("open");
    });
  }

  /****************************************
   * SLIDER PRINCIPAL
   ****************************************/
  const slider = document.querySelector(".slider");
  if (slider) {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentIndex = 0;
    const intervalTime = 5000;
    let slideInterval;
    let isHovering = false;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
      updateIndicators();
    }

    function updateIndicators() {
      const indicators = document.querySelectorAll(".indicator");
      if (indicators.length) {
        indicators.forEach((indicator, i) => {
          indicator.classList.toggle("active", i === currentIndex);
        });
      }
    }

    function changeSlide(step) {
      currentIndex = (currentIndex + step + slides.length) % slides.length;
      showSlide(currentIndex);
      resetInterval();
    }

    function autoSlide() {
      if (!isHovering) changeSlide(1);
    }

    function startAutoSlide() {
      stopAutoSlide();
      slideInterval = setInterval(autoSlide, intervalTime);
    }

    function stopAutoSlide() {
      clearInterval(slideInterval);
    }

    function resetInterval() {
      stopAutoSlide();
      startAutoSlide();
    }

    // Événements
    if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") changeSlide(-1);
      if (e.key === "ArrowRight") changeSlide(1);
    });

    slider.addEventListener("mouseenter", () => {
      isHovering = true;
      stopAutoSlide();
    });

    slider.addEventListener("mouseleave", () => {
      isHovering = false;
      startAutoSlide();
    });

    // Gestion du swipe mobile
    let touchStartX = 0,
      touchEndX = 0;

    slider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    slider.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) changeSlide(1);
        if (touchEndX > touchStartX + 50) changeSlide(-1);
      },
      { passive: true }
    );

    // Initialisation
    showSlide(currentIndex);
    startAutoSlide();
    window.addEventListener("beforeunload", stopAutoSlide);
  }

  /****************************************
   * CATALOGUE PRODUITS (NOUVEAU)
   ****************************************/
  function initProductCatalog() {
    // Fonction de défilement horizontal
    function scrollCategory(categoryId, scrollAmount) {
      const container = document.getElementById(`${categoryId}-products`);
      if (container) {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }

    // Animation des icônes panier
    document.querySelectorAll(".cart-icon").forEach((icon) => {
      icon.addEventListener("click", function () {
        this.style.transform = "scale(1.3)";
        setTimeout(() => (this.style.transform = "scale(1)"), 300);
        // Ici vous pouvez ajouter la logique pour ajouter au panier
        console.log("Produit ajouté au panier");
      });
    });

    // Gestion de la visibilité des flèches
    function checkScrollVisibility() {
      document.querySelectorAll(".products-wrapper").forEach((wrapper) => {
        const containerId = wrapper.id;
        const categoryId = containerId.split("-")[0];
        const prevBtn = document.querySelector(`#${categoryId} .prev-btn`);
        const nextBtn = document.querySelector(`#${categoryId} .next-btn`);

        if (prevBtn)
          prevBtn.style.display = wrapper.scrollLeft <= 0 ? "none" : "flex";
        if (nextBtn)
          nextBtn.style.display =
            wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth
              ? "none"
              : "flex";
      });
    }

    // Initialisation
    window.addEventListener("load", checkScrollVisibility);
    document.querySelectorAll(".products-wrapper").forEach((wrapper) => {
      wrapper.addEventListener("scroll", checkScrollVisibility);
    });

    // Gestion des clics sur les boutons de navigation
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const direction = this.classList.contains("prev-btn") ? -280 : 280;
        const categoryId = this.closest(".category-container").id;
        scrollCategory(categoryId, direction);
      });
    });
  }

  // Initialiser le catalogue si la section existe
  if (document.querySelector(".category-container")) {
    initProductCatalog();
  }
});
