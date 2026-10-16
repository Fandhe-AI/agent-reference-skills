# HTML ルールのソース

HTML（Vue / Svelte / Astro 等のテンプレート含む）の Biome ルールと、他ツールのルールとの対応表。

## Biome 独自ルール

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

## @eslint-react/eslint-plugin 対応

| @eslint-react/eslint-plugin ルール | Biome ルール |
|-----------------------------------|-------------|
| dom-no-missing-button-type | useButtonType (inspired) |
| dom-no-script-url | noScriptUrl |
| dom-no-unsafe-iframe-sandbox | noUnsafeIframeSandbox (inspired) |

## @html-eslint/eslint-plugin 対応

| @html-eslint/eslint-plugin ルール | Biome ルール |
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

## @next/eslint-plugin-next 対応

| @next/eslint-plugin-next ルール | Biome ルール |
|-------------------------------|-------------|
| no-sync-scripts | noSyncScripts |

## @shadcn/lint 対応

| @shadcn/lint ルール | Biome ルール |
|--------------------|-------------|
| no-raw-colors | noTailwindRawColors (inspired) |

## ESLint 対応

| ESLint ルール | Biome ルール |
|--------------|-------------|
| no-script-url | noScriptUrl |

## eslint-plugin-astro 対応

| eslint-plugin-astro ルール | Biome ルール |
|--------------------------|-------------|
| missing-client-only-directive-value | useAstroClientOnlyDirectiveValue (inspired) |
| no-conflict-set-directives | noAstroConflictingSetDirectives |
| no-set-html-directive | noAstroSetHtmlDirective |

## eslint-plugin-better-tailwindcss 対応

| eslint-plugin-better-tailwindcss ルール | Biome ルール |
|----------------------------------------|-------------|
| enforce-shorthand-classes | useTailwindShorthandClasses (inspired) |

## eslint-plugin-jsx-a11y 対応

| eslint-plugin-jsx-a11y ルール | Biome ルール |
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

## eslint-plugin-qwik 対応

| eslint-plugin-qwik ルール | Biome ルール |
|-------------------------|-------------|
| jsx-a | useValidAnchor (inspired) |
| jsx-no-script-url | noScriptUrl |

## eslint-plugin-react 対応

| eslint-plugin-react ルール | Biome ルール |
|--------------------------|-------------|
| button-has-type | useButtonType (inspired) |
| jsx-no-script-url | noScriptUrl |

## eslint-plugin-react-dom 対応

| eslint-plugin-react-dom ルール | Biome ルール |
|------------------------------|-------------|
| no-missing-button-type | useButtonType (inspired) |
| no-script-url | noScriptUrl |
| no-unsafe-iframe-sandbox | noUnsafeIframeSandbox (inspired) |

## eslint-plugin-solid 対応

| eslint-plugin-solid ルール | Biome ルール |
|--------------------------|-------------|
| jsx-no-script-url | noScriptUrl |

## eslint-plugin-svelte 対応

| eslint-plugin-svelte ルール | Biome ルール |
|---------------------------|-------------|
| no-at-debug-tags | noSvelteAtDebugTags |
| no-at-html-tags | noSvelteAtHtmlTags |
| require-each-key | useSvelteRequireEachKey |

## eslint-plugin-tailwindcss 対応

| eslint-plugin-tailwindcss ルール | Biome ルール |
|--------------------------------|-------------|
| no-arbitrary-value | noTailwindArbitraryValue |

## eslint-plugin-unicorn 対応

| eslint-plugin-unicorn ルール | Biome ルール |
|----------------------------|-------------|
| no-invalid-file-input-accept | noInvalidFileInputAccept |

## eslint-plugin-vue 対応

| eslint-plugin-vue ルール | Biome ルール |
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
