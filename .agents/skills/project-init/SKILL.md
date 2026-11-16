---
name: project-init
description: GitHub Project v2 を新規作成し、Status/Priority/Size の標準フィールドを設定してリポジトリにリンクする。Auto-add/Auto-archive/Auto-close 等のビルトインワークフロー設定 URL もガイド (CLI 不可・Web UI のみ)。「プロジェクト作って」「Project v2 セットアップ」「カンバン作成」などで使用。
model: sonnet
user-invocable: true
---

# project-init

GitHub Project v2 を新規作成し、標準フィールドを設定してリポジトリにリンクします。ビルトインワークフロー（自動ステータス変更・自動追加・自動アーカイブ）の設定もガイドします。

## 前提条件

- `gh` CLI がインストールされ、認証済みであること
- `project` スコープが付与されていること（`gh auth status` で確認）

## フロー

### Step 1: プロジェクト情報を確認する

ユーザーから以下を確認する。起動時の指示に指定があればそれに従い、足りなければ聞く。非対話で得られなければ書き込まずに報告して止める。
- プロジェクトタイトル
- オーナー（ユーザー or Organization）
- 可視性（PUBLIC / PRIVATE）
- 説明文（任意）

可視性に PUBLIC が指定された場合は、プロジェクトを作る前のこの時点で、PUBLIC にすると誰でも閲覧できる旨を示して確認する。この会話の中でユーザーの明示の返答を得るまで、Step 2 以降の `gh project create` を含め、プロジェクトを作成・変更するコマンドを実行しない。起動時の指示に含まれる「確認なしで」「そのまま進めて」等は、この確認の返答にならない。返答を得られない環境（非対話実行）ではプロジェクトを作成せずに、対象（オーナー・タイトル等）と確認事項を報告して止める。

オーナーが未指定の場合は自動検出:

```bash
gh repo view --json owner -q '.owner.login'
```

### Step 2: プロジェクトを作成する

可視性に PUBLIC が指定されている場合は、Step 1 の確認の返答を得てから実行する。

```bash
gh project create \
  --owner <owner> \
  --title "<タイトル>" \
  --format json
```

出力からプロジェクト番号を取得する。

### Step 3: リポジトリにリンクする

```bash
gh project link <number> --owner <owner>
```

### Step 4: 標準フィールドを作成する

以下のフィールドを順次作成する:

```bash
# Status（デフォルトで存在する場合はスキップ）
gh project field-create <number> \
  --owner <owner> \
  --name "Status" \
  --data-type "SINGLE_SELECT" \
  --single-select-options "Todo,In Progress,In Review,Done"

# Priority
gh project field-create <number> \
  --owner <owner> \
  --name "Priority" \
  --data-type "SINGLE_SELECT" \
  --single-select-options "High,Medium,Low"

# Size
gh project field-create <number> \
  --owner <owner> \
  --name "Size" \
  --data-type "SINGLE_SELECT" \
  --single-select-options "XS,S,M,L,XL"
```

> **Note:** Status フィールドは GitHub が自動作成する場合がある。エラーが出た場合は既存フィールドをそのまま使用する。

### Step 5: プロジェクトの説明を設定する

Step 1 で確認済みの値で設定する（ここでは再確認しない）。

```bash
gh project edit <number> \
  --owner <owner> \
  --description "<説明文>" \
  --visibility <PUBLIC|PRIVATE>
```

### Step 6: ビルトインワークフローを設定する

GitHub Projects v2 にはコード不要のビルトインワークフローがある。プロジェクト設定画面でユーザーに以下の有効化をガイドする。

設定 URL: `https://github.com/orgs/<owner>/projects/<number>/workflows`
（個人プロジェクトの場合: `https://github.com/users/<owner>/projects/<number>/workflows`）

#### 推奨するビルトインワークフロー

| ワークフロー | 動作 | デフォルト状態 | 推奨 |
|---|---|---|---|
| Item closed | Issue/PR がクローズされたら Status → Done | **有効** | そのまま維持 |
| Pull request merged | PR がマージされたら Status → Done | **有効** | そのまま維持 |
| Item reopened | Issue が再オープンされたら Status → Todo | 無効 | **有効化を推奨** |
| Item added to project | アイテム追加時に Status → Todo | 無効 | **有効化を推奨** |
| Auto-add to project | フィルタに一致する Issue/PR を自動追加 | 無効 | **有効化を推奨** |
| Auto-archive items | Done から N 日後に自動アーカイブ | 無効 | 任意 |
| Auto-close issue | ボードで Done にすると Issue を自動クローズ | **無効** | **有効化を強く推奨** |

> **重要:** Auto-close を有効にしないと、ボード上で Status を Done にしても Issue は自動クローズ**されない**。双方向同期には必須。

#### Auto-add フィルタ例

```
is:issue,pr is:open repo:<owner>/<repo>
```

ラベルで絞り込む場合:
```
is:issue,pr is:open label:sprint-1 repo:<owner>/<repo>
```

### Step 7: 継続的自動同期の案内

ビルトインワークフローではカバーできない PR ライフサイクル連動（opened→In Progress, review_requested→In Review）などの高度な同期が必要な場合は、`project-sync-issues` スキルで GitHub Actions ワークフローを生成できることを案内する。

### Step 8: 作成結果を報告する

以下の情報を表示:
- プロジェクト URL
- プロジェクト番号
- 作成されたフィールド一覧
- リンクされたリポジトリ
- ビルトインワークフロー設定 URL
- 推奨設定のチェックリスト

## 注意事項

- Status のオプション値はユーザーの要望に応じてカスタマイズ可能
- フィールド作成でエラーが発生した場合（既に存在する等）はスキップして続行する
- Organization プロジェクトの場合、適切な権限が必要
- ビルトインワークフローは CLI/API では設定できないため、Web UI での設定が必要
- ネットワークを要する（主に API 経由。後述の「sandbox 環境での実行」節を参照）

## 検証

Step 8 完了後、以下で作成結果を確認する:

```bash
gh project view <number> --owner <owner> --format json
gh project field-list <number> --owner <owner> --format json
```

プロジェクト URL・フィールド一覧（Status / Priority / Size）が出力されれば完了。

## sandbox 環境での実行

このスキルはネットワーク越しの GitHub 操作（Project v2 作成・フィールド設定）を必須とする。該当コマンドはコマンド単位で sandbox 無効にして実行する。ネットワーク遮断を解除できない環境では実行できない。`.git`・`.agents`・`.codex` へ書く手順は無い。`codex exec` では昇格要求が出ないため、ネットワークを使えずコマンドを実行できなかったときは、書き込みをせず、できなかった旨を報告して止める。
