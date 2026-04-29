# Hold-Tap

Sends one behavior when a key is held and a different behavior when it is tapped. ZMK ships two pre-configured instances: `&mt` (mod-tap) and `&lt` (layer-tap).

## Signature / Usage

```dts
// Pre-built instances
&mt <MODIFIER> <keycode>   // e.g. &mt LSHIFT A
&lt <layer>    <keycode>   // e.g. &lt 1 SPACE

// Custom instance defined in behaviors {}
/ {
    behaviors {
        hm: homerow_mods {
            compatible = "zmk,behavior-hold-tap";
            #binding-cells = <2>;
            tapping-term-ms = <150>;
            flavor = "balanced";
            bindings = <&kp>, <&kp>;
        };
    };
};
// Usage: &hm LSHIFT A
```

**Parameters:** Two values — (1) behavior/keycode for hold, (2) behavior/keycode for tap.

## Pre-built Instances

| Binding | Hold default | Tap default | Default flavor |
|---------|-------------|-------------|----------------|
| `&mt` | modifier keycode | keycode | `hold-preferred` |
| `&lt` | layer activation | keycode | `tap-preferred` |

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `tapping-term-ms` | integer | ms before hold triggers (default: 200) |
| `flavor` | string | Interrupt handling style (see below) |
| `quick-tap-ms` | integer | If re-pressed within this ms, always tap |
| `require-prior-idle-ms` | integer | Force tap if pressed within X ms of last key |
| `hold-trigger-key-positions` | array | Key positions that allow hold activation (positional hold-tap) |
| `hold-trigger-on-release` | boolean | Evaluate trigger positions on key release instead of press |
| `hold-while-undecided` | boolean | Immediately activate hold; release before tap |
| `hold-while-undecided-linger` | boolean | Keep hold active until after tap behavior completes |
| `retro-tap` | boolean | Trigger tap if key released before another key was pressed |

## Flavors

| Flavor | Hold triggers when… |
|--------|---------------------|
| `hold-preferred` | `tapping-term-ms` expires **or** another key is pressed |
| `balanced` | `tapping-term-ms` expires **or** another key is pressed **and released** |
| `tap-preferred` | `tapping-term-ms` expires only (other presses don't affect decision) |
| `tap-unless-interrupted` | Another key is pressed before `tapping-term-ms` expires |

## Notes

- Hold-tap cannot directly bind behaviors requiring multiple parameters (e.g., `&bt BT_SEL 1`); wrap them in a macro first.
- Key positions are zero-indexed, sequentially numbered from the first key in the keymap.
- `hold-while-undecided` interacts with combos — combo timeouts must expire before hold activates.
- Common pattern: homerow mods using `balanced` flavor with `hold-trigger-key-positions` and `require-prior-idle-ms`.

## Related

- [Key Press](./key-press.md)
- [Layers](./layers.md)
- [Macros](./macros.md)
