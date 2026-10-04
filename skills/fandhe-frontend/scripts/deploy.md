# deploy

デプロイ前検証・Docker（`FROM scratch`）配布・Vercel デプロイ（静的配置 `examples/vercel-ssg` / SSR `examples/vercel-ssr`）のコマンド。公式デプロイガイドと各 `examples/` の README に準拠。コードブロック内のコマンドは原文どおりで、コメント行は一部要約している。Vercel CLI の導入は `scripts/install.md` を参照。

Vercel の方式の選び方（公式ガイドの判断目安）: ビルド時に内容が確定するページ（ブログ・ドキュメント・マーケティング等）は静的配置 `examples/vercel-ssg`（既定・推奨）、リクエストごとの描画が必要で Vercel 上で動かす場合は `examples/vercel-ssr`（Container Images、Beta）、Vercel 以外のコンテナ基盤で動かす場合は `examples/dist-server-docker`。

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

```sh
cargo run -p fandhe-frontend-cli -- gate --project examples/vercel-ssg
cargo run -p fandhe-frontend-cli -- gate --project examples/vercel-ssr
```

Vercel 向け正本サンプルの検証。同様にリポジトリルートから、`tools/ci/ensure-gate-tools.sh` 実行後に行う。

## Docker イメージのビルド・起動

```sh
docker build -t dist-server-docker-example .
docker run --rm -p 3100:3100 dist-server-docker-example
```

musl 静的リンクの `FROM scratch` マルチステージビルド（`examples/dist-server-docker`）。起動後は以下で疎通確認する。

```sh
curl -sS http://127.0.0.1:3100/
curl -sS http://127.0.0.1:3100/static/style.css
```

> **警告**: `docker build -t <name>` は既存の同名タグを黙って上書きする。既存イメージを残したい場合はタグ名を変えること。

## Vercel 静的配置のビルドとデプロイ（vercel-ssg）

```sh
# 0. サンプルディレクトリへ移動する
cd examples/vercel-ssg

# 1. プロジェクトを Vercel と紐付ける
vercel link

# 2. 静的出力を生成する（Vercel 側では実行されない）
cargo run --release

# 3. ビルド済み出力をそのままデプロイする
vercel deploy --prebuilt
# 本番デプロイの場合は --prod を付ける
```

`.vercel/output/` に Build Output API 形式の静的サイトが生成される。Vercel 側に Rust ツールチェーンは不要で、ローカルまたは CI でビルドした出力をアップロードするだけ。

```sh
vercel deploy --prebuilt --prod
```

> **警告**: `--prod` は本番環境へデプロイする。先にプレビュー（`--prod` なし）で確認してから実行すること。

```sh
python3 -m http.server -d .vercel/output/static 8000
```

生成結果のローカル確認（任意）。この簡易サーバーでは `config.json` の `routes`（404 フォールバック等）は効かないため、routes の動作確認は Vercel 上のデプロイで行う。

```sh
cargo test
tools/ci/ensure-gate-tools.sh
cargo run -p fandhe-frontend-cli -- gate --project examples/vercel-ssg
```

サンプルのテストと `fw gate`（後者の 2 行はリポジトリルートから実行）。

## Vercel 静的配置の Basic 認証（opt-in）

```sh
# 1. フラグを立てて生成する（functions/_middleware.func/ が追加で生成される）
FANDHE_VERCEL_SSG_BASIC_AUTH=1 cargo run --release

# 2. 資格情報を Vercel 環境変数として登録する（対話プロンプトで入力。
#    preview・production の両方への登録が必要）
vercel env add BASIC_AUTH_USER production
vercel env add BASIC_AUTH_PASSWORD production
vercel env add BASIC_AUTH_USER preview
vercel env add BASIC_AUTH_PASSWORD preview

# 3. デプロイする
vercel deploy --prebuilt
```

既定のビルドには Basic 認証 Routing Middleware は含まれない。`FANDHE_VERCEL_SSG_BASIC_AUTH` は正確に `1` のときだけ有効で、`1` 以外の値を設定するとビルドがエラー終了する（fail-closed）。フラグなしで再ビルドすると `functions/` が削除され無保護の出力に戻る。preview への登録は必須（未登録だとミドルウェアが常に 503 を返し確認できない）。資格情報はコマンドライン引数に書かず対話プロンプトで入力し、リポジトリ・`vercel.json`・README に書かない。

> **警告**: 環境変数の追加・変更は変更後に作成したデプロイにだけ反映される。反映には再デプロイが必要で、旧デプロイは旧い認証情報を受け付け続ける。ミドルウェア入りでデプロイする前に環境変数を設定していないと、全リクエストが 503 になる。

## Deployment Protection 下での Basic 認証の確認（vercel-ssg）

```bash
read -s -p 'VERCEL_AUTOMATION_BYPASS_SECRET: ' BYPASS_SECRET
echo

# 1. 未認証が 401 になることを確認する（WWW-Authenticate ヘッダーでミドルウェア自身の 401 と判別）
curl -sS -o /dev/null -D - -w '%{http_code}\n' \
  -H "x-vercel-protection-bypass: ${BYPASS_SECRET}" \
  "https://<deployment-url>/" | grep -Ei '^(HTTP|www-authenticate)|^401$'

# 2. 正しい資格情報を付けると 200 になることを確認する（パスワードは対話プロンプトで入力）
curl -sS -o /dev/null -w '%{http_code}\n' \
  -H "x-vercel-protection-bypass: ${BYPASS_SECRET}" \
  -u "<user>" \
  "https://<deployment-url>/"
```

