---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/dictionary.rs
---

# dictionary

辞書的情報源抽出パイプライン（TASK-109、PLAN-5）。索引化済みコーパスから、後続の LLM クエリプランニングが固定接頭辞コンテキストとして使う「辞書的情報源」（シンボル・ファイルツリー・タームインデックス）を機械抽出する純関数的な API。storage / catalog / policy とは結線しない。

## Signature / Usage

```rust,ignore
//! 辞書的情報源抽出パイプライン（TASK-109、対象ビヘイビア: PLAN-5。ポインタ:
//! `docs/spec/05-tasks.md` TASK-109・`docs/spec/04-behavior/query-planning.md` PLAN-5）。
//!
//! 責務境界: DB に索引化済みのコーパス（ファイル形 `INSERT` のパス・本文）から、
//! 後続の LLM クエリプランニング（TASK-110 以降）が固定接頭辞コンテキストとして使う
//! 「辞書的情報源」を機械抽出する**純関数的な API**を提供する。`chunking.rs`・
//! `sparse.rs` と同じ流儀で storage / catalog / policy へは結線しない（行データの
//! 取得・世代整合キャッシュとの結線は `core.rs::DictionaryCache` の責務）。
//!
//! シンボル辞書は [`DictionaryConfig`] に無効化スイッチを持たず常に抽出する。
//! ファイルツリー・用語索引は同 config のフラグで無効化できる。新しい情報源の
//! 追加は [`DictionarySourceKind`] へのバリアント追加＋抽出関数 1 つの追加で
//! 完結する構造にする（段階的追加可能な設計）。
//!
//! 依存は追加しない（dependency-policy: regex 等の新規クレートは不可）ため、シンボル
//! 抽出・トークナイズはいずれも手書きの行パーサ／文字走査で実装する。`sparse.rs`
//! （BM25 用トークナイザ・CJK バイグラム込み）とは責務・要件が異なる（本モジュールは
//! ASCII 識別子中心の軽量な頻度集計で十分）ため共有せず、本モジュール内に閉じる。
//!
//! untrusted 入力に対する有界化（fail-closed。.claude/rules/coding-rust.md）:
//! 抽出対象の本文は呼び出し元（`chunking.rs` 経由でチャンク化済み）で既に
//! バイト長・行数の上限を通過済みだが、本モジュールでも独立に「1 抽出単位あたりの
//! 最大シンボル数」「シンボル名・パス・用語の最大長」「辞書全体の最大エントリ数・
//! 概算バイト量」を持つ。上限超過は決定的に切り詰め、[`Dictionary::truncated`] を
//! 立てる。これは検索を広域側（recall）へ劣化させる安全劣化であり、テナント境界・
//! 可視性判定には一切関与しない fail-open ではない（呼び出し元 `core.rs` の
//! `DictionaryCache`・`tenant::visible_rows` がテナント境界を担保する）。
//!
//! 決定性: 内部コンテナはすべて `BTreeMap` / `BTreeSet` を用い、反復順序を
//! 入力（行走査）順に依存させない（`scripts/check_sort_determinism.sh` との整合）。
//! [`Dictionary::finish`] が行う最終切り詰め（[`cap_btreeset`]・用語索引の
//! 上位 N 選定）は挿入順ではなくソート順（辞書順・頻度順）で行うため決定的だが、
//! [`DictionaryBuilder::ingest`] 内の生の安全弁（[`MAX_DICTIONARY_SYMBOLS`]・
//! [`MAX_DICTIONARY_PATHS`]・[`MAX_TERM_INDEX_RAW_ENTRIES`]）は「これ以上の新規
//! エントリを積み上げない」形の早期打ち切りであり、どのエントリが最初に打ち切りの
//! 対象になるかは呼び出し元の走査順序（`tenant::visible_rows` のページング順）に
//! 依存する。実運用では最終切り詰め後の集合が生の安全弁に到達すること自体が稀
//! （安全弁は DoS 対策の最終防衛線）であり、到達時は [`Dictionary::truncated`] が
//! 立つため、呼び出し元は「切り詰めが発生したこと」自体は決定的に検知できる。

/// 1 抽出単位（1 行 = 1 チャンク相当の本文）あたりの最大シンボル数。
/// これを超える分は決定的に切り詰め、[`Dictionary::truncated`] を立てる。
pub const MAX_SYMBOLS_PER_UNIT: usize = 512;

/// シンボル名の最大長（文字数）。超過分は切り詰める。
pub const MAX_SYMBOL_NAME_LEN: usize = 256;

/// パス文字列の最大長（文字数）。超過分は切り詰める。
pub const MAX_PATH_LEN: usize = 1024;

/// 用語（term）の最大長（文字数）。超過分は切り詰める。
pub const MAX_TERM_LEN: usize = 64;

/// [`Dictionary`] が保持するシンボル総数の上限（辞書全体・DoS 対策）。
pub const MAX_DICTIONARY_SYMBOLS: usize = 20_000;

/// [`Dictionary`] が保持するファイルパス総数の上限。
pub const MAX_DICTIONARY_PATHS: usize = 20_000;

/// 用語索引が集計時に保持する生の異なり語数の上限（頻度集計前の安全弁。DoS 対策）。
/// これを超えて初めて登場する語は集計に加えない（既出語の頻度加算は継続する）。
pub const MAX_TERM_INDEX_RAW_ENTRIES: usize = 50_000;

/// [`DictionaryConfig::top_terms`] の既定値。
pub const DEFAULT_TOP_TERMS: usize = 300;

/// ソース種別判定（[`detect_source_kind`]）。ファイルシステムへは一切アクセスせず、
/// パス文字列（untrusted）のみから判定する（`chunking.rs::detect_file_kind` と同じ
/// untrusted パス安全方針）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SourceFileKind {
    /// Rust ソース（拡張子 `.rs`、ASCII 大小無視）。
    Rust,
    /// Markdown（拡張子 `.md` / `.markdown`、ASCII 大小無視）。
    Markdown,
    /// 上記以外すべて（拡張子なし・未知拡張子を含む）。
    Other,
}

/// パス文字列の最終要素の拡張子のみから [`SourceFileKind`] を判定する。
pub fn detect_source_kind(path: &str) -> SourceFileKind

/// 段階的に追加可能な辞書的情報源の種別。新規情報源の追加は
/// このバリアント追加＋対応する抽出関数の追加で完結する。
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum DictionarySourceKind {
    /// シンボル辞書（[`DictionaryConfig`] に無効化スイッチを持たない）。
    SymbolDict,
    /// ファイルツリー（[`DictionaryConfig::enable_file_tree`] で無効化可能）。
    FileTree,
    /// 用語索引（[`DictionaryConfig::enable_term_index`] で無効化可能）。
    TermIndex,
}

/// Rust の行頭定義の種別。
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum SymbolKind {
    Fn,
    Struct,
    Enum,
    Trait,
    Impl,
    Mod,
    Const,
    Type,
}

/// 抽出された 1 シンボル。`Ord` はソート順（`path` → `line` → `name` → `kind` →
/// `unit_seq`）を決定的にするために導出し、[`Dictionary::symbols`]（`BTreeSet`）の
/// 反復順序が挿入順に依存しないようにする。
///
/// `unit_seq` は [`extract_rust_symbols`] を呼んだ抽出単位（チャンク）の呼び出し順
/// 連番（[`DictionaryBuilder`] が付与）であり、`line` がチャンク相対値であることの
/// 埋め合わせとして同一性に含める（TASK-109・PLAN-5 レビュー対応: `line` のみを
/// 同一性に使うと、別チャンクの同名・同種シンボルがたまたま同じチャンク相対行番号に
/// 来た場合に `BTreeSet` 上で衝突し、後から挿入した側が黙って欠落していた。ADR の
/// 「チャンク化でシンボル欠落しない」契約に反するため、チャンク単位で一意な値を
/// 同一性へ組み込むことで衝突自体をなくす）。
#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
pub struct Symbol {
    pub path: String,
    pub line: u32,
    pub name: String,
    pub kind: SymbolKind,
    pub unit_seq: u64,
}

/// 1 抽出単位（`path` の 1 チャンク本文 `body`）から Rust シンボルを抽出する。
/// 戻り値の `bool` は [`MAX_SYMBOLS_PER_UNIT`] 超過による決定的切り詰め、
/// および `path`・シンボル名が [`MAX_PATH_LEN`]・[`MAX_SYMBOL_NAME_LEN`] を
/// 超えて切り詰められたかのいずれかが発生したことを示す（TASK-109・PLAN-5
/// レビュー対応: 個別の文字列切り詰めも `truncated` へ確実に反映する）。
///
/// 行番号はこの抽出単位内でのローカルな 1 起点行番号であり、チャンク化
/// （`chunking.rs`）により本文が複数チャンクへ分割されている場合、元ファイル全体での
/// 行番号とは一致しない（チャンク化は行分割ベース・非オーバーラップのため
/// シンボル自体の欠落は生じないが、行番号はチャンク相対値になる。呼び出し元
/// `core.rs::DictionaryCache` のドキュメント参照）。
///
/// `unit_seq` は呼び出し元（[`DictionaryBuilder::ingest`]）がこの抽出単位に
/// 付与した一意な連番で、[`Symbol`] の同一性へそのまま伝播する（[`Symbol`] の
/// ドキュメンテーションコメント参照。チャンク相対行番号だけでは別チャンクの
/// 同名・同種シンボルが衝突しうるための埋め合わせ）。
pub fn extract_rust_symbols(path: &str, body: &str, unit_seq: u64) -> (Vec<Symbol>, bool)

/// ファイルツリー情報源（補助）。パス一覧・拡張子別・トップディレクトリ別の集計。
#[derive(Debug, Clone, Default)]
pub struct FileTree {
    pub paths: BTreeSet<String>,
    pub by_extension: BTreeMap<String, u64>,
    pub by_top_dir: BTreeMap<String, u64>,
}

/// 抽出パイプラインの設定。シンボル辞書には無効化スイッチを持たせない
/// （常に構築されることを型・設定面で保証する）。
#[derive(Debug, Clone)]
pub struct DictionaryConfig {
    /// ファイルツリー情報源を有効化するか。
    pub enable_file_tree: bool,
    /// 用語索引情報源を有効化するか。
    pub enable_term_index: bool,
    /// 用語索引が保持する上位語数。
    pub top_terms: usize,
}

impl Default for DictionaryConfig {
    fn default() -> Self {
        Self {
            enable_file_tree: true,
            enable_term_index: true,
            top_terms: DEFAULT_TOP_TERMS,
        }
    }
}

/// 抽出結果を束ねる辞書本体。`BTreeSet`/`BTreeMap` により反復順序は常に決定的
/// （モジュールドキュメント参照）。
#[derive(Debug, Clone, Default)]
pub struct Dictionary {
    /// シンボル辞書（必須。常に構築される）。
    pub symbols: BTreeSet<Symbol>,
    /// ファイルツリー（補助。[`DictionaryConfig::enable_file_tree`] が `false` なら空）。
    pub file_tree: FileTree,
    /// 用語索引（補助。[`DictionaryConfig::enable_term_index`] が `false` なら空）。
    /// 値は集計後の頻度（上位 [`DictionaryConfig::top_terms`] 件に切り詰め済み）。
    pub term_index: BTreeMap<String, u64>,
    /// いずれかの情報源で上限超過による決定的切り詰めが発生したか。
    pub truncated: bool,
}

impl Dictionary {
    /// キャッシュ容量判定用の概算ヒープバイト数（`core.rs::DictionaryCache` が
    /// 容量上限を判定するために使う。`rls.rs::PrefilterSnapshot::approx_heap_bytes`
    /// と同じ用途で、フィールド構造から粗く見積もる厳密でない概算値）。
    pub fn approx_heap_bytes(&self) -> usize { /* ... */ }
}

/// 単一ファイル（`path`）分の抽出単位（1 つ以上のチャンク本文）を積み上げる
/// 増分ビルダー（TASK-109）。`core.rs::EngineCore::dictionary_snapshot` はテーブル
/// 走査で得た行を `path` 単位に事前グルーピングはせず、可視行を走査順に 1 行ずつ
/// `(path, body)` として本ビルダーへ渡す（同一 `path` の行が複数あれば `ingest` が
/// その都度呼ばれる。`ingest` 自体が呼び出し側の分割粒度に依存しない設計のため、
/// グルーピングの有無は抽出結果に影響しない）。
///
/// `config` は構築時（[`DictionaryBuilder::new`]）に固定して保持する。`ingest`・
/// `finish` を別々の `&DictionaryConfig` で呼び分けられる構造だと、蓄積済みの
/// `term_freq`（`enable_term_index` を前提に集計している）が `finish` 時の異なる
/// 設定で黙って捨てられる／解釈が食い違う不整合を起こしうるため（TASK-109・PLAN-5
/// レビュー対応）、単一の設定に固定して不整合の余地自体を排除する。
#[derive(Debug)]
pub struct DictionaryBuilder {
    config: DictionaryConfig,
    symbols: BTreeSet<Symbol>,
    file_tree: FileTree,
    term_freq: BTreeMap<String, u64>,
    truncated: bool,
    /// 次回 `ingest` 呼び出しに付与する抽出単位（チャンク）連番。
    /// [`Symbol::unit_seq`] のドキュメンテーションコメント参照。
    next_unit_seq: u64,
}

impl DictionaryBuilder {
    /// `config` に固定したビルダーを新規作成する。以降の `ingest`・`finish` は
    /// すべてこの `config` を用いる。
    pub fn new(config: DictionaryConfig) -> Self { /* ... */ }

    /// `path`・`body` の 1 抽出単位（1 行 = 1 チャンク相当）を取り込む。
    pub fn ingest(&mut self, path: &str, body: &str) { /* ... */ }

    /// 積み上げた内容を [`Dictionary`] へ確定する。用語索引は頻度降順・同点は
    /// 辞書順昇順で上位 `config.top_terms` 件に決定的に切り詰める。設定は
    /// [`DictionaryBuilder::new`] で固定したものを用いる（`ingest` と異なる設定を
    /// 渡して不整合を起こす余地をなくすため、引数では受け取らない）。
    pub fn finish(self) -> Dictionary { /* ... */ }
}
```

