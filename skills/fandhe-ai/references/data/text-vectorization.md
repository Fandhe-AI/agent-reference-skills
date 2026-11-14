---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/text/struct.TextVectorization.html
---

# text::TextVectorization（Keras TextVectorization 相当）

文字列バッチを標準化・分割（任意で n-gram）し、語彙で整数 id へ引いて `[B, L]` の `Tensor<i32>` にする語彙 lookup 型のテキスト変換。出力は `Var::embedding(.., Some(0))` へ変換なしで渡せる。ホスト側だけで完結しバックエンドに依存しない。`fandhe_ai::text` から公開されるのは `TextVectorization` / `TextVectorizationConfig` / `TextLimits` / `Standardize` / `Split` / `TextError` / `StringLookup` / `StringLookupConfig` の 8 名（クレートルートへは再エクスポートされない。`StringLookup` は string-lookup.md）。出力モード（multi-hot / count / tf-idf）は `TextVectorization` のメソッドとして使える。

## Signature / Usage

```rust
impl TextVectorization {
    pub fn from_vocabulary<S: AsRef<str>>(config: TextVectorizationConfig, vocabulary: &[S])
        -> Result<Self, TextError>;
    pub fn adapt<S: AsRef<str>>(config: TextVectorizationConfig, corpus: &[S])
        -> Result<Self, TextError>;
    pub fn transform<S: AsRef<str>>(&self, inputs: &[S]) -> Result<Tensor<i32>, TextError>;
    pub fn from_vocabulary_with_idf<S: AsRef<str>>(
        config: TextVectorizationConfig,
        vocabulary: &[S],
        idf_weights: &[f32],
    ) -> Result<Self, TextError>;
    pub fn adapt_tf_idf<S: AsRef<str>>(config: TextVectorizationConfig, corpus: &[S])
        -> Result<Self, TextError>;
    pub fn transform_multi_hot<S: AsRef<str>>(&self, inputs: &[S]) -> Result<Tensor<f32>, TextError>;
    pub fn transform_count<S: AsRef<str>>(&self, inputs: &[S]) -> Result<Tensor<f32>, TextError>;
    pub fn transform_tf_idf<S: AsRef<str>>(&self, inputs: &[S]) -> Result<Tensor<f32>, TextError>;
    pub fn idf_weights(&self) -> Option<&[f32]>;
    pub fn vocabulary(&self) -> &[String];
    pub fn vocabulary_size(&self) -> usize;   // 予約 2 件を含む
    pub fn config(&self) -> &TextVectorizationConfig;
}
```

```rust
use fandhe_ai::text::{TextVectorization, TextVectorizationConfig};
use fandhe_ai::Tensor;

let config = TextVectorizationConfig::default().with_output_sequence_length(4);
let tv = TextVectorization::adapt(config, &["the cat sat", "the dog"]).unwrap();
// 語彙: [""(0), "[UNK]"(1), "the"(2), "cat"(3), "dog"(4), "sat"(5)]
assert_eq!(tv.vocabulary_size(), 6);

let ids = tv.transform(&["The cat!", "a bird"]).unwrap();
assert_eq!(ids.shape(), &[2, 4]);
assert_eq!(ids.host_slice().to_vec(), [2, 3, 0, 0, 1, 1, 0, 0]);

// id はそのまま Var::embedding に渡せる（padding_idx = Some(0)）。
let dim = 3;
let rows = tv.vocabulary_size();
let table = Tensor::<f32>::new((0..rows * dim).map(|i| i as f32).collect(), &[rows, dim]).unwrap();
let tape = fandhe_ai::tape();
let weight = tape.var(&table);
let embedded = weight.embedding(&ids, Some(0)).unwrap();
assert_eq!(embedded.to_tensor().shape(), &[2, 4, 3]);
```

語彙を直接指定（lookup は大小文字を区別した完全一致）:

