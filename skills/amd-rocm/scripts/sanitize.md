# sanitize

GPU AddressSanitizer build flags and runtime environment for detecting out-of-bounds and use-after-free errors on the device. These are AMD ROCm commands (hipcc -fsanitize=address, HSA_XNACK), not the same-named NVIDIA CUDA toolchain; the NVIDIA equivalent is covered by the separate nvidia-cuda skill. Source: llvm-project/using-gpu-sanitizer

## ASan 有効化ビルド

```sh
hipcc -g --offload-arch=gfx90a:xnack+ -fsanitize=address -shared-libsan myapp.hip -o myapp
```

`--offload-arch=<gfx>:xnack+` で対象アーキの XNACK を明示的に有効化し、`-fsanitize=address` で計装、`-shared-libsan` で共有ランタイム版の ASan を使用する。

## 実行時の環境変数設定

```sh
export HSA_XNACK=1
export LD_LIBRARY_PATH=/opt/rocm-7.2.4/lib/asan:/opt/rocm-7.2.4/lib/llvm/lib/asan:$LD_LIBRARY_PATH
```

`/opt/rocm-7.2.4` はインストールしたバージョンに応じて読み替える。`HSA_XNACK=1` はランタイム側でも XNACK ページマイグレーションを有効化する。

## ASan 実行時オプション

```sh
export ASAN_OPTIONS=halt_on_error=1,detect_leaks=0
```

`halt_on_error=1` は最初のエラーで停止、`detect_leaks=0` は GPU 対応が限定的なリーク検出を無効化する。

## 計装済みアプリの実行

```sh
./myapp
```

環境変数設定後は通常どおり実行するだけでよい。エラー検出時は ASan がスタックトレース付きで報告する。
