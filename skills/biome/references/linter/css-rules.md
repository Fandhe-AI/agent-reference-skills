# CSS ルール

## カテゴリ別ルール一覧

### a11y（アクセシビリティ）

| ルール | 推奨 | 説明 |
|-------|------|------|
| useGenericFontNames | ○ | font-family にジェネリックファミリーキーワードを必須 |

### complexity

| ルール | 推奨 | 説明 |
|-------|------|------|
| noImportantStyles | — | `!important` の使用禁止 |

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
| noDeprecatedMediaType | — | 非推奨メディアタイプを検出 |
| noExcessiveLinesPerFile | — | ファイルの行数上限 |
| noHexColors | — | 16進数カラーの使用禁止 |
| useBaseline | — | ベースライン互換性チェック |

### style

| ルール | 推奨 | 説明 |
|-------|------|------|
| noDescendingSpecificity | ○ | 詳細度の降順を禁止 |
| noValueAtRule | — | @value ルールの使用禁止 |

### suspicious

| ルール | 推奨 | 説明 |
|-------|------|------|
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
| noUselessEscapeInString | — | 無用なエスケープを検出 |
