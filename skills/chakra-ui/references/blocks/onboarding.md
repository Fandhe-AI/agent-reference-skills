# Onboarding

Components for onboarding new users to your platform.

> **Note:** Blocks require `CHAKRA_PRO_API_KEY` environment variable. If not set, block features are unavailable.

## Group

application

## When to Use

- 新規ユーザー向けのオンボーディングフローを構築するとき
- チェックリスト形式のセットアップガイドが必要なとき
- 画像や動画付きのウェルカム画面を作るとき
- ワークスペース作成・初期設定ウィザードが必要なとき
- ステップバイステップの初回設定フローを実装するとき

## MCP Parameters

Tool: `get_component_templates`

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | 固定値: `"onboarding"` |
| `id` | `string` | 取得するバリアントの ID |

## Variants

| ID | Name | Access |
|----|------|--------|
| `onboarding-simple-01` | Onboarding Simple 01 | paid |
| `onboarding-simple-02` | Onboarding Simple 02 | paid |
| `onboarding-simple-03` | Onboarding Simple 03 | paid |
| `onboarding-with-checklist` | Onboarding With Checklist | paid |
| `onboarding-with-image-01` | Onboarding With Image 01 | paid |
| `onboarding-with-image-02` | Onboarding With Image 02 | paid |
| `onboarding-with-image-03` | Onboarding With Image 03 | paid |
| `onboarding-with-image-04` | Onboarding With Image 04 | paid |
| `onboarding-with-video` | Onboarding With Video | paid |
| `onboarding-workspace-01` | Onboarding Workspace 01 | paid |
| `onboarding-workspace-02` | Onboarding Workspace 02 | paid |
| `onboarding-workspace-03` | Onboarding Workspace 03 | paid |
| `onboarding-workspace-04` | Onboarding Workspace 04 | paid |
| `onboarding-workspace-05` | Onboarding Workspace 05 | paid |
