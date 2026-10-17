---
source: https://docs.rs/crate/fandhe-ai/0.11.0/source/examples/hf_safetensors_sequential/main.rs
---

# HF Safetensors into Sequential

PyTorch / HF レイアウトの safetensors を読み込み、`compat::Sequential`（Embedding → TransformerEncoderLayer）へ復元して元モデルと bit 一致を確認する。

Adapted (not in the official docs): 例 3（batch decode）と一部の `println!` を省略。

```rust
#[path = "convert.rs"]
mod convert;

use fandhe_ai::Tensor;
use fandhe_ai::compat::Sequential;
use fandhe_ai::interop::safetensors::{load_safetensors_f32, require_keys, save_safetensors_f32};

// モデル構成（意図的に小さい。example の実行時間・可読性のため）。
const VOCAB: usize = 6;
const EMBED_DIM: usize = 8;
const NUM_HEADS: usize = 2;
const FEED_FORWARD: usize = 16;
const BATCH: usize = 2;
const SEQ_LEN: usize = 3;

fn build_model(seed: u64) -> Result<Sequential, Box<dyn std::error::Error>> {
    let model = Sequential::new()
        .add_embedding(VOCAB, EMBED_DIM, /* padding_idx = */ None, seed)?
        .add_transformer_encoder(EMBED_DIM, NUM_HEADS, FEED_FORWARD, seed + 1)?;
    Ok(model)
}

fn ids_tensor(ids: &[[i32; SEQ_LEN]; BATCH]) -> Tensor<f32> {
    let mut data = Vec::with_capacity(BATCH * SEQ_LEN);
    for row in ids {
        for &v in row {
            data.push(v as f32);
        }
    }
    Tensor::new(data, &[BATCH, SEQ_LEN]).expect("固定 shape の構築は失敗しない")
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    fandhe_ai::manual_seed(2080);

    // --- 合成チェックポイントの用意（HF チェックポイントの代替） ---
    let source_model = build_model(/* seed = */ 42)?;
    let fandhe_state = source_model.state_dict();
    let mut pt_layout = convert::to_pytorch_layout(&fandhe_state)?;

    // 余剰テンソル（LM head 等）を 1 つ加え、`from_pytorch_layout` の
    // allowlist 分離を実演する。
    let lm_head = fandhe_ai::rand(&[VOCAB, EMBED_DIM])?; // PyTorch 慣習 [out, in]
    pt_layout.insert("lm_head.weight".to_string(), lm_head.clone());

    let temp_dir_guard = convert::TempDirGuard::create("example")?;
    let checkpoint_path = temp_dir_guard.checkpoint_path();
    save_safetensors_f32(&checkpoint_path, &pt_layout)?;

    // === 例 1: load_safetensors_f32（パス版）＋ require_keys ===
    let loaded = load_safetensors_f32(&checkpoint_path)?;
    let mut expected_keys: Vec<&str> = pt_layout.keys().map(String::as_str).collect();
    expected_keys.sort_unstable();
    require_keys(&loaded, &expected_keys)?;

    // === 例 2: from_pytorch_layout による復元 → load_state_dict ===
    let (restored_state, extra) = convert::from_pytorch_layout(&loaded, &["lm_head.weight"])?;
    let mut restored_model = build_model(/* seed = */ 999)?; // 元と異なる seed で初期化
    restored_model.load_state_dict(restored_state)?;

    // 元モデルと復元モデルの推論結果が bit 完全一致することを確認する
    let probe_ids = ids_tensor(&[[0, 1, 2], [3, 4, 5]]);
    let out_source = source_model.predict(&probe_ids)?;
    let out_restored = restored_model.predict(&probe_ids)?;
    let bit_exact = tensors_bit_exact(&out_source, &out_restored);
    println!("例 2: 元モデルと復元モデルの推論出力はビット一致: {bit_exact}");
    if !bit_exact {
        return Err("復元モデルの出力が元モデルと一致しない".into());
    }

    // 例 3（batch decode の greedy / top-k）のスケッチは原本 L118-L172 を参照。
    let _ = extra;
    drop(temp_dir_guard);
    Ok(())
}

fn tensors_bit_exact(a: &Tensor<f32>, b: &Tensor<f32>) -> bool {
    if a.shape() != b.shape() {
        return false;
    }
    let a_c = a.contiguous();
    let b_c = b.contiguous();
    let (Some(a_s), Some(b_s)) = (a_c.as_slice(), b_c.as_slice()) else {
        return false;
    };
    a_s.iter().zip(b_s).all(|(x, y)| x.to_bits() == y.to_bits())
}
```

実行（リポジトリ内）: `cargo run -p fandhe-ai --example hf_safetensors_sequential`

## Notes

- 上のコードは原本 `main.rs`（214 行）から例 3（batch decode）と一部の `println!` を省いた抜粋で、省略箇所は原本どおりではない。完全版は出典の `main.rs` を参照
- `convert.rs`（780 行。`to_pytorch_layout` / `from_pytorch_layout` / `TempDirGuard`）は省略した。`convert` は example 同梱のモジュールで `fandhe-ai` の公開 API ではないため、外部プロジェクトでは `#[path]` 取り込み用に `convert.rs` ごとコピーする必要がある
- 実 HF ハブからのダウンロードは行わず、オフライン・決定的（`manual_seed` 固定）。F32 以外（bf16 / f16 等）のチェックポイントは Python 側で事前に F32 変換する必要がある（原本コメントの案内）
- `add_transformer_encoder` は非 causal・mask なしの self-attention のため、例 3 の decode は機構の例示で causal LM としての確率は与えない（原本コメント）
- この環境では `cargo check` を実行できなかったため、省略後の抜粋のコンパイル検証は未実施
