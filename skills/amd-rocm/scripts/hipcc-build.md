# hipcc-build

hipcc invocations for HIP source compilation, AOT offload-arch targeting, and debug builds. Source: HIP/install-build

## 基本コンパイル

```sh
hipcc mykernel.hip.cpp -o mykernel
```

`hipcc` はターゲットに応じて `clang` を呼び出すコンパイラドライバー。HIP のインクルード・ライブラリパスを自動で解決する。

## AOT ターゲット指定コンパイル

```sh
hipcc --offload-arch=gfx942 mykernel.hip.cpp -o mykernel
```

`--offload-arch` に GPU の gfx アーキ名（例: `gfx942`、`gfx1100`）を指定し、事前コンパイル（Ahead-Of-Time）を行う。実機の gfx 名は `rocminfo` で確認する。

```sh
rocminfo
```

## デバッグビルド

```sh
hipcc -g mykernel.hip.cpp -o mykernel
```

`-g` はホスト・デバイス双方にデバッグ情報を含める。
