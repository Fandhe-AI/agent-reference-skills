# HTML Rule Sources

Biome rules for HTML (including Vue / Svelte / Astro templates) mapped to the rules of other tools.

## Biome exclusive rules

```text
noExcessiveLinesPerFile
noSvelteLegacyConst
noSvgWithoutTitle
noUndeclaredClasses
noUndeclaredCustomProperties
noVueUndeclaredDirectives
useIframeSandbox
useVueVapor
```

## Rules from @eslint-react/eslint-plugin

| @eslint-react/eslint-plugin rule | Biome rule |
|-----------------------------------|-------------|
| dom-no-missing-button-type | useButtonType (inspired) |
| dom-no-script-url | noScriptUrl |
| dom-no-unsafe-iframe-sandbox | noUnsafeIframeSandbox (inspired) |

## Rules from @html-eslint/eslint-plugin

| @html-eslint/eslint-plugin rule | Biome rule |
|----------------------------------|-------------|
| no-accesskey-attrs | noAccessKey |
| no-aria-hidden-on-focusable | noAriaHiddenOnFocusable |
| no-duplicate-attrs | noDuplicateAttributes |
| no-empty-headings | useHeadingContent |
| no-inline-styles | noInlineStyles |
| no-invalid-role | useValidAriaRole |
| no-non-scalable-viewport | noNonScalableViewport |
| no-obsolete-tags | noObsoleteTags |
| no-positive-tabindex | noPositiveTabindex |
| no-redundant-role | noRedundantRoles |
| require-button-type | useButtonType |
| require-frame-title | useIframeTitle |
| require-img-alt | useAltText |
| require-lang | useHtmlLang |
| require-li-container | noMisplacedListElements (inspired) |

## Rules from @next/eslint-plugin-next

| @next/eslint-plugin-next rule | Biome rule |
|-------------------------------|-------------|
| no-sync-scripts | noSyncScripts |

## Rules from @shadcn/lint

| @shadcn/lint rule | Biome rule |
|--------------------|-------------|
| no-raw-colors | noTailwindRawColors (inspired) |

## Rules from ESLint

| ESLint rule | Biome rule |
|--------------|-------------|
| no-script-url | noScriptUrl |

## Rules from eslint-plugin-astro

| eslint-plugin-astro rule | Biome rule |
|--------------------------|-------------|
| missing-client-only-directive-value | useAstroClientOnlyDirectiveValue (inspired) |
| no-conflict-set-directives | noAstroConflictingSetDirectives |
| no-set-html-directive | noAstroSetHtmlDirective |

## Rules from eslint-plugin-better-tailwindcss

| eslint-plugin-better-tailwindcss rule | Biome rule |
|----------------------------------------|-------------|
| enforce-shorthand-classes | useTailwindShorthandClasses (inspired) |

## Rules from eslint-plugin-jsx-a11y

| eslint-plugin-jsx-a11y rule | Biome rule |
|-----------------------------|-------------|
| alt-text | useAltText (inspired) |
| anchor-ambiguous-text | noAmbiguousAnchorText |
| anchor-has-content | useAnchorContent (inspired) |
| anchor-is-valid | useValidAnchor (inspired) |
| aria-activedescendant-has-tabindex | useAriaActivedescendantWithTabindex (inspired) |
| aria-props | useValidAriaProps (inspired) |
| aria-proptypes | useValidAriaValues (inspired) |
| aria-role | useValidAriaRole (inspired) |
| aria-unsupported-elements | noAriaUnsupportedElements (inspired) |
| autocomplete-valid | useValidAutocomplete (inspired) |
| click-events-have-key-events | useKeyWithClickEvents (inspired) |
| control-has-associated-label | useControlLabel (inspired) |
| heading-has-content | useHeadingContent (inspired) |
| html-has-lang | useHtmlLang (inspired) |
| iframe-has-title | useIframeTitle (inspired) |
| img-redundant-alt | noRedundantAlt (inspired) |
| interactive-supports-focus | useFocusableInteractive (inspired) |
| label-has-associated-control | noLabelWithoutControl (inspired) |
| lang | useValidLang (inspired) |
| media-has-caption | useMediaCaption (inspired) |
| mouse-events-have-key-events | useKeyWithMouseEvents (inspired) |
| no-access-key | noAccessKey (inspired) |
| no-aria-hidden-on-focusable | noAriaHiddenOnFocusable (inspired) |
| no-autofocus | noAutofocus (inspired) |
| no-distracting-elements | noDistractingElements (inspired) |
| no-interactive-element-to-noninteractive-role | noInteractiveElementToNoninteractiveRole (inspired) |
| no-noninteractive-element-interactions | noNoninteractiveElementInteractions (inspired) |
| no-noninteractive-element-to-interactive-role | noNoninteractiveElementToInteractiveRole (inspired) |
| no-noninteractive-tabindex | noNoninteractiveTabindex (inspired) |
| no-redundant-roles | noRedundantRoles (inspired) |
| no-static-element-interactions | noStaticElementInteractions (inspired) |
| prefer-tag-over-role | useSemanticElements (inspired) |
| role-has-required-aria-props | useAriaPropsForRole (inspired) |
| role-supports-aria-props | useAriaPropsSupportedByRole (inspired) |
| scope | noHeaderScope (inspired) |
| tabindex-no-positive | noPositiveTabindex (inspired) |

