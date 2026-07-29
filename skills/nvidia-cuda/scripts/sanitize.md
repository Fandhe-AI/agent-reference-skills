# sanitize

compute-sanitizer invocations for memcheck, racecheck, initcheck, and synccheck. Source: ComputeSanitizer

## 基本実行（memcheck）

```sh
compute-sanitizer ./app
```

`--tool` を省略するとデフォルトの `memcheck` が実行され、メモリアクセス違反やアラインメント違反を検出する。

## ツール別実行

```sh
compute-sanitizer --tool memcheck ./app
compute-sanitizer --tool racecheck ./app
compute-sanitizer --tool initcheck ./app
compute-sanitizer --tool synccheck ./app
```

`racecheck` は共有メモリ競合、`initcheck` は未初期化デバイスメモリのアクセス、`synccheck` は同期プリミティブの誤用を検出する。

## メモリリーク検出とバックトレース

```sh
compute-sanitizer --tool memcheck --leak-check full ./app
compute-sanitizer --show-backtrace yes ./app
```

`--leak-check full` はカーネル終了後も解放されないデバイスメモリを報告する。`--show-backtrace` は `yes`（ホスト・デバイス両方）/ `host` / `device` / `no` を指定できる。

## カーネルの絞り込みと起動回数制御

```sh
compute-sanitizer --kernel-name matmul_kernel ./app
compute-sanitizer --launch-skip 10 --launch-count 5 ./app
```

`--kernel-name` は指定した名前の部分一致でカーネルを絞り込む（除外したい場合は `--kernel-name-exclude regex:"pattern"` を使う）。`--launch-skip` / `--launch-count` は最初の N 回をスキップしてから M 回だけチェックする。
