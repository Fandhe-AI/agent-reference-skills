---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/row_codec.rs
---

# row_codec

カタログスキーマ駆動の行エンコーダー（TASK-86、対象ビヘイビア: TABLE-7）。`catalog.rs` の `TableSchema` を入力に取り、その列定義（列順・型・nullable）に従って行データをバイト列へ/から変換する。`storage.rs` の行フォーマット v2（`encode_row`/`decode_row`、tenant_id・visibility 同居の RLS 行フォーマット）は変更・置き換えせず、独立したバイトレイアウト（本モジュールローカルな v1）を持つ次世代コーデックとして追加されている。`Storage` の行テーブルへの統合は後続タスク（TASK-87・TASK-89・TASK-90 系）の管轄。

## Signature / Usage

```rust,ignore
/// 行エンコーダー層の公開エラー型。catalog.rs/storage.rs と同じ流儀で、欠落・
/// 上限超過・未知値・型不一致・切り詰め検出をすべて Invalid に集約する
/// （fail-closed。既定値へのフォールバックは行わない）。
/// エラーメッセージにはフィールドの内容（tenant_id の値・body 本文等）を含めず、
/// 長さ・上限値のみを含める（security.md「テナント境界」対応）。
#[derive(Debug)]
pub enum RowCodecError {
    Invalid(String),
}

pub type Result<T> = std::result::Result<T, RowCodecError>;

/// 1 列分の値。ColumnType に対応する（Null は nullable 列にのみ許容される）。
#[derive(Debug, Clone, PartialEq)]
pub enum Value {
    Null,
    Text(String),
    Vector(Vec<f32>),
}

/// デコード結果。行レベルの RLS フィールド（tenant_id・visibility）と、
/// スキーマの列順に対応する値列を保持する。
#[derive(Debug, Clone, PartialEq)]
pub struct DecodedRow {
    pub tenant_id: String,
    pub visibility: Visibility,
    pub values: Vec<Value>,
}

/// TableSchema の列定義（列順・型・nullable）に従い、行データをバイト列へ
/// エンコードする（TABLE-7）。values はスキーマの列順に対応させる。
/// - values.len() がスキーマの列数を超える場合は Err。
/// - 末尾の値が不足する場合、対応する列が nullable なら Value::Null を補って扱う
///   （TABLE-5: ALTER TABLE ADD COLUMN で追加された列を持たない既存行の書き込み経路）。
///   non-nullable な列が不足する場合は Err。
/// - non-nullable 列へ Value::Null を渡した場合は Err。
/// - Value::Vector の次元がスキーマの VECTOR(N) と一致しない場合は Err。
/// - 長さフィールドの数値変換はすべて try_from で行い、失敗（上限超過）を Err とする
///   （as キャストによる剰余切り詰めは行わない。TABLE-7 の核心）。
pub fn encode_row(
    schema: &TableSchema,
    tenant_id: &str,
    visibility: Visibility,
    values: &[Value],
) -> Result<Vec<u8>> { /* ... */ }

/// encode_row の逆変換。欠落・不正値・切り詰め・未知タグをすべて Err で拒否する
/// （fail-closed。黙殺フォールバックで既定値へ落とさない）。添字アクセス []
/// ではなく get()・checked_add を使い、境界外アクセス・オーバーフローを未定義
/// 動作にしない。バッファが列の途中で終わっている場合、その列以降は「nullable
/// なら Value::Null、non-nullable なら Err」として扱う（TABLE-5 前提）。
pub fn decode_row(schema: &TableSchema, buf: &[u8]) -> Result<DecodedRow> { /* ... */ }

/// sql::exec（TASK-75、対象ビヘイビア: SQL-2）から呼ばれる、スキーマの非 VECTOR 列
/// （Text 列）のみを列順にエンコードするペイロード。storage.rs::RowInput は
/// embedding（VECTOR 列 1 本）と不透明な metadata バイト列しか持たないため、
/// VECTOR 列は embedding スロットへ、それ以外は本関数の出力を metadata へ格納
/// するという規約を SQL 表層のローカルな契約として定義する。values は
/// TableSchema::columns の列順に対応させる（VECTOR 列の位置は無条件にスキップ）。
/// 欠落・上限超過・型不一致の規則は encode_row と同一。
pub fn encode_scalar_columns(schema: &TableSchema, values: &[Value]) -> Result<Vec<u8>> { /* ... */ }

/// TableSchema::columns 列順に対応する非 VECTOR 列を列順にデコードする borrow 版
/// パーサー（Issue #56 レビュー指摘・codex P1 対応: 旧 decode_scalar_columns は
/// 全 Text 列を無条件に to_string() で確保していたため、最大長 Text 列を多数持つ
/// スキーマでは巨大な一時確保が発生し得た。security.md「無制限リソース確保
/// （DoS）」対応）。presence タグ・宣言長（MAX_TEXT_FIELD_LEN 超過）・UTF-8 妥当性を
/// すべて検証しつつ、Text 値は buf を借用した &str として返し、一切ヒープ確保
/// しない。戻り値は schema.columns と同じ長さ・順序を持ち、VECTOR 列・NULL 列の
/// 位置は常に None。
pub fn scan_scalar_columns<'a>(
    schema: &TableSchema,
    buf: &'a [u8],
) -> Result<Vec<Option<&'a str>>> { /* ... */ }

/// scan_scalar_columns の列限定版（Issue #350: 集計経路が実際に参照しない列の
/// &str 生成コストを避けるための必要列限定デコード）。mask が Some(m) のとき
/// m[i] == false の列も構造検証（presence タグ・宣言長上限・バッファ境界）に加え
/// UTF-8 妥当性検証まで常に行い（codex-review P1 指摘・PR #369）、検証済みの &str
/// の生成・保持のみを省略して常に None を積む。mask が None（scan_scalar_columns
/// 経由）は従来どおり全列を &str 化する。mask.len() != schema.columns.len() は
/// fail-closed に Err とする。
pub fn scan_scalar_columns_masked<'a>(
    schema: &TableSchema,
    buf: &'a [u8],
    mask: Option<&[bool]>,
) -> Result<Vec<Option<&'a str>>> { /* ... */ }

/// encode_scalar_columns の検証専用版（codex-review P1 指摘対応・PR #369:
/// sql::aggregate::DecodeTier::Fast は scalar_mask が全列 false のときに使う
/// tier だが、従来は scan_scalar_columns_masked を呼び Vec<Option<&str>> を毎行
/// 確保しており、docs/design/aggregate-decode-skip.md が定める「Fast は結果 Vec
/// 生成を省略する」という tier 契約に反していた）。構造検証は
/// scan_scalar_columns_masked と完全に同じ経路を通り一切弱めない。検証済みの値を
/// 呼び出し元へ返さない・保持しないため Vec を一切確保しない。
pub fn validate_scalar_columns(schema: &TableSchema, buf: &[u8]) -> Result<()> { /* ... */ }

/// encode_scalar_columns の逆変換。戻り値は schema.columns と同じ長さ・順序を持ち、
/// VECTOR 列の位置は常に Value::Null（本関数はその位置のバイトを一切読み書きしない
/// ダミー値。呼び出し元は embedding を storage.rs::Row::embedding から別途参照する）。
/// 構造検証は scan_scalar_columns に委譲し、本関数はその借用結果を
/// try_reserve_exact + push_str で Value::Text へ複製するだけの薄いラッパー。
pub fn decode_scalar_columns(schema: &TableSchema, buf: &[u8]) -> Result<Vec<Value>> { /* ... */ }
```

## Notes

- `MAX_TEXT_FIELD_LEN`（`4 * 1024 * 1024`）は `pub(crate)` のためクレート外非公開。`declarative_filter::DeclarativeFilter::bind` がメタデータフィルタのリテラル長上限検査（`54000`）に再利用する（TASK-147・EXT-3、ソース実測）。
- 本モジュールの行フォーマットは `storage.rs` の行フォーマット v2 とは独立したバイトレイアウト（v1）であり、両者は置き換え関係ではない。
- 本ページの記述は公開ソース（`raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/crates/engine/src/row_codec.rs`）から検証済み（scratchpad の pin SHA verbatim ソースと突合済み）。

## Related

- [storage](./storage.md)
- [catalog](./catalog.md)
