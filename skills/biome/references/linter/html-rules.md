# HTML ルール + ソース

## a11y（アクセシビリティ）— 全 16 ルール（全て推奨）

| ルール | 説明 |
|-------|------|
| noAccessKey | accesskey 属性の使用禁止 |
| noAutofocus | autofocus 属性の使用禁止 |
| noDistractingElements | 気を散らす要素（marquee, blink）の使用禁止 |
| noPositiveTabindex | 正のtabindex の使用禁止 |
| useAltText | 代替テキストを必須 |
| useAnchorContent | アンカー要素にコンテンツを必須 |
| useButtonType | button に type 属性必須 |
| useHeadingContent | 見出し要素にコンテンツを必須 |
| useHtmlLang | html 要素に lang 属性必須 |
| useIframeTitle | iframe に title 必須 |
| useKeyWithClickEvents | click イベントにキーボードイベントを併設 |
| useKeyWithMouseEvents | マウスイベントにキーボードイベントを併設 |
| useMediaCaption | メディア要素にキャプションを必須 |
| useValidAnchor | 有効なアンカーを強制 |
| useValidAriaProps | 有効な ARIA プロパティを強制 |
| useValidAriaRole | 有効な ARIA ロールを強制 |

## nursery — 24 ルール

| ルール | 説明 |
|-------|------|
| noConsole | console 使用禁止 |
| noDuplicateAttributes | 重複属性禁止 |
| noExcessiveLinesPerFile | 行数上限 |
| noMissingAttributeValues | 属性値の欠落検出 |
| noScriptUrl | javascript: URL 禁止 |
| noUnknownHtmlTag | 不明な HTML タグ検出 |
| useClosingTag | 閉じタグ必須 |
| useConsistentSelfClose | 自己閉じタグの一貫性 |
| useStrictDoctype | 正しい DOCTYPE 必須 |

（Vue テンプレート検証ルール等も含む）

## ソース

### eslint-plugin-jsx-a11y 対応

HTML a11y ルールの多くは `eslint-plugin-jsx-a11y` からインスパイアされている。

### eslint-plugin-vue 対応

nursery の Vue 関連ルールは `eslint-plugin-vue` からインスパイアされている。
