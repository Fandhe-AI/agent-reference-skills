---
source: https://docs.rs/tauri/2.12.4/tauri/menu/index.html
---

# menu module (Menu, MenuBuilder, SubmenuBuilder, MenuItemBuilder, MenuEvent)

Menu types and utilities. Available on `desktop` only.

## Signature / Usage

```rust
use tauri::menu::*;
tauri::Builder::default()
  .setup(move |app| {
    let handle = app.handle();
    let menu = MenuBuilder::new(handle)
      .item(&MenuItem::new(handle, "MenuItem 1", true, None::<&str>)?)
      .items(&[
        &CheckMenuItem::new(handle, "CheckMenuItem 1", true, true, None::<&str>)?,
        &IconMenuItem::new(handle, "IconMenuItem 1", true, Some(icon1), None::<&str>)?,
      ])
      .separator()
      .cut()
      .copy()
      .paste()
      .separator()
      .text("item2", "MenuItem 2")
      .check("checkitem2", "CheckMenuItem 2")
      .icon("iconitem2", "IconMenuItem 2", app.default_window_icon().cloned().unwrap())
      .build()?;
    app.set_menu(menu);
    Ok(())
  });
```

```rust
use tauri::menu::*;
tauri::Builder::default()
  .setup(move |app| {
    let handle = app.handle();
    let menu = Menu::new(handle)?;
    let submenu = SubmenuBuilder::new(handle, "File")
      .item(&MenuItem::new(handle, "MenuItem 1", true, None::<&str>)?)
      .separator()
      .cut()
      .copy()
      .paste()
      .build()?;
    menu.append(&submenu)?;
    app.set_menu(menu);
    Ok(())
  });
```

```rust
pub struct Menu<R: Runtime>(/* private fields */);
pub struct MenuBuilder<'m, R: Runtime, M: Manager<R>> { /* private fields */ }
pub struct SubmenuBuilder<'m, R: Runtime, M: Manager<R>> { /* private fields */ }
pub struct MenuItemBuilder { /* private fields */ }
pub struct MenuEvent {
    pub id: MenuId,
}
```

## Options / Props

Module items:

| Kind | Name | Description |
| --- | --- | --- |
| Struct | AboutMetadata / AboutMetadataBuilder | Application metadata for `PredefinedMenuItem::about` and its builder. |
| Struct | CheckMenuItem / CheckMenuItemBuilder | A menu item with a check mark or similar toggle (checked / unchecked states), and its builder. |
| Struct | IconMenuItem / IconMenuItemBuilder | A menu item with an icon and a text, and its builder. |
| Struct | Menu / MenuBuilder | A menu bar on the window on Windows and Linux, or a global menu in the menubar on macOS, and its builder. |
| Struct | MenuEvent | Describes a menu event emitted when a menu item is activated. |
| Struct | MenuId | An unique id associated with a menu or a menu item. |
| Struct | MenuItem / MenuItemBuilder | A menu item containing only text, and its builder. |
| Struct | PredefinedMenuItem | A predefined (native) menu item with a predefined behavior by the OS or this crate. |
| Struct | Submenu / SubmenuBuilder | A submenu inside a `Menu` or `Submenu`, and its builder. |
| Enum | MenuItemKind | All menu item kinds that can be added to a `Menu` or `Submenu`. |
| Enum | NativeIcon | A native icon to be used for the menu item. |
| Const | HELP_SUBMENU_ID | Expected submenu id of the Help menu for macOS. |
| Const | WINDOW_SUBMENU_ID | Expected submenu id of the Window menu for macOS. |
| Trait | ContextMenu | Helper trait with methods to help creating a context menu. |
| Trait | IsMenuItem | Defines a generic item in a menu, which may be one of `MenuItemKind`. |

`Menu` methods:

