---
source: https://docs.cloud.google.com/identity-platform/docs/sign-in-user-email
---

# Sign in a user with an email by using Identity Platform

Quickstart that enables Identity Platform, configures the Email/Password provider, creates a user in the Google Cloud console and signs the user in with the Web SDK. The source recommends the v9 (modular) SDK, especially for production apps.

## Signature / Usage

### Enable Identity Platform and configure the provider

In the Google Cloud console: open the Identity Platform page in Cloud Marketplace and click **Enable Identity Platform**. On the **Identity Providers** page click **Add a provider**, select **Email/Password**, turn **Enabled** on and click **Save**. On the **Users** page click **Add user** and enter an email and password (note both for the sign-in step).

### Install the SDK (v9, modular)

```bash
npm install firebase
```

### Initialize Firebase

```javascript
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN"
};

const app = initializeApp(firebaseConfig);
```

### Sign in the user

```javascript
import { initializeApp } from 'firebase/app';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {/* extra options */ });

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          document.getElementById("message").innerHTML = "Welcome, " + user.email;
      }
      else {
          document.getElementById("message").innerHTML = "No user signed in.";
      }
  });
  signIn();
});

function signIn() {
  const email = "EMAIL_ID";
  const password = "PASSWORD";
  signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
          document.getElementById("message").innerHTML = error.message;
      });
}
```

### Import the bundled script into the page

```html
<script defer src="js/bundled.js"></script>
<div>Identity Platform Quickstart</div>
<div id="message">Loading...</div>
```

## Options / Props

| Placeholder | Value |
|---|---|
| `API_KEY` | The `apiKey` of your Firebase project. |
| `AUTH_DOMAIN` | The `authDomain` of your Firebase project. |
| `EMAIL_ID` | The user email address created earlier in the guide. |
| `PASSWORD` | The user password created earlier in the guide. |

## Notes

- Avoid using multiple API keys in your Firebase project if its application restrictions are set to `None` or `Websites`; this can make key selection ambiguous and disrupt user-facing workflows.
- Use a module bundler for production (tree-shaking). Framework CLIs such as Angular CLI, Next.js, Vue CLI and Create React App bundle automatically; the source's browser-module import from `gstatic.com` is described as a quick way to get started only.
- There is a limit on unsuccessful sign-in attempts: several rapid unsuccessful attempts temporarily lock the user out of their account. Other limits are on the Identity Platform quotas page.
- The hard-coded email and password in the sample are for the quickstart only; real apps should collect credentials from a registration and sign-in page (or the pre-built FirebaseUI) and never hard-code them.
- Clean up: delete the provider and the user from the console (**Identity Providers** and **Users** pages). Deleting the project deletes everything in it and loses custom project IDs; this is irreversible, so use a disposable project.
- Console click-paths, the legacy SDK v8 flow (`firebase.auth()` with copied Application setup details) and module-bundler steps are omitted; see the source page.
- Source: https://docs.cloud.google.com/identity-platform/docs/sign-in-user-email (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-authentication.md](./concepts-authentication.md)
- [oidc.md](./oidc.md)
- [blocking-functions.md](./blocking-functions.md)
