---
title: "Personalizando o sistema"
category: "configuracoes"
description: "Ajuste cores, logo, categorias e outros detalhes da sua base de conhecimento."
order: 2
---

# Personalizando o sistema

A base de conhecimento foi construída para ser facilmente personalizável.

## Alterando cores

Todas as cores são definidas como tokens HSL no arquivo `src/index.css`:

```css
:root {
  --primary: 258 90% 66%;        /* Cor de destaque */
  --background: 222 47% 8%;      /* Fundo principal */
  --sidebar-background: 222 39% 11%;
}
```

Para mudar a cor de destaque para azul, por exemplo, troque `--primary` para `217 91% 60%`.

> [!TIP] Use HSL
> O sistema inteiro usa HSL para garantir harmonia. Você só precisa mudar uma linha e a cor se propaga em botões, links, hovers e itens ativos.

## Alterando categorias

Edite o arquivo `content/categories.json` ou use a seção **"Categorias"** no painel `/admin`.

Cada categoria tem:

- **slug** — identificador único na URL
- **title** — nome exibido
- **description** — descrição curta
- **icon** — nome de um ícone do [Lucide](https://lucide.dev/icons/)

## Alterando o logo

Substitua o arquivo `public/favicon.ico` e edite o componente `Topbar.tsx` se quiser trocar o texto do logo.

## Vídeos tutoriais

Você pode embutir vídeos do YouTube colando a URL diretamente em uma linha sozinha no markdown. Em breve teremos vídeos demonstrativos aqui!
