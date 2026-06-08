# studio

`@theatre/studio` package API and UI reference.

| Name | Description | Path |
|------|-------------|------|
| studio.initialize | Sets up the Studio UI once per app; call before `studio.extend()` | [studio-initialize.md](./studio-initialize.md) |
| studio.extend | Registers an extension adding toolbar items and custom panes | [studio-extend.md](./studio-extend.md) |
| studio.transaction | Executes property changes as a single undoable action | [studio-transaction.md](./studio-transaction.md) |
| studio.scrub | Accumulates continuous captures into one undo entry | [studio-scrub.md](./studio-scrub.md) |
| studio.selection | Read/write access to the current sheet/object selection | [studio-selection.md](./studio-selection.md) |
| studio.createPane | Opens a pane window from an extension-registered class | [studio-create-pane.md](./studio-create-pane.md) |
| studio.getStudioProject | Returns the internal Studio project for extension state persistence | [studio-get-studio-project.md](./studio-get-studio-project.md) |
| studio.createContentOfSaveFile | Exports project state as JSON for custom persistence backends | [studio-create-content-of-save-file.md](./studio-create-content-of-save-file.md) |
| Studio UI | Overview of Studio panels: Outline, Details, Sequence Editor, Dope Sheet | [studio-ui.md](./studio-ui.md) |
| Keyboard & Mouse Controls | All keyboard shortcuts and mouse interactions for Studio | [keyboard-mouse-controls.md](./keyboard-mouse-controls.md) |
| Authoring Extensions | Guide to building toolbar buttons, panes, and selection listeners | [authoring-extensions.md](./authoring-extensions.md) |
