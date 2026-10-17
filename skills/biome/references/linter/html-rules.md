# HTML ルール

対象 Biome 2.5.15。8 グループのうち a11y / correctness / nursery / performance / security / style の 6 グループにルールがある。

## a11y（アクセシビリティ）— 37 ルール（`noNoninteractiveElementInteractions` 以外は推奨）

2.5.0 で JSX の a11y ルールの多くが HTML へ移植された。

| ルール | 説明 |
|-------|------|
| noAccessKey | accesskey 属性の使用禁止 |
| noAmbiguousAnchorText | 曖昧なアンカーテキストの禁止 |
| noAriaHiddenOnFocusable | フォーカス可能要素への aria-hidden="true" 禁止 |
| noAriaUnsupportedElements | ARIA 非対応要素への ARIA 属性禁止 |
| noAutofocus | autofocus 属性の使用禁止 |
| noDistractingElements | 気を散らす要素（marquee, blink）の使用禁止 |
| noHeaderScope | scope は `<th>` のみ |
| noInteractiveElementToNoninteractiveRole | インタラクティブ要素への非インタラクティブ role 禁止 |
| noLabelWithoutControl | label にテキストと関連 input を必須 |
| noNoninteractiveElementInteractions | 非インタラクティブ要素へのイベントハンドラ禁止（推奨外） |
| noNoninteractiveElementToInteractiveRole | 非インタラクティブ要素へのインタラクティブ role 禁止 |
| noNoninteractiveTabindex | 非インタラクティブ要素への tabindex 禁止 |
| noPositiveTabindex | 正の tabindex の使用禁止 |
| noRedundantAlt | alt に "image" / "picture" / "photo" を含めない |
| noRedundantRoles | 暗黙の role と同じ明示 role の禁止 |
| noStaticElementInteractions | クリックハンドラ付き静的要素に有効な role を必須 |
| noSvgWithoutTitle | svg に title 要素を必須 |
| useAltText | 代替テキストを必須 |
| useAnchorContent | アンカー要素にコンテンツを必須 |
| useAriaActivedescendantWithTabindex | aria-activedescendant を持つ要素に tabindex を必須 |
| useAriaPropsForRole | role に必要な ARIA 属性を必須 |
| useAriaPropsSupportedByRole | role が対応する ARIA プロパティのみ許可 |
| useButtonType | button に有効な type 属性必須 |
| useFocusableInteractive | インタラクティブ role の要素はフォーカス可能に |
| useHeadingContent | 見出し要素にコンテンツを必須 |
| useHtmlLang | html 要素に lang 属性必須 |
| useIframeTitle | iframe に title 必須 |
| useKeyWithClickEvents | click イベントにキーボードイベントを併設 |
| useKeyWithMouseEvents | onmouseover / onmouseout に onfocus / onblur を併設 |
| useMediaCaption | audio / video に字幕 track を必須 |
| useSemanticElements | ARIA role よりセマンティック要素を推奨 |
| useValidAnchor | 有効なアンカーを強制 |
| useValidAriaProps | 有効な ARIA プロパティを強制 |
| useValidAriaRole | 有効な ARIA ロールを強制 |
| useValidAriaValues | 有効な ARIA 値を強制 |
| useValidAutocomplete | input の autocomplete に有効な値を強制 |
| useValidLang | lang に有効な ISO 言語 / 国コードを強制 |

## correctness — 14 ルール（全て推奨。大半が Vue テンプレート向け）

| ルール | 説明 |
|-------|------|
| noDuplicateAttributes | 重複属性禁止 |
| noVueVIfWithVFor | 同一要素での v-if と v-for 併用禁止 |
| useVueVForKey | v-for に一意の key を必須 |
| useVueValidTemplateRoot | `<template>` ルートの正しい使用 |
| useVueValidVBind | 値の欠落・不正な modifier のある v-bind を禁止 |
| useVueValidVCloak | 有効な v-cloak |
| useVueValidVElse | 有効な v-else |
| useVueValidVElseIf | 有効な v-else-if |
| useVueValidVHtml | 有効な v-html |
| useVueValidVIf | 有効な v-if |
| useVueValidVOn | 有効な v-on（引数・modifier・ハンドラ） |
| useVueValidVOnce | 有効な v-once |
| useVueValidVPre | 有効な v-pre |
| useVueValidVText | 有効な v-text |

## nursery — 24 ルール（推奨なし）

| ルール | 説明 |
|-------|------|
| noAstroConflictingSetDirectives | Astro 要素の競合するコンテンツ源を禁止 |
| noAstroSetHtmlDirective | Astro の `set:html` 禁止 |
| noInlineStyles | インラインスタイル禁止 |
| noInvalidFileInputAccept | file input の不正な accept 値を禁止 |
| noMisplacedListElements | `<li>` は ul / ol / menu の子に |
| noNonScalableViewport | `user-scalable=no` によるズーム無効化禁止 |
| noObsoleteTags | 廃止された HTML 要素の禁止 |
| noSvelteAtDebugTags | Svelte の `{@debug}` 禁止 |
| noSvelteAtHtmlTags | Svelte の `{@html}` 禁止 |
| noSvelteLegacyConst | レガシー Svelte `{@const}` 禁止 |
| noTailwindArbitraryValue | Tailwind ユーティリティの任意値禁止 |
| noTailwindRawColors | Tailwind の raw パレット色禁止 |
| noUndeclaredClasses | class 属性の未定義 CSS クラスを検出 |
| noUndeclaredCustomProperties | 宣言のない var() カスタムプロパティを検出 |
| noUnsafeIframeSandbox | sandbox 属性の危険な組み合わせ禁止 |
| noVueUndeclaredDirectives | 未宣言のカスタム Vue ディレクティブ禁止 |
| noVueVOnNumberValues | v-on の非推奨 number modifier 禁止 |
| useAstroClientOnlyDirectiveValue | Astro `client:only` に値を必須 |
| useControlLabel | インタラクティブ要素にアクセシブルな label を必須 |
| useIframeSandbox | iframe に sandbox 属性を必須 |
| useScopedStyles | Vue SFC の `<style>` に scoped、Astro で `is:global` 禁止 |
| useSvelteRequireEachKey | Svelte `{#each}` に key を必須 |
| useTailwindShorthandClasses | 同等の複数 Tailwind ユーティリティを短縮 |
| useVueValidVFor | 有効な v-for |

## performance — 2 ルール

| ルール | 説明 |
|-------|------|
| noSyncScripts | 同期スクリプトの使用禁止 |
| useVueVapor | `<script setup>` で Vue Vapor モードを opt-in |

## security — 1 ルール

| ルール | 説明 |
|-------|------|
| noScriptUrl | `javascript:` URL 禁止（推奨） |

## style — 4 ルール

| ルール | 推奨 | 説明 |
|-------|------|------|
| noExcessiveLinesPerFile | — | ファイルの行数上限 |
| useVueConsistentVBindStyle | ○ | v-bind の記法を統一 |
| useVueConsistentVOnStyle | ○ | v-on の記法を統一 |
| useVueHyphenatedAttributes | ○ | テンプレート属性名の大文字を禁止 |

## Related

- ルールの由来となる ESLint プラグイン対応は [html-sources.md](./html-sources.md) を参照
