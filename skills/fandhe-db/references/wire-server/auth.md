---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/auth.rs
---

# auth

ユーザーストア・Argon2id 照合・`engine::policy::PolicyContext` へのテナント導出を担う。`handshake.rs` の認証フローから `verify` が呼ばれ、成功時は `PolicyContext`（テナント境界・可視性判定の唯一の入力経路）を返す。テナントはユーザーストアのフィールドからのみ導出し、クライアント自己申告値は参照しない（fail-closed の設計判断）。内部の Argon2id / BLAKE2b はいずれも `unsafe` なしの自作実装で、`auth::argon2id` / `auth::blake2b` サブモジュールに分離されている。

## Signature / Usage

~~~rust,ignore
pub mod argon2id;
pub mod base64_std;
pub mod blake2b;
pub mod hmac_sha256;
pub mod scram;

/// 認証失敗時に課す固定遅延。ポインタ: TASK-67・WIRE-3。
/// `pub`（Issue #752）: NoSQL 表層の `POST /v1/session` も `verify` を直接呼び、
/// この固定遅延・ダミー KDF による対称性を SQL wire と共有する。
pub const AUTH_FAILURE_DELAY: Duration = Duration::from_millis(200);

pub const SQLSTATE_INVALID_PASSWORD: &str =
    engine::error_format::ErrorClass::AuthInvalid.wire_code();

/// サーバー全体で一意に選ぶ認証方式（Issue #940・WIRE-18・TASK-222）。
/// ユーザーごとに切り替えない。`--auth-method` CLI が唯一の入口。未指定時は `Cleartext`。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum AuthMethod {
    #[default]
    Cleartext,
    ScramSha256,
}

/// ユーザーストア 1 行は `username:tenant_id:phc[:scram_verifier]` 形式（4 番目は opt-in）。
pub struct UserStore {
    users: HashMap<String, UserRecord>,
    auth_method: AuthMethod,
    scram_mock_key: Option<[u8; scram::KEY_LEN]>,
    ddl_allowed: HashSet<String>,
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
    InvalidScramVerifier { line: usize },
    MissingScramVerifier { username: String },
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
    /// 4 番目のフィールド（SCRAM 検証子。`SCRAM-SHA-256$` で始まる）は opt-in で、
    /// 反復回数 `scram::SCRAM_ITERATIONS`・salt 長 `scram::SALT_LEN` への完全一致のみ受理する。
    pub fn load_from_file(path: &Path) -> Result<Self, LoadError>

    /// 認証方式を `AuthMethod::ScramSha256` へ切り替える opt-in（`--auth-method scram-sha-256`
    /// からのみ呼ばれる）。全レコードが SCRAM 検証子を持つことを要求し、欠けていれば
    /// `LoadError::MissingScramVerifier`（fail-closed）。`mock_key_secret` は未知ユーザー向け
    /// モック検証子の鍵を導出する外部秘密で、ユーザーレコード集合から独立させる
    /// （`--scram-mock-key-file` の生バイト列）。
    pub fn require_scram(mut self, mock_key_secret: &[u8]) -> Result<Self, LoadError>

    /// このストアが選択している認証方式。`handshake.rs` が `Authentication*` の種類を分岐する唯一の情報源。
    pub fn auth_method(&self) -> AuthMethod
    pub fn scram_mock_key(&self) -> Option<&[u8; scram::KEY_LEN]>
    pub fn scram_lookup(&self, username: &str) -> Option<(&str, &scram::ScramVerifier)>

