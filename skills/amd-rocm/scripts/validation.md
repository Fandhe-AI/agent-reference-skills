# validation

ROCm Validation Suite (rvs) commands for GPU listing, configuration-driven stress tests, and stress-level runs. Source: ROCmValidationSuite/ug1main

## GPU 一覧の表示

```sh
rvs -g
```

RVS が認識している GPU を一覧表示する。

## 設定ファイルによるテスト実行

```sh
rvs -c conf/gst_single.conf
```

`-c` で指定した設定ファイル（GPU Stress Test 等のモジュール定義）に従ってテストを実行する。設定ファイルは RVS のインストール先（`/opt/rocm/share/rvs/conf/` 等）に含まれる。

## ストレスレベル指定実行

```sh
rvs -r 3
```

`-r` は 1〜5 のストレスレベルを指定する定義済みテストを実行する（5 が最大負荷）。
