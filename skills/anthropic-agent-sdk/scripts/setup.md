<!-- source: https://code.claude.com/docs/en/agent-sdk/quickstart.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/agent-sdk/overview.md / last verified: 2026-08-07 -->

# setup

Agent SDK のインストール、API キー設定、最小構成での疎通確認。

## TypeScript SDK のインストール

```bash
npm install @anthropic-ai/claude-agent-sdk
```

```bash
npm install -D tsx
```

Node.js 18 以上が必要。`tsx` は開発時に TypeScript を直接実行するための依存。

## Python SDK のインストール（uv）

```bash
uv add claude-agent-sdk
```

Python 3.10 以上が必要。

## Python SDK のインストール（pip）

```bash
pip install claude-agent-sdk
```

## API key の設定

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

SDK はプロセス環境変数の `ANTHROPIC_API_KEY` を読む。`.env` ファイルは自動読み込みされない。Claude Console で発行したキーを設定する。

## サードパーティ認証の切り替え（環境変数）

```bash
# Amazon Bedrock
export CLAUDE_CODE_USE_BEDROCK=1

# Claude Platform on AWS
export CLAUDE_CODE_USE_ANTHROPIC_AWS=1
export ANTHROPIC_AWS_WORKSPACE_ID="your-workspace-id"

# Google Vertex AI
export CLAUDE_CODE_USE_VERTEX=1

# Microsoft Foundry
export CLAUDE_CODE_USE_FOUNDRY=1
```

いずれか1つを設定することで、対応するプラットフォームの認証情報を使用する。

## 最小実行確認（TypeScript）

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Review utils.py for bugs that would cause crashes. Fix any issues you find.",
  options: {
    allowedTools: ["Read", "Edit", "Glob"], // Auto-approve these tools
    permissionMode: "acceptEdits" // Auto-approve file edits
  }
})) {
  if (message.type === "assistant" && message.message?.content) {
    for (const block of message.message.content) {
      if ("text" in block) console.log(block.text);
      else if ("name" in block) console.log(`Tool: ${block.name}`);
    }
  } else if (message.type === "result") {
    console.log(`Done: ${message.subtype}`);
  }
}
```

`npx tsx <file>.ts` で実行できる。

## 最小実行確認の実行（Node.js / tsx）

```bash
npx tsx agent.ts
```