    /// DDL 実行権限を持つ username 集合を設定する opt-in（`--ddl-allowed-users`。Issue #902）。
    /// `--users` に実在しない username が含まれる場合は起動失敗（fail-closed）。
    pub fn with_ddl_allowed_users(mut self, usernames: &[String]) -> Result<Self, String>
    pub fn is_ddl_allowed(&self, username: &str) -> bool

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

サブモジュール `auth::scram`（SCRAM-SHA-256／SCRAM-SHA-256-PLUS。RFC 5802／RFC 7677／RFC 5929 §4。Issue #940・WIRE-18・TASK-222・Issue #970）:

~~~rust,ignore
pub const MECHANISM_NAME: &str = "SCRAM-SHA-256";
pub const MECHANISM_NAME_PLUS: &str = "SCRAM-SHA-256-PLUS";
pub const CB_NAME_TLS_SERVER_END_POINT: &str = "tls-server-end-point";
pub const SCRAM_ITERATIONS: u32 = 4096;
pub const SALT_LEN: usize = 16;
pub const KEY_LEN: usize = 32;
pub const MAX_SCRAM_FIELD_LEN: usize = 1024;

/// この接続で交渉されたチャネルバインディング。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ChannelBinding { None, TlsServerEndPoint }

/// 検証子（RFC 5802 の StoredKey／ServerKey）。
/// 形式 `SCRAM-SHA-256$<iter>:<salt_b64>$<StoredKey_b64>:<ServerKey_b64>`。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ScramVerifier {
    pub iterations: u32,
    pub salt: Vec<u8>,
    pub stored_key: [u8; KEY_LEN],
    pub server_key: [u8; KEY_LEN],
}
impl ScramVerifier {
    pub fn parse(input: &str) -> Result<Self, VerifierParseError>
    pub fn to_verifier_string(&self) -> String
}
#[derive(Debug, PartialEq, Eq)]
pub enum VerifierParseError { Malformed, InvalidIterations, InvalidSaltLength, InvalidKeyLength }

/// パスワードから検証子を生成する（`hash-password --with-scram-sha-256` から呼ばれる）。
/// パスワードは印字可能 ASCII（0x20〜0x7e）に限定する（SASLprep を自作しないための制約）。
pub fn generate_verifier(password: &[u8], salt: &[u8], iterations: u32)
    -> Result<ScramVerifier, GenerateVerifierError>
#[derive(Debug, PartialEq, Eq)]
pub enum GenerateVerifierError { NonPrintableAsciiPassword, InvalidSaltLength }

#[derive(Debug, PartialEq, Eq)]
pub enum ScramError { Malformed, ChannelBindingRequested, ChannelBindingDowngrade, TooLarge }

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Gs2CbindFlag { NotSupported, ClientSupportsServerNot, Requested(String) }

pub struct ClientFirstMessage {
    pub gs2_header: Vec<u8>,
    pub client_first_bare: Vec<u8>,
    pub client_nonce: String,
    pub cbind_flag: Gs2CbindFlag,
}
pub fn parse_client_first(body: &[u8]) -> Result<ClientFirstMessage, ScramError>
pub fn parse_client_first_with_cbind(body: &[u8]) -> Result<ClientFirstMessage, ScramError>
pub fn negotiate_channel_binding(
    selected_plus: bool,
    flag: &Gs2CbindFlag,
    server_offers_plus: bool,
) -> Result<ChannelBinding, ScramError>

pub struct ClientFinalMessage { pub channel_binding_b64: String, pub nonce: String, pub proof: Vec<u8> }
pub fn parse_client_final(body: &[u8]) -> Result<ClientFinalMessage, ScramError>
pub fn compute_auth_message(client_first_bare: &[u8], server_first: &[u8], client_final_without_proof: &[u8]) -> Vec<u8>
pub fn client_final_without_proof(gs2_header: &[u8], nonce: &str) -> Vec<u8>
pub fn client_final_without_proof_with_cbind(gs2_header: &[u8], cbind_data: &[u8], nonce: &str) -> Vec<u8>
pub fn build_server_first(combined_nonce: &str, salt: &[u8], iterations: u32) -> Vec<u8>
pub fn build_server_final_success(server_signature: &[u8; KEY_LEN]) -> Vec<u8>

pub struct ClientFinalVerification { pub ok: bool, pub server_signature: [u8; KEY_LEN] }
pub fn verify_client_final(verifier: &ScramVerifier, auth_message: &[u8], proof: &[u8]) -> ClientFinalVerification

/// 未知ユーザー向けのモック検証子（列挙攻撃対策）。salt は mock_key とユーザー名から決定的に導出する。
pub fn mock_verifier(mock_key: &[u8; KEY_LEN], username: &str, iterations: u32) -> ScramVerifier
~~~

