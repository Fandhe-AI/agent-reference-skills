# gpu-query

nvidia-smi commands for querying and monitoring GPU state. Source: deploy/nvidia-smi

## GPU 一覧の表示

```sh
nvidia-smi -L
```

搭載されている各 GPU と UUID を一覧表示する。root 権限は不要。

## 全属性の照会

```sh
nvidia-smi -q
```

温度・クロック・メモリ・ECC 等の全属性を表示する。root 権限は不要。

## 特定プロパティの CSV 出力

```sh
nvidia-smi --query-gpu=index,name,driver_version,memory.total,memory.used,utilization.gpu --format=csv,noheader
```

`--query-gpu` にカンマ区切りでプロパティを指定し、`--format=csv` は必須、`noheader` / `nounits` は任意。

## デバイス・プロセスモニタリング

```sh
nvidia-smi dmon -i 0 -s pucm -d 5
nvidia-smi pmon -i 0 -d 2
```

`dmon` はデバイス単位（電力・温度・クロック・使用率等）を、`pmon` はプロセス単位の使用率を一定間隔で表示する。`-i` で対象 GPU、`-d` で間隔秒数を指定する。

## トポロジー表示

```sh
nvidia-smi topo -m
```

GPU 間・GPU-NIC 間の接続トポロジーと CPU/メモリアフィニティを表示する。Linux 専用。NIC 側の sysfs 情報取得には root 権限が必要な場合がある。

## 永続化モード・クロック固定

> **警告**: 以下は root 権限が必要で、ホスト全体の GPU 状態を恒久的に（再起動までの間）変更する。永続化モードは再起動で無効に戻る。クロック固定は稼働中の他ワークロードにも影響するため、実施前に影響範囲を確認すること。

```sh
sudo nvidia-smi -pm 1
sudo nvidia-smi -lgc 1500,1500
sudo nvidia-smi -rgc
```

`-pm 1` は永続化モードを有効化する。`-lgc` は GPU クロックを指定 MHz レンジに固定する（Volta 以降対応）。`-rgc` はクロック固定を解除しデフォルトへ戻す。

実機の GPU 運用・プロビジョニング（MIG・ECC 設定・ファームウェア更新等）は dgx-spark スキルの scripts/ を参照する。本ファイルは開発者向けの照会・監視コマンドに限定する。
