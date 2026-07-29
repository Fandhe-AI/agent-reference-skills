# CompositionLight (PointLight, DistantLight, SpotLight, AmbientLight)

Base class for a light source that lights a subset of the visual tree, used together with 3D-transformed visuals and normal-mapped brushes to simulate depth. Which visuals are lit is controlled by `Targets` (an explicit inclusion list); `CompositionLight` itself is abstract — the four concrete types are `PointLight`, `DistantLight`, `SpotLight`, and `AmbientLight`.

## Signature / Usage

```csharp
PointLight light = compositor.CreatePointLight();
light.CoordinateSpace = rootVisual; // required — light does not render without it
light.Color = Colors.White;
light.Offset = new Vector3(400, 300, 200);

light.Targets.Add(targetVisual);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Targets | `CompositionLightTargetsCollection`, inherited | Visuals lit by this light; a light with no targets lights nothing. |
| ExclusionsFromTargets | `CompositionLightTargetsCollection`, inherited | Visuals excluded from an otherwise-targeted subtree (e.g. target a container but exclude one child). |
| IsEnabled | bool, inherited | Turns the light on/off without removing it. |
| Color | Color | `PointLight`/`DistantLight`/`SpotLight`: the light's color. |
| CoordinateSpace | Visual | `PointLight`/`SpotLight`: the visual whose coordinate space `Offset`/`Direction` are relative to. **Required** — the light does not render if unset. |
| Offset | Vector3 | `PointLight`/`SpotLight`: position of the light relative to `CoordinateSpace`. |
| ConstantAttenuation / LinearAttenuation / QuadraticAttenuation | float | `PointLight`/`SpotLight`: coefficients of the distance-attenuation equation controlling falloff. |
| MinAttenuationCutoff / MaxAttenuationCutoff | float | `PointLight`/`SpotLight`: range within which the light is effective. |
| Direction | Vector3 | `DistantLight`/`SpotLight`: direction the light points. |
| InnerConeAngle / OuterConeAngle, InnerConeColor / OuterConeColor | float / Color | `SpotLight` only: the inner and outer light cones. |
| Intensity | float | `AmbientLight`/`PointLight`: intensity multiplier. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). `CompositionLight` inherits from `CompositionObject`; `PointLight`, `DistantLight`, `SpotLight`, `AmbientLight` are `sealed` direct subclasses. The UWP equivalent is `Windows.UI.Composition.CompositionLight`.
- Created via `Compositor.CreatePointLight()` / `CreateDistantLight()` / `CreateSpotLight()` / `CreateAmbientLight()` — see [Compositor](./compositor.md).
- A single `Visual` cannot be targeted by more than two non-ambient lights (`PointLight`, `SpotLight`, or `DistantLight` combined); `AmbientLight` is not subject to this limit.
- Lighting only visibly affects brushes that respond to it — chiefly normal-mapped `CompositionEffectBrush` content (e.g. a Win2D normal-map effect) or 3D-transformed geometry; a plain `CompositionColorBrush`-filled `SpriteVisual` shows no lighting difference beyond the ambient term.
- Distinct from three.js `PointLight`/`DirectionalLight`/`SpotLight`/`AmbientLight` (a full 3D-scene renderer) and Windows 11 design "Reveal highlight" (a XAML pointer-following brush effect, see the `windows-design` skill) — this is the WinRT composition lighting system for 2.5D visual-tree scenes.

## Related

- [Compositor](./compositor.md)
- [Visual](./visual.md)
- [ShapeVisual](./shape-visual.md)
