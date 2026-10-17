---
name: react
description: >
  React (UI ライブラリ本体, react / react-dom 19.3) の公式リファレンス。
  Hooks (useState, useEffect, useActionState, useOptimistic, useEffectEvent), use, cache, Suspense,
  Activity, ViewTransition, createRoot, hydrateRoot, createPortal, flushSync, react-dom/server,
  Server Components / Server Functions, React Compiler, eslint-plugin-react-hooks, DevTools。
user-invocable: false
---

# React

> 分割 PR の途中段階。現在収録済み: references/{apis, compiler, components, dom-apis, dom-components, dom-server, hooks, legacy, rules-of-react, server-components}。冒頭説明・description に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

対象バージョン: React 19.3.1 (npm `react` / `react-dom` latest、2026-10-14 公開。versions.md の表記は "Latest version: 19.3")。
関連パッケージ: babel-plugin-react-compiler 1.0.0 / eslint-plugin-react-hooks 7.1.1 / @types/react 19.3.0 / react-devtools 8.0.0。
ドキュメント出典: reactjs/react.dev（リリースタグなしのため main の commit `046f17d04295ba047bb5739026b4ac3110f17028`（2026-10-06）に pin）。取得日 2026-10-16。

## ディレクトリ構成

```text
skills/react/
  SKILL.md
  references/
    hooks/                  # useState / useEffect / useActionState / useOptimistic ほか
      README.md
      overview.md
      useState.md
      useEffect.md
      useActionState.md
      useOptimistic.md
    apis/                   # react パッケージの組み込み API
      README.md
      overview.md
      react-package.md
      use.md
      cache.md
      memo.md
      startTransition.md
    components/             # 組み込みコンポーネント
      README.md
      Suspense.md
      Activity.md
      ViewTransition.md
      Fragment.md
      Profiler.md
      StrictMode.md
      overview.md
    dom-components/         # react-dom のコンポーネント (form / input / link / script ほか)
      README.md
      common.md
      form.md
      link.md
    dom-apis/               # react-dom の API・クライアント API・フォーム状態
      README.md
      createRoot.md
      hydrateRoot.md
      createPortal.md
      flushSync.md
      useFormStatus.md
      preload.md
    dom-server/             # react-dom/server・static
      README.md
      renderToPipeableStream.md
      renderToReadableStream.md
      prerender.md
      resume.md
    server-components/      # RSC・Server Functions・ディレクティブ
      README.md
      server-components.md
      server-functions.md
      use-client.md
      use-server.md
      directives.md
    rules-of-react/         # Rules of React
      README.md
      overview.md
      rules-of-hooks.md
      components-and-hooks-must-be-pure.md
      react-calls-components-and-hooks.md
    compiler/               # React Compiler
      README.md
      introduction.md
      installation.md
      configuration.md
      compilationMode.md
      incremental-adoption.md
      debugging.md
    legacy/                 # レガシー API
      README.md
      overview.md
      Component.md
      forwardRef.md
      createElement.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| state・ref・effect・context・transition などの Hook を使う | hooks | [references/hooks/README.md](references/hooks/README.md) |
| フォーム Action・楽観的更新・Effect Event の API を調べる | hooks | [references/hooks/README.md](references/hooks/README.md) |
| `use` / `cache` / `memo` / `lazy` / `startTransition` / `createContext` を調べる | apis | [references/apis/README.md](references/apis/README.md) |
| `act`・`captureOwnerStack`・`addTransitionType`・taint API を調べる | apis | [references/apis/README.md](references/apis/README.md) |
| Suspense / Activity / ViewTransition / StrictMode / Profiler / Fragment を使う | components | [references/components/README.md](references/components/README.md) |
| `<form>` / `<input>` / `<select>` / `<link>` / `<script>` / `<title>` などの DOM コンポーネントを調べる | dom-components | [references/dom-components/README.md](references/dom-components/README.md) |
| `createRoot` / `hydrateRoot` / `createPortal` / `flushSync` を使う | dom-apis | [references/dom-apis/README.md](references/dom-apis/README.md) |
| `preload` / `preinit` / `preconnect` などのリソースプリロード、`useFormStatus` を調べる | dom-apis | [references/dom-apis/README.md](references/dom-apis/README.md) |
| サーバーレンダリング・ストリーミング・prerender・resume を調べる | dom-server | [references/dom-server/README.md](references/dom-server/README.md) |
| Server Components・Server Functions・`'use client'` / `'use server'` を調べる | server-components | [references/server-components/README.md](references/server-components/README.md) |
| Hooks のルール・純粋性など Rules of React を確認する | rules-of-react | [references/rules-of-react/README.md](references/rules-of-react/README.md) |
| React Compiler の導入・設定・段階的導入・デバッグ | compiler | [references/compiler/README.md](references/compiler/README.md) |
| `"use memo"` / `"use no memo"` / compilationMode / gating を調べる | compiler | [references/compiler/README.md](references/compiler/README.md) |
| クラスコンポーネント・`forwardRef`・`createElement` などレガシー API を調べる | legacy | [references/legacy/README.md](references/legacy/README.md) |
