---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
---

# Declaration Files Introduction

How to write a high-quality TypeScript Declaration (d.ts) file. Basic familiarity with the TypeScript language (especially types and modules) is assumed.

## Signature / Usage

```text
Declaration Reference            /docs/handbook/declaration-files/by-example.html
Library Structures               /docs/handbook/declaration-files/library-structures.html
Do's and Don'ts                  /docs/handbook/declaration-files/do-s-and-don-ts.html
Deep Dive                        /docs/handbook/declaration-files/deep-dive.html
Publish to npm                   /docs/handbook/declaration-files/publishing.html
Find and Install Declaration Files  /docs/handbook/declaration-files/consumption.html
```

## Notes

- The most common case for learning how .d.ts files work is typing an npm package with no types; in that case jump straight to the Modules .d.ts template.
- Declaration Reference: shows many common API patterns and how to write declarations for each; aimed at the TypeScript novice.
- Library Structures: helps understand common library formats and how to write a proper declaration file for each; if editing an existing file you probably do not need it, but authors of new declaration files are strongly encouraged to read it. The Template section holds starting-point files for each structure.
- Do's and Don'ts: identifies common errors, how to detect them, and how to fix them; everyone should read it.
- Deep Dive: explains advanced concepts in declaration writing for seasoned authors.
- Publish to npm: how to publish declaration files to an npm package and manage dependent packages.
- Find and Install Declaration Files: for JavaScript library users, steps to locate and install declaration files.

## Related

- [Declaration Reference (By Example)](./by-example.md)
- [Library Structures](./library-structures.md)
- [Do's and Don'ts](./dos-and-donts.md)
- [Deep Dive](./deep-dive.md)
- [Publishing](./publishing.md)
- [Consumption](./consumption.md)
- [Template: module.d.ts](./template-module.md)
