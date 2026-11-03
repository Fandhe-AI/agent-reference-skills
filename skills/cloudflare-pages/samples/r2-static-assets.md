---
source: https://developers.cloudflare.com/pages/tutorials/use-r2-as-static-asset-storage-for-pages/
---

# Use R2 as static asset storage with Cloudflare Pages

Serve large media files from an R2 bucket through a Pages Function, to get around the Pages file count and file size limits.

## Signature / Usage

Create the bucket and upload a file. Bucket creation is remote; `r2 object put` writes to the local simulator unless `--remote` is given, so add it to upload to the real bucket:

```sh
npx wrangler r2 bucket create cat-media
npx wrangler r2 object put cat-media/videos/video1.mp4 -f ~/Downloads/videos/video1.mp4 --remote
```

Bind the bucket in the Wrangler configuration file (`ASSETS` is a reserved binding name).

Adapted (not in the official docs): `name`, `pages_build_output_dir` and `compatibility_date` are added, since `wrangler pages deploy` needs a Pages configuration file with `pages_build_output_dir`; see Notes. The jsonc and toml blocks are equivalent.

```jsonc
{
	"name": "cat-media-site",
	"pages_build_output_dir": "./public",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"r2_buckets": [
		{
			"binding": "MEDIA",
			"bucket_name": "cat-media"
		}
	]
}
```

```toml
name = "cat-media-site"
pages_build_output_dir = "./public"
# Set this to today's date
compatibility_date = "2026-11-03"

[[r2_buckets]]
binding = "MEDIA"
bucket_name = "cat-media"
```

Project layout:

```plaintext
.
├── functions
│   └── media
│       └── [[all]].js
├── public
│   ├── index.html
│   ├── static
│   │   ├── favicon.ico
│   │   └── icon.png
│   └── style.css
└── wrangler.jsonc
```

Adapted (not in the official docs): URL-decodes the key (returning 400 on malformed encoding), falls back to a generic content type, and adds a `Cache-Control` header; see Notes.

`functions/media/[[all]].js`:

```js
export async function onRequestGet(ctx) {
	const pathname = new URL(ctx.request.url).pathname;
	let path;
	try {
		path = decodeURIComponent(pathname.replace("/media/", ""));
	} catch {
		return new Response("Bad request", { status: 400 });
	}
	const file = await ctx.env.MEDIA.get(path);
	if (!file) return new Response(null, { status: 404 });
	return new Response(file.body, {
		headers: {
			"Content-Type":
				file.httpMetadata?.contentType ?? "application/octet-stream",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
```

`public/index.html` referencing the media:

```html
<!doctype html>
<html lang="en">
	<body>
		<h1>Awesome Cat Blog! 😺</h1>
		<p>Today's post:</p>
		<video width="320" controls>
			<source src="/media/videos/video1.mp4" type="video/mp4" />
		</video>
		<p>Yesterday's post:</p>
		<img src="/media/images/cat1.jpg" width="320" />
	</body>
</html>
```

Deploy:

```sh
npx wrangler pages deploy
```

## Notes

- For new projects Cloudflare recommends Workers (cloudflare-workers skill, static assets); this sample targets an existing Pages project.
- Adapted from the official docs: the tutorial deploys with `npx wrangler deploy`, which is the Workers command; a Pages project uses `wrangler pages deploy` and needs `pages_build_output_dir` (for example `"./public"`) in the Wrangler configuration file; the configuration blocks above include it (and `name` / `compatibility_date`), which the official `r2_buckets`-only snippet lacked. `--remote` was added to the upload command because `wrangler r2 object put` defaults to local storage.
- Adapted from the official docs: the original handler read `file.httpMetadata.contentType` unguarded (an object without a stored content type produced an invalid header) and did not decode percent-encoded keys; the `Cache-Control` value is a suggestion, not part of the source.
- The bucket can also be bound in the dashboard under Settings > Functions > R2 bucket bindings.
- This handler serves every key in the bucket under `/media/`; do not put private objects in a bucket exposed this way. Range requests are not handled, so large video seeking relies on the browser's full download.

## Related

- [../references/functions/bindings-data.md](../references/functions/bindings-data.md)
- [../references/functions/routing.md](../references/functions/routing.md)
- [../references/platform-howto/limits.md](../references/platform-howto/limits.md)
