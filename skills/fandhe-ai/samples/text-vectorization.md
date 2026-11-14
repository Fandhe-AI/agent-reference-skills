---
source: https://docs.rs/crate/fandhe-ai/0.14.0/source/src/text/mod.rs
---

# Text Vectorization

`TextVectorization`（Keras `TextVectorization` 相当）で文字列を整数 id にし、`Var::embedding` へ渡す。後半は出力モード（count / multi-hot / tf-idf）で `[B, W]` の `f32` 特徴量にする。

```rust
use fandhe_ai::Tensor;
use fandhe_ai::text::{
    Standardize, TextError, TextVectorization, TextVectorizationConfig,
};

fn main() {
    let config = TextVectorizationConfig::default().with_output_sequence_length(4);
    let tv = TextVectorization::adapt(config, &["the cat sat", "the dog"]).unwrap();
    // 語彙: [""(0), "[UNK]"(1), "the"(2), "cat"(3), "dog"(4), "sat"(5)]
    assert_eq!(tv.vocabulary_size(), 6);

    let ids = tv.transform(&["The cat!", "a bird"]).unwrap();
    assert_eq!(ids.shape(), &[2, 4]);
    // 標準化で小文字化・句読点除去。語彙にない語は 1（OOV）、足りない分は 0 埋め。
    assert_eq!(ids.host_slice().to_vec(), [2, 3, 0, 0, 1, 1, 0, 0]);

    // id はそのまま Var::embedding に渡せる（padding_idx = Some(0)）。
    let dim = 3;
    let rows = tv.vocabulary_size();
    let table = Tensor::<f32>::new((0..rows * dim).map(|i| i as f32).collect(), &[rows, dim])
        .unwrap();
    let tape = fandhe_ai::tape();
    let weight = tape.var(&table);
    let embedded = weight.embedding(&ids, Some(0)).unwrap();
    assert_eq!(embedded.to_tensor().shape(), &[2, 4, 3]);

    // 語彙を直接指定する場合（lookup は大小文字を区別した完全一致）。
    let config = TextVectorizationConfig::default().with_standardize(Standardize::None);
    let tv = TextVectorization::from_vocabulary(config.clone(), &["Cat", "dog"]).unwrap();
    let ids = tv.transform(&["Cat cat dog"]).unwrap();
    assert_eq!(ids.host_slice().to_vec(), [2, 1, 3]); // "cat" は語彙の "Cat" と別物で OOV

    // 予約語は語彙に入れられない。
    let err = TextVectorization::from_vocabulary(config, &["[UNK]"]).unwrap_err();
    assert!(matches!(err, TextError::ReservedVocabularyToken { index: 0 }));
}
```

出力モード（0.14.0。`Linear` へそのまま渡せる `f32` の `[B, W]`。列 i = id i）:

```rust
use fandhe_ai::text::{Standardize, TextVectorization, TextVectorizationConfig};

fn main() {
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
}
```

## Notes

- コードは `src/text/mod.rs`（0.14.0）モジュール doc の例を `main` にまとめたもの（上流では doctest）。最後の `main` は 0.14.0 で追加された出力モード（`transform_count` / `transform_multi_hot` / `from_vocabulary_with_idf` + `transform_tf_idf`）の例
- id は 0 = パディング、1 = OOV（`"[UNK]"`）、2.. = 語彙。既定の小文字化・句読点除去・空白分割は ASCII に限る（Unicode 版は opt-in の `Standardize::UnicodeLower` / `Split::UnicodeWhitespace`）
- 公開型は `fandhe_ai::text` 配下の 8 名（`TextVectorization` / `TextVectorizationConfig` / `TextLimits` / `Standardize` / `Split` / `TextError` / `StringLookup` / `StringLookupConfig`）のみで、クレートルートへは再エクスポートされない。サブワードトークナイザ・語彙の保存／読み込みは対象外
- `fandhe-ai =0.14.0` に対し、本ページのコード（`main` ごと）を `cargo check` で確認し、実行して `assert` が通ることも確認済み（2026-11-14）
