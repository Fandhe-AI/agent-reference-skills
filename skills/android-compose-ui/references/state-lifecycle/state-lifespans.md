# State Lifespans

Conceptual guidance for choosing where to store Compose state based on how long it must survive: recomposition only, configuration changes / activity recreation, or process death. Compares `remember`, `retain`, `rememberSaveable` / `rememberSerializable`, and ViewModel-hoisted state.

## Signature / Usage

```kotlin
@Composable
fun MediaPlayer() {
    val applicationContext = LocalContext.current.applicationContext

    // Survives configuration changes (no serialization needed), but not process death.
    val exoPlayer = retain { ExoPlayer.Builder(applicationContext).build() }
}
```

## Options / Props

| Storage | Survives recomposition | Survives config change / activity recreation | Survives process death | Notes |
| --- | --- | --- | --- | --- |
| `remember` | Yes | No | No | Forgotten when removed from composition or when a `key` argument changes; use for state that can be recreated without losing UI fidelity. |
| `retain` | Yes | Yes | No | Persists across configuration changes without serialization, so it can hold non-serializable values (lambdas, flows, bitmaps, long-lived "manager" objects); never retain an `Activity`, `View`, `Fragment`, `ViewModel`, `Context`, `Lifecycle`, or references to them (leak risk). |
| `rememberSaveable` / `rememberSerializable` | Yes | Yes | Yes | Serializes the value into a `Bundle`; the restored value is a new instance (`==` but not `===` to the original). `rememberSerializable` uses `kotlinx.serialization` (`@Serializable` types); `rememberSaveable` needs a custom `Saver` for non-built-in types. |
| `ViewModel` (optionally with `SavedStateHandle`) | Yes | Yes | Yes (via `SavedStateHandle`) | Scoped to a `ViewModelStore`, not to a composition point; survives until the store is cleared. Best for business logic, screen-level state, and state shared across a large UI area. |

## Notes

- Rule of thumb: escalate only as far as needed — `remember` for ephemeral UI-internal state, `retain` for expensive or non-serializable objects that must survive configuration changes, `rememberSaveable` / `rememberSerializable` for user input that must survive process death, and a `ViewModel` when state carries business logic or must be shared/scoped beyond a single composable subtree.
- `remember` and `retain` both use **positional memoization** — a value is only reused if it is read at the same point in the composition hierarchy on every composition. Restructuring the hierarchy for adaptive layouts (phone/tablet/foldable) can unexpectedly forget values; keep stateful composables in a fixed position or use `MovableContent` to relocate them without losing state.
- This is a design guide, not a single API — no dedicated import.

## Related

- [remember](./remember.md)
- [rememberSaveable](./remembersaveable.md)
- [state-hoisting](./state-hoisting.md)
- collectAsStateWithLifecycle / ViewModel — owned by the `android-architecture` skill (`references/lifecycle-viewmodel/collectasstatewithlifecycle.md`)
