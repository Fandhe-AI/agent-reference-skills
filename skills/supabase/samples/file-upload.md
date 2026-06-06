# File Upload

Upload files to Supabase Storage and retrieve public or signed URLs.

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Upload a file to a public bucket
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`public/${userId}/avatar.png`, file, {
    cacheControl: '3600',
    upsert: true,           // overwrite if exists
    contentType: 'image/png',
  })

// Get the public URL (public bucket only)
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(`public/${userId}/avatar.png`)

// Get a public URL with image transformation
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(`public/${userId}/avatar.png`, {
    transform: { width: 200, height: 200, resize: 'cover' },
  })

// Create a signed URL for a private bucket (expires in 1 hour)
const { data, error } = await supabase.storage
  .from('documents')
  .createSignedUrl('reports/q1.pdf', 3600)
// data.signedUrl is a temporary access URL

// Download a file
const { data: blob, error } = await supabase.storage
  .from('avatars')
  .download(`public/${userId}/avatar.png`)

// Delete files
const { error } = await supabase.storage
  .from('avatars')
  .remove([`public/${userId}/avatar.png`])
```

```sql
-- RLS policy: users can upload to their own folder
create policy "Users can upload own avatar"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars' and
    (storage.foldername(name))[1] = auth.uid()::text
  );
```

## Notes

- Use `getPublicUrl()` for public buckets (no auth required); use `createSignedUrl()` for private buckets
- `upsert: false` (default) returns an error if the path already exists; set `upsert: true` to overwrite
- Image transformation (resize, format, quality) is available on public URL and signed URL via `transform` option
- Storage access is controlled by RLS policies on the `storage.objects` table
