# Long-Running Work

For multi-step work, give a clear outcome, constraints, and definition of done, and keep related work in the same chat. Goal mode (`/goal`) runs a task toward completion criteria.

## Signature / Usage

```text
Migrate this codebase from JavaScript to TypeScript. Preserve existing behavior,
compile in strict mode without explicit `any` types, and make the full test suite pass.
```

Start with `/goal` in the desktop app, Codex CLI, or IDE extension; the goal text becomes both the first prompt and the completion criteria.

## Options / Props

### Define what done means

| Goal element | What to include |
|--------------|-----------------|
| Outcome | The result you want, not only the activity. |
| Constraints | Required tools, boundaries, compatibility needs, approaches to avoid. |
| Verification | Tests, measurements, or review criteria proving completion. |

### Steering by surface

| Surface | How |
|---------|-----|
| Desktop app | `/goal`; progress row above the composer to pause, resume, edit, or clear the goal; send follow-ups; use a side chat for status without interrupting. Turn on **Prevent sleep while running** for local work. |
| Web | Use ChatGPT Work with outcome, constraints, review criteria in the prompt; continue in the same chat; separate chats for independent tasks. |
| CLI | `/goal` in an interactive session; follow-up messages or a status recap request. |
| IDE extension | `/goal` in the chat for the open workspace; keep the workspace available while it runs. |

## Notes

- If the outcome is unclear, start with `/plan`, have ChatGPT interview you and turn the result into a goal with measurable criteria, then start it with `/goal`.
- Starting a goal does not grant broader access; the same sandbox and approval policy applies and it pauses for decisions. With automatic approval reviews, a separate reviewer can evaluate eligible requests without expanding boundaries.
- Each chat keeps its own context, messages, results, and goal. Run chats in parallel but avoid two chats changing the same files; use worktrees for separate checkouts. On web, avoid giving two tasks write access to the same connected source.
- Pause the goal before you expect to lose connectivity, then resume.
- Source: https://learn.chatgpt.com/docs/long-running-work (retrieved 2026-11-14).

## Related

- [Automations](./automations.md)
- [Pets](./pets.md)
- [Notifications](../getting-started/notifications.md)
- [Working with agents](../getting-started/working-with-agents.md)
