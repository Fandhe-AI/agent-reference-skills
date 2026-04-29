# Caps Word

A smart caps-lock variant that capitalizes alphabetic keys and automatically deactivates when a key outside the continue list is pressed, or when the behavior is triggered again.

## Signature / Usage

```dts
&caps_word
```

Custom configuration:

```dts
&caps_word {
    continue-list = <UNDERSCORE MINUS>;
};
```

Custom named instance:

```dts
/ {
    behaviors {
        prog_caps: prog_caps {
            compatible = "zmk,behavior-caps-word";
            #binding-cells = <0>;
            continue-list = <UNDERSCORE>;
        };
    };
};
// Usage: &prog_caps
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `continue-list` | array of keycodes | Keys that keep caps word active; overrides the default list (alphanumeric, `_`, backspace, delete) |
| `mods` | modifier bitmask | Modifier applied to alphabetic keys while active (default: `MOD_LSFT`) |

## Notes

- The shift modifier applies only to alphabetic keycodes (A–Z); numbers and symbols pass through unmodified.
- Useful with mod-tap on home-row keys to avoid alternating holds when typing all-caps words.
- Multiple instances with different `continue-list` values enable distinct caps-word modes on the same keyboard.

## Related

- [Tap-Dance](./tap-dance.md)
- [Key Repeat](./key-repeat.md)
- [Hold-Tap / Mod-Tap](./hold-tap.md)
