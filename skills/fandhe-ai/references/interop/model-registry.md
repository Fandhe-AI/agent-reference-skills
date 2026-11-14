---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/model/struct.ModelRegistry.html
---

# model::ModelRegistry（ローカルモデルレジストリ）

ホームディレクトリ配下のプリトレイン重みを、名前・バージョンで管理して同期ロードするローカルレジストリ。読み取り系（`load` / `available_models`）はディレクトリの作成・削除を行わず、書き込みは `save`（Linux x86_64 / aarch64 限定）と `download` / `download_with`（unix）が行う。

## Signature / Usage

```text
<cache_dir>/                      既定 $HOME/.fandhe-ai/models
  <name>/                         [A-Za-z0-9._-]+（先頭 '.' 不可）
    <version>/                    同上。semver 等は解釈しない不透明な文字列
      model.safetensors           F32 テンソルのみ・キー = state_dict キー
      download.json               download が置く取得メタデータ（url / etag / content_length / sha256 / fetched_at）。
                                  load / available_models は参照しない
```

```rust
impl ModelRegistry {
    pub fn new() -> Result<Self, ModelError>;
    pub fn with_cache_dir(dir: impl Into<PathBuf>) -> Self;
    pub fn cache_dir(&self) -> &Path;
    pub fn load(
        &self,
        name: &str,
        version: &str,
    ) -> Result<HashMap<String, Tensor<f32>>, ModelError>;
    pub fn available_models(&self) -> Vec<(String, Vec<String>)>;
    pub fn save(
        &self,
        name: &str,
        version: &str,
        tensors: &HashMap<String, Tensor<f32>>,
    ) -> Result<(), ModelError>;
    pub fn download(&self, url: &str, name: &str, version: &str) -> Result<(), ModelError>;
    pub fn download_with(
        &self,
        url: &str,
        name: &str,
        version: &str,
        options: DownloadOptions<'_>,
    ) -> Result<(), ModelError>;
}

impl Sha256Pin {
    pub fn from_hex(s: &str) -> Result<Sha256Pin, ModelError>;
}

impl<'a> DownloadOptions<'a> {
    pub fn expected_sha256(self, pin: Sha256Pin) -> Self;
    pub fn progress(self, f: &'a mut dyn FnMut(DownloadProgress)) -> Self;
}
```

保存・再読込（rustdoc の例。一時ディレクトリをキャッシュルートにする。非対応プラットフォームでは `Unsupported`）。

```rust
use fandhe_ai::Tensor;
use fandhe_ai::model::{ModelError, ModelRegistry};
use std::collections::HashMap;

let nanos = std::time::SystemTime::now()
    .duration_since(std::time::UNIX_EPOCH)
    .map(|d| d.as_nanos())
    .unwrap_or(0);
let root = std::env::temp_dir().join(format!(
    "fandhe-ai-model-save-doc-{}-{nanos}",
    std::process::id()
));
let registry = ModelRegistry::with_cache_dir(root.clone());
let mut state = HashMap::new();
state.insert("w".to_string(), Tensor::new(vec![1.0_f32, 2.0], &[2])?);
match registry.save("mlp", "v1", &state) {
    Ok(()) => {
        let loaded = registry.load("mlp", "v1")?;
        assert_eq!(loaded.len(), 1);
        assert_eq!(
            registry.available_models(),
            vec![("mlp".to_string(), vec!["v1".to_string()])]
        );
    }
    Err(ModelError::Io(e)) if e.kind() == std::io::ErrorKind::Unsupported => {}
    Err(e) => return Err(e.into()),
}
let _ = std::fs::remove_dir_all(&root);
Ok::<(), Box<dyn std::error::Error>>(())
```

pin・進捗付きダウンロードのオプション組み立て（rustdoc の例。`fetch` は実行せずコンパイルのみ。実行部分は `http://` が接続前に `InvalidUrl` で拒否されることを示す）。

```rust
use fandhe_ai::model::{
    DownloadOptions, DownloadProgress, ModelError, ModelRegistry, Sha256Pin,
};
fn fetch(registry: &ModelRegistry, opts: DownloadOptions<'_>) -> Result<(), ModelError> {
    registry.download_with("https://example.com/mlp.safetensors", "mlp", "v1", opts)
}
let _ = fetch;
let registry = ModelRegistry::with_cache_dir("/nonexistent/fandhe-models-doctest");
let pin = Sha256Pin::from_hex(&"0".repeat(64)).unwrap();
let mut on_progress = |p: DownloadProgress| {
    let _ = (p.received, p.total);
};
let opts = DownloadOptions::default()
    .expected_sha256(pin)
    .progress(&mut on_progress);
// 非 unix は fail-closed で非対応（`Io(Unsupported)`）のため unix のみ検証する。
#[cfg(unix)]
{
    let err = registry
        .download_with("http://example.com/mlp.safetensors", "mlp", "v1", opts)
        .unwrap_err();
    assert!(matches!(err, ModelError::InvalidUrl { .. }));
}
```

## Options / Props

