# ⚒️ V. R. Forge — Cutelaria Artesanal

Site da **V. R. Forge**, o trabalho de um cuteleiro artesanal: vitrine das peças, apresentação do artesão e canal direto de encomendas pelo WhatsApp.

🔗 **No ar:** https://marcosconninck.github.io/

---

## 🧱 Como o projeto é feito

- **HTML, CSS e JavaScript puros** — sem frameworks e sem etapa de build.
- **Hospedagem:** GitHub Pages (gratuito). Todo `push` na branch `main` publica o site em 1–2 minutos.
- **Mobile-first:** pensado primeiro para o celular, que é por onde chega a maioria dos clientes (Instagram/WhatsApp).
- **Conteúdo separado do código:** as peças, fotos e contatos ficam em um único arquivo, [`assets/js/dados.js`](assets/js/dados.js).

### O que o site tem

| Seção | O que faz |
| --- | --- |
| **Início** | Apresentação com animação de brasas e atalhos para o acervo e para encomendar |
| **Acervo** | Galeria das peças. Ao tocar, abre a foto ampliada com navegação (setas, teclado ou deslizar o dedo) e o botão **"Quero uma peça como esta"**, que abre o WhatsApp com o nome da peça já escrito |
| **O Artesão** | Texto e fotos da oficina (no celular, uma faixa que se desliza para o lado; ao tocar, a foto amplia) |
| **Como encomendar** | O passo a passo da encomenda (no celular, em formato de linha do tempo) |
| **Contato** | WhatsApp e Instagram |
| **Botões flutuantes** | WhatsApp sempre à mão (some quando a seção de contato está na tela) e "voltar ao topo" no desktop |

Também inclui: favicon, imagem de prévia para links compartilhados (WhatsApp, Instagram, Facebook), menu que destaca a seção atual, acessibilidade por teclado e respeito à opção do sistema de "reduzir movimento".

---

## 📂 Estrutura de pastas

```
marcosconninck.github.io/
├── index.html              # A página (todas as seções)
├── README.md
├── .gitignore
│
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos (organizado por seções, com índice no topo)
│   ├── js/
│   │   ├── dados.js        # ⭐ CONTEÚDO: WhatsApp, Instagram, peças e fotos
│   │   └── main.js         # Comportamento: menu, galeria, lightbox, animações
│   └── img/
│       ├── pecas/          # Fotos das facas (faca-01.jpg, faca-06b.jpg…)
│       ├── artesao/        # Fotos do artesão na oficina
│       ├── logo/           # logo.png (completo) e emblema.png (só o símbolo)
│       ├── icons/          # Favicon e ícones de atalho do celular
│       └── og-image.jpg    # Imagem que aparece ao compartilhar o link
│
└── _fontes/
    └── logo/               # Logos originais em alta resolução (não são publicados)
```

> A pasta `_fontes/` começa com `_` de propósito: o GitHub Pages **não publica** pastas assim. Ela guarda os arquivos originais do logo (7618×10000 px) para impressão ou para gerar novas versões, sem pesar no site.

---

## ✏️ Tarefas do dia a dia

### Adicionar uma faca nova

1. Salve a foto em `assets/img/pecas/` (ex.: `faca-07.jpg`). Para o site ficar leve, use fotos com **no máximo ~1280 px** no lado maior (fotos de celular enviadas pelo WhatsApp já vêm nesse tamanho).
2. Abra `assets/js/dados.js` e copie um bloco de peça dentro de `pecas`:

```js
{
  nome: "Lâmina VII",
  descricao: "Aço 1070, cabo em jacarandá, lâmina de 15 cm.",
  status: "disponivel",
  fotos: ["assets/img/pecas/faca-07.jpg"],
},
```

- `descricao` e `status` são opcionais (podem ficar `""`).
- `status` aceita `"disponivel"`, `"vendida"` ou `"encomenda"` e aparece como um selo no card.
- Para várias fotos da mesma peça, liste todas em `fotos` — a primeira é a capa.
- A ordem no arquivo é a ordem no site.

### Trocar o número do WhatsApp ou o Instagram

Em `assets/js/dados.js`, altere `whatsapp` (só dígitos: `55` + DDD sem o zero + número) e `instagram`.
Os links que já estão escritos no `index.html` servem só como reserva caso o JavaScript não carregue — vale atualizá-los também.

### Ver o site no computador antes de publicar

Basta abrir o `index.html` com dois cliques no navegador. Se preferir um servidor local:

```bash
python -m http.server 8000
```

e acesse http://localhost:8000.

### Publicar

Pelo **GitHub Desktop**: revise as alterações na aba *Changes* → escreva um resumo → **Commit to main** → **Push origin**. Em 1–2 minutos o site está atualizado.

---

## 🎯 Plano de ação

### ✅ Fase 1 — Landing page (concluída)

- [x] Landing page estática, rústica e responsiva (mobile-first).

### ✅ Fase 2 — Vitrine e encomendas (concluída)

- [x] Reorganização de pastas e otimização das imagens (logo de ~870 KB → ~60 KB).
- [x] Conteúdo separado em `dados.js` para facilitar a manutenção.
- [x] Botão de WhatsApp por peça com mensagem pré-formatada.
- [x] Seções "Como encomendar" e "Contato"; botões flutuantes.
- [x] Favicon, prévia de link compartilhado (Open Graph) e meta description.

### 🔜 Fase 3 — Conteúdo

- [ ] Preencher `descricao` e `status` de cada peça (aço, cabo, medidas, disponível/vendida).
- [ ] Mais fotos por peça (detalhes do cabo, da lâmina, da bainha).
- [ ] Domínio próprio (ex.: `vrforge.com.br`) apontando para o GitHub Pages.

### 💭 Futuro — Só quando houver necessidade real

A ideia original de migrar para **Django + PostgreSQL + Cloudinary** (com painel administrativo e pagamento via Mercado Pago) continua possível, mas só compensa quando o volume justificar. Sinais de que chegou a hora:

- o artesão precisa cadastrar peças sozinho com frequência e editar `dados.js` virou um obstáculo;
- há estoque/pedidos para controlar;
- surge demanda real por pagamento online.

Até lá, a solução atual é mais rápida (o site abre na hora, sem servidor "hibernando"), gratuita e sem manutenção de servidor. Caminhos intermediários, se for preciso que o artesão edite sozinho: um CMS sem servidor (ex.: Decap CMS) ou uma planilha do Google como fonte das peças.

---

## 🤝 Sobre

Desenvolvido como vitrine digital para um artesão cuteleiro e como projeto de portfólio.

**Tecnologias:** HTML · CSS · JavaScript · GitHub Pages
