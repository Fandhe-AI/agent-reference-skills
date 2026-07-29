# debug

rocgdb commands for local kernel debugging and HIP runtime logging/serialization environment variables. These are AMD ROCm commands (rocgdb, AMD_LOG_LEVEL), not the same-named NVIDIA CUDA toolchain; the NVIDIA equivalent is covered by the separate nvidia-cuda skill. Source: HIP/debugging

## デバッグビルド

```sh
hipcc -g myapp.hip -o myapp
```

`-g` はホスト・デバイス双方にデバッグ情報を含める。

## ローカルデバッグの開始

```sh
rocgdb ./myapp
```

## ブレークポイントと実行

以下は `rocgdb` 起動後の対話プロンプトに入力するコマンドであり、シェルには入力しない。

```sh
break main
run
c
```

## ログレベルの設定

```sh
export AMD_LOG_LEVEL=5
```

`AMD_LOG_LEVEL` は 0（無効）〜5（デバッグ詳細）で HIP ランタイムの診断ログを制御する。

## カーネル実行の逐次化

```sh
export HIP_LAUNCH_BLOCKING=1
```

`HIP_LAUNCH_BLOCKING=1` はカーネル起動を同期実行にし、クラッシュ箇所の切り分けを容易にする。

```sh
export AMD_SERIALIZE_KERNEL=3
```

`AMD_SERIALIZE_KERNEL` はカーネル enqueue 前後の待機を制御する（`1`: enqueue 前に待機、`2`: enqueue 後に待機、`3`: 両方）。デバッグ時のみ使用し、常用すると性能が大きく低下する。
