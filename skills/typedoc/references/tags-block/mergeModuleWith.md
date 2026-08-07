# @mergeModuleWith

Block tag that merges the contents of a module into another module or into the project root.

## Signature / Usage

```
@mergeModuleWith <target>
```

The target can be:
- a dot-separated qualified module name (for nested modules)
- `<project>` -- a special value that places members directly under the root project reflection

The `@mergeModuleWith` tag instructs TypeDoc to place the children of a module or namespace into another module and remove the current module.

This feature supports projects that use the `packages` entry point strategy to consolidate multiple TypeScript compilation outputs into a single exported module.

```typescript
// module-a.ts
/**
 * @module
 * @mergeModuleWith <project>
 */
export function fn1() {}

// module-b.ts
/**
 * @module
 * @mergeModuleWith <project>
 */
export function fn2() {}
```

In the example above, `fn1` and `fn2` are placed directly under the project root instead of under their respective modules.

## Notes

- **Impact on link resolution**: using this tag affects link resolution. Links targeting a module that contains `@mergeModuleWith` may break because the module is removed
- Links to children may also resolve ambiguously depending on configuration
- Intended for use together with the `packages` entry point strategy

## Related

- [@module](./module.md) -- documenting modules
- `@packageDocumentation` -- package-level documentation
