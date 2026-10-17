---
source: https://www.electronjs.org/docs/latest/api/structures/jump-list-category
---

# Windows taskbar structures (JumpListCategory, JumpListItem, Task, ThumbarButton)

Object structures used by the Windows Jump List and thumbnail toolbar APIs (`app.setJumpList`, `app.setUserTasks`, `win.setThumbarButtons`).

## Signature / Usage

```js
app.setJumpList(categories)
app.setUserTasks(tasks)
win.setThumbarButtons(buttons)
```

The source pages for these structures contain no code examples; the block above lists the consuming API signatures (see the linked app / BrowserWindow pages), and the field tables below are verbatim from the structure pages.

## Options / Props

JumpListCategory Object:

| Name | Type | Description |
| --- | --- | --- |
| type | string (optional) | `tasks` - items placed into the standard `Tasks` category (only one, always displayed at the bottom of the Jump List); `frequent` - files frequently opened by the app, name and items set by Windows; `recent` - files recently opened by the app, name and items set by Windows (items may be added indirectly using `app.addRecentDocument(path)`); `custom` - tasks or file links, `name` must be set by the app. |
| name | string (optional) | Must be set if `type` is `custom`, otherwise it should be omitted. |
| items | JumpListItem[] (optional) | Array of JumpListItem objects if `type` is `tasks` or `custom`, otherwise it should be omitted. |

JumpListItem Object:

| Name | Type | Description |
| --- | --- | --- |
| type | string (optional) | `task` - launches an app with specific arguments; `separator` - separates items in the standard `Tasks` category; `file` - opens a file using the app that created the Jump List (the app must be registered as a handler for the file type, though not necessarily the default). |
| path | string (optional) | Path of the file to open, should only be set if `type` is `file`. |
| program | string (optional) | Path of the program to execute, usually `process.execPath`. Only if `type` is `task`. |
| args | string (optional) | Command line arguments when `program` is executed. Only if `type` is `task`. |
| title | string (optional) | Text displayed for the item in the Jump List. Only if `type` is `task`. |
| description | string (optional) | Description of the task (displayed in a tooltip). Only if `type` is `task`. Maximum length 260 characters. |
| iconPath | string (optional) | Absolute path to an icon displayed in a Jump List; can be an arbitrary resource file containing an icon (e.g. `.ico`, `.exe`, `.dll`). Usually `process.execPath`. |
| iconIndex | number (optional) | Zero-based index of the icon in the resource file; set to zero if the file contains only one icon. |
| workingDirectory | string (optional) | The working directory. Default is empty. |

Task Object:

| Name | Type | Description |
| --- | --- | --- |
| program | string | Path of the program to execute, usually `process.execPath`. |
| arguments | string | Command line arguments when `program` is executed. |
| title | string | The string displayed in a JumpList. |
| description | string | Description of this task. |
| iconPath | string | Absolute path to an icon displayed in a JumpList; can be an arbitrary resource file containing an icon. Usually `process.execPath`. |
| iconIndex | number | The icon index in the icon file; 0 if the file has one icon. |
| workingDirectory | string (optional) | The working directory. Default is empty. |

ThumbarButton Object:

| Name | Type | Description |
| --- | --- | --- |
| icon | NativeImage | The icon showing in thumbnail toolbar. |
| click | Function | |
| tooltip | string (optional) | The text of the button's tooltip. |
| flags | string[] (optional) | Control specific states and behaviors of the button. By default, it is `['enabled']`. |

`flags` values: `enabled` - the button is active and available; `disabled` - present but with a visual state indicating it will not respond to user action; `dismissonclick` - the thumbnail window closes immediately when the button is clicked; `nobackground` - do not draw a button border, use only the image; `hidden` - the button is not shown; `noninteractive` - enabled but not interactive, no pressed state is drawn (intended for buttons used in a notification).

## Notes

- If a `JumpListCategory` has neither `type` nor `name` set, its `type` is assumed to be `tasks`. If `name` is set but `type` is omitted, `type` is assumed to be `custom`.
- The maximum length of a Jump List item's `description` property is 260 characters; beyond this limit the item will not be added to the Jump List, nor displayed.
- Source pages: https://www.electronjs.org/docs/latest/api/structures/jump-list-item , https://www.electronjs.org/docs/latest/api/structures/task , https://www.electronjs.org/docs/latest/api/structures/thumbar-button
- Distinction: Electron objects mapping to Windows taskbar features (Jump List, thumbnail toolbar); the native Windows taskbar / shell integration APIs belong to windows-platform-integration.

## Related

- [app Jump List and User Tasks](../app/app-jump-list-single-instance.md)
- [BrowserWindow methods: progress bar, thumbar](../windows/browser-window-methods-content-taskbar.md)
- [Tray](./tray.md)
