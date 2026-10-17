---
source: https://reactnative.dev/docs/0.87/actionsheetios
---

# ActionSheetIOS

Displays the native iOS Action Sheet component.

## Signature / Usage

```tsx
ActionSheetIOS.showActionSheetWithOptions(
  {
    options: ['Cancel', 'Remove'],
    destructiveButtonIndex: 1,
    cancelButtonIndex: 0,
  },
  buttonIndex => {
    if (buttonIndex === 1) {
      /* destructive action */
    }
  },
);
```

```tsx
static showActionSheetWithOptions: (
  options: ActionSheetIOSOptions,
  callback: (buttonIndex: number) => void,
);

static dismissActionSheet();

static showShareActionSheetWithOptions: (
  options: ShareActionSheetIOSOptions,
  failureCallback: (error: Error) => void,
  successCallback: (success: boolean, method: string) => void,
);
```

## Options / Props

`showActionSheetWithOptions` `options` object:

| Name | Type | Description |
| --- | --- | --- |
| options | array of strings | A list of button titles (required). |
| cancelButtonIndex | int | Index of cancel button in `options`. |
| cancelButtonTintColor | string | Color for the text of the cancel button. |
| destructiveButtonIndex | int or array of ints | Indices of destructive buttons in `options`. |
| title | string | A title above the action sheet. |
| message | string | A message below the title. |
| anchor | number | The node to which the action sheet should be anchored (used for iPad). |
| tintColor | string | Color for non-destructive button titles. |
| disabledButtonIndices | array of numbers | Button indices which should be disabled. |
| userInterfaceStyle | string | `light` or `dark`; otherwise the default system style. |

`showShareActionSheetWithOptions` `options` (one or both of `message` and `url`): `url` (string), `message` (string), `subject` (string), `excludedActivityTypes` (array, activities to exclude from the ActionSheet).

## Notes

- The `callback` takes one parameter, the zero-based index of the selected item.
- `dismissActionSheet()` dismisses the topmost iOS action sheet; if none is present a warning is displayed.
- If `url` points to a local file or is a base64-encoded URI, the file is loaded and shared directly (images, videos, PDF files, etc.). A remote `url` must conform to RFC 2396; a web URL without a proper protocol (HTTP/HTTPS) will not be shared.
- `failureCallback` takes an error object whose only defined property is an optional `stack` string. `successCallback` takes a boolean for success and a string indicating the sharing method on success.

## Related

- [Share](./share.md)
- [Alert](./alert.md)
