---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/error_response.rs
---

# error_response

`engine::error_format::ErrorClass` → PostgreSQL wire `ErrorResponse`（'E'）バイト列の横断写像（TASK-153、対象ビヘイビア ERR-1）。責務境界は engine 側の `ErrorClass`（`wire_code`・SSOT は `engine::error_format`）を入力に取り、wire プロトコルの `ErrorResponse` フィールド構成（severity/SQLSTATE/message）へ整形することのみ。ソケットへの書き込みは行わず `Vec<u8>` を返す純関数のみで構成する（[result-encoder.md](./result-encoder.md) と同じ方針）。

## Signature / Usage

~~~rust,ignore
use crate::result_encoder::{frame_len, push_s_c_m_fields, EncodeError};

fn reject_embedded_nul(message: &str) -> Result<(), EncodeError> {
    if message.as_bytes().contains(&0) {
        return Err(EncodeError);
    }
    Ok(())
}

const fn severity_for(class: ErrorClass) -> &'static str {
    match class {
        ErrorClass::ConnectionLimitExceeded => "FATAL",
        _ => "ERROR",
    }
}

fn wrap_frame(body: Vec<u8>) -> Result<Vec<u8>, EncodeError> {
    let total_len = frame_len(body.len())?;
    let mut msg = Vec::with_capacity(1 + body.len() + 4);
    msg.push(b'E');
    msg.extend_from_slice(&total_len.to_be_bytes());
    msg.extend_from_slice(&body);
    Ok(msg)
}

pub fn encode(class: ErrorClass, message: &str) -> Result<Vec<u8>, EncodeError> {
    reject_embedded_nul(message)?;
    let mut body = Vec::new();
    push_s_c_m_fields(&mut body, severity_for(class), class.wire_code(), message);
    body.push(0); // フィールド終端
    wrap_frame(body)
}
~~~

## Notes

- `severity_for` は `ErrorClass::ConnectionLimitExceeded` のみ `FATAL`、それ以外は `ERROR` を返す（`limits.rs::reject_too_many_connections` の独自実装〔`FATAL` 固定〕と分類基準が分散しないよう、この判定は本モジュールに閉じる）。
- `D`（detail）フィールドの wire フォーマット仕様は確認できていないため、`encode()` はどの分類でも detail を付加しない（`RECOVER-5` (3) ポインタ）。
- ADR `error-enum-non-exhaustive-policy`（Accepted）: 既存公開エラー enum（`ErrorClass` を含む）へ遡って `#[non_exhaustive]` は付与しない方針。バリアント追加は PR 説明・コミットフッターで breaking change として明記し、新バリアント追加時に `wire_code` 写像漏れをコンパイル時検出できる状態（exhaustive `match`）を維持する。

## Related

- [result-encoder.md](./result-encoder.md)
- [limits.md](./limits.md)
- [protocol-dispatch.md](./protocol-dispatch.md)
