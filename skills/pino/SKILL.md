---
name: pino
description: >
  Pino (高速 JSON 構造化ロガー for Node.js) リファレンス。
  logger, child logger, log levels (info / warn / error / debug / trace)、transport、
  pretty print (pino-pretty)、redaction (機密情報マスキング)、serializers、
  async / sync logging、ファイル出力、structured logging。
user-invocable: false
model: sonnet
---

# Pino — Super Fast JSON Logger リファレンス

Pino 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/pino/
  SKILL.md
  references/
    api/
      README.md
      pino-function.md
      options.md
      destination.md
      logger-instance.md
      logger-methods.md
      logger-child.md
      logging-method-parameters.md
      statics.md
      interfaces-and-types.md
    features/
      README.md
      browser.md
      redaction.md
      child-loggers.md
      transports.md
      asynchronous.md
      pretty-printing.md
      diagnostics.md
    integrations/
      README.md
      web-frameworks.md
      ecosystem.md
    help/
      README.md
      avoid-message-conflict.md
      best-performance-stdout.md
      duplicate-keys.md
      google-cloud-logging.md
      log-filtering.md
      log-levels-as-labels.md
      log-rotation.md
      lts.md
      pino-with-debug.md
      reopening-log-files.md
      saving-to-multiple-files.md
      testing.md
      transports-and-systemd.md
      unicode-and-windows.md
  samples/
    README.md
    basic-logging.md
    child-loggers.md
    log-levels.md
    redaction.md
    transports.md
    async-logging.md
    web-frameworks.md
    testing.md
  scripts/
    README.md
    install.md
    pretty-printing.md
    transports.md
    filtering.md
    testing.md
    log-rotation.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| pino() 関数の使い方を知りたい、options を確認したい | api | [references/api/README.md](references/api/README.md) |
| Logger インスタンスのメソッド、child logger、Statics を調べたい | api | [references/api/README.md](references/api/README.md) |
| 型定義・インターフェースを確認したい | api | [references/api/README.md](references/api/README.md) |
| redaction で機密情報をマスクしたい | features | [references/features/README.md](references/features/README.md) |
| transport で出力先を切り替えたい、pino-pretty を使いたい | features | [references/features/README.md](references/features/README.md) |
| 非同期ロギング・ブラウザ対応・diagnostics を調べたい | features | [references/features/README.md](references/features/README.md) |
| Fastify / Express との統合方法を知りたい | integrations | [references/integrations/README.md](references/integrations/README.md) |
| エコシステム・関連パッケージを把握したい | integrations | [references/integrations/README.md](references/integrations/README.md) |
| ログローテーション・フィルタリング・テストを知りたい | help | [references/help/README.md](references/help/README.md) |
| トラブルシューティング（重複キー・文字コード・systemd）を解決したい | help | [references/help/README.md](references/help/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
