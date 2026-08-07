# Upgrade

Vercel CLI 本体のアップグレード・自動更新管理

## CLI のアップグレード

インストールに使われたパッケージマネージャーを検出し、最新版へアップグレード。

```sh
vercel upgrade
```

## 実行内容のプレビュー

実際には変更を加えず、実行されるコマンドのみ表示。

```sh
vercel upgrade --dry-run
```

## 自動更新の有効化・無効化

```sh
vercel upgrade --enable-auto
```

```sh
vercel upgrade --disable-auto
```

## アップグレード計画を JSON で取得

`--dry-run` を暗黙的に含む（実際のアップグレードは行われない）。

```sh
vercel upgrade --format=json
```
