---
source: https://www.electronjs.org/docs/latest/tutorial/navigation-history
---

# Navigation History

Go back and forward, list entries, jump to an index, and restore history into another window with `webContents.navigationHistory`.

```js
const { BrowserWindow } = require('electron')

const mainWindow = new BrowserWindow()
const { navigationHistory } = mainWindow.webContents
```

```js
// Go back
if (navigationHistory.canGoBack()) {
  navigationHistory.goBack()
}

// Go forward
if (navigationHistory.canGoForward()) {
  navigationHistory.goForward()
}
```

```js
const entries = navigationHistory.getAllEntries()

entries.forEach((entry) => {
  console.log(`${entry.title}: ${entry.url}`)
})
```

```js
// Navigate to the 5th entry in the history, if the index is valid
navigationHistory.goToIndex(4)

// Navigate to the 2nd entry forward from the current position
if (navigationHistory.canGoToOffset(2)) {
  navigationHistory.goToOffset(2)
}
```

```js
const firstWindow = new BrowserWindow()

// Later, you want a second window to have the same history and navigation position
async function restore() {
  const entries = firstWindow.webContents.navigationHistory.getAllEntries()
  const index = firstWindow.webContents.navigationHistory.getActiveIndex()

  const secondWindow = new BrowserWindow()
  await secondWindow.webContents.navigationHistory.restore({ index, entries })
}
```

## Notes

- Navigation history is per `WebContents`. Index 0 is the earliest visited page and index N the most recent.
- `navigationHistory.restore({ index, entries })` restores both the stack and the position, e.g. for an "undo close tab" feature.
- The official fiddle `docs/fiddles/features/navigation-history` uses `BrowserView` (deprecated; see `WebContentsView`), so this sample uses the tutorial's inline snippets only.
