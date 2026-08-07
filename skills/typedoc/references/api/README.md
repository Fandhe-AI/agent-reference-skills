# api

| Name | Description | Path |
|------|-------------|------|
| Application | TypeDoc's main entry point. Orchestrates the conversion of TypeScript source files into documentation via the `Converter` and `Renderer`. | [application.md](./application.md) |
| Converter | Class that converts TypeScript source code into the Reflection model. Operates as a subcomponent of `Application`. | [converter.md](./converter.md) |
| Events | TypeDoc's event system. An event dispatch mechanism spanning the full lifecycle of the `Converter` and `Renderer`. | [events.md](./events.md) |
| Options | Class that manages TypeDoc and TypeScript option declarations. Provides type-safe option retrieval and assignment. | [options-api.md](./options-api.md) |
| Reflections | TypeDoc's internal model. The Reflection hierarchy represents every documentable element in the source code (classes, functions, properties, and so on). | [reflections.md](./reflections.md) |
| Renderer | Class that processes a `ProjectReflection` through a `Theme` instance and writes the resulting HTML documentation to an output directory. | [renderer.md](./renderer.md) |
| Serialization | TypeDoc's serialization system. The `Serializer` and `Deserializer` classes convert between the Reflection model and JSON. | [serialization.md](./serialization.md) |
| Types | TypeDoc's type system. 18 `Type` subclasses representing TypeScript types. | [types.md](./types.md) |
