# deploy

単一バイナリ配布 + Docker（`FROM scratch`）でのデプロイコマンド（`examples/dist-server-docker` 準拠）。

## デプロイ前検証（fw gate）

```sh
fw gate --project .
```

`fw new` で生成した自分のプロジェクト直下から実行する、通常のデプロイ前検証。

```sh
tools/ci/ensure-gate-tools.sh
cargo run -p fandhe-frontend-cli -- gate --project examples/dist-server-docker
```

`fandhe-frontend` リポジトリ自身をリポジトリルートから clone して実行する場合の手順（`tools/ci/ensure-gate-tools.sh` は fandhe-frontend リポジトリ同梱のスクリプトで、`fw new` が生成する一般プロジェクトには含まれない）。`fw gate` の実行に必要な clippy component / cargo-deny を導入してから検証する。

## Docker イメージのビルド・起動

```sh
docker build -t dist-server-docker-example .
docker run --rm -p 3100:3100 dist-server-docker-example
```

musl 静的リンクの `FROM scratch` マルチステージビルド。起動後は以下で疎通確認する。

```sh
curl -sS http://127.0.0.1:3100/
curl -sS http://127.0.0.1:3100/static/style.css
```

> **警告**: `docker build -t <name>` は既存の同名タグを黙って上書きする。既存イメージを残したい場合はタグ名を変えること。
