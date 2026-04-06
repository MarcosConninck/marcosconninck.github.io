# ⚒️ V. R. Forge — Portfólio e E-commerce de Cutelaria Artesanal

Plataforma online da **V. R. Forge**, o trabalho de um ferreiro artesanal. O projeto iniciou como uma Landing Page mobile-first e está evoluindo para um catálogo dinâmico com painel administrativo completo.

---

## 🧱 Arquitetura do Projeto

Este projeto adota o padrão **MTV (Model-Template-View)**, arquitetura nativa do Django e a escolha mais adequada para este tipo de aplicação.

| Camada       | Componente Django | Responsabilidade                                                            |
| ------------ | ----------------- | --------------------------------------------------------------------------- |
| **Model**    | `models.py`       | Estrutura de dados e regras de negócio                                      |
| **Template** | Arquivos `.html`  | O que o usuário vê (apresentação)                                           |
| **View**     | `views.py`        | Lógica de requisição e resposta (equivalente ao Controller no MVC clássico) |

**Frontend:** HTML, CSS e JavaScript puros — sem frameworks JS — para máxima performance e simplicidade de manutenção.

**Backend:** Python com Django, servindo páginas através de Templates.

**Banco de Dados:**

- **Desenvolvimento (local):** SQLite — embutido no Python, zero configuração.
- **Produção (nuvem):** PostgreSQL via [Neon.tech](https://neon.tech) (plano gratuito).

---

## 💰 Stack de Custo Zero

Todos os serviços abaixo possuem plano gratuito suficiente para o estágio inicial do projeto.

| Componente          | Serviço                              | Observação                                        |
| ------------------- | ------------------------------------ | ------------------------------------------------- |
| **Backend Django**  | [Render.com](https://render.com)     | Free tier — hiberna após 15 min de inatividade    |
| **Banco de Dados**  | [Neon.tech](https://neon.tech)       | PostgreSQL gratuito — 0.5 GB de armazenamento     |
| **Imagens / Mídia** | [Cloudinary](https://cloudinary.com) | 25 GB gratuitos para upload de fotos dos produtos |
| **Domínio**         | Subdomínio do Render                 | Ex: `vrforge.onrender.com`                        |
| **Pagamentos**      | Mercado Pago                         | Sem mensalidade — cobrança por % sobre cada venda |

> ⚠️ **Atenção sobre o Render (Free Tier):** O servidor "hiberna" após 15 minutos sem acesso. O primeiro acesso do dia pode levar cerca de 30 segundos para carregar. Isso é aceitável para o estágio atual. Quando o negócio crescer, o upgrade custa aproximadamente USD 7/mês.

---

## 🎯 Plano de Ação — Fases do Projeto

### ✅ Fase 1 — Landing Page (Concluída)

- [x] Desenvolver Landing Page estática e responsivo (Mobile-First).

### 🔧 Fase 2 — Base Django (Em andamento)

- [ ] Configurar o projeto Django com estrutura de `apps` separadas por domínio.
- [ ] Separar as configurações em `base.py`, `dev.py` e `prod.py`.
- [ ] Configurar o arquivo `.env` para proteger variáveis sensíveis.
- [ ] Integrar o HTML/CSS/JS existente aos Templates do Django.
- [ ] Fazer o deploy inicial no Render + Neon.

### 📦 Fase 3 — Catálogo de Produtos

- [ ] Criar o `Model` de `Produto` e `Categoria` no banco de dados.
- [ ] Configurar o **Django Admin** para o ferreiro poder gerenciar produtos (adicionar, editar, excluir e fazer upload de fotos).
- [ ] Integrar o **Cloudinary** para armazenamento de imagens em produção.
- [ ] Criar as páginas de listagem e detalhe de produto.

### 📲 Fase 4 — Pedidos via WhatsApp (Baixo custo, alto impacto)

- [ ] Implementar botão "Encomendar via WhatsApp" com mensagem pré-formatada contendo o nome e detalhes do produto.
- [ ] Sem necessidade de gateway de pagamento — funcional e sem custo adicional.

### 💳 Fase 5 — Pagamentos Online (Quando o negócio validar)

- [ ] Integrar o Mercado Pago Checkout para pagamentos online.
- [ ] Criar o `Model` de `Pedido` e `ItemPedido`.
- [ ] Implementar fluxo de confirmação de pedido por e-mail.

---

## 📂 Estrutura de Pastas do Projeto

```
project-root/
│
├── README.md
├── .env                              # ⚠️ Variáveis secretas — NUNCA sobe para o Git
├── .gitignore
│
└── backend/                          # Todo o código Django fica aqui
    ├── manage.py                     # Gerenciador de comandos do Django
    ├── requirements.txt              # Dependências do projeto (Django, Psycopg2, etc.)
    ├── db.sqlite3                    # Banco de dados local (gerado automaticamente — apenas dev)
    │
    ├── vrforge/                      # Configurações globais do projeto Django
    │   ├── __init__.py
    │   ├── wsgi.py
    │   ├── urls.py                   # Roteador principal de URLs
    │   └── settings/                 # ⭐ Settings separados por ambiente
    │       ├── base.py               # Configurações comuns (dev + prod)
    │       ├── dev.py                # SQLite, DEBUG=True, variáveis locais
    │       └── prod.py               # PostgreSQL, variáveis de ambiente, segurança
    │
    ├── apps/                         # ⭐ Todas as apps do projeto
    │   │
    │   ├── pages/                    # Páginas estáticas (Landing Page, Sobre, Contato)
    │   │   ├── views.py
    │   │   ├── urls.py
    │   │   └── templates/
    │   │       └── pages/
    │   │           ├── home.html     # ← Landing Page atual entra aqui
    │   │           └── about.html
    │   │
    │   ├── catalog/                  # Catálogo de Produtos / Facas
    │   │   ├── models.py             # class Produto, class Categoria
    │   │   ├── views.py              # Lista de produtos, detalhe do produto
    │   │   ├── urls.py
    │   │   ├── admin.py              # Configuração do painel administrativo
    │   │   └── templates/
    │   │       └── catalog/
    │   │           ├── list.html     # Página de catálogo
    │   │           └── detail.html   # Página de detalhe do produto
    │   │
    │   └── orders/                   # Pedidos — implementado na Fase 5
    │       ├── models.py             # class Pedido, class ItemPedido
    │       ├── views.py
    │       ├── urls.py
    │       └── templates/
    │           └── orders/
    │
    ├── static/                       # Arquivos do desenvolvedor (CSS, JS, imagens fixas)
    │   ├── css/
    │   │   └── style.css
    │   ├── js/
    │   │   └── main.js
    │   └── images/
    │       └── logo.png
    │
    └── media/                        # ⭐ Uploads do Admin (fotos dos produtos)
        └── products/                 # Gerado automaticamente pelo Django
```

> **Por que múltiplas `apps`?**
> Separar `catalog`, `orders` e `pages` em apps distintas mantém o código organizado e fácil de manter conforme o projeto cresce.

> **Por que `settings/` separado?**
> Ter `dev.py` e `prod.py` herdando de `base.py` evita expor configurações sensíveis (como a `SECRET_KEY` e credenciais do banco) no repositório, além de facilitar trocar de ambiente sem alterar código.

---

## 🛠️ Como Rodar o Projeto Localmente

### Pré-requisitos

- Python 3.10 ou superior
- Git instalado

### Passo a Passo

**1. Clone o repositório e entre na pasta:**

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

**2. Crie e ative o ambiente virtual:**

```bash
# Windows:
python -m venv venv
venv\Scripts\activate

# Mac / Linux:
python3 -m venv venv
source venv/bin/activate
```

**3. Entre na pasta do backend e instale as dependências:**

```bash
cd backend
pip install -r requirements.txt
```

**4. Configure as variáveis de ambiente:**

Crie um arquivo `.env` dentro da pasta `backend/` com o seguinte conteúdo:

```env
SECRET_KEY=coloque-aqui-uma-chave-secreta-longa-e-aleatoria
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

> Para gerar uma `SECRET_KEY` segura, rode no terminal:
>
> ```bash
> python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
> ```

**5. Prepare o banco de dados (Migrações):**

```bash
python manage.py migrate --settings=vrforge.settings.dev
```

**6. Crie um superusuário (para acessar o painel Admin):**

```bash
python manage.py createsuperuser --settings=vrforge.settings.dev
```

**7. Rode o servidor de desenvolvimento:**

```bash
python manage.py runserver --settings=vrforge.settings.dev
```

**Acesse no seu navegador:**

- Site Principal: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- Painel Admin: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---

## 🚀 Deploy em Produção (Custo Zero)

### Banco de Dados — Neon.tech

1. Crie uma conta em [neon.tech](https://neon.tech) e crie um novo projeto.
2. Copie a `DATABASE_URL` fornecida pelo painel do Neon.

### Mídia — Cloudinary

1. Crie uma conta em [cloudinary.com](https://cloudinary.com).
2. Copie as credenciais: `CLOUD_NAME`, `API_KEY` e `API_SECRET`.

### Servidor — Render.com

1. Crie uma conta em [render.com](https://render.com) e conecte seu repositório GitHub.
2. Crie um novo **Web Service** apontando para a pasta `backend/`.
3. Configure as variáveis de ambiente no painel do Render:

```env
SECRET_KEY=sua-chave-secreta-de-producao
DEBUG=False
DATABASE_URL=postgresql://...  # URL fornecida pelo Neon
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
DJANGO_SETTINGS_MODULE=vrforge.settings.prod
```

4. Configure o comando de start:

```bash
gunicorn vrforge.wsgi:application
```

---

## 📦 Dependências Principais

```
Django>=4.2
psycopg2-binary       # Driver do PostgreSQL
python-decouple       # Leitura do arquivo .env
cloudinary            # Armazenamento de imagens em produção
django-cloudinary-storage
gunicorn              # Servidor WSGI para produção
whitenoise            # Servir arquivos estáticos no Render
```

---

## 🔒 Segurança — O que NUNCA sobe para o Git

Garanta que o seu `.gitignore` contenha:

```
.env
*.sqlite3
venv/
__pycache__/
media/
*.pyc
.DS_Store
```

---

## 🤝 Sobre o Projeto

Desenvolvido como projeto de portfólio e vitrine digital para um artesão cuteleiro. O objetivo é demonstrar uma aplicação Django MTV completa, com foco em custo de operação zero na fase inicial, código organizado e boas práticas de desenvolvimento.

**Tecnologias usadas:** Python · Django · HTML · CSS · JavaScript · PostgreSQL · Cloudinary · Render · Neon
