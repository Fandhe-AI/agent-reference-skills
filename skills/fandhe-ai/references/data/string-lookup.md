---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/text/struct.StringLookup.html
---

# text::StringLookup / StringLookupConfig（分割済みトークンの語彙 lookup）

標準化・分割をせず、利用者が渡したトークン 1 件を 1 つの `i32` id へ引く（順引き `lookup`）と、id から文字列へ戻す（逆引き `token` / `invert`）語彙表（Keras `StringLookup` 相当の最小形）。内部は `TextVectorization` と同じ語彙表なので、同じ語彙なら同じ id になる（0 = パディング `""`、1 = OOV `"[UNK]"`、2.. = 語彙）。ホスト側だけで完結しバックエンドに依存しない。

## Signature / Usage

```rust
use fandhe_ai::text::{StringLookup, StringLookupConfig, TextError};

let sl = StringLookup::from_vocabulary(StringLookupConfig::default(), &["Cat", "dog"]).unwrap();
let ids = sl.lookup(&["Cat", "cat", "dog", ""]).unwrap();
assert_eq!(ids.shape(), &[4]);
assert_eq!(ids.host_slice().to_vec(), [2, 1, 3, 0]);
assert_eq!(sl.token(3).unwrap(), "dog");
assert!(matches!(sl.token(9), Err(TextError::IdOutOfRange { index: 0 })));
assert_eq!(sl.invert(&ids).unwrap(), ["Cat", "[UNK]", "dog", ""]);

// 予約語は語彙に入れられない。
let err = StringLookup::from_vocabulary(StringLookupConfig::default(), &["[UNK]"]).unwrap_err();
assert!(matches!(err, TextError::ReservedVocabularyToken { index: 0 }));
```

```rust
impl StringLookup {
    pub fn from_vocabulary<S: AsRef<str>>(config: StringLookupConfig, vocabulary: &[S])
        -> Result<Self, TextError>;
    pub fn adapt<S: AsRef<str>>(config: StringLookupConfig, tokens: &[S])
        -> Result<Self, TextError>;
    pub fn lookup<S: AsRef<str>>(&self, tokens: &[S]) -> Result<Tensor<i32>, TextError>;
    pub fn token(&self, id: i32) -> Result<&str, TextError>;
    pub fn invert(&self, ids: &Tensor<i32>) -> Result<Vec<String>, TextError>;
    pub fn vocabulary(&self) -> &[String];
    pub fn vocabulary_size(&self) -> usize;   // 予約 2 件を含む
    pub fn config(&self) -> &StringLookupConfig;
}
```

## Options / Props

### StringLookupConfig（`#[non_exhaustive]`、`Default` + `with_*` ビルダ）

| Name | Type | Description |
| --- | --- | --- |
| `max_tokens` | `Option<usize>` | 予約 2 件を含む語彙数の上限。既定 `None`（無制限。`limits` の上限は常に適用）。2 以下は `InvalidMaxTokens`。`from_vocabulary` は超過を `VocabularyTooLarge`、`adapt` は上位 `m - 2` 件で切り詰める |
| `limits` | `TextLimits` | 件数・バイト数の上限。既定 `TextLimits::default()` |

ビルダ: `with_max_tokens(usize)` / `with_limits(TextLimits)`。

### StringLookup のメソッド

| Name | Description |
| --- | --- |
| `from_vocabulary` | 語彙を直接指定。id は入力順に 2 から振る。検査順（確保より先）: `max_tokens`（`InvalidMaxTokens`）→ 語彙数が `max_tokens` 超か（`VocabularyTooLarge`。黙って切り詰めない）→ 件数・バイト長・空（`EmptyVocabularyToken`）・予約語 `"[UNK]"`（`ReservedVocabularyToken`）・重複（`DuplicateVocabularyToken`） |
| `adapt` | トークン列から頻度順に語彙を構築。各要素を 1 トークンとして数える（空白を含んでも分割しない）。`""`・`"[UNK]"` は数えない。頻度降順で同頻度はバイト列の辞書順。`max_tokens` が `Some(m)` なら上位 `m - 2` 件で切り詰める |
| `lookup` | トークン列を id 列 `[N]` の `Tensor<i32>` へ引く。語彙にない語は 1（OOV）、`""` は 0。`N = 0` は形状 `[0]`。件数（`BatchTooLarge`）・各要素のバイト数（`InputTooLong`）・出力要素数（`OutputTooLarge`）を確保より先に検査 |
| `token` | id から文字列へ戻す（逆引き）。負または語彙数以上の id は `IdOutOfRange { index: 0 }` |
| `invert` | id のテンソルを行優先で平坦化して文字列列へ戻す（rank は問わない）。検査順（確保より先）: 件数（`OutputTooLarge`）→ 各 id の範囲（`IdOutOfRange`。`index` は最初の範囲外の位置）→ 出力の総バイト数（`TextLimits` の `max_corpus_bytes` を流用し、超過は `CorpusTooLarge`） |
| `vocabulary` / `vocabulary_size` / `config` | id 順の語彙（予約 2 件を先頭に含む）/ 語彙数 / 構築に使った設定 |

## Notes

- 公開形の正は `docs/facade-text-output-modes-string-lookup-decision.md` §4・§5・§7。lookup はバイト完全一致で大小文字を区別する
- Keras の既定（OOV = 0）とは意図して違える（`Var::embedding(.., Some(0))` との整合のため）。Keras との bit 互換は契約にしない
- `num_oov_indices`・`mask_token`・`oov_token`・語彙ファイルは対象外
- `adapt` は語彙 1 件のバイト数を検査しないので、結果を既定の `TextLimits` の `from_vocabulary` へ渡すと読み戻せない場合がある
- 範囲外 id で panic しない。エラーと `Debug` は入力文字列・語彙の全文を持たない（`Debug` は設定と語彙の件数のみ）
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/text/struct.StringLookup.html（0.14.0, 取得日 2026-11-14）。契約・検査順はタグ v0.14.0 の `src/text/lookup.rs` rustdoc

## Related

- [text-vectorization.md](./text-vectorization.md)
- [dataset.md](./dataset.md)
