---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/model/struct.ModelRegistry.html
---

# model::ModelRegistry（ローカル限定モデルレジストリ）

ホームディレクトリ配下に利用者が手動配置したプリトレイン重みを、名前・バージョンで管理して同期ロードする読み取り専用レジストリ。ディレクトリの作成・削除は一切行わない。

## Signature / Usage

```text
<cache_dir>/                      既定 $HOME/.fandhe-ai/models
  <name>/                         [A-Za-z0-9._-]+（先頭 '.' 不可）
    <version>/                    同上。semver 等は解釈しない不透明な文字列
      model.safetensors           F32 テンソルのみ・キー = state_dict キー
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
| `available_models` | ルート配下のモデルを `(name, versions)` で列挙。name・versions とも文字列昇順。ルートが無い・読めない場合は空 `Vec`（エラーは返さない）。version が 1 件も無い name は含めない。非 UTF-8 名はスキップ |

### ModelError（`#[non_exhaustive]`）

| Variant | Description |
| --- | --- |
| `CacheDirUnavailable` | 既定キャッシュディレクトリを解決できない |
| `InvalidComponent { kind, value }` | `name` / `version` が許可文字集合に不適合（パストラバーサル対策。FS に触れる前に拒否） |
| `NotFound { name, version }` | 通常ファイルとして存在しない、または symlink 経由等の脱出と判定された |
| `TooLarge { name, version, len, max }` | `model.safetensors` が固定上限（内部定数 `MAX_MODEL_FILE_BYTES`、ソース上は 1 GiB）を超過 |
| `Load(LoadError)` | safetensors デコード失敗（`interop::safetensors::LoadError` を連鎖） |
| `Io(std::io::Error)` | 上記以外の I/O 失敗（読み込みバッファ確保失敗は `ErrorKind::OutOfMemory`） |

## Notes

- ローカル限定のレジストリ。ネットワーク取得や HF Hub 連携は行わない（リモート取得・HF hub 連携はスコープ外として別イシューで追跡）。配置は利用者が手動で行う
- `load` は単一 `Tensor` ではなく `HashMap<String, Tensor<f32>>`（state dict）を返す。消費先の `Sequential::load_state_dict` が map を取るため
- 実体は `interop::safetensors::load_safetensors_f32_from_bytes` への委譲。F32 のみ、転置・キーリネームなし
- symlink 対策: `name` / `version` / 葉ファイルを `symlink_metadata` で検査し symlink を拒否、葉は通常ファイル必須（FIFO・ソケット・デバイスは拒否）。canonicalize による配下確認、`O_NOFOLLOW` + `O_NONBLOCK` でのオープン、開いたハンドルの `(dev, ino)` 照合（TOCTOU 対策）、fstat サイズ上限検査、`Read::take` で `上限 + 1` バイトに打ち切り。事前配置されたハードリンクは対象外
- Windows: キャッシュルート解決自体は動くが、葉オープンは Linux（x86_64 / aarch64）・macOS 限定のため、Windows では `load` は常に `Err`（`ModelError::Io`）、`available_models` は常に空を返す（fail-closed 非対応。Windows 実機の動作は未検証）
- 対象外: version 記法の解釈・最新版解決、`Sequential` への直結ラッパー、非 F32 dtype、改竄検知

## Related

- [safetensors](./safetensors.md)
- [compat-sequential](../api/compat-sequential.md)
