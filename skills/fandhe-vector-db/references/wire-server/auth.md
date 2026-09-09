---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/auth.rs
---

# auth

ユーザーストア・Argon2id 照合・`engine::policy::PolicyContext` へのテナント導出を担う。`handshake.rs` の認証フローから `verify` が呼ばれ、成功時は `PolicyContext`（テナント境界・可視性判定の唯一の入力経路）を返す。テナントはユーザーストアのフィールドからのみ導出し、クライアント自己申告値は参照しない（fail-closed の設計判断）。内部の Argon2id / BLAKE2b はいずれも `unsafe` なしの自作実装で、`auth::argon2id` / `auth::blake2b` サブモジュールに分離されている。

## Signature / Usage

~~~rust,ignore
/// 認証失敗時に課す固定遅延。ポインタ: TASK-67・WIRE-3。
const AUTH_FAILURE_DELAY: Duration = Duration::from_millis(200);

pub const SQLSTATE_INVALID_PASSWORD: &str =
    engine::error_format::ErrorClass::AuthInvalid.wire_code();

pub struct UserStore {
    users: HashMap<String, UserRecord>,
}

#[derive(Debug)]
pub enum LoadError {
    Io(std::io::Error),
    MalformedLine { line: usize },
    DuplicateUsername { line: usize },
    EmptyUsername { line: usize },
    EmptyTenantId { line: usize },
    InvalidPhc { line: usize },
    InvalidTenantId { line: usize },
}

#[derive(Debug)]
pub struct AuthFailure;

impl AuthFailure {
    pub const MESSAGE: &'static str = "password authentication failed";
}

impl UserStore {
    /// `username:tenant_id:phc` 形式のファイルをロードする。重複 username・空
    /// username/tenant_id・不正 PHC・`PolicyContext` が拒否する tenant_id はすべて
    /// 起動失敗として扱う（fail-closed）。PHC の Argon2id パラメータは
    /// `argon2id::RECOMMENDED_PARAMS` への完全一致のみを受理する
    pub fn load_from_file(path: &Path) -> Result<Self, LoadError>

    pub fn len(&self) -> usize
    pub fn is_empty(&self) -> bool
}

/// cleartext password 認証を照合し、成功時は `engine::policy::PolicyContext` を返す。
pub fn verify(
    store: &UserStore,
    username: &str,
    password: &[u8],
) -> Result<engine::policy::PolicyContext, AuthFailure>

pub fn read_urandom(len: usize) -> std::io::Result<Vec<u8>>
pub fn generate_salt() -> std::io::Result<Vec<u8>>

pub const DEFAULT_PARAMS: Params = argon2id::RECOMMENDED_PARAMS;
~~~

サブモジュール `auth::argon2id`（RFC 9106 準拠、`unsafe` なし）:

~~~rust,ignore
pub const RECOMMENDED_PARAMS: Params = Params { m_cost_kib: 19_456, t_cost: 2, p_cost: 1 };
pub const MAX_M_COST_KIB: u32 = 256 * 1024;
pub const MAX_T_COST: u32 = 64;
pub const MAX_P_COST: u32 = 64;
pub const MAX_TOTAL_WORK_KIB: u64 =
    (RECOMMENDED_PARAMS.m_cost_kib as u64) * (RECOMMENDED_PARAMS.t_cost as u64) * 20;
pub const MAX_HASH_LEN: usize = 64;
pub const MAX_SALT_LEN: usize = 64;
pub const MAX_CONCURRENT_ARGON2_KDF: usize = 8;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Params { pub m_cost_kib: u32, pub t_cost: u32, pub p_cost: u32 }

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Argon2Error {
    MemoryTooSmall,
    ParamOutOfRange(&'static str),
    InvalidParam(&'static str),
    AllocationFailed,
    MalformedPhc,
}

pub fn validate_params(params: &Params) -> Result<(), Argon2Error>
pub fn hash_raw(password: &[u8], salt: &[u8], secret: &[u8], ad: &[u8], params: &Params, out_len: usize) -> Result<Vec<u8>, Argon2Error>
pub fn encode_phc(password: &[u8], salt: &[u8], params: &Params) -> Result<String, Argon2Error>
pub fn synthesize_phc_without_hashing(params: &Params, salt: &[u8], hash: &[u8]) -> String
pub fn parse_phc(phc: &str) -> Result<(Params, Vec<u8>, Vec<u8>), Argon2Error>
pub fn constant_time_eq(a: &[u8], b: &[u8]) -> bool
pub fn verify_phc(phc: &str, password: &[u8]) -> Result<bool, Argon2Error>
~~~

サブモジュール `auth::blake2b`（RFC 7693 準拠 BLAKE2b-512、`argon2id` の下位プリミティブ）:

~~~rust,ignore
/// ストリーミング型の BLAKE2b ハッシュ状態（鍵なし・出力長 `nn` バイト、1..=64）。
pub struct Blake2b {
    h: [u64; 8],
    buf: [u8; BLOCK_BYTES],
    buf_len: usize,
    total_len: u128,
    out_len: usize,
}

impl Blake2b {
    pub fn new(out_len: usize) -> Self
    pub fn update(&mut self, mut data: &[u8])
    pub fn finalize(mut self) -> Vec<u8>
}

pub fn hash(out_len: usize, data: &[u8]) -> Vec<u8>
~~~

## Notes

- 対応: TASK-67（WIRE-2, WIRE-3）。
- `verify` は既知ユーザーの誤りパスワード・未知ユーザーいずれも `AUTH_FAILURE_DELAY`（固定 200ms）以上の遅延を課してから失敗を返す（列挙攻撃・タイミング差からのユーザー存在推測対策）。`UserStore::load_from_file` が `RECOMMENDED_PARAMS` への完全一致以外の PHC レコードを起動時に拒否するのも、既知・未知ユーザー間の Argon2id 計算コスト差を無くし、この固定遅延だけで吸収できるようにするための設計。
- `read_urandom` / `generate_salt` は `main.rs` の `hash-password` サブコマンド（ユーザーストア登録行の生成補助コマンド）から呼ばれる。詳細は [main-cli.md](./main-cli.md)。
- 0.1.0 時点は cleartext password 認証（WIRE-2）のみ。TLS（TASK-72・WIRE-9）は ADR `docs/design/tls-scram-design.md` に設計方針のみ存在し実装は未着手（ADR は Proposed ステータス。証明書管理・ライブラリ選定・SCRAM 採用の詳細は private spec 側に委譲されている）。SCRAM 認証も同様に未実装。
- `PolicyContext` はユーザーストアのフィールドからのみ導出され、クライアント自己申告値（例: startup パラメータ内の任意情報）は参照しない fail-closed 設計。

## Related

- [handshake.md](./handshake.md)
- [bind-guard.md](./bind-guard.md)
