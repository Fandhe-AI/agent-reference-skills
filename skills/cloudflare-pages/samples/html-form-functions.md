---
source: https://developers.cloudflare.com/pages/tutorials/forms/
---

# Create a HTML form

Post a plain HTML form to a Pages Function that parses `FormData` and echoes it as JSON, keeping repeated keys.

## Signature / Usage

Project layout:

```txt
├── functions
│   └── api
│       └── submit.js
└── public
    └── index.html
```

`public/index.html`:

```html
<html lang="en">
	<head>
		<meta charset="utf8" />
		<title>Form Demo</title>
		<meta name="viewport" content="width=device-width,initial-scale=1" />
	</head>
	<body>
		<form method="POST" action="/api/submit">
			<div class="input">
				<label for="name">Full Name</label>
				<input id="name" name="name" type="text" />
			</div>

			<div class="input">
				<label for="email">Email Address</label>
				<input id="email" name="email" type="email" />
			</div>

			<div class="input">
				<label for="referers">How did you hear about us?</label>
				<select id="referers" name="referers">
					<option hidden disabled selected value></option>
					<option value="Facebook">Facebook</option>
					<option value="Twitter">Twitter</option>
					<option value="Google">Google</option>
					<option value="Bing">Bing</option>
					<option value="Friends">Friends</option>
				</select>
			</div>

			<div class="checklist">
				<label>What are your favorite movies?</label>
				<ul>
					<li>
						<input id="m1" type="checkbox" name="movies" value="Space Jam" />
						<label for="m1">Space Jam</label>
					</li>
					<li>
						<input
							id="m2"
							type="checkbox"
							name="movies"
							value="Little Rascals"
						/>
						<label for="m2">Little Rascals</label>
					</li>
					<li>
						<input id="m3" type="checkbox" name="movies" value="Frozen" />
						<label for="m3">Frozen</label>
					</li>
					<li>
						<input id="m4" type="checkbox" name="movies" value="Home Alone" />
						<label for="m4">Home Alone</label>
					</li>
				</ul>
			</div>

			<button type="submit">Submit</button>
		</form>
	</body>
</html>
```

`functions/api/submit.js`:

```js
/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
	try {
		let input = await context.request.formData();

		// Convert FormData to JSON
		// NOTE: Allows multiple values per key
		let output = {};
		for (let [key, value] of input) {
			let tmp = output[key];
			if (tmp === undefined) {
				output[key] = value;
			} else {
				output[key] = [].concat(tmp, value);
			}
		}

		let pretty = JSON.stringify(output, null, 2);
		return new Response(pretty, {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		});
	} catch (err) {
		return new Response("Error parsing JSON content", { status: 400 });
	}
}
```

Serve locally and deploy with Wrangler (build output directory is `public`, no build command):

```sh
npx wrangler pages dev public
npx wrangler pages deploy public
```

## Notes

- For new projects Cloudflare recommends Workers (cloudflare-workers skill, static assets); this sample targets an existing Pages project.
- `Request.formData()` parses both `application/x-www-form-urlencoded` and `multipart/form-data` (the latter needs `enctype="multipart/form-data"` on the form).
- `Object.fromEntries` would drop all but one `movies` checkbox value, hence the manual loop.
- The handler echoes the submission and has no authentication or CSRF protection; treat it as a demo and add validation before storing data.
- File inputs yield `File` objects, which `JSON.stringify` renders as `{}`.
- `wrangler pages dev` / `deploy` commands are shown for convenience; the tutorial itself deploys through Git integration with Framework preset None and output directory `public`.

## Related

- [../references/functions/routing.md](../references/functions/routing.md)
- [../references/functions/get-started.md](../references/functions/get-started.md)
- [formspree-html-form.md](./formspree-html-form.md)
