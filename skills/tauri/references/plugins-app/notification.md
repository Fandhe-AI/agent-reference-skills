---
source: https://v2.tauri.app/plugin/notification/
---

# Notifications

Send native notifications to your user using the notification plugin. Plugin `tauri-plugin-notification` 2.7.0 / `@tauri-apps/plugin-notification` (tag `notification-v2.7.0`).

## Signature / Usage

To send a notification: check if permission is granted, request permission if not granted, then send the notification.

JavaScript:

```javascript
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';
// when using `"withGlobalTauri": true`, you may use
// const { isPermissionGranted, requestPermission, sendNotification, } = window.__TAURI__.notification;

// Do you have permission to send a notification?
let permissionGranted = await isPermissionGranted();

// If not we need to request it
if (!permissionGranted) {
  const permission = await requestPermission();
  permissionGranted = permission === 'granted';
}

// Once permission has been granted we can send the notification
if (permissionGranted) {
  sendNotification({ title: 'Tauri', body: 'Tauri is awesome!' });
}
```

Rust:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_notification::init())
    .setup(|app| {
        use tauri_plugin_notification::NotificationExt;
        app.notification()
            .builder()
            .title("Tauri")
            .body("Tauri is awesome")
            .show()
            .unwrap();

        Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
```

### Setup

Automatic:

```sh
npm run tauri add notification
cargo tauri add notification
```

Manual:

1. `cargo add tauri-plugin-notification` (in `src-tauri`)
2. Initialize in `src-tauri/src/lib.rs`:

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

3. For JavaScript: `npm install @tauri-apps/plugin-notification`

### Supported Platforms

Minimum Rust version 1.90.

| Platform | Level | Notes |
| --- | --- | --- |
| Windows | Full support | Only works for installed apps. Shows powershell name & icon in development. |
| Linux | Full support | |
| macOS | Full support | |
| Android | Full support | |
| iOS | Full support | |

### Actions

Mobile only. Actions add interactive buttons and inputs to notifications.

```javascript
import { registerActionTypes } from '@tauri-apps/plugin-notification';

await registerActionTypes([
  {
    id: 'messages',
    actions: [
      {
        id: 'reply',
        title: 'Reply',
        input: true,
        inputButtonTitle: 'Send',
        inputPlaceholder: 'Type your reply...',
      },
      {
        id: 'mark-read',
        title: 'Mark as Read',
        foreground: false,
      },
    ],
  },
]);
```

| Property | Description |
| --- | --- |
| `id` | Unique identifier for the action |
| `title` | Display text for the action button |
| `requiresAuthentication` | Requires device authentication |
| `foreground` | Brings app to foreground when triggered |
| `destructive` | Shows action in red on iOS |
| `input` | Enables text input |
| `inputButtonTitle` | Text for input submit button |
| `inputPlaceholder` | Placeholder text for input field |

Listen to user interactions with notification actions:

```javascript
import { onAction } from '@tauri-apps/plugin-notification';

await onAction((event) => {
  console.log('Action performed:', event);
});
```

### Attachments

Attachments add media content to notifications. Support varies by platform; test attachments on your target platforms.

```javascript
import { sendNotification } from '@tauri-apps/plugin-notification';

sendNotification({
  title: 'New Image',
  body: 'Check out this picture',
  attachments: [
    {
      id: 'image-1',
      url: 'asset:///notification-image.jpg',
    },
  ],
});
```

| Property | Description |
| --- | --- |
| `id` | Unique identifier |
| `url` | Content URL using asset:// or file:// protocol |

### Channels

Channels organize notifications into categories with different behaviors. Primarily used on Android, they provide a consistent API across platforms.

```javascript
import {
  createChannel,
  Importance,
  Visibility,
} from '@tauri-apps/plugin-notification';

await createChannel({
  id: 'messages',
  name: 'Messages',
  description: 'Notifications for new messages',
  importance: Importance.High,
  visibility: Visibility.Private,
  lights: true,
  lightColor: '#ff0000',
  vibration: true,
  sound: 'notification_sound',
});
```

| Property | Description |
| --- | --- |
| `id` | Unique identifier |
| `name` | Display name |
| `description` | Purpose description |
| `importance` | Priority level (None, Min, Low, Default, High) |
| `visibility` | Privacy setting (Secret, Private, Public) |
| `lights` | Enable notification LED (Android) |
| `lightColor` | LED color (Android) |
| `vibration` | Enable vibrations |
| `sound` | Custom sound filename |

Manage channels:

```javascript
import { channels, removeChannel } from '@tauri-apps/plugin-notification';

const existingChannels = await channels();
await removeChannel('messages');
```

Use a channel:

```javascript
import { sendNotification } from '@tauri-apps/plugin-notification';

sendNotification({
  title: 'New Message',
  body: 'You have a new message',
  channelId: 'messages',
});
```

Create channels before sending notifications that reference them. Invalid channel IDs prevent notifications from displaying.

### Permissions

Default permission set `notification:default`: allows all notification related features. It includes `allow-is-permission-granted`, `allow-request-permission`, `allow-notify`, `allow-register-action-types`, `allow-register-listener`, `allow-remove-listener`, `allow-cancel`, `allow-get-pending`, `allow-remove-active`, `allow-get-active`, `allow-check-permissions`, `allow-show`, `allow-batch`, `allow-list-channels`, `allow-delete-channel`, `allow-create-channel`, `allow-permission-state`.

| Identifier | Description |
| --- | --- |
| `notification:allow-batch` | Enables the batch command without any pre-configured scope. |
| `notification:allow-cancel` | Enables the cancel command without any pre-configured scope. |
| `notification:allow-check-permissions` | Enables the check_permissions command without any pre-configured scope. |
| `notification:allow-create-channel` | Enables the create_channel command without any pre-configured scope. |
| `notification:allow-delete-channel` | Enables the delete_channel command without any pre-configured scope. |
| `notification:allow-get-active` | Enables the get_active command without any pre-configured scope. |
| `notification:allow-get-pending` | Enables the get_pending command without any pre-configured scope. |
| `notification:allow-is-permission-granted` | Enables the is_permission_granted command without any pre-configured scope. |
| `notification:allow-list-channels` | Enables the list_channels command without any pre-configured scope. |
| `notification:allow-notify` | Enables the notify command without any pre-configured scope. |
| `notification:allow-permission-state` | Enables the permission_state command without any pre-configured scope. |
| `notification:allow-register-action-types` | Enables the register_action_types command without any pre-configured scope. |
| `notification:allow-register-listener` | Enables the register_listener command without any pre-configured scope. |
| `notification:allow-remove-active` | Enables the remove_active command without any pre-configured scope. |
| `notification:allow-remove-listener` | Enables the remove_listener command without any pre-configured scope. |
| `notification:allow-request-permission` | Enables the request_permission command without any pre-configured scope. |
| `notification:allow-show` | Enables the show command without any pre-configured scope. |

Each `allow-*` has a matching `deny-*` (e.g. `notification:deny-notify`).

## Notes

- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron's `Notification` class.
- In notification-v2.7.0 the guest-js docs state that action types also render as buttons on desktop and `onAction` fires on desktop (`actionId` `tap` for a click); the official page still marks Actions as mobile-only.
- `onAction`'s callback receives an `ActionPerformed` (`{ actionId, inputValue, notification }`), not a notification; channels are Android-only per the 2.7.0 Channel docs.
- Security considerations: aside from normal sanitization procedures of user input there are currently no known security considerations.
- Source: `plugins-workspace@notification-v2.7.0` `plugins/notification/{Cargo.toml,permissions/autogenerated/reference.md}`.

## Related

- [notification (JS API)](../plugin-js-api-app/notification.md)
