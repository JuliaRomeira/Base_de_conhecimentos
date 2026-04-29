
## Visão geral

Sistema de documentação estática inspirado em help centers modernos. Conteúdo em arquivos Markdown na pasta `/content`, editável via interface web em `/admin` (Decap CMS) com Netlify Identity + Git Gateway. Visual dark mode minimalista com **roxo suave (#8b5cf6)** como cor de destaque. Suporte completo a imagens, vídeos e callouts.

## Estrutura de páginas

1. **Home (`/`)** — Hero curto, busca grande e grid de **categorias** (cards com ícone, título, descrição e contagem de artigos).
2. **Categoria (`/categoria/:slug`)** — Lista de artigos da categoria com breadcrumb.
3. **Artigo (`/artigo/:slug`)** — Markdown renderizado com:
   - Breadcrumbs (Home > Categoria > Artigo)
   - Sumário (TOC) lateral à direita com scroll-spy nos H2/H3
   - Sidebar à esquerda (categorias + artigos da categoria atual destacada)
   - Bloco de **artigos relacionados** no rodapé
4. **Busca (`/busca?q=...`)** — Resultados client-side por título, categoria e corpo.
5. **Admin (`/admin`)** — Decap CMS embarcado.
6. **404** — Página não encontrada estilizada.

## Layout

```text
┌─────────────────────────────────────────────────────┐
│  Topbar: Logo · Busca · Link Admin                  │
├──────────┬──────────────────────────────┬───────────┤
│ Sidebar  │  Conteúdo principal          │  TOC      │
│ fixa     │  (breadcrumb + markdown)     │  (artigo) │
│ categs   │                              │           │
│ + arts   │                              │           │
└──────────┴──────────────────────────────┴───────────┘
```

- Sidebar fixa à esquerda; em mobile vira Sheet.
- TOC só aparece no artigo, em telas ≥ lg.
- Container central `max-w-3xl` para boa leitura.

## Design system (dark mode)

Tokens HSL em `src/index.css`, mapeados em `tailwind.config.ts`:

- `--background` ≈ #0f172a
- `--sidebar` ≈ #111827
- `--card` ≈ #1f2937
- `--foreground` ≈ #e5e7eb
- `--muted-foreground` ≈ #9ca3af
- `--primary` **#8b5cf6** (hover #a78bfa)
- `--border` cinza sutil
- `--radius` 0.75rem, sombras leves

Aplicado em botões, links, item ativo na sidebar, hover de cards, foco em inputs, indicador do TOC.

Tipografia: **Inter** (UI/corpo) + **JetBrains Mono** (código), via Google Fonts no `index.html`.

## Conteúdo Markdown

Cada arquivo em `/content/<categoria>/<slug>.md`:

```text
---
title: "Como criar seu primeiro manual"
category: "primeiros-passos"
description: "Passo a passo para começar."
order: 1
---
# Conteúdo em markdown...
```

Carregamento client-side via `import.meta.glob('/content/**/*.md', { eager: true, query: '?raw', import: 'default' })`. Frontmatter parseado por utilitário leve próprio (sem `gray-matter` para evitar polyfills).

**Categorias** definidas em `/content/categories.json` (slug, título, descrição, ícone Lucide), permitindo ordenação consistente.

### Renderização Markdown

- `react-markdown` + `remark-gfm` (tabelas, listas de tarefa)
- `rehype-slug` + `rehype-autolink-headings` (anchors para o TOC)
- `react-syntax-highlighter` com tema escuro para blocos de código

## Imagens, vídeos e callouts

### Imagens
- Pasta `public/uploads/` (commitada no Git)
- Sintaxe: `![alt](/uploads/arquivo.png "legenda opcional")`
- Renderização customizada:
  - `rounded-lg` + sombra leve harmonizada com o dark mode
  - **Lazy loading** automático
  - Responsiva (nunca estoura o container)
  - **Legenda** (do atributo `title`) renderizada abaixo em cinza claro
  - **Clique para ampliar** (lightbox simples próprio, sem libs pesadas)
- Suporte a PNG, JPG, GIF, WEBP, SVG

### Vídeos (YouTube/Vimeo)
- Sintaxe simples: cole a URL do YouTube/Vimeo numa linha sozinha
- Plugin remark customizado converte em iframe responsivo (16:9, `rounded-lg`)
- Exemplo: `https://www.youtube.com/watch?v=xxxxx`

### Callouts (caixas de aviso)
- Sintaxe estilo GitHub:
  ```markdown
  > [!NOTE] Título opcional
  > Conteúdo da nota.
  ```
- Tipos suportados: `NOTE` (azul), `TIP` (verde-teal), `IMPORTANT` (roxo, cor primária), `WARNING` (amarelo), `CAUTION` (vermelho suave)
- Cada um com ícone Lucide, borda lateral colorida, fundo sutil

## Busca client-side

- Index em memória a partir do glob de conteúdo
- **Fuse.js** para busca fuzzy em `title`, `description`, `category`, `body`
- Caixa no topbar abre dropdown com resultados ao digitar; Enter leva para `/busca?q=`

## Decap CMS (`/public/admin`)

**`public/admin/index.html`**: shell padrão do Decap via CDN + `netlify-identity-widget`.

**`public/admin/config.yml`**:

```yaml
backend:
  name: git-gateway
  branch: main
media_folder: public/uploads
public_folder: /uploads
collections:
  - name: manuais
    label: Manuais
    folder: content
    create: true
    slug: "{{slug}}"
    extension: md
    format: frontmatter
    fields:
      - { label: Título, name: title, widget: string }
      - { label: Categoria, name: category, widget: relation,
          collection: categorias, value_field: items.*.slug,
          search_fields: [items.*.title], display_fields: [items.*.title] }
      - { label: Descrição, name: description, widget: string, required: false }
      - { label: Ordem, name: order, widget: number, required: false, default: 0 }
      - { label: Conteúdo, name: body, widget: markdown }
  - name: categorias
    label: Categorias
    files:
      - file: content/categories.json
        label: Lista de categorias
        name: categorias
        fields:
          - label: Categorias
            name: items
            widget: list
            fields:
              - { label: Slug, name: slug, widget: string }
              - { label: Título, name: title, widget: string }
              - { label: Descrição, name: description, widget: string }
              - { label: Ícone (Lucide), name: icon, widget: string, default: "BookOpen" }
```

O widget `markdown` traz botão de upload de imagem nativo: ao clicar, o usuário escolhe a imagem, ela é enviada para `public/uploads/` e inserida no markdown automaticamente.

## Conteúdo de exemplo (seed)

Três categorias com 1–2 artigos cada:

- **Primeiros Passos** — "Bem-vindo à base de conhecimento", "Criando seu primeiro manual"
- **Configurações** — "Como configurar usuários", "Personalizando o sistema"
- **FAQ** — "Perguntas frequentes"

Conteúdo realista demonstrando títulos, listas, tabelas, código, **imagens com legenda**, **vídeo embed** e **callouts** de cada tipo.

## Componentes reutilizáveis

`/src/components/`
- `Topbar.tsx`, `Sidebar.tsx`, `MobileSidebar.tsx`
- `CategoryCard.tsx`, `ArticleCard.tsx`
- `Breadcrumbs.tsx`
- `MarkdownRenderer.tsx` (com handlers customizados para img, video, callout)
- `Lightbox.tsx`
- `TableOfContents.tsx` (scroll-spy via IntersectionObserver)
- `RelatedArticles.tsx`
- `SearchCommand.tsx`
- `Layout.tsx`

## Páginas

`/src/pages/` — `Home.tsx`, `Category.tsx`, `Article.tsx`, `Search.tsx`, `NotFound.tsx`

## Lib utilitária

`/src/lib/content.ts` — `getAllArticles()`, `getArticleBySlug()`, `getArticlesByCategory()`, `getCategories()`, `searchArticles(q)`, `parseFrontmatter()`.

## README

Instruções para:
1. Rodar local (`npm install`, `npm run dev`)
2. Estrutura de pastas e como adicionar conteúdo manualmente
3. Como inserir imagens, vídeos e callouts nos manuais (com exemplos)
4. Deploy no **Netlify** (build `npm run build`, publish `dist`)
5. Ativar **Netlify Identity** (Site settings → Identity → Enable)
6. Ativar **Git Gateway** (Identity → Services → Enable Git Gateway)
7. Convidar admins e acessar `/admin`
8. Recomendação de tamanho de imagem (< 500 KB) para manter o repositório leve

## Detalhes técnicos

- **Stack**: React 18 + Vite + TypeScript + Tailwind + React Router
- **Novas dependências**: `react-markdown`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `react-syntax-highlighter`, `fuse.js`, `@tailwindcss/typography`
- **SPA routing**: incluir `public/_redirects` (`/* /index.html 200`) para Netlify
- **Acessibilidade**: foco visível roxo, contraste AA, navegação por teclado na busca, alt obrigatório nas imagens via CMS

## O que NÃO está incluso

- Backend, banco de dados, autenticação de leitores (leitura é pública)
- Versionamento de artigos além do histórico Git
- Multi-idioma (estrutura permite adicionar depois)