```rust
use fandhe_ai::text::{Standardize, TextError, TextVectorization, TextVectorizationConfig};

let config = TextVectorizationConfig::default().with_standardize(Standardize::None);
let tv = TextVectorization::from_vocabulary(config.clone(), &["Cat", "dog"]).unwrap();
let ids = tv.transform(&["Cat cat dog"]).unwrap();
assert_eq!(ids.host_slice().to_vec(), [2, 1, 3]); // "cat" は語彙の "Cat" と別物で OOV

let err = TextVectorization::from_vocabulary(config, &["[UNK]"]).unwrap_err();
assert!(matches!(err, TextError::ReservedVocabularyToken { index: 0 }));
```

出力モード（rustdoc の例。`Linear` へそのまま渡せる `f32` の `[B, W]`。列 i = id i で、列 0 = パディングは常に 0、列 1 = OOV）:

```rust
use fandhe_ai::text::{Standardize, TextVectorization, TextVectorizationConfig};

let config = TextVectorizationConfig::default().with_standardize(Standardize::None);
let tv = TextVectorization::from_vocabulary(config.clone(), &["cat", "dog"]).unwrap();
// 列 i = id i（0 = パディング・1 = OOV・2 = cat・3 = dog）。
let counts = tv.transform_count(&["cat cat dog bird", "dog"]).unwrap();
assert_eq!(counts.shape(), &[2, 4]);
assert_eq!(counts.host_slice().to_vec(), [0.0, 1.0, 2.0, 1.0, 0.0, 0.0, 0.0, 1.0]);
let hot = tv.transform_multi_hot(&["cat cat dog bird", "dog"]).unwrap();
assert_eq!(hot.host_slice().to_vec(), [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0]);

// idf 重みを直接与える（OOV の重みは与えた重みの平均 1.5）。
let tv = TextVectorization::from_vocabulary_with_idf(config, &["cat", "dog"], &[1.0, 2.0])
    .unwrap();
let weighted = tv.transform_tf_idf(&["cat cat dog bird"]).unwrap();
assert_eq!(weighted.host_slice().to_vec(), [0.0, 1.5, 2.0, 2.0]);
```

## Options / Props

### TextVectorizationConfig（`#[non_exhaustive]`、`Default` + `with_*` ビルダ）

| Name | Type | Description |
| --- | --- | --- |
| `max_tokens` | `Option<usize>` | 予約 2 件を含む語彙数の上限。既定 `None`。`Some(m)` で `m <= 2` は `InvalidMaxTokens`。`adapt` は上位 `m - 2` 件で切り詰め、`from_vocabulary` は超過を `VocabularyTooLarge`（黙って切り詰めない） |
| `standardize` | `Standardize` | 既定 `LowerAndStripPunctuation` |
| `split` | `Split` | 既定 `Whitespace` |
| `ngrams` | `Option<usize>` | `Some(n)` で 1〜n-gram を作る。`n` は 1 以上かつ `limits` の上限以下。既定 `None` |
| `output_sequence_length` | `Option<usize>` | `Some(L)` で `L` に切り詰め / 0 埋め。`None` はバッチ内の最長に合わせる。既定 `None` |
| `pad_to_max_tokens` | `bool` | 既定 `false`。`true` なら出力モード系メソッドの列数 `W` を `max_tokens` に固定する（`max_tokens` が `None` だと構築時に `PadToMaxTokensWithoutMaxTokens`）。`false` は `W = vocabulary_size()` |
| `limits` | `TextLimits` | 非信頼入力の上限。既定 `TextLimits::default()` |

ビルダ: `with_max_tokens(usize)` / `with_standardize(Standardize)` / `with_split(Split)` / `with_ngrams(usize)` / `with_output_sequence_length(usize)` / `with_pad_to_max_tokens(bool)` / `with_limits(TextLimits)`。値の検査はビルダでは行わず `from_vocabulary` / `adapt` の構築時に行う。

