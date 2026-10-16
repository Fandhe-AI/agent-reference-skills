# 宣言的スキーマ管理

## Signature / Usage

宣言的スキーマ管理では、データベースの「あるべき姿」を SQL ファイルで定義し、migration history との差分からマイグレーションを自動生成する。従来の命令的マイグレーション（CREATE TABLE, ALTER TABLE 等を手動で記述）とは異なるアプローチ。

schema ファイルが source of truth であり、変更は常にファイル編集で行う（Studio / SQL エディタ / `psql` での直接変更は差分に現れない）。migration は `supabase db schema declarative sync` で生成する。`sync` は schema ファイルを migration history と比較し、live DB は読まない。

## diff エンジンの選択

| 項目 | pg-delta | legacy migra |
| --- | --- | --- |
| 選択条件 | `config.toml` に `[experimental.pgdelta]` セクションと `enabled = true` | セクションが無い、または `enabled = false` |
| 既定 | 最近の `supabase init` で作成したプロジェクト | 既存プロジェクト（opt-in するまで migra） |
| migration 生成 | `supabase db schema declarative sync` | `supabase db diff`（ローカルスタックを停止して実行） |
| DB から宣言ファイルへ export | `supabase db schema declarative generate` | 無し（`db dump` を手動分割） |
| ファイル順序 | 依存関係から自動 | 辞書順（`[db.migrations].schema_paths` で上書き） |

```toml
# supabase/config.toml
[experimental.pgdelta]
enabled = true
```

- `db schema declarative` コマンドは pg-delta 必須（legacy では実行不可）。`config.toml` を変えずに 1 回だけ実行するには `--experimental` を付ける
- `db pull --declarative` は `[experimental.pgdelta]` の設定に関係なく実行されるが、pg-delta でのみ使うこと

## pg-delta でのワークフロー

### スキーマの宣言

```sql
-- supabase/schemas/employees.sql
create table "employees" (
  "id" integer not null,
  "name" text
);
```

```bash
# --no-apply: ファイルだけ書き、次の手順で適用する
supabase db schema declarative sync -f create_employees_table --no-apply
supabase start
supabase migration up
```

- `--no-apply` なしではローカル DB への適用を確認される。`--apply` とグローバル `--yes` は確認なしで適用する。非対話実行はファイルを書いて適用をスキップする

### スキーマの更新

1. `supabase/schemas/employees.sql` を編集する（views / enums は列順に依存するため、列はテーブル末尾に追加する）
2. `supabase db schema declarative sync -f add_age --no-apply` で migration を生成する
3. 生成された migration が単一の増分変更であることを確認する
4. `supabase migration up` で適用する

```sql
-- supabase/migrations/<timestamp>_add_age.sql
alter table "public"."employees" add column "age" smallint not null;
```

### 本番スキーマの取り込み

```bash
supabase db schema declarative generate --linked
```

- `supabase/schemas/`（または `experimental.pgdelta.declarative_schema_path`）に schema ごとのオブジェクト別 SQL ファイルを書く
- スクリプトでは対象（`--local` / `--linked` / `--db-url`）を明示し、既存ツリーを確認なしで置き換えるには `--overwrite` を付ける
- 後からリモート DB でツリーを更新するには `supabase db pull --declarative`（migration は作らず migration history にも触れない）
- migration が無いプロジェクトでは、最初の `sync` の前に `supabase db pull` で baseline migration を作る。無いと最初の `sync` が全スキーマを 1 つの migration として再生成し、`db push` で失敗し得る
- CLI 2.115.0 より前は宣言ツリーを `supabase/database` に書いていた。2.115.0 以降は `supabase/schemas` を読む。`./database` を使い続けるには `[experimental.pgdelta]` に `declarative_schema_path = "./database"` を設定する

### ディレクトリ構成

- `generate` が作るのは schema ごとのディレクトリ（例: `supabase/schemas/public/tables/employees.sql`）
- cluster レベルのオブジェクト（roles など）は予約ディレクトリ `_cluster/`
- エンジンが追跡しないオブジェクトの手書き SQL は予約ディレクトリ `_custom/`（`generate` は作成せず、存在しても書き込み・prune しない）
- ファイル名とディレクトリ構成は可読性のためだけで、依存関係（外部キー、view、trigger の関数など）はエンジンが解析して自動で順序付ける。依存サイクルがあると診断を出して失敗する
- pg-delta では `[db.migrations].schema_paths` はファイル順序を制御しない（設定に paths があると CLI が警告する）

### 依存関係の例

```sql
create table "employees" (
  "id" integer not null,
  "name" text,
  "age" smallint not null
);

create view "profiles" as
  select id, name from "employees";

create function "get_age"(employee_id integer) RETURNS smallint
  LANGUAGE "sql"
AS $$
  select age
  from employees
  where id = employee_id;
$$;
```

### ロールバック

```bash
supabase db reset --version 20241005112233
```

- デプロイ済みの migration はリセットしない。デプロイ済みを戻す場合は schema ファイルを元に戻して down migration を新しく生成する（down migration は破壊的なことが多く、必ずレビューする）

### デプロイ

```bash
supabase login
supabase link
supabase db push
```

## Known caveats

