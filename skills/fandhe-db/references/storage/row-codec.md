---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/row_codec.rs
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
    /// 符号付き 32 ビット整数（ColumnType::Integer）。
    Integer(i32),
    /// 符号付き 64 ビット整数（ColumnType::BigInt）。
    BigInt(i64),
    Real(f32),
    Double(f64),
    /// 真偽値。NULL とはバイト列上も別物。
    Bool(bool),
    /// 日付。1970-01-01 起点の日数（i32）。
    Date(i32),
    /// 日時。1970-01-01 00:00:00 起点のマイクロ秒（i64、タイムゾーンなし）。
    Timestamp(i64),
    /// 配列列の値。要素型ごとに variant を分ける。
    Array(ArrayValue),
    /// 可変長バイナリ。NULL と空バイト列（Vec::new()）は区別される。
    Bytes(Vec<u8>),
    /// JSON / JSONB 列共通の値表現（JSON は入力テキストそのまま、JSONB は正規化済み）。
    Json(String),
    /// ENUM 列の値（ラベル文字列。語彙検証は encode 時のみ、decode 時は検査しない）。
    Enum(String),
    /// 十進固定小数。行には unscaled（i128 LE 16 バイト）のみを持ち scale はカタログが正。
    Numeric(Decimal),
    Uuid(Uuid),
}

/// 配列列 1 個分の値。各要素は Option（None が NULL 要素）。
#[derive(Debug, Clone, PartialEq)]
pub enum ArrayValue {
    Text(Vec<Option<String>>),
    Bool(Vec<Option<bool>>),
    Integer(Vec<Option<i32>>),
    BigInt(Vec<Option<i64>>),
    Real(Vec<Option<f32>>),
    Double(Vec<Option<f64>>),
    Date(Vec<Option<i32>>),
    Timestamp(Vec<Option<i64>>),
    Uuid(Vec<Option<Uuid>>),
    Numeric(Vec<Option<Decimal>>),
    Bytea(Vec<Option<Vec<u8>>>),
    Json(Vec<Option<String>>),
    Jsonb(Vec<Option<String>>),
    Enum(Vec<Option<String>>),
}

