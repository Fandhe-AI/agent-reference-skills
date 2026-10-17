---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/crypto.rs
---

# crypto

engine クレートが自作する暗号プリミティブの公開窓口（`engine::crypto`）。外部の暗号系クレートには依存せず標準ライブラリのみで実装し、`unsafe` は使わない。現状の公開サブモジュールは `sha256`（FIPS 180-4 の自作 SHA-256）のみ。

## Signature / Usage

```rust,ignore
// crypto.rs
pub mod sha256;

// crypto/sha256.rs

/// ストリーミング更新型の SHA-256 状態（Issue #399）。固定長スタックバッファ
/// （64 バイト）のみを使い、入力長に比例したヒープ確保は行わない。
///
/// `wire-server` の HMAC-SHA-256（Issue #940・WIRE-18）は ipad/opad 適用後の
/// 状態を `Clone` して使い回すため `Clone` を実装する。
#[derive(Clone)]
pub struct Sha256 { /* private fields */ }

impl Sha256 {
    pub fn new() -> Self
    pub fn update(&mut self, data: &[u8])
    /// FIPS 180-4 5.1.1 節のパディング（`0x80` 1 バイト → 零埋め → 8 バイト BE
    /// ビット長）をブロックバッファ経由で適用してからダイジェストを取り出す。
    pub fn finalize(mut self) -> [u8; 32]
}

impl Default for Sha256 {
    fn default() -> Self
}

/// 一括ハッシュのヘルパー（`wire-server` の HMAC-SHA-256／PBKDF2・
/// `recovery::content_hash` のテストから使う）。
pub fn digest(input: &[u8]) -> [u8; 32]
```

使用例（原文テストの既知ベクタ、FIPS 180-4 "abc"）:

```rust,ignore
let d = digest(b"abc");
// hex(&d) == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"

let mut hasher = Sha256::new();
for chunk in input.chunks(chunk_size) {
    hasher.update(chunk);
}
let out = hasher.finalize();
```

## Notes

- 依存最小方針（`.claude/rules/dependency-policy.md`）により外部の暗号系クレートに依存しない。`unsafe` 不使用、mod 2^32 加算は `wrapping_*` 演算で行う（未定義動作にならない）。
- 元は `recovery::content_hash`（TASK-101・RECOVER-10）の private 実装。`wire-server` の SCRAM-SHA-256 認証（Issue #940・WIRE-18・TASK-222）の HMAC-SHA-256／PBKDF2 が同じ SHA-256 圧縮関数を必要としたため engine の公開 API へ昇格した。`wire-server` は engine に依存するため、両クレートが単一実装を共有できる。
- 移設前後で出力バイト列・`recovery::content_hash` の既存 `ContentHash` 値はすべて不変（等価性テストで確認、と原文 doc comment に記載）。
- メッセージスケジュールは 64 語配列ではなく 16 語のローリングバッファ（`w[t & 15]`）で保持する（Issue #399）。`recovery::content_hash` の `HashInputBuilder` が各 `push_*` から `Sha256::update` を直接呼ぶことで、入力全体の連結と再複製の 2 回の全量コピーを避ける設計。
- `compress`・`H0` は `pub(crate)`（非公開）。公開 API は `Sha256`（`new` / `update` / `finalize` / `Default` / `Clone`）と `digest` のみ。
- `digest_reference`（旧実装の参照実装）は `#[cfg(test)]` 限定で、ストリーミング版との等価性テストにのみ使う。
- テストは FIPS テストベクタ（"abc"・2 ブロック入力）、空入力、NIST の 1,000,000 個の `a`、境界長（0 / 1 / 55 / 56 / 57 / 63 / 64 / 65 / 127 / 128 / 129 / 1000）、分割 `update` の一致を確認している。
- 0.2.0 のソースで確認できる範囲の記述。HMAC / PBKDF2 / SCRAM の実装自体は `wire-server` 側で、本ページの対象外。

## Related

- [policy](./policy.md)
- [tenant](./tenant.md)
- [rls](./rls.md)
