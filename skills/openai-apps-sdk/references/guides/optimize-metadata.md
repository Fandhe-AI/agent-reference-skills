# Optimize Metadata

Guide for tuning tool names, descriptions, and parameter docs so ChatGPT/Codex reliably select the right tool and avoid accidental activations.

## Signature / Usage

```text
Golden prompt set -> draft metadata -> evaluate in developer mode -> iterate -> monitor in production
```

## Notes

- Why metadata matters: ChatGPT and Codex decide when to call a tool based on the provided metadata. Treat names, descriptions, and parameter docs like product copy that needs iteration, testing, and analytics.
- Gather a golden prompt set before tuning: direct prompts (explicitly name the product/data source), indirect prompts (describe desired outcome without naming the tool), and negative prompts (cases where built-in or other tools should handle the request). Document expected behavior for each and reuse this set for regression testing.
- Draft metadata guidance:
  - **Name**: pair the domain with the action (e.g. `calendar.create_event`).
  - **Description**: start with "Use this when…" and call out disallowed cases (e.g. "Do not use for reminders").
  - **Parameter docs**: describe each argument, include examples, and use allowed values for constrained inputs.
  - **Read-only hint**: annotate `readOnlyHint: true` on tools that only retrieve or compute information and never create, update, delete, or send data outside the conversation.
  - For non-read-only tools: annotate `destructiveHint: false` on tools that do not delete or overwrite user data, and `openWorldHint: false` on tools that do not publish content or reach outside the user's account.
- Evaluate in developer mode: enable Developer mode in ChatGPT (Settings -> Security and login), register the MCP server at ChatGPT Plugins, run the golden prompt set, and record which tool was selected, what arguments were passed, and whether the component rendered. Track precision (right tool ran?) and recall (tool ran when it should?).
- If the model picks the wrong tool, revise descriptions to emphasize the intended scenario or narrow the tool's scope.
- Iterate methodically: change one metadata field at a time, log revisions with timestamps and test results, and share diffs with reviewers before deploying.
- After each revision, repeat the evaluation. Prioritize high precision on negative prompts before chasing marginal recall improvements.
- Production monitoring: review tool-call analytics weekly (spikes in "wrong tool" confirmations usually indicate metadata drift), capture user feedback to update descriptions, and schedule periodic prompt replays especially after adding tools or changing structured fields.

## Related

- [Security & Privacy](./security-privacy.md)
