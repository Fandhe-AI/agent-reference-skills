# ZMK Events

ZMK's event manager decouples behaviors and peripherals from core firmware by providing a pub/sub system for typed events. Modules subscribe to specific event types and receive callbacks when those events are raised.

## Signature / Usage

**Declare an event type (header file):**

```c
struct zmk_endpoint_changed {
    struct zmk_endpoint_instance endpoint;
};
ZMK_EVENT_DECLARE(zmk_endpoint_changed);
```

**Register a listener and subscription:**

```c
ZMK_LISTENER(combo, behavior_combo_listener);
ZMK_SUBSCRIPTION(combo, zmk_keycode_state_changed);
```

**Listener callback:**

```c
int behavior_hold_tap_listener(const zmk_event_t *eh) {
    if (as_zmk_position_state_changed(eh) != NULL) {
        return my_position_state_handler(eh);
    }
    return ZMK_EV_EVENT_BUBBLE;
}
```

**Raising and freeing events:**

```c
raise_zmk_specific_thing_happened(struct zmk_specific_thing_happened event);
ZMK_EVENT_RAISE(ev);
ZMK_EVENT_FREE(ev);
```

## Options / Props

**Listener return values:**

| Value | Description |
|-------|-------------|
| `ZMK_EV_EVENT_BUBBLE` | Continue propagating to next listener |
| `ZMK_EV_EVENT_HANDLED` | Stop propagation; event manager frees memory |
| `ZMK_EV_EVENT_CAPTURED` | Stop propagation; caller owns and must free memory |

**Common built-in event types (from `app/include/zmk/events/`):**

| Header | Event |
|--------|-------|
| `hid_indicators_changed.h` | Num/Caps/Scroll Lock state |
| `keycode_state_changed.h` | Keycode press/release with HID details |
| `layer_state_changed.h` | Layer activation/deactivation |
| `position_state_changed.h` | Key position press/release |

## Notes

- External module listeners have the highest priority because they are linked first.
- Listeners should return `ZMK_EV_EVENT_BUBBLE` whenever possible; only capture events when strictly necessary.
- Listener priority within ZMK is determined by the order of source files in `CMakeLists.txt`.
- Priority between external modules is determined by `west.yml` project order—avoid creating order-dependent designs.
- `as_<event_type>(eh)` returns `NULL` if the event does not match the type, enabling safe type checks.

## Related

- [new-behavior](./new-behavior.md)
- [module-creation](./module-creation.md)
- [ZMK Event Header Files](https://github.com/zmkfirmware/zmk/tree/main/app/include/zmk/events)
