// ============================================================
//  V. R. FORGE | MAIN.JS
//  O conteúdo (peças, fotos, contatos) fica em dados.js.
//
//  1. Utilitários e links de contato
//  2. Header (fundo ao rolar), menu mobile e link ativo
//  3. Botão "voltar ao topo"
//  4. Animação de entrada (scroll reveal)
//  5. Acervo (cards gerados a partir de dados.js)
//  6. Fotos do artesão
//  7. Lightbox (teclado, setas e deslizar no celular)
//  8. Efeitos: brasas e paralaxe do logo
// ============================================================

(function () {
  "use strict";

  const DADOS = window.VRFORGE || { pecas: [], artesao: [] };
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ─── 1. UTILITÁRIOS E LINKS DE CONTATO ─────────────────────
  function linkWhatsApp(mensagem) {
    const base = "https://wa.me/" + DADOS.whatsapp;
    return mensagem ? base + "?text=" + encodeURIComponent(mensagem) : base;
  }

  // Todo link com data-whatsapp="mensagem" recebe o número de dados.js
  $$("[data-whatsapp]").forEach((a) => {
    a.href = linkWhatsApp(a.dataset.whatsapp);
  });
  $$("[data-instagram]").forEach((a) => {
    if (DADOS.instagram) a.href = DADOS.instagram;
  });

  const ano = $("#ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // Trava/destrava a rolagem da página (menu e lightbox abertos)
  function travarRolagem(travar) {
    document.documentElement.classList.toggle("no-scroll", travar);
  }

  // ─── 2. HEADER, MENU MOBILE E LINK ATIVO ───────────────────
  const header = $("#siteHeader");
  const hamburger = $("#hamburger");
  const nav = $("#mainNav");

  function aoRolar() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    backToTop.classList.toggle("is-visible", y > window.innerHeight * 0.8);
    if (!reduzMovimento) paralaxe(y);
  }

  function abrirMenu(abrir) {
    nav.classList.toggle("is-open", abrir);
    hamburger.classList.toggle("is-active", abrir);
    header.classList.toggle("menu-open", abrir);
    hamburger.setAttribute("aria-expanded", String(abrir));
    hamburger.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
    travarRolagem(abrir);
  }

  hamburger.addEventListener("click", () => {
    abrirMenu(!nav.classList.contains("is-open"));
  });

  // Fecha o menu ao clicar em qualquer link dele
  $$("a", nav).forEach((link) => link.addEventListener("click", () => abrirMenu(false)));

  // Fecha o menu se a tela crescer para desktop
  window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => {
    if (e.matches) abrirMenu(false);
  });

  // Destaca no menu a seção que está na tela
  const navLinks = $$(".nav-link");
  const secoes = navLinks.map((l) => $(l.getAttribute("href"))).filter(Boolean);

  const secaoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  secoes.forEach((s) => secaoObserver.observe(s));

  // Limpa o destaque quando volta ao topo (hero)
  const hero = $("#inicio");
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) navLinks.forEach((l) => l.classList.remove("is-active"));
    },
    { rootMargin: "-45% 0px -50% 0px" },
  ).observe(hero);

  // ─── 3. BOTÕES FLUTUANTES ──────────────────────────────────
  const backToTop = $("#backToTop");

  // Esconde o WhatsApp flutuante quando a seção de contato (que já tem o botão) está visível
  const fabWhats = $(".fab-whatsapp");
  const contato = $("#contato");
  if (fabWhats && contato) {
    new IntersectionObserver(([entry]) => fabWhats.classList.toggle("is-hidden", entry.isIntersecting), {
      threshold: 0.25,
    }).observe(contato);
  }

  // ─── 4. SCROLL REVEAL ──────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      let atraso = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        // Pequeno atraso escalonado entre itens que aparecem juntos
        entry.target.style.transitionDelay = atraso + "ms";
        entry.target.classList.add("is-visible");
        atraso += 90;
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  function observarReveal(el) {
    if (reduzMovimento) el.classList.add("is-visible");
    else revealObserver.observe(el);
  }

  // ─── 5. ACERVO ─────────────────────────────────────────────
  const STATUS = { disponivel: "Disponível", vendida: "Vendida", encomenda: "Sob encomenda" };

  // Lista "achatada" de fotos para o lightbox navegar
  const fotosAcervo = [];
  DADOS.pecas.forEach((peca) => {
    peca.fotos.forEach((src, i) => {
      fotosAcervo.push({
        src,
        titulo: peca.nome,
        alt: peca.nome + (peca.fotos.length > 1 ? " — foto " + (i + 1) : ""),
        descricao: peca.descricao,
        status: peca.status,
        mensagem: "Olá! Vi a peça \"" + peca.nome + "\" no site da V. R. Forge e gostaria de saber mais.",
      });
    });
  });

  const galleryGrid = $("#galleryGrid");
  let indiceFoto = 0;

  DADOS.pecas.forEach((peca) => {
    const primeiraFoto = indiceFoto;
    indiceFoto += peca.fotos.length;

    const card = document.createElement("button");
    card.type = "button";
    card.className = "knife-card reveal";
    card.setAttribute("aria-label", "Ver " + peca.nome);

    const img = document.createElement("img");
    img.src = peca.fotos[0];
    img.alt = peca.nome;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 960;
    img.height = 1280;
    card.appendChild(img);

    if (STATUS[peca.status]) {
      const badge = document.createElement("span");
      badge.className = "badge badge-" + peca.status;
      badge.textContent = STATUS[peca.status];
      card.appendChild(badge);
    }

    const overlay = document.createElement("span");
    overlay.className = "knife-card-overlay";
    overlay.innerHTML = '<span class="knife-card-name"></span>';
    overlay.firstChild.textContent = peca.nome;
    if (peca.fotos.length > 1) {
      const mais = document.createElement("span");
      mais.className = "knife-card-more";
      mais.textContent = peca.fotos.length + " fotos";
      overlay.appendChild(mais);
    }
    card.appendChild(overlay);

    card.addEventListener("click", () => abrirLightbox(fotosAcervo, primeiraFoto, card));
    galleryGrid.appendChild(card);
    observarReveal(card);
  });

  // ─── 6. FOTOS DO ARTESÃO ───────────────────────────────────
  const artisanMedia = $("#artisanMedia");
  const fotosArtesao = DADOS.artesao.map((f) => ({ src: f.src, alt: f.alt, titulo: "O artesão" }));

  fotosArtesao.forEach((foto, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "artisan-photo"; // a animação fica no contêiner (no celular é uma faixa horizontal)
    btn.setAttribute("aria-label", "Ampliar foto: " + foto.alt);

    const img = document.createElement("img");
    img.src = foto.src;
    img.alt = foto.alt;
    img.loading = "lazy";
    img.decoding = "async";
    btn.appendChild(img);

    btn.addEventListener("click", () => abrirLightbox(fotosArtesao, i, btn));
    artisanMedia.appendChild(btn);
  });

  // Demais elementos com animação de entrada
  $$(".reveal").forEach((el) => {
    if (!el.classList.contains("knife-card") && !el.classList.contains("artisan-photo")) {
      // O conteúdo do hero aparece logo ao carregar
      if (el.closest(".hero")) {
        requestAnimationFrame(() => setTimeout(() => el.classList.add("is-visible"), 100));
      } else {
        observarReveal(el);
      }
    }
  });

  // ─── 7. LIGHTBOX ───────────────────────────────────────────
  const lb = $("#lightbox");
  const lbImg = $("#lightboxImg");
  const lbTitle = $("#lightboxTitle");
  const lbCounter = $("#lightboxCounter");
  const lbDesc = $("#lightboxDesc");
  const lbOrder = $("#lightboxOrder");
  const lbPrev = $("#lightboxPrev");
  const lbNext = $("#lightboxNext");
  const lbClose = $("#lightboxClose");

  let lista = [];
  let atual = 0;
  let origemFoco = null;

  function mostrar(i) {
    atual = (i + lista.length) % lista.length;
    const foto = lista[atual];
    lbImg.src = foto.src;
    lbImg.alt = foto.alt || foto.titulo;

    const status = STATUS[foto.status];
    lbTitle.textContent = foto.titulo + (status ? " · " + status : "");
    lbCounter.textContent = lista.length > 1 ? atual + 1 + " / " + lista.length : "";

    lbDesc.textContent = foto.descricao || "";
    lbDesc.hidden = !foto.descricao;

    lbOrder.hidden = !foto.mensagem;
    if (foto.mensagem) lbOrder.href = linkWhatsApp(foto.mensagem);

    // Pré-carrega a próxima foto
    if (lista.length > 1) new Image().src = lista[(atual + 1) % lista.length].src;
  }

  function abrirLightbox(fotos, indice, origem) {
    lista = fotos;
    origemFoco = origem || null;
    const variasFotos = fotos.length > 1;
    lbPrev.hidden = !variasFotos;
    lbNext.hidden = !variasFotos;
    mostrar(indice);
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add("is-open"));
    travarRolagem(true);
    lbClose.focus();
  }

  function fecharLightbox() {
    lb.classList.remove("is-open");
    travarRolagem(false);
    setTimeout(() => {
      lb.hidden = true;
      lbImg.removeAttribute("src");
    }, 250);
    if (origemFoco) origemFoco.focus({ preventScroll: true });
  }

  lbClose.addEventListener("click", fecharLightbox);
  lbPrev.addEventListener("click", () => mostrar(atual - 1));
  lbNext.addEventListener("click", () => mostrar(atual + 1));

  // Clique fora da foto fecha
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.classList.contains("lb-figure")) fecharLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      abrirMenu(false);
      hamburger.focus();
      return;
    }
    if (lb.hidden) return;
    if (e.key === "Escape") fecharLightbox();
    if (e.key === "ArrowLeft" && lista.length > 1) mostrar(atual - 1);
    if (e.key === "ArrowRight" && lista.length > 1) mostrar(atual + 1);
    // Mantém o foco do teclado dentro do lightbox
    if (e.key === "Tab") {
      const focaveis = $$("button:not([hidden]), a:not([hidden])", lb);
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }
  });

  // Deslizar o dedo para trocar de foto no celular
  let toqueX = null;
  lbImg.addEventListener("touchstart", (e) => (toqueX = e.touches[0].clientX), { passive: true });
  lbImg.addEventListener(
    "touchend",
    (e) => {
      if (toqueX === null || lista.length < 2) return;
      const dx = e.changedTouches[0].clientX - toqueX;
      if (Math.abs(dx) > 50) mostrar(atual + (dx < 0 ? 1 : -1));
      toqueX = null;
    },
    { passive: true },
  );

  // ─── 8. EFEITOS: BRASAS E PARALAXE ─────────────────────────
  const bgLogos = $$(".bg-logo");

  function paralaxe(y) {
    bgLogos.forEach((logo, i) => {
      const v = i === 0 ? -0.12 : 0.05;
      logo.style.transform = "translate3d(0," + y * v + "px,0)";
    });
  }

  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  const canvas = $("#emberCanvas");
  if (canvas && !reduzMovimento) {
    const ctx = canvas.getContext("2d");
    const total = window.innerWidth < 600 ? 22 : 40;
    let W = 0;
    let H = 0;
    let rodando = true;
    const brasas = [];

    const rand = (min, max) => Math.random() * (max - min) + min;

    function redimensionar() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function novaBrasa(espalhar) {
      return {
        x: rand(0, W),
        y: espalhar ? rand(0, H) : rand(H * 0.7, H + 10),
        r: rand(0.8, 2.2),
        vx: rand(-0.35, 0.35),
        vy: rand(-0.7, -1.6),
        vida: 1,
        decai: rand(0.003, 0.008),
        hue: rand(5, 30),
        fase: rand(0, Math.PI * 2),
      };
    }

    redimensionar();
    window.addEventListener("resize", redimensionar);
    for (let i = 0; i < total; i++) brasas.push(novaBrasa(true));

    function desenhar(t) {
      if (!rodando) return;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < brasas.length; i++) {
        const b = brasas[i];
        b.x += b.vx + Math.sin(t * 0.001 + b.fase) * 0.2;
        b.y += b.vy;
        b.vida -= b.decai;
        if (b.vida <= 0 || b.y < -10) {
          brasas[i] = novaBrasa(false);
          continue;
        }
        const a = b.vida * 0.5;
        // brilho
        ctx.fillStyle = "hsla(" + b.hue + ",100%,50%," + a * 0.25 + ")";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 4, 0, Math.PI * 2);
        ctx.fill();
        // núcleo
        ctx.fillStyle = "hsla(" + b.hue + ",95%,60%," + a + ")";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(desenhar);
    }
    requestAnimationFrame(desenhar);

    // Pausa a animação quando a aba não está visível (economiza bateria)
    document.addEventListener("visibilitychange", () => {
      const visivel = document.visibilityState === "visible";
      if (visivel && !rodando) {
        rodando = true;
        requestAnimationFrame(desenhar);
      } else if (!visivel) {
        rodando = false;
      }
    });
  }
})();
