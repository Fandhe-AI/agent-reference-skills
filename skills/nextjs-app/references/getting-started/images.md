# Image Optimization

Optimize images with the built-in `<Image>` component from `next/image`.

## Signature / Usage

```tsx
// app/page.tsx — local image with automatic width/height
import Image from 'next/image'
import ProfileImage from './profile.png'

export default function Page() {
  return <Image src={ProfileImage} alt="Picture of the author" />
}
```

```tsx
// app/page.tsx — remote image requires explicit width/height
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `src` | `string \| StaticImageData` | Local (static import or `public/` path) or remote URL |
| `alt` | `string` | Required alt text |
| `width` / `height` | `number` | Required for remote images; auto-inferred for statically imported local images |
| `fill` | `boolean` | Makes the image fill its parent container instead of using fixed dimensions |
| `placeholder="blur"` | `string` | Optional blur-up placeholder while loading (auto for static imports) |
| `images.remotePatterns` | `next.config.js` | Required allowlist of remote hostnames/paths before `<Image>` can load them |

## Notes

- `<Image>` auto-serves correctly sized images in modern formats (e.g. WebP), lazy-loads via native browser lazy loading, and prevents layout shift
- Dynamic `import()` of images inside a Server Component still yields automatic `width`/`height`/`blurDataURL`; the import path must include a static prefix
- Remote images must be explicitly allowlisted via `images.remotePatterns` in `next.config.js` for security

## Related

- [fonts](./fonts.md)
- [css](./css.md)
