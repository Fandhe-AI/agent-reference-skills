# CLI

Rive CLI (`rive`) のインストール・プロジェクト作成・プレビュー・ビルド・キャプチャ・Rive アカウント連携のコマンド集。対応環境は Apple Silicon の macOS・Linux x86_64・Windows。

## Homebrew でのインストール

```sh
brew install --cask rive-app/tap/rive-cli
```

`rive update` / `rive switch` / `rive uninstall` は `~/.rive` 配下のインストーラー版が前提のため、Homebrew 版では動作しない。管理は `brew upgrade` と `brew uninstall --cask rive-cli` で行う。

## インストーラーでのインストール (macOS / Linux)

> **警告**: リモートのスクリプトを実行する。ダウンロードしたスクリプトの内容を確認したうえで、使い捨て環境でのみ実行する。

公式ドキュメントはインストーラーを pipe-to-shell で実行する形だが、ここではダウンロード → 内容確認 → 実行の 3 段に分ける。

```sh
curl -fsSL https://releases.rive.app/cli/install.sh -o rive-install.sh
less rive-install.sh
sh rive-install.sh
```

`rive` コマンドを使えるよう `PATH` に追加し、現在のシェルへ反映する。

```sh
echo 'export PATH="$HOME/.rive/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## Windows でのインストール

> **警告**: リモートのスクリプトを実行する。ダウンロードしたスクリプトの内容を確認したうえで、使い捨て環境でのみ実行する。

公式ドキュメントは pipe-to-shell 形式だが、ここではダウンロード → 内容確認 → 実行の 3 段に分ける。

```powershell
Invoke-WebRequest https://releases.rive.app/cli/install.ps1 -OutFile rive-install.ps1
Get-Content .\rive-install.ps1
powershell -ExecutionPolicy Bypass -File .\rive-install.ps1
```

## 環境の確認

```sh
rive --help
rive --version
rive doctor
```

`doctor` は `version` / `update` / `auth` / `live-link` / `project` の 5 チェックを `ok` / `warn` / `fail` で表示する。fail が 1 つでもあれば終了コード 1。機械可読な出力は `rive doctor [project-dir] --format=json`。

## プロジェクトの作成

```sh
rive create myproject
```

`rive.yaml` / `scene.rml` / `AGENTS.md` / `CLAUDE.md` / `.gitignore` を生成する。引数なしならプロンプトで名前を入力、`rive create <dir>` で `<dir>` に作成（`.` はカレントディレクトリ）。

## Rive アカウントのファイルから作成

```sh
rive create myproject --from-remote-file        # 一覧から選択
rive create myproject --from-remote-file=512    # file id を指定
rive myproject
```

`rive login` 済みのセッションが必要。`rive.yaml` にリンクが記録され、`rive push` / `rive pull` で同期できる。

## .rev ファイルから作成

```sh
rive create myproject --from-rev=myfile.rev
rive myproject
```

ログイン不要。ディレクトリは空または新規であること。名前を省略すると `.rev` の名前が使われる（`myfile.rev` は `myfile/`）。

## プレビューウィンドウの起動

```sh
rive myproject
```

ウィンドウを開き、ディレクトリを監視して保存のたびに再ビルドする。出力は `myproject/build/myproject.riv`。ディレクトリ省略時は `.`。

## ビルドモード

```sh
rive myproject --verify     # .riv を書かずに検証。エラーは終了コード 1
rive myproject --once       # 署名なし .riv を書き出す。エラーは終了コード 1
rive myproject --publish    # 署名付き .riv を書き出す。rive login が必要
rive myproject --test       # Tests スクリプトを実行。失敗は終了コード 6
```

4 モードは排他。`--screenshot` も 1 モードとして数える。

> **警告**: `--publish` は透かし (watermark) が入る場合がある。クリーンな `.riv` には、プロジェクトが Rive アカウントのファイルに紐付いていること、かつそのファイルが Cadet プラン以上のワークスペースにあることが必要。スクリプトを含み Web 向けの `.riv` は `--publish` でビルドする（署名なしスクリプトは CDN と Web ランタイムに拒否される）。

## ビルド修飾フラグ

```sh
rive myproject --once --init            # rive.yaml が無ければ作成して続行
rive myproject --once --rev=out.rev     # エディター用 .rev も書き出す（rive login が必要）
```

`--rev` は `--once` / `--publish` と併用可。`--verify` / `--test` / `--screenshot` とは併用不可。

## ヘッドレスのキャプチャ

```sh
rive myproject --screenshot=out.png                      # アニメーション前の静止状態
rive myproject --screenshot=out.png --advance=1s         # 1 秒後
rive myproject --screenshot=out.png --viewport=390x844   # サイズ指定
```

ログイン不要で CI 向き。パスはプロジェクトではなくカレントディレクトリ基準で解決され、存在しないディレクトリは失敗する。`--advance` なしは state machine 実行前の静止状態のため、`--advance=1` から始める。

## 入力のシミュレーション

```sh
rive myproject --screenshot=full.png --data=battery/level=100
rive myproject --screenshot=on.png --pointer=click@120,60 --advance=20
rive myproject --screenshot=out.png --key=tab:down+shift
rive myproject --screenshot=scrolled.png --pointer='drag@200,300>200,80:12'
```

`--data` / `--pointer` / `--advance` / `--key` は繰り返し指定でき、書いた順に実行される。`--pointer` と `--advance` は `--screenshot` が必要。ただし `--data-dump` もウィンドウなしでビルド・実行され、公式例では `--screenshot` なしで `--advance` と併用している（次節）。`drag` の値は `>` がリダイレクトと解釈されないよう引用符で囲む。存在しない `--data` パスは警告のみで無視される。

## データの読み出し

```sh
rive myproject --data-dump=- --advance=60
```

`--data-dump` はビルドしてウィンドウなしで実行し、バインドされた view model の値を JSON で出力する。上記の公式例は `--screenshot` なしで `--advance` を使う。`--data-dump-filter=<paths>`（glob 可）で絞り込み、`--data-dump-every=<N|Ns|Nms>` でサンプリング間隔を指定できる。

## 表示の制御

```sh
rive myproject --artboard=<name> --fit=contain
rive myproject --screenshot=wide.png   --viewport=900x600
rive myproject --screenshot=narrow.png --viewport=320x700
```

`--fit` は `fill` / `contain` / `cover` / `fit-width` / `fit-height` / `none` / `scale-down` / `layout`（既定）。

## ベンチマーク

```sh
rive myproject --bench=600
```

ウィンドウなしで指定フレーム数を計測し、advance / render の統計と WASM メモリ増加量を報告する。`--verify` / `--once` / `--publish` / `--test` / `--screenshot` とは併用不可。

## 開発サーバー

```sh
rive myproject --serve          # 接続中のプレーヤーへビルドを push（既定ポート 9640）
rive myproject --serve=9640 --headless-serve
```

`--headless-serve` はローカルウィンドウなしで配信し、ポートは `--serve=<port>` から取る。

## その他のフラグ

```sh
rive myproject --once --quiet
rive myproject --once --optimize
rive myproject --once --immediate
rive myproject --verify --format=json
```

`--quiet` はコンパイラーエラーを含むターミナルログを全て抑止する。`--optimize` は Luau を O2 でコンパイルする。`--immediate` はメインスレッドで描画する。

## JSON 出力 (CI)

```sh
rive myproject --verify --format=json
rive myproject --test --format=json
```

`--format=json`（エイリアス `--json`）は `--once` / `--verify` / `--publish` / `--test` と併用し、stdout に JSON オブジェクト 1 つを出力する。ログは stderr。`command` は `build` / `verify` / `publish` / `test`、`data.problems` の各要素は `{severity, kind, code, script, line, column, message}`。

## 型・ドキュメント・サンプルの参照

```sh
rive schema <Type>              # 型のプロパティ（継承分を含む）
rive schema --search <text>     # 型・プロパティを名前で検索
rive schema <Type> --animatable # キー可能なプロパティのみ（--bindable / --all / --json / --list もあり）

