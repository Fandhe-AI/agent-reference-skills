# KiCad Preferences

Global preferences for KiCad covering graphics, user interface, file management, mouse/touchpad behavior, and hotkey customization.

## Signature / Usage

```
Preferences → Preferences…    Open the preferences dialog (default hotkey Ctrl+,)
KiCad → Settings…             macOS
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
| Show popup indicator when toggling settings with hotkeys | Briefly shows a popup when a hotkey cycles between settings |
| Use alternating row colors in tables | Alternating row colors in tables such as library tables and the Symbol Fields table |
| Disable custom cursors | Uses system cursors instead of custom context-specific cursors |
| Icon scale | Adjusts menu and button icon sizes; **Automatic** option available |
| Icon theme | Light or dark background icon theme; default **Automatic** chooses by OS window theme lightness |
| High-contrast mode dimming factor | Controls how much non-focused items are dimmed |

### Scaling

| Setting | Description |
|---------|-------------|
| Display PPI | Pixel density so objects are life sized at 100% zoom; **Detect** button uses the display-reported density |

### Interaction Behavior

| Setting | Description |
|---------|-------------|
| Warp mouse to origin of moved object | Repositions cursor when starting move commands |
| First hotkey selects tool | Determines whether a hotkey immediately activates a command or only selects the tool |

### File Management

| Setting | Description |
|---------|-------------|
| Remember open files for next project launch | Auto-reopens previously open files on next launch |
| Auto save | Interval for automatic saving; set to 0 to disable (not found in the 10.0 manual) |
| File history size | Configures the length of the recent files list (not found in the 10.0 manual) |

### Project Backup

| Setting | Description |
|---------|-------------|
| Automatically backup projects | Makes backups and autosaves of the current project; an autosave is written after a few seconds of inactivity with unsaved changes, and a backup is made on each manual save |
| Format | **Incremental** (snapshots in a Git repository in a hidden `.history` folder, shown in View → Panels → Local History; restore with right-click → Restore Commit) or **Zip archive** (restore with the Unarchive tool or manual extraction) |
| Location | Project directory or KiCad user data (configuration) directory |
| Maximum total backup size | Oldest backups are deleted to keep the backup directory below this limit |
| Create backups when auto save occurs | Not found in the 10.0 manual |
| Maximum backups to keep / Maximum backups per day / Minimum time between backups | Not found in the 10.0 manual |

3D cache file duration is documented under Maintenance Preferences below.

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
| Middle mouse button | Drag behavior: zoom, pan, or no effect |
| Right mouse button | Drag behavior: zoom, pan, or no effect |
| Left mouse button | Drag behavior depends on whether objects are already selected; the left button always selects and manipulates objects |
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
- The same hotkey can be assigned to different actions in different programs, but not to more than one action in the same program
- Double-click a command to assign a hotkey
- If the chosen hotkey is already used, you may reassign it, which removes it from the conflicting command
- Changed commands are marked with a trailing `*`; right-click → Undo Changes reverts one command, the button below the list reverts all
- Hotkeys are stored in `.hotkeys` files in the KiCad settings directory; import them with the Import Hotkeys… button

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
| I agree to provide anonymous reports | Sends anonymous reports to KiCad developers on crashes; disabled by default; reports do not contain design files |
| Unique identifier | Random ID linking reports from the same computer; no PII stored |
| Reset Unique Id | Regenerates the identifier |

> Crash reporting is only supported on Windows and macOS platforms.

## Packages and Updates Preferences

| Setting | Description |
|---------|-------------|
| Check for KiCad updates on startup | Notifies of application updates |
| Check for package updates on startup | Alerts to available package versions |
| Automatically add installed libraries to global library table | Adds PCM libraries to library tables |
| Library nickname prefix | Prefix used for the nickname of installed libraries |
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

- Hotkey configurations are **not** imported from previous versions; use Import Hotkeys… on the Hotkeys page of Preferences
- Auto save interval and File history size are not found in the 10.0 manual (autosave is described under Project backup)
- Crash reporting (Data Collection) is supported on Windows and macOS only

## Related

- [Actions Reference](./10-actions-reference.md)
- [Installing and Upgrading KiCad](./02-installing-and-upgrading-kicad.md)
