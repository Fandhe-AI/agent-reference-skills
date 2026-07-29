# gpu-query

rocminfo and amd-smi commands for querying and monitoring GPU state. These are AMD ROCm commands (rocminfo, amd-smi), not the same-named NVIDIA CUDA toolchain; the NVIDIA equivalent is covered by the separate nvidia-cuda skill. Source: amdsmi/amdsmi-cli-tool

## agent 一覧の表示

```sh
rocminfo
```

搭載されている CPU/GPU の agent と、GPU の gfx アーキ名を一覧表示する。

## デバイス一覧の表示

```sh
amd-smi list -e
amd-smi list --gpu 0
```

`list` は BDF・UUID・KFD ID を含むデバイス一覧を表示する。`--gpu` で対象デバイスを絞り込む。

## 静的ハードウェア情報の照会

```sh
amd-smi static --gpu 0
```

クロック・メモリ構成等のハードウェア静的情報を表示する。

## 動的メトリクスの照会

```sh
amd-smi metric --gpu 0 -p -t -c
```

`-p`（電力）・`-t`（温度）・`-c`（クロック）等のフラグでメトリクスを絞り込む。

## リアルタイムモニタリング

```sh
amd-smi monitor --power-usage --temperature
amd-smi monitor -w 1 --iterations 30
```

`-w` は表示間隔秒数、`--iterations` は表示回数。

## バージョン確認

```sh
amd-smi version
```

## GPU リセット

> **警告**: `reset` は GPU を再初期化する。稼働中の他プロセスに影響するため、実施前に影響範囲を確認すること。

```sh
sudo amd-smi reset --gpu 0 --gpureset
```

`amd-smi` は旧 `rocm-smi` の後継コマンドであり、本ファイルでは `amd-smi` を使用する。
