# Preserving the Chain

CadQuery's fluent API requires every plugin to return a valid CadQuery object so the chain can continue. There are two approaches.

## Signature / Usage

```python
# Option 1: return self (destructive — modifies the current stack in place)
def myPlugin(self):
    self.objects = [...]  # replace stack contents
    return self

# Option 2: return newObject() (preferred — preserves original object and stack)
def myPlugin(self):
    new_items = [...]
    return self.newObject(new_items)
```

## Notes

- **`return self`** is the simpler approach but destructively replaces the current stack. Use it only when modifying the stack is acceptable.
- **`return self.newObject(items)`** creates a new `Workplane` whose parent is set to the current object. This preserves the original stack and is the recommended approach for most plugins.
- Returning a plain Python value (non-CadQuery object) will break the chain; the caller cannot continue with `.method()` calls.

## Related

- [The Stack](./stack.md)
- [Helper Methods](./helper-methods.md)
