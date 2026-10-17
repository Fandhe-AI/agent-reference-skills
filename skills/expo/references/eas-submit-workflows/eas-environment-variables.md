---
source: https://docs.expo.dev/eas/environment-variables/
---

# Environment variables in EAS

An overview of how to use Expo Application Services (EAS) environment variables across builds, updates, workflows, and hosting.

## Signature / Usage

Create a variable with EAS CLI (here `EXPO_PUBLIC_API_URL` for the `production` environment):

```sh
eas env:set --name EXPO_PUBLIC_API_URL --value https://api.example.com --environment production --visibility plaintext
```

Use it in EAS Build by setting `environment` on the build profile:

```json
{
  "build": {
    "production": {
      "environment": "production"
    }
  }
}
```

Use it with EAS Update and EAS Hosting through the `--environment` flag:

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
| Sensitive | Obfuscated in EAS Build and Workflows job logs. A toggle makes them visible on the website. Readable in EAS CLI. |
| Secret | Not readable outside of the EAS servers (website and EAS CLI included). Obfuscated in EAS Build and Workflows job logs. |

### Scope

| Scope | Description |
| --- | --- |
| Project-wide | Specific to a single EAS project. Available in jobs that run on EAS servers and updates for the project; can be pulled locally if visibility allows. |
| Account-wide | Available across all projects in the EAS account; merged with project-wide variables for a project. |

### Variable types

| Type | Description |
| --- | --- |
| Strings | Standard key/value pairs usable across builds, updates, workflows, and hosting. |
| Files | Values uploaded as files (for example `google-services.json` or a certificate), exposed to jobs as file paths on the build runner. |

## Notes

- Default environments: `development`, `preview`, `production`. Custom environment names are available on Enterprise and Production plans.
- Local development loads `.env` / `.env.local`, which are usually not committed and therefore unavailable to remote jobs (EAS Build, EAS Workflows).
- Anything included in client-side code is public. Secret variables only provide values to an EAS Build or Workflows job (for example `NPM_TOKEN`); they add no security for values embedded in the app.
- Source modificationDate: July 21, 2026 (fetched 2026-10-17).

## Related

- [Create and manage environment variables in EAS](./eas-environment-variables-manage.md)
- [Using environment variables in EAS](./eas-environment-variables-usage.md)
- [Environment variables in EAS Workflows](./workflows-environment.md)
- [EAS CLI reference](./eas-cli.md)
