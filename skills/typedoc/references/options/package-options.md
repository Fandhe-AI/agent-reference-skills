---
source: https://typedoc.org/documents/Options.Package_Options.html
---

# Options: Package Options

Where each TypeDoc option must be set when running with `entryPointStrategy` set to `"packages"`: in the root configuration, in each package's configuration, or both.

## Signature / Usage

```jsonc
// typedoc.json (root)
{
    "entryPointStrategy": "packages",
    "entryPoints": ["packages/*"],
    "packageOptions": {
        "entryPoints": ["src/index.ts"]
    }
}
```

## Options / Props

`Location` is `Root`, `Package` or `Both`. Options used during conversion belong in each package; options used during rendering belong at the root.

### Configuration Options

| Option | Location | Notes |
| --- | --- | --- |
| `options` | Both | TypeDoc will read option files when converting each directory and when looking for configuration initially |
| `tsconfig` | Both | TypeDoc will read option files when converting each directory and when looking for configuration initially |
| `compilerOptions` | Package | In packages mode the TS compiler isn't invoked at the root level |
| `plugin` | Root | Plugins will only be loaded from the root configuration |

### Input Options

| Option | Location | Notes |
| --- | --- | --- |
| `entryPoints` | Both | Root: project directories to convert, Package: source code to convert |
| `entryPointStrategy` | Both | Root: `"packages"`, Package: anything but `"packages"` |
| `packageOptions` | Root | Options to be applied to each package |
| `alwaysCreateEntryPointModule` | Both | Likely only useful in packages as there will generally be more than one package |
| `projectDocuments` | Both | Root: Docs at the root level, Package: Docs at the package level |
| `exclude` | Both | Root: Packages to exclude, Package: Entry points and exports to exclude. |
| `externalPattern` | Package |  |
| `excludeExternals` | Both | Root: If the "Externals" filter should be shown in HTML rendering, Package: Exclude items when converting |
| `excludeNotDocumented` | Package |  |
| `excludeNotDocumentedKinds` | Package |  |
| `excludeInternal` | Package |  |
| `excludePrivate` | Package |  |
| `excludePrivateClassFields` | Package |  |
| `excludeProtected` | Package |  |
| `excludeReferences` | Package |  |
| `excludeCategories` | Package |  |
| `maxTypeConversionDepth` | Package |  |
| `name` | Both | Root: Site name, Package: Package name |
| `includeVersion` | Both | Root: Repo version, Package: Package version |
| `disableSources` | Package | Rendering will always write sources if present, they must be disabled when converting |
| `sourceLinkTemplate` | Package | Source links are set when converting packages |
| `gitRevision` | Package |  |
| `gitRemote` | Package |  |
| `disableGit` | Package |  |
| `readme` | Both | Root: Site readme, Package: Package readme |
| `basePath` | Both | Root: Site readme, documents, Package: Package readme, documentation comments, documents |

### Output Options

| Option | Location | Notes |
| --- | --- | --- |
| `outputs` | Root | Outputs are not written when processing each package |
| `out` | Root |  |
| `html` | Root |  |
| `json` | Root |  |
| `pretty` | Root |  |
| `emit` | Both |  |
| `theme` | Root |  |
| `router` | Root |  |
| `lightHighlightTheme` | Root |  |
| `darkHighlightTheme` | Root |  |
| `highlightLanguages` | Root |  |
| `ignoredHighlightLanguages` | Root |  |
| `typePrintWidth` | Root |  |
| `customCss` | Root |  |
| `customJs` | Root |  |
| `customFooterHtml` | Root |  |
| `customFooterHtmlDisableWrapper` | Root |  |
| `markdownItOptions` | Root |  |
| `markdownItLoader` | Root |  |
| `displayBasePath` | Both | Used to determine file names of entry points and documents |
| `cname` | Root |  |
| `favicon` | Root |  |
| `sourceLinkExternal` | Root |  |
| `markdownLinkExternal` | Root |  |
| `lang` | Root |  |
| `locales` | Root |  |
| `githubPages` | Root |  |
| `cacheBust` | Root |  |
| `hideGenerator` | Root |  |
| `searchInComments` | Root |  |
| `searchInDocuments` | Root |  |
| `cleanOutputDir` | Root |  |
| `titleLink` | Root |  |
| `navigationLinks` | Root |  |
| `sidebarLinks` | Root |  |
| `navigation` | Root |  |
| `headings` | Root |  |
| `sluggerConfiguration` | Root |  |
| `navigationLeaves` | Root |  |
| `visibilityFilters` | Root |  |
| `searchCategoryBoosts` | Root |  |
| `searchGroupBoosts` | Root |  |
| `hostedBaseUrl` | Root |  |
| `useHostedBaseUrlForAbsoluteLinks` | Root |  |
| `useFirstParagraphOfCommentAsSummary` | Root |  |
| `includeHierarchySummary` | Root |  |

### Comment Options

| Option | Location | Notes |
| --- | --- | --- |
| `commentStyle` | Package |  |
| `useTsLinkResolution` | Package |  |
| `preserveLinkText` | Package |  |
| `jsDocCompatibility` | Package |  |
| `suppressCommentWarningsInDeclarationFiles` | Package |  |
| `blockTags` | Package |  |
| `inlineTags` | Package |  |
| `modifierTags` | Package |  |
| `cascadedModifierTags` | Package |  |
| `excludeTags` | Package |  |
| `notRenderedTags` | Root |  |
| `preservedTypeAnnotationTags` | Package |  |
| `externalSymbolLinkMappings` | Both | Unresolved links are checked both when converting and when merging projects |

### Organization Options

| Option | Location | Notes |
| --- | --- | --- |
| `groupReferencesByType` | Both | Root: Used when determining the group for search group boosts, Package: Used when grouping |
| `categorizeByGroup` | Package |  |
| `defaultCategory` | Both | Root: Used when determining the category for search, Package: Used when categorizing |
| `categoryOrder` | Package |  |
| `groupOrder` | Package |  |
| `sort` | Both | Root: Sorting for packages, Package: Sorting within packages |
| `sortEntryPoints` | Both | Root: Whether to sort packages, Package: Whether to sort entry points |
| `kindSortOrder` | Package |  |

### Validation Options

| Option | Location | Notes |
| --- | --- | --- |
| `validation` | Both | TypeDoc modifies the default for packages to defer most validation until projects have been merged. Should generally only be set in the root |
| `treatWarningsAsErrors` | Root |  |
| `treatValidationWarningsAsErrors` | Root |  |
| `intentionallyNotExported` | Both |  |
| `requiredToBeDocumented` | Both |  |
| `packagesRequiringDocumentation` | Both |  |
| `intentionallyNotDocumented` | Both |  |

### Other Options

| Option | Location | Notes |
| --- | --- | --- |
| `watch` | Root | Not supported in packages mode |
| `preserveWatchOutput` | Root |  |
| `help` | Root |  |
| `version` | Root |  |
| `showConfig` | Root | Only shows root configuration values |
| `logLevel` | Root |  |
| `skipErrorChecking` | Package |  |

## Notes

- Only applies when `entryPointStrategy` is `"packages"`. TypeDoc effectively runs within each entry point directory and merges the results.
- In each package directory TypeDoc does not copy options from the root configuration object, so conversion-time options must be set in each project.
- The `typedoc.json` example is from the `packageOptions` section of the Input options page; within `packageOptions`, paths are interpreted relative to the package directory.
- Source: https://typedoc.org/documents/Options.Package_Options.html (TypeDoc v0.28.20, fetched 2026-11-14)

## Related

- [Options: Input](./input.md)
- [Options: Configuration](./configuration.md)
