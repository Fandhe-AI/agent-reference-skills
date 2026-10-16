# CSS ルール

## カテゴリ別ルール一覧

### a11y（アクセシビリティ）

| ルール | 推奨 | 説明 |
|-------|------|------|
| useGenericFontNames | ○ | font-family にジェネリックファミリーキーワードを必須 |

### complexity

| ルール | 推奨 | 説明 |
|-------|------|------|
| noImportantStyles | ○ | `!important` の使用禁止 |

### correctness

| ルール | 推奨 | 説明 |
|-------|------|------|
| noInvalidDirectionInLinearGradient | ○ | linear-gradient の無効な方向を検出 |
| noInvalidGridAreas | ○ | 無効な grid-template-areas を検出 |
| noInvalidPositionAtImportRule | ○ | @import の無効な位置を検出 |
| noMissingVarFunction | ○ | CSS カスタムプロパティに var() 関数の欠落を検出 |
| noUnknownFunction | ○ | 不明な CSS 関数を検出 |
| noUnknownMediaFeatureName | ○ | 不明なメディア機能名を検出 |
| noUnknownProperty | ○ | 不明な CSS プロパティを検出 |
| noUnknownPseudoClass | ○ | 不明な擬似クラスを検出 |
| noUnknownPseudoElement | ○ | 不明な擬似要素を検出 |
| noUnknownTypeSelector | ○ | 不明な型セレクタを検出 |
| noUnknownUnit | ○ | 不明な CSS 単位を検出 |
| noUnmatchableAnbSelector | ○ | マッチ不能な An+B セレクタを検出 |

### nursery

| ルール | 推奨 | 説明 |
|-------|------|------|
| noDuplicateSelectors | — | 重複セレクタを禁止 |
| noExcessiveSelectorClasses | — | セレクタ内のクラス数を制限 |
| noInvalidPropertyInitValue | — | `@property` の `initial-value` が `syntax` に合致するか検査 |
| noUndeclaredCustomProperties | — | 宣言のない `var()` カスタムプロパティを検出 |
| noUnusedClasses | — | JSX / HTML から参照されない CSS クラスセレクタを検出 |
| useBaseline | — | 設定した Baseline に含まれない CSS 機能を禁止 |
| useLayeredStyles | — | スタイルルールを cascade layer 内に定義 |
| useLogicalProperties | — | 物理プロパティより logical properties を推奨 |
| useNamedLayer | — | 匿名 cascade layer を禁止 |

### style

| ルール | 推奨 | 説明 |
|-------|------|------|
| noDescendingSpecificity | ○ | 詳細度の降順を禁止 |
| noExcessiveLinesPerFile | — | ファイルの行数上限 |
| noHexColors | — | 16進数カラーの使用禁止 |
| noValueAtRule | — | @value ルールの使用禁止 |

### suspicious

| ルール | 推奨 | 説明 |
|-------|------|------|
| noDeprecatedMediaType | ○ | 非推奨メディアタイプを検出（nursery から昇格） |
| noDuplicateAtImportRules | ○ | 重複 @import を禁止 |
| noDuplicateCustomProperties | ○ | 重複カスタムプロパティを禁止 |
| noDuplicateFontNames | ○ | 重複フォント名を禁止 |
| noDuplicateProperties | ○ | 重複プロパティを禁止 |
| noDuplicateSelectorsKeyframeBlock | ○ | keyframe ブロックの重複セレクタを禁止 |
| noEmptyBlock | ○ | 空ブロックを禁止 |
| noEmptySource | — | 空ソースを禁止 |
| noImportantInKeyframe | ○ | keyframe 内の !important を禁止 |
| noIrregularWhitespace | ○ | 不規則な空白文字を検出 |
| noShorthandPropertyOverrides | ○ | ショートハンドプロパティの上書きを検出 |
| noUnknownAtRules | ○ | 不明な @ ルールを検出 |
| noUselessEscapeInString | ○ | 無用なエスケープを検出 |

## Notes

- 対象 Biome 2.5.15。推奨フラグは公式ルール一覧に従う（`noImportantStyles` と `noUselessEscapeInString` は推奨）
- nursery の 9 ルールは推奨に含まれない
