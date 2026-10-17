---
source: https://www.electronjs.org/docs/latest/api/app#appsetusertaskstasks-windows
---

# app Jump List, User Tasks and Single Instance Lock

Windows Jump List / user tasks methods and the single instance lock of `app`. Process: Main.

## Signature / Usage

```js
const { app, BrowserWindow } = require('electron')

let myWindow = null

const additionalData = { myKey: 'myValue' }
const gotTheLock = app.requestSingleInstanceLock(additionalData)

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    // Print out data received from the second instance.
    console.log(additionalData)

    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  app.whenReady().then(() => {
    myWindow = new BrowserWindow({})
    myWindow.loadURL('https://electronjs.org')
  })
}
```

A very simple example of creating a custom Jump List with `app.setJumpList`:

```js
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  {
    // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        iconPath: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        iconPath: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  {
    // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

## Options / Props

| Name | Arguments | Returns | Description |
| --- | --- | --- | --- |
| `app.setUserTasks(tasks)` _Windows_ | `tasks` Task[] - Array of `Task` objects | `boolean` | Whether the call succeeded. Adds `tasks` to the Tasks category of the Jump List on Windows. If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead. |
| `app.getJumpListSettings()` _Windows_ | — | `Object` | `minItems` Integer - The minimum number of items that will be shown in the Jump List. `removedItems` JumpListItem[] - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items. |
| `app.setJumpList(categories)` _Windows_ | `categories` JumpListCategory[] \| `null` - Array of `JumpListCategory` objects. | `string` | Sets or removes a custom Jump List for the application, and returns one of the result strings listed in Notes. If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows). |
| `app.requestSingleInstanceLock([additionalData])` | `additionalData` Record\<any, any\> (optional) - A JSON object containing additional data to send to the first instance. | `boolean` | The return value indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately. I.e. this method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock. On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance. |
| `app.hasSingleInstanceLock()` | — | `boolean` | Whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`. |
| `app.releaseSingleInstanceLock()` | — | void | Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side. |

## Notes

* `app.setJumpList` returns one of the following strings:
  * `ok` - Nothing went wrong.
  * `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
  * `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
  * `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
  * `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.
* If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.
* Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.
* The maximum length of a Jump List item's `description` property is 260 characters. Beyond this limit, the item will not be added to the Jump List, nor will it be displayed.
* On macOS and Linux, the second instance's command line arguments and `additionalData` are sent to the primary instance in a single message that is limited to 32 MB. Larger messages are dropped: `requestSingleInstanceLock` still returns `false`, but the primary instance does not emit `second-instance`.
* This page documents the Electron Jump List API. For native Windows taskbar / jump list integration beyond Electron see windows-platform-integration.

## Related

* [app Events: windows, certificates, login, child processes](./app-events-windows-security.md)
* [app Recent Documents and Default Protocol Client](./app-recent-documents-protocol-client.md)
