# ドメイン

## 概要

特定のフレームワーク・環境に対応したルール群を一括管理する機能。依存関係から自動検出。

## 設定方法

```json
{
  "linter": {
    "domains": {
      "react": "recommended"   // 推奨ルールのみ
      // "react": "all"        // 全ルール
      // "react": "none"       // 無効
    }
  }
}
```

## 利用可能なドメイン

### フレームワーク・ライブラリ

| ドメイン | 対象 | 説明 |
|---------|------|------|
| react | react >= 16.0.0 | React 固有の問題検出（フック、コンポーネント構造） |
| reactNative | react-native >= 0.60.0 | For React Native (detects runtime issues such as text rendered outside `<Text>`). The official configuration example uses the key `reactnative` |
| next | next >= 14.0.0 | Next.js 向け（非同期クライアントコンポーネント、スクリプト最適化） |
| vue | vue >= 3.0.0 | Vue 3 テンプレート構文・コンポーネント検証 |
| svelte | svelte >= 3.0.0 | Svelte フレームワーク固有ルール |
| solid | solid >= 1.0.0 | Solid フレームワーク固有ルール（React ドメインと競合あり） |
| qwik | @builder.io/qwik >= 1.0.0 / @qwik.dev/core >= 2.0.0 | Qwik 最適化パターン |
| astro | astro >= 1.0.0 | Astro 固有ルール（全て nursery） |
| tailwind | tailwindcss >= 3.0.0 | Tailwind CSS 固有ルール（全て nursery） |

### テスト・品質保証

| ドメイン | 対象 | 説明 |
|---------|------|------|
| test | jest >= 26.0.0 / mocha >= 8.0.0 / ava >= 2.0.0 / vitest >= 1.0.0 | テスト汎用ルール（ライブラリ自動検出） |
| playwright | @playwright/test >= 1.0.0 | Playwright テスト向け |

### インフラ・開発ツール

| ドメイン | 対象 | 説明 |
|---------|------|------|
| project | — | モジュールグラフ分析（未宣言依存・循環参照検出） |
| types | — | 型推論エンジン（浮遊 Promise 検出・条件式冗長性） |
| turborepo | turbo >= 1.0.0 | モノレポ環境変数管理 |
| drizzle | drizzle-orm >= 0.9.0 | DB ORM 安全操作（WHERE 句検証） |

## 特徴

- **自動検出**: 依存関係からドメインを自動判定
- **グローバル認識**: テスト用グローバル変数（test, expect 等）を自動認識
- **パフォーマンス**: Project ドメインはプロジェクト全体スキャンのため処理負荷増加

## Notes

- 全 15 ドメイン（astro / drizzle / next / playwright / project / qwik / react / reactNative / solid / svelte / tailwind / test / turborepo / types / vue）。公式ページは 2.5.15 時点
- astro / drizzle / playwright / reactNative / svelte / tailwind はルールが全て nursery のため、`"recommended"` を指定しても有効化されるルールはない。個別ルールを明示的に有効化する
- types ドメインは project 同様にプロジェクト全体をスキャンし、型推論エンジンを有効化する
