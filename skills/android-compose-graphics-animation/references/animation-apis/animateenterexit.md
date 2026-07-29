# Modifier.animateEnterExit

Lets a direct or indirect child of `AnimatedVisibility` (or `AnimatedContent`) run its own enter/exit transition, in addition to the one the parent applies.

## Signature / Usage

```kotlin
// Member of AnimatedVisibilityScope (also inherited by AnimatedContentScope)
fun Modifier.animateEnterExit(
    enter: EnterTransition = fadeIn(),
    exit: ExitTransition = fadeOut(),
    label: String = "animateEnterExit",
): Modifier
```

```kotlin
AnimatedVisibility(visible = visible) {
    // Parent fades/expands the whole Row in; this Text additionally slides in on its own.
    Row {
        Text(
            "Hello",
            modifier = Modifier.animateEnterExit(
                enter = slideInVertically(),
                exit = slideOutVertically(),
            ),
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enter` | `EnterTransition` | `fadeIn()` | Transition played on this child when the enclosing content becomes visible. |
| `exit` | `ExitTransition` | `fadeOut()` | Transition played on this child when the enclosing content starts leaving. |
| `label` | `String` | `"animateEnterExit"` | Debug label shown in Android Studio animation tooling. |

## Notes

- Only callable inside `AnimatedVisibilityScope` (the `content` lambda of `AnimatedVisibility`) or `AnimatedContentScope` (the `content` lambda of `AnimatedContent`), since both scopes provide this as a member extension on `Modifier`.
- The child's enter/exit visually combines with whatever `enter`/`exit` the parent `AnimatedVisibility`/`AnimatedContent` is already applying; use `EnterTransition.None` / `ExitTransition.None` on the parent if only the child's animation should be visible.
- For a fully custom animation instead of the built-in `EnterTransition`/`ExitTransition` DSL, read `AnimatedVisibilityScope.transition: Transition<EnterExitState>` (states: `PreEnter`, `Visible`, `PostExit`) directly.
- Package: `androidx.compose.animation`.

## Related

- [AnimatedVisibility](./animatedvisibility.md)
- [AnimatedContent](./animatedcontent.md)
- [EnterTransition / ExitTransition](./enterexittransition.md)
- [Transition](./transition.md)