rive docs                       # ドキュメント索引
rive docs <topic>               # 例: layout, luau/protocols
rive docs --search <text>
rive docs --path

rive samples                    # 選択してコピー
rive samples --path             # サンプルのディレクトリを表示
cp -R "$(rive samples --path)/rml_triangle" myproject
```

ピッカーが描画できない環境（CI 等）では `rive samples` が一覧と `cp` 行を出力する。

## シーンの検査

```sh
rive inspect [dir]              # 解決済みシーンを JSON で出力
rive inspect --summary
rive inspect --artboard=<name>
```

`problems` にエラーがある場合、または `rive.yaml` が無い場合は終了コード 1。

## ログイン・ログアウト

```sh
rive login
rive whoami
rive logout
```

`--publish` / `--rev` / `push` / `pull` / `create --from-remote-file` に必要。`whoami` は未ログインで終了コード 3、Rive に到達できない場合は 7。認証情報は macOS / Linux では `~/.config/rive/app.rive.cli/`（`XDG_CONFIG_HOME` を尊重）、Windows では Windows Credential Manager に保存される。

## Rive ファイルへの push

> **警告**: push は権威的に内容を置き換える。Editor で同じファイルを開いている相手には内容の入れ替わりが即時に見え、pushed 内容への Editor 側の変更は上書きされる。以前の内容はリビジョン履歴から復元できる。

```sh
rive push [dir]
rive push --list                          # プロジェクトと id の一覧（ビルドしない）
rive push --project=<id>                  # 初回 push の送り先プロジェクト
rive push --name="before the terrain rewrite"
```

初回 push で `rive.yaml` に `push.projectId` / `push.fileId` が記録される。`--optimize` / `--quiet` も指定可。変更が無い場合は `already up to date` と表示され、リビジョンは追加されない。

## Rive ファイルからの pull

> **警告**: `pull` はローカルのシーン・スクリプト・アセットをリモートファイルの内容で上書きする。実行前に確認プロンプト（既定は no）が出る。

```sh
rive pull [dir]
rive pull --yes     # 確認をスキップ（CI など端末の無い環境では必須）
rive pull --quiet
```

`rive.yaml` はリモートの main artboard とビルド設定を取り込み、他の行は保持される。`AGENTS.md` / `CLAUDE.md` や追加ファイルは変更されない。

## CLI の更新・切り替え・削除

```sh
rive update
rive switch
rive uninstall
rive analytics          # on | off を表示・設定
```

`update` / `switch` / `uninstall` はインストーラー版（`~/.rive/bin`）のみ対応。Homebrew 版は `brew upgrade` / `brew uninstall --cask rive-cli`。

## 終了コード

| Code | Meaning |
| --- | --- |
| `0` | OK |
| `1` | ビルドエラー、またはより具体的なコードの無い失敗 |
| `2` | 不正なフラグ（`--pointer` / `--data` / `--advance` / `--viewport` の値、廃止された `--frame`、`json` / `human` 以外の `--format`、ビルドモード無しの `--format=json`、ビルドモードの重複 など） |
| `3` | 未ログイン、またはセッションが拒否された |
| `6` | テスト失敗（ビルド自体は成功） |
| `7` | サービスに到達できない（リトライ可能） |

`--` で始まらない引数はすべてプロジェクトディレクトリとして読まれ、複数渡した場合は最も右のものがビルドされる（警告なし）。

## 環境変数

| Variable | Overrides |
| --- | --- |
| `RIVE_API_BASE` | API ホスト。カスタムホストは専用のログインを持つ |
| `RIVE_NO_TUI` | `0` 以外でインタラクティブピッカーを無効化 |
| `TERM` | 未設定・空・`dumb` でピッカーを無効化 |
| `NO_COLOR` | ピッカーを色なしで描画 |
| `RIVE_HOME` | CLI のインストール・状態のルート（既定 `~/.rive`） |
| `XDG_CONFIG_HOME` | macOS / Linux の認証情報ディレクトリの場所 |
| `RIVE_DOCS_DIR` | `rive docs` が読むディレクトリ |
| `RIVE_SAMPLES_DIR` | `rive samples` のコピー元ディレクトリ |
| `RIVE_ANALYTICS` | 分析の同意を強制（`on`/`1`/`true`/`yes` または `off`/`0`/`false`/`no`） |

```sh
RIVE_NO_TUI=1 rive samples
```

Source: https://rive.app/docs/cli/getting-started, https://rive.app/docs/cli/reference/commands, https://rive.app/docs/cli/reference/project-config, https://rive.app/docs/cli/examples (fetched 2026-10)
