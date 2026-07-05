# public

Serves static files, like images, from the `public` directory at the project root. Files are referenced from the base URL `/`.

## Signature / Usage

```jsx filename="avatar.js"
import Image from 'next/image'

export function Avatar({ id, alt }) {
  return <Image src={`/avatars/${id}.png`} alt={alt} width="64" height="64" />
}
```

`public/avatars/me.png` is served at `/avatars/me.png`.

## Notes

- Next.js cannot safely cache assets in `public` because they may change; the default header applied is `Cache-Control: public, max-age=0`.
- For static metadata files such as `robots.txt` or `favicon.ico`, use the [metadata file conventions](./metadata/README.md) inside `app` instead of the `public` folder.

## Related

- [Metadata Files](./metadata/README.md)
