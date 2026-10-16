# CSS ルールのソース

対象 Biome 2.5.15。

## Biome 独自ルール

- noExcessiveLinesPerFile
- noInvalidPropertyInitValue
- noUndeclaredCustomProperties
- noUnusedClasses
- noUselessEscapeInString
- noValueAtRule
- useLogicalProperties

## Stylelint 対応

| Stylelint ルール | Biome ルール |
|-----------------|-------------|
| at-rule-no-unknown | noUnknownAtRules |
| block-no-empty | noEmptyBlock |
| color-no-hex | noHexColors |
| custom-property-no-missing-var-function | noMissingVarFunction |
| declaration-block-no-duplicate-custom-properties | noDuplicateCustomProperties |
| declaration-block-no-duplicate-properties | noDuplicateProperties |
| declaration-block-no-shorthand-property-overrides | noShorthandPropertyOverrides |
| declaration-no-important | noImportantStyles |
| font-family-no-duplicate-names | noDuplicateFontNames |
| font-family-no-missing-generic-family-keyword | useGenericFontNames |
| function-linear-gradient-no-nonstandard-direction | noInvalidDirectionInLinearGradient |
| function-no-unknown | noUnknownFunction |
| keyframe-block-no-duplicate-selectors | noDuplicateSelectorsKeyframeBlock |
| keyframe-declaration-no-important | noImportantInKeyframe |
| media-feature-name-no-unknown | noUnknownMediaFeatureName |
| media-type-no-deprecated | noDeprecatedMediaType |
| named-grid-areas-no-invalid | noInvalidGridAreas |
| no-descending-specificity | noDescendingSpecificity |
| no-duplicate-at-import-rules | noDuplicateAtImportRules |
| no-duplicate-selectors | noDuplicateSelectors |
| no-empty-source | noEmptySource |
| no-invalid-position-at-import-rule | noInvalidPositionAtImportRule |
| no-irregular-whitespace | noIrregularWhitespace |
| property-no-unknown | noUnknownProperty |
| selector-anb-no-unmatchable | noUnmatchableAnbSelector |
| selector-max-class | noExcessiveSelectorClasses |
| selector-pseudo-class-no-unknown | noUnknownPseudoClass |
| selector-pseudo-element-no-unknown | noUnknownPseudoElement |
| selector-type-no-unknown | noUnknownTypeSelector |
| unit-no-unknown | noUnknownUnit |

## @eslint/css 対応

| @eslint/css ルール | Biome ルール |
|-------------------|-------------|
| font-family-fallbacks | useGenericFontNames (inspired) |
| no-duplicate-imports | noDuplicateAtImportRules (inspired) |
| no-duplicate-keyframe-selectors | noDuplicateSelectorsKeyframeBlock |
| no-empty-blocks | noEmptyBlock |
| no-important | noImportantStyles |
| no-invalid-at-rule-placement | noInvalidPositionAtImportRule (inspired) |
| no-invalid-at-rules | noUnknownAtRules (inspired) |
| no-invalid-named-grid-areas | noInvalidGridAreas |
| no-invalid-properties | noUnknownProperty (inspired) |
| no-unmatchable-selectors | noUnmatchableAnbSelector (inspired) |
| use-baseline | useBaseline (inspired) |
| use-layers | useLayeredStyles (inspired) |

## @html-eslint/eslint-plugin 対応

| @html-eslint ルール | Biome ルール |
|--------------------|-------------|
| use-baseline | useBaseline (inspired) |

注意: 一部のルールは元のルールと比べてオプションを持たない場合がある。