| Method | Signature | Description |
| --- | --- | --- |
| new | `pub fn new<M: Manager<R>>(manager: &M) -> Result<Self>` | Creates a new menu. |
| with_id | `pub fn with_id<M: Manager<R>, I: Into<MenuId>>(manager: &M, id: I) -> Result<Self>` | Creates a new menu with the specified id. |
| with_items | `pub fn with_items<M: Manager<R>>(manager: &M, items: &[&dyn IsMenuItem<R>]) -> Result<Self>` | Creates a menu with given items (`new` + `append_items`). |
| with_id_and_items | `pub fn with_id_and_items<M: Manager<R>, I: Into<MenuId>>(manager: &M, id: I, items: &[&dyn IsMenuItem<R>]) -> Result<Self>` | Creates a menu with id and items. |
| default | `pub fn default(app_handle: &AppHandle<R>) -> Result<Self>` | Creates a menu filled with default menu items and submenus. |
| app_handle | `pub fn app_handle(&self) -> &AppHandle<R>` | The application handle associated with this type. |
| id | `pub fn id(&self) -> &MenuId` | Unique identifier of this menu. |
| append / append_items | `pub fn append(&self, item: &dyn IsMenuItem<R>) -> Result<()>` / `pub fn append_items(&self, items: &[&dyn IsMenuItem<R>]) -> Result<()>` | Add item(s) to the end. |
| prepend / prepend_items | `pub fn prepend(&self, item: &dyn IsMenuItem<R>) -> Result<()>` / `pub fn prepend_items(&self, items: &[&dyn IsMenuItem<R>]) -> Result<()>` | Add item(s) to the beginning. |
| insert / insert_items | `pub fn insert(&self, item: &dyn IsMenuItem<R>, position: usize) -> Result<()>` / `pub fn insert_items(&self, items: &[&dyn IsMenuItem<R>], position: usize) -> Result<()>` | Insert item(s) at `position`. |
| remove | `pub fn remove(&self, item: &dyn IsMenuItem<R>) -> Result<()>` | Remove a menu item. |
| remove_at | `pub fn remove_at(&self, position: usize) -> Result<Option<MenuItemKind<R>>>` | Remove the item at `position` and return it. |
| get | `pub fn get<'a, I>(&self, id: &'a I) -> Option<MenuItemKind<R>> where I: ?Sized, MenuId: PartialEq<&'a I>` | Retrieves the menu item matching the id. |
| items | `pub fn items(&self) -> Result<Vec<MenuItemKind<R>>>` | Returns the list of items added to this menu. |
| set_as_app_menu | `pub fn set_as_app_menu(&self) -> Result<Option<Menu<R>>>` | Alias for `AppHandle::set_menu`. |
| set_as_window_menu | `pub fn set_as_window_menu(&self, window: &Window<R>) -> Result<Option<Menu<R>>>` | Alias for `Window::set_menu`. |

`MenuBuilder` / `SubmenuBuilder` share chain methods: `id`, `item`, `items`, `text(id, text)`, `check(id, text)`, `icon(id, text, icon: Image)`, `native_icon(id, text, icon: NativeIcon)`, `separator`, and predefined items `copy`, `cut`, `paste`, `select_all`, `undo`, `redo`, `minimize`, `maximize`, `fullscreen`, `hide`, `hide_others`, `show_all`, `close_window`, `quit`, `about(metadata: Option<AboutMetadata>)`, `services`, `bring_all_to_front` (each except `separator` / `about` also has a `*_with_text<S: AsRef<str>>(text)` variant; `about_with_text(text, metadata)`). `MenuBuilder::new(manager: &'m M)`, `MenuBuilder::with_id(manager, id)`, `MenuBuilder::build(self) -> Result<Menu<R>>`. `SubmenuBuilder::new(manager: &'m M, text: S)`, `with_id(manager, id, text)`, `submenu_icon(icon: Image<'m>)`, `submenu_native_icon(icon: NativeIcon)`, `enabled(bool)`, `build(self) -> Result<Submenu<R>>`.

`MenuItemBuilder`:

| Method | Signature |
| --- | --- |
| new | `pub fn new<S: AsRef<str>>(text: S) -> Self` |
| with_id | `pub fn with_id<I: Into<MenuId>, S: AsRef<str>>(id: I, text: S) -> Self` |
| id | `pub fn id<I: Into<MenuId>>(self, id: I) -> Self` |
| enabled | `pub fn enabled(self, enabled: bool) -> Self` |
| accelerator | `pub fn accelerator<S: AsRef<str>>(self, accelerator: S) -> Self` |
| build | `pub fn build<R: Runtime, M: Manager<R>>(self, manager: &M) -> Result<MenuItem<R>>` |

`MenuEvent::id(&self) -> &MenuId` returns the id of the menu item which triggered the event.

## Notes

- In the first example `icon1` is an `Image` defined elsewhere (e.g. `app.default_window_icon().cloned().unwrap()`), and the `Result` returned by `app.set_menu(menu)` should be propagated with `?` in real code.
- macOS: a `Menu` / `MenuBuilder` used as the global menubar can only contain `Submenu`s; `append`, `append_items`, `prepend`, `prepend_items`, `insert`, `insert_items` accept only `Submenu`.
- Item text may contain an `&` before a character to assign it as the mnemonic; use `&&` to display a literal `&`.
- Platform support of predefined items: `undo`, `redo`, `fullscreen`, `show_all`, `services`, `bring_all_to_front` and `native_icon` are unsupported on Windows / Linux; `minimize`, `maximize`, `hide`, `hide_others`, `close_window`, `quit` are unsupported on Linux.
- `SubmenuBuilder::submenu_icon` resets the native icon; `submenu_native_icon` resets the icon.
- Menu events are delivered through `Builder::on_menu_event`, `App::on_menu_event` / `AppHandle::on_menu_event`, `TrayIconBuilder::on_menu_event` or `RunEvent::MenuEvent`.
- Tauri native menus (Rust), not Electron's `Menu` / `MenuItem`; see the electron skill.

## Related

- [Tray](./tray.md)
- [Builder](./builder.md)
- [RunEvent](./run-event.md)
- [Image](./image.md)
