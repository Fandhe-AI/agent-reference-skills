# Kubb Studio

Kubb Studio（https://kubb.studio）に `kubb.config.ts` のあるローカルプロジェクトを接続し、クライアント・型・スキーマ・フック・モックの生成とレビューをブラウザーから行う。

## Signature / Usage

プロジェクトディレクトリで実行する:

```shell
kubb studio
```

ペアリングコードを Studio のウィンドウで承認し、権限プロンプトに答える。プロジェクトディレクトリごとに別 Agent としてペアリングされる。コマンドは実行したままにし、Studio で接続済み Agent を選択して生成する。

生成ファイルの内容・差分の表示とディスクへの書き込み:

```shell
kubb studio --allow-read --allow-write
```

バックグラウンド接続:

```shell
kubb studio start --allow-read
kubb studio status
kubb studio stop
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--allow-read` | Studio が生成ファイルの内容を読める |
| `--allow-read-ast` | Studio が Kubb の解析済み仕様（AST）を読める（`--allow-read` とは別の権限） |
| `--allow-write` | Studio からファイルを書き込める |
| `--allow-config-edit` | Studio から `kubb.config.ts` を編集できる |
| `--allow-install` / `--allow-update` / `--allow-remove` | Studio からの extension のインストール・更新・削除（`kubb add` / `kubb update` / `kubb remove`） |
| `--allow-save-input` | Studio が送る spec の保存 |
| `--allow-exec` | 原文は Options ページ（reference/commands/studio#options）を参照 |

## AI プラグインの公開（Pro プラン）

Studio が Agent の OpenAPI 仕様を Claude Code / Cursor / Codex 向けプラグインに変換する。プラグインは API のサーバー・認証・操作・スキーマを列挙する skills を保持し、組織ごとに 1 つのプラグインマーケットプレイス（公開 Agent ごとに 1 プラグイン）になる。

1. `--allow-read` と `--allow-read-ast` で Agent を接続し生成を実行する。Studio は直近の成功した生成の解析済み仕様を読む
2. Studio の **Settings › your organization › AI** で **Publish an agent** を選び Agent を指定する
3. AI キーを作成する。**Settings › Developers › Tokens** で type **AI (read-only)** のトークンを作るか、AI ページの **Create an AI key** リンクを使う。registry キーはここでは使えない。Git が初回にパスワードとして AI キーを要求する（ユーザー名は任意）
4. マーケットプレイスを一度追加し、API ごとにプラグインをインストールする

```shell
claude plugin marketplace add https://kubb.studio/plugins/<organization-slug>.git
claude plugin install <plugin>@<marketplace>
```

```shell
agent plugin marketplace add https://kubb.studio/plugins/<organization-slug>.git
# Then start the Cursor CLI, run /plugin, and install the plugin from the Marketplace tab.
```

```shell
codex plugin marketplace add https://kubb.studio/plugins/<organization-slug>.git
# Then start codex, run /plugins, and select Install plugin.
```

## Notes

- Source: https://kubb.dev/docs/5.x/integrations/studio （kubb@5.20.0 の docs/5.x/integrations/studio.md、取得日 2026-11-14）
- Migration (5.11 → 5.20): `--allow-read-ast` is a separate permission and `--allow-read` covers only generated files (5.10.0 changelog, @kubb/studio, #4320); the 5.20.0 page now lists `--allow-read-ast` accordingly, and every permission is off by default. See [commands/studio.md](../commands/studio.md)
- `kubb studio` は Kubb 5.11.6 以降が必要（Studio は古い Agent を拒否）。`kubb studio snapshot` は Kubb 5.6.2 以降
- 手元の設定なしの試用には Studio の共有サンドボックスを使える（仕様を環境外へ渡してよい場合のみ）。チーム常設接続にはインフラ上の Docker agent（https://hub.docker.com/r/kubblabs/kubb-agent）を使い、ペアリングコードは組織管理者が承認する
- CLI / Docker Agent では生成は自環境で実行される。Studio が受け取るのはプラグイン設定・プロジェクトパス・進捗・生成ファイルのパス・各ファイルのハッシュ。ローカル仕様はアップロードされない。`--allow-read` を付けると生成ファイルの内容を、`--allow-read-ast` を付けると解析済み仕様を Studio が読める。書き込みは `--allow-write`、`kubb.config.ts` の編集は `--allow-config-edit` が必要
- `--allow-read` を付けると、Studio は生成前に出力ディレクトリを開く。保持コピーはコンテンツハッシュを持つため、行コメントと HTML プレビューがすぐ使える。以降の生成は前回の出力セットと比較される。再接続しても変更の無い初回出力は再利用され、初回出力と生成実行は別の保持予算を持つため、再接続で生成実行が追い出されない。`--allow-write` 無しでは、生成は一時ディスクディレクトリにファイルをステージしプロジェクトの出力を変更しない。フォーマッター・リンター・生成後コマンドは `--allow-write` と `--allow-exec` の両方が必要
- 権限を付与しない場合、出力フォルダーには触れず Studio にはファイルパスと進捗のみ見える。直近の生成のコピーは `node_modules/.cache/kubb` に保持される。CLI は権限の回答をプロジェクト単位で記憶する
- TTY がない環境では権限プロンプトが省略されるため、必要な権限フラグを渡す。CI ではペアリングも行わないので、CI API キーとともに `kubb studio snapshot` を使う
- AI プラグイン非対応のプランでは AI ページがロックされる。URL に registry キーを埋め込む形（`https://kubb:<key>@kubb.studio/...`）は CI で動くがシェル履歴とログに残る
- マーケットプレイスの追加後、Cursor と Codex はコマンドではなくプラグインブラウザーからインストールする。仕様が変わったら Agent を再公開し、ツール側でマーケットプレイスを更新する
- 本ページは Studio へ接続する CLI 連携。Claude Code 側の Kubb プラグイン（`/kubb:*` コマンド）は [claude.md](../ai/claude.md)

## Related

- [overview.md](./overview.md)
- [ci.md](./ci.md)
- [claude.md](../ai/claude.md)
