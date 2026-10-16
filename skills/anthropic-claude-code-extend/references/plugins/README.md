# plugins

| Name | Description | Path |
| --- | --- | --- |
| Anthropic's marketplaces | Anthropic 公式の official / community / demo marketplace 一覧 | [anthropic-marketplaces.md](./anthropic-marketplaces.md) |
| Code intelligence plugins | LSP 接続による診断・シンボル単位のコードナビゲーション plugin | [code-intelligence.md](./code-intelligence.md) |
| Install and manage plugins | marketplace からの plugin 発見・install・enable 管理 | [discover-plugins.md](./discover-plugins.md) |
| Host and maintain a marketplace | marketplace.json の公開・private アクセス・更新 / rename 運用 | [host-marketplace.md](./host-marketplace.md) |
| Marketplace reference | marketplace.json のフィールド・plugin source 定義・validate メッセージ | [marketplace-reference.md](./marketplace-reference.md) |
| Measure plugin cost and usage | plugin のトークンコスト・利用状況・telemetry イベント計測 | [measure-plugin.md](./measure-plugin.md) |
| Plugin commands reference | `claude plugin` CLI・`/plugin`・`/reload-plugins` コマンド完全リファレンス | [plugin-cli-reference.md](./plugin-cli-reference.md) |
| Add components to a plugin | skill / command / agent / hook / MCP / LSP 等の plugin コンポーネント追加 | [plugin-components.md](./plugin-components.md) |
| Constrain plugin dependency versions | plugin dependency の semver constraint 宣言・bundle 形式 | [plugin-dependencies.md](./plugin-dependencies.md) |
| Test plugins with evals | `claude plugin eval` による plugin の評価・baseline 比較・CI ゲート | [plugin-evals.md](./plugin-evals.md) |
| Recommend your plugin from your CLI | CLI 実行時に hint marker 出力して Claude Code に plugin 推奨 | [plugin-hints.md](./plugin-hints.md) |
| Plugin loading reference | session 開始・`/reload-plugins` 時の plugin 読み込み規則と設定判定 | [plugin-loading.md](./plugin-loading.md) |
| Create a marketplace | marketplace.json から team / community 向け marketplace を構築・ローカル検証 | [plugin-marketplaces.md](./plugin-marketplaces.md) |
| Recommend plugins for your org | marketplace plugin の relevance block (topic / signals) | [plugin-relevance.md](./plugin-relevance.md) |
| Plugin security and trust | plugin 実行時の権限・marketplace 信頼性の確認観点 | [plugin-security.md](./plugin-security.md) |
| Manage Claude Code plugins for your organization | managed settings による組織単位の plugin 許可・配布制御 | [plugins-org.md](./plugins-org.md) |
| Plugins overview | plugin の概要・marketplace との関係 | [plugins-overview.md](./plugins-overview.md) |
| Plugin manifest reference | plugin.json マニフェストのフィールド・path 形式・userConfig スキーマ | [plugins-reference.md](./plugins-reference.md) |
| Troubleshoot plugins | plugin / marketplace のエラーメッセージ・症状と対処 | [plugins-troubleshooting.md](./plugins-troubleshooting.md) |
| Create a Claude Code plugin | skill / agent / hook / MCP / LSP / output-style を含む custom plugin 作成 | [plugins.md](./plugins.md) |
| Publish and distribute a plugin | marketplace 掲載・directory / zip による plugin 配布 | [publish-plugin.md](./publish-plugin.md) |
