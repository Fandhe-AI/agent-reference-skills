# Debug

ZMK ファームウェアのデバッグ・ログ確認コマンド（USB ロギング）。

## USB ロギング有効ビルド

```sh
west build -b nice_nano -S zmk-usb-logging -- -DSHIELD="corne_left"
```

`-S zmk-usb-logging` スニペットを指定してビルドすることで USB シリアルにログを出力する。

## ログの確認（Linux）

```sh
sudo tio /dev/ttyACM0
```

## ログの確認（macOS）

```sh
sudo tio /dev/tty.usbmodem14401
```

macOS にプリインストールされている `cu` ユーティリティを使う場合:

```sh
sudo cu -l /dev/tty.usbmodem14401
```

## スニペット非対応ボード向けの有効化（Kconfig）

`config/<keyboard>.conf` に以下を追記する:

```
CONFIG_ZMK_USB_LOGGING=y
```

## 起動時の早期ログを取得するための遅延設定

`config/<keyboard>.conf` に以下を追記する:

```
CONFIG_LOG_PROCESS_THREAD_STARTUP_DELAY_MS=8000
```
