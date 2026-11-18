// ============================================================
//  V. R. FORGE | DADOS.JS
//  Conteúdo editável do site: contatos, peças do acervo e fotos
//  do artesão. Para incluir/alterar uma faca, mexa só aqui.
// ============================================================

window.VRFORGE = {
  // Número no formato internacional, só dígitos: 55 + DDD + número
  // (sem o 0 do DDD).
  whatsapp: "5543998314071",
  instagram: "https://www.instagram.com/v.r.forge/",

  // ── ACERVO ──────────────────────────────────────────────────
  // nome      → aparece no card e na mensagem do WhatsApp
  // descricao → opcional; aparece ao abrir a peça (aço, cabo, medidas…)
  // status    → opcional: "disponivel", "vendida" ou "encomenda"
  // fotos     → a primeira é a capa; as demais aparecem ao abrir a peça
  pecas: [
    {
      nome: "Lâmina I",
      descricao: "",
      status: "",
      fotos: ["assets/img/pecas/faca-01.jpg"],
    },
    {
      nome: "Lâmina II",
      descricao: "",
      status: "",
      fotos: ["assets/img/pecas/faca-02.jpg"],
    },
    {
      nome: "Lâmina III",
      descricao: "",
      status: "",
      fotos: ["assets/img/pecas/faca-03.jpg"],
    },
    {
      nome: "Lâmina IV",
      descricao: "",
      status: "",
      fotos: ["assets/img/pecas/faca-04.jpg"],
    },
    {
      nome: "Lâmina V",
      descricao: "",
      status: "",
      fotos: ["assets/img/pecas/faca-05.jpg"],
    },
    {
      nome: "Lâmina VI",
      descricao: "",
      status: "",
      fotos: [
        "assets/img/pecas/faca-06.jpg",
        "assets/img/pecas/faca-06b.jpg",
      ],
    },
  ],

  // ── O ARTESÃO ───────────────────────────────────────────────
  // (artesao-04, com as faíscas, também é a foto de fundo do topo do site)
  artesao: [
    { src: "assets/img/artesao/artesao-03.jpg", alt: "Artesão conferindo o alinhamento de uma lâmina" },
    { src: "assets/img/artesao/artesao-02.jpg", alt: "Artesão limando uma lâmina na bancada da oficina" },
    { src: "assets/img/artesao/artesao-01.jpg", alt: "Artesão trabalhando uma lâmina presa na morsa" },
    { src: "assets/img/artesao/artesao-04.jpg", alt: "Artesão desbastando uma lâmina na lixadeira de cinta, entre faíscas" },
  ],
};
