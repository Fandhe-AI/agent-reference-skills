# kubb studio

プロジェクトを Kubb Studio（https://kubb.studio）に接続し、ペアリングと権限を管理し、CI スナップショットを公開するコマンド。生成はローカルで実行され、進捗と生成ファイルのパスが Studio に送られる。`--allow-read` でブラウザーに生成ファイルの内容と diff を表示でき、`--allow-read-ast` でパース済み spec を共有できる。

## Signature / Usage

```shell
kubb studio
```

初回はペアリングコードを Studio で承認する。その後 CLI がこのプロジェクトに付与する権限を尋ねる。

## Actions

位置引数でアクションを選ぶ。デフォルトは `connect`。

| Action | Description |
| --- | --- |
| `connect` | フォアグラウンドのセッションを維持し、要求に応じて生成 |
| `start` | ペアリングと権限を解決し、このプロジェクトをバックグラウンドで接続 |
| `stop` | バックグラウンドワーカーを停止（ペアリングは保持） |
| `login` | 生成セッションを開かずにこのマシンを再ペアリング。保存済み権限はリセット |
| `logout` | バックグラウンドワーカーを停止し、このプロジェクトの保存済みトークンを破棄 |
| `status` | ワーカー状態・ログパス・ペアリング・保存済み権限を表示 |
| `snapshot` | このマシンで生成してスナップショットをパックし、1 リクエストでアップロードして終了。CI 連携（/docs/5.x/integrations/ci）参照 |

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--config=<path>`, `-c <path>` | | 設定ファイルのパス（例: `./kubb.staging.ts`） |
| `--url=<url>` | `https://kubb.studio` | Kubb Studio の URL。平文 `http://` は `localhost` / `127.0.0.1` / `[::1]` のみ可 |
| `--allow-read` | `false` | Studio に生成ファイル内容の読み取りを許可。省略時はプロジェクトごとに一度尋ねる |
| `--allow-read-ast` | `false` | Studio にパース済み spec（Kubb AST）の読み取りを許可。省略時は一度尋ねる |
| `--allow-write` | `false` | 生成ファイルをディスクに書き込む。省略時は一度尋ねる |
| `--allow-config-edit` | `false` | Studio に `kubb.config.ts` のプラグインオプション変更を許可。一度尋ねる |
| `--allow-exec` | `false` | フォーマッター・リンター・`output.postGenerate` を実行。一度尋ねる |
| `--no-open` | | 承認ページをブラウザーで開かない |
| `--log-level=<silent\|info\|verbose>`, `-l` | `info` | ログの詳細度 |
| `--token=<key>` | | `snapshot` のみ: 組織の CI API キー。デフォルトは `KUBB_TOKEN` |
| `--id=<id>` | | `snapshot` のみ: CI エージェントの安定 ID。GitHub Actions / GitLab CI / Bitbucket Pipelines / CircleCI では自動検出 |
| `--base-id=<id>` | | `snapshot` のみ: 比較対象の別 CI エージェント（例: ベースブランチ）の `--id`。GitHub pull request / GitLab merge request では自動検出 |
| `--name=<name>` | | `snapshot` のみ: tarball のパッケージ名。デフォルトは name と version を持つ最寄りの `package.json` の name |
| `--package-version=<version>` | | `snapshot` のみ: tarball のパッケージバージョン。デフォルトは同 `package.json` の version |
| `--json` | `false` | `snapshot` のみ: サマリーの代わりに結果を 1 つの JSON オブジェクトで出力 |

`snapshot` に `--allow-*` フラグは無い。`kubb generate` と同様に `output.path` へ書き込み、フォーマッター・リンター・`output.postGenerate` を実行する。50 MB を超える tarball は拒否される。

`--allow-read` 無しでもセッションは生成しファイルパスを報告するが、Studio は内容を表示できない。フラグで渡されない権限は CLI が尋ね、プロジェクトディレクトリごとに回答を記憶する。TTY が無い場合は権限プロンプトをスキップするため、必要なフラグを渡す。CI ではペアリングも拒否され保存済み認証情報が必要になるため、代わりに `snapshot` を使う。各アクションは失敗時に終了コード 1 で終了する。

## Environment variables

