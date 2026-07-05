# Videos

Recommendations and best practices for embedding and self-hosting videos in a Next.js application without hurting performance.

## Signature / Usage

```jsx filename="app/ui/video.jsx"
export function Video() {
  return (
    <video width="320" height="240" controls preload="none">
      <source src="/path/to/video.mp4" type="video/mp4" />
      <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  )
}
```

```jsx filename="app/page.jsx"
import { Suspense } from 'react'
import VideoComponent from '../ui/VideoComponent.jsx'

export default function Page() {
  return (
    <Suspense fallback={<p>Loading video...</p>}>
      <VideoComponent />
    </Suspense>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `<video>` `preload` | `'none' \| 'metadata' \| 'auto'` | Controls preloading strategy |
| `<video>` `autoPlay` / `muted` / `playsInline` | `boolean` | Use together for reliable autoplay across browsers, including iOS Safari |
| `<video>` `<track>` | element | Adds subtitles/captions via `kind="subtitles"` |
| `<iframe>` `loading` | `'lazy' \| 'eager'` | Loading behavior for platform-hosted embeds (YouTube, Vimeo) |

## Notes

- Two embedding strategies: `<video>` for self-hosted/direct files (full control), `<iframe>` for platform-hosted videos (YouTube, Vimeo — less control, easier setup).
- Wrap a Server Component that resolves the video source (`getVideoSrc()`/blob URL) in `<Suspense>` so the rest of the page isn't blocked while the video URL resolves.
- Self-hosting via Vercel Blob: upload the file, then fetch its URL with `@vercel/blob`'s `list()` inside an async Server Component and pass it to `<source src={url}>`.
- Provide fallback content inside `<video>` and captions via `<track>` for accessibility.
- Third-party integrations available: `next-video`, Cloudinary (`<CldVideoPlayer>`), Mux, Fastly, ImageKit (`<IKVideo>`).

## Related

- [Third Party Libraries](./third-party-libraries.md)
- [Streaming](./streaming.md)
