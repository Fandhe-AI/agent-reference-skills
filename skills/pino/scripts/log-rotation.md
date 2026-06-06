# log-rotation

ログファイルのローテーション設定

> **警告**: ログローテーションはファイルの削除・上書きを伴う。`rotate` の保持期間と `compress` の設定を事前に確認すること。

## logrotate 設定ファイルの例（/etc/logrotate.d/myapp）

```sh
/var/log/myapp.log {
  su root
  daily
  rotate 7
  delaycompress
  compress
  notifempty
  missingok
  copytruncate
}
```

OS の `logrotate` デーモンと組み合わせて使用する。`rotate 7` は 7 世代分を保持することを意味する。

## systemd サービス定義でのパイプ出力

```sh
ExecStart=/bin/sh -c '/path/to/node app.js | pino-transport'
```

systemd 経由でアプリを起動し、ログをトランスポートへパイプする場合の例。
