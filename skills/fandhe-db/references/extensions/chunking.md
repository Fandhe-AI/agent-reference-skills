---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/chunking.rs
---

# chunking

チャンク化モジュール（TASK-119、INDEX-3）。`INSERT` 経由で受け取ったファイル内容（パス＋ UTF-8 本文）を、ファイル種別に応じた方針でチャンク列へ分割する純関数的な API。storage / catalog / sql / policy とは結線しない。

## Signature / Usage

```rust,ignore
//! チャンク化モジュール（TASK-119、対象ビヘイビア: INDEX-3。ポインタ:
//! `docs/spec/05-tasks.md` TASK-119・`docs/spec/04-behavior/indexing.md` INDEX-3）。
//!
//! 責務境界: `INSERT` 経由で受け取ったファイル内容（パス＋ UTF-8 本文）を、
//! ファイル種別に応じた方針でチャンク列へ分割する純関数的な API を提供し、
//! storage / catalog / sql / policy とは結線しない（`sparse.rs` と同じ
//! 「純関数的 API・結線しない」方針）。呼び出し元は増分インデックス結線
//! （TASK-120・`incremental.rs`）と一括投入 4 上限（TASK-122・対象ビヘイビア: INDEX-4・
//! `batch_limits.rs`）。本モジュール自身は単一入力（1 ファイル）に対する走査量の
//! 有界化のみを担い、複数ファイルにまたがる合計サイズ・ファイル数上限は
//! `batch_limits.rs`（TASK-122）の管轄である。
//!
//! 入力は SQL 表層で既に UTF-8 検証済みの `&str` を前提とする（本モジュールは
//! バイト列のデコードを行わない）。パスはファイル種別判定のみに使い、
//! ファイルシステムへはアクセスしない。
//!
//! 分割方針の詳細は spec（private）が正であり、本コメントには転記しない
//! （TASK-119・INDEX-3 のポインタのみ）。公開 API の契約として説明が必要な
//! 実装上の性質は以下に限る。
//!
//! - 行分割は `str::lines()` を使い CRLF (`\r\n`) を LF 相当として正規化する
//! - fenced code block（```` ``` ```` / `~~~` の対）の内側にある `#` 始まりの行は
//!   Markdown 仕様上見出しではないため、節の境界にしない
//! - 短いチャンクを間引くフィルタは持たない（DB では内容を無音で失うため）
//!
//! untrusted 入力に対する有界化（fail-closed。.claude/rules/coding-rust.md）:
//! 走査に入る前に入力全体のバイト長・行数を検証し、上限超過時は副作用なく
//! `Err` を返す。行番号・文字数の累積は `checked_add` / `saturating_add` を用い、
//! `unwrap` / `expect` / 添字アクセス・正規表現は使わない。

/// 単一入力本文の上限バイト数（この上限を超える入力は走査前に拒否する）。
///
/// wire → SQL `INSERT` 経由で届く untrusted 入力を前提とした DoS 対策
/// （`sparse.rs::MAX_DOC_BYTES` と同じ流儀）。複数ファイル合計の上限は
/// `batch_limits.rs`（TASK-122・INDEX-4）が別途担う（`BatchLimits::
/// max_file_body_bytes` の既定値は本定数と一致させている）。
pub const MAX_INPUT_BYTES: usize = 16 * 1024 * 1024;

/// 単一入力本文の上限行数（この上限を超える入力は走査前に拒否する）。
pub const MAX_INPUT_LINES: usize = 1_000_000;

/// 非 Markdown ファイルの既定チャンク行数。
pub const DEFAULT_LINES_PER_CHUNK: usize = 60;

/// Markdown の 1 節あたりの既定上限文字数（`chars().count()` で計測）。
///
/// `ChunkingConfig` に `None` を渡すと上限なし（節を分割しない）。
pub const DEFAULT_MAX_MARKDOWN_SECTION_CHARS: Option<usize> = Some(600);

/// ファイルパスから判定したファイル種別。
///
/// [`detect_file_kind`] の戻り値。[`chunk_file`] がこの種別に応じて
/// [`chunk_markdown`] / [`chunk_generic`] のいずれかへ委譲する。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FileKind {
    /// Markdown（拡張子 `.md` / `.markdown`。ASCII 大小無視）。
    Markdown,
    /// Markdown 以外すべて（拡張子なし・未知拡張子を含む）。
    Generic,
}

/// ファイルパスの拡張子から [`FileKind`] を判定する。
///
/// ファイルシステムへはアクセスせず、文字列としてのパスのみを見る
/// （untrusted なパス文字列に対しても安全に呼べる）。
pub fn detect_file_kind(path: &str) -> FileKind

