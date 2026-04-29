# Central de Conhecimento da Fácil Informática

Portal de documentação para clientes da Fácil Informática, criado para publicar manuais, tutoriais e perguntas frequentes de forma simples, sem banco de dados e sem backend tradicional.

O site foi construído com `React`, `Vite`, `TypeScript`, `Tailwind CSS` e `Decap CMS`. Todo o conteúdo fica versionado em arquivos dentro do próprio repositório, e a edição pode ser feita pelo painel `/admin` quando o projeto estiver publicado na Netlify.

## Objetivo do projeto

Este portal foi pensado para:

- centralizar manuais voltados para clientes;
- permitir que a equipe publique novos conteúdos sem mexer no código;
- organizar artigos por categoria;
- oferecer busca rápida e navegação simples;
- evoluir o conteúdo aos poucos, sem depender de banco de dados.

## O que já está definido

- o portal será voltado somente para clientes;
- o acesso ao `/admin` será usado por 3 pessoas da equipe;
- essas 3 pessoas poderão criar, editar e publicar conteúdos;
- não haverá fluxo de aprovação antes da publicação;
- o conteúdo poderá usar imagens, GIFs e vídeos externos suportados;
- conteúdos internos da equipe ficarão em um projeto separado no futuro.

## Tecnologias usadas

- `React 18`
- `TypeScript`
- `Vite`
- `Tailwind CSS`
- `React Router`
- `Fuse.js` para busca
- `React Markdown`
- `Decap CMS`
- `Netlify Identity` + `Git Gateway` para o admin em produção

## Como o projeto funciona

O site é estático, mas o conteúdo é dinâmico na montagem.

Fluxo geral:

1. Os manuais são salvos como arquivos `.md` dentro da pasta `content/`.
2. As categorias ficam no arquivo `content/categories.json`.
3. O código em `src/lib/content.ts` carrega esses arquivos no build.
4. O site monta as páginas de categorias, artigos e busca automaticamente.
5. Quando o conteúdo é alterado e publicado, a Netlify gera um novo deploy.

## Estrutura principal

```text
content/
  categories.json          Lista de categorias
  <categoria>/*.md         Manuais em Markdown

public/
  admin/                   Painel do Decap CMS
  uploads/                 Imagens usadas nos manuais
  _redirects               Suporte de rotas para a Netlify

src/
  components/              Componentes visuais
  pages/                   Páginas do site
  lib/content.ts           Leitura dos manuais e busca
  index.css                Tokens visuais do tema
```

## Funcionalidades atuais

- página inicial com categorias;
- navegação por categorias;
- página individual de artigo;
- busca por título, descrição, categoria e conteúdo;
- breadcrumbs;
- artigos relacionados;
- sumário lateral;
- suporte a imagens com ampliação;
- suporte a GIFs como imagem normal;
- suporte a vídeos do YouTube e Vimeo por link;
- suporte a callouts como `NOTE`, `TIP`, `IMPORTANT`, `WARNING` e `CAUTION`;
- painel `/admin` para gerenciar manuais e categorias.

## O que não usa

Este projeto não usa:

- banco de dados;
- backend próprio;
- painel administrativo customizado em servidor.

O conteúdo é salvo diretamente no repositório Git.

## Como rodar localmente

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:8080
```

## Como gerar a versão final

```bash
npm run build
```

Os arquivos finais serão gerados na pasta:

```text
dist/
```

## Como funciona o admin

O painel administrativo fica em:

```text
/admin
```

No ambiente publicado, ele funciona com:

- `Netlify Identity` para login;
- `Git Gateway` para gravar as alterações no repositório.

Pelo admin, a equipe poderá:

- criar manuais;
- editar manuais;
- excluir manuais;
- criar categorias;
- editar categorias;
- enviar imagens para os artigos.

## Como criar um manual pelo site

Depois da publicação na Netlify:

1. Acesse `/admin`.
2. Faça login com o usuário da equipe.
3. Entre em `Manuais`.
4. Clique em criar novo manual.
5. Preencha título, categoria, descrição, ordem e conteúdo.
6. Publique o conteúdo.

Ao publicar:

- o Decap CMS salva a alteração no repositório;
- a Netlify gera um novo deploy;
- o manual passa a aparecer no site.

## Como criar categorias

As categorias também podem ser gerenciadas pelo `/admin`.

Cada categoria possui:

- `slug`: identificador usado na URL;
- `title`: nome que aparece no site;
- `description`: descrição curta;
- `icon`: nome de um ícone Lucide.

Exemplos de categorias que podem ser usadas depois:

- Primeiros passos
- Cadastros
- Fiscal
- Vendas
- Financeiro
- Estoque
- Relatórios
- FAQ

## Formato de um manual

Cada manual é salvo como Markdown com frontmatter.

Exemplo:

```md
---
title: "Como emitir NFe"
category: "fiscal"
description: "Passo a passo para emissão de nota fiscal eletrônica."
order: 1
---

# Como emitir NFe

Conteúdo do manual aqui.
```

## Imagens, GIFs e vídeos

### Imagens

Imagens podem ser usadas normalmente nos artigos.

Exemplo:

```md
![Tela do sistema](/uploads/tela.png "Legenda opcional")
```

### GIFs

GIFs funcionam como imagem comum.

Exemplo:

```md
![Demonstração do processo](/uploads/tutorial.gif)
```

### Vídeos

Hoje o suporte pronto do projeto é para links do:

- YouTube
- Vimeo

Exemplo:

```text
https://www.youtube.com/watch?v=VIDEO_ID
```

Observação:

- vídeos próprios em `.mp4` ainda não estão implementados no renderizador atual;
- se isso for necessário no futuro, o projeto pode ser adaptado.

## Callouts

Os artigos aceitam blocos de aviso.

Exemplo:

```md
> [!NOTE] Atenção
> Verifique se o cadastro está completo antes de continuar.
```

Tipos disponíveis:

- `NOTE`
- `TIP`
- `IMPORTANT`
- `WARNING`
- `CAUTION`

## Personalização já feita

Alguns ajustes já realizados no projeto:

- rodapé alterado para `Central de Conhecimento da Fácil Informática`;
- cor principal do tema trocada de roxo para azul, mantendo a mesma estética visual do site.

## Deploy na Netlify

### 1. Enviar o projeto para um repositório Git

Pode ser no:

- GitHub
- GitLab

### 2. Importar o projeto na Netlify

No painel da Netlify:

1. Clique em `Add new site`.
2. Escolha `Import from Git`.
3. Selecione o repositório.

### 3. Configurações de build

Use:

- `Build command`: `npm run build`
- `Publish directory`: `dist`

### 4. Ativar o login do admin

No painel da Netlify:

1. Ative `Identity`.
2. Em `Registration`, use `Invite only`.
3. Ative `Git Gateway`.
4. Convide os 3 usuários da equipe.

### 5. Acessar o admin

Depois do deploy:

```text
https://seu-site.netlify.app/admin/
```

## Checklist antes de publicar

- remover conteúdos de exemplo que não serão usados;
- definir as primeiras categorias;
- publicar alguns manuais iniciais;
- revisar textos da página inicial;
- confirmar os 3 usuários do admin;
- validar se imagens e GIFs estão funcionando;
- confirmar o nome e visual final do portal.

## Manutenção do projeto

Depois da publicação, a manutenção ideal é:

- ir adicionando manuais aos poucos;
- revisar conteúdos antigos quando necessário;
- manter categorias organizadas;
- evitar publicar material técnico interno neste portal.

## Licença

Uso interno da equipe e adaptação conforme a necessidade do projeto.
