# sanitize

GPU AddressSanitizer build flags and runtime environment for detecting out-of-bounds and use-after-free errors on the device. These are AMD ROCm commands (hipcc -fsanitize=address, HSA_XNACK), not the same-named NVIDIA CUDA toolchain; the NVIDIA equivalent is covered by the separate nvidia-cuda skill. Source: llvm-project/using-gpu-sanitizer, install/asan.rst

## ASan 有効化ビルド

```sh
hipcc -g --offload-arch=gfx942:xnack+ -fsanitize=address -shared-libsan myapp.hip -o myapp
```

`--offload-arch=<gfx>:xnack+` で対象アーキの XNACK を明示的に有効化し、`-fsanitize=address` で計装、`-shared-libsan` で共有ランタイム版の ASan を使用する。ROCm 10.1.0 の ASAN パッケージは gfx942 / gfx950 のみ対応のため、MI350 系では `gfx950:xnack+` を指定する（install/asan.rst）。実行環境の GPU とビルド対象を揃えること。

## 実行時の環境変数設定

```sh
# Configure ROCM_ASAN_PATH to the ASan install tree
export ROCM_ASAN_PATH=/opt/rocm/core-asan-10.1

# Enable XNACK for device-side GPU instrumentation
# Without this, only host-side (CPU) errors will be detected
export HSA_XNACK=1

# Locate ASan runtime directory and append instrumented library directories
ASAN_LIB_PATH=$(amdclang --print-file-name=libclang_rt.asan-x86_64.so 2>/dev/null || echo "")
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:${ASAN_LIB_PATH%/*}:${ROCM_ASAN_PATH}/lib:${ROCM_ASAN_PATH}/lib/llvm/lib:${ROCM_ASAN_PATH}/lib/rocm_sysdeps/lib/"

export ASAN_LIB_NAME=libclang_rt.asan-x86_64.so
export LD_PRELOAD="${ASAN_LIB_PATH%/*}/$ASAN_LIB_NAME:${ROCM_ASAN_PATH}/lib/libamdhip64.so:${ROCM_ASAN_PATH}/lib/libhsa-runtime64.so"
```

ROCm 10.1.0 の install/asan.rst（post-installation、パッケージマネージャー版）の内容。ASAN パッケージ（`amdrocm-asan10.1` / `amdrocm-asan10.1-gfx942` / `amdrocm-asan10.1-gfx950`。対象は gfx942 と gfx950 のみ）は `/opt/rocm/core-asan-10.1` にインストールされ、通常の `/opt/rocm/core-10.1` とは分離される。tarball 版は `ROCM_ASAN_PATH` を展開先の `install` ディレクトリにし、`PATH` に `$ROCM_ASAN_PATH/bin` を追加する（同 rst の tarball 手順）。

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
