---
source: https://developers.cloudflare.com/pages/migrations/migrating-from-workers/
---

# Migrating from Workers Sites to Pages

Move a Workers Sites application to Pages: drop the site Worker, carry over redirects and headers, record the build settings.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/pages/configuration/redirects/ (`_redirects` file in the output directory):

```txt
/home301 / 301
/home302 / 302
/querystrings /?query=string 301
/twitch https://twitch.tv
/trailing /trailing/ 301
/notrailing/ /nottrailing 301
/page/ /page2/#fragment 301
/blog/* https://blog.my.domain/:splat
/products/:code/:name /products?code=:code&name=:name
```

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Remove the Workers application (`workers-site`) and Wrangler config; record the `build` command and the `bucket` build directory.
- Custom behavior (such as caching logic) can move to Pages Functions with file-based routing. For a complex Worker use a `_worker.js` file in the output directory (module Worker syntax); then the entire `/functions` directory is ignored.
- Redirects: `_redirects` in the output directory (limits: 2,000 static + 100 dynamic = 2,100; 1,000 characters each; malformed ignored; top-most wins; static before dynamic); Bulk Redirects beyond that. Headers: `_headers` file, not applied to Functions responses.
- Create the Pages project from Git, or use Direct Upload with prebuilt assets. Delete the old Workers routes before deploying so requests reach Pages; delete the Worker afterwards from **Manage** > **Delete Worker**.
- A custom domain can match the Workers application's domain.

## Related

- [Redirects](../configuration/redirects.md)
- [Headers](../configuration/headers.md)
- [Get started with Direct Upload](./get-started-direct-upload.md)
