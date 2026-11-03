---
source: https://developers.cloudflare.com/pages/tutorials/add-a-react-form-with-formspree/
---

# Add a React form with Formspree

Handle a React contact form with the `@formspree/react` `useForm` hook and switch form ids per Pages environment.

## Signature / Usage

Install the helper:

```sh
npm i @formspree/react
```

`src/ContactForm.js`:

```jsx
import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
	const [state, handleSubmit] = useForm("YOUR_FORM_ID");

	if (state.succeeded) {
		return <p>Thanks for your submission!</p>;
	}

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<label htmlFor="name">Full Name</label>
			<input id="name" type="text" name="name" required />
			<ValidationError prefix="Name" field="name" errors={state.errors} />

			<label htmlFor="email">Email Address</label>
			<input id="email" type="email" name="email" required />
			<ValidationError prefix="Email" field="email" errors={state.errors} />

			<label htmlFor="message">Message</label>
			<textarea id="message" name="message" required></textarea>
			<ValidationError prefix="Message" field="message" errors={state.errors} />

			<button type="submit" disabled={state.submitting}>
				Submit
			</button>
			<ValidationError errors={state.errors} />
		</form>
	);
}
```

Use the component in `src/App.js`:

```jsx
import ContactForm from "./ContactForm"; // <-- import the form component
import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>

				{/* your contact form component goes here */}
				<ContactForm />
			</header>
		</div>
	);
}

export default App;
```

Use one form id per Pages environment by reading it from an environment variable:

```jsx
const [state, handleSubmit] = useForm(process.env.REACT_APP_FORM_ID);
```

Set `REACT_APP_FORM_ID` in the Pages project settings: the production form id for Production, a test form id for Preview. Build settings: Framework preset Create React App, build command `npm run build`, output directory `build`.

## Notes

- For new projects Cloudflare recommends Workers (cloudflare-workers skill, static assets); this sample targets an existing Pages project.
- Replace `YOUR_FORM_ID` with the `hashid` of your own Formspree form.
- `REACT_APP_` is the Create React App prefix that exposes a variable to front-end code; other frameworks use another prefix (for example `NEXT_PUBLIC_` for Next.js). The value is embedded in the public bundle, so only put non-secret ids there.
- Create React App is the tutorial's choice; the same hook works in any React framework.
- Preview deployments built from other branches then submit to the test form while production keeps the original.

## Related

- [formspree-html-form.md](./formspree-html-form.md)
- [../references/configuration/preview-deployments.md](../references/configuration/preview-deployments.md)
- [../references/functions/bindings-env-secrets.md](../references/functions/bindings-env-secrets.md)