## Notes

- 用語索引（`term_index`）の抽出は `sparse.rs`（BM25・CJK バイグラム込み）とは独立した ASCII 専用の軽量トークナイザ（private 関数 `tokenize_ascii_words` / `extract_rust_doc_terms` / `extract_markdown_terms`）で行われ、内蔵ストップワードリストも英語の一般語（`the` / `and` 等）のみで構成される。CJK 対応の ADR（`cjk-stopword-tokenizer` / `cjk-tokenizer-impact-ja-corpus`）は `sparse.rs`（search scope）向けの変更であり、本モジュールとの連携はソース・ADR 上に記載がない
- 上限超過時の切り詰めは `Dictionary::truncated` フラグで検知可能。切り詰めの発生自体は決定的だが、どのエントリが最初に打ち切られるかは呼び出し元の走査順序に依存する（`//!` 記載どおり）
- ADR `dictionary-sources`（TASK-109 / PLAN-5、`docs/design/dictionary-sources.md`）は本モジュールの実装を指し示すのみで、追加の設計詳細は記載されていない
- TASK-109 / PLAN-5 / TASK-110 は private spec（`docs/spec`）へのポインタのみ。spec 非公開のため判断理由・受入基準は未記載
- 0.1.0 時点の公開表面。安定性未確認のため利用前にソースを確認すること

## Related

- [chunking](./chunking.md)
