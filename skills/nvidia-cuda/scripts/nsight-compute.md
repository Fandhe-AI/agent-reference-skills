# nsight-compute

ncu CLI commands for kernel-level profiling, metric sets, and report import/export. Source: NsightComputeCli

## 基本的なプロファイリング

```sh
ncu -o profile ./matmul
```

`-o` で出力レポートファイル（`.ncu-rep`）のベース名を指定する。

## カーネルの絞り込み

```sh
ncu -k matmul_kernel ./matmul
ncu -k regex:"matmul.*" ./matmul
ncu -s 10 -c 5 ./matmul
```

`-k` は名前の完全一致または `regex:` プレフィックスで正規表現マッチを行う。`-s` は先頭 N 回をスキップし、`-c` はそれに続く M 回だけプロファイルする。

## メトリクスセット・セクション・個別メトリクス

```sh
ncu --list-sets
ncu --set full ./matmul
ncu --section LaunchStats --section Occupancy ./matmul
ncu --metrics sm__throughput.avg.pct_of_peak_sustained_elapsed ./matmul
```

`--list-sets` で利用可能なセット一覧を確認し、`--set full`（詳細）/ `--set basic`（簡易）を選ぶ。`--section` で個別セクションを、`--metrics` で個別メトリクスを指定できる。

## マルチプロセス・リプレイモード

```sh
ncu --target-processes all ./matmul
ncu --replay-mode kernel ./matmul
```

`--target-processes all` は子プロセスを含む全プロセスを対象にする。`--replay-mode` は `kernel` / `application` / `range` を指定できる。

## レポートのインポート・エクスポート

```sh
ncu --import profile.ncu-rep --export filtered.ncu-rep -k matmul_kernel
```

既存レポートを読み込み、条件でフィルタして別レポートへエクスポートする。

## メトリクス問い合わせ・表示ページ

```sh
ncu --query-metrics
ncu --page details ./matmul
```

`--query-metrics` は利用可能な全メトリクス名を列挙する。`--page` は `details` / `raw` / `source` の表示ページを切り替える。

`.ncu-rep` にはソースパス・カーネル名・環境情報が埋め込まれるため、リポジトリにコミットしない。共有時は内部情報が含まれ得る点に注意する。
