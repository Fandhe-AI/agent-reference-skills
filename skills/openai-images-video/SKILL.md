---
name: openai-images-video
description: >
  OpenAI API (developers.openai.com) の画像生成・画像入力リファレンス。
  GPT Image 2.5 (`gpt-image-2.5-sunburst` / `flare`), Images API `images.generate` / `images.edit`,
  mask, reference images, quality xhigh / max, image prompting, image_generation tool (Responses API),
  vision (画像入力, detail, image tokens, cost calculator, vision fine-tuning)。
  Sora 2 / Videos API は 2026-09-24 終了 (履歴のみ)。
user-invocable: false
---

## ディレクトリ構成

```text
skills/openai-images-video/
  SKILL.md
  references/
    images/
      README.md
      image-generation.md
      image-generation-tool.md
      image-prompting.md
      moderation-and-errors.md
    vision/
      README.md
      image-input.md
      image-cost-calculator.md
      image-tokens-and-limitations.md
      vision-fine-tuning.md
    video/
      README.md
      video-generation.md
      video-references-and-characters.md
      video-extend-and-edit.md
      video-batch-and-library.md
  samples/
    README.md
    image-generation.md
    image-editing-mask.md
    image-editing-reference.md
    image-generation-tool.md
    vision-image-understanding.md
    video-generation-sora.md
    video-status-polling-download.md
  scripts/
    README.md
    image-generation.md
    video-generation.md
    vision-input.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| テキストから画像生成、`images.generate` / `images.edit` の単体呼び出し | images | [references/images/README.md](references/images/README.md) |
| mask / reference images を使った画像編集、Responses API の `image_generation` ツール、モデレーション・エラー処理 | images | [references/images/README.md](references/images/README.md) |
| GPT Image モデル選択（Sunburst / Flare）・プロンプト設計・既存 workflow の移行 | images | [references/images/README.md](references/images/README.md) |
| 画像入力（vision）を Responses/Chat Completions に渡す、`detail` レベル指定 | vision | [references/vision/README.md](references/vision/README.md) |
| image token の仕組み、vision の制約、vision fine-tuning | vision | [references/vision/README.md](references/vision/README.md) |
| 画像入力トークン・コストの見積もり（calculator、30,000-patch 上限） | vision | [references/vision/README.md](references/vision/README.md) |
| Sora による動画生成、videos エンドポイントのジョブライフサイクル・ポーリング（2026-09-24 終了済み・履歴参照のみ） | video | [references/video/README.md](references/video/README.md) |
| 動画の extend / edits、characters・reference frame、バッチレンダリングとライブラリ管理（2026-09-24 終了済み・履歴参照のみ） | video | [references/video/README.md](references/video/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| curl / OpenAI CLI で Images / vision エンドポイントを直接叩きたい（video 系コマンドは 2026-09-24 終了済み・履歴参照のみ） | scripts | [scripts/README.md](scripts/README.md) |

## Notes

- 出典は developers.openai.com/api/docs の Markdown twin（URL 末尾 `.md`、2026-10-16 取得。サイトに版番号なし）。最新モデルは GPT Image 2.5（`gpt-image-2.5-sunburst-2026-09-08` / `gpt-image-2.5-flare-2026-09-08`、changelog 2026-09-08）
- GPT Image 旧モデルの終了予定: `gpt-image-1` は 2026-10-23、`gpt-image-1-mini` / `gpt-image-1.5` / `chatgpt-image-latest` は 2026-12-01。代替は `gpt-image-2.5-sunburst` / `gpt-image-2.5-flare`。`/v1/images/variations` は retired
- Sora 2 / Videos API は 2026-09-24 に終了済み。`references/video/`・video 系 samples / scripts は履歴参照のみ
- vision fine-tuning の一般的な SFT / DPO / RFT は `openai-evals-tuning` が担当する
- Responses API の基本的な呼び出し形（入出力・ストリーミング・ツール呼び出しの共通仕様）は `openai-api-core` が担当する
- built-in tools（web search / file search / code interpreter 等）の全体的な枠組みは `openai-agents` が担当する。本スキルの `image_generation` ツールはその中の画像生成特化ページとして扱う
