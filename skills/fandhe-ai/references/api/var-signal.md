---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.StftOptions.html
---

# Var: FFT / STFT

`Var` の FFT（rfft / irfft / fft / ifft）と短時間 FFT（stft / istft）メソッド、およびオプション型・正規化種別（`StftOptions` / `IstftOptions` / `FftNorm` / `StftPadMode`）。複素数は末尾次元 2 の f32 実テンソル `(re, im)` で表す（complex dtype は非目標）。

## Signature / Usage

```rust
use fandhe_ai::{FftNorm, StftOptions};

let tape = fandhe_ai::tape();
let x = tape.var(&signal);                                    // 実 [L]
let spec = x.rfft(None, None, FftNorm::Backward)?;            // [n/2+1, 2]
let frames = x.stft(512, None, &StftOptions::default().with_hop_length(128))?; // [N, T, 2]
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `rfft(&self, n: Option<usize>, dim: Option<usize>, norm: FftNorm) -> Result<Var<'t>, AutodiffError>` | メソッド | 実入力 `[..., L, ...]` から `[..., n/2+1, ..., 2]`。`n` 省略時は変換軸の長さ、`dim` 省略時は末尾軸。変換前に長さ `n` へ切り詰め / ゼロ詰め |
| `irfft(&self, n: Option<usize>, dim: Option<usize>, norm: FftNorm) -> Result<Var<'t>, AutodiffError>` | メソッド | 複素入力 `[..., m, ..., 2]` から実 `[..., n, ...]`。`n` 省略時は `2*(m-1)`（`m == 1` で省略すると `InvalidArgument`）。`dim` は複素軸を除いた実軸の添字（既定は rank-2）。DC と（`n` 偶数の）Nyquist の虚部は無視 |
| `fft(&self, n: Option<usize>, dim: Option<usize>, norm: FftNorm) -> Result<Var<'t>, AutodiffError>` | メソッド | 複素入力 `[..., L, ..., 2]` から `[..., n, ..., 2]`。実入力の自動昇格（虚部 0 の付加）はしない。rank・末尾次元 2 を検査して拒否 |
| `ifft(&self, n: Option<usize>, dim: Option<usize>, norm: FftNorm) -> Result<Var<'t>, AutodiffError>` | メソッド | `fft` と引数・検査・経路が同じで、符号とスケールだけが逆 |
| `stft(&self, n_fft: usize, window: Option<&Tensor<f32>>, options: &StftOptions) -> Result<Var<'t>, AutodiffError>` | メソッド | 実 `[L]` / `[B, L]` から `[N, T, 2]` / `[B, N, T, 2]`（周波数軸がフレーム軸より前）。`N = n_fft/2+1`（`onesided`）または `n_fft`、`T = 1 + (L_pad − n_fft)/hop`。`window` は rank 1・長さ `win_length`（`None` は矩形窓）で、`win_length < n_fft` なら中央寄せでゼロ詰め |
| `istft(&self, n_fft: usize, window: Option<&Tensor<f32>>, options: &IstftOptions) -> Result<Var<'t>, AutodiffError>` | メソッド | `[N, T, 2]` / `[B, N, T, 2]` から実 `[L_out]` / `[B, L_out]`。窓二乗の重畳和（包絡）が `1e-11` 未満（NOLA 違反）なら `InvalidArgument` |
| `FftNorm` | `#[non_exhaustive] enum { Backward, Ortho, Forward }`（`Default` は `Backward`） | 順変換 / 逆変換のスケール。`Backward`: 1 / `1/n`、`Ortho`: `1/√n` / `1/√n`、`Forward`: `1/n` / 1。係数は `forward_scale(n)` / `inverse_scale(n)` で取得 |
| `StftPadMode` | `#[non_exhaustive] enum { Reflect, Constant }`（`Default` は `Reflect`） | `center = true` 時の端パディング。`Reflect` は端点を含めない反射（片側幅 `n_fft/2` は信号長 `L` 未満が必要）、`Constant` は 0 で拡張。`replicate` / `circular` は非対応 |
| `StftOptions` | `#[non_exhaustive] struct { hop_length: Option<usize>, win_length: Option<usize>, center: bool, pad_mode: StftPadMode, normalized: bool, onesided: bool }` | 既定: `hop_length = None`（`n_fft/4`。`n_fft < 4` は拒否）、`win_length = None`（`n_fft`）、`center = true`、`pad_mode = Reflect`、`normalized = false`（`true` で `1/√n_fft`）、`onesided = true`（`n_fft/2+1` bin）。ビルダ: `with_hop_length` / `with_win_length` / `with_center` / `with_pad_mode` / `with_normalized` / `with_onesided` |
| `IstftOptions` | `#[non_exhaustive] struct { hop_length: Option<usize>, win_length: Option<usize>, center: bool, normalized: bool, onesided: Option<bool>, length: Option<usize> }` | 既定: `hop_length = None`（`n_fft/4`、`win_length` 以下が必要）、`win_length = None`、`center = true`（両端 `n_fft/2` を切り落とす）、`normalized = false`、`onesided = None`（入力 bin 数 ≠ `n_fft` なら片側と推定。`Some(false)` は先頭 `n_fft/2+1` bin だけを読む）、`length = None`（期待長を超える分は 0 詰め）。ビルダ: `with_hop_length` / `with_win_length` / `with_center` / `with_normalized` / `with_onesided` / `with_length` |

## Notes

- 窓は非追跡の `Tensor<f32>` で、窓への勾配は流れない（PyTorch との差分。入力信号 / スペクトルへの勾配のみ）
- 検査（rank・`dim`・`n >= 1`・入出力の要素数 / バイト数・フレーム数・反射パディング幅）は実体化より前に行い、違反は型付きエラー。非有限入力は拒否せず伝播する（linalg 系の「非有限は `InvalidArgument`」とは異なる）
- 内部は f64 の逐次・固定順序で最後に 1 回だけ f32 へ downcast。直接 DFT のため 1 レーンあたり O(n²)
- `dim` は `usize`（負の添字は受けない）。高階微分（`create_graph`）・activation checkpoint・f64 自動微分経路は対象外
- バックエンドが `Unsupported` を返したときのみホスト参照カーネルへフォールバックする

## Related

- [var](./var.md)
- [var-elementwise](./var-elementwise.md)
- [var-linalg](./var-linalg.md)
