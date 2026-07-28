# Custom text input and IME (CoreTextEditContext)

Enables a custom (non-`TextBox`) edit control to receive text from any Windows text service — hardware/software keyboard, IME composition, speech, or handwriting — via `Windows.UI.Text.Core.CoreTextEditContext`.

## Signature / Usage

```csharp
private void OnTextUpdating(CoreTextEditContext sender, CoreTextTextUpdatingEventArgs args)
{
    // Insert args.Text at args.Range, move selection to args.NewSelection.
    InsertText(args.Range, args.Text);
    SetSelection(args.NewSelection);

    args.Result = CoreTextTextUpdatingResult.Succeeded;
}

private void OnTextRequested(CoreTextEditContext sender, CoreTextTextRequestedEventArgs args)
{
    args.Request.Text = GetText(args.Request.Range);
}
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `CoreTextEditContext` | class (`Windows.UI.Text.Core`) | Central object mediating communication between a custom edit control and Windows text services. |
| `CoreTextEditContext.TextUpdating` | event | Raised when a text service (keyboard, IME, speech) wants to insert/replace text; handler must apply or reject the change via `CoreTextTextUpdatingEventArgs.Result`. |
| `CoreTextEditContext.TextRequested` | event | Raised when a text service needs the current text for a range; handler must populate `CoreTextTextRequestedEventArgs.Request.Text`. |
| `CoreTextEditContext.SelectionRequested` / `SelectionUpdating` | event | Selection-range equivalents of `TextRequested`/`TextUpdating`. |
| `CoreTextEditContext.NotifyTextChanged(range, newLength, newSelection)` | method | Call when the edit control changes text itself (paste, autocorrect) to keep text services in sync. |
| `CoreTextEditContext.NotifyFocusLeave()` / `FocusRemoved` (context loses focus) | method / event | Signals the edit control losing/regaining input focus. |
| `CoreTextRange` | struct | `StartCaretPosition` / `EndCaretPosition` — zero-based Application Caret Position (ACP) offsets; equal start/end represents the insertion point. |
| `CoreTextTextUpdatingEventArgs.Result` | `CoreTextTextUpdatingResult` | `Succeeded` or `Failed` — must be set in the `TextUpdating` handler. |

## Notes

- Namespace: `Windows.UI.Text.Core` (UWP). Distinct from `CoreWindow` keyboard APIs, which cannot receive IME composition input required for East Asian languages — use `CoreTextEditContext` whenever building a custom text edit control that must support IME.
- The core text APIs support only a single contiguous selection; noncontiguous selections (e.g. Office-style multi-select) must be reported as one active sub-range.
- Most apps should prefer the built-in `TextBox`/`RichEditBox` controls, which already integrate with `CoreTextEditContext` internally; use this API directly only for fully custom edit controls.

## Related

- [Keyboard input](./keyboard-input.md)
