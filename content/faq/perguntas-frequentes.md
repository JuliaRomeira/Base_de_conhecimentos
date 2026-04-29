---
title: "Perguntas frequentes"
category: "faq"
description: "Respostas rápidas para as dúvidas mais comuns sobre o sistema."
order: 1
---

# Perguntas frequentes

## Geral

### A base de conhecimento é gratuita?

Sim! Toda a estrutura é open source e pode ser hospedada gratuitamente na Netlify.

### Preciso saber programar para usar?

Não. Para criar e editar manuais, basta acessar `/admin` e usar o editor visual. Apenas a configuração inicial e personalização avançada exigem conhecimento técnico.

### Onde os artigos ficam armazenados?

Todos os artigos são arquivos Markdown salvos no seu repositório Git. Não há banco de dados — isso torna o sistema extremamente rápido, seguro e fácil de fazer backup.

## Edição

### Posso adicionar imagens nos manuais?

Sim! No editor `/admin`, clique no ícone de imagem para fazer upload. As imagens ficam em `public/uploads/` e são commitadas no Git automaticamente.

### Posso usar vídeos?

Sim, basta colar a URL do YouTube ou Vimeo em uma linha sozinha no markdown.

### Como faço para destacar avisos importantes?

Use os **callouts** com a sintaxe:

```markdown
> [!NOTE] Título opcional
> Conteúdo do aviso.
```

Tipos disponíveis: `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`.

> [!NOTE] Exemplo de NOTE
> Este é um aviso informativo.

> [!TIP] Exemplo de TIP
> Esta é uma dica útil.

> [!IMPORTANT] Exemplo de IMPORTANT
> Algo que merece atenção especial.

> [!WARNING] Exemplo de WARNING
> Cuidado com esta ação.

> [!CAUTION] Exemplo de CAUTION
> Risco de perda de dados!

## Técnico

### Posso exportar minha base de conhecimento?

Como tudo é Markdown no Git, você já tem 100% do conteúdo exportado. Basta clonar o repositório.

### Posso hospedar em outro serviço além da Netlify?

Sim, qualquer host de site estático funciona (Vercel, Cloudflare Pages, GitHub Pages). Apenas o painel `/admin` com Git Gateway é específico da Netlify.

### A busca funciona offline?

Toda a busca é client-side com Fuse.js. Uma vez carregada, funciona sem conexão.