### 出力モード系メソッドと idf（`TextVectorization`）

| Name | Description |
| --- | --- |
| `transform_multi_hot` | `[B, W]` の `Tensor<f32>`（出現すれば 1.0・しなければ 0.0） |
| `transform_count` | `[B, W]` の `Tensor<f32>`（各 id の出現回数。2^24 以下に限って厳密） |
| `transform_tf_idf` | `[B, W]` の `Tensor<f32>`（`count as f32 * idf[id]`、f32 の積 1 回）。idf を持たないインスタンスは入力を見る前に `MissingIdfWeights` |
| `from_vocabulary_with_idf(config, vocabulary, idf_weights)` | 語彙と idf 重みを直接指定。`idf_weights` は語彙と同じ順・同じ個数（予約 2 件を含まない）で、各値は有限かつ 0 以上（`-0.0` 可）。`idf[0]` = 0.0、`idf[1]`（OOV）= 与えた重みの平均、`idf[2..]` = 与えた重み。検査順は `pad_to_max_tokens` → `max_tokens`・語彙数・設定値 → 個数（`IdfWeightsLengthMismatch`）→ 各値（`InvalidIdfWeight`）→ 語彙 |
| `adapt_tf_idf(config, corpus)` | コーパスから語彙と idf を構築（語彙は `adapt` と同一）。idf は `ln(1 + N / (1 + df))`（自然対数。f64 で計算し 1 回だけ f32 へ。`N` = 文書数、`df` = 語を含む文書数で文書内の重複は 1）。`idf[1]`（OOV）は丸めた語彙 idf の平均、語彙が空なら 0.0 |
| `idf_weights()` | id 順の idf 重み（長さ = `vocabulary_size()`、index 0 = 0.0、1 = OOV、2.. = 語彙）。`from_vocabulary` / `adapt` で作ったインスタンスは `None` |

出力モード共通の規則: `ngrams` は適用し、`output_sequence_length` は無視する。id 0 になるトークン（`Split::None` と `""`）は数えない。`B = 0` は `[0, W]`。入力の件数・バイト数・出力要素数（`B × W`）は確保より先に検査し、1 行のトークン数が 2^24 を超えると `TokenCountNotExact`。Keras と違い `W` は予約 2 件ぶん大きい（意図した差）。

### Standardize / Split（いずれも `#[non_exhaustive]`）

| Name | Description |
| --- | --- |
| `Standardize::None` | 何もしない |
| `Standardize::Lower` | ASCII 大文字 `A`〜`Z` だけを小文字化 |
| `Standardize::StripPunctuation` | ASCII 句読点 32 文字（`char::is_ascii_punctuation`）だけを削除。空白へは置換しない |
| `Standardize::LowerAndStripPunctuation` | 小文字化してから句読点削除（既定） |
| `Standardize::UnicodeLower` | 各 `char` に `char::to_lowercase`（Unicode の単純な小文字化）を適用。句読点は除去しない。文脈非依存のため語末の `Σ` も `σ`、`ß` は不変、`ẞ` は `ß`、`İ` は `i` + U+0307（バイト長・文字数が増えうる）。標準化後のバイト数にも入力上限を適用（超過は `InputTooLong`）。Unicode 正規化は行わない |
| `Split::None` | 分割しない（入力全体を 1 トークン。空入力 `""` も 1 トークンで id 0） |
| `Split::Whitespace` | ASCII 空白（SP・TAB・LF・FF・CR）だけで分割（既定）。連続空白で空トークンは出ない |
| `Split::UnicodeWhitespace` | Unicode White_Space（`char::is_whitespace`）で分割。全角空白・NBSP・VT・NEL・U+2028 で区切り、ZWSP（U+200B）は区切らない。連続空白で空トークンは出ない |
| `Split::Character` | `char`（Unicode スカラー値）単位。書記素クラスタ単位ではなく、結合文字や ZWJ 絵文字は複数トークンに分かれる |

