---
name: openai-evals-tuning
description: >
  OpenAI API (developers.openai.com) の Evals / Fine-tuning リファレンス。
  Evals API, Datasets, graders（string check, text similarity, model, python, multi）,
  agent evals, trace grading, external models、
  SFT, DPO, RFT（reinforcement fine-tuning）, vision fine-tuning, distillation,
  prompt optimizer, fine-tuning best practices。
  セルフサービス fine-tuning は段階的廃止進行中。
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
| SFT / DPO / RFT で fine-tuning ジョブを作りたい | fine-tuning | [references/fine-tuning/README.md](references/fine-tuning/README.md) |
| vision fine-tuning や distillation を行いたい | fine-tuning | [references/fine-tuning/README.md](references/fine-tuning/README.md) |
| prompt optimizer の使い方を知りたい | fine-tuning | [references/fine-tuning/README.md](references/fine-tuning/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| curl でジョブ・ファイル・eval を操作したい | scripts | [scripts/README.md](scripts/README.md) |

## 注意事項

- セルフサービス fine-tuning（SFT / DPO / RFT / vision fine-tuning / distillation）は段階的廃止が進行中。新規組織での利用は 2026-05-07 以降不可、既存組織も 2027-01-06 以降は新規ジョブ作成が不可になる。prompt optimizer は 2026-11-30 に停止予定。各ページの `## Notes` に個別の期限を記載している
- reasoning モデルの使い方や Responses API 自体のリファレンスは `openai-api-core` スキルが担当する。本スキルは評価（evals）とモデル最適化（fine-tuning）に限定する
