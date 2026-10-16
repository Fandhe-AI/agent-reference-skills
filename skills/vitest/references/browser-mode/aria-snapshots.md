# ARIA Snapshots

Experimental (Vitest 4.1.4+). Assert against the accessibility tree with `toMatchAriaSnapshot()` / `toMatchAriaInlineSnapshot()`.

## Signature / Usage

```ts
await expect.element(page.getByRole('navigation')).toMatchAriaInlineSnapshot(`
  - navigation "Main":
    - link "Home":
      - /url: /
    - link "About":
      - /url: /about
`)
```

File snapshot (stored in `.snap`):

```ts
test('login form', async () => {
  await expect.element(page.getByRole('form')).toMatchAriaSnapshot()
})
```

Child matching directive:

```ts
await expect.element(page.getByRole('list')).toMatchAriaInlineSnapshot(`
  - list "Features":
    - /children: equal
    - listitem: Feature A
    - listitem: Feature B
    - listitem: Feature C
`)
```

## Options / Props

Snapshot node format: `- role "name" [attribute=value]`

| HTML | Snapshot |
|------|----------|
| `<input type="checkbox" checked aria-label="Agree">` | `- checkbox "Agree" [checked]` |
| `<input type="checkbox" aria-checked="mixed" aria-label="Select all">` | `- checkbox "Select all" [checked=mixed]` |
| `<button aria-disabled="true">Submit</button>` | `- button "Submit" [disabled]` |
| `<button aria-expanded="true">Menu</button>` | `- button "Menu" [expanded]` |
| `<h2>Title</h2>` | `- heading "Title" [level=2]` |
| `<button aria-pressed="true">Bold</button>` | `- button "Bold" [pressed]` |
| `<option selected>English</option>` | `- option "English" [selected]` |

| `/children` mode | Directive | Behavior |
|------------------|-----------|----------|
| Partial | default or `/children: contain` | Template children are an ordered subsequence; extra actual children ignored |
| Exact | `/children: equal` | Immediate children must match exactly; descendants stay partial |
| Deep exact | `/children: deep-equal` | All levels must match exactly |

Pseudo-attributes: `/url:` (links), `/placeholder:` (only when different from the accessible name).

## Notes

- Uses the normal snapshot workflow (`--update` / `-u`, watch, CI behavior).
- In Browser Mode `expect.element()` polls until the tree is stable (two consecutive identical captures); with an existing snapshot, polling resets and continues if the stable result does not match.
- Hand-edited regex patterns (`/pattern/`) survive `--update`; only mismatched literals are overwritten. Backslashes must be doubled when hand-editing (`/item \\d+/`).
- Templates use a subset of YAML (scalars, mappings, sequences). Text is whitespace-normalized to a single line. Elements hidden from the accessibility tree (`aria-hidden="true"`, `display: none`) do not appear.
- `utils.aria` from `vitest/browser` generates / inspects the ARIA tree (see Context API).
- Source: https://vitest.dev/guide/browser/aria-snapshots (Vitest v5.0.5)

## Related

- [Context API](./context-api.md)
- [Assertion API (expect.element)](./assertions.md)
