# Language Middleware

Detects the user's preferred language from query parameters, cookies, or the `Accept-Language` header. Stores the result in `c.get('language')`.

## Signature / Usage

```ts
import { languageDetector } from 'hono/language'

app.use(languageDetector({
  supportedLanguages: ['en', 'ja', 'fr'],
  fallbackLanguage: 'en',
}))

app.get('/', (c) => c.text(`Language: ${c.get('language')}`))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `supportedLanguages` | `string[]` | — | **Required.** Permitted language codes; must include `fallbackLanguage` |
| `fallbackLanguage` | `string` | — | **Required.** Default language when detection fails |
| `order` | `DetectorType[]` | `['querystring','cookie','header']` | Detection order: `querystring`, `cookie`, `header`, `path` |
| `lookupQueryString` | `string` | `'lang'` | Query parameter name |
| `lookupCookie` | `string` | `'language'` | Cookie name |
| `lookupFromHeaderKey` | `string` | `'accept-language'` | HTTP header name |
| `lookupFromPathIndex` | `number` | `0` | URL path segment index for language code |
| `caches` | `CacheType[] \| false` | `['cookie']` | Where to cache the detected language |
| `cookieOptions` | `object` | — | Cookie options: `domain`, `sameSite`, `secure`, `maxAge`, `httpOnly`, `path` |
| `ignoreCase` | `boolean` | `true` | Case-insensitive language matching |
| `convertDetectedLanguage` | `(lang: string) => string` | — | Transform detected language codes before matching |
| `debug` | `boolean` | `false` | Log detection steps to console |

## Notes

- `fallbackLanguage` must exist in `supportedLanguages` or initialization fails.
- Progressive locale matching is applied: `ja-JP` matches `ja` when an exact match is unavailable.
- Failed detections silently use `fallbackLanguage`.
