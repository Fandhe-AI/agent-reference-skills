# KiCad Preferences

Global preferences for KiCad covering graphics, user interface, file management, mouse/touchpad behavior, and hotkey customization.

## Signature / Usage

```
Preferences → Preferences…    Open the preferences dialog
```

## Common Preferences

### Graphics Rendering

| Setting | Description |
|---------|-------------|
| Accelerated graphics antialiasing | Prevents jagged lines using GPU-based methods |
| Fallback graphics antialiasing | Applies antialiasing in software fallback mode; may reduce performance |

### External Applications

| Setting | Description |
|---------|-------------|
| Text editor | Program used for opening text files |
| PDF viewer | Application used for opening PDF files |

### User Interface

| Setting | Description |
|---------|-------------|
| Show icons in menus | Enables icons in menus (OS-dependent availability) |
| Show scrollbars in editors | Toggles scrollbar visibility in editing canvases |
| Focus follows mouse between schematic and PCB editors | Auto-focuses the window under the cursor |
| Icon scale | Adjusts menu and button icon sizes; **Automatic** option available |
| Icon theme | Light or dark background icon theme; **Automatic** selection option |
| High-contrast mode dimming factor | Controls how much non-focused items are dimmed |

### Interaction Behavior

| Setting | Description |
|---------|-------------|
| Warp mouse to origin of moved object | Repositions cursor when starting move commands |
| First hotkey selects tool | Determines whether a hotkey immediately activates a command or only selects the tool |

### File Management

| Setting | Description |
|---------|-------------|
| Remember open files for next project launch | Auto-reopens previously open files on next launch |
| Auto save | Interval for automatic saving; set to 0 to disable |
| File history size | Configures the length of the recent files list |

### 3D Cache and Backups

| Setting | Description |
|---------|-------------|
| 3D cache file duration | Retention period for the 3D model cache |
| Automatically backup projects | Creates periodic ZIP archives of the project |
| Create backups when auto save occurs | Triggers a backup alongside each auto-save event |
| Maximum backups to keep | Limits the total number of backup files |
| Maximum backups per day | Restricts the number of backups created per day |
| Minimum time between backups | Prevents excessively frequent backup creation |
| Maximum total backup size | Controls the total size of the backup directory |

## Mouse and Touchpad Preferences

### Zoom Behavior

| Setting | Description |
|---------|-------------|
| Center and warp cursor on zoom | Centers the view on the cursor position during zoom |
| Use zoom acceleration | Faster scrolling produces faster zooming |
| Zoom speed | Controls the zoom change rate; **Automatic** option available |

### Pan and Movement

| Setting | Description |
|---------|-------------|
| Automatically pan while moving object | View pans when a moved object approaches the canvas edge |
| Auto pan speed | Adjusts the speed of automatic panning during object movement |

### Button Configuration

| Setting | Description |
|---------|-------------|
| Middle mouse button | Configurable for zoom, pan, or inactive |
| Right mouse button | Configurable for zoom, pan, or inactive |
| Pan on mouse movement with key | Enables panning with a designated key combination |

### Scrolling

| Setting | Description |
|---------|-------------|
| Wheel and touchpad scroll with modifier keys | Configures scroll behavior with Ctrl/Shift/Alt modifiers |
| Pan left/right with horizontal movement | Enables horizontal panning via touchpad or horizontal scroll wheel |

## SpaceMouse Preferences

| Setting | Description |
|---------|-------------|
| Rotation speed | Controls rotational responsiveness of the SpaceMouse peripheral |
| Pan speed | Controls panning responsiveness |
| Reverse rotation direction | Inverts rotation orientation |
| Reverse vertical pan direction | Inverts vertical panning |
| Reverse horizontal pan direction | Inverts horizontal panning |
| Reverse zoom direction | Inverts zoom orientation |

## Hotkey Preferences

All KiCad commands can be assigned custom keyboard shortcuts.

- Common hotkeys apply across all editors; program-specific hotkeys appear when the respective application is active
- Double-click a command to assign a hotkey
- Conflict detection warns when reusing an existing hotkey
- Changes marked with asterisks can be individually undone; "Undo All" reverts all changes
- Hotkey configurations can be exported/imported as `.hotkeys` files from the KiCad settings directory

## Version Control Preferences

| Setting | Description |
|---------|-------------|
| Enable Git tracking | Activates Git tools in the project manager |
| Update interval | Frequency of remote update checks (set to 0 to disable) |
| Use default values | Uses system Git configuration for commits |
| Custom author name | Specifies committer identity |
| Custom email address | Specifies committer contact information |

## Data Collection Preferences

| Setting | Description |
|---------|-------------|
| Anonymous crash reports | Enables diagnostic data transmission to KiCad developers |
| Unique identifier | Random ID linking reports from the same computer |
| Reset Unique Id | Regenerates the identifier at user discretion |

> Crash reporting is only supported on Windows and macOS platforms.

## Packages and Updates Preferences

| Setting | Description |
|---------|-------------|
| Check for KiCad updates on startup | Notifies of application updates |
| Check for package updates on startup | Alerts to available package versions |
| Automatically add installed libraries | Adds PCM libraries to library tables |
| Library nickname prefix | Customizable designation for installed libraries |
| Automatically remove uninstalled libraries | Deletes PCM libraries from tables upon uninstallation |

## Plugins Preferences

| Setting | Description |
|---------|-------------|
| Enable KiCad API | Activates IPC plugin functionality |
| Path to Python interpreter | Specifies Python executable location |
| Auto-detect interpreter | Automatically locates Python installation |

## Maintenance Preferences

| Setting | Description |
|---------|-------------|
| 3D cache file duration | Retention period for cached 3D models |
| Clear "Open Recent" History | Removes project entries from the File menu |
| Reset "Don't Show Again" Dialogs | Restores previously dismissed dialog notifications |
| Reset All Dialogs to Defaults | Reverts dialog settings to factory state |
| Reset All Program Settings to Defaults | Reverts comprehensive preference configuration |

## Notes

- Hotkey configurations are **not** imported automatically when upgrading to a new major version; use the import function in the Preferences dialog
- Auto-save interval of 0 disables automatic saving entirely
- Crash reporting (Data Collection) is supported on Windows and macOS only

## Related

- [Actions Reference](./10-actions-reference.md)
- [Installing and Upgrading KiCad](./02-installing-and-upgrading-kicad.md)
