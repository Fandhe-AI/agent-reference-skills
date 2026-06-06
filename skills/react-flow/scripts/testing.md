# Testing

React Flow を使ったアプリのテスト環境セットアップと実行コマンド。

## Playwright のインストール（推奨: ブラウザテスト）

```sh
npm install --save-dev @playwright/test
```

```sh
pnpm add --save-dev @playwright/test
```

Playwright はリアルブラウザ環境で動作するため、React Flow の追加モック設定は不要。

## Cypress のインストール（推奨: ブラウザテスト）

```sh
npm install --save-dev cypress
```

```sh
pnpm add --save-dev cypress
```

Cypress もリアルブラウザ環境で動作するため、React Flow の追加モック設定は不要。

## Jest のインストール（Node.js 環境テスト）

```sh
npm install --save-dev jest @testing-library/react
```

```sh
pnpm add --save-dev jest @testing-library/react
```

Jest は Node.js 環境で動作するため、`ResizeObserver`・`DOMMatrixReadOnly`・`offsetHeight`・`offsetWidth`・`SVGElement.getBBox` を手動でモックする必要がある。詳細は `references/learn/testing.md` を参照。

## Playwright テストの実行

```sh
npx playwright test
```

```sh
pnpm exec playwright test
```

## Cypress テストの実行

```sh
npx cypress open
```

```sh
npx cypress run
```

## Jest テストの実行

```sh
npm test
```

```sh
pnpm test
```
