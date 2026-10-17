# entities

| Name | Description | Path |
|------|-------------|------|
| AppEntity | An interface for making a custom type or app-specific concept discoverable by Apple Intelligence and experiences like Siri or the Shortcuts app. | [appentity.md](./appentity.md) |
| AppEntityAnnotatable | An interface that system types adopt and use to manage their relationship to app entities. | [appentityannotatable.md](./appentityannotatable.md) |
| AppEnum | An interface to express that a custom type has a predefined, static set of values. | [appenum.md](./appenum.md) |
| AppValue / AnyIntentValue | `AppValue` is an interface that describes conceptual types you use in app intents. `AnyIntentValue` is a type the system uses to access a parameter or property value. | [appvalue.md](./appvalue.md) |
| ComputedProperty() macro (6 overloads) | A macro that adds a computed app entity property with a get accessor and an optional set accessor. | [computedproperty.md](./computedproperty.md) |
| DeferredProperty() macro (4 overloads) | A macro that adds an asynchronous app entity property with an asynchronous get accessor. | [deferredproperty.md](./deferredproperty.md) |
| DisplayRepresentable family (DisplayRepresentable / InstanceDisplayRepresentable / TypeDisplayRepresentable / StaticDisplayRepresentable / CaseDisplayRepresentable) | Protocols that provide the visual representation of a type, of an instance, or of the cases of an enumeration. `DisplayRepresentable`: "An interface for providing a dynamic visual representation of a specific type and instances of that type." | [display-representable-protocols.md](./display-representable-protocols.md) |
| DisplayRepresentation | A type that describes the user interface presentation of a custom type. | [displayrepresentation.md](./displayrepresentation.md) |
| EntityCollection | An array of entity identifiers that you use to improve the efficiency of operations involving large numbers of entities. | [entitycollection.md](./entitycollection.md) |
| EntityIdentifier (FileEntityIdentifier / SyncableEntityIdentifier / Attributed* in Notes) | A type that uniquely identifies a specific instance of an app entity. | [entityidentifier.md](./entityidentifier.md) |
| EntityIdentifierConvertible | An interface for converting between an entity's identifier and its string representation. | [entityidentifierconvertible.md](./entityidentifierconvertible.md) |
| EntityOwnership | A type that represents the ownership and sharing characteristics of an app entity. | [entityownership.md](./entityownership.md) |
| EntityProperty | A property wrapper that exposes the associated property to the system. | [entityproperty.md](./entityproperty.md) |
| FileEntity | An entity that refers to a document or other file. | [fileentity.md](./fileentity.md) |
| IndexedEntity | An interface that allows you to include an entity in your app's Spotlight index. | [indexedentity.md](./indexedentity.md) |
| IntentValueRepresentation | A transfer representation that enables bidirectional conversion between app entities and system intent values. | [intentvaluerepresentation.md](./intentvaluerepresentation.md) |
| OwnershipProvidingEntity | A type that provides the system with ownership and sharing context for an app entity. | [ownershipprovidingentity.md](./ownershipprovidingentity.md) |
| PersistentlyIdentifiable | Defines a string that uniquely identifies a type. This is useful for maintaining the identity of a type, even when its type name is changed. | [persistentlyidentifiable.md](./persistentlyidentifiable.md) |
| SyncableEntity | An interface that indicates your entity has an identifier that's consistent across devices. | [syncableentity.md](./syncableentity.md) |
| TransientAppEntity | A type that represents a transient model object which exposes its interface to App Intents via properties. Note that `TransientAppEntity` types are not meant to be queried. | [transientappentity.md](./transientappentity.md) |
| TypeDisplayRepresentation | A type that describes the user interface presentation of a custom type. | [typedisplayrepresentation.md](./typedisplayrepresentation.md) |
| UnionValue() / AppUnionValue / AppUnionValueCasesProviding | The `@UnionValue` macro generates `AppUnionValue` conformance for an enum so it can be used as a Shortcuts parameter with rich metadata; `AppUnionValueCasesProviding` is the protocol of the generated `Cases` enum. | [unionvalue.md](./unionvalue.md) |
| UniqueAppEntity | An AppEntity subtype for entities that only have a single instance. | [uniqueappentity.md](./uniqueappentity.md) |
| URLRepresentableEntity / EntityURLRepresentation | An interface you apply to an app entity type so the system can handle it like a universal link. `EntityURLRepresentation` is the type that provides the URL for an app entity. | [urlrepresentableentity.md](./urlrepresentableentity.md) |
| URLRepresentableEnum / EnumURLRepresentation | An interface you apply to an app enum type so the system can handle it like a universal link. `EnumURLRepresentation` is the type that provides the URL for an app enum. | [urlrepresentableenum.md](./urlrepresentableenum.md) |
