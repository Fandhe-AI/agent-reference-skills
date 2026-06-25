# SCNGeometrySource

A container for vertex data (positions, normals, texture coordinates, etc.) forming part of a custom `SCNGeometry` definition.

## Signature / Usage

```swift
// Convenience initializers
let vertices = SCNGeometrySource(vertices: [
    SCNVector3(0, 0, 0), SCNVector3(1, 0, 0), SCNVector3(0, 1, 0)
])
let normals = SCNGeometrySource(normals: [
    SCNVector3(0, 0, 1), SCNVector3(0, 0, 1), SCNVector3(0, 0, 1)
])
let uvs = SCNGeometrySource(textureCoordinates: [
    CGPoint(x: 0, y: 0), CGPoint(x: 1, y: 0), CGPoint(x: 0, y: 1)
])

// Create geometry from sources + element
let indices: [UInt16] = [0, 1, 2]
let indexData = Data(bytes: indices, count: indices.count * MemoryLayout<UInt16>.size)
let element = SCNGeometryElement(data: indexData, primitiveType: .triangles,
                                 primitiveCount: 1, bytesPerIndex: 2)
let geometry = SCNGeometry(sources: [vertices, normals, uvs], elements: [element])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `semantic` | `SCNGeometrySource.Semantic` | Attribute role: `.vertex`, `.normal`, `.texcoord`, `.color`, `.tangent`, … |
| `vectorCount` | `Int` | Number of vectors in the data |
| `data` | `Data` | Raw byte buffer |
| `usesFloatComponents` | `Bool` | Whether components are `Float` (vs. integer) |
| `componentsPerVector` | `Int` | Number of scalar components per vector (e.g., 3 for XYZ) |
| `bytesPerComponent` | `Int` | Byte size of each scalar component |
| `dataOffset` | `Int` | Byte offset to first vector in `data` |
| `dataStride` | `Int` | Byte distance from one vector to the next (0 = tightly packed) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- Use interleaved vertex data (single buffer, non-zero `dataStride`) for better GPU performance.
- The primary `init(data:semantic:vectorCount:usesFloatComponents:componentsPerVector:bytesPerComponent:dataOffset:dataStride:)` initializer supports interleaved layouts.
- Sources are immutable after creation.

## Related

- [SCNGeometry](./scngeometry.md)
- [SCNNode](./scnnode.md)
