# GitHub Actions -- ワークフローコマンド

ワークフローコマンド（`::command::` 構文）と環境ファイル（`GITHUB_ENV` / `GITHUB_OUTPUT` 等）のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands

---

## 概要

アクションはランナーと通信し、環境変数の設定・出力値の受け渡し・デバッグメッセージの追加などを行える。多くのコマンドは特定形式の `echo`、一部は環境ファイルへの書き込みで実行する。コマンド名・パラメータ名は大文字小文字を区別しない。Command Prompt では二重引用符 `"` を省く。

```bash
echo "::workflow-command parameter1={data},parameter2={data}::{command value}"
```

```yaml
- name: Create annotation for build error
  run: echo "::error file=app.js,line=1::Missing semicolon"
```

---

## toolkit 関数との対応

| Toolkit function | Equivalent workflow command |
|---|---|
| `core.addPath` | 環境ファイル `GITHUB_PATH` |
| `core.debug` | `debug` |
| `core.notice` | `notice` |
| `core.error` | `error` |
| `core.endGroup` | `endgroup` |
| `core.exportVariable` | 環境ファイル `GITHUB_ENV` |
| `core.getInput` | 環境変数 `INPUT_{NAME}` |
| `core.getState` | 環境変数 `STATE_{NAME}` |
| `core.isDebug` | 環境変数 `RUNNER_DEBUG` |
| `core.summary` | 環境ファイル `GITHUB_STEP_SUMMARY` |
| `core.saveState` | 環境ファイル `GITHUB_STATE` |
| `core.setCommandEcho` | `echo` |
| `core.setFailed` | `::error` と `exit 1` のショートカット |
| `core.setOutput` | 環境ファイル `GITHUB_OUTPUT` |
| `core.setSecret` | `add-mask` |
| `core.startGroup` | `group` |
| `core.warning` | `warning` |

---

## コマンド一覧

### debug

```text
::debug::{message}
```

ログに表示するには `ACTIONS_STEP_DEBUG` シークレット（値 `true`）が必要。

### notice / warning / error

```text
::notice file={name},line={line},endLine={endLine},title={title}::{message}
::warning file={name},line={line},endLine={endLine},title={title}::{message}
::error file={name},line={line},endLine={endLine},title={title}::{message}
```

アノテーションを作成する。パラメータ:

| Parameter | Value | Required | Default |
|---|---|---|---|
| `title` | Custom title | No | None |
| `file` | Filename | No | `.github` |
| `col` | Column number, starting at 1 | No | None |
| `endColumn` | End column number | No | None |
| `line` | Line number, starting at 1 | No | `1` |
| `endLine` | End line number | No | `1` |

```bash
echo "::error file=app.js,line=1,col=5,endColumn=7,title=YOUR-TITLE::Missing semicolon"
```

### group / endgroup

```text
::group::{title}
::endgroup::
```

```yaml
run: |
  echo "::group::My title"
  echo "Inside group"
  echo "::endgroup::"
```

### add-mask

```text
::add-mask::{value}
```

値をログ上で `*` に置換する。1 ジョブにつき値ごとに 1 回実行する。マスクした値はシークレット扱いとなり、出力として設定できなくなる。出力・他コマンド使用の前に登録すること。

```bash
echo "::add-mask::Mona The Octocat"
```

- ジョブ内のみで使う場合: 生成 → `add-mask` → `GITHUB_OUTPUT` に書き込み。
- ジョブ / ワークフロー間でマスク済みシークレットを渡す場合: シークレットストア（例: Vault）に保存し、後続側で取得して再度 `add-mask` する。

### stop-commands

```text
::stop-commands::{endtoken}
::{endtoken}::
```

ワークフローコマンドの処理を停止し、同じトークンで再開する。トークンは実行ごとにランダムで一意にすること。

```bash
stopMarker=$(uuidgen)
echo "::stop-commands::$stopMarker"
echo '::warning:: This will NOT be rendered as a warning'
echo "::$stopMarker::"
```

---

## 環境ファイル

実行中にランナーが一時ファイルを生成し、パスは既定の環境変数で参照する。書き込みは UTF-8、複数コマンドは改行区切り。PowerShell 5.1 以下（`shell: powershell`）は UTF-8 が既定でないため `-Encoding utf8` を指定する。PowerShell Core 6+（`shell: pwsh`）は UTF-8 既定。

### GITHUB_ENV

```bash
echo "{environment_variable_name}={value}" >> "$GITHUB_ENV"
```

後続ステップで利用可能（設定したステップ自身は新しい値を参照できない）。`GITHUB_*` と `RUNNER_*` は上書き不可。`CI` は現状上書き可能だが保証されない。セキュリティ制限により `NODE_OPTIONS` は設定不可。環境変数は大文字小文字を区別するものとして扱う。

