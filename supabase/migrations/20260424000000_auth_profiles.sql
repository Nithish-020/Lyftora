-- Auth profiles + RLS for Lyftora v1
-- Matches docs/superpowers/specs/2026-04-24-auth-flow-design.md

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  auth_provider text not null default 'email',
  onboarding_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_idx
  on public.profiles (lower(username))
  where username is not null;

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_self" on public.profiles;
create policy "profiles_select_self" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- insert is blocked from clients; only the trigger populates rows.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, auth_provider)
  values (
    new.id,
    coalesce(new.raw_app_meta_data->>'provider', 'email')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Username availability check (SECURITY DEFINER so anon clients can call it).
create or replace function public.check_username(name text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  return not exists (
    select 1 from public.profiles where lower(username) = lower(name)
  );
end;
$$;

grant execute on function public.check_username(text) to anon, authenticated;
