# Agent Reference Skills

Claude Code 用のスキル（リファレンスドキュメント）とエージェント定義のコレクション。

公式ドキュメントから抽出・構造化した markdown をスキルとして提供する。Claude Code がコード作成・レビュー時に自動でライブラリの API リファレンスを参照できるようになる。

[vercel-labs/skills](https://github.com/vercel-labs/skills) CLI を使用してインストールする。

## 使い方

### スキルの追加

```bash
# すべてのスキルを一覧表示
npx skills add Fandhe-AI/agent-reference-skills --list

# 特定のスキルを追加（例: vitest）
npx skills add Fandhe-AI/agent-reference-skills --skill vitest

# 複数のスキルを追加
npx skills add Fandhe-AI/agent-reference-skills --skill vitest --skill zod --skill biome

# すべてのスキルを追加
npx skills add Fandhe-AI/agent-reference-skills --all
```

デフォルトではプロジェクトの `.claude/skills/` にシンボリックリンクで追加される。`--copy` フラグでファイルコピーに変更可能。

### グローバルインストール

`-g` フラグで `~/.claude/skills/` にインストールすると、すべてのプロジェクトで利用できる。

```bash
npx skills add Fandhe-AI/agent-reference-skills --skill react-router -g
```

## リポジトリ構成

詳細なディレクトリ構成（`.claude/` の Agent・Rule・ワークフロースキル、`skills/` のスキル構造）は [CLAUDE.md](CLAUDE.md) の「Repository Structure」を参照。

## スキル一覧（全 118 スキル）

### Apple プラットフォーム

| スキル | 説明 |
| -------- | ------ |
| [apple-swift](skills/apple-swift/) | Swift — 標準ライブラリ, 並行処理 (async/await, actor, Task), プロトコル & ジェネリクス, Observation |
| [apple-swiftui](skills/apple-swiftui/) | SwiftUI — View, レイアウト, 状態管理 (@State / @Binding), ナビゲーション, モディファイア, アニメーション |
| [apple-data](skills/apple-data/) | SwiftData / Core Data / Foundation / Combine — 永続化, データフロー, ネットワーク |
| [apple-app-services](skills/apple-app-services/) | StoreKit / CloudKit / WidgetKit / Notifications / MapKit / HealthKit / Sign in with Apple |
| [apple-uikit](skills/apple-uikit/) | UIKit — UIViewController, ビュー/コントロール, UICollectionView / UITableView, Auto Layout |
| [apple-appkit](skills/apple-appkit/) | AppKit — NSApplication, NSWindow, ビュー/コントロール, NSTableView / NSCollectionView |
| [apple-graphics](skills/apple-graphics/) | Metal / Core Animation / Core Graphics / Core Image / SpriteKit / SceneKit |
| [apple-silicon](skills/apple-silicon/) | Apple Silicon GPU コンピュート — Metal Shading Language, compute dispatch / unified memory, MPS / MPSGraph, MLX |
| [apple-spatial](skills/apple-spatial/) | RealityKit / ARKit / visionOS — 空間コンピューティング |
| [apple-media](skills/apple-media/) | AVFoundation 再生 / キャプチャ / オーディオ / PhotoKit |
| [apple-ml](skills/apple-ml/) | Core ML / Create ML / Vision / Natural Language / Speech — オンデバイス機械学習 |
| [apple-distribution](skills/apple-distribution/) | App Store Connect API / TestFlight / In-App Purchase |

### Android プラットフォーム

Jetpack Compose 系の 3 スキル（`android-compose-*`）は `androidx.compose.*`、`android-wear` は `androidx.wear.compose.*`、`android-platform-core` の Glance は `androidx.glance.*` と、同名で別 API のため統合していない。

| スキル | 説明 |
| -------- | ------ |
| [android-compose-ui](skills/android-compose-ui/) | Jetpack Compose UI 基盤 — Composable, Modifier, remember / State, Column / Row / Box / LazyColumn, テキスト, ジェスチャ, セマンティクス |
| [android-compose-components](skills/android-compose-components/) | Material3 コンポーネント — Button, TextField, Card, Scaffold, Dialog, BottomSheet, NavigationBar, MaterialTheme |
| [android-compose-graphics-animation](skills/android-compose-graphics-animation/) | Compose アニメーション・描画 — AnimatedVisibility, animate*AsState, Animatable, Canvas, DrawScope, Brush |
| [android-architecture](skills/android-architecture/) | 推奨アーキテクチャ — UI / Domain / Data レイヤー, UDF, ViewModel, Lifecycle, Hilt DI, Paging 3 |
| [android-navigation](skills/android-navigation/) | 画面遷移 — Navigation 3 (NavDisplay), Navigation Compose, 型安全ルート, ディープリンク / App Links, 予測型戻る |
| [android-data](skills/android-data/) | データ層 — Room, DataStore, MediaStore, スコープ付きストレージ, Retrofit / OkHttp |
| [android-background-work](skills/android-background-work/) | バックグラウンド処理 — WorkManager, Service, AlarmManager, BroadcastReceiver, コルーチン / Flow |
| [android-platform-core](skills/android-platform-core/) | プラットフォーム基盤 — Activity, Intent, AndroidManifest, ランタイム権限, 通知, WindowInsets, Glance ウィジェット |
| [android-media-camera](skills/android-media-camera/) | Media3 / CameraX — ExoPlayer, MediaSession, DRM, ImageCapture, ImageAnalysis, VideoCapture |
| [android-testing](skills/android-testing/) | テスト — JUnit4, Espresso, Robolectric, MockK / Mockito, UiAutomator, Compose UI テスト |
| [android-build-gradle](skills/android-build-gradle/) | Gradle ビルド — AGP, Kotlin DSL, version catalog, KSP, R8/ProGuard, App Bundle |
| [android-wear](skills/android-wear/) | Wear OS — Wear Compose, Tiles / ProtoLayout, Complications, Health Services, Watch Face Format |

### Windows プラットフォーム

対象は Windows アプリ開発のみ（IT Pro / Windows Server / IoT / ドライバー / Windows 365 は対象外）。WinUI 3 (`Microsoft.UI.Xaml`) と WPF (`System.Windows`) / WinForms (`System.Windows.Forms`) は同名 API を持つため、後者は `windows-interop-modernize` が担当し統合していない。

| スキル | 説明 |
| -------- | ------ |
| [windows-winui-controls](skills/windows-winui-controls/) | WinUI 3 コントロール — Button, TextBox, ListView, ItemsView, NavigationView, TabView, ContentDialog, CommandBar, InfoBar, WebView2 |
| [windows-winui-ui](skills/windows-winui-ui/) | XAML UI 基盤 — Grid / StackPanel / Canvas, XAML マークアップ, Style / ControlTemplate / VisualState, x:Bind / Binding, Storyboard / Composition |
| [windows-app-sdk](skills/windows-app-sdk/) | Windows App SDK — AppInstance / アクティベーション, AppWindow / タイトルバー, AppNotification, MRT Core, ウィジェット, 配置とリリースチャネル |
| [windows-design](skills/windows-design/) | Fluent Design ガイドライン — レイアウト / 角丸 / 影, カラー / Mica / Acrylic, タイポグラフィ / アイコン, モーション, ナビゲーション / コマンド, アクセシビリティ |
| [windows-data-storage](skills/windows-data-storage/) | ファイル・設定・データ — Windows.Storage, ApplicationData, FileOpenPicker / FolderPicker, JSON / XML, SQLite |
| [windows-platform-integration](skills/windows-platform-integration/) | OS 統合 — デバイス / センサー, ネットワーク, 入力 / ポインター / インク, グローバリゼーション, 資格情報 / Windows Hello, クリップボード / 共有 / ジャンプリスト |
| [windows-graphics-media](skills/windows-graphics-media/) | グラフィックス・メディア — Direct2D / DirectWrite, Direct3D 11/12 / DXGI, Composition / Visual, MediaCapture / 画面キャプチャ, MediaPlayer / AudioGraph |
| [windows-ai](skills/windows-ai/) | Windows AI — Windows AI Foundry (Phi Silica, OCR, Imaging), Windows ML / ONNX Runtime, Foundry Local, MCP / App Actions, DirectML |
| [windows-packaging-publish](skills/windows-packaging-publish/) | パッケージング・公開 — MSIX, パッケージ ID, App Installer / 配置, SignTool / Trusted Signing, Microsoft Store / Partner Center |
| [windows-interop-modernize](skills/windows-interop-modernize/) | 相互運用・近代化 — Win32 / COM, C++/WinRT, C#/WinRT, XAML Islands, WPF / WinForms 連携, UWP からの移行 |
| [windows-testing-performance](skills/windows-testing-performance/) | 品質 — 単体テスト / WinAppDriver / WACK, 起動時間 / 仮想化 / プロファイリング, UI オートメーション, DispatcherQueue / スレッド |

### Anthropic プラットフォーム

Claude Code 系 6 スキルは code.claude.com、Claude API 系 6 スキルは platform.claude.com が出典。「Skills」「MCP」「Agent (SDK)」は各スキルで別概念のため統合していない。

| スキル | 説明 |
| -------- | ------ |
| [anthropic-claude-code](skills/anthropic-claude-code/) | Claude Code CLI — 基礎, settings.json, CLAUDE.md / メモリ, 環境変数, トラブルシューティング |
| [anthropic-claude-code-surfaces](skills/anthropic-claude-code-surfaces/) | Claude Code サーフェス — Desktop (Mac / Windows / Linux), VS Code / JetBrains 拡張, web / mobile |
| [anthropic-claude-code-extend](skills/anthropic-claude-code-extend/) | Claude Code 拡張 — Agent Skills (SKILL.md), subagents, hooks, MCP, plugins, routines |
| [anthropic-claude-code-admin](skills/anthropic-claude-code-admin/) | Claude Code 管理 — permissions, sandboxing, enterprise 設定, analytics / OpenTelemetry |
| [anthropic-claude-code-deploy](skills/anthropic-claude-code-deploy/) | Claude Code デプロイ — Bedrock / Vertex / Foundry 経由, apps gateway, LLM gateway, GitHub Actions / GitLab CI/CD, headless / devcontainer |
| [anthropic-agent-sdk](skills/anthropic-agent-sdk/) | Claude Agent SDK — TypeScript / Python, query, カスタムツール, MCP, subagents, sessions |
| [anthropic-api-core](skills/anthropic-api-core/) | Claude API — Messages API, streaming, batches, files, structured outputs, prompt caching |
| [anthropic-api-tools-mcp](skills/anthropic-api-tools-mcp/) | Claude API ツール — tool use, server tools (web search / code execution / computer use), Skills API, MCP connector |
| [anthropic-managed-agents](skills/anthropic-managed-agents/) | Claude Managed Agents (beta) — agents / sessions, environments / vaults, deployments / webhooks / dreams |
| [anthropic-admin-platform](skills/anthropic-admin-platform/) | Claude API 管理 — Admin API, Compliance API, organization / workspace / API キー管理 |
| [anthropic-prompt-eval](skills/anthropic-prompt-eval/) | Claude プロンプト・評価 — prompt engineering, モデル別プロンプティング, evals / grading, guardrails, ユースケース |
| [anthropic-models-sdks](skills/anthropic-models-sdks/) | Claude モデル・SDK — モデル選択 / model ID, pricing / deprecation, SDK 7 言語, Claude API 用 CLI (ant) |

### OpenAI プラットフォーム

openai-agents は MCP を消費する側、openai-apps-sdk は MCP サーバーを ChatGPT アプリとして公開する側で棲み分け。

| スキル | 説明 |
| -------- | ------ |
| [openai-api-core](skills/openai-api-core/) | OpenAI API — Responses API / structured outputs / streaming / webhooks / 公式 SDK |
| [openai-agents](skills/openai-agents/) | OpenAI Agents SDK — built-in tools / MCP / handoffs / guardrails / tracing |
| [openai-realtime-audio](skills/openai-realtime-audio/) | OpenAI Realtime API — WebRTC / WebSocket / SIP, STT / TTS |
| [openai-images-video](skills/openai-images-video/) | OpenAI 画像・動画生成 — gpt-image / vision / Sora |
| [openai-evals-tuning](skills/openai-evals-tuning/) | OpenAI Evals・Fine-tuning — Evals / graders / SFT・DPO・RFT |
| [openai-platform-ops](skills/openai-platform-ops/) | OpenAI 運用・管理 — Administration API / RBAC / WIF / Terraform / production ガイド |
| [openai-codex](skills/openai-codex/) | OpenAI Codex — CLI / IDE / cloud / AGENTS.md / sandbox / administration / Codex Security |
| [openai-apps-sdk](skills/openai-apps-sdk/) | OpenAI Apps SDK — ChatGPT plugins / window.openai / registerAppTool / ui:// リソース / MCP 公開側 |

### フレームワーク / ライブラリ

| スキル | 説明 |
| -------- | ------ |
| [nextjs-app](skills/nextjs-app/) | Next.js App Router — Server Components, Server Actions, ルーティング, キャッシュ, Metadata |
| [react-router](skills/react-router/) | React Router v8 Framework Mode (RR8) — loader, action, middleware, routes.ts, hooks, SSR/SPA, type-safe routing |
| [tanstack-router](skills/tanstack-router/) | TanStack Router — 型安全 React ルーター, createFileRoute, loader / beforeLoad, validateSearch, file-based routing, tsr CLI |
| [tanstack-start](skills/tanstack-start/) | TanStack Start — TanStack Router ベースのフルスタック React, createServerFn, createMiddleware, server routes, SSR / SPA / prerender |
| [tanstack-query](skills/tanstack-query/) | TanStack Query (React Query) v5 — useQuery, useMutation, useInfiniteQuery, QueryClient, invalidateQueries, SSR / hydration |
| [tanstack-table](skills/tanstack-table/) | TanStack Table (React Table) v9 — ヘッドレステーブル, useTable, tableFeatures, sorting / filtering / pagination, v8 移行 |
| [tanstack-virtual](skills/tanstack-virtual/) | TanStack Virtual — React 仮想スクロール, useVirtualizer, useWindowVirtualizer, 動的計測, infinite scroll |
| [react-hook-form](skills/react-hook-form/) | React Hook Form v7 — useForm, register, Controller, バリデーション |
| [react-flow](skills/react-flow/) | React Flow — ノード, エッジ, カスタムノード, レイアウト |
| [chakra-ui](skills/chakra-ui/) | Chakra UI v3 — コンポーネント, テーマ, レシピ, スタイルプロップ |
| [ark-ui](skills/ark-ui/) | Ark UI — headless / unstyled コンポーネント (Chakra v3 の Zag.js 基盤), asChild, RootProvider, collections |
| [fandhe-frontend](skills/fandhe-frontend/) | fandhe-frontend — Rust 製フロントエンドフレームワーク, SSR/SPA/SSG/View Transitions, hydration, Primitives (headless) / Themes (styled), fw CLI |
| [storybook](skills/storybook/) | Storybook — CSF, args, decorators, play function, autodocs |
| [better-auth](skills/better-auth/) | Better Auth — 認証, OAuth, passkey, twoFactor, プラグイン |
| [supabase](skills/supabase/) | Supabase — database, auth, storage, edge-functions, realtime, RLS |
| [driverjs](skills/driverjs/) | Driver.js — プロダクトツアー, 要素ハイライト, ポップオーバー |
| [hermes-agent](skills/hermes-agent/) | Hermes Agent — AI CLI エージェント, MCP, Voice Mode, Messaging Gateway |
| [hono](skills/hono/) | Hono — 軽量 Web フレームワーク, Middleware, Helpers, マルチランタイム |
| [fastify](skills/fastify/) | Fastify v5 — Node.js 高速 HTTP サーバー, fastify.register / encapsulation / fastify-plugin, decorators, ライフサイクルフック, JSON Schema + Ajv, Type Providers, fastify.inject, fastify-cli |
| [go-echo](skills/go-echo/) | Echo — Go 製高性能 Web フレームワーク, Routing, Middleware, Binding, Validation |
| [fandhe-backend](skills/fandhe-backend/) | fandhe-backend — Rust 製バックエンド HTTP サーバーフレームワーク, Server / Router / Handler, Middleware / UpgradeHandler / RequestGate, sans-IO HTTP/1.1, プラグイン |
| [fandhe-ai](skills/fandhe-ai/) | fandhe-ai — Rust 製 AI/ML ライブラリ, Tensor / dynamic-tape autodiff / kernel fusion, CPU・CUDA・Metal バックエンド, ONNX / safetensors, guardrail / self-repair CLI |
| [nuqs](skills/nuqs/) | nuqs — URL search params state manager |
| [inngest](skills/inngest/) | Inngest — イベント駆動 Durable Execution, createFunction, step, フロー制御 |

### ビルド / テスト / 品質

| スキル | 説明 |
| -------- | ------ |
| [playwright](skills/playwright/) | Playwright — E2E テスト, page, locator, fixtures, trace, auth |
| [vitest](skills/vitest/) | Vitest — test, expect, vi.fn, vi.mock, coverage, snapshot |
| [biome](skills/biome/) | Biome — formatter/linter, ルール設定, ESLint/Prettier 移行 |
| [turborepo](skills/turborepo/) | Turborepo — turbo.json, キャッシュ, タスク依存, workspaces |
| [knip](skills/knip/) | Knip — 未使用コード検出, auto-fix, monorepos |
| [commitlint](skills/commitlint/) | commitlint — コミットメッセージ検証, Conventional Commits |
| [lefthook](skills/lefthook/) | Lefthook — Git hooks マネージャー, pre-commit, pre-push |
| [editorconfig](skills/editorconfig/) | EditorConfig — .editorconfig ファイルフォーマット |
| [syncpack](skills/syncpack/) | Syncpack — モノレポ依存関係管理, versionGroups, semverGroups |

### コード生成 / ドキュメント

| スキル | 説明 |
| -------- | ------ |
| [kubb](skills/kubb/) | Kubb — OpenAPI コードジェネレーター, TypeScript / Zod / TanStack Query 生成 |
| [typedoc](skills/typedoc/) | TypeDoc — TypeScript ドキュメントジェネレーター |
| [tsdoc](skills/tsdoc/) | TSDoc — コメント記述ガイドライン, TypeDoc 互換タグ |

### 3D / グラフィックス / アニメーション / デザイン

| スキル | 説明 |
| -------- | ------ |
| [threejs](skills/threejs/) | Three.js — WebGL / WebGPU 3D グラフィックス, Scene, Mesh, Material, Loader |
| [blender](skills/blender/) | Blender — Python API (bpy / bmesh), モデリング, レンダリング, add-on, MCP Server |
| [cadquery](skills/cadquery/) | CadQuery — Python 製 3D CAD スクリプティング, Workplane, Sketch, Assemblies |
| [motion](skills/motion/) | Motion (旧 Framer Motion) — animate, scroll, gestures, layout, hooks |
| [rive](skills/rive/) | Rive — アニメーションランタイム, State Machine, Data Binding, useRive |
| [theatrejs](skills/theatrejs/) | Theatre.js — アニメーションツールキット, Sheet, Sequence, R3F 統合, studio |
| [figma](skills/figma/) | Figma — REST API / Plugin API / Widget API / Code Connect / MCP Server |

### ハードウェア / EDA

| スキル | 説明 |
| -------- | ------ |
| [kicad_10](skills/kicad_10/) | KiCad 10.0 — EDA スイート, 回路図設計, 基板設計, kicad-cli, ガーバー出力 |
| [ergogen](skills/ergogen/) | Ergogen — 自作キーボード設計, YAML 設定, points / outlines / cases / pcbs |
| [zmk](skills/zmk/) | ZMK Firmware — キーボードファームウェア, keymap, behaviors, bluetooth, split |
| [dgx-spark](skills/dgx-spark/) | DGX Spark — GB10 Grace Blackwell, セットアップ, ConnectX-7 クラスタ, ローカル LLM, プレイブック |
| [nvidia-cuda](skills/nvidia-cuda/) | NVIDIA CUDA — CUDA C++/Python, kernel, nvcc, PTX ISA, Blackwell チューニング, CUTLASS / CuTe GEMM |
| [nvidia-sync](skills/nvidia-sync/) | NVIDIA Sync — DGX Spark / DGX Station リモート接続, Cluster Assistant, ConnectX-7, Tailscale, アプリ起動 |
| [amd-rocm](skills/amd-rocm/) | AMD ROCm / HIP — HIP プログラミングモデル, ランタイム API, hipify, rocBLAS / MIOpen / RCCL, CDNA / RDNA アーキテクチャ |

### 言語

| スキル | 説明 |
| -------- | ------ |
| [rust](skills/rust/) | Rust — 所有権, ライフタイム, トレイト, async/await, Cargo, 標準ライブラリ |

### ユーティリティ / インフラ

| スキル | 説明 |
| -------- | ------ |
| [zod](skills/zod/) | Zod — TypeScript スキーマバリデーション |
| [dayjs](skills/dayjs/) | Day.js — 軽量日付ライブラリ |
| [pino](skills/pino/) | Pino — JSON ロガー, transport, redaction |
| [bullmq](skills/bullmq/) | BullMQ — Redis ジョブキュー, Worker, FlowProducer |
| [mssql](skills/mssql/) | mssql (node-mssql) — Node.js 向け Microsoft SQL Server クライアント, tedious / msnodesqlv8, ConnectionPool, sql.query タグ付きテンプレート, bulk / TVP, prepared statement, Diagnostics Channel |
| [github-docs](skills/github-docs/) | GitHub — REST API, Actions, Webhooks, gh CLI |
| [stripe](skills/stripe/) | Stripe — 決済, Checkout, Subscriptions, Webhooks, Connect, 全商品 API |
| [gws](skills/gws/) | Google Workspace CLI (gws) — Rust 製, Gmail / Drive / Calendar 等 19 サービス統一操作 |
| [upstash](skills/upstash/) | Upstash — サーバーレスデータ, @upstash/redis / ratelimit / QStash / vector / workflow |
| [vercel](skills/vercel/) | Vercel — CLI, vercel.json, Functions, Blob, Edge Config, デプロイメント管理 |
| [proxmox-ve](skills/proxmox-ve/) | Proxmox VE — KVM/LXC ハイパーバイザー, クラスター, Ceph, HA, SDN, CLI, REST API |

### アーキテクチャ

| スキル | 説明 |
| -------- | ------ |
| [feature-sliced-design](skills/feature-sliced-design/) | Feature-Sliced Design — レイヤー構成, 依存方向, Public API パターン |

## エージェント

main エージェントは「対話・計画・委譲・報告」に徹し、token を消費する実作業（ドキュメント調査、references 作成、SKILL.md 作成、検証、lint、棚卸し）はすべて用途別サブエージェントへ委譲する。詳細は `.claude/rules/delegation.md` を参照。

| カテゴリ | エージェント | model | 役割 |
| -------- | ------------ | ----- | ---- |
| research | `reference-researcher` | sonnet | 公式ドキュメントをクロールして `references/` を作成（scope 毎に並列） |
| research | `reference-updater` | sonnet | 既存スキルを最新ドキュメントと差分比較・更新（check / apply） |
| research | `skill-coverage-analyzer` | opus | 読み取り専用のギャップ分析・新スキル提案 |
| author | `skill-author` | sonnet | references 完成後に `SKILL.md` を作成・更新 |
| author | `description-optimizer` | sonnet | `description` フィールドのヒット率・長さ最適化 |
| author | `readme-indexer` | haiku | カテゴリ README の索引表を再生成 |
| author | `sample-curator` | sonnet | 動く実例を `samples/` に整備 |
| author | `script-collector` | sonnet | 実行可能コマンドを `scripts/` に収集 |
| quality | `skill-structure-validator` | haiku | 読み取り専用の構造整合性チェック |
| quality | `reference-linter` | haiku | 読み取り専用のファイル・frontmatter lint |
| quality | `plan-verifier` | sonnet | 読み取り専用の計画完了検証 |

## 新しいスキルの追加手順

`/create-skill <library> [base_url]` を実行すると、委譲ベースで以下のフローを自動でオーケストレーションする（main エージェントは自分でドキュメントをクロールしない）。

1. (任意) `skill-coverage-analyzer` が追加価値とスコープを確認
2. `create-plan` が `_/local-plans/<library>-skill.md` を作成
3. `reference-researcher` を **scope 毎に並列実行** → `references/`、`sample-curator` → `samples/`、`script-collector` → `scripts/`
4. `skill-author` が `SKILL.md` を作成（必要に応じ `description-optimizer` が description を最適化）
5. `reference-linter` + `skill-structure-validator` が検証し、指摘を該当エージェントへ差し戻し
6. `update-docs` が新スキルを CLAUDE.md / README.md に反映

既存スキルを最新ドキュメントへ追従させる場合は `/update-skill <library> [check|apply]`（`reference-updater` が駆動）を実行する。

## 関連リポジトリ

| リポジトリ | 概要 |
| ---------- | ---- |
| [agent-cli-skills](https://github.com/Fandhe-AI/agent-cli-skills) | 開発ワークフロースキル集（コミット・PR・Issue・レビュー自動化） |
| [agent-util-skills](https://github.com/Fandhe-AI/agent-util-skills) | ユーティリティスキル集（レポート生成・ホスティングセットアップ等） |
| [template-skills](https://github.com/Fandhe-AI/template-skills) | スキルリポジトリの共通テンプレート。新しいスキルリポジトリはこのテンプレートから作成する |
