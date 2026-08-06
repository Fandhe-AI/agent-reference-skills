---
name: openai-images-video
description: >
  OpenAI API (developers.openai.com) の画像・動画生成リファレンス。
  image generation（gpt-image, Images API `images.generate` / `images.edit`）、
  image edit（mask, reference images）、image generation tool（Responses API 組み込み）、
  vision（画像入力, image tokens, vision fine-tuning）、
  video generation（Sora, `sora-2` / `sora-2-pro`, videos エンドポイント）、
  extend / edits, characters。
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
      moderation-and-errors.md
    vision/
      README.md
      image-input.md
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
| 画像入力（vision）を Responses/Chat Completions に渡す、`detail` レベル指定 | vision | [references/vision/README.md](references/vision/README.md) |
| image token のコスト計算、vision の制約、vision fine-tuning | vision | [references/vision/README.md](references/vision/README.md) |
| Sora による動画生成、videos エンドポイントのジョブライフサイクル・ポーリング | video | [references/video/README.md](references/video/README.md) |
| 動画の extend / edits、characters・reference frame、バッチレンダリングとライブラリ管理 | video | [references/video/README.md](references/video/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| curl で Images / Videos / vision エンドポイントを直接叩きたい | scripts | [scripts/README.md](scripts/README.md) |

## Notes

- Responses API の基本的な呼び出し形（入出力・ストリーミング・ツール呼び出しの共通仕様）は `openai-api-core` が担当する
- built-in tools（web search / file search / code interpreter 等）の全体的な枠組みは `openai-agents` が担当する。本スキルの `image_generation` ツールはその中の画像生成特化ページとして扱う
