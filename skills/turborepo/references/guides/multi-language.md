# 多言語サポート

Turborepo はスクリプトの実行内容には関与しない設計のため、Rust や Go 等も統合可能。

## ワークスペース定義への追加

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
  - "cli"
```

## package.json によるラッピング

```json
{
  "name": "@repo/rust-cli",
  "scripts": { "build": "cargo build --release" }
}
```

## キャッシング設定

```json
{ "tasks": { "build": { "outputs": ["target/release/**"] } } }
```

## 依存関係の定義

```json
{ "dependencies": { "@repo/rust-cli": "workspace:*" } }
```

非 JS ツールチェーン（Rust, Go 等）は別途インストール済みである必要がある。
