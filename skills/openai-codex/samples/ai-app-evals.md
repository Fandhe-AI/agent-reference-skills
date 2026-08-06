# Add evals to your AI application

Use Codex to turn expected behavior into a Promptfoo eval suite.

```text
Use $promptfoo-evals to add a Promptfoo eval suite for this AI application. If there is not already a working Promptfoo provider or target adapter, use $promptfoo-provider-setup first.

Behavior to evaluate: [support answer quality / tool-call correctness / retrieval grounding / business rules / agent task completion]

Before editing:
- Inspect the app path users hit and any existing evals or tests.
- Propose the smallest useful eval plan: target adapter, seed cases, assertions, files, commands, and required env vars or local services.
- Do not change production prompts, model settings, or app behavior until the baseline eval exists and has been run.

Requirements:
- Exercise the application path users hit when possible, not only the raw model prompt.
- Keep fixtures free of secrets, customer data, and sensitive personal data.
- Add a local eval command such as `npm run evals` or document the exact command to run.

Finish with:
- Files changed
- Eval commands run
- Passing and failing cases
- Recommended next evals to add
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). `suggestedEffort: medium`. Uses the Promptfoo plugin (`$promptfoo-evals` / `$promptfoo-provider-setup`)
- Best for: AI applications with prompts, model calls, tools, retrieval, or agents but no repeatable eval suite; regression tests before a model/prompt/retrieval change merges
