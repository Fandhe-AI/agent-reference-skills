# Samples

| Name | Description | Path |
|------|-------------|------|
| Basic Schema | Define a schema, parse data, and infer TypeScript types. | [basic-schema.md](./basic-schema.md) |
| Custom Refinement | Add custom validation logic beyond built-in checks using `.refine()` and `.superRefine()`. | [custom-refinement.md](./custom-refinement.md) |
| Discriminated Union | Model tagged variant types with a shared discriminator key for efficient parsing and TypeScript narrowing. | [discriminated-union.md](./discriminated-union.md) |
| Error Customization | Customize validation error messages at the schema level, per-parse level, or globally. | [error-customization.md](./error-customization.md) |
| Error Formatting | Convert ZodError instances into structured formats suitable for form validation, logging, or API responses. | [error-formatting.md](./error-formatting.md) |
| Object Composition | Extend, pick, omit, and partially apply object schemas using TypeScript-style utility methods. | [object-composition.md](./object-composition.md) |
| Recursive Schema | Define self-referential and mutually recursive schemas using JavaScript getters. | [recursive-schema.md](./recursive-schema.md) |
| Safe Parse | Validate data without try/catch using the discriminated union result object. | [safe-parse.md](./safe-parse.md) |
| String Validation | Validate string length, format, and content using built-in string checks and format validators. | [string-validation.md](./string-validation.md) |
| Transform and Default | Convert validated data into different shapes, and provide fallback values for missing inputs. | [transform-and-default.md](./transform-and-default.md) |
