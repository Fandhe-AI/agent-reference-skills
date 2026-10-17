---
name: apple-intelligence
description: >
  Apple Intelligence (Foundation Models / Evaluations / Image Playground) の API リファレンス。
  LanguageModelSession, SystemLanguageModel, PrivateCloudComputeLanguageModel (PCC), Generable, GenerationSchema,
  Tool, OCRTool, Transcript, DynamicInstructions, Attachment, Evaluation, ModelJudgeEvaluator, ToolCallEvaluator,
  ImagePlaygroundSheet, ImageCreator, Foundation Models SDK for Python (apple-fm-sdk)。
user-invocable: false
---

# Apple Intelligence

Apple Intelligence の開発者向け API を扱うリファレンススキル。Foundation Models フレームワーク（オンデバイス / Private Cloud Compute の言語モデル）、Evaluations フレームワーク、Image Playground、Foundation Models SDK for Python を収録する。

## 対象バージョン

- 出典: https://developer.apple.com/documentation/foundationmodels 、https://developer.apple.com/documentation/evaluations 。取得経路は DocC JSON (`/tutorials/data/documentation/<path>.json`)、取得日 2026-10-16（URL に版数なし）
- 現行 SDK は iOS 27。27.0 のシンボルに beta フラグなし
- Foundation Models: iOS / iPadOS / macOS / Mac Catalyst / visionOS 26.0+、watchOS 27.0+
- Evaluations: 27.0+（Xcode 27.0+）
- `Data*Representable`: Beta（iOS 27.2+）
- `ImageCreator`: 27.0 で deprecated
- Foundation Models SDK for Python: https://github.com/apple/python-apple-fm-sdk のタグ v0.2.1（https://github.com/apple/python-apple-fm-sdk/releases/tag/v0.2.1 、2026-06-29 リリース）。PyPI 最新 `apple-fm-sdk` 0.2.1（https://pypi.org/project/apple-fm-sdk/ ）と一致
- `foundation-models-utilities` は beta タグのみのため未収録

## ディレクトリ構成

```text
skills/apple-intelligence/
  SKILL.md
  references/
    sessions/             # LanguageModelSession, Instructions, Prompt, GenerationOptions (13 ページ)
      README.md
    dynamic-profiles/     # DynamicInstructions, Profile, DynamicProfile (7 ページ)
      README.md
    tools/                # Tool, ToolCallingMode, OCRTool, BarcodeReaderTool (5 ページ)
      README.md
    structured-output/    # Generable, GenerationSchema, GeneratedContent (9 ページ)
      README.md
    attachments/          # Attachment, ImageReference (5 ページ)
      README.md
    transcripts/          # Transcript とエントリー・セグメント型 (8 ページ)
      README.md
    models/               # SystemLanguageModel, PrivateCloudComputeLanguageModel, LanguageModel (14 ページ)
      README.md
    evaluators/           # Evaluator, ModelJudgeEvaluator, ToolCallEvaluator, Metric (10 ページ)
      README.md
    evaluations/          # Evaluation, EvaluationTrait, Loader, SampleGenerator (10 ページ)
      README.md
    image-playground/     # ImagePlaygroundSheet, ViewController, Options, ImageCreator (7 ページ)
      README.md
    python-sdk/           # Foundation Models SDK for Python (8 ページ)
      README.md
    guides/               # 公式ガイド記事 (25 ページ)
      README.md
  samples/
    README.md
    generate-text-with-session.md
    check-model-availability.md
    stream-response-swiftui.md
    guided-generation.md
    tool-calling.md
    dynamic-game-content.md
    dynamic-profile-session.md
    multimodal-image-prompt.md
    content-tagging.md
    private-cloud-compute-session.md
    context-window-and-prewarm.md
    kv-caching.md
    safety-error-handling.md
    languages-and-locales.md
    core-ai-model-session.md
    transcript-feedback.md
    evaluation-swift-testing.md
    model-judge-evaluation.md
    tool-call-evaluation.md
    synthetic-dataset.md
    book-tracker-evaluation.md
    evaluate-core-ai-model.md
    python-basic-usage.md
    python-streaming.md
    python-guided-generation.md
    python-tools.md
    python-evaluation-transcripts.md
  scripts/
    README.md
    python-sdk-install.md
    python-sdk-docs.md
    core-ai-model-export.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 実装例が必要なら `samples/README.md`、コマンドが必要なら `scripts/README.md` を引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| セッション生成・プロンプト送信・応答ストリーム・生成オプション・トークン使用量 | sessions | [references/sessions/README.md](references/sessions/README.md) |
| 実行時に instructions / profile を切り替える動的セッション | dynamic-profiles | [references/dynamic-profiles/README.md](references/dynamic-profiles/README.md) |
| Tool 定義・ツール呼び出しモード・ツールエラー・OCR / バーコード読取ツール | tools | [references/tools/README.md](references/tools/README.md) |
| `@Generable` による型付き出力・スキーマ・動的スキーマ・部分生成 | structured-output | [references/structured-output/README.md](references/structured-output/README.md) |
| 画像など添付アセットをプロンプトへ渡す | attachments | [references/attachments/README.md](references/attachments/README.md) |
| セッション履歴の検査・Transcript のエントリー・セグメント | transcripts | [references/transcripts/README.md](references/transcripts/README.md) |
| モデルの可用性確認・Private Cloud Compute・ガードレール・独自 LanguageModel 実装 | models | [references/models/README.md](references/models/README.md) |
| Evaluator 実装・モデル判定による採点・ツール呼び出し検証・メトリクス集計 | evaluators | [references/evaluators/README.md](references/evaluators/README.md) |
| Evaluation 定義・データセット読込・評価結果・合成サンプル生成・テスト実行 | evaluations | [references/evaluations/README.md](references/evaluations/README.md) |
| Image Playground シート・ViewController・スタイル・コンセプト指定 | image-playground | [references/image-playground/README.md](references/image-playground/README.md) |
| Python から Foundation Models を使う（セッション・Tool・generable） | python-sdk | [references/python-sdk/README.md](references/python-sdk/README.md) |
| プロンプト設計・コンテキストウィンドウ管理・安全性・性能・評価設計の公式ガイド | guides | [references/guides/README.md](references/guides/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
