---
source: https://docs.expo.dev/eas/environment-variables/
---

# Environment variables in Expo Services

An overview of how to use Expo Services environment variables across builds, updates, workflows, and hosting.

## Signature / Usage

Create a variable with EAS CLI (here `EXPO_PUBLIC_API_URL` for the `production` environment):

```sh
eas env:set --name EXPO_PUBLIC_API_URL --value https://api.example.com --environment production --visibility plaintext
```

Use it in Expo Build by setting `environment` on the build profile:

```json
{
  "build": {
    "production": {
      "environment": "production"
    }
  }
}
```

Use it with Expo Update and Expo Hosting through the `--environment` flag:

```sh
eas update --environment production

eas env:pull --environment production
npx expo export --platform web
eas deploy --environment production
```

## Options / Props

### Visibility

| Visibility | Description |
| --- | --- |
| Plain text | Visible on the website, in EAS CLI, and in logs. |
| Sensitive | Obfuscated in Expo Build and Workflows job logs. A toggle makes them visible on the website. Readable in EAS CLI. |
| Secret | Not readable outside of the Expo servers (website and EAS CLI included). Obfuscated in Expo Build and Workflows job logs. |

### Scope

| Scope | Description |
| --- | --- |
| Project-wide | Specific to a single Expo Services project. Available in jobs that run on Expo servers and updates for the project; can be pulled locally if visibility allows. |
| Account-wide | Available across all projects in the Expo account; merged with project-wide variables for a project. |

### Variable types

| Type | Description |
| --- | --- |
| Strings | Standard key/value pairs usable across builds, updates, workflows, and hosting. |
| Files | Values uploaded as files (for example `google-services.json` or a certificate), exposed to jobs as file paths on the build runner. |

## Notes

- Default environments: `development`, `preview`, `production`. Custom environment names are available on Enterprise and Production plans.
- Local development loads `.env` / `.env.local`, which are usually not committed and therefore unavailable to remote jobs (Expo Build, Expo Workflows).
- Anything included in client-side code is public. Secret variables only provide values to an Expo Build or Workflows job (for example `NPM_TOKEN`); they add no security for values embedded in the app.
- Source modificationDate: July 21, 2026 (fetched 2026-10-17).
- Source: https://docs.expo.dev/eas/environment-variables/ (docs/pages/eas/environment-variables/index.mdx at tag expo@58.0.25).

## Related

- [Create and manage environment variables in Expo Services](./eas-environment-variables-manage.md)
- [Using environment variables in Expo Services](./eas-environment-variables-usage.md)
- [Environment variables in Expo Workflows](./workflows-environment.md)
- [EAS CLI reference](./eas-cli.md)
