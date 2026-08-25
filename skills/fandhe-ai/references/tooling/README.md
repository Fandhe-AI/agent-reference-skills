# tooling

ここでの guardrail は CI changeset 判定 CLI であり、openai-agents / anthropic-prompt-eval の LLM 出力 guardrail とは別物。`guardrail eval` はラベル付きデータセットに対する判定器評価であり openai-evals-tuning の LLM eval ではない。

| Name | Description | Path |
| --- | --- | --- |
| guardrail | AI 生成 changeset を自動適用/エスカレーション/却下で判定する CI 用 CLI（check / eval） | [guardrail.md](./guardrail.md) |
| self-repair | 検出→修正候補検証→取り込み判断のループを実行する CLI（run / verify-log） | [self-repair.md](./self-repair.md) |
| config | guardrail.toml / policy-exclusion.toml と判定/評価レポート JSON の形式 | [config.md](./config.md) |
