# Installation

Installing and bootstrapping a React Router v8 Framework Mode project. This guide covers Framework Mode only; Data Mode and Declarative Mode have separate installation procedures.

## Signature / Usage

```bash
npx create-react-router@latest my-react-router-app
cd my-react-router-app
npm i
npm run dev
```

Visit `http://localhost:5173`.

### Template-based

```bash
npx create-react-router@latest --template remix-run/react-router-templates/<template-name>
```

Available templates: https://github.com/remix-run/react-router-templates

### Manual setup

For manual project configuration, use the [default template on GitHub](https://github.com/remix-run/react-router-templates/tree/main/default) as reference.

## Options / Props

| File | Role |
| --- | --- |
| `app/root.tsx` | Root route component |
| `app/routes.ts` | Route configuration |
| `react-router.config.ts` | Framework configuration |
| `entry.client.tsx` | Client entry point |
| `entry.server.tsx` | Server entry point |

## Notes

- Core dependency: `react-router` (v8+), plus `react`, `react-dom`
- Vite-based build system
- Framework Mode is configured via `react-router.config.ts`
- Three modes exist: Framework Mode / Data Mode / Declarative Mode — see [modes](./modes.md)
- No breaking changes to the installation flow between v7 and v8; the package major version moved to v8

## Related

- [modes](./modes.md)
- [routing](./routing.md)
- [route-module](./route-module.md)
- [rendering](./rendering.md)
- [react-router.config.ts](../conventions/react-router-config-ts.md)
