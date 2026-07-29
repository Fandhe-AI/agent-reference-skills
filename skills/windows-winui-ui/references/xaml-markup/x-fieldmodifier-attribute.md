# x:FieldModifier attribute

Changes the access modifier of the code-generated field for an `x:Name`'d element from the default `private` to another value, so code outside the partial class (e.g. a different assembly) can reference it.

## Signature / Usage

```xaml
<object x:Name="myElement" x:FieldModifier="public" .../>
```

## Notes

- Requires `x:Name` on the same element — `x:FieldModifier` has no effect without a name to generate a field for.
- Valid values vary by language: `private` (default), `public`, `protected`, `internal`, or `friend`. For C# the parser accepts `"public"`/`"Public"` case-insensitively.
- Windows Runtime XAML has no `x:ClassModifier` or `x:Subclass` — only the field modifier of individual named elements is configurable this way.

## Related

- [x:Name attribute](./x-name-attribute.md)
- [x:Class attribute](./x-class-attribute.md)