/// スカラー列走査（scan_scalar_columns 系）の借用結果。Option<&str> から型付き化された。
/// #[non_exhaustive] は付けない（型追加時にコンパイラが全呼び出し元を列挙する）。
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum ScalarRef<'a> {
    Text(&'a str),
    Integer(i32),
    BigInt(i64),
    Real(f32),
    Double(f64),
    Bool(bool),
    Date(i32),
    Timestamp(i64),
    Array(ArrayRef<'a>),
    Bytes(&'a [u8]),
    Json(&'a str),
    Enum(&'a str),
    Numeric(Decimal),
    Uuid(Uuid),
}

impl<'a> ScalarRef<'a> {
    /// Text 以外は None（TEXT 前提の消費側へ流入させない。fail-closed）。
    pub fn as_text(&self) -> Option<&'a str> { /* ... */ }
    pub fn as_bool(&self) -> Option<bool> { /* ... */ }
    pub fn as_date(&self) -> Option<i32> { /* ... */ }
    pub fn as_timestamp(&self) -> Option<i64> { /* ... */ }
    pub fn as_numeric(&self) -> Option<Decimal> { /* ... */ }
    pub fn as_uuid(&self) -> Option<crate::uuid::Uuid> { /* ... */ }
    pub fn as_bytes(&self) -> Option<&'a [u8]> { /* ... */ }
    pub fn as_dictionary_text(&self) -> Option<&'a str> { /* ... */ }
}

/// 配列列の借用結果。構造・UTF-8・要素上限は走査時に検証済み。
pub struct ArrayRef<'a> { /* ... */ }

impl<'a> ArrayRef<'a> {
    pub fn elem(&self) -> ArrayElemType { /* ... */ }
    pub fn count(&self) -> u32 { /* ... */ }
    pub fn flags(&self) -> u8 { /* ... */ }
    pub fn payload_bytes(&self) -> usize { /* ... */ }
    /// 追加のエラー処理なしに複製できる（走査時に検証済み）。
    pub fn to_value(&self) -> Result<ArrayValue> { /* ... */ }
}

/// ScalarRef の走査結果から TEXT 値のみを取り出す。束縛段が非 TEXT 列の参照を拒否する契約に依存する fail-closed 設計。
pub fn scalar_refs_as_text<'a>(scanned: &[Option<ScalarRef<'a>>]) -> Vec<Option<&'a str>> { /* ... */ }

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
/// （0.2.0: 戻り値は Vec<Option<ScalarRef<'a>>>、schema の借用も 'a。
///  Text 値は buf を借用した &str のまま返る。VECTOR 列・NULL 列の位置は None。）
pub fn scan_scalar_columns<'a>(
    schema: &'a TableSchema,
    buf: &'a [u8],
) -> Result<Vec<Option<ScalarRef<'a>>>> { /* ... */ }

/// scan_scalar_columns の列限定版（Issue #350: 集計経路が実際に参照しない列の
/// &str 生成コストを避けるための必要列限定デコード）。mask が Some(m) のとき
/// m[i] == false の列も構造検証（presence タグ・宣言長上限・バッファ境界）に加え
/// UTF-8 妥当性検証まで常に行い（codex-review P1 指摘・PR #369）、検証済みの &str
/// の生成・保持のみを省略して常に None を積む。mask が None（scan_scalar_columns
/// 経由）は従来どおり全列を &str 化する。mask.len() != schema.columns.len() は
/// fail-closed に Err とする。
pub fn scan_scalar_columns_masked<'a>(
    schema: &'a TableSchema,
    buf: &'a [u8],
    mask: Option<&[bool]>,
) -> Result<Vec<Option<ScalarRef<'a>>>> { /* ... */ }

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
- **`scan_scalar_columns` の「一切ヒープ確保しない」の範囲の訂正**: 上記コードブロックの `scan_scalar_columns` の doc comment（`row_codec.rs` からの verbatim 引用）にある「一切ヒープ確保しない」は、**Text 値本体のコピー（`to_string()` 相当のヒープ確保）を行わない**という意味であり、関数呼び出し全体でヒープ確保がゼロになるわけではない。戻り値の型は `Result<Vec<Option<&'a str>>>` であり、`schema.columns` と同じ長さの結果 `Vec` 自体は呼び出しのたびに確保される（`scan_scalar_columns_masked` の doc comment、上記コードブロック 100〜103 行相当に「`scan_scalar_columns_masked` を呼び `Vec<Option<&str>>` を毎行確保しており」と明記されている）。結果 `Vec` の確保まで含めて完全に省略するのは検証専用版の `validate_scalar_columns`（戻り値 `Result<()>`）のみで、こちらは検証済みの値を呼び出し元へ返さない・保持しないため `Vec` を一切確保しない。まとめると: `scan_scalar_columns`/`scan_scalar_columns_masked` は「Text 本体のコピーは省略、結果 `Vec` の確保は残る」、`validate_scalar_columns` は「結果 `Vec` の確保も省略」という 2 段階の性能契約になる。
- 本モジュールの行フォーマットは `storage.rs` の行フォーマット v2 とは独立したバイトレイアウト（v1）であり、両者は置き換え関係ではない。
- Migration (0.1.0 → 0.2.0): `Value` に `Integer` / `BigInt` / `Real` / `Double` / `Bool` / `Date` / `Timestamp` / `Array` / `Bytes` / `Json` / `Enum` / `Numeric` / `Uuid` が加わり、`scan_scalar_columns` / `scan_scalar_columns_masked` の戻り値は `Vec<Option<&str>>` から `Vec<Option<ScalarRef<'a>>>` へ変わった（`schema` の借用も `&'a TableSchema`）。`Value` / `ScalarRef` の網羅 `match` は追随が必要。TEXT 前提の消費側は `scalar_refs_as_text` または `ScalarRef::as_text` を使う。
- `scan_scalar_columns_masked` は 0.2.0 では内部の `scan_scalar_columns_validated`（削除済み列の墓標も物理走査上は構造検証する）を共有し、削除済み列は出力へ積まない（`values` は常に論理列数と同じ長さ。TABLE-19）。
- 上記コードブロックの `scan_scalar_columns` 以外の doc comment（`encode_row` 等）は 0.1.0 時点の転記のまま。0.2.0 の同関数は新型の検証規則が追加されている可能性があり、doc comment 全文の再転記は未実施。
- 本ページの記述は `fandhe-db-engine` 0.2.0 の `src/row_codec.rs`（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の enum 定義・pub 関数シグネチャから更新した。

## Related

- [storage](./storage.md)
- [catalog](./catalog.md)
