---
name: openai-evals-tuning
description: >
  OpenAI API (developers.openai.com) の Evals / Fine-tuning リファレンス。
  Evals API, Datasets, graders（string check / text similarity / model / python / multi）,
  agent evals, trace grading, external models, Promptfoo（移行先）, red teaming,
  SFT, DPO, RFT, vision fine-tuning, distillation, prompt optimizer, fine-tuning best practices。
  Evals は 2026-11-30 停止予定、セルフサービス fine-tuning は段階的廃止中。
user-invocable: false
---

## ディレクトリ構成

```text
skills/openai-evals-tuning/
  SKILL.md
  references/
    evals/
      README.md
      working-with-evals.md
      graders.md
      getting-started-datasets.md
      agent-evals.md
      trace-grading.md
      external-models.md
      evaluation-best-practices.md
      promptfoo.md
      red-teaming.md
    fine-tuning/
      README.md
      model-optimization.md
      supervised-fine-tuning.md
      vision-fine-tuning.md
      direct-preference-optimization.md
      reinforcement-fine-tuning.md
      reinforcement-fine-tuning-use-cases.md
      fine-tuning-best-practices.md
      prompt-optimizer.md
  samples/
    README.md
    eval-create-and-run.md
    grader-definitions.md
    sft-dataset-and-job.md
    dpo-basics.md
    rft-basics.md
    distillation-workflow.md
  scripts/
    README.md
    fine-tuning-jobs.md
    training-data-files.md
    evals.md
    promptfoo.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Evals API で eval を作成・実行したい | evals | [references/evals/README.md](references/evals/README.md) |
| grader（string check / text similarity / model / python / multi）を定義したい | evals | [references/evals/README.md](references/evals/README.md) |
| エージェントのトレースを採点・評価したい | evals | [references/evals/README.md](references/evals/README.md) |
| サードパーティモデル・外部エンドポイントを評価したい | evals | [references/evals/README.md](references/evals/README.md) |
| Evals 廃止に伴い Promptfoo へ移行したい / Promptfoo で eval を始めたい | evals | [references/evals/README.md](references/evals/README.md) |
| adversarial な入力で red teaming したい | evals | [references/evals/README.md](references/evals/README.md) |
| SFT / DPO / RFT で fine-tuning ジョブを作りたい | fine-tuning | [references/fine-tuning/README.md](references/fine-tuning/README.md) |
| vision fine-tuning や distillation を行いたい | fine-tuning | [references/fine-tuning/README.md](references/fine-tuning/README.md) |
| prompt optimizer の使い方を知りたい | fine-tuning | [references/fine-tuning/README.md](references/fine-tuning/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| curl / Promptfoo CLI でジョブ・ファイル・eval を操作したい | scripts | [scripts/README.md](scripts/README.md) |

## 注意事項

- セルフサービス fine-tuning（SFT / DPO / RFT / vision fine-tuning / distillation）は段階的廃止が進行中。新規組織での利用は 2026-05-07 以降不可、既存組織も 2027-01-06 以降は新規ジョブ作成が不可になる。各ページの `## Notes` に個別の期限を記載している
- Evals platform は 2026-06-03 に deprecated。2026-10-31 に既存 evals が read-only、2026-11-30 に Evals dashboard と API が shutdown 予定。Datasets / graders / trace grading の評価経路 / dataset-backed prompt optimizer も同じ日程が対象。移行先は OpenAI 公式推奨の Promptfoo（OSS CLI、OpenAI の一部）で、cookbook "Moving from OpenAI Evals to Promptfoo" が移行経路（`references/evals/promptfoo.md` / `scripts/promptfoo.md`）
- fine-tuning 対応 base model の shutdown: `gpt-4.1-nano-2025-04-14` / `o4-mini-2025-04-16`（RFT の唯一の base）は 2026-10-23、`gpt-4o-2024-08-06`（vision）/ `gpt-4o-2024-11-20` / `gpt-4o-mini-2024-07-18`（蒸留サンプルの base）/ `gpt-4.1-2025-04-14` / `gpt-4.1-mini-2025-04-14` は 2027-01-14（deprecations ページ）。fine-tuned 版は base と同じ日程。reusable prompts（`v1/prompts`）と Agent Builder も 2026-11-30 に shutdown
- distillation は専用ページが無く、SFT guide の 1 節と archived cookbook が出典（`samples/distillation-workflow.md`）
- 出典: developers.openai.com/api/docs（2026-10-16 取得）
- reasoning モデルの使い方や Responses API 自体のリファレンスは `openai-api-core` スキルが担当する。本スキルは評価（evals）とモデル最適化（fine-tuning）に限定する
