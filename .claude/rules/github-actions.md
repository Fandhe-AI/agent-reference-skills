---
description: >
  GitHub Actions のキャッシュ方針。容量上限と課金の前提・導入前の効果測定・保存を main への
  push に限る・キー設計（ルートの lockfile だけをハッシュ）・サイズ・計測コマンド・PR
  チェックリストと、skills/ に lockfile を含めたときの利用側への影響を定める。
paths:
  - ".github/workflows/**"
  - "skills/**/*.lock"
  - "skills/**/*-lock.yaml"
  - "skills/**/*-lock.json"
---

# GitHub Actions 規約

## キャッシュ方針

ワークフローにキャッシュ（`actions/cache`、`actions/setup-node` / `actions/setup-python` の
`cache:` 入力など）を追加・変更・削除するときに従う。

### 現状（2026-10-11 時点）

- 現在 GitHub Actions のキャッシュは使っていない（0 件・0 B）。追加する場合はこの節に従う。
- `ci.yml` の `structure` / `skill-tests` は GitHub ホステッドの `ubuntu-latest` で動く。
  `skill-tests` は runner 同梱の Node で `node --test` を実行するだけで、依存のインストールも
  ルートの lockfile も無い。
- 呼び出している `Fandhe-AI/actions` の reusable workflow（`lint-docs.yml` / `ai-review.yml` /
  `update-external.yml`）も、確認時点（`Fandhe-AI/actions@3a41f93`）ではキャッシュを使っていない。
  `@latest` 参照のため変わり得る。

### 1. 前提（容量と課金）

- リポジトリあたりの上限は 10GB（Org 設定も 10GB）。超えると最終アクセスの古い順に追い出され、
  7 日間アクセスの無いものは削除される。
- Org の Actions 予算は $0 で、超過時は停止する。そのため 10GB を超える上限は使えない
  （上げると 10GB を超えた時点でキャッシュが読み取り専用になる）。上限・予算の変更はユーザーが
  判断する。エージェントは変更しない。

### 2. 入れる前に効果を測る

- キャッシュを足す・残す前に、ジョブログで効果を確かめる（依存のダウンロード件数〔pnpm の
  `downloaded` 等〕、依存の再ビルド数、復元にかかった秒数）。復元にかかる時間が節約できる時間を
  上回るなら入れない。
- self-hosted runner ではツールチェーンやパッケージストア・ビルド出力先がジョブをまたいで残る
  ことがあり、GitHub のキャッシュが無意味（復元時間だけかかる）な場合がある。本リポジトリの CI は
  現在 GitHub ホステッドだが、ジョブを self-hosted へ移すときは特に確かめる。実例: mirror-ui は
  pnpm キャッシュの復元に 1 ジョブ平均 75 秒かけていたが `downloaded 0` で効果ゼロだったため撤去
  した。team-hub は `Swatinem/rust-cache` が `./target` を保存対象にしていたが runner の
  `CARGO_TARGET_DIR` が別の場所で registry しか保存されておらず、後処理が共有 `CARGO_HOME` の
  crate も消していたため撤去した。

### 3. 保存は main（デフォルトブランチ）への push だけ

- PR から保存したキャッシュは `refs/pull/<N>/merge` スコープに入り、その PR からしか読めない。
  それでも上限は共有するため、main のキャッシュを追い出す。
- `actions/cache` は `actions/cache/restore`（全イベント）と `actions/cache/save` に分け、save 側を
  main への push に限る。action は既存ワークフローと同じく commit SHA で固定し、版をコメントに書く。

```yaml
- id: cache
  uses: actions/cache/restore@<SHA> # vX.Y.Z
  with:
    path: <path>
    key: <prefix>-${{ hashFiles('<ルートの lockfile>') }}
    restore-keys: <prefix>-
# ... 依存の導入・ビルド・テスト ...
- if: github.event_name == 'push' && github.ref == 'refs/heads/main' && steps.cache.outputs.cache-hit != 'true'
  uses: actions/cache/save@<SHA> # vX.Y.Z
  with:
    path: <path>
    key: ${{ steps.cache.outputs.cache-primary-key }}
```

- `setup-node` の `cache: npm` / `cache: pnpm`、`setup-python` の `cache: pip` などの一体型は
  PR でも保存する。使うなら PR で保存される前提で効果とサイズを見積もるか、restore / save の
  分割に置き換える。

### 4. キーの設計

- 中身のハッシュ（lockfile 等）をキーにし、`github.sha` / `github.run_id` など毎回変わる値は
  入れない。入れる場合は `restore-keys` の前方一致で直近を拾う設計にし、保存は main に限る。
