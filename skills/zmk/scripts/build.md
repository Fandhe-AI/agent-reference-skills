# Build

ZMK ファームウェアのローカルビルドコマンド（`west` コマンド使用）。

## オンボード MCU キーボードのビルド

```sh
west build -b planck_rev6
```

`app/` ディレクトリ内で実行する。

## アドオン MCU ボード + シールドのビルド

```sh
west build -b proton_c -- -DSHIELD=kyria_left
```

## Kconfig フラグ付きビルド

```sh
west build -b planck_rev6 -- -DCONFIG_ZMK_SLEEP=y
```

## プリスティンビルド（新規ボード・シールド向け）

```sh
west build -p -b nice_nano -- -DSHIELD=kyria_left
```

`-p` フラグでキャッシュを破棄して完全に再ビルドする。

## 分割キーボードの左側ビルド

```sh
west build -d build/left -b nice_nano -- -DSHIELD=kyria_left
```

## 分割キーボードの右側ビルド

```sh
west build -d build/right -b nice_nano -- -DSHIELD=kyria_right
```

分割キーボードは初回インストール時に両側を別々にビルド・フラッシュする必要がある。

## ビルドディレクトリキャッシュを使用した再ビルド

```sh
west build -d build/left
```

## 外部モジュール付きビルド

```sh
west build -b nice_nano -- -DSHIELD=vendor_shield -DZMK_EXTRA_MODULES="/absolute/path/to/module"
```

複数モジュールはセミコロン区切りで指定する:

```sh
west build -b nice_nano -- -DSHIELD=vendor_shield -DZMK_EXTRA_MODULES="path1;path2"
```

## zmk-config フォルダ指定ビルド

```sh
west build -b nice_nano -- -DSHIELD=kyria_left -DZMK_CONFIG="/path/to/zmk-config/config"
```

## CMake 引数の永続設定

```sh
west config build.cmake-args -- -DSHIELD=kyria_left
```

## USB ロギング有効ビルド

```sh
west build -b nice_nano -S zmk-usb-logging -- -DSHIELD="corne_left"
```
