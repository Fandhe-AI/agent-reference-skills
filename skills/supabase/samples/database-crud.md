# Database CRUD

Perform create, read, update, and delete operations on a Postgres table via the Supabase client.

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// SELECT — fetch rows with filters
const { data, error } = await supabase
  .from('todos')
  .select('id, title, is_complete')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(20)

// SELECT with relation (foreign key join)
const { data, error } = await supabase
  .from('posts')
  .select(`
    id,
    title,
    author:users(id, name),
    comments(id, body)
  `)

// INSERT — add a row and return it
const { data, error } = await supabase
  .from('todos')
  .insert({ title: 'Buy groceries', user_id: userId })
  .select()
  .single()

// UPDATE — modify a row (filter required)
const { data, error } = await supabase
  .from('todos')
  .update({ is_complete: true })
  .eq('id', todoId)
  .select()
  .single()

// UPSERT — insert or update on conflict
const { data, error } = await supabase
  .from('profiles')
  .upsert({ id: userId, display_name: 'Alice' }, { onConflict: 'id' })
  .select()
  .single()

// DELETE — remove a row (filter required)
const { error } = await supabase
  .from('todos')
  .delete()
  .eq('id', todoId)

// Call a database function (RPC)
const { data, error } = await supabase.rpc('get_todo_stats', { uid: userId })
```

## Notes

- Always check `error` before using `data`; errors do not throw exceptions
- `update()` and `delete()` without a filter affect all rows — always add `.eq()` or another filter
- Chain `.select()` after `insert()` / `update()` / `upsert()` to receive the affected rows back
- RLS policies automatically restrict which rows each user can read or modify
