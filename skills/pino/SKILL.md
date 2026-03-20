---
name: pino
description: >
  Pino (JSON ロガー) リファレンス。
  logger, transport, child, redaction, serializers
user-invocable: false
---

# Pino — Super Fast JSON Logger リファレンス

Pino 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/pino/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── api/README.md                     ← コア API（9ページ）
    ├── features/README.md                ← 機能別ドキュメント（7ページ）
    ├── integrations/README.md            ← 統合・エコシステム（2ページ）
    └── help/README.md                    ← ヘルプ・FAQ（14ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| pino() 関数、options、destination、Logger メソッド、Statics | api | [references/api/README.md](./references/api/README.md) |
| ブラウザ、redaction、子ロガー、transports、非同期ロギング | features | [references/features/README.md](./references/features/README.md) |
| Web フレームワーク統合、エコシステム | integrations | [references/integrations/README.md](./references/integrations/README.md) |
| ログローテーション、フィルタリング、テスト、トラブルシューティング | help | [references/help/README.md](./references/help/README.md) |
