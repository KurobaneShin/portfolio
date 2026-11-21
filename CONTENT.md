# Conteúdo do site

O conteúdo editável fica no Supabase (schema `portfolio`). Edite pelo Studio, sem mexer no código nem fazer deploy.

## Tabelas

| Tabela | O que guarda |
| --- | --- |
| `posts` | Posts do blog, um registro por idioma (`slug` + `lang`). O texto fica em `body_md` (markdown, sem frontmatter). |
| `cases` | Estudos de caso da home. `position` define a ordem, `visible = false` esconde. |
| `clients` | Lista "Com quem trabalhei" no topo da home. Mesma lógica de `position` e `visible`. |
| `site_copy` | Textos longos das páginas (chave + idioma): headline e descrição do hero, títulos e descrições das seções, título/descrição/eyebrow do blog. |
| `projects`, `companies` | Projetos em destaque e experiência (já eram do banco). |

`lang` é `en` ou `ptBR`. Se um item não tem tradução, o site mostra a do outro idioma.

Continuam no código (`app/locales`): menu, botões, mensagens do formulário, seletor de idioma, tema, rótulos de tag e as listas de skills/stack.

## Novo post

1. Mídia: no Studio, Storage, bucket `blog` (público). Crie a pasta `<slug>` e envie as imagens/vídeos. Copie a URL pública de cada arquivo.
2. Table editor, `posts`, insira uma linha por idioma com o mesmo `slug`: `title`, `description`, `published_at`, `tag` (`mmo`, `web` ou `ia`), `body_md`, e as URLs em `image` (imagem de compartilhamento), `cover` e `video` (opcionais), `linkedin` (opcional).
3. `published = false` esconde o post (a página dá 404 e ele sai do blog, RSS e sitemap).

Links entre posts no markdown: `[texto](/blog/outro-slug?lng=ptBR)`.

## Quanto tempo até aparecer

Cerca de 1 minuto. O servidor guarda o conteúdo em cache por 60 s; depois disso a próxima visita já recarrega do banco em segundo plano. Se houver CDN na frente, some até mais 60 s.

## Popular o banco do zero

```
bun --env-file=<arquivo com SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY> scripts/seed-content.ts
```

O script é idempotente (faz upsert) e lê o conteúdo original do git (commit `15a3c42`). Atenção: ele sobrescreve edições feitas no Studio nas mesmas linhas.
