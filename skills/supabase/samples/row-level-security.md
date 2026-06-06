# Row Level Security

Protect table data at the database level so users can only access their own rows.

```sql
-- Enable RLS on the table
alter table public.todos enable row level security;

-- SELECT: users can read only their own rows
create policy "Users can view own todos"
  on public.todos for select
  to authenticated
  using (auth.uid() = user_id);

-- INSERT: users can only insert rows that belong to them
create policy "Users can insert own todos"
  on public.todos for insert
  to authenticated
  with check (auth.uid() = user_id);

-- UPDATE: users can only update their own rows
create policy "Users can update own todos"
  on public.todos for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- DELETE: users can only delete their own rows
create policy "Users can delete own todos"
  on public.todos for delete
  to authenticated
  using (auth.uid() = user_id);

-- Allow public read for a profiles table (no login required)
create policy "Profiles are publicly viewable"
  on public.profiles for select
  to anon, authenticated
  using (true);

-- Organization-based access (multi-tenant)
create policy "Org members can access documents"
  on public.documents for select
  to authenticated
  using (
    org_id in (
      select org_id from public.org_members
      where user_id = auth.uid()
    )
  );
```

## Notes

- `auth.uid()` returns the UUID of the currently authenticated user from the JWT
- Without any policy, a table with RLS enabled denies all access by default
- `using` restricts which rows are visible; `with check` restricts which rows can be written
- The `service_role` key bypasses RLS entirely — use it only in trusted server environments
