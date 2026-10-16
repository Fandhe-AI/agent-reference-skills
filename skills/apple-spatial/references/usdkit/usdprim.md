# USDPrim

A single node in a stage's scene hierarchy that holds attributes, relationships, metadata, and child prims.

## Signature / Usage

```swift
struct USDPrim

func attribute(named: USDToken) -> USDPrim.Attribute
func attribute(at: USDLayer.Path) -> USDPrim.Attribute
func hasAttribute(named: USDToken) -> Bool
func applyAPISchema(_: USDToken) throws
func applyAPISchema(_: USDToken, instanceName: USDToken) throws
func addTransformOperation(type: USDTransformOperation.Kind)
func clearTransformOperations()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `[USDPrim]` | Active, loaded, defined, non-abstract child prims |
| `allChildren` | `[USDPrim]` | The child prims of this prim |
| `descendants` | `[USDPrim]` | Active, loaded, defined, non-abstract descendants, depth-first |
| `allDescendants` | `[USDPrim]` | The descendant prims of this prim |
| `attributes` | `[USDPrim.Attribute]` | Attributes, including those provided by schemas |
| `authoredAttributes` | `[USDPrim.Attribute]` | Attributes with an authored opinion |
| `authoredProperties` | `[USDPrim.Property]` | Properties with an authored opinion |
| `authoredPropertyNames` | `[USDToken]` | Names of properties with an authored opinion |
| `description` | `String` | Summary description of the prim |
| `hasAuthoredInherits` / `hasAuthoredPayloads` / `hasAuthoredReferences` / `hasAuthoredSpecializes` | `Bool` | Whether the prim has authored arcs of that kind |
| `inherits`, `payloads`, `references`, `specializes`, `variantSets` | `InheritCollection`, `PayloadCollection`, `ReferenceCollection`, `SpecializeCollection`, `VariantSetCollection` | Composition-arc managers |
| `transformOperations` | (see page) | The prim's transform stack |

### Members by topic

| Topic | Members |
|-------|---------|
| Creating | `init()`, `init(_:)` |
| Identity | `path`, `primPath`, `isValid`, `specifier`, `stage`, `parent`, `Specifier` |
| Traversal | `children(where:)`, `descendants(where:)`, `nextSibling`, `nextSibling(where:)`, `prim(at:)`, `Predicate` ("a filter which returns true or false for prims based on their flags") |
| Properties | `properties`, `propertyNames`, `property(named:)`, `hasProperty(named:)`, `property(at:)`, `object(at:)`, `Property` |
| Attributes | `makeAttribute(named:as:custom:variability:)`, `Attribute` |
| Relationships | `relationship(named:)`, `relationship(at:)`, `hasRelationship(named:)`, `makeRelationship(named:custom:)`, `Relationship` |
| References and payloads | `Reference`, `ReferenceCollection`, `Payload`, `ListPosition` |
| Variants | `VariantSpec`, `VariantSetSpec`, `VariantsMap`, `VariantSelectionMap` |
| Schemas | `hasAPISchema(_:)`, `isSchema(_:)`, `removeAPISchema(_:)`, `removeAPISchema(_:instanceName:)` |
| Transform | `transform(at:)` |
| Specs | `Spec`, `PseudoRootSpec` |
| Subscripts | `subscript(_:as:)` (5 overloads) |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+. Module: USDKit.
- Conforms to `Copyable`, `CustomStringConvertible`, `Equatable`, `Escapable`, `Hashable`, `USDStage.Object.MetadataCollection`.
- `addTransformOperation(type:)` adds a transform operation of the given kind to the prim's transform stack.
- A prim is a handle owned by its `USDStage` and becomes invalid if the stage is closed.

## Related

- [USDStage](./usdstage.md)
- [USDLayer](./usdlayer.md)
- [USDToken](./usdtoken.md)
- [USDTransformOperation](./usdtransformoperation.md)
