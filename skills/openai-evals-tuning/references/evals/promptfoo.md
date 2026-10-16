# Get started with Promptfoo

Promptfoo is an open-source library to evaluate and red-team AI applications and agents: define test cases and checks, compare prompts or models, investigate failures, and probe applications with adversarial inputs. Promptfoo is part of OpenAI.

## Signature / Usage

Requires Node.js 22.22.0 or newer. Run the getting-started example (compares translations from different models against test cases):

```bash
npx promptfoo@latest init --example getting-started
cd getting-started
export OPENAI_API_KEY="<your-api-key>"
npx promptfoo@latest eval
npx promptfoo@latest view
```

Python wrapper (active Python 3.10+ virtual environment; the pip wrapper also requires Node.js 22.22.0 or newer):

```bash
pip install promptfoo
promptfoo init --example getting-started
cd getting-started
promptfoo eval
promptfoo view
```

The example creates `promptfooconfig.yaml` with a translation prompt, model providers, and test cases. Each test includes an assertion that checks the output for an expected phrase. Edit the prompt or test cases in `promptfooconfig.yaml`, then run the eval again.

### Start in the Codex app

Use the Promptfoo plugin (`codex://plugins/install/promptfoo?marketplace=promptfoo`) to give Codex skills for setting up and running evals. Starter prompt (excerpt):

```text
Use Promptfoo to evaluate and improve an important AI workflow in this application.

Read the repository instructions and reuse any existing eval setup. Choose a user-facing behavior to test, asking me if the goal is unclear. Build test cases based on the application's inputs, covering common requests, edge cases, and adversarial inputs. Define success with assertions that check the expected behavior.
```

## Notes

- Evals that call a model incur API charges.
- A passing assertion checks a specific condition, not the overall quality of a response; inspect outputs as well.
- Codex may need help with credentials or setup permissions.
- Keep assertions fixed when comparing a baseline against a changed prompt or configuration so the comparison stays meaningful.
- Next steps in Promptfoo's documentation: configuration guide (https://www.promptfoo.dev/docs/configuration/guide/), assertions and metrics (https://www.promptfoo.dev/docs/configuration/expected-outputs/), red-teaming guide (https://www.promptfoo.dev/docs/red-team/).
- This is the open-source local workflow; the OpenAI platform's hosted Evals product is covered in `working-with-evals.md`.
- Source: https://developers.openai.com/api/docs/guides/promptfoo-codex

## Related

- [Red teaming](./red-teaming.md)
- [Working with evals](./working-with-evals.md)
- [Evaluation best practices](./evaluation-best-practices.md)
