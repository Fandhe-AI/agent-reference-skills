---
source: https://docs.expo.dev/router/reference/src-directory/
---

# Top-level src directory

Use a top-level **src** directory in an Expo Router project. Projects created with the default template on SDK 55 and later already include **src** containing **app**, **components**, **constants**, and **hooks**; no extra configuration is needed. For custom templates or existing projects without **src**, follow these steps.

## Signature / Usage

Move the **app** directory to **src/app**:

```text
src
  app
    _layout.tsx
    index.tsx
  components
    button.tsx
package.json
```

Update TypeScript path aliases in **tsconfig.json** to point to **src**:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Restart the development server:

```sh
npx expo start

# Or export for production
npx expo export
```

### Custom directory

Dangerously customize the root directory with the Expo Router config plugin (here relative to the project root):

```json
{
  "plugins": [
    [
      "expo-router",
      {
        "root": "./src/routes"
      }
    ]
  ]
}
```

## Notes

- Config files (**app.config.ts**, **app.json**, **package.json**, **metro.config.js**, **tsconfig.json**) remain in the root directory.
- **src/app** takes precedence over the root **app** directory; only **src/app** is used if both exist.
- The **public** directory remains in the root directory.
- Static rendering automatically uses **src/app** if it exists.
- Changing the default root directory is highly discouraged; Expo will not accept bug reports for projects with custom root directories. Many tools assume the root is **app** or **src/app**, and only tools in the exact version of Expo CLI respect the config plugin.
- Source: https://docs.expo.dev/router/reference/src-directory/ (unversioned guide, fetched 2026-10-17, modificationDate July 28, 2026).

## Related

- [Typed routes](./typed-routes.md)
- [Testing](./testing.md)
