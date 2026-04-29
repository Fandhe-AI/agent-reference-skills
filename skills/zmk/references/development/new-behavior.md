# New Behavior

Step-by-step guide for creating a custom ZMK behavior—the action invoked when a key is pressed or released. Behaviors are implemented as Zephyr RTOS devices and distributed as ZMK modules.

## Signature / Usage

**Minimal behavior source file (`src/behaviors/behavior_<name>.c`):**

```c
#define DT_DRV_COMPAT zmk_behavior_<name>

#include <zephyr/device.h>
#include <zephyr/logging/log.h>
#include <drivers/behavior.h>
#include <zmk/behavior.h>

static int on_<name>_binding_pressed(struct zmk_behavior_binding *binding,
                                     struct zmk_behavior_binding_event event) {
    return ZMK_BEHAVIOR_OPAQUE;
}

static int on_<name>_binding_released(struct zmk_behavior_binding *binding,
                                      struct zmk_behavior_binding_event event) {
    return ZMK_BEHAVIOR_OPAQUE;
}

static const struct behavior_driver_api <name>_driver_api = {
    .binding_pressed  = on_<name>_binding_pressed,
    .binding_released = on_<name>_binding_released,
};

BEHAVIOR_DT_INST_DEFINE(0, <name>_init, NULL, NULL, NULL,
                        POST_KERNEL, CONFIG_KERNEL_INIT_PRIORITY_DEFAULT,
                        &<name>_driver_api);
```

**Devicetree binding (`dts/bindings/behaviors/zmk,behavior-<name>.yaml`):**

```yaml
description: My custom behavior
compatible: "zmk,behavior-<name>"
include: zero_param.yaml   # or one_param.yaml / two_param.yaml
properties:
  my-option:
    type: int
    default: 0
```

**Kconfig (`Kconfig`):**

```kconfig
config ZMK_BEHAVIOR_<NAME>
    bool
    default y
    depends on DT_HAS_ZMK_BEHAVIOR_<NAME>_ENABLED
```

**CMakeLists.txt (split-keyboard safe):**

```cmake
if ((NOT CONFIG_ZMK_SPLIT) OR CONFIG_ZMK_SPLIT_ROLE_CENTRAL)
    target_sources(app PRIVATE src/behaviors/behavior_<name>.c)
endif()
```

## Options / Props

**Repository structure:**

```
zmk-behavior-<name>/
├── CMakeLists.txt
├── Kconfig
├── LICENSE
├── README.md
├── dts/bindings/behaviors/zmk,behavior-<name>.yaml
├── dts/behaviors/<name>.dtsi          # optional predefined instances
├── include/dt-bindings/zmk/<name>.h   # optional HID/constant headers
├── src/behaviors/behavior_<name>.c
├── tests/<name>/
└── zephyr/module.yml
```

**Behavior locality (`.locality` field in `behavior_driver_api`):**

| Value | Effect |
|-------|--------|
| `BEHAVIOR_LOCALITY_CENTRAL` | Runs on central half only (default for most behaviors) |
| `BEHAVIOR_LOCALITY_EVENT_SOURCE` | Runs on the half that invoked the behavior |
| `BEHAVIOR_LOCALITY_GLOBAL` | Runs on all halves (e.g., RGB lighting) |

**Useful ZMK API functions:**

| Function / Macro | Description |
|-----------------|-------------|
| `zmk_behavior_get_binding(name)` | Retrieve a behavior device by name |
| `zmk_behavior_invoke_binding(...)` | Invoke another behavior from within a behavior |
| `raise_zmk_keycode_state_changed_from_encoded(param, pressed, ts)` | Emit a keycode HID event |
| `zmk_keymap_layer_activate(layer)` | Activate a keymap layer |
| `zmk_keymap_layer_deactivate(layer)` | Deactivate a keymap layer |
| `zmk_keymap_layer_toggle(layer)` | Toggle a keymap layer |
| `zmk_keymap_layer_to(layer)` | Switch to a specific layer |

## Notes

- Read the ZMK clean room policy before starting development.
- Behaviors must access system state via the event manager (`#include <zmk/event_manager.h>`); see [events](./events.md).
- Predefined behavior instances in `.dtsi` files: node names must be ≤ 8 characters if locality is not `BEHAVIOR_LOCALITY_CENTRAL`, so the node is addressable from split peripheral halves.
- Use USB logging for hardware testing since Zephyr does not support logging over Bluetooth.
- Run `west test` from the module root to execute virtual test suites.
- C source files submitted to ZMK must be formatted with `clang-format`.
- Code from QMK/TMK may not be used as source material for ZMK due to GPL license restrictions.
- Use MIT SPDX headers for ZMK contributions: `SPDX-License-Identifier: MIT`.

## Related

- [module-creation](./module-creation.md)
- [devicetree](./devicetree.md)
- [events](./events.md)
- [usb-logging](./usb-logging.md)
- [ZMK Module Template](https://github.com/zmkfirmware/zmk-module-template)
