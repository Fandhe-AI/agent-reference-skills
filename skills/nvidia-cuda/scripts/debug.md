# debug

cuda-gdb / cuda-gdbserver commands for local and remote kernel debugging. Source: cuda-gdb

## デバッグビルド

```sh
nvcc -g -G matmul.cu -o matmul
```

`-g -G` は最適化を `-O0` に固定し、ホスト・デバイス双方にデバッグ情報を含める。最適化されたコードのまま行番号情報のみ欲しい場合は次を使う。

```sh
nvcc -lineinfo matmul.cu -o matmul
```

## ローカルデバッグの開始

```sh
cuda-gdb ./matmul
```

## リモートデバッグ

> **警告**: `cuda-gdbserver` のリモート接続には認証機構がない。公開ネットワークに晒さず、`localhost` や隔離されたネットワーク内でのみ使用すること。

```sh
cuda-gdbserver :1234 ./matmul
```

ターゲット側で起動後、ホスト側の `cuda-gdb` から接続する（`cuda-gdb` プロンプトに入力する）。

```sh
target remote localhost:1234
```

## ブレークポイントとスレッド操作

以下は `cuda-gdb` 起動後の対話プロンプト（`(cuda-gdb)`）に入力するコマンドであり、シェルには入力しない。

```sh
break my_kernel
break matmul.cu:185
cuda thread (0,0,0)
cuda kernel 0
```

`cuda thread` / `cuda kernel` はカレントの CUDA フォーカスを指定したスレッド・カーネルへ切り替える。

## 状態の表示

`cuda-gdb` プロンプトに入力するコマンド。

```sh
info cuda kernels
info cuda threads
info cuda blocks
info cuda warps
info cuda devices
```

実行中の全カーネル・スレッド・ブロック・ワープ・デバイスの状態を一覧表示する。

## カーネル起動ごとの自動停止

`cuda-gdb` プロンプトに入力するコマンド。

```sh
set cuda break_on_launch application
```

アプリケーション内の全カーネル起動時に自動でブレークする。
