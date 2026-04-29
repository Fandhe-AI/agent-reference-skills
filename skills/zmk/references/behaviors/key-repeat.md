# Key Repeat

Resends whatever keycode was last sent. Useful for keyboards that lack a dedicated repeat key.

## Signature / Usage

```dts
&key_repeat
```

No parameters needed for basic use.

Custom configuration to also track consumer keys:

```dts
&key_repeat {
    usage-pages = <HID_USAGE_KEY HID_USAGE_CONSUMER>;
};
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `usage-pages` | list of HID usage page constants | Which HID usage pages to track for repeat; default `<HID_USAGE_KEY>` |

## Notes

- By default, only HID Key usage page events are tracked; consumer page events (media keys) are ignored unless `HID_USAGE_CONSUMER` is added.
- Multiple usage pages can be listed together.

## Related

- [Caps Word](./caps-word.md)
- [Key Press](./key-press.md)
