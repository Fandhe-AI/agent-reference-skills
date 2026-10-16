# Red teaming

Red teaming uses adversarial test cases to help uncover unsafe, insecure, or policy-violating behavior before deployment. It complements evals by focusing on misuse cases, failure modes, and high-risk interactions that ordinary quality testing may not expose.

## Signature / Usage

Open-source red teaming uses Promptfoo, an open-source framework for evaluating prompts, agents, and AI applications. Its red teaming workflows generate adversarial test cases, inspect target behavior, and use results to improve the system. The broader methodology is in Promptfoo's LLM red teaming guide (https://www.promptfoo.dev/docs/red-team/).

```bash
npx promptfoo@latest init --example getting-started
```

## Notes

- Only submit to OpenAI Red Teaming code or other assets that you own or are expressly authorized to test. Do not use OpenAI Red Teaming to analyze or report vulnerabilities in open-source or third-party code without OpenAI's express written permission.
- OpenAI Red Teaming is available for enterprise customers as a managed offering for red teaming AI applications and agents; enterprise workflows can support broader coordination, review, and reporting needs than a standalone local workflow.
- Use evals to measure whether an AI system behaves as intended; use red teaming to probe behavior under adversarial, abusive, or unexpected inputs. Mature evaluation programs often use both.
- Distinct from LLM guardrails of other skills (openai-agents); this page covers adversarial testing only.

## Related

- [Get started with Promptfoo](./promptfoo.md)
- [Working with evals](./working-with-evals.md)
- [Evaluation best practices](./evaluation-best-practices.md)