### TextLimits（フィールド非公開、`Default` + `with_*` が `Result<Self, TextError>`）

| `with_*` | 既定値 | 絶対上限 |
| --- | --- | --- |
| `with_max_batch`（バッチ要素数・コーパス件数） | 65,536 | なし |
| `with_max_input_bytes`（1 文字列のバイト数） | 1 MiB | `isize::MAX` |
| `with_max_corpus_bytes`（`adapt` のコーパス総バイト数） | 256 MiB | `isize::MAX` |
| `with_max_vocabulary_size`（予約 2 件を含む語彙数） | 2^24 | `i32::MAX` |
| `with_max_vocabulary_token_bytes`（語彙 1 件のバイト数） | 4 KiB | `isize::MAX` |
| `with_max_distinct_tokens`（`adapt` 中の異なり語数） | 2^24 | なし |
| `with_max_ngrams`（n-gram の n） | 8 | 8（下げる方向のみ） |
| `with_max_output_sequence_length` | 2^20 | なし |
| `with_max_output_elements`（出力 `B × L`） | 2^28 | `isize::MAX / 4` |

### TextError（`#[non_exhaustive]`、`Debug` + `Display` + `Error`）

入力文字列・語彙の中身を一切持たず、位置・長さ・件数・上限値だけを保持する。

| Variant | Description |
| --- | --- |
| `BatchTooLarge { len, max }` | バッチ要素数（`transform`）またはコーパス件数（`adapt`）が上限超過 |
| `InputTooLong { index, len, max }` | `index` 番目の入力のバイト数が上限超過（`Standardize::UnicodeLower` では `len` は標準化後のバイト数） |
| `CorpusTooLarge { total_bytes, max }` | コーパス総バイト数が上限超過（加算 overflow 時は `usize::MAX`） |
| `VocabularyTooLarge { len, max }` | 語彙数（予約 2 件を含む）が上限超過 |
| `VocabularyTokenTooLong { index, len, max }` | 語彙 1 件のバイト数が上限超過 |
| `EmptyVocabularyToken { index }` | 語彙が空文字列 |
| `ReservedVocabularyToken { index }` | 語彙が予約語 `"[UNK]"` |
| `DuplicateVocabularyToken { first, second }` | 語彙が重複 |
| `InvalidMaxTokens { max_tokens }` | `max_tokens` が 2 以下 |
| `InvalidNgrams { n, max }` | n が 0 または上限超過 |
| `OutputSequenceLengthTooLarge { len, max }` | `output_sequence_length` が上限超過 |
| `TooManyDistinctTokens { max }` | `adapt` 中の異なり語数が上限超過 |
| `OutputTooLarge { elements, max }` | 出力要素数 `B × L`（出力モード系は `B × W`）が上限超過・overflow |
| `LimitAboveAbsoluteMaximum { limit, value, max }` | `TextLimits::with_*` の設定値が絶対上限超過 |
| `NgramCountOverflow { tokens, n }` | n-gram 生成数の見積り `tokens × n` が `usize` 超過 |
| `FrequencyOverflow` | `adapt` で語の出現頻度（`u64`）が加算 overflow |
| `MissingIdfWeights` | `transform_tf_idf` を idf 重みを持たないインスタンス（`from_vocabulary` / `adapt` で作ったもの）で呼んだ |
| `IdfWeightsLengthMismatch { len, expected }` | `from_vocabulary_with_idf` の idf 重みの個数が語彙の個数と不一致（`expected` は予約 2 件を含まない語彙数） |
| `InvalidIdfWeight { index }` | `index` 番目の idf 重みが有限でない、または負（値は持たない） |
| `PadToMaxTokensWithoutMaxTokens` | `pad_to_max_tokens` が true なのに `max_tokens` が `None` |
| `TokenCountNotExact { index, count, max }` | `index` 番目の入力の（n-gram 込みの）トークン数が f32 で正確に数えられる上限 2^24 を超えた |
| `IdOutOfRange { index }` | `StringLookup` の逆引きで id が負または語彙数以上（string-lookup.md） |
| `Shape(ShapeError)` | テンソル形状の不整合（`source()` で返る唯一の variant） |

