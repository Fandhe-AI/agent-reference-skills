# ARRaycastQuery

A mathematical ray used to find 3D positions on real-world surfaces. Cast from a screen point into the scene to locate where the ray intersects detected planes or meshes.

## Signature / Usage

```swift
// Create from a view point (preferred convenience method)
if let query = arSCNView.raycastQuery(
    from: screenPoint,
    allowing: .estimatedPlane,
    alignment: .horizontal
) {
    let results = session.raycast(query)
    if let first = results.first {
        print(first.worldTransform)
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `origin` | `simd_float3` | 3D starting point of the ray |
| `direction` | `simd_float3` | Direction vector of the ray in world space |
| `target` | `ARRaycastQuery.Target` | Surface types the ray can intersect (`estimatedPlane`, `existingPlaneGeometry`, `existingPlaneInfinite`) |
| `targetAlignment` | `ARRaycastQuery.TargetAlignment` | Required plane alignment (`.any`, `.horizontal`, `.vertical`) |

## Notes

- iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.1+
- Direct init: `ARRaycastQuery(origin:direction:allowing:alignment:)`. Prefer the convenience factory on `ARSCNView.raycastQuery(from:allowing:alignment:)` or `ARView.makeRaycastQuery(from:allowing:alignment:)`.
- Use `session.raycast(_:)` for a one-shot result list, or `session.trackedRaycast(_:updateHandler:)` for a continuously updated result.

## Related

- [ARSession](./arsession.md)
- [ARFrame](./arframe.md)
- [ARSCNView](./arscnview.md)