- `hashFiles('**/package-lock.json')` / `hashFiles('**/Cargo.lock')` のような再帰 glob は使わず、
  ルートの lockfile（ビルド対象に本当に入るものだけ）を指定する。`.agents/skills/*/samples/**`
  などスキルのサンプル lockfile が混入し、依存が変わらないのにキーが変わって全キャッシュを
  作り直す事故が fandhe-browser・fandhe-frontend・fandhe-db・fandhe-container・
  template-frontend-react_router で起きた。本リポジトリも `.agents/skills/` に vendored スキルを
  持ち、さらに `skills/make/samples/projects/` 配下に配布用の lockfile があるため、再帰 glob は
  これらを拾う。
- ビルド成果物やインストール済みツールをキャッシュするなら、キーにツールチェーンの版（Node /
  Python の版、`rustc -vV` の commit-hash 等）を入れる。入れないと runner イメージ更新後も古い
  成果物に exact hit し続け、exact hit では再保存されないため毎回全再ビルドになる（fandhe-db で
  依存 135 crate を毎回再ビルドしていた）。
- `restore-keys` で前方一致を許し、キーが変わっても cold にならないようにする。ただし別の版の
  成果物を復元すると不整合になるものは完全一致だけにする。

### 5. サイズを抑える

- 1 世代の合計が 10GB に余裕をもって収まるようにする。キャッシュ種別を増やすときは
  1 件のサイズ × 種別 × OS を見積もる。
- 保存対象は依存・ツールに絞り、自リポジトリのビルド成果物や再生成が速いものは保存前に除く。

### 6. 追い出されても hit する設計

- 上限に達しても、毎回読まれる main の最新キャッシュは最後まで残る（最終アクセスの古い順に
  追い出されるため）。キー切替時に古い世代が追い出されても、新しい世代が保存済みならミスに
  ならない。この状態を保てていれば上限を上げる必要はない。

### 7. 計測コマンド

```bash
gh api repos/Fandhe-AI/agent-reference-skills/actions/cache/usage  # 件数・合計サイズ
gh cache list -R Fandhe-AI/agent-reference-skills -L 100  # key・サイズ・ref
```

- ジョブログでは `Cache restored from key:`（primary key と一致なら exact、それ以外は partial）・
  `Cache not found`・`Cache saved with key:` を見る。
- 不要になったキャッシュの削除は `gh cache delete <id>`。共有状態なので、対象の key・ref を
  確認してから消す。

### 8. PR チェックリスト

ワークフローにキャッシュを追加・変更する PR では、次を確認したことを PR 本文に書く。

- [ ] 効果をジョブログで測った（2）
- [ ] 保存は main への push だけ（3）
- [ ] キーは中身のハッシュで、再帰 glob・毎回変わる値を含まない。成果物ならツールチェーンの版を含む（4）
- [ ] 1 世代の合計サイズを見積もった（5）

### 配布物の lockfile と利用側への影響

- `skills/` 配下は利用側リポジトリへ `.agents/skills/` 等として取り込まれる。配布物に lockfile
  （`Cargo.lock` / `pnpm-lock.yaml` / `package-lock.json` 等）を含める・変更すると、利用側の
  `hashFiles('**/…lock…')` のような再帰 glob に混入し、利用側の依存が変わらなくてもキャッシュ
  キーが変わる（2026-10-11 に agent-reference-skills の make スキルのサンプル `Cargo.lock` /
  `pnpm-lock.yaml` で実際に発生）。利用側はルートの lockfile だけをハッシュすべきである（4 と同じ）。
- 配布物に lockfile を追加・変更する PR では、利用側のキャッシュキーが変わり得ることを PR 本文に
  書く。2026-10-11 時点で本リポジトリの `skills/` 配下にある lockfile は make スキルのサンプル
  （`skills/make/samples/projects/{mixed,rust-crate,rust-workspace-xtask}/Cargo.lock`、
  `skills/make/samples/projects/{mixed,node-pnpm}/pnpm-lock.yaml`）で、上記の事例の原因になった。
- `references/`・`samples/` に収録している CI 例のキャッシュ設定（`nextjs-app` の
  `hashFiles('**/package-lock.json')`、`biome`・`commitlint` の `cache: npm`、`turborepo` の
  `actions/cache` 等）は上流ドキュメントに沿った例で、この節の方針（保存を main への push に限る・
  ルートの lockfile だけをハッシュ）は反映していない。利用側へ勧めるときはこの節に読み替える。
