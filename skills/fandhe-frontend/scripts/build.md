# build

ビルド・テスト・WASM ビルド・NPM アセットビルドのコマンド。

## ビルド・テスト（cargo）

```sh
cd my-app
cargo test
cargo run   # --template app の場合、dist/ に SSG 出力（静的 HTML）を書き出す
cargo run --release
```

`cargo run` の挙動は使用テンプレートに依存する（`--template app` は `dist/` へ静的 HTML を書き出す SSG。`examples/dist-server-docker` のように HTTP サーバーを起動して待ち受ける構成もある）。

## CSR（WASM）ビルド

```sh
./tools/wasm/build.sh
```

`fw new --template app` で生成したプロジェクト直下から実行する。`wasm32-unknown-unknown` ターゲットと、`wasm/Cargo.lock` の `wasm-bindgen` と完全一致するバージョンの `wasm-bindgen-cli` が前提（`scripts/install.md` 参照）。生成物は `static/wasm/` に出力される。

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory static
```

生成した WASM/ES モジュールは `file://` では動作しないため、`static/` を HTTP サーバーで配信して確認する。

## NPM アセットビルド（静的アセット限定インストール）

```sh
tools/npm-asset-build/install.sh --dir <project-dir>
```

`package-lock.json` があれば `npm ci --ignore-scripts`、なければ `npm install --ignore-scripts` を実行する。`--ignore-scripts` は常時強制され、無効化フラグは拒否される。成功後に `npm audit --audit-level=high`（既定）と `check_static_only.py` による静的アセット限定検査を自動実行する。

```sh
tools/npm-asset-build/install.sh --dir <project-dir> <package-spec>...
```

パッケージを明示指定して追加インストールする場合。

```sh
tools/npm-asset-build/install.sh --dir <project-dir> --no-audit --no-check
```

`--no-audit`（`npm audit` 省略）・`--no-check`（`check_static_only.py` 省略）は明示的なオプトアウトで、実行時に警告が出力される。オフライン/エアギャップ環境向け。

```sh
tools/npm-asset-build/install.sh --dir <project-dir> --audit-level <low|moderate|high|critical>
```

`npm audit` の advisory しきい値を変更する（既定 `high`）。

```sh
python3 tools/npm-asset-build/check_static_only.py --dir <project-dir> --allowlist <allowlist.toml> --suggest-exempt
```

`install.sh` 後段のゲートを単体で実行する場合。`--suggest-exempt` は違反時に `[[exempt]]` 雛形を提案出力する（allowlist への自動書き込みはしない）。

```sh
python3 tools/npm-asset-build/apply_exempt.py --suggestions <reviewed.toml> --allowlist <allowlist.toml>
```

人間がレビュー・編集した `--suggest-exempt` の提案ファイルを allowlist.toml へ反映する。`--dry-run` で実際の書き込みを行わずに検証のみ行える。

> **警告**: `apply_exempt.py` は allowlist.toml を書き換える。レビューされていない（`reason` が空・`TODO:` のままの）エントリは拒否されるが、必ず提案内容を人間が確認してから実行すること。
