-- Initial reference schema. Apply only after reviewing RLS and project requirements.
create table vehicles (id uuid primary key default gen_random_uuid(), name text not null, year int, status text not null default 'available', content jsonb not null default '{}');
create table parts (id uuid primary key default gen_random_uuid(), name text not null, category text not null, available boolean default true, content jsonb not null default '{}');
create table projects (id uuid primary key default gen_random_uuid(), name text not null, content jsonb not null default '{}');
create table workshop_requests (id uuid primary key default gen_random_uuid(), name text not null, phone text not null, vehicle text, service text, description text, preferred_date date, consent boolean not null, status text default 'new', created_at timestamptz default now());
create table configurations (id uuid primary key default gen_random_uuid(), payload jsonb not null, created_at timestamptz default now());
alter table workshop_requests enable row level security;
alter table configurations enable row level security;
-- Add narrowly scoped insert policies from a server-side action before production use.
