# AI プロンプト・MCP 連携

AI ツールと Supabase の連携方法。

## 概要

Supabase は AI コーディングツール（Cursor, Claude, v0, Lovable 等）との連携をサポート。プロンプトガイドと MCP（Model Context Protocol）サーバーを提供する。

## AI プロンプト

Supabase プロジェクトで AI ツールを使う際のプロンプトテンプレート:

```
You are building a web application with Supabase as the backend.
- Use @supabase/supabase-js for client-side operations
- Use @supabase/ssr for server-side authentication
- Always enable RLS on new tables
- Use TypeScript with generated types from `supabase gen types typescript`
```

## Supabase MCP サーバー

Supabase 公式の MCP サーバーにより、AI ツールが直接 Supabase プロジェクトを操作できる。

### 設定

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "<personal-access-token>"
      }
    }
  }
}
```

### 利用可能なツールカテゴリ

| カテゴリ | 主な操作 | デフォルト |
|---------|---------|-----------|
| database | SQL 実行、スキーマ管理、マイグレーション | 有効 |
| debug | ログ確認、Advisors | 有効 |
| development | 型生成、設定 | 有効 |
| functions | Edge Functions 管理 | 有効 |
| account | プロジェクト・組織管理 | 有効 |
| storage | バケット・ファイル操作 | **無効**（要明示的な有効化） |

### 設定オプション

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y", "@supabase/mcp-server",
        "--read-only",           // 読み取り専用モード
        "--project-ref", "abcdefghijklmnop"  // 特定プロジェクトに限定
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "<personal-access-token>"
      }
    }
  }
}
```

## セキュリティ注意事項

- **本番環境には接続しない**: MCP サーバーは開発プロジェクトにのみ使用する
- プロンプトインジェクション攻撃のリスクがある。AI ツールが外部コンテンツ（Webページ等）を読む場合は特に注意
- `--read-only` フラグで書き込みを無効化できる
- `--project-ref` で操作対象を特定プロジェクトに限定できる
- CI 環境では Personal Access Token の代わりに OAuth クレデンシャルを使用できる

## BYO MCP（Bring Your Own MCP）

カスタム MCP サーバーを構築して Supabase と連携することも可能。

## 注意点

- MCP サーバーには Personal Access Token が必要（ダッシュボードで生成）
- AI ツールへの過度な権限付与に注意
- service_role / secret キーは AI ツールに渡さない

## 関連

- [./architecture.md](./architecture.md) — アーキテクチャ概要
- [./quickstarts.md](./quickstarts.md) — クイックスタート
