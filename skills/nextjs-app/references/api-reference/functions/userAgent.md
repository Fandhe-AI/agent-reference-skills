# userAgent

`userAgent` extends the Web Request API with additional properties/methods to interact with the user agent of a request, typically used in Proxy/middleware.

## Signature / Usage

```ts
import { NextRequest, NextResponse, userAgent } from 'next/server'

export function proxy(request: NextRequest) {
  const url = request.nextUrl
  const { device } = userAgent(request)
  const viewport = device.type || 'desktop'
  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}
```

## Options / Props

| Property | Fields | Description |
| --- | --- | --- |
| `isBot` | `boolean` | Whether the request is from a known bot. |
| `browser` | `{ name?, version? }` | Browser name/version. |
| `device` | `{ model?, type?, vendor? }` | `type` is one of `console`, `mobile`, `tablet`, `smarttv`, `wearable`, `embedded`, or `undefined` (desktop). |
| `engine` | `{ name?, version? }` | Browser engine (e.g. `Blink`, `Gecko`, `WebKit`, `Trident`). |
| `os` | `{ name?, version? }` | Operating system name/version. |
| `cpu` | `{ architecture? }` | CPU architecture (e.g. `amd64`, `arm64`, `ia32`). |

## Related

- [NextRequest](./NextRequest.md)
- [NextResponse](./NextResponse.md)
