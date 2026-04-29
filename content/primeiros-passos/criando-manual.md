---
title: "Criando seu primeiro manual"
category: "primeiros-passos"
description: "Aprenda passo a passo como adicionar um novo artigo à base de conhecimento."
order: 2
---

# Criando seu primeiro manual

Adicionar um novo manual é simples e rápido. Você pode fazer isso de duas formas: pelo **painel administrativo** ou editando os arquivos diretamente.

## Opção 1: Pelo painel /admin

Esta é a forma recomendada para a maioria dos usuários.

### Passo a passo

1. Acesse `/admin` no seu navegador
2. Faça login com suas credenciais
3. Clique em **"Manuais"** no menu lateral
4. Clique no botão **"New Manuais"** no canto superior direito
5. Preencha os campos:
   - **Título** — o nome do artigo
   - **Categoria** — selecione uma categoria existente
   - **Descrição** — um resumo curto (opcional)
   - **Conteúdo** — o corpo do artigo em Markdown

> [!IMPORTANT] Salvando seu trabalho
> Clique em **"Publish > Publish now"** para que o artigo fique visível no site. Mudanças são commitadas diretamente no repositório Git.

### Adicionando imagens

No editor, clique no ícone de imagem na barra de ferramentas, escolha um arquivo do seu computador e ele será automaticamente enviado e inserido no artigo.

## Opção 2: Editando arquivos diretamente

Se você prefere trabalhar com arquivos, basta criar um novo `.md` dentro de `content/<categoria>/`:

```markdown
---
title: "Título do artigo"
category: "primeiros-passos"
description: "Descrição curta"
order: 1
---

# Conteúdo do artigo aqui...
```

## Sintaxe Markdown disponível

A base de conhecimento suporta Markdown completo, incluindo:

| Recurso | Sintaxe |
|---------|---------|
| Negrito | `**texto**` |
| Itálico | `*texto*` |
| Código inline | `` `código` `` |
| Link | `[texto](url)` |
| Imagem | `![alt](url "legenda")` |

> [!WARNING] Tamanho de imagens
> Mantenha imagens abaixo de 500 KB para que o repositório não fique pesado.
