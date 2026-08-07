<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview / last verified: 2026-08-07 -->

# Prompt engineering overview

Learn when prompt engineering is the right solution, and find Claude prompting techniques and interactive tutorials.

## Before prompt engineering

This guide assumes you have: a clear definition of success criteria, ways to empirically test against those criteria, and a first draft prompt to improve. If not, see [Define success criteria and build evaluations](../test-evaluate/develop-tests.md) first.

- Don't have a first draft prompt? Generate one with the metaprompt recipe from the Claude Cookbook (`colab.research.google.com/github/anthropics/claude-cookbooks/blob/main/misc/metaprompt.ipynb`).
- For model-specific tuning guidance for Claude's latest models, start with [Prompting best practices](./claude-prompting-best-practices.md).

## When to prompt engineer

This guide focuses on success criteria that are controllable through prompt engineering. Not every failing eval is best solved by prompt engineering — for example, latency and cost can sometimes be improved more easily by selecting a different model.

## How to prompt engineer

All prompting techniques (clarity and examples, XML structuring, role prompting, thinking, prompt chaining) are covered in [Prompting best practices](./claude-prompting-best-practices.md) — the living reference. For general prompt engineering craft beyond Claude-specific techniques, see the Anthropic blog post "best practices for prompt engineering".

## Prompt engineering tutorial

Interactive learners can use the GitHub prompting tutorial (`github.com/anthropics/prompt-eng-interactive-tutorial`) or the lighter-weight Google Sheets prompting tutorial.

## Notes

- This page assumes success criteria and evaluations already exist; see `develop-tests.md` in the test-evaluate category for that prerequisite step.

## Related

- [claude-prompting-best-practices](./claude-prompting-best-practices.md)
- [develop-tests](../test-evaluate/develop-tests.md)
