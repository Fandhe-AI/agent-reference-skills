# デプロイガイド

fandhe-frontend の配布形態（静的出力 SSG / 単一実行ファイル）と、Vercel へのデプロイ方式（静的配置・Container Images による SSR）、Deployment Protection、Routing Middleware による Basic 認証を扱うガイド。

## Signature / Usage

静的配置（vercel-ssg、既定・推奨）:

```bash
# 0. サンプルディレクトリへ移動する（cargo run / vercel deploy は
#    このディレクトリ配下の Cargo.toml・.vercel/output を前提とする）
cd examples/vercel-ssg

# 1. プロジェクトを Vercel と紐付ける
vercel link

# 2. 静的出力を生成する（Vercel 側では実行されない）
cargo run --release

# 3. ビルド済み出力をそのままデプロイする
vercel deploy --prebuilt
# 本番デプロイの場合は --prod を付ける
```

SSR（vercel-ssr、Container Images・Beta）:

```bash
cd examples/vercel-ssr

# Vercel プロジェクト設定で PORT を 1024 以上（例 3100）に設定する
# （Project Settings → Environment Variables）

vercel link

# build step が Dockerfile.vercel を自動検出してビルドする（--prebuilt は付けない）
vercel deploy
vercel deploy --prod
```

## Options / Props

方式の選び方:

| ページ内容 | 推奨 |
|-----------|------|
| ビルド時に内容が確定する（ブログ・ドキュメント・マーケティングページ等） | `examples/vercel-ssg`（案 c、推奨。SSG → Vercel Build Output API → `vercel deploy --prebuilt`） |
| リクエストごとの描画が必要で、Vercel 上で動かす | `examples/vercel-ssr`（案 d、Container Images・Beta） |
| リクエストごとの描画が必要で、Vercel 以外のコンテナ基盤で動かす | `examples/dist-server-docker` |

Routing Middleware（Basic 認証、vercel-ssg の opt-in）:

| Name | Description |
|------|-------------|
| `FANDHE_VERCEL_SSG_BASIC_AUTH` | ビルド時に正確に `1` を指定したときだけ組み込む（既定は無効）。`src/main.rs` の `output_root_assets()` が `/functions/_middleware.func/.vc-config.json`・`/functions/_middleware.func/index.js`・`middlewarePath` ルートを先頭に加えた `config.json` を `.vercel/output` 配下へ `generate_assets` 経由で書き出す |
| `BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` | ミドルウェアが `process.env` から読む（名前は例）。どちらかが未設定・空文字なら 503 で常に拒否（fail-closed、`WWW-Authenticate` は付けない） |
| 応答 | 成功: `x-middleware-next` ヘッダー付き `Response`。失敗: 401 + `WWW-Authenticate: Basic realm="Restricted", charset="UTF-8"` |

`config.json` の `routes` 先頭（`{"handle": "filesystem"}` より前）に置く:

```jsonc
{
  "version": 3,
  "routes": [
    { "src": "/(.*)", "middlewarePath": "_middleware", "continue": true },
    { "handle": "filesystem" },
    { "src": "/(.*)", "status": 404, "dest": "/404.html" }
  ]
}
```

`.vc-config.json`:

