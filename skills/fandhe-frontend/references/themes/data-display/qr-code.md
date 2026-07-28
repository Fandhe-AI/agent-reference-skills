# QrCode

QR コードを表示する styled コンポーネント。`fandhe-frontend-headless-ui::qr_code`（Frame/Pattern/Overlay 3 パーツ、外部依存なしの QR Model 2 エンコーダ）を薄くラップし、寸法 variant の CSS を追加する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::qr_code::{self, encode, ErrorCorrectionLevel, DEFAULT_QUIET_ZONE};
use fandhe_frontend_pre_styled_ui::Size;

let matrix = encode("https://example.com", ErrorCorrectionLevel::L).unwrap();
let node = qr_code::root(Size::Md, vec![], vec![
    qr_code::frame(&matrix, DEFAULT_QUIET_ZONE, None, vec![], vec![]),
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
| `root: size` | `Size` (`Sm`/`Md`/`Lg`) | `Md` | 寸法（`--fandhe-qr-code-size`）。`root` のみへクラス付与 |
| `encode(data, level)` | `fn(&str, ErrorCorrectionLevel) -> Result<QrMatrix, QrEncodeError>` | — | 文字列を QR 行列へエンコードする純粋関数（headless-ui 由来） |
| `frame`/`pattern`/`overlay` | 再エクスポート | — | `fandhe_frontend_headless_ui::qr_code::{frame, pattern, overlay}` に委譲 |

## Notes

- 前景色（`pattern` の `fill`）・背景色（`frame` の `background`）は固定トークンで、`color-palette` variant は提供しない（低コントラスト組み合わせによる読み取り精度低下を避ける設計判断）。
- canvas 描画 + ダウンロードの `DownloadTrigger` はスコープ外。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [primitives/display/qr-code](../../primitives/display/qr-code.md)
