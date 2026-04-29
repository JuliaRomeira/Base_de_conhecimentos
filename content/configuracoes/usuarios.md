---
title: "Como configurar usuários"
category: "configuracoes"
description: "Gerencie acessos e permissões da equipe que pode editar a documentação."
order: 1
---

# Como configurar usuários

A gestão de usuários é feita através do **Netlify Identity**, integrado ao painel administrativo.

## Convidando novos usuários

Para dar acesso a um novo editor:

1. Acesse o painel do **Netlify** do seu site
2. Vá em **Identity**
3. Clique em **"Invite users"**
4. Digite o e-mail do convidado e envie

O usuário receberá um link de convite por e-mail e poderá definir sua senha no primeiro acesso.

## Removendo acesso

Para revogar acesso de um usuário:

1. Acesse **Identity** no painel do Netlify
2. Localize o usuário na lista
3. Clique nos três pontos e selecione **"Delete user"**

> [!CAUTION] Ação irreversível
> Remover um usuário não pode ser desfeito. O histórico de commits feitos por ele permanece no Git.

## Boas práticas

- Convide apenas pessoas de confiança
- Use e-mails corporativos quando possível
- Revise a lista de usuários periodicamente
- Documente quem tem acesso administrativo

## Estrutura recomendada

Para times pequenos, basta um ou dois administradores. Para times maiores, considere:

- **1 owner** — acesso total
- **2-3 editores principais** — criam e revisam conteúdo
- **Colaboradores** — propõem mudanças via Pull Request no GitHub
