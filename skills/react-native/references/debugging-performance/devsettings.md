---
source: https://reactnative.dev/docs/0.87/devsettings
---

# DevSettings

The `DevSettings` module exposes methods for customizing settings for developers in development.

## Signature / Usage

```tsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
  Alert.alert('Showing secret dev screen!');
});

<Button title="Reload" onPress={() => DevSettings.reload()} />;
```

### Methods

| Name | Signature | Description |
| --- | --- | --- |
| `addMenuItem()` | `static addMenuItem(title: string, handler: () => any);` | Add a custom menu item to the Dev Menu. Both `title` (string) and `handler` (function) are required. |
| `reload()` | `static reload(reason?: string): void;` | Reload the application. Can be invoked directly or on user interaction. |

## Related

- [Debugging Basics](./debugging.md)
