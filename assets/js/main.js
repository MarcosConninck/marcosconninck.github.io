// ============================================================
//  V. R. FORGE | MAIN.JS
//  - Remoção do estado de loading
//  - Partículas de brasa (ember canvas)
//  - Header que ganha fundo ao rolar
//  - Menu hamburger mobile
//  - Scroll reveal progressivo
//  - Galeria dinâmica com lightbox
//  - Seção O Artesão com imagens dinâmicas
//  - Paralaxe sutil no fundo
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // ─── 1. LOADING REVEAL ────────────────────────────────────
  setTimeout(() => {
    document.body.classList.remove("is-loading");
    // Força reveal dos elementos hero após loading
    document
      .querySelectorAll(".hero .reveal-up, .hero .reveal-fade")
      .forEach((el) => el.classList.add("is-visible"));
  }, 300);

  // ─── 2. EMBER CANVAS (faíscas de brasa) ───────────────────
  const canvas = document.getElementById("emberCanvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  let embers = [];
  let W, H;

  function resizeCanvas() {
    if (!canvas) return;
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createEmber() {
    return {
      x: randomRange(0, W),
      y: randomRange(H * 0.6, H), // nascem na parte inferior
      size: randomRange(0.8, 2.2),
      alpha: randomRange(0.3, 0.9),
      vx: randomRange(-0.4, 0.4),
      vy: randomRange(-0.8, -1.8), // sobem
      life: 1,
      decay: randomRange(0.003, 0.008),
      hue: randomRange(0, 25), // laranja a vermelho
    };
  }

  // Inicializa pool de brasas
  for (let i = 0; i < 40; i++) {
    const e = createEmber();
    e.y = randomRange(0, H); // distribuição inicial
    embers.push(e);
  }

  function drawEmbers() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    embers.forEach((e, i) => {
      e.x += e.vx + Math.sin(Date.now() * 0.001 + i) * 0.2;
      e.y += e.vy;
      e.life -= e.decay;
      e.alpha = e.life * 0.9;

      if (e.life <= 0) {
        embers[i] = createEmber();
        return;
      }

      ctx.save();
      ctx.globalAlpha = e.alpha * 0.55;
      ctx.fillStyle = `hsl(${e.hue}, 95%, 55%)`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${e.hue}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(drawEmbers);
  }
  drawEmbers();

  // ─── 3. HEADER SCROLL ─────────────────────────────────────
  const header = document.getElementById("siteHeader");

  window.addEventListener(
    "scroll",
    () => {
      if (!header) return;
      if (window.pageYOffset > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    },
    { passive: true },
  );

  // ─── 4. HAMBURGER MENU ────────────────────────────────────
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      const open = mainNav.classList.toggle("is-open");
      hamburger.classList.toggle("is-active", open);
      document.body.style.overflow = open ? "hidden" : "";
    });

    // Fecha ao clicar num link
    mainNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        hamburger.classList.remove("is-active");
        document.body.style.overflow = "";
      });
    });
  }

  // ─── 5. PARALAXE NO REACTIVE BG ───────────────────────────
  const bgLogos = document.querySelectorAll(".bg-logo");

  window.addEventListener(
    "scroll",
    () => {
      const scrollPos = window.pageYOffset;
      bgLogos.forEach((logo, i) => {
        const speed = i === 0 ? 0.12 : 0.05;
        const direction = i === 0 ? -1 : 1;
        logo.style.transform = `translateY(${scrollPos * speed * direction}px)`;
      });
    },
    { passive: true },
  );

  // ─── 6. SCROLL REVEAL ─────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Pequeno delay escalonado por posição no DOM
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, idx * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal-up, .reveal-fade").forEach((el) => {
    revealObserver.observe(el);
  });

  // ─── 7. GALERIA ───────────────────────────────────────────
  const knifeData = [
    { src: "assets/images/gallery/faca1.jpeg", label: "Lâmina I" },
    { src: "assets/images/gallery/faca2.jpeg", label: "Lâmina II" },
    { src: "assets/images/gallery/faca3.jpeg", label: "Lâmina III" },
    { src: "assets/images/gallery/faca4.jpeg", label: "Lâmina IV" },
    { src: "assets/images/gallery/faca5.jpeg", label: "Lâmina V" },
    { src: "assets/images/gallery/faca6.jpeg", label: "Lâmina VI" },
  ];

  const galleryGrid = document.getElementById("galleryGrid");

  if (galleryGrid) {
    knifeData.forEach((knife, i) => {
      const card = document.createElement("div");
      card.classList.add("knife-card", "reveal-up");
      card.style.transitionDelay = `${i * 80}ms`;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Abrir ${knife.label}`);

      const img = document.createElement("img");
      img.src = knife.src;
      img.alt = knife.label;
      img.loading = "lazy";

      const overlay = document.createElement("div");
      overlay.classList.add("knife-card-overlay");

      const p = document.createElement("p");
      p.textContent = knife.label;
      overlay.appendChild(p);

      card.appendChild(img);
      card.appendChild(overlay);
      galleryGrid.appendChild(card);

      // Revelar cards via IntersectionObserver
      revealObserver.observe(card);

      // Abrir lightbox
      card.addEventListener("click", () => openLightbox(i));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openLightbox(i);
      });
    });
  }

  // ─── 8. LIGHTBOX ──────────────────────────────────────────
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let currentIndex = 0;

  function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    const knife = knifeData[currentIndex];
    lightboxImg.src = knife.src;
    lightboxImg.alt = knife.label;
    lightboxCaption.textContent = knife.label;
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + knifeData.length) % knifeData.length;
      updateLightbox();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % knifeData.length;
      updateLightbox();
    });
  }

  // Fecha ao clicar fora da imagem
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Teclas de navegação
  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + knifeData.length) % knifeData.length;
      updateLightbox();
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % knifeData.length;
      updateLightbox();
    }
  });

  // ─── 9. SEÇÃO O ARTESÃO ───────────────────────────────────
  const workingData = [
    // {
    //   src: "assets/images/working/working1.jpeg",
    //   alt: "Artesão na forja — etapa 1",
    // },
    {
      src: "assets/images/working/working2.jpeg",
      alt: "Artesão na forja — etapa 2",
    },
    {
      src: "assets/images/working/working3.jpeg",
      alt: "Artesão na forja — etapa 3",
    },
    {
      src: "assets/images/working/working4.jpeg",
      alt: "Artesão na forja — etapa 4",
    },
  ];

  const artisanMedia = document.getElementById("artisanMedia");

  if (artisanMedia) {
    workingData.forEach((item) => {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt;
      img.loading = "lazy";
      artisanMedia.appendChild(img);
    });
  }

  // ─── 10. REVEAL ARTISAN TEXT ───────────────────────────────
  document
    .querySelectorAll(
      ".artisan-text .section-label, .artisan-text .section-title, .artisan-text p, .artisan-text a",
    )
    .forEach((el, i) => {
      el.classList.add("reveal-fade");
      el.style.transitionDelay = `${i * 120}ms`;
      revealObserver.observe(el);
    });
});