サブモジュール `auth::hmac_sha256` / `auth::base64_std`（`scram` の下位プリミティブ。いずれも自作で外部依存なし）:

~~~rust,ignore
pub fn hmac_sha256(key: &[u8], message: &[u8]) -> [u8; 32]
pub fn pbkdf2_hmac_sha256_one_block(password: &[u8], salt: &[u8], iterations: u32) -> [u8; 32]

pub fn encode(input: &[u8]) -> String          // base64_std
pub fn decode(input: &str) -> Result<Vec<u8>, DecodeError>
pub struct DecodeError;
~~~

## Notes

- 対応: TASK-67（WIRE-2, WIRE-3）、Issue #940・TASK-222（WIRE-18。SCRAM-SHA-256）、Issue #970（SCRAM-SHA-256-PLUS）。
- `verify` は既知ユーザーの誤りパスワード・未知ユーザーいずれも `AUTH_FAILURE_DELAY`（固定 200ms）以上の遅延を課してから失敗を返す（列挙攻撃・タイミング差からのユーザー存在推測対策）。`UserStore::load_from_file` が `RECOMMENDED_PARAMS` への完全一致以外の PHC レコードを起動時に拒否するのも、既知・未知ユーザー間の Argon2id 計算コスト差を無くし、この固定遅延だけで吸収できるようにするための設計。
- `read_urandom` / `generate_salt` は `main.rs` の `hash-password` サブコマンド（ユーザーストア登録行の生成補助コマンド）から呼ばれる。詳細は [main-cli.md](./main-cli.md)。
- 0.1.0 では cleartext password 認証（WIRE-2）のみだった。0.2.0 では `--auth-method scram-sha-256` で SCRAM-SHA-256（RFC 7677）が選べ、平文パスワードが wire 上を流れなくなる。認証方式はサーバー全体で 1 つに固定され、ユーザーごとには切り替えられない。`scram-sha-256` では全ユーザーが SCRAM 検証子（`wire-server hash-password --with-scram-sha-256` で生成）を持つ必要があり、`--scram-mock-key-file`（32 バイト以上）が必須。`--surface nosql` とは併用できない（起動時 fail-closed。`POST /v1/session` は Argon2id 照合を直接呼ぶ別経路のため）。パスワードは印字可能 ASCII（0x20〜0x7e）に限定される（SASLprep を自作しないための制約）。
- SCRAM-SHA-256-PLUS（`p=tls-server-end-point`。RFC 5929 §4）は TLS 接続でのみ提示され、`--tls-scram-channel-binding enable`（既定 `disable`）を明示した場合に限る。SQL 表層で葉証明書の署名アルゴリズムに RFC 5929 が定義するハッシュが無い場合（Ed25519 など）は起動時に拒否される。README の記述に基づく（ADR `docs/design/tls-scram-design.md`・`docs/design/tls-channel-binding.md` を設計の出典とする）。
- `scram::mock_verifier` は未知ユーザー向けに決定的な salt を返し（列挙攻撃対策）、導出に使う識別子文字列（`vector-db/scram/mock-salt/v1` など）はプロジェクト名変更（vector-db → fandhe-db）後も値を固定している。ソース doc は「存在秘匿のダミー応答の決定性に使う識別子でありブランド名ではないため、変更すると決定性契約が変わる」と記す。
- `UserStore::load_from_file` は 3 フィールド行（`username:tenant_id:phc`）も従来どおり読み込める。4 番目のフィールドが `SCRAM-SHA-256$` で始まらない行は `MalformedLine` として拒否される。
- Migration (0.1.0 → 0.2.0): `AUTH_FAILURE_DELAY` が `pub` になった。`LoadError` に `InvalidScramVerifier` / `MissingScramVerifier` が追加された（網羅的 `match` は更新が必要）。`UserStore` は `require_scram` / `auth_method` / `scram_mock_key` / `scram_lookup` / `with_ddl_allowed_users` / `is_ddl_allowed` を持つ。
- `PolicyContext` はユーザーストアのフィールドからのみ導出され、クライアント自己申告値（例: startup パラメータ内の任意情報）は参照しない fail-closed 設計。

## Related

- [handshake.md](./handshake.md)
- [bind-guard.md](./bind-guard.md)
