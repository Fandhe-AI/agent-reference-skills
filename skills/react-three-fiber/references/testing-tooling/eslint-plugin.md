---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/eslint-plugin/README.md
---

# @react-three/eslint-plugin (Installation / Configuration / Rules / Shareable configs)

An ESLint plugin which provides lint rules for @react-three/fiber.

## Signature / Usage

```bash
npm install @react-three/eslint-plugin --save-dev
```

Use the recommended config to get reasonable defaults:

```json
"extends": [
  "plugin:@react-three/recommended"
]
```

If you do not use a config you will need to specify individual rules and add extra configuration. Add "@react-three" to the plugins section:

```json
"plugins": [
  "@react-three"
]
```

Enable the rules that you would like to use:

```json
"rules": {
  "@react-three/no-clone-in-loop": "error"
}
```

## Options / Props

| Name | Description |
|------|-------------|
| [no-clone-in-loop](./eslint-no-clone-in-loop.md) | Disallow cloning vectors in the frame loop which can cause performance problems. |
| [no-new-in-loop](./eslint-no-new-in-loop.md) | Disallow instantiating new objects in the frame loop which can cause performance problems. |
| `recommended` (config) | Enforces rules appropriate for everyone using React Three Fiber (`plugin:@react-three/recommended`). |
| `all` (config) | Includes every available rule (`plugin:@react-three/all`). |

## Notes

- Both rules are enabled in `recommended`; neither is auto-fixable nor has editor suggestions.
- The README's configuration example writes `no-clone-in-frame-loop`, but the README Rules table and the CHANGELOG (0.1.0: rules `no-clone-in-loop` and `no-new-in-loop`) use `no-clone-in-loop`; that id is shown here.

## Related

- [no-clone-in-loop](./eslint-no-clone-in-loop.md)
- [no-new-in-loop](./eslint-no-new-in-loop.md)
