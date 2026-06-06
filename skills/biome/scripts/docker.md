# docker

Docker を使った Biome の実行コマンド集。ローカルインストールなしで利用できる。

## フォーマットの実行（ドライラン）

```sh
docker run -v $(pwd):/code ghcr.io/biomejs/biome format
```

## フォーマットの実行（書き込み）

```sh
docker run -v $(pwd):/code ghcr.io/biomejs/biome format --write
```

> **警告**: カレントディレクトリのファイルをコンテナ内から上書きする。

## リントの実行

```sh
docker run -v $(pwd):/code ghcr.io/biomejs/biome lint
```

## リントの実行（安全な自動修正）

```sh
docker run -v $(pwd):/code ghcr.io/biomejs/biome lint --write
```

> **警告**: カレントディレクトリのファイルをコンテナ内から上書きする。