複数行の値:

```text
{name}<<{delimiter}
{value}
{delimiter}
```

```yaml
run: |
  {
    echo 'JSON_RESPONSE<<EOF'
    curl https://example.com
    echo EOF
  } >> "$GITHUB_ENV"
```

デリミタが値内の独立行に現れないこと。値が任意の場合はファイルに書く。

### GITHUB_OUTPUT

```bash
echo "{name}={value}" >> "$GITHUB_OUTPUT"
```

ステップに `id` が必要。複数行は `GITHUB_ENV` と同じデリミタ手法。

```yaml
- name: Set color
  id: color-selector
  run: echo "SELECTED_COLOR=green" >> "$GITHUB_OUTPUT"
- name: Get color
  env:
    SELECTED_COLOR: ${{ steps.color-selector.outputs.SELECTED_COLOR }}
  run: echo "The selected color is $SELECTED_COLOR"
```

### GITHUB_STEP_SUMMARY

```bash
echo "### Hello world! :rocket:" >> $GITHUB_STEP_SUMMARY
```

- GitHub flavored Markdown 対応。ステップごとに一意のファイルで、ジョブ終了時に全ステップ分が 1 つのジョブサマリーに集約される。複数ジョブは完了時刻順。
- `>>` で追記、`>`（PowerShell は `-Append` 無し）で上書き、ファイル削除（`rm $GITHUB_STEP_SUMMARY`）で削除。
- ステップ完了後にアップロードされ、後続ステップは変更不可。誤って含まれたシークレットは自動マスク。機微情報の削除はワークフロー実行自体の削除で行う。
- 制限: ステップあたり最大 1MiB（超過時はアップロード失敗しエラーアノテーション作成、ステップ / ジョブ結果には影響しない）。ジョブあたり表示は最大 20 サマリー。

### GITHUB_PATH

```bash
echo "$HOME/.local/bin" >> "$GITHUB_PATH"
```

`PATH` の先頭に追加し、現在のジョブの後続アクションで利用可能（実行中のアクションは不可）。

### GITHUB_STATE

`pre:` / `post:` アクションと値を共有する。`STATE_` 接頭辞の環境変数として保存され、書き込んだアクション内でのみ参照可能。アクション内でのみ利用できる。

```javascript
import * as fs from 'fs'
import * as os from 'os'

fs.appendFileSync(process.env.GITHUB_STATE, `processID=12345${os.EOL}`, {
  encoding: 'utf8'
})
```

`main` 側では `process.env.STATE_processID` で参照する。

### GITHUB_ARTIFACTS / GITHUB_ARTIFACTS_LIST

ワークフローアーティファクト（ファイルまたは OCI 参照）を 1 行 1 宣言で `GITHUB_ARTIFACTS` に書く。ステップごとに新規ファイル。空行と `#` 始まりの行は無視。

- ファイルパス: 相対（`GITHUB_WORKSPACE` 基準）または絶対、任意で `file://` 接頭辞。既存の通常ファイルのみ（ディレクトリ不可）。ベース名と SHA-256 ダイジェストを記録。
- OCI 参照: `REFERENCE@ALGORITHM:HEX`、任意で `oci://` 接頭辞。`ALGORITHM` は `sha256` / `sha384` / `sha512`、`HEX` は小文字フルダイジェスト（64 / 96 / 128 桁）。
- 制限: ステップごとのコマンドファイル 1MiB、ジョブあたり最大 500 アーティファクト。名前とダイジェストが同一なら重複排除、同名で異なるダイジェストはエラー。

```bash
echo "dist/my-binary" >> "$GITHUB_ARTIFACTS"
echo "oci://ghcr.io/octocat/myapp:1.0.0@sha256:914b38d45a65e4263a179d9c2b09cc04dcbcaa8257fa85100cf42f9a3b408cfb" >> "$GITHUB_ARTIFACTS"
```

`GITHUB_ARTIFACTS_LIST` は読み取り専用で、先行ステップが宣言したメタデータを集約した UTF-8 JSON（各ステップ完了後に更新、`name` 昇順）:

```json
{
  "version": 1,
  "subjects": [
    { "name": "my-binary", "digest": "sha256:abc123...", "kind": "file" },
    { "name": "ghcr.io/octocat/myapp:1.0.0", "digest": "sha256:a1b2c3d4...", "kind": "oci" }
  ]
}
```

`kind` は `file` または `oci`。

---

## Related

- [environment-variables.md](./environment-variables.md)
- [workflow-syntax.md](./workflow-syntax.md)
- [artifact-attestations.md](./artifact-attestations.md)
