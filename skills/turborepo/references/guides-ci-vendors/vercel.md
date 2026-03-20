# Vercel

Turborepo と Vercel の統合はゼロコンフィグ。Vercel が自動的にモノレポ構造を認識し、Remote Cache も自動で構成される。

## デプロイ手順

1. https://vercel.com/new でプロジェクトを新規作成
2. コードをインポート
3. Vercel が自動的に Turborepo を検出し、正しい設定を適用

`TURBO_TOKEN` / `TURBO_TEAM` の手動設定は不要。
