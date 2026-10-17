# serialization

| Name | Description | Path |
| --- | --- | --- |
| CBOR format | Concise Binary Object Representation (CBOR, RFC 8949) is a compact binary format that extends the JSON data model. | [serialization-cbor.md](./serialization-cbor.md) |
| JSON serialization overview | The `Json` class is the primary tool for converting Kotlin objects to JSON and back. | [serialization-configure-json-serialization.md](./serialization-configure-json-serialization.md) |
| Create and use serializers | A serializer (`KSerializer`) defines the structure of a Kotlin type in its serialized form; format implementations such as `Json` control how that structure is encoded. | [serialization-create-and-use-serializers.md](./serialization-create-and-use-serializers.md) |
| Custom serialization formats | Implement `Encoder` and `Decoder` (or extend `AbstractEncoder` / `AbstractDecoder`) to create a custom format. | [serialization-custom-formats.md](./serialization-custom-formats.md) |
| Serialize classes | `@Serializable` enables default serialization of all properties with backing fields. | [serialization-customization-options.md](./serialization-customization-options.md) |
| Get started with Kotlin serialization | Add the serialization compiler plugin and the JSON library, mark a class `@Serializable`, and encode/decode it with `Json`. | [serialization-get-started.md](./serialization-get-started.md) |
| Customize the Json instance | The default `Json` instance strictly follows the JSON specification and the Kotlin class declarations. | [serialization-json-configuration.md](./serialization-json-configuration.md) |
| JSON elements | The `JsonElement` API inspects, modifies, and builds JSON structures directly before converting them to a Kotlin type or string. | [serialization-json-elements.md](./serialization-json-elements.md) |
| Serialize JSON with I/O sources | Serialize and deserialize JSON directly to and from JVM streams, kotlinx-io, and Okio types without intermediate strings. | [serialization-json-io-sources.md](./serialization-json-io-sources.md) |
| Serialize polymorphic classes | Kotlin serialization is static by default: only properties of the declared (static) type are serialized. | [serialization-polymorphism.md](./serialization-polymorphism.md) |
| ProtoBuf format | Protocol Buffers is a language-neutral binary format, more compact than CBOR because it assigns integer numbers to fields instead of names. | [serialization-protobuf.md](./serialization-protobuf.md) |
| Serialize built-in types | Built-in serializers cover primitives, strings, enums, and certain standard library classes (Pair, Triple, collections, Unit, objects, Duration, Instant, Nothing). | [serialization-serialize-builtin-types.md](./serialization-serialize-builtin-types.md) |
| Transform JSON structure | `JsonTransformingSerializer` modifies JSON by working on the element tree instead of using `Encoder` / `Decoder` manually. | [serialization-transform-json.md](./serialization-transform-json.md) |
| Serialization | Overview of the kotlinx.serialization libraries: converting runtime objects to a transferable or storable format (serialization) and back (deserialization), across JVM, JavaScript, and Native. | [serialization.md](./serialization.md) |
