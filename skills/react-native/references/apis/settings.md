---
source: https://reactnative.dev/docs/0.87/settings
---

# Settings

A wrapper for `NSUserDefaults`, a persistent key-value store available only on iOS.

## Signature / Usage

```tsx
const [data, setData] = useState(() => Settings.get('data'));

<Button
  onPress={() => {
    Settings.set({data: 'React'});
    setData(Settings.get('data'));
  }}
  title="Store 'React'"
/>
```

```tsx
static clearWatch(watchId: number);
static get(key: string): any;
static set(settings: Record<string, any>);
static watchKeys(keys: string | array<string>, callback: () => void): number;
```

### Methods

| Method | Description |
| --- | --- |
| `clearWatch()` | `watchId` is the number returned by `watchKeys()` when the subscription was configured. |
| `get()` | Get the current value for a given `key` in `NSUserDefaults`. |
| `set()` | Set one or more values in `NSUserDefaults`. |
| `watchKeys()` | Subscribe to be notified when the value for any of the `keys` has changed in `NSUserDefaults`. Returns a `watchId` for use with `clearWatch()`. |

## Notes

- `watchKeys()` by design ignores internal `set()` calls and fires the callback only on changes performed outside of React Native code.

## Related

- [Share](./share.md)