Deployment Protection（Vercel Authentication）が有効な間は素の `curl` ではミドルウェアに到達しない。Protection Bypass for Automation のシークレット（Project Settings → Deployment Protection で生成）で保護を迂回して検証する。`<deployment-url>` は実際のデプロイ URL に置き換える。シークレットはシェル履歴に残らないよう `read -s` で読み込み、リポジトリ・README・CI ログに書かない。本番ではなくプレビューデプロイ（`--prod` なし）で確認する。

```sh
# Deployment Protection が有効なら 200 以外（Vercel のログインへ誘導する応答）になる
curl -sI "https://<deployment-url>/"

# 存在しないパスで 404（config.json の 404 フォールバック、vercel-ssg の場合）を確認する
# 未認証のままだと Deployment Protection の応答（有効時）や Basic 認証の 401（導入時）が先に返るため、
# 保護有効時は Bypass ヘッダー、Basic 認証導入時は `-u "<user>"` を付ける（BYPASS_SECRET は前節の `read -s` で読み込む）
curl -sI -H "x-vercel-protection-bypass: ${BYPASS_SECRET}" -u "<user>" "https://<deployment-url>/does-not-exist"

# 正しい認証情報を付けると 200 になる（`-u "<user>"` のみ指定し、パスワードは対話入力。保護有効時は Bypass ヘッダーも付ける）
curl -sI -H "x-vercel-protection-bypass: ${BYPASS_SECRET}" -u "<user>" "https://<deployment-url>/"
```

Deployment Protection の有効・無効の確認用。無効化後の期待値は Basic 認証ミドルウェアの有無で変わる（未導入なら認証なしで 200、導入済みなら認証なしで 401、環境変数未設定なら 503）。

> **警告**: ミドルウェア（Basic 認証）なしのビルドで Deployment Protection を無効化すると、認証なしで誰でも閲覧できる状態で公開される。無効化する前に、Basic 認証が実際に効いている（未認証で 401、正しい資格情報で 200）ことを必ず確認すること。

## Vercel の旧デプロイの削除

```sh
vercel remove <deployment-url>
```

デプロイごとの URL は不変で、作成時点の環境変数・ミドルウェア有無を保持し続ける。認証情報のローテーション後や、ミドルウェア未導入のまま残った旧デプロイを無効化したい場合の手段（ダッシュボードからの削除でも可）。

> **警告**: `vercel remove` は指定したデプロイを削除する。削除後は元に戻せないため、対象の `<deployment-url>` を必ず確認してから実行すること。

## Vercel SSR のデプロイ（vercel-ssr、Container Images・Beta）

```sh
# 0. サンプルディレクトリへ移動する
cd examples/vercel-ssr

# 1. Vercel プロジェクト設定で PORT を 1024 以上（例 3100）に設定する
#    （Project Settings → Environment Variables）

# 2. プロジェクトを Vercel と紐付ける
vercel link

# 3. デプロイする（build step が Dockerfile.vercel を自動検出してビルドする）
vercel deploy
```

手順 1 の `PORT` 設定は必須。イメージは非 root（`USER 65532:65532`）で動くため、既定の `80` は使えない。Container Images は Beta で、チームでの有効化が必要な場合がある。

```sh
vercel deploy --prod
```

> **警告**: `--prod` は本番環境へデプロイする。先にプレビュー（`--prod` なし）で確認してから実行すること。

`--prebuilt` は付けない（`.vercel/output/` の事前ビルド成果物を使う静的配置向けのオプションで、`Dockerfile.vercel` の build step とは無関係）。ビルドは build step 内で行われ、事前にローカルで `docker build` / `docker push` する必要はない。`Dockerfile.vercel` は `FANDHE_FRONTEND_BIND_ADDR` を設定しない（設定すると `PORT` より優先されてしまうため）。公式 README は Vercel 実機での検証が未実施であることを明記している。

## Vercel SSR のローカル確認（vercel-ssr）

```sh
# ネイティブ起動（既定ループバック bind）
cargo run
# 別シェルで:
curl -sS http://127.0.0.1:3100/
curl -sSI http://127.0.0.1:3100/no-such-page   # 404
```

```sh
# PORT 経由の起動（Vercel Container Images と同じ経路）
PORT=3100 cargo run
```

`PORT` を渡すと `0.0.0.0:$PORT` で listen する（外部到達可能なアドレス）点に注意。bind 先の優先順位は `FANDHE_FRONTEND_BIND_ADDR` > `PORT` > 既定 `127.0.0.1:3100`。`PORT` が `1..=65535` の数値でない場合は起動失敗する。

```sh
cargo test
tools/ci/ensure-gate-tools.sh
cargo run -p fandhe-frontend-cli -- gate --project examples/vercel-ssr
```

サンプルのテスト（実プロセス起動・不正 PORT の fail-closed・SIGTERM による graceful shutdown の検証を含む）と `fw gate`（後者の 2 行はリポジトリルートから実行）。

```sh
docker build -f Dockerfile.vercel -t vercel-ssr-example .
docker run --rm -e PORT=3100 -p 3100:3100 vercel-ssr-example
# 別シェルで:
curl -sS http://127.0.0.1:3100/
curl -sSI http://127.0.0.1:3100/no-such-page   # 404

# 停止すると SIGTERM を受けて graceful shutdown する
docker stop <container-id>
```

`Dockerfile.vercel` を使った Docker イメージのビルド・起動確認。`/static/*` と WASM は出荷されないため `/static/*` は常に 404 になる。

> **警告**: `docker build -t <name>` は既存の同名タグを黙って上書きする。既存イメージを残したい場合はタグ名を変えること。
