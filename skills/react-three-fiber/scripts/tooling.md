---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/eslint-plugin/README.md
---

# Tooling

`@react-three/test-renderer` と `@react-three/eslint-plugin` の導入コマンドと設定。

## test-renderer のインストール（npm）

```sh
npm install @react-three/test-renderer --save-dev
```

出典は docs の Testing ページ（https://r3f.docs.pmnd.rs/api/testing）。`@react-three/test-renderer` はテストライブラリ非依存（jest / jasmine 等で使える）。

## test-renderer のインストール（yarn）

```sh
yarn add @react-three/fiber three
yarn add -D @react-three/test-renderer
```

出典は `packages/test-renderer/README.md`（https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/test-renderer/README.md）。

## eslint-plugin のインストール

```sh
npm install @react-three/eslint-plugin --save-dev
```

## eslint-plugin の設定（recommended）

```json
"extends": [
  "plugin:@react-three/recommended"
]
```

`recommended` は全利用者向けの既定ルールを有効化する。全ルールを有効にする `all` 設定は `"plugin:@react-three/all"` を `extends` に指定する。

## eslint-plugin の設定（個別ルール）

```json
"plugins": [
  "@react-three"
]
```

```json
"rules": {
  "@react-three/no-clone-in-frame-loop": "error"
}
```

config を使わない場合は plugins に `@react-three` を追加し、使いたいルールを個別に有効化する。上記は README の例示をそのまま転記したもの。README の Rules 表のルール名は `no-clone-in-loop` / `no-new-in-loop` で、例示のルール名と一致しない（要確認）。
