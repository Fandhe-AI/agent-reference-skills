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

### 利用可能な操作

- プロジェクト一覧・情報取得
- テーブル作成・スキーマ管理
- SQL クエリ実行
- Edge Functions 管理
- RLS ポリシー管理

## BYO MCP（Bring Your Own MCP）

カスタム MCP サーバーを構築して Supabase と連携することも可能。

## 注意点

- MCP サーバーには Personal Access Token が必要（ダッシュボードで生成）
- AI ツールへの過度な権限付与に注意
- service_role キーは AI ツールに渡さない

## 関連

- [./architecture.md](./architecture.md) — アーキテクチャ概要
- [./quickstarts.md](./quickstarts.md) — クイックスタート
