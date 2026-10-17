---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/eslint-plugin/README.md
---

# Tooling

Install commands and configuration for `@react-three/test-renderer` and `@react-three/eslint-plugin`.

## Install test-renderer (npm)

```sh
npm install @react-three/test-renderer --save-dev
```

Source: the Testing docs page (https://r3f.docs.pmnd.rs/api/testing). `@react-three/test-renderer` is test-library agnostic (works with jest, jasmine, etc.).

## Install test-renderer (yarn)

```sh
yarn add @react-three/fiber three
yarn add -D @react-three/test-renderer
```

Source: `packages/test-renderer/README.md` (https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/test-renderer/README.md).

## Install eslint-plugin

```sh
npm install @react-three/eslint-plugin --save-dev
```

## Configure eslint-plugin (recommended)

```json
"extends": [
  "plugin:@react-three/recommended"
]
```

`recommended` enables the default rules for all users. To enable every rule, use the `all` config by putting `"plugin:@react-three/all"` in `extends`.

## Configure eslint-plugin (individual rules)

```json
"plugins": [
  "@react-three"
]
```

```json
"rules": {
  "@react-three/no-clone-in-loop": "error"
}
```

Without a config, add `@react-three` to plugins and enable the rules you want individually. The README example writes `no-clone-in-frame-loop`, but the README Rules table and the CHANGELOG (0.1.0) use `no-clone-in-loop` / `no-new-in-loop`; the table's id is shown above.
