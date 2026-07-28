# QrCode

QR コード表示の headless コンポーネント。Root / Frame / Pattern / Overlay の 4 anatomy パーツと、QR Model 2（ISO/IEC 18004）byte モードの外部依存ゼロエンコーダを提供する。開閉・選択のような遷移可能な状態を持たないため状態機械は無く、自由関数のみで構成される。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::qr_code::{encode, root, frame, pattern, ErrorCorrectionLevel, DEFAULT_QUIET_ZONE};

let matrix = encode("https://example.com", ErrorCorrectionLevel::L).unwrap();
let node = root(vec![], vec![
    frame(&matrix, DEFAULT_QUIET_ZONE, Some("QR code"), vec![], vec![
        pattern(&matrix, DEFAULT_QUIET_ZONE, vec![]),
    ]),
]);
```

## Anatomy

```
root
  frame
    pattern
    overlay
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `encode: value` | `&str` | 必須 | 符号化対象文字列。マークアップへは一切出力されない |
| `encode: ecc` | `ErrorCorrectionLevel` | `L` | 誤り訂正レベル（`L`≒7% / `M`≒15% / `Q`≒25% / `H`≒30%） |
| `frame: quiet_zone` | `u32` | `DEFAULT_QUIET_ZONE`（4） | 静粛帯モジュール数（ISO/IEC 18004 準拠） |
| `frame: aria_label` | `Option<&str>` | `None` | 指定時のみ `aria-label` を付与。未指定でも `role="img"` は常に出力 |

## Notes

- `encode` は `Result<QrMatrix, QrEncodeError>` を返す（`QrEncodeError::TooLong` はバージョン 40 の最大容量超過時）。バージョン・マスクは決定的に選択され、同一入力は常に同一のモジュール行列を返す。
- `pattern` の `d` 属性値は暗モジュール座標から内部生成される固定文字集合（`M`/`h`/`v`/`z`/数字/`,`/`-`）のみで構成され、`value` 文字列由来のバイトが混入する経路はない。
- `frame`（SVG）は `role="img"` を固定付与する。`overlay` はロゴ等を中央に重ねるコンテナ（可視スタイルは呼び出し側/styled 層の責務）。
- `DownloadTrigger`（canvas 描画・ダウンロード）や `value` の動的更新は本モジュールのスコープ外。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Progress](./progress.md)
