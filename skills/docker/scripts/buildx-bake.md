---
source: https://docs.docker.com/reference/cli/docker/buildx/bake/
---

# Buildx Bake

`docker buildx bake` の実行コマンド集。出典は `docker buildx bake` の CLI リファレンス Examples（取得日 2026-10-16 JST、Buildx v0.38.0 相当）。bake ファイルの書式は `references/build-cache-bake/` を参照。

> **警告**: `--push` は結果をレジストリへ公開し、`--allow fs.write` / `fs=*` はホストのファイルシステム書き込みや広範な読み取りを許可する。使い捨ての検証環境・検証用レジストリで試してから使うこと。

## 指定した bake ファイルからターゲットをビルド

```sh
docker buildx bake -f docker-bake.dev.hcl db webapp-release
```

`-f` / `--file` は HCL / JSON / Compose ファイルを受け付け、複数指定すると設定が結合される。ターゲット名を渡すと指定ターゲットのみビルドする。環境変数 `BUILDX_BAKE_FILE` でも指定できる（`-f` と同時指定時は環境変数が無視される）。

## ターゲットと変数の一覧

```sh
docker buildx bake --list=targets
```

```sh
docker buildx bake --list=variables
```

```sh
docker buildx bake --list=type=targets,format=json
```

説明は bake ファイルの `description` プロパティから表示される。既定は表形式で、長形式 CSV 構文の `format` で JSON にできる。

## ビルドせずに解決後のオプションを表示

```sh
docker buildx bake -f docker-bake.hcl --print db
```

ターゲットの解決結果を JSON で出力するだけで、ビルドは開始しない。

## ビルド結果をローカルの Docker へロード

```sh
docker buildx bake --load --metadata-file metadata.json .
```

`--load` は `--set=*.output=type=docker` の簡易指定で、出力が `local` / `tar` の場合は上書きしない（条件付き）。`--metadata-file` はターゲットごとの結果メタデータを書き出す。

## レジストリへ push

> **警告**: イメージをレジストリへ公開する。ログイン済みの本番レジストリで誤実行しないこと。

```sh
docker buildx bake --push
```

`--push` は出力未定義なら `type=image,push=true` を追加する。出力が `local` / `tar` の場合は上書きしない。

## ターゲット実行の並列度と失敗時の挙動

```sh
docker buildx bake --jobs=defer-output # wait for all build results before exporting
docker buildx bake --jobs=defer-error  # let independent targets finish before returning an error
```

```sh
docker buildx bake -j=2                          # run at most two targets at the same time
docker buildx bake --jobs=parallel=1             # run targets sequentially
docker buildx bake --jobs=defer-error,parallel=2 # limit concurrency and let independent targets finish after a failure
```

既定の mode は `fail-fast`。`--jobs` を繰り返すと前の値が置き換わるため、mode と上限は同じフラグ値に指定する。

## コマンドラインからターゲット設定を上書き

```sh
docker buildx bake --set target.arg.mybuildarg=value
docker buildx bake --set target.platform=linux/arm64
docker buildx bake --set foo*.arg.mybuildarg=value    # overrides build arg for all targets starting with 'foo'
docker buildx bake --set *.platform=linux/arm64       # overrides platforms for all targets
docker buildx bake --set foo*.no-cache                # bypass caching only for targets starting with 'foo'
docker buildx bake --set target.platform+=linux/arm64 # appends 'linux/arm64' to the platform list
docker buildx bake --set target.contexts.bar=../bar   # overrides 'bar' named context
docker buildx bake --set target.resource.memory=2g    # overrides memory resource limit
docker buildx bake --set target.secret.aws=env=AWS    # overrides source for an existing secret
docker buildx bake --set target.tag=                  # clears all tag values
```

`--set` は繰り返し指定できる。配列フィールド（`tag` 等）は繰り返しか `+=` で複数値を渡し、`--set target.tag=[a,b]` の配列リテラルは非対応。パターンは Go の `path.Match` 構文。

## SSH エージェントソケットまたは鍵の指定

```sh
docker buildx bake --set "*.ssh=default=$HOME/.ssh/id_ed25519"
```

```sh
docker buildx bake --set "*.ssh=default=$HOME/.ssh/id_ed25519,$HOME/.ssh/id_rsa"
```

同じ `id` に複数パスを渡す場合はカンマで区切る。`$HOME` は buildx に渡る前にシェルが展開する。

## bake ファイル外のファイルシステムへのアクセス許可

> **警告**: `--allow` は buildx / BuildKit の制限を緩める。必要な最小のパスだけを許可し、ワイルドカード（`*`）は使い捨ての検証環境でのみ使うこと。

bake ファイルが `context = "../src"` のようにワーキングディレクトリ外を読む場合:

```sh
docker buildx bake --allow fs.read=* app
docker buildx bake --allow fs.read=../src app
docker buildx bake --allow fs=* app
```

`output = "/tmp"` のようにワーキングディレクトリ外へ書き込む場合:

```sh
docker buildx bake --allow fs=/tmp app
docker buildx bake --allow fs.write=/tmp app
docker buildx bake --allow fs.write=* app
```

`fs` は読み書き、`fs.read` は読み取り、`fs.write` は書き込みを許可する。`--allow=buildx.local.delete` は `mode=delete` 設定時にローカル出力が古いファイルを削除する権限を与える（原文）。
