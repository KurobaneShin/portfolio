-- Editable site content. Server reads/writes with the service role; no public policies.

create table portfolio.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  lang text not null check (lang in ('en', 'ptBR')),
  title text not null,
  description text not null,
  published_at date not null,
  tag text not null,
  image text,
  cover text,
  video text,
  linkedin text,
  body_md text not null,
  published boolean not null default true,
  unique (slug, lang)
);

create table portfolio.cases (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  lang text not null check (lang in ('en', 'ptBR')),
  client text not null,
  title text not null,
  metric text not null,
  detail text not null,
  position int not null,
  visible boolean not null default true,
  unique (slug, lang)
);

create table portfolio.clients (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  lang text not null check (lang in ('en', 'ptBR')),
  name text not null,
  sector text not null,
  position int not null,
  visible boolean not null default true,
  unique (slug, lang)
);

create table portfolio.site_copy (
  key text not null,
  lang text not null check (lang in ('en', 'ptBR')),
  value text not null,
  primary key (key, lang)
);

alter table portfolio.posts enable row level security;
alter table portfolio.cases enable row level security;
alter table portfolio.clients enable row level security;
alter table portfolio.site_copy enable row level security;

revoke all on portfolio.posts, portfolio.cases, portfolio.clients, portfolio.site_copy from anon, authenticated;
grant select, insert, update, delete on portfolio.posts, portfolio.cases, portfolio.clients, portfolio.site_copy to service_role;

notify pgrst, 'reload schema';
