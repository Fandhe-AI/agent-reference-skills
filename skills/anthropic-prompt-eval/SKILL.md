---
name: anthropic-prompt-eval
description: >
  Claude API (platform.claude.com) のプロンプトエンジニアリング・評価リファレンス。
  prompt engineering, XML タグ, few-shot, system prompts,
  モデル別プロンプティング（Fable 5 / Opus 5 / Sonnet 5）。
  evals, grading（LLM-graded 等）, jailbreak・prompt leak 対策, hallucination 低減,
  classification, ticket routing 等ユースケース実装。
user-invocable: false
---

# anthropic-prompt-eval

Claude API (platform.claude.com) — プロンプトエンジニアリング技法とモデル別プロンプティング差異、
評価設計・グレーディング・ガードレール、代表的なユースケース実装ガイドをカバーする公式リファレンス。

Messages API・structured outputs・streaming など API 呼び出し自体の詳細は `anthropic-api-core` の領域。

## ディレクトリ構成

```text
skills/anthropic-prompt-eval/
  SKILL.md
  references/
    prompt-engineering/
      README.md
      overview.md
      claude-prompting-best-practices.md
      prompting-claude-fable-5.md
      prompting-claude-opus-5.md
      prompting-claude-opus-4-8.md
      prompting-claude-sonnet-5.md
    test-evaluate/
      README.md
      develop-tests.md
      handle-streaming-refusals.md
      increase-consistency.md
      mitigate-jailbreaks.md
      reduce-hallucinations.md
      reduce-latency.md
      reduce-prompt-leak.md
    use-cases/
      README.md
      overview.md
      classification.md
      content-moderation.md
      customer-support-chat.md
      legal-summarization.md
      system-prompts.md
      ticket-routing.md
  samples/
    README.md
    prompt-template-structure.md
    classification-prompt.md
    rag-summarization-prompt.md
    guardrails-prompts.md
    eval-rubric-workflow.md
    model-specific-prompting.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`samples/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| プロンプト設計の基本技法（明確さ・例示・XML タグ・thinking・agentic systems）を知りたい | prompt-engineering | [references/prompt-engineering/README.md](references/prompt-engineering/README.md) |
| Fable 5 / Opus 5 / Opus 4.8 / Sonnet 5 のモデル別プロンプティング差異・移行方法を知りたい | prompt-engineering | [references/prompt-engineering/README.md](references/prompt-engineering/README.md) |
| 成功基準の定義・評価（evals）の構築・code-graded / LLM-graded の使い分けを知りたい | test-evaluate | [references/test-evaluate/README.md](references/test-evaluate/README.md) |
| streaming refusals の検知・出力一貫性の向上・jailbreak / prompt injection / hallucination / prompt leak / latency への対策を知りたい | test-evaluate | [references/test-evaluate/README.md](references/test-evaluate/README.md) |
| classification・content moderation・customer support chat・legal summarization・ticket routing の実装ガイドを知りたい | use-cases | [references/use-cases/README.md](references/use-cases/README.md) |
| claude.ai / iOS / Android アプリのシステムプロンプトのリリースノートを知りたい | use-cases | [references/use-cases/README.md](references/use-cases/README.md) |
| 典型的な使い方を知りたい（プロンプトテンプレート構成, classification + eval, 要約, ガードレール, eval rubric, モデル別調整例） | samples | [samples/README.md](samples/README.md) |
