# uwp-migration

| Name | Description | Path |
|------|-------------|------|
| Migration overview | 移行全体像、UWP は継続動作するが新規投資は Windows App SDK 側にある旨、手動移行の3ステップ | [migration-overview.md](./migration-overview.md) |
| Overall migration strategy | プロジェクト作成、依存関係の少ないコードから移行する順序、ファイル/名前空間の移行手順 | [overall-migration-strategy.md](./overall-migration-strategy.md) |
| Namespace mapping | Windows.UI.Xaml/Composition/Input/ApplicationModel.Resources 等の名前空間・API 対応表 | [namespace-mapping.md](./namespace-mapping.md) |
| Feature mapping | パッケージング/ライフサイクル/ウィンドウ/UI基盤/リソース/.NETランタイム等の機能対応表 | [feature-mapping.md](./feature-mapping.md) |
| What's supported | 移行できない・代替が必要な UWP API 一覧、既知のコントロールギャップ | [what-is-supported.md](./what-is-supported.md) |
| .NET Upgrade Assistant | プロジェクトファイルの自動移行ツールと手動フォローアップ手順 | [upgrade-assistant.md](./upgrade-assistant.md) |
| App lifecycle migration | シングルインスタンス化、ファイルタイプ関連付け、OnActivated 系の移行 | [applifecycle-migration.md](./applifecycle-migration.md) |
| Windowing migration | CoreWindow/ApplicationView から AppWindow への移行、MainPage/MainWindow | [windowing-migration.md](./windowing-migration.md) |
| Threading migration | CoreDispatcher/RunAsync から DispatcherQueue/TryEnqueue への移行 | [threading-migration.md](./threading-migration.md) |
| MRT Core migration | MRT から MRT Core へのリソース管理移行 | [mrtcore-migration.md](./mrtcore-migration.md) |
| WinUI 3 UI migration | Window.Current、ファイルピッカー HWND 初期化、ContentDialog/Popup、AcrylicBrush | [winui3-ui-migration.md](./winui3-ui-migration.md) |
| Push notifications migration | Partner Center から Azure App Registration (Entra ID) へのプッシュ通知移行 | [push-notifications-migration.md](./push-notifications-migration.md) |
| App notifications (toast) migration | トースト通知のアクティベーション処理移行 | [toast-notifications-migration.md](./toast-notifications-migration.md) |
| Background task migration | out-of-proc/in-proc バックグラウンドタスクの移行戦略 | [background-task-migration.md](./background-task-migration.md) |
