# Database Triggers

PostgreSQL トリガーを使ったテーブルイベントへの自動応答。

## 概要

トリガーは INSERT / UPDATE / DELETE / TRUNCATE などのテーブルイベントに対して自動的に SQL アクションを実行する仕組み。トリガー関数（PL/pgSQL 関数）とトリガーオブジェクトの2つで構成される。

## トリガーの種類

| 種別 | 実行タイミング | 主な用途 |
|------|-------------|---------|
| **BEFORE** | イベント発生前 | バリデーション、データ加工 |
| **AFTER** | イベント発生後 | ログ記録、関連テーブル更新 |

## 実行頻度

| オプション | 説明 |
|-----------|------|
| `FOR EACH ROW` | 影響を受ける行ごとに1回実行 |
| `FOR EACH STATEMENT` | SQL 文全体で1回実行（複数行更新でも1回） |

## トリガー関数内で利用できる変数

| 変数 | 説明 |
|------|------|
| `NEW` | INSERT / UPDATE 後の行データ |
| `OLD` | UPDATE / DELETE 前の行データ |
| `TG_OP` | 操作の種別（`INSERT` / `UPDATE` / `DELETE` / `TRUNCATE`） |
| `TG_NAME` | トリガー名 |
| `TG_WHEN` | 実行タイミング（`BEFORE` / `AFTER`） |
| `TG_LEVEL` | 実行レベル（`ROW` / `STATEMENT`） |
| `TG_TABLE_NAME` | 対象テーブル名 |
| `TG_TABLE_SCHEMA` | 対象スキーマ名 |
| `TG_ARGV` / `TG_NARGS` | トリガー作成時に渡した引数 |

## コード例

```sql
-- ============================================================
-- 基本例: 給与変更ログ
-- ============================================================

-- 1. トリガー関数を作成
create or replace function update_salary_log()
returns trigger
language plpgsql
as $$
begin
  insert into salary_log(employee_id, old_salary, new_salary, changed_at)
  values (new.id, old.salary, new.salary, now());
  return new;
end;
$$;

-- 2. トリガーを作成
create trigger salary_update_trigger
after update on employees
for each row
execute function update_salary_log();

-- ============================================================
-- BEFORE トリガー: タイムスタンプ自動更新
-- ============================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at
before update on public.todos
for each row
execute function set_updated_at();

-- ============================================================
-- 複数イベント対応 (TG_OP で分岐)
-- ============================================================

create or replace function audit_log()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    insert into audit(table_name, operation, new_data)
    values (tg_table_name, tg_op, row_to_json(new));
  elsif tg_op = 'UPDATE' then
    insert into audit(table_name, operation, old_data, new_data)
    values (tg_table_name, tg_op, row_to_json(old), row_to_json(new));
  elsif tg_op = 'DELETE' then
    insert into audit(table_name, operation, old_data)
    values (tg_table_name, tg_op, row_to_json(old));
  end if;
  return coalesce(new, old);
end;
$$;

create trigger audit_trigger
after insert or update or delete on public.orders
for each row
execute function audit_log();

-- ============================================================
-- トリガーの削除
-- ============================================================

drop trigger if exists salary_update_trigger on employees;

-- トリガー関数もまとめて削除（CASCADE）
drop function if exists update_salary_log() cascade;
```

## 注意点

- BEFORE トリガーは `new` / `old` を変更して返すことでデータを加工できる。AFTER トリガーの戻り値は無視される
- `FOR EACH STATEMENT` トリガーでは `NEW` / `OLD` が利用できない
- トリガーが増えると DML パフォーマンスに影響が出る場合がある
- RLS が有効なテーブルでも、トリガー関数はデフォルトでは RLS をバイパスする（`SECURITY DEFINER` vs `SECURITY INVOKER`）
- Database Webhooks はトリガーの高水準ラッパーとして利用可能

## 関連

- [./webhooks.md](./webhooks.md) — Database Webhooks
- [./functions.md](./functions.md) — Database Functions (RPC)
- [./tables.md](./tables.md) — テーブル操作
