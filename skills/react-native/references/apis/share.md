---
source: https://reactnative.dev/docs/0.87/share
---

# Share

Open a dialog to share text content.

## Signature / Usage

```tsx
const result = await Share.share({
  message: 'React Native | A framework for building native apps using React',
});
if (result.action === Share.sharedAction) {
  if (result.activityType) {
    // shared with activity type of result.activityType
  } else {
    // shared
  }
} else if (result.action === Share.dismissedAction) {
  // dismissed
}
```

```tsx
static share(content: ShareContent, options?: ShareOptions);
static sharedAction: 'sharedAction';
static dismissedAction: 'dismissedAction';
```

## Options / Props

`share(content, options)`:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| content | Yes | object | `message` - a message to share; `url` - a URL to share (iOS); `title` - title of the message (Android). At least one of `url` and `message` is required. |
| options | No | object | `dialogTitle` (Android); `excludedActivityTypes` (iOS); `subject` - a subject to share via email (iOS); `tintColor` (iOS); `anchor` - the node to which the action sheet should be anchored, used for iPad (iOS). |

Properties: `sharedAction` (the content was successfully shared); `dismissedAction` (iOS; the dialog has been dismissed).

## Notes

- iOS: returns a Promise invoked with an object containing `action` and `activityType`. If the user dismissed the dialog, the Promise resolves with `action` being `Share.dismissedAction` and all other keys undefined. Some share options will not appear or work on the iOS simulator.
- Android: returns a Promise that is always resolved with `action` being `Share.sharedAction`.

## Related

- [ActionSheetIOS](./actionsheetios.md)
- [Linking](./linking.md)
