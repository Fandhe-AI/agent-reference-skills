# Configuration

| Name | Description | Path |
|------|-------------|------|
| Command Settings | フックで実行されるコマンドの設定。各コマンドには名前と関連する run オプションがある。 | [command-settings.md](./command-settings.md) |
| Global Settings | Lefthook のグローバル設定オプション。プロジェクト全体の動作を制御する設定項目をまとめている。 | [global-settings.md](./global-settings.md) |
| Hook Settings | Git フック（commands、scripts、skip ルールなど）の設定を含む。任意の Git フックまたはカスタムフック（例: `test`）を指定できる。 | [hook-settings.md](./hook-settings.md) |
| Remotes | 複数のリモート設定を提供して、lefthook の設定を多くのプロジェクトで共有できる。Lefthook は自動的にリモート設定をダウンロードしてローカルの `lefthook.yml` にマージする。 | [remotes.md](./remotes.md) |
| Script Settings | `<source_dir>/<hook-name>/` ディレクトリに配置される独自の実行可能スクリプトの設定。スクリプトはプロジェクトルートから実行される。 | [script-settings.md](./script-settings.md) |
| Source Dir | スクリプトファイルのディレクトリ設定。 | [source-dir.md](./source-dir.md) |
