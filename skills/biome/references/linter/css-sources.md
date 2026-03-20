# CSS ルールのソース

## Biome 独自ルール

- noExcessiveLinesPerFile
- noUselessEscapeInString
- noValueAtRule

## Stylelint 対応

| Stylelint ルール | Biome ルール |
|-----------------|-------------|
| at-rule-no-unknown | noUnknownAtRules |
| block-no-empty | noEmptyBlock |
| color-no-hex | noHexColors |
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
| named-grid-areas-no-invalid | noInvalidGridAreas |
| no-descending-specificity | noDescendingSpecificity |
| no-duplicate-at-import-rules | noDuplicateAtImportRules |
| no-empty-source | noEmptySource |
| no-irregular-whitespace | noIrregularWhitespace |
| property-no-unknown | noUnknownProperty |
| selector-anb-no-unmatchable | noUnmatchableAnbSelector |
| selector-pseudo-class-no-unknown | noUnknownPseudoClass |
| selector-pseudo-element-no-unknown | noUnknownPseudoElement |
| selector-type-no-unknown | noUnknownTypeSelector |
| unit-no-unknown | noUnknownUnit |

### @eslint/css 対応

| @eslint/css ルール | Biome ルール |
|-------------------|-------------|
| use-baseline | useBaseline |

注意: 一部のルールは元のルールと比べてオプションを持たない場合がある。
