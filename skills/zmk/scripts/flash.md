# Flash

ZMK ファームウェアのデバイスへの書き込みコマンド。

## ファームウェアのフラッシュ

```sh
west flash
```

> **警告**: フラッシュ中はデバイスを取り外さないこと。分割キーボードは初回に両側を個別にフラッシュする必要がある。

ビルドディレクトリを指定する場合:

```sh
west flash -d build/left
```

## nRF5340 ネットワークコアのビルドとフラッシュ

```sh
cd zephyr/samples/bluetooth/hci_rpmsg
west build -b nrf5340dk_nrf5340_cpunet
west flash
```

## UF2 ファイルを直接コピーする方法

ビルド後に生成される `build/zephyr/zmk.uf2` をデバイスの USB ストレージに直接コピーすることでもフラッシュできる（対応デバイスのみ）。
