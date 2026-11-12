create type public.app_role as enum ('admin', 'staff');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;
create or replace function public.is_staff(_user_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role in ('admin','staff')) $$;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create type public.enquiry_status as enum ('new','contacted','quote_required','booked','completed','closed');

create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status enquiry_status not null default 'new',
  full_name text not null,
  phone text not null,
  email text not null,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_year int not null,
  rego text,
  vehicle_type text,
  service_type text not null,
  details text not null,
  preferred_date date,
  preferred_time text,
  contact_method text,
  consent boolean not null default false,
  marketing_opt_in boolean not null default false,
  source_page text,
  ip_hash text
);
grant select, update, delete on public.booking_requests to authenticated;
grant all on public.booking_requests to service_role;
alter table public.booking_requests enable row level security;
create policy "Staff read bookings" on public.booking_requests for select to authenticated using (public.is_staff(auth.uid()));
create policy "Staff update bookings" on public.booking_requests for update to authenticated using (public.is_staff(auth.uid()));
create policy "Staff delete bookings" on public.booking_requests for delete to authenticated using (public.is_staff(auth.uid()));

create table public.fleet_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status enquiry_status not null default 'new',
  business_name text not null,
  contact_person text not null,
  phone text not null,
  email text not null,
  vehicle_count int,
  vehicle_types text,
  preferred_contact_time text,
  message text not null,
  consent boolean not null default false,
  source_page text,
  ip_hash text
);
grant select, update, delete on public.fleet_enquiries to authenticated;
grant all on public.fleet_enquiries to service_role;
alter table public.fleet_enquiries enable row level security;
create policy "Staff read fleet" on public.fleet_enquiries for select to authenticated using (public.is_staff(auth.uid()));
create policy "Staff update fleet" on public.fleet_enquiries for update to authenticated using (public.is_staff(auth.uid()));
create policy "Staff delete fleet" on public.fleet_enquiries for delete to authenticated using (public.is_staff(auth.uid()));
create index on public.booking_requests (ip_hash, created_at);
create index on public.fleet_enquiries (ip_hash, created_at);