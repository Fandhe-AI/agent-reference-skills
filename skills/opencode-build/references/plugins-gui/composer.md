---
source: https://opencode.ai/docs/build/plugins/gui/#attach-to-the-composer
---

# Composer

`ctx.screen.current()?.composer` attaches parts to, reads, writes, and chooses the model for the user's next prompt.

## Signature / Usage

### Attach to the composer

Use `ctx.screen.current()?.composer` in an event handler or command to attach a file, a note, or a quote to the user's
next prompt.

```ts
const composer = ctx.screen.current()?.composer

composer?.attach({
  type: "note",
  origin: ctx.id,
  commentID: crypto.randomUUID(),
  label: "button#submit",
  icon: "globe",
  subject: 'element <button id="submit">Save</button>',
  comment: "Make this button primary and disable it while saving.",
  href: "http://localhost:3000/settings",
})
```

- `attach` leaves keyboard focus where it is. Call `focus()` to move it to the prompt.
- `update(commentID, { comment?, preview? })` changes an attached part; a note or a quote takes only a new `comment`.
- `detach(commentID)` removes an attached part.
- A note's `live` replaces its `subject` and `href` while the note stays in this app process, for references only this
  process can resolve, such as a page element. A stored draft drops it, and so does a sent message that a revert or a
  fork restores.

A quote is text the user quoted from something your plugin shows, such as log output, with an optional comment. It
renders like a quote from the session timeline, under the source's icon and label. Check `quotable()` first: it is
`false` in a subagent's session, which has no composer, and while the composer runs shell commands.

```ts
const composer = ctx.screen.current()?.composer

if (composer?.quotable()) {
  const commentID = crypto.randomUUID()

  composer.attach({
    type: "quote",
    commentID,
    text: selection,
    source: { label: ctx.t("source.label"), icon: "console", subject: "the Acme log" },
  })
  composer.focus(commentID)
}
```

- `source.subject` names the source for the model, for example `the terminal`. It is not localized.
- Omit `comment` to let the user add one from the chip.
- `focus(commentID)` opens the comment editor of an attached quote. While the composer is not shown, such as on a narrow
  screen that shows a panel, the editor opens once the composer shows.
- The model reads `The user quoted the following from <subject>:`, then the text with each line prefixed with `> `,
  then the comment, if any.

#### Reference

```ts
interface ComposerFile {
  type: "file"
  path: string
  selection?: { startLine: number; endLine: number; startChar: number; endChar: number }
  preview?: string
  comment?: string
  commentID?: string
  commentOrigin?: "review" | "file"
}

interface ComposerNote {
  type: "note"
  origin: string
  commentID: string
  label: string
  icon: IconName
  subject: string
  comment: string
  href?: string
  live?: { subject: string; href?: string }
}

interface ComposerQuote {
  type: "quote"
  commentID: string
  text: string
  comment?: string
  source: { label: string; icon: IconName; subject: string }
}
```

### Read and write the prompt

Read what the user typed with `text()`, and whether they are typing with `focused()`:

```ts
const composer = ctx.screen.current()?.composer
const empty = !composer?.text().trim()
```

- `text()` is the prompt as plain text: a mention reads as its `@` text, and attachments and attached parts are left
  out. In shell mode, it is the shell command. It is `""` until the session's draft loads, and in a subagent's session,
  which has no composer. It is reactive.
- `focused()` is `true` while keyboard focus is in the prompt. It is not reactive, so read it where you act, such as in
  a command's `run`.

`insert(text)` types text into the prompt for the user to review and send. Nothing on the composer sends the prompt.

```ts
const composer = ctx.screen.current()?.composer

composer?.insert(`Explain ${path}`)
composer?.focus()
```

- `insert` adds the text at the cursor the user last left in the prompt, else at the end, and moves the cursor after
  it. It does not replace selected text.
- The text is not parsed: `@path` stays text, not a mention.
- `setText(text)` replaces the prompt's text, mentions included. Attachments and attached parts stay. `setText("")`
  clears the text.
- Both leave keyboard focus where it is. Call `focus()` to move it to the prompt.
- A write made before the session's stored draft loads (`insert`, `setText`, `attach`, `update`, or `detach`) waits for
  it. It then applies to the session that was routed when you called it, in call order. It never replaces the stored
  draft.
- In a subagent's session, which has no composer, the writes do nothing.

### Choose the model

`model()` is the model the next prompt is sent with, and `setModel` selects one as the model picker does:

```ts
const composer = ctx.screen.current()?.composer

if (composer && !composer.setModel({ providerID: "anthropic", modelID: "claude-sonnet-4-5", variant: "high" })) {
  ctx.toast.show({ variant: "error", title: ctx.t("model.unavailable") })
}
```

- `model()` is the user's choice for the routed session, else the agent's default, else the app's default. It is
  `undefined` while the model catalog loads, when no connected provider offers the model, and in a subagent's session.
  It is reactive.
- `setModel` makes the model the session's choice and its first recent model. Without `variant`, the model keeps the
  variant the picker would show for it.
- `setVariant(variant)` selects a variant of the current model. `undefined` selects the model's default variant.
- `setModel` returns `false`, and changes nothing, while the catalog loads, when no connected provider offers the
  model, or when the model has no such variant.
- `setVariant` returns `false`, and changes nothing, when there is no current model or the model has no such variant.
- Both return `false` in a subagent's session.

#### Reference

```ts
interface Composer {
  text(): string
  insert(text: string): void
  setText(text: string): void
  model(): ComposerModel | undefined
  setModel(model: ComposerModel): boolean
  setVariant(variant: string | undefined): boolean
  attach(part: ComposerFile | ComposerNote | ComposerQuote): void
  quotable(): boolean
  focus(commentID?: string): void
  update(id: string, patch: { comment?: string; preview?: string }): void
  detach(id: string): void
  focused(): boolean
}

interface ComposerModel {
  providerID: string
  modelID: string
  variant?: string
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Sessions and the session screen](./sessions-screen.md)
- [Composer pills](./composer-pill.md)
