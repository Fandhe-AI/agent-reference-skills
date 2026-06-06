# Bluetooth Profiles

Switch between up to five Bluetooth host profiles and manage pairing from the keymap.

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>
#include <dt-bindings/zmk/bt.h>

/ {
    keymap {
        compatible = "zmk,keymap";

        default_layer {
            bindings = <
                &trans  &trans  &trans  &trans  &trans
            >;
        };

        bt_layer {
            display-name = "BT";
            bindings = <
                &bt BT_SEL 0  &bt BT_SEL 1  &bt BT_SEL 2  &bt BT_NXT  &bt BT_PRV
                &bt BT_CLR    &bt BT_CLR_ALL &bt BT_DISC 0 &trans       &trans
            >;
        };
    };
};
```

## Notes

- Include `<dt-bindings/zmk/bt.h>` to access `BT_SEL`, `BT_NXT`, `BT_PRV`, `BT_CLR`, `BT_CLR_ALL`, and `BT_DISC` constants.
- `BT_SEL N` (zero-indexed) activates a specific profile; ZMK supports five profiles by default.
- `BT_CLR` removes the pairing for the currently selected profile; `BT_CLR_ALL` clears all profiles at once.
- `BT_DISC N` disconnects an inactive profile without clearing its bond data.
- The selected profile and bond data persist across power cycles via flash storage; no re-pairing is needed after a firmware flash unless bonds are explicitly cleared.
- To increase the maximum number of connections, set `CONFIG_BT_MAX_CONN` and `CONFIG_BT_MAX_PAIRED` in the keyboard's `.conf` file.
