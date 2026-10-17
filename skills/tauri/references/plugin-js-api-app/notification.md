---
source: https://v2.tauri.app/reference/javascript/notification/
---

# @tauri-apps/plugin-notification

Send toast notifications (brief auto-expiring OS window element) to your user. Can also be used with the Notification Web API.

## Signature / Usage

```typescript
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';
let permissionGranted = await isPermissionGranted();
if (!permissionGranted) {
  const permission = await requestPermission();
  permissionGranted = permission === 'granted';
}
if (permissionGranted) {
  sendNotification('Tauri is awesome!');
  sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
}
```

```typescript
function isPermissionGranted(): Promise<boolean>                 // since 2.0.0
function requestPermission(): Promise<NotificationPermission>    // since 2.0.0
function sendNotification(options: Options | string): void       // since 2.0.0
function registerActionTypes(types: ActionType[]): Promise<void> // since 2.0.0
function pending(): Promise<PendingNotification[]>               // since 2.0.0 (mobile)
function cancel(notifications: number[]): Promise<void>          // since 2.0.0
function cancelAll(): Promise<void>                              // since 2.0.0
function active(): Promise<ActiveNotification[]>                 // since 2.0.0 (mobile)
function removeActive(notifications: Array<{ id: number; tag?: string }>): Promise<void>  // since 2.0.0
function removeAllActive(): Promise<void>                        // since 2.0.0
function createChannel(channel: Channel): Promise<void>          // since 2.0.0 (Android)
function removeChannel(id: string): Promise<void>               // since 2.0.0 (Android)
function channels(): Promise<Channel[]>                          // since 2.0.0 (Android)
function onNotificationReceived(cb: (notification: Options) => void): Promise<PluginListener>  // since 2.0.0, mobile only
function onAction(cb: (event: ActionPerformed) => void): Promise<PluginListener>               // since 2.0.0
```

Exports: `Importance`, `Visibility`, `Schedule`, `ScheduleEvery` (values) and types `Attachment`, `Options`, `Action`, `ActionType`, `PendingNotification`, `ActiveNotification`, `ActionPerformed`, `Channel`, `ScheduleInterval`, `PermissionState`.

## Options / Props

`Options` (notification content, since 2.0.0):

| Name | Type | Description |
| --- | --- | --- |
| id | `number` | Identifier to reference the notification later. Must be a 32-bit integer. |
| channelId | `string` | Identifier of the `Channel` that delivers this notification. If the channel does not exist, the notification won't fire (check with `channels()` / `createChannel()`). |
| title | `string` | Title (required). |
| body | `string` | Optional body. |
| schedule | `Schedule` | Fire at a later time or a fixed interval. |
| largeBody | `string` | Multiline text; big text style. Cannot be used with `inboxLines`. |
| summary | `string` | Detail text for notifications with `largeBody`, `inboxLines` or `groupSummary`. |
| actionTypeId | `string` | Action type for this notification. |
| group | `string` | Identifier used to group multiple notifications. |
| groupSummary | `boolean` | Marks this notification as the summary of a group on Android. |
| sound | `string` | Sound resource name or file path. macOS: system sounds (e.g. "Ping", "Blow") or files in the app bundle. Linux: XDG theme sounds (e.g. "message-new-instant") or file paths. Windows: file paths to .wav files. Mobile: resource names. |
| inboxLines | `string[]` | Lines for inbox style. Cannot be used with `largeBody`. Up to 5 lines. |
| icon | `string` | Notification icon. On Android must be placed in the app's `res/drawable` folder. |
| largeIcon | `string` | Large icon (Android), in `res/drawable`. |
| iconColor | `string` | Icon color on Android. |
| attachments | `Attachment[]` | Attachments (`{ id: string; url: string }`, accepts `asset` and `file` protocols). |
| extra | `Record<string, unknown>` | Extra payload stored in the notification. |
| ongoing | `boolean` | If true, the user cannot dismiss the notification on Android; an application service must manage dismissal. |
| autoCancel | `boolean` | Automatically cancel the notification when the user clicks on it. |
| silent | `boolean` | Silent presentation on iOS (no badge, no sound, not listed). |
| visibility | `Visibility` | Notification visibility. |
| number | `number` | Number of items this notification represents on Android. |