## Rules from eslint-plugin-qwik

| eslint-plugin-qwik rule | Biome rule |
|-------------------------|-------------|
| jsx-a | useValidAnchor (inspired) |
| jsx-no-script-url | noScriptUrl |

## Rules from eslint-plugin-react

| eslint-plugin-react rule | Biome rule |
|--------------------------|-------------|
| button-has-type | useButtonType (inspired) |
| jsx-no-script-url | noScriptUrl |

## Rules from eslint-plugin-react-dom

| eslint-plugin-react-dom rule | Biome rule |
|------------------------------|-------------|
| no-missing-button-type | useButtonType (inspired) |
| no-script-url | noScriptUrl |
| no-unsafe-iframe-sandbox | noUnsafeIframeSandbox (inspired) |

## Rules from eslint-plugin-solid

| eslint-plugin-solid rule | Biome rule |
|--------------------------|-------------|
| jsx-no-script-url | noScriptUrl |

## Rules from eslint-plugin-svelte

| eslint-plugin-svelte rule | Biome rule |
|---------------------------|-------------|
| no-at-debug-tags | noSvelteAtDebugTags |
| no-at-html-tags | noSvelteAtHtmlTags |
| require-each-key | useSvelteRequireEachKey |

## Rules from eslint-plugin-tailwindcss

| eslint-plugin-tailwindcss rule | Biome rule |
|--------------------------------|-------------|
| no-arbitrary-value | noTailwindArbitraryValue |

## Rules from eslint-plugin-unicorn

| eslint-plugin-unicorn rule | Biome rule |
|----------------------------|-------------|
| no-invalid-file-input-accept | noInvalidFileInputAccept |

## Rules from eslint-plugin-vue

| eslint-plugin-vue rule | Biome rule |
|-------------------------|-------------|
| attribute-hyphenation | useVueHyphenatedAttributes |
| enforce-style-attribute | useScopedStyles (inspired) |
| no-deprecated-v-on-number-modifiers | noVueVOnNumberValues |
| no-duplicate-attributes | noDuplicateAttributes |
| no-use-v-if-with-v-for | noVueVIfWithVFor |
| require-v-for-key | useVueVForKey |
| v-bind-style | useVueConsistentVBindStyle |
| v-on-style | useVueConsistentVOnStyle |
| valid-template-root | useVueValidTemplateRoot |
| valid-v-bind | useVueValidVBind |
| valid-v-cloak | useVueValidVCloak |
| valid-v-else | useVueValidVElse |
| valid-v-else-if | useVueValidVElseIf |
| valid-v-for | useVueValidVFor |
| valid-v-html | useVueValidVHtml |
| valid-v-if | useVueValidVIf |
| valid-v-on | useVueValidVOn |
| valid-v-once | useVueValidVOnce |
| valid-v-pre | useVueValidVPre |
| valid-v-text | useVueValidVText |

## Notes

- Some Biome rules might not have options, compared to the original rule.
- "(inspired)" marks rules inspired by, not a direct port of, the source rule.
- Source: https://biomejs.dev/linter/html/sources/ (website tag release-2.5.15, generated from `codegen/src/rules_sources.rs`).

## Related

- [html-rules.md](./html-rules.md)
- [css-sources.md](./css-sources.md)
- [javascript-sources.md](./javascript-sources.md)