| Name | Description |
| --- | --- |
| `KUBB_HOME` | CLI が Studio 関連の状態を保存するディレクトリ。デフォルト `~/.kubb` |
| `KUBB_TOKEN` | `snapshot` のみ: 組織の CI API キー。`--token` と同じ |
| `KUBB_AGENT_MAX_GENERATIONS` | Studio が読めるようエージェントが保持する直近の生成数。デフォルト `8` |
| `KUBB_AGENT_MAX_GENERATIONS_MB` | 保持する生成の合計サイズ上限（MB）。デフォルト `100` |
| `KUBB_AGENT_MAX_SNAPSHOT_MB` | diff 用にディスクへ保持するコピーのサイズ上限（MB）。デフォルト `50` |

## Notes

- バックグラウンド接続: `start` / `status` / `stop` は同じプロジェクトディレクトリから実行する。`status` は `starting` / `connected` / `reconnecting` / `authentication required` / `stopped` を報告する。1 プロジェクトに所有ワーカーは 1 つのみで、フォアグラウンドの `connect` の前に停止する。ワーカーはターミナルを閉じても生存し一時的な接続失敗を再試行する。クラッシュや再起動後は再起動が必要。トークンが拒否された場合は `kubb studio login` の後 `kubb studio start`。URL や config を変えるには停止して新しいフラグで開始する（フラグは権限を追加するのみ。`login` は保存済み権限をリセット）。
- 認証情報・ワーカー状態・ワーカーログは `KUBB_HOME` に置かれ、`status` がログパスを表示する。`stop` は実行中の生成の後始末を待ち、`logout` は認証情報を削除する前にワーカーを停止する。中断されたジョブは再実行されない。
- `snapshot --json` は `id` / `name` / `version` / `integrity` / `url` / `snapshotIdUrl` / `expiresAt` / `agentUrl` を持つ JSON を出力し、比較が可能なら `changes`（同一 PR / ブランチの直前スナップショットとの比較）と `branchChanges`（`--base-id` のエージェント、または GitHub PR / GitLab MR で検出したベースブランチの最新スナップショットとの比較。`branch` と `baseFound` フィールドを持つ）も含む。スナップショットのインストールには別の `registry` API キーが必要。
- CI エージェント ID: GitHub Actions / GitLab CI / Bitbucket Pipelines / CircleCI を検出し、他のプロバイダーは安定した `--id` が必要。ベースブランチで安定 `--id` を使い、PR 実行で `--base-id` にその ID を渡す。`--id` を渡すとベース検出が無効になるため、`branchChanges` が欲しい場合は `--base-id` も渡す。GitLab CI ではマージリクエストのパイプラインは 1 つの CI エージェントに公開され、ブランチパイプラインはブランチごとに 1 エージェント。MR パイプラインはターゲットブランチの最新スナップショットとの差分を `branchChanges`、MR の前回パイプラインとの差分を `changes` に報告し、記録されるコミットはソースブランチの head。
- Studio のプラグイン一覧とオプションフォームは extension manifest（`kubb-extension.json`）から構築される。エージェントは接続時に、(1) `package.json` の `dependencies` / `devDependencies`、(2) `kubb.config.ts` が import するパッケージ、(3) `kubb` に同梱の `@kubb/adapter-oas` / `@kubb/parser-ts` / `@kubb/parser-md` / `@kubb/plugin-barrel` のいずれかに由来し、有効な manifest を持つ extension を報告する。サードパーティ plugin はプロジェクトにインストールされ `kind: "plugin"` の manifest を持てば registry 登録無しで Studio で動作する（`kubb add` かパッケージマネージャーでインストールし、再接続）。エージェントが import するのは `@kubb/plugin-*` パッケージか、manifest が `kind: "plugin"` のインストール済みパッケージのみで、それ以外のパッケージ名は import 前に拒否される。Docker エージェントとホスト型サンドボックスはイメージにインストール済みのパッケージのみ実行でき、実行時インストールは行わない。実行できない plugin は未インストールとして `kubb add <id>` のヒント付きで表示される。
- 出典: https://kubb.dev/docs/5.x/reference/commands/studio （kubb@5.11.0 の docs/5.x/reference/commands/studio.md）

## Related

- [generate](./generate.md)
- [add](./add.md)
