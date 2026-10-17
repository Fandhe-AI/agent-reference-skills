---
source: https://docs.expo.dev/build-reference/build-with-monorepos/
---

# Set up EAS Build with a monorepo

Learn how to set up EAS Build with a monorepo.

## Signature / Usage

- Run all EAS CLI commands from the root of the app directory (e.g. `apps/my-app`).
- Keep all EAS Build files such as **eas.json** and **credentials.json** in the root of the app directory; each app in the monorepo has its own copy.
- If the project needs additional setup, add a `postinstall` step to **package.json** that builds dependencies in other workspaces:

```json
{
  "scripts": {
    "postinstall": "cd ../.. && yarn build"
  }
}
```

## Notes

- For projects using Continuous Native Generation (CNG) in a monorepo, see the Expo "Working with Monorepos" guide (configuration/monorepos.md).
- Source modificationDate: June 26, 2026 (fetched 2026-10-17).

## Related

- [Configure EAS Build with eas.json](./build-eas-json.md)
