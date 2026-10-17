---
source: https://docs.expo.dev/eas/environment-variables/manage/
---

# Create and manage environment variables in EAS

Learn how to create, scope, and consume environment variables with the EAS dashboard and EAS CLI.

## Signature / Usage

Use `eas env:set` to add variables and `eas env:list` to verify what is set:

```sh
# Create a plain text environment variable for the preview environment
eas env:set --name EXPO_PUBLIC_API_URL --value https://example.app/staging --environment preview --visibility plaintext

# List all environment variables for the preview environment
eas env:list --environment preview
```

Manage and pull variables:

```sh
# To create or update an environment variable
eas env:set --name EXPO_PUBLIC_API_URL --value https://example.app/staging --environment production --visibility plaintext

# To delete an existing environment variable
eas env:delete

# To list all environment variables
eas env:list --environment production

# To pull environment variables into a .env file
eas env:pull --environment production
```

Use a secret file variable in app config, with a local fallback:

```js
export default {
  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? '/local/path/to/google-services.json',
  },
};
```

Custom environment (Enterprise and Production plans):

```sh
eas env:set --name EXPO_PUBLIC_API_URL --value https://example.app/staging --environment staging --visibility plaintext
```

## Notes

- When creating: choose one or more environments, a scope (project-wide or account-wide), and a visibility (secret / sensitive / plain text). Dashboard path: Project settings > Environment variables > Add Variables (name, value, environment(s), visibility, optional description).
- Variables with the `EXPO_PUBLIC_` prefix are available as `process.env` variables in app code. Do not put secrets in `EXPO_PUBLIC_` variables; everything in client bundles is readable by end users.
- Variables without the prefix can be used when resolving dynamic app config (for example an `APP_VARIANT` switch for name, package name, and bundle identifier). Keep visibility at least sensitive if you need to resolve config locally (plain text and sensitive are readable in EAS CLI; secrets stay on the server).
- `eas env:pull --environment production` writes `.env.local`; secret variables are written as a comment (`# GOOGLE_SERVICES_JSON=***** (secret variables are not available for reading)`). Keep generated `.env` files in `.gitignore`.
- A custom environment appears as a selectable option for all variables of the account or project as long as at least one variable is linked to it.
- Source modificationDate: July 21, 2026 (fetched 2026-10-17).

## Related

- [Environment variables in EAS](./eas-environment-variables.md)
- [Using environment variables in EAS](./eas-environment-variables-usage.md)
- [EAS CLI reference](./eas-cli.md)
