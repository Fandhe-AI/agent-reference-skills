# Extensions

GitHub CLI 拡張機能の管理コマンド。

## 拡張機能のインストール

```sh
gh extension install OWNER/gh-EXTENSION-NAME
```

## ローカルからインストール（開発時）

```sh
gh extension install .
```

拡張機能ディレクトリ内で実行する。

## 拡張機能の一覧表示

```sh
gh extension list
```

## 拡張機能の検索

```sh
gh search repos --topic gh-extension --sort stars
```

## 拡張機能ブラウザの表示

```sh
gh ext browse
```

## 全拡張機能のアップグレード

```sh
gh extension upgrade --all
```

## 特定の拡張機能のアップグレード

```sh
gh extension upgrade EXTENSION-NAME
```

## 拡張機能のアンインストール

```sh
gh extension remove EXTENSION-NAME
```