### ModelRegistry のメソッド

| Name | Description |
| --- | --- |
| `new` | 既定キャッシュルート（Unix: `$HOME/.fandhe-ai/models`、Windows: `$USERPROFILE/.fandhe-ai/models`）で構築。空文字列の環境変数は未設定扱い。いずれも未設定なら `ModelError::CacheDirUnavailable` |
| `with_cache_dir` | キャッシュルートを明示指定（テスト・CI・非標準配置向け） |
| `cache_dir` | キャッシュルートのパスを返す |
| `load` | `<cache_dir>/<name>/<version>/model.safetensors` を同期ロードし state dict（キー = テンソル名）を返す |
| `save` | state dict を `<cache_dir>/<name>/<version>/model.safetensors` へ原子的に保存（既存は置換、上書きフラグなし）。`name` / `version` 検証 → 空集合・サイズ上限検査 → safetensors エンコードと読み戻し → ディレクトリ fd を保持して 1 段ずつ作成 → 一時ファイル書き込み → `rename` → `load` と同経路での確認、の順。`load` と往復し F32 の bit 一致を返す。Linux x86_64 / aarch64 のみ |
| `download` | HTTPS URL から safetensors を取得し `model.safetensors` へ原子的に置く（pin なし。`download_with` への委譲）。unix のみ |
| `download_with` | `download` のオプション付き版（`DownloadOptions`）。1 GiB 上限・リダイレクト 5 ホップ・全体 1 時間の固定既定。TLS は OS のルート証明書で検証し無効化する口はない |
| `available_models` | ルート配下のモデルを `(name, versions)` で列挙。name・versions とも文字列昇順。ルートが無い・読めない場合は空 `Vec`（エラーは返さない）。version が 1 件も無い name は含めない。非 UTF-8 名はスキップ |

### Sha256Pin / DownloadOptions / DownloadProgress

| Name | Description |
| --- | --- |
| `Sha256Pin::from_hex(s)` | 64 桁の 16 進文字列（大文字・小文字可）から期待 SHA-256 を作る。長さ違い・非 16 進・空白・`0x` 接頭辞は `ModelError::InvalidPin`。`Display` は小文字 16 進 |
| `DownloadOptions::expected_sha256(pin)` | 期待 SHA-256 を指定。不一致なら `ModelError::HashMismatch` で何も公開しない |
| `DownloadOptions::progress(f)` | 受信チャンクごとに呼ばれる `&mut dyn FnMut(DownloadProgress)` を指定。`DownloadOptions` は `Default` で構築し `#[non_exhaustive]`。タイムアウト・サイズ上限の上書き口はない |
| `DownloadProgress` | `received: u64`（受信済みバイト数）、`total: Option<u64>`（`Content-Length`。不明なら `None`）。`#[non_exhaustive]`。利用者は読めるが構築できず、URL 由来の情報は持たない |

### ModelError（`#[non_exhaustive]`）

| Variant | Description |
| --- | --- |
| `CacheDirUnavailable` | 既定キャッシュディレクトリを解決できない |
| `InvalidComponent { kind, value }` | `name` / `version` が許可文字集合に不適合（パストラバーサル対策。FS に触れる前に拒否） |
| `NotFound { name, version }` | 通常ファイルとして存在しない、または symlink 経由等の脱出と判定された |
| `TooLarge { name, version, len, max }` | `model.safetensors` が固定上限（内部定数 `MAX_MODEL_FILE_BYTES`、ソース上は 1 GiB）を超過 |
| `EmptyModel { name, version }` | `save` の `tensors` が空 |
| `Save(SaveError)` | `save` の safetensors エンコード失敗（`interop::safetensors::SaveError` を連鎖） |
| `Load(LoadError)` | safetensors デコード失敗（`interop::safetensors::LoadError` を連鎖）。`download` では取得内容が妥当な safetensors でない場合にも返る |
| `InvalidUrl { reason }` | ダウンロード URL が不正（`https` 以外・資格情報付き・ホスト / ポート不正・制御文字・長さ超過・解決不能なリダイレクト先など）。入力 URL は値として持たず静的な理由のみ |
| `InvalidPin` | `Sha256Pin::from_hex` の形式不正 |
| `Http { status }` | HTTP 応答が 200 以外（リダイレクト以外の 3xx・4xx・5xx・206 を含む） |
| `TooManyRedirects { max }` | リダイレクト回数が上限（5）超過 |
| `ContentLengthMismatch { expected, received }` | 受信バイト数が `Content-Length` と不一致 |
| `HashMismatch { expected, actual }` | 受信内容の SHA-256 が pin と不一致 |
| `Network(std::io::Error)` | ネットワーク・TLS 失敗。URL を含みうる元エラーの `Display` を通さず種別のみ保持 |
| `CacheMetadata { reason }` | 書き込もうとした `download.json` が不正。読み出し側の破損は再取得にフォールバックするため通常は返らない |
| `StorageFull(std::io::Error)` / `PermissionDenied(std::io::Error)` | ダウンロード経路のみ。ディスク満杯 / 権限エラー。`Display` にパスを含めない |
| `Io(std::io::Error)` | 上記以外の I/O 失敗（読み込みバッファ確保失敗は `ErrorKind::OutOfMemory`） |

