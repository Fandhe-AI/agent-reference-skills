---
source: https://developers.cloudflare.com/pages/tutorials/add-an-html-form-with-formspree/
---

# Add an HTML form with Formspree

Post a static HTML contact form to a Formspree endpoint, with no Functions code.

## Signature / Usage

Adapted (not in the official docs): the `pattern="[A-Za-z]+"` on the name field is removed and the endpoint is a placeholder; see Notes.

`public/index.html`:

```html
<html lang="en">
	<head>
		<meta charset="utf8" />
		<title>Form Demo</title>
		<meta name="viewport" content="width=device-width,initial-scale=1" />
	</head>
	<body>
		<form method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
			<label for="name">Full Name</label>
			<input id="name" type="text" name="name" required />

			<label for="email">Email Address</label>
			<input id="email" type="email" name="email" required />

			<label for="message">Message</label>
			<textarea id="message" name="message" required></textarea>

			<button type="submit">Submit</button>
		</form>
	</body>
</html>
```

Pages build settings for this site: Framework preset None, build command empty, build output directory `public`.

## Notes

- For new projects Cloudflare recommends Workers (cloudflare-workers skill, static assets); this sample targets an existing Pages project.
- Corrected from the official docs: the page's name input uses `pattern="[A-Za-z]+"`, which rejects spaces and so blocks a "Full Name" such as "Ada Lovelace". It also pastes a literal example form id; replace `YOUR_FORM_ID` with the id of your own Formspree form.
- Formspree (a third-party service) stores submissions and sends notifications; the form data leaves your Cloudflare project.
- Sign up at Formspree, create a form, and copy its Form Endpoint into `action`.

## Related

- [html-form-functions.md](./html-form-functions.md)
- [formspree-react-form.md](./formspree-react-form.md)
- [../references/platform-howto/get-started-git-integration.md](../references/platform-howto/get-started-git-integration.md)