## Notes

- 既定と既存 variant の標準化・分割は ASCII 限定。`Lower` は `A`〜`Z` のみ、`StripPunctuation` は ASCII 句読点のみ、`Whitespace` は ASCII 空白のみで分割し、全角空白・NBSP では分割しない。非 ASCII の文字は変更されずそのまま語彙 lookup に渡る。Unicode 版は opt-in の `Standardize::UnicodeLower` / `Split::UnicodeWhitespace` で選び、既定値は変わらない。Unicode 正規化・書記素クラスタは対象外のまま
- id 割り当て: 0 = パディング（`""`）、1 = OOV（`"[UNK]"`）、2.. = 語彙。`from_vocabulary` は入力順、`adapt` は頻度降順で同頻度はバイト列の辞書順
- `adapt` はコーパス中の予約トークンを数えず、語彙 1 件のバイト数を検査しない。結果を既定 `TextLimits` の `from_vocabulary` に渡すと読み戻せない場合がある
- `from_vocabulary` の語彙は標準化されず、lookup はバイト完全一致（大小文字を区別）
- `transform`: `B = 0` は `[0, L]`（`output_sequence_length` が `None` なら `L = 0`）、`Some(0)` は `[B, 0]`。`Split::None` と空入力 `""` は id 0 でパディングと区別できない。切り詰めは先頭 `L` 個を残す。`with_max_output_sequence_length` は `Some(L)` にだけ適用され、`None` で導いた `L` は出力要素数の上限で抑える
- n-gram は全 1-gram → 全 2-gram → … → 全 n-gram の順で、各 k-gram は連続 k トークンを半角空白 1 つで連結する。`Split::Character` では空白自体がトークンになるため連結結果に空白が続くことがある。Keras との順序一致は契約にしない
- `ngrams` / `output_sequence_length` / `max_tokens` は構築時に検査する。入力の件数・バイト数の上限は標準化・分割・確保より先に検査する。判定方式は整数の完全一致で、Keras との bit 互換は契約にしない
- `Debug` は設定と語彙件数だけを出し、語彙の全文は出さない
- 範囲外: サブワードトークナイザ・Unicode 正規化・書記素クラスタ分割・語彙のファイル保存 / 読み込み・ragged 出力。`StringLookup` 自体の出力モード・`num_oov_indices`・`mask_token`・`oov_token` も対象外
- 出力モードの判定: count / multi_hot は完全一致、tf_idf は同じ式から作った値との bit 一致。Keras との bit 互換は契約にしない
- Migration (v0.11 → v0.14): 0.11.0 の本ページは公開 6 名・ASCII 限定で、出力モード（`multi_hot` / `count` / `tf_idf`）と `StringLookup` 相当を範囲外としていた。0.14.0 は上記の出力モード系メソッド・`pad_to_max_tokens`・`Standardize::UnicodeLower`・`Split::UnicodeWhitespace`・`StringLookup` / `StringLookupConfig` と `TextError` の新 variant を追加し、公開は 8 名になった
- `text` は `data` と別モジュールだが、ファイル数が少ないため本カテゴリに置いている
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/text/struct.TextVectorization.html（0.14.0, 取得日 2026-11-14）。出力モード・Unicode variant の挙動はタグ v0.14.0 の `src/text/mod.rs`・`vectorization.rs`・`standardize.rs`・`split.rs`・`error.rs` rustdoc

## Related

- [dataset.md](./dataset.md)
- [dataloader.md](./dataloader.md)
- [string-lookup.md](./string-lookup.md)
