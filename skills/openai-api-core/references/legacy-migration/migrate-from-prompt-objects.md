# Migrate from Prompt Objects

Migration path from managed reusable `prompt` objects (`/v1/prompts`) to inlining prompt content as versioned code, ahead of the Prompts API shutdown.

## Signature / Usage

```python
# Before: reference a managed prompt object
response = client.responses.create(
    prompt={
        "prompt_id": "pmpt_123",
        "version": "1",
        "variables": {"customer_name": "Acme", "issue": "billing question"},
    }
)

# After: inline the generated messages via `input`
def build_support_prompt(customer_name, issue):
    return [
        {"role": "system", "content": "You are a helpful support assistant."},
        {"role": "user", "content": f"Customer name: {customer_name}. Issue: {issue}."},
    ]

response = client.responses.create(
    model="gpt-5.6",
    input=build_support_prompt(customer_name="Acme", issue="billing question"),
)
```

## Migration steps

1. **Move prompt content into source code** so prompt changes go through the same review and release process as product logic.
2. **Replace prompt variables with function arguments** so dynamic values are explicit and typed in the application.
3. **Pass messages through `input`** in the Responses API call instead of the `prompt` object.
4. **Move versioning to the repo** using git commits, PR review, and tests or evals instead of `prompt.version`.
5. **Keep static content first and dynamic content later** in the built message list to preserve prompt caching benefits, since cache hits depend on exact prefix matches.

## Notes

- Reusable prompt objects were de-emphasized for creation beginning June 3, 2026, and `/v1/prompts` is scheduled to shut down on November 30, 2026 (see the deprecations schedule).
- Recommended structure: a small `prompts/` module with each prompt as a named builder function, plus lightweight eval fixtures so prompt changes are reviewed like product logic rather than scattered inline across the codebase.
- The `openai-docs` skill (via the OpenAI Developers Codex plugin) can automate this migration: `$openai-docs update this project to store prompts in code instead of using a prompts object`.

## Related

- [Deprecations](./deprecations.md)
- [Migrate Chat Completions to Responses](./migrate-chat-completions-to-responses.md)
- [Responses API vs. Chat Completions API](./responses-vs-chat-completions.md)
</content>
