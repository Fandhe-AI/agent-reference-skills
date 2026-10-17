---
source: https://www.electronjs.org/docs/latest/tutorial/windows-taskbar
---

# Windows Taskbar Customization

Configure the Windows taskbar presence: JumpList user tasks, thumbnail toolbar, icon overlay, and flash frame.

JumpList user tasks:

```js
const { app } = require('electron')

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

```js
const { app } = require('electron')

app.setUserTasks([])
```

Thumbnail toolbar:

```js
const { BrowserWindow, nativeImage } = require('electron')

const path = require('node:path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: nativeImage.createFromPath(path.join(__dirname, 'button1.png')),
    click() {
      console.log('button1 clicked')
    }
  },
  {
    tooltip: 'button2',
    icon: nativeImage.createFromPath(path.join(__dirname, 'button2.png')),
    flags: ['enabled', 'dismissonclick'],
    click() {
      console.log('button2 clicked.')
    }
  }
])
```

Icon overlay:

```js
const { BrowserWindow, nativeImage } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon(nativeImage.createFromPath('path/to/overlay.png'), 'Description for overlay')
```

Flash frame:

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

## Notes

- Calling `app.setUserTasks([])` clears the tasks; user tasks stay visible after the app closes, so the referenced icon and program must exist until uninstall. Clear the thumbnail toolbar with `win.setThumbarButtons([])`.
- Always turn flashing off with `win.flashFrame(false)` (here on `focus`).
- Distance: these are Electron wrappers for Windows taskbar extensions; native Windows shell integration (JumpList, taskbar APIs) is in windows-platform-integration. Cross-platform progress and recent documents are in the `progress-bar` and `recent-documents` samples.