```json
{
  "runtime": "edge",
  "entrypoint": "index.js",
  "envVarsInUse": ["BASIC_AUTH_USER", "BASIC_AUTH_PASSWORD"]
}
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/guides/deployment/
- 配布形態は 2 通り: 静的出力（`fandhe_frontend_server::ssg::generate_pages` で静的 HTML を書き出し任意の静的ホスティングへ。正本サンプル `examples/ssg-blog`）と、単一実行ファイル（`fandhe-frontend-dist-server` で SSR / 動的処理込みの単一バイナリを Docker で配布。REQ-9。正本サンプル `examples/dist-server-docker`）
- 案 c は Vercel 側に Rust ツールチェーン不要・Beta 機能に依存しない。案 d はリクエストごとの描画が必要な場合にだけ選び、Beta 依存の影響を SSR 用途に限定する
- 案 d の注意: Container Images は公式に Beta でチームでの有効化権限が必要な場合がある。`PORT` は **1024 以上**（例 `3100`）を設定（イメージが非 root の `USER 65532:65532` で動くため既定の `80` は使えない）。`Dockerfile.vercel` は `FANDHE_FRONTEND_BIND_ADDR` を設定しない（`PORT` より優先されてしまうため）。`fandhe-frontend-dist-server` 0.3.4 以降を使用。SIGTERM 後は最大 25 秒かけて接続を終える（Vercel の猶予 30 秒以内）。静的アセットと WASM は出荷しない。Vercel 実機での検証は未実施（イシュー #3339）
- Vercel の Rust ランタイム `vercel_runtime` は不採用: 1.x は依存先 `lambda_runtime` が Vercel の Rust Function 環境に無い `AWS_LAMBDA_*` 環境変数を必須として `expect` するため起動直後に panic して全リクエストが HTTP 500。2.x は本番で正常応答を実測済みだが依存木が基準（60 件 / 深さ 6）を超過し `build.rs` 持ちの依存も多数。Rust Function 実行自体も Beta
- Deployment Protection（Vercel Authentication / Standard Protection）は新規プロジェクトで既定有効（チーム設定で変わり得るため確認手順で確かめる）。有効な間、未認証アクセスは Vercel のログイン画面へ誘導されアプリ側ルーティング（Routing Middleware 含む）に到達しない。静的配置・SSR のどちらにも適用される。Basic 認証は Deployment Protection より弱い統制で、無効化したデプロイの軽量な門または多層防御の 2 層目として位置づける
- Deployment Protection を無効化する前の順序（vercel-ssg の場合）: (1) `FANDHE_VERCEL_SSG_BASIC_AUTH=1` でビルドし `BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` を設定した新デプロイを `vercel deploy --prebuilt` で作成、(2) 無効化前に Basic 認証が実際に効くことを確認（未認証 401・正しい資格情報で 200）、(3) ミドルウェア未導入の旧デプロイを洗い出し、公開すべきでなければ `vercel remove <deployment-url>` で削除（デプロイ URL は不変で再デプロイでは置き換わらない）、(4) Project Settings → Deployment Protection → Vercel Authentication を無効にして保存。ミドルウェア未導入のまま無効化すると**認証なしで誰でも閲覧できる**
- Protection が有効なままの Basic 認証確認は、素の `curl` では Vercel 側の応答しか得られないため、Protection Bypass for Automation（`x-vercel-protection-bypass` ヘッダー、デプロイに `VERCEL_AUTOMATION_BYPASS_SECRET` が自動設定）を使い、返る応答が `WWW-Authenticate` 付き 401 であることでミドルウェア到達を確認する。シークレットは `read -s` 等で変数に読み込み、リポジトリ・README・CI ログに書かない。まず preview（`--prod` なし）で確認する。期待どおりにならなければ Protection を無効化せず `middlewarePath` ルートの位置・`.vc-config.json`・環境変数を見直して再デプロイし確認をやり直す

  ```bash
  read -s -p 'VERCEL_AUTOMATION_BYPASS_SECRET: ' BYPASS_SECRET
  echo

  # 未認証が 401 になる（WWW-Authenticate でミドルウェア自身の応答と区別）
  curl -sS -o /dev/null -D - -w '%{http_code}\n' \
    -H "x-vercel-protection-bypass: ${BYPASS_SECRET}" \
    "https://<deployment-url>/" | grep -Ei '^(HTTP|www-authenticate)|^401$'

  # 正しい資格情報で 200（パスワードは curl の対話プロンプトで入力）
  curl -sS -o /dev/null -w '%{http_code}\n' \
    -H "x-vercel-protection-bypass: ${BYPASS_SECRET}" \
    -u "<user>" \
    "https://<deployment-url>/"
  ```

- Routing Middleware の手順は Build Output API（`config.json` の `routes`・`--prebuilt`、案 c）前提で、Container Images（案 d）には未検証のため適用しない。Routing Middleware は Build Output API 上 Edge Runtime 関数として仕様化されており `runtime: "edge"` が正しい。`clean_output_dir()` が毎回 `.vercel/output` を削除するため、追加ファイルは手書き配置でなく `generate_assets` で書き出す
- `index.js` の要件: 未設定・空なら 503、`Authorization` / 認証情報を `console.log` しない、`atob()` 後にバイト列へ戻して `new TextDecoder('utf-8', { fatal: true })` で UTF-8 デコード（不正入力は 401）、資格情報は SHA-256 ダイジェストの定数時間比較（長さで早期リターンしない）を `||` の短絡評価なしで user・password 両方に実施してから結合する。原文に完全な `index.js` が掲載され、`examples/vercel-ssg` の `src/main.rs::MIDDLEWARE_INDEX_JS` と同一内容（実装変更時は両方更新）
- 環境変数登録は対話プロンプトで値を入力（`echo | vercel env add` やコマンドライン引数は履歴に残るため避ける）。preview への登録は**必須**（未設定のままだとミドルウェアが fail-closed で常に 503 となり確認できない）。production のみに登録するなら `--prod` 付きで確認する

  ```bash
  vercel env add BASIC_AUTH_USER production
  vercel env add BASIC_AUTH_PASSWORD production

  vercel env add BASIC_AUTH_USER preview
  vercel env add BASIC_AUTH_PASSWORD preview
  ```

- 環境変数の変更は**変更後に作成したデプロイにだけ**反映される。デプロイ URL（`*.vercel.app`）は不変で、認証情報をローテーションしても旧デプロイは旧い認証情報を受け付け続ける。対処は `vercel remove <deployment-url>` またはダッシュボードでの削除。環境変数設定前に作ったミドルウェア入りデプロイは常に 503 の恒久的全拒否になるため、設定してから再デプロイする
- Basic 認証は Vercel の HTTPS 強制により経路上は保護されるが軽量な制限。機微データの保護には Deployment Protection 等を使う。認証情報はリポジトリ・`vercel.json`・README に書かない
- 出典: 公式 docs `guides/deployment`。再評価条件（Vercel Rust ランタイム・Container Images の GA 化等）と判断根拠・実測データは `docs/design/vercel-deployment-strategy.md`（§7 が再評価条件）に記載。pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9` の `Fandhe-AI/fandhe-frontend` リポジトリ内パス（本スキルには未収録）。外部一次情報は Vercel docs の Build Output API / Deployment Protection / Protection Bypass for Automation / Container Images / `vercel env` / `vercel remove`

## Related

- [JS ゼロ SSG 利用ガイド](./no-js-ssg.md)
- [npm アセットビルド](./npm-asset-build.md)
- [最小埋め込みガイド](./embedding-guide.md)
