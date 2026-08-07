<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices / last verified: 2026-08-07 -->

# Prompt template structure

Combine a role system prompt with XML-tagged context, instructions, and few-shot examples in a single reusable template.

```python
import anthropic

client = anthropic.Anthropic()

SYSTEM = "You are a senior technical writer who produces concise, accurate API documentation."

EXAMPLES = """
<examples>
<example>
<input>A function that retries a failed HTTP request up to 3 times with exponential backoff.</input>
<output>
<summary>Retries a failed request with exponential backoff, up to 3 attempts.</summary>
<parameters>
- request: the HTTP request to send
- max_retries: maximum retry attempts (default 3)
</parameters>
</output>
</example>
</examples>
"""

def build_prompt(instructions, context, user_input):
    return f"""{instructions}

<context>
{context}
</context>

{EXAMPLES}

<input>
{user_input}
</input>

Write your reasoning inside <reasoning> tags, then the final answer inside <output> tags.
"""

message = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    system=SYSTEM,
    messages=[{
        "role": "user",
        "content": build_prompt(
            instructions="Document the following function for an internal API reference.",
            context="Target audience: backend engineers unfamiliar with this codebase.",
            user_input="def fetch(url, retries=3): ...",
        ),
    }],
)
```

## Notes

- Wrap distinct content types (`<context>`, `<examples>`, `<input>`) in their own XML tags so Claude parses a multi-part prompt unambiguously.
- Put the role in `system`; put the bulk of task content (context, examples, instructions) in the first `User` turn.
- 3-5 diverse, edge-case-covering examples in `<example>` tags are one of the most reliable ways to steer format and tone.
- Splitting the response into `<reasoning>` and `<output>` tags lets downstream code parse each independently with regex.
