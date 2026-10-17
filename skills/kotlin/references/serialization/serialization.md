---
source: https://kotlinlang.org/docs/serialization.html
---

# Serialization

Overview of the kotlinx.serialization libraries: converting runtime objects to a transferable or storable format (serialization) and back (deserialization), across JVM, JavaScript, and Native.

## Signature / Usage

```kotlin
// build.gradle.kts
plugins {
    kotlin("plugin.serialization") version "2.4.21"
}

dependencies { 
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.11.0")
}
```

### Libraries

All format libraries are in the `org.jetbrains.kotlinx:` group with names starting `kotlinx-serialization-`. They build on `kotlinx-serialization-core`, which is the dependency to use when writing your own format. The libraries follow their own versioning, independent of Kotlin.

### Supported serialization formats

| Format | Artifact ID | Platform | Status |
| --- | --- | --- | --- |
| JSON | `kotlinx-serialization-json` | All supported platforms | Stable |
| HOCON | `kotlinx-serialization-hocon` | JVM only | Experimental |
| Protocol Buffers | `kotlinx-serialization-protobuf` | All supported platforms | Experimental |
| CBOR | `kotlinx-serialization-cbor` | All supported platforms | Experimental |
| Properties | `kotlinx-serialization-properties` | All supported platforms | Experimental |

## Notes

- All format libraries except JSON are Experimental; their APIs might change at any time.
- Community-maintained libraries support more formats, such as YAML or Apache Avro.
- Built-in types (primitives, standard library composites like `List`) are supported, and classes annotated with `@Serializable` are fully supported.
- This is the Kotlin kotlinx.serialization library. Retrofit converters that use it are covered by android-data, and JS schema validation (zod) is a different thing.

## Related

- [Get started with Kotlin serialization](./serialization-get-started.md)
- [Serialize built-in types](./serialization-serialize-builtin-types.md)
- [Serialize classes](./serialization-customization-options.md)
- [Create and use serializers](./serialization-create-and-use-serializers.md)
- [Serialize polymorphic classes](./serialization-polymorphism.md)
- [JSON serialization overview](./serialization-configure-json-serialization.md)
- [Custom serialization formats](./serialization-custom-formats.md)
- [CBOR format](./serialization-cbor.md)
- [ProtoBuf format](./serialization-protobuf.md)
