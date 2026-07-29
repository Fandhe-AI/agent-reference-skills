# CompositionPropertySet

Stores arbitrary named values (scalar, `Vector2`/`Vector3`/`Vector4`, `Color`, `Matrix3x2`/`Matrix4x4`, `Quaternion`, boolean) as key-value pairs, independent of any other object's lifetime. Commonly used to share values across an app and reference them from an [ExpressionAnimation](./expression-animation.md) via `SetReferenceParameter`.

## Signature / Usage

```csharp
CompositionPropertySet sharedPropSet = compositor.CreatePropertySet();
sharedPropSet.InsertScalar("offsetChange", 50f);

ExpressionAnimation expression =
    compositor.CreateExpressionAnimation("this.Target.Offset.X + shared.offsetChange");
expression.SetReferenceParameter("shared", sharedPropSet);
```

```csharp
// Reading a value back out
float tempOffset;
sharedPropSet.TryGetScalar("offsetChange", out tempOffset);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| InsertScalar / InsertVector2 / InsertVector3 / InsertVector4(String, T) | method | Inserts (or overwrites) a key-value pair of the given type. |
| InsertColor / InsertMatrix3x2 / InsertMatrix4x4 / InsertQuaternion / InsertBoolean(String, T) | method | Same, for `Color`, `Matrix3x2`, `Matrix4x4`, `Quaternion`, `Boolean`. |
| TryGetScalar / TryGetVector2 / TryGetVector3 / TryGetVector4(String, out T) | method | Retrieves the value for a key, returning a `CompositionGetValueStatus` (`Succeeded` / `TypeMismatch` / `NotFound`). |
| TryGetColor / TryGetMatrix3x2 / TryGetMatrix4x4 / TryGetQuaternion / TryGetBoolean(String, out T) | method | Same, for the other supported types. |
| Properties | CompositionPropertySet, inherited from `CompositionObject` | Every `CompositionObject` (including a `CompositionPropertySet` itself) exposes its own animatable-properties bag through this property. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). Inherits directly from `CompositionObject`. The UWP equivalent is `Windows.UI.Composition.CompositionPropertySet`.
- Created standalone via `Compositor.CreatePropertySet()`, or obtained from `ElementCompositionPreview.GetScrollViewerManipulationPropertySet`/`GetPointerPositionPropertySet` to read live scroll/pointer values inside an expression.
- Has no delete method — once a key is inserted it persists for the property set's lifetime; inserting the same key again overwrites the value.
- A `CompositionAnimation` can target keys in a property set directly (e.g. `propertySet.StartAnimation("offsetChange", animation)`), and the values become readable from any `ExpressionAnimation` that binds the set via `SetReferenceParameter`.

## Related

- [ExpressionAnimation](./expression-animation.md)
- [Compositor](./compositor.md)
- [ElementCompositionPreview](./element-composition-preview.md)