/// チャンク化の挙動を調整する設定。
#[derive(Debug, Clone)]
pub struct ChunkingConfig {
    /// [`chunk_generic`] が 1 チャンクにまとめる行数。0 は不正（[`ChunkingError::InvalidConfig`]）。
    pub lines_per_chunk: usize,
    /// [`chunk_markdown`] が 1 節に許容する上限文字数。`Some(0)` は不正。
    /// `None` は上限なし（節を分割しない）。
    pub max_markdown_section_chars: Option<usize>,
}

impl Default for ChunkingConfig {
    fn default() -> Self {
        Self {
            lines_per_chunk: DEFAULT_LINES_PER_CHUNK,
            max_markdown_section_chars: DEFAULT_MAX_MARKDOWN_SECTION_CHARS,
        }
    }
}

/// チャンク化の結果 1 件。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Chunk {
    /// ファイル内 0 始まりの連番。
    pub index: usize,
    /// このチャンクが対応する元テキストの開始行（1 始まり・両端含む）。
    pub start_line: usize,
    /// このチャンクが対応する元テキストの終了行（1 始まり・両端含む）。
    pub end_line: usize,
    /// 前後の空白行・行末空白を除去済みの本文。
    pub text: String,
}

/// チャンク化の失敗理由。
///
/// メッセージは英語（.claude/rules/japanese-style.md: プログラム出力文字列は英語）。
/// 長さ・上限値のみを含み、入力本文そのものは含めない（エラー経由で内容を
/// 漏らさないため）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ChunkingError {
    /// 入力本文のバイト長が [`MAX_INPUT_BYTES`] を超えた。
    InputTooLarge { len: usize, max: usize },
    /// 入力本文の行数が [`MAX_INPUT_LINES`] を超えた。
    TooManyLines { len: usize, max: usize },
    /// [`ChunkingConfig`] の値が不正。
    InvalidConfig { reason: &'static str },
}

/// 非 Markdown ファイルを固定行数の窓でチャンク化する。
///
/// 先頭から `config.lines_per_chunk` 行ずつ窓を切り、各窓を trim して
/// 空でなければチャンクにする（150 行 → 60/60/30 のように末尾窓は短くなる）。
pub fn chunk_generic(text: &str, config: &ChunkingConfig) -> Result<Vec<Chunk>, ChunkingError>

/// Markdown ファイルを見出し単位でチャンク化する。
///
/// ATX 見出し（[`is_atx_heading`]）の行を節の開始境界とし、最初の見出しより
/// 前の前文は独立した 1 節として扱う。fenced code block（[`fence_marker`] の
/// 開閉判定）内の `#` 行は見出しと見なさない。`config.max_markdown_section_chars` を
/// 超える節は [`split_oversized_section`] で段落単位に詰め直す。
pub fn chunk_markdown(text: &str, config: &ChunkingConfig) -> Result<Vec<Chunk>, ChunkingError>

/// パスからファイル種別を判定し、[`chunk_markdown`] / [`chunk_generic`] へ委譲する。
///
/// `INSERT` 経由で届く未検証のパス・本文を受け取る想定の公開入口
/// （呼び出し元は TASK-120 増分インデックス結線・TASK-122 一括投入 4 上限）。
pub fn chunk_file(
    path: &str,
    text: &str,
    config: &ChunkingConfig,
) -> Result<Vec<Chunk>, ChunkingError>
```

## Notes

- 分割方針の詳細は private spec（`docs/spec`）が正であり、モジュール冒頭のコメント自身が「本コメントには転記しない」と明記している。公開 API の契約として説明されているのは上記フェンス内の 3 点（CRLF 正規化・fenced code block 内 `#` の非見出し扱い・短いチャンクの間引きなし）のみ
- `MAX_INPUT_BYTES` / `MAX_INPUT_LINES` は wire → SQL `INSERT` 経由の untrusted 入力を前提とした DoS 対策。複数ファイル合計の上限は `batch_limits.rs`（本 scope 外）が別途担う
- `chunk_markdown` の内部実装（`split_oversized_section` 等）は private 関数のためシグネチャ・doc は本ページに含めない
- TASK-119 / INDEX-3 / TASK-120 / TASK-122 / INDEX-4 は private spec（`docs/spec`）へのポインタのみ。spec 非公開のため判断理由・受入基準は未記載
- 0.1.0 時点の公開表面。安定性未確認のため利用前にソースを確認すること

## Related

- [embedding](./embedding.md)
