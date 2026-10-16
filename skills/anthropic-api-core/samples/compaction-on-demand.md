<!-- source: https://platform.claude.com/docs/en/build-with-claude/compaction-on-demand / last verified: 2026-10-17 -->

# Compaction on Demand

Ask Claude to summarize a conversation when your application chooses (beta header `compact-2026-09-04`), then continue from the returned `compaction` block.

Request a summary:

```python
from anthropic.types.beta import BetaMessageParam

client = anthropic.Anthropic()

history: list[BetaMessageParam] = [
    {
        "role": "user",
        "content": "I am building a recipe app. Help me name the main entities in the data model.",
    },
    {
        "role": "assistant",
        "content": "Start with Recipe, Ingredient, and Step. Add a RecipeIngredient entry that holds the quantity and unit for each ingredient in a recipe.",
    },
    {"role": "user", "content": "Good. Now suggest field names for Recipe."},
]

response = client.beta.messages.create(
    model="claude-opus-5-5",
    # max_tokens caps the whole call, including any thinking, so allow several thousand tokens.
    max_tokens=4096,
    betas=["compact-2026-09-04"],
    messages=history,
    compaction={"type": "summarize"},
)
print(f"Stop reason: {response.stop_reason}")
```

Response (the block alone, `stop_reason` `"compaction"`):

```json
{
  "id": "msg_013Zva2CMHLNnXjNJJKqJ2EF",
  "type": "message",
  "role": "assistant",
  "model": "claude-opus-5-5",
  "content": [
    {
      "type": "compaction",
      "content": "Summary of the conversation: the user is designing the data model for a recipe app. The entities agreed so far are Recipe, Ingredient, Step, and RecipeIngredient, which holds the quantity and unit. The user then asked for field names for Recipe.",
      "signature": "EuYBCkQY..."
    }
  ],
  "stop_reason": "compaction",
  "usage": {
    "input_tokens": 0,
    "output_tokens": 0,
    "iterations": [{ "type": "compaction", "input_tokens": 144, "output_tokens": 276 }]
  }
}
```

Continue from the summary (the block goes first in `messages`, summarized messages removed):

```json
{
  "model": "claude-opus-5-5",
  "max_tokens": 2048,
  "messages": [
    {
      "role": "assistant",
      "content": [
        {
          "type": "compaction",
          "content": "Summary of the conversation: the user is designing the data model for a recipe app. The entities agreed so far are Recipe, Ingredient, Step, and RecipeIngredient, which holds the quantity and unit. The user then asked for field names for Recipe.",
          "signature": "EuYBCkQY..."
        }
      ]
    },
    {
      "role": "assistant",
      "content": "For Recipe, use title, description, servings, prep_minutes, and cook_minutes. Add created_at and updated_at timestamps."
    },
    { "role": "user", "content": "Now do the same for Ingredient." }
  ]
}
```

Compact in a loop:

```python
from anthropic.types.beta import BetaMessageParam

client = anthropic.Anthropic()

# Set this near your real input budget. It is low here so a short conversation compacts.
COMPACT_AT_TOKENS = 2500
SYSTEM = "You help design a recipe app's data model. Keep answers short."

QUESTIONS = [
    "What are the main entities in the data model?",
    "Which fields should Recipe have?",
    "Which fields should Ingredient have?",
    "Which fields should RecipeIngredient have?",
    "Which fields should Step have?",
    "Which indexes should these tables have?",
    "Which fields should be required?",
    "Which fields should have default values?",
]

history: list[BetaMessageParam] = []
for turn, question in enumerate(QUESTIONS, start=1):
    history.append({"role": "user", "content": question})
    response = client.beta.messages.create(
        model="claude-opus-5-5",
        max_tokens=8192,
        system=SYSTEM,
        betas=["compact-2026-09-04"],
        messages=history,
    )
    history.append({"role": "assistant", "content": response.content})

    # The next request sends this reply too, so count it.
    conversation_tokens = response.usage.input_tokens + response.usage.output_tokens
    if conversation_tokens > COMPACT_AT_TOKENS and turn < len(QUESTIONS):
        summary = client.beta.messages.create(
            model="claude-opus-5-5",
            max_tokens=4096,
            system=SYSTEM,
            betas=["compact-2026-09-04"],
            messages=history,
            compaction={"type": "summarize"},
        )
        if summary.stop_reason == "compaction":
            history = [{"role": "assistant", "content": summary.content}]
            print(f"Compacted before turn {turn + 1}")
```

## Notes

- Send the `compact-2026-09-04` beta header on the compaction request and on every later request that carries the block. `compaction` cannot be combined with `context_management` on one request.
- Check `stop_reason == "compaction"` before reading the block; a missing summary still returns 200 with empty `content` (for example `max_tokens` cut-off), and the loop then keeps its history.
- Keep the block exactly as returned (including `signature`), put it first in `messages`, and remove the summarized messages; leftover summarized messages in front of the block return 400 `compaction_block_misplaced`.
- Send the same `system` and `tools` as the rest of the conversation. In Python use `client.beta.messages`; the SDK tool runner's `compact_before_next_turn()` can send the request for you.
