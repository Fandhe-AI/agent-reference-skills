---
source: https://developers.cloudflare.com/pages/tutorials/localize-a-website/
---

# Localize a website with HTMLRewriter

Translate static HTML per request with HTMLRewriter, choosing the language from the `Accept-Language` header.

## Signature / Usage

Static markup marks translatable elements with `data-i18n-key` (source clipped from the example site):

```html
<!-- source clipped from i18n-example site -->

<div class="inner">
	<h1 data-i18n-key="headline">Example Site</h1>
	<p data-i18n-key="subtitle">This is my example site. Depending o...</p>
	<p data-i18n-key="disclaimer">Disclaimer: the initial translations...</p>
</div>
```

Install the header parser:

```sh
npm i accept-language-parser
```

Adapted (not in the official docs): the rewritten response gets `Vary: Accept-Language`, since the body depends on that request header; see Notes.

`functions/index.js`:

```js
import parser from "accept-language-parser";

// do not set to true in production!
const DEBUG = false;

const strings = {
	de: {
		title: "Beispielseite",
		headline: "Beispielseite",
		subtitle:
			"Dies ist meine Beispielseite. Abhängig davon, wo auf der Welt Sie diese Site besuchen, wird dieser Text in die entsprechende Sprache übersetzt.",
		disclaimer:
			"Haftungsausschluss: Die anfänglichen Übersetzungen stammen von Google Translate, daher sind sie möglicherweise nicht perfekt!",
		tutorial:
			"Das Tutorial für dieses Projekt finden Sie in der Cloudflare Workers-Dokumentation.",
		copyright: "Design von HTML5 UP.",
	},
	ja: {
		title: "サンプルサイト",
		headline: "サンプルサイト",
		subtitle:
			"これは私の例のサイトです。 このサイトにアクセスする世界の場所に応じて、このテキストは対応する言語に翻訳されます。",
		disclaimer:
			"免責事項：最初の翻訳はGoogle翻訳からのものですので、完璧ではないかもしれません！",
		tutorial:
			"Cloudflare Workersのドキュメントでこのプロジェクトのチュートリアルを見つけてください。",
		copyright: "HTML5 UPによる設計。",
	},
};

class ElementHandler {
	constructor(countryStrings) {
		this.countryStrings = countryStrings;
	}

	element(element) {
		const i18nKey = element.getAttribute("data-i18n-key");
		if (i18nKey) {
			const translation = this.countryStrings[i18nKey];
			if (translation) {
				element.setInnerContent(translation);
			}
		}
	}
}

export async function onRequest(context) {
	const { request, env } = context;
	try {
		let options = {};
		if (DEBUG) {
			options = {
				cacheControl: {
					bypassCache: true,
				},
			};
		}
		const languageHeader = request.headers.get("Accept-Language");
		const language = parser.pick(["de", "ja"], languageHeader);
		const countryStrings = strings[language] || {};

		const response = await env.ASSETS.fetch(request);
		const rewritten = new HTMLRewriter()
			.on("[data-i18n-key]", new ElementHandler(countryStrings))
			.transform(response);
		const result = new Response(rewritten.body, rewritten);
		result.headers.append("Vary", "Accept-Language");
		return result;
	} catch (e) {
		if (DEBUG) {
			return new Response(e.message || e.toString(), {
				status: 404,
			});
		} else {
			return env.ASSETS.fetch(request);
		}
	}
}
```

Wrangler configuration file (static assets served from `./public`):

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "i18n-example",
	"pages_build_output_dir": "./public",
	// Set this to today's date
	"compatibility_date": "2026-11-03"
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "i18n-example"
pages_build_output_dir = "./public"
# Set this to today's date
compatibility_date = "2026-11-03"
```

`package.json` scripts, then deploy:

```json
"scripts": {
  "dev": "wrangler pages dev",
  "deploy": "wrangler pages deploy"
}
```

```sh
npm run deploy
```

## Notes

- For new projects Cloudflare recommends Workers (cloudflare-workers skill, static assets); this sample targets an existing Pages project.
- `env.ASSETS.fetch(request)` fetches the static asset of the Pages project; `HTMLRewriter` then rewrites that response in the stream.
- `parser.pick(["de", "ja"], header)` returns `null` when no supported language matches, so `strings[language] || {}` leaves the page untranslated.
- `options` and `DEBUG` come from the official code and are not passed to `ASSETS.fetch`, so `DEBUG` only changes the error response. Keep `DEBUG` false in production because it returns `e.message` to clients.
- Adapted from the official docs: the response varies by `Accept-Language`, so the handler adds `Vary: Accept-Language` (the official code returns the rewritten response without it); a cache in front could otherwise serve one language to everyone.
- The function at `functions/index.js` only handles `/`.
- The tutorial scaffolds with `npm create cloudflare@latest -- i18n-example` (React framework starter, deploy: No), then replaces `public/` with the HTML5 UP template and removes `src/`.

## Related

- [../references/functions/event-context.md](../references/functions/event-context.md)
- [../references/functions/local-development.md](../references/functions/local-development.md)
- [../references/platform-howto/get-started-c3.md](../references/platform-howto/get-started-c3.md)
