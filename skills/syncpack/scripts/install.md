# Install

syncpack のインストールとセットアップ

## npx で試す（インストール不要）

```sh
npx syncpack list --dependency-types prod
```

モノレポルートで実行する。インストールなしで動作確認できる。

## npm でインストール

```sh
npm install syncpack --save-dev
```

## ローカルインストール済みバイナリの実行

```sh
npm exec syncpack -- list
```

## 設定ファイルの作成

`.syncpackrc` をリポジトリルートに作成する。JSON / YAML / JS / TS / MJS / CJS いずれかの形式で記述する。

```sh
# package.json の syncpack プロパティに設定を埋め込む場合は追加ファイル不要
# カスタムパスを指定する場合（拡張子必須）
syncpack list --config ./config/syncpack.json
```