`Schedule` (class; scheduling is only supported on mobile, desktop notifications are always shown immediately):

| Member | Signature | Description |
| --- | --- | --- |
| `Schedule.at` | `(date: Date, repeating = false, allowWhileIdle = false)` | Fire at a date and time (must be in the future). `repeating` uses the duration between scheduling and `date` as the interval; at least one minute on iOS. `allowWhileIdle` (Android only) allows firing in Doze mode. |
| `Schedule.interval` | `(interval: ScheduleInterval, allowWhileIdle = false)` | Fire whenever the current date matches every field set. |
| `Schedule.every` | `(kind: ScheduleEvery, count: number, allowWhileIdle = false)` | Fire once every `count` interval units. |

`ScheduleInterval` fields (all optional number): `year`, `month`, `day`, `weekday` (1 Sunday ... 7 Saturday), `hour` (24-hour clock), `minute`, `second`.

`ScheduleEvery` values: `Year` (`year`; Android approximates as 52 weeks), `Month` (`month`; Android 30 days), `TwoWeeks`, `Week`, `Day`, `Hour`, `Minute`, `Second` (`second`; not supported on iOS).

`Importance` (Android `IMPORTANCE_*`): `None = 0`, `Min`, `Low`, `Default`, `High`. `Visibility` (Android `VISIBILITY_*`): `Secret = -1`, `Private`, `Public`.

`Channel` (Android only): `id`, `name`, `description?`, `sound?` (resource in `res/raw`), `lights?`, `lightColor?` (e.g. `#ff0000`), `vibration?`, `importance?`, `visibility?`.

`Action`: `id`, `title`, `requiresAuthentication?` (iOS), `foreground?` (iOS), `destructive?` (iOS), `input?`, `inputButtonTitle?` (iOS), `inputPlaceholder?` (iOS). On Android only identifier, title and input flag are used; on desktop only identifier and title.

`ActionType`: `id`, `actions: Action[]`, `hiddenPreviewsBodyPlaceholder?`, `customDismissAction?`, `allowInCarPlay?`, `hiddenPreviewsShowTitle?`, `hiddenPreviewsShowSubtitle?` (all optional ones iOS only).

`ActionPerformed`: `actionId: string` (`tap` for the notification itself), `inputValue: string | null` (mobile), `notification: ActiveNotification | null`.

## Notes

- The source JSDoc of `channelId` links to `listChannels`, which is not exported; the listing function is `channels()`.
- `sendNotification`, `isPermissionGranted` and `requestPermission` use `window.Notification` (Web Notification API).
- `registerActionTypes` must be called before sending a notification that uses the action type. On desktop the actions become buttons on notifications referencing the type.
- `pending` and `active` are only supported on mobile.
- `removeActive`: on desktop only notifications shown while an `onAction` listener existed can be removed, and only on Linux and the BSDs; `removeAllActive` removes all such notifications.
- `onAction`: on mobile emitted for notifications referencing an action type registered with `registerActionTypes`. On desktop emitted when the user clicks a notification (`actionId` is `tap`) or one of its actions, for notifications shown while a listener existed and as far as the notification server reports it; without a listener desktop notifications are shown without their actions. Windows: a click is only reported while the toast is on screen, not once it moved to the Action Center. macOS: two or more actions are shown in an "Options" menu, a click on the menu button itself reports the first action, and actions are told apart by their title.
- `onNotificationReceived`: only emitted on mobile.
- Tauri plugin (Rust core + system WebView). Not Electron's `Notification` class; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@notification-v2.7.0` `plugins/notification/guest-js/index.ts`.

```typescript
import { Schedule, sendNotification } from '@tauri-apps/plugin-notification';
const schedule = Schedule.at(new Date(Date.now() + 60 * 1000));
sendNotification({ title: 'Tauri', body: 'One minute later', schedule });
```

## Related

- notification plugin
