# @include / @includeCode

Inline tags that embed the content of an external file directly into a doc comment. `@include` inserts Markdown content verbatim; `@includeCode` inserts the file content as a fenced code block (with syntax highlighting based on the file extension).

## Signature / Usage

```
{@include ./path/to/file.md}
{@includeCode ./path/to/file.ts}
```

### Partial file inclusion (named regions)

Named regions can be used to include only a specific part of a file. Region delimiters follow VS Code's folding convention.

```
{@includeCode ./file.ts#regionName}
{@includeCode ./file.ts#region1,region2}
```

Per-language region syntax:

- **TypeScript / JavaScript:**
  ```typescript
  // #region regionName
  // code
  // #endregion regionName
  ```
- **Markdown:**
  ```markdown
  <!-- #region regionName -->
  content
  <!-- #endregion regionName -->
  ```
- **Python:**
  ```python
  # region regionName
  # code
  # endregion regionName
  ```
  or
  ```python
  #region regionName
  #endregion regionName
  ```
- **C# / PHP / PowerShell:**
  ```csharp
  #region regionName
  // code
  #endregion regionName
  ```

### Partial file inclusion (line numbers)

When region comments cannot be added, a range of line numbers can be specified instead.

```
{@includeCode ../../package.json:2,6-7}
```

- Line numbers follow a colon (`:`), comma-separated
- Use a hyphen (`-`) for ranges (e.g. `6-7`)
- Line numbers are 1-based (line 1 is the first line)

### Examples

```typescript
/**
 * See the following for usage details:
 *
 * {@include ./docs/usage-guide.md}
 */
export function processData(input: string): void { /* ... */ }
```

```typescript
/**
 * Example config file:
 *
 * {@includeCode ./examples/config.ts}
 */
export interface Config { /* ... */ }
```

```typescript
// examples/helpers.ts
// #region validation
function validateInput(input: string): boolean {
  return input.length > 0;
}
// #endregion validation

/**
 * Validation example:
 *
 * {@includeCode ./examples/helpers.ts#validation}
 */
export function validate(input: string): boolean { /* ... */ }
```

```typescript
/**
 * See the following code:
 *
 * {@includeCode ./examples/helpers.ts#setup,validation}
 */
```

```typescript
/**
 * The relevant part of package.json:
 *
 * {@includeCode ../../package.json:2,6-7}
 */
```

## Notes

- `@include` reads the target file's content and inserts it verbatim as Markdown at the tag's location, enabling reuse of shared documentation across multiple places.
- `@includeCode` reads the file the same way as `@include`, but wraps the content in a fenced code block with syntax highlighting inferred from the file extension.
- Paths must use POSIX-style forward slashes (`/`); Windows-style backslashes (`\`) are not supported, ensuring cross-platform compatibility.
- Line-number based inclusion can break as the referenced file changes, so named regions are preferred where possible.
- Multiple regions can be specified as a comma-separated list.
- The `jsdocCompatibility` option affects related comment-processing behavior.

## Related

- [@link](./link.md) — creates a link to another reflection
- [@inheritDoc](./inheritDoc.md) — copies documentation from another reflection
