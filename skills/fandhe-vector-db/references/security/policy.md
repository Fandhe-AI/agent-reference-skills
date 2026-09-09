---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/policy.rs
---

# policy

`PolicyContext` / `PolicyError` を定義するモジュール。アクセス主体のテナント境界・許可可視性ラベル集合を保持し、行の可視性判定（読み取り）とテナント所有権判定（書き込み）を単一の照合 API に集約する。呼び出し元は `rls.rs` の `ImplicitRlsHook` / `PrefilterIndex` / `SearchTimeFilter` / `RlsSafetyNet` と `tenant.rs` の各関数。

## Signature / Usage

```rust,ignore
/// [`PolicyContext::new`] の構築時検証で発生するエラー。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum PolicyError {
    /// 空のテナント ID はテナント境界判定を曖昧にするため拒否する（fail-closed。
    /// `storage.rs::RowInput::tenant_id` の既存方針と整合）。
    EmptyTenantId,
    /// テナント ID のバイト長が [`crate::storage::MAX_TENANT_ID_LEN`] を超過した。
    /// storage 層（`encode_row`/`decode_row`）が受理する行の `tenant_id` 上限と
    /// 同一の定数をそのまま参照する（二重定義しない）。
    TenantIdTooLong { len: usize, max: u16 },
}

/// 呼び出し元（プロトコル層 → `core.rs`）が渡すアクセス主体のテナント境界・可視性文脈。
///
/// テナント ID と許可可視性ラベル集合を同居させ、判定 API を [`Self::is_visible`] に
/// 集約する（CORE-2: 独立のテナント層を作らない設計）。既定は最も狭い許可
/// （`Public` のみ）で、`Private` を見せるには構築時に明示付与する。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PolicyContext

impl PolicyContext {
    /// `Public` のみ可視の `PolicyContext` を構築する（既定・最小権限）。
    /// 空テナント ID・[`crate::storage::MAX_TENANT_ID_LEN`] 超過は `Err`（fail-closed）。
    pub fn new(tenant_id: &str) -> Result<Self, PolicyError>

    /// 許可可視性ラベル集合を明示指定して構築する。`Private` を見せる呼び出し元は
    /// ここへ明示的に `Visibility::Private` を含める必要がある（黙示の昇格を許さない）。
    pub fn with_visibilities(
        tenant_id: &str,
        visibilities: impl IntoIterator<Item = Visibility>,
    ) -> Result<Self, PolicyError>

    /// このコンテキストが属するテナント ID。
    #[inline]
    pub fn tenant_id(&self) -> &str

    /// テナント一致判定と可視性ラベル評価を単一の照合パスで行う
    /// （CORE-2・TASK-89・対象ビヘイビア: TABLE-9）。
    /// ホットパス（全読み取り経路で毎行・defense-in-depth により最大 2 回呼ばれる。
    /// Issue #354）のため `#[inline]` を付与する。
    #[inline]
    pub fn is_visible(&self, row_tenant: &str, row_visibility: Visibility) -> bool

    /// 書き込み認可の単一照合パス（TASK-95・対象ビヘイビア: RECOVER-4）。
    /// [`Self::is_visible`] とは独立の判定で、可視性ラベル（`Public`/`Private`）は
    /// 一切考慮しない。テナント一致のみで判定するため、他テナントの `Public` 行は
    /// 読めても書けない。
    #[inline]
    pub fn is_owner(&self, row_tenant: &str) -> bool
}
```

## Notes

- rustdoc は抄録（一部段落を省略）。全文は `source:` の docs.rs source view を参照。
- `PartialEq`/`Eq` は `rls.rs::PrefilterIndex::search` が構築時 ctx と検索時 ctx の完全一致（テナント ID・許可可視性集合の両方）を fail-closed に照合するために持つ（TASK-133・別テナント／可視性が狭化・拡大された ctx でのインデックス転用を検出するため）。
- `is_visible` の判定順序（許可可視性集合 → `Public` 短絡 → テナント比較）・チェック回数・fail-closed 方針は実装内で固定されており、呼び出し側はこのメソッド以外でテナント比較を行わない。
- `is_visible` の詳細な判定条件（TABLE-9 対応）は private spec 側の記述を転記しないため、公開ソース（本モジュール docstring・実装）で追跡できる範囲のみ記載した。

## Related

- [rls](./rls.md)
- [tenant](./tenant.md)
