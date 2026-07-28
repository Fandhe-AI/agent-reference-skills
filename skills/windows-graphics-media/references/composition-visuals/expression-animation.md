# ExpressionAnimation

A `CompositionAnimation` that uses a mathematical equation (a string expression) to calculate the value of an animating property every frame, instead of interpolating between fixed key frames.

## Signature / Usage

```csharp
ExpressionAnimation exp = compositor.CreateExpressionAnimation();
exp.Expression = "this.Target.Offset.X / xWindowSize";
exp.SetScalarParameter("xWindowSize", (float)Window.Current.Bounds.Width);

targetVisual.StartAnimation("Opacity", exp);
```

```csharp
// Angle between two visuals' offsets, driving a third visual's rotation
var rotationAnimation = compositor.CreateExpressionAnimation();
rotationAnimation.SetReferenceParameter("A", visualA);
rotationAnimation.SetReferenceParameter("B", visualB);
rotationAnimation.Expression =
  "ACos( ((A.Offset.X*B.Offset.X)+(A.Offset.Y*B.Offset.Y)+(A.Offset.Z*B.Offset.Z)) / (Length(A.Offset)*Length(B.Offset)) )";
lineVisual.StartAnimation("RotationAngle", rotationAnimation);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Expression | string | The mathematical equation, re-evaluated every frame. Can also be set via `Compositor.CreateExpressionAnimation(string)`. |
| Target | string, inherited from `CompositionAnimation` | The property name this animation targets when started via `StartAnimation`. |
| SetScalarParameter / SetVector2Parameter / SetVector3Parameter / SetVector4Parameter / SetColorParameter / SetMatrix3x2Parameter / SetMatrix4x4Parameter / SetQuaternionParameter / SetBooleanParameter(String, value) | method, inherited | Binds a named parameter (referenced in `Expression`) to a value. |
| SetReferenceParameter(String, CompositionObject) | method, inherited | Binds a named parameter to another Composition object (its properties become accessible in the expression, e.g. `A.Offset`). |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). `ExpressionAnimation` inherits from `CompositionAnimation`; the UWP equivalent is `Windows.UI.Composition.ExpressionAnimation`.
- Has an infinite lifetime — runs until explicitly stopped with `StopAnimation`, unlike key-frame animations.
- Keywords: `this.StartingValue`, `this.CurrentValue`, `this.FinalValue` (relevant for [ImplicitAnimationCollection](./implicit-animation-collection.md)), `this.Target`, `Pi`, `True`/`False`.
- Supports a library of per-type functions (`Clamp`, `Lerp`, `Slerp`, trig functions, `Vector2`/`Vector3`/`Matrix3x2`/`Matrix4x4`/`Quaternion`/`Color` constructors, etc.) and the ternary conditional operator.
- The equation's result type must match the animated property's type, or the animation throws at evaluation time.
- Used together with [InteractionTracker](./interaction-tracker.md) to drive visuals from `Position`/`Scale` output (e.g. `"-tracker.Position"`).

## Related

- [Compositor](./compositor.md)
- [Visual](./visual.md)
- [ImplicitAnimationCollection](./implicit-animation-collection.md)
- [InteractionTracker](./interaction-tracker.md)