pg-delta は tables / views / materialized views / functions / triggers / RLS policies / grants / comments / domains / partitions / publications などを扱うが、捕捉できないケースがある。生成された migration は必ずレビューする。

- DML: `insert` / `update` / `delete` は差分に載らない（`storage.buckets` の行も含む）。schema ファイル内の DML はエラー。データ変更は seed ファイルか手書きの versioned migration に置く
- Default privileges: 新規オブジェクトの migration に書いていない `GRANT` / `REVOKE` が含まれ得る。権限をカスタマイズしていなければ削除してよい
- 追跡されないオブジェクト種別: casts / operators / operator classes・families / text search configurations・dictionaries・parsers・templates / statistics objects / languages / transforms / parameter ACLs。黙って落とされず警告になり、`--strict-coverage` で失敗に変えられる（CI 向け）。SQL は `supabase/schemas/_custom/` に置き、変更自体は versioned migration で配布する（parameter ACLs は `_custom/` に置かず versioned migration のみ）
- Supabase 管理スキーマ: `auth` / `storage` などのプラットフォームオブジェクトは差分から除外される。管理テーブル上の trigger（関数が管理スキーマ外にあるもの）、`auth` 内の任意テーブルの RLS ポリシー、`storage.objects` / `storage.buckets` / `realtime.messages` の RLS ポリシーは捕捉される。それ以外のオブジェクトは versioned migration で管理する
- 拡張機能管理オブジェクト: 拡張が所有するオブジェクトは差分から除外され、`pg_partman` のパーティションや `pgmq` のキューなどは拡張の API 呼び出しとして表現される（破壊的として CLI が警告）
- pg_cron ジョブ: 名前付きジョブは拡張設定として追跡される。migration は `select cron.schedule_in_database(...)` / `select cron.unschedule(...)` を使う。`supabase/schemas/` に `select cron.schedule('<name>', ...)` で宣言し、ジョブ名は一意にする（`jobname` 無し・重複は警告してスキップ）
- 既存の schema ツリーの取り込み: `pg_net` を migration が呼ぶ場合は `config.toml` に `[experimental.webhooks]` と `enabled = true` を先に追加する。schema ファイルが依存する拡張は宣言する

## Legacy migra engine

`[experimental.pgdelta]` を有効にしていないプロジェクトでも宣言的スキーマは使えるが、コマンドが異なり `db schema declarative` は使えない。

### migration の生成

legacy では `supabase db diff` が宣言ファイルを読む。`supabase/schemas/` にファイルがあると live DB ではなく migrations と比較する。ローカルスタックを停止して生成する。

```bash
supabase stop
supabase db diff -f add_age
supabase start
supabase migration up
```

### ファイル順序

legacy は schema ファイルを辞書順で適用する。順序を制御するには `config.toml` の `[db.migrations].schema_paths` に列挙する。

```toml
[db.migrations]
schema_paths = [
  "./schemas/employees.sql",
  "./schemas/*.sql",
]
```

### 既存 DB からの開始

```bash
supabase db dump > supabase/schemas/prod.sql
```

### 制限

migra エンジンは view の owner・grants、view の security invoker、materialized view の index 復元、alter policy、column privileges、comments、roles、`alter publication ... add table`、`create domain` を扱えない。これらは versioned migration で追加する。

### pg-delta への切り替え

1. `config.toml` に `[experimental.pgdelta]` と `enabled = true` を追加する
2. 宣言的スキーマを使っているなら `[db.migrations].schema_paths` を削除する
3. `supabase db pull` を 1 回実行して catch-up migration を作る
4. スクリプト・CI の `db diff` を `db schema declarative sync` に置き換える（`supabase stop` は不要になる）
5. `supabase db reset` で migration 全体を検証する

## Notes

- 宣言的スキーマと命令的マイグレーションは併用可能
- 破壊的変更（カラム削除等）は差分に含まれるため、生成された migration を必ず確認する
- schema ファイルは「最新のあるべき姿」を反映し続ける
- Warning: pg-delta では `supabase db diff` は live DB を migrations と比較するだけで、`supabase/schemas/` を baseline に使わない。schema ファイルがある状態で `db diff -f` を実行すると CLI は無視した旨を表示し、migrations が空または古いと schema ファイルが既に宣言しているオブジェクトまで含む migration を書き得る。schema ファイルから migration を作るには `db schema declarative sync` を使う
- Legacy migra で `db pull --declarative` を実行しない（`[db.migrations].schema_paths` が書き換えられ、次回の `db diff` が依存順を解決できず失敗する）。実行済みなら pg-delta に切り替えるか、書き出されたファイルの削除と `schema_paths` の復元で戻す
- 旧版のこのページは `supabase db diff` を宣言的ワークフローの中心にしていた。現行の公式ガイドは pg-delta 前提の `db schema declarative sync` が中心
- 出典: Declarative database schemas ガイド / Diff engines ガイド（取得日 2026-10-17）。pg-delta は `[experimental.pgdelta]` 名前空間で提供され pre-1.0

## Related

- [CLI db コマンド](../cli/db-commands.md) — db schema declarative sync / generate、db diff
- [CLI migration コマンド](../cli/migration-commands.md) — マイグレーション管理
- [マイグレーション戦略](../deployment/database-migrations.md) — マイグレーション運用
- [diff エンジン](./diff-engines.md) — pg-delta と migra の違い
