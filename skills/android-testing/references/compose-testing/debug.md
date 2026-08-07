# Debug Tests

Debugging Compose tests primarily means inspecting the semantics tree, which carries node hierarchy, positioning, and UI properties useful for tracking down failures.

## Signature / Usage

```kotlin
composeTestRule.onRoot().printToLog()
```

```text
Node #1 at (...)px
     |-Node #2 at (...)px
       OnClick = '...'
       MergeDescendants = 'true'
        |-Node #3 at (...)px
        | Text = 'Hi'
        |-Node #5 at (83.0, 86.0, 191.0, 135.0)px
          Text = 'There'
```

## Notes

- `printToLog()` (see `printToLog`) can be called at any point during a test to dump the current semantics tree to logcat.
- The printed log shows node hierarchy and coordinates, plus semantics properties (`OnClick`, `MergeDescendants`, `Text`, etc.) — useful for diagnosing why a finder unexpectedly fails to match a node.
- Espresso debugging knowledge remains applicable to Compose testing where hybrid View/Compose UIs are involved.

## Related

- [print-to-log](./print-to-log.md)
- [finders](./finders.md)
- [espresso-interop](./espresso-interop.md)
