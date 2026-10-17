---
source: https://www.electronjs.org/docs/latest/api/structures/permission-request
---

# Permission request structures

Object structures passed as `details` to `ses.setPermissionRequestHandler`: PermissionRequest, FilesystemPermissionRequest, MediaAccessPermissionRequest, OpenExternalPermissionRequest.

## Signature / Usage

The structure pages contain no code examples. The example below is from the `session` page (https://www.electronjs.org/docs/latest/api/session, `ses.setPermissionRequestHandler`):

```js
const { session } = require('electron')

const allowedPermissions = ['notifications']

session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback, details) => {
  const origin = new URL(details.requestingUrl).origin
  if (origin === 'https://example.com' && allowedPermissions.includes(permission)) {
    return callback(true) // granted.
  }

  callback(false) // denied.
})
```

## Options / Props

### PermissionRequest Object

| Name | Type | Description |
| --- | --- | --- |
| `requestingUrl` | string | The last URL the requesting frame loaded. |
| `isMainFrame` | boolean | Whether the frame making the request is the main frame. |

### FilesystemPermissionRequest Object extends `PermissionRequest`

| Name | Type | Description |
| --- | --- | --- |
| `filePath` | string (optional) | The path of the `fileSystem` request. |
| `isDirectory` | boolean (optional) | Whether the `fileSystem` request is a directory. |
| `fileAccessType` | string (optional) | The access type of the `fileSystem` request. Can be `writable` or `readable`. |

### MediaAccessPermissionRequest Object extends `PermissionRequest`

| Name | Type | Description |
| --- | --- | --- |
| `securityOrigin` | string (optional) | The security origin of the request. |
| `mediaTypes` | string[] (optional) | The types of media access being requested - elements can be `video` or `audio`. |

### OpenExternalPermissionRequest Object extends `PermissionRequest`

| Name | Type | Description |
| --- | --- | --- |
| `externalURL` | string (optional) | The url of the `openExternal` request. |

## Notes

* Adapted (not in the official docs): the official example grants every permission except notifications from one host and checks webContents.getURL(), which does not identify subframe requesters; this page checks details.requestingUrl and grants only allowlisted origin/permission pairs, denying everything else.
* Source pages (https://www.electronjs.org/docs/latest/api/structures/<name>): permission-request, filesystem-permission-request, media-access-permission-request, open-external-permission-request.
* These are the `details` union for `ses.setPermissionRequestHandler` ([session-methods-permissions.md](./session-methods-permissions.md)).

## Related

* [session-methods-permissions](./session-methods-permissions.md)
* [session-events-devices](./session-events-devices.md)