## Notes

- 配置は利用者が手動で行うか、`save`（ローカル state dict の書き込み）・`download` / `download_with`（汎用 HTTPS 取得）で行う。HF hub 固有の解決は対象外（汎用 HTTPS 取得のみ）。`save` 以外の読み取り系メソッドはディレクトリの作成・削除を行わず、`save` も削除は自分の一時ファイルに限り、作成するのはルートと `<name>`・`<version>` だけ
- `load` は単一 `Tensor` ではなく `HashMap<String, Tensor<f32>>`（state dict）を返す。消費先の `Sequential::load_state_dict` が map を取るため
- 実体は `interop::safetensors::load_safetensors_f32_from_bytes` への委譲。F32 のみ、転置・キーリネームなし
- symlink 対策: `name` / `version` / 葉ファイルを `symlink_metadata` で検査し symlink を拒否、葉は通常ファイル必須（FIFO・ソケット・デバイスは拒否）。canonicalize による配下確認、`O_NOFOLLOW` + `O_NONBLOCK` でのオープン、開いたハンドルの `(dev, ino)` 照合（TOCTOU 対策）、fstat サイズ上限検査、`Read::take` で `上限 + 1` バイトに打ち切り。事前配置されたハードリンクは対象外
- `save` のプラットフォーム: Linux の x86_64 / aarch64 のみ（保存先をディレクトリ fd で固定するため `/proc/self/fd/<fd>` 経由）。macOS・Windows 等では `load` が使えても `save` は最初に `ModelError::Io`（`ErrorKind::Unsupported`）を返し何も作らない。`/proc` が使えない Linux でも書き込み前に `Err`。並行する `save` は最後に `rename` した側が勝つ。`fsync` はしないため電源断に対する耐久性は保証しない（原子性は `rename` による）
- `download` / `download_with` のプラットフォーム: unix のみ。非 unix は `Io(Unsupported)`
- `download` の安全性（ソースで確認できる範囲）: `https` 絶対形のみ許可し資格情報付き URL を拒否、各リダイレクトで URL を再検証する。URL にトークン等の secret を直書きしない（`InvalidUrl` / `Http` / `Network` は URL を値として保持しないが、呼び出し側のログ・履歴には残りうる）。pin 無しの保証は破損・部分改変の検出（サイズ上限・`Content-Length` 一致）に限られ、意図的な改竄に対する真正性は保証しない。真正性が必要なら `DownloadOptions::expected_sha256(Sha256Pin)` を指定する。公開前に safetensors の構造（ヘッダ長・JSON・オフセット整合）をレイアウト検証し、不正な内容は `ModelError::Load` で拒否して既存ファイルを変更しない（dtype は限定しないため F16 / BF16 も公開できるが `load` は F32 のみ）。SSRF（内部ネットワーク宛先）の遮断は呼び出し側の責務で、本関数が担保するのは `https` 限定・資格情報付き URL の拒否・各リダイレクトでの再検証まで。失敗時は既存 `model.safetensors` を変更せず、自分が作った一時ファイルだけを削除する
- `download` のキャッシュ: 成功すると `download.json` を `model.safetensors` の後に置く。同じ URL の再取得で `ETag` が保存されていれば `If-None-Match` 付きの条件付き GET を送り、`304` なら既存ファイルの SHA-256 を再計算して pin（なければ保存値）と照合し、一致したときだけ再利用して `fetched_at` のみ更新する。不一致・ファイル無し・`download.json` 破損は無条件 GET で全量を取り直す。保存値は破損・部分改変の検出用で真正性の根拠ではない。`ETag` を返さないサーバーからは常に取り直す。`download.json` の書き込みだけが失敗した場合もエラーを返す（モデル本体は検証済みで公開済み）
- Windows: キャッシュルート解決自体は動くが、葉オープンは Linux（x86_64 / aarch64）・macOS 限定のため、Windows では `load` は常に `Err`（`ModelError::Io`）、`available_models` は常に空を返す（fail-closed 非対応。Windows 実機の動作は未検証）
- Migration (v0.11 → v0.14): 0.11.0 の本ページは読み取り専用レジストリ（`save` / `download` なし）としていた。0.14.0 で `save` / `download` / `download_with` / `Sha256Pin` / `DownloadOptions` / `DownloadProgress` が追加され、`ModelError` に上記 variant が増えた
- 対象外: version 記法の解釈・最新版解決、`Sequential` への直結ラッパー、非 F32 dtype、改竄検知
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/model/struct.ModelRegistry.html（0.14.0, 取得日 2026-11-14）。`save` / `download` の手順・エラー表はタグ v0.14.0 の `src/model.rs` の rustdoc

## Related

- [safetensors](./safetensors.md)
- [compat-sequential](../api/compat-sequential.md)
