# mlx-distributed

Launching an MLX Python script across multiple processes and hosts with `mlx.launch`. Source: Launching Distributed Programs

## ローカルで複数プロセスを起動して動作確認する

```sh
mlx.launch -n 2 my_script.py
```

## 複数ホストで起動する

```sh
mlx.launch --hosts ip1,ip2 my_script.py
```

## NCCL バックエンドで複数ノード・複数 GPU を使う

```sh
mlx.launch --backend nccl --hosts linux-1,linux-2 -n 8 -- ./my-job.sh
```

v0.32.4 の launcher はスクリプト検証を行わず（v0.32.0 の検証スキップ用オプションは廃止）、`--` 以降の実行可能ファイル（例: `./my-job.sh`）をそのまま起動する（MLX v0.32.4 の usage/launching_distributed.rst）。

## MPI バックエンドに追加引数を渡す

```sh
mlx.launch --backend mpi --mpi-arg '--mca btl_tcp_if_include en0' --hostfile hosts.json my_script.py
```

## JACCL バックエンドで Thunderbolt 接続の複数 Mac を使う

```sh
mlx.launch --verbose --backend jaccl --hostfile m3-ultra-jaccl.json -- \
     /path/to/remote/python -m mlx_lm chat --model mlx-community/DeepSeek-R1-0528-4bit
```

`m3-ultra-jaccl.json` は `mlx.distributed_config --backend jaccl --auto-setup --output m3-ultra-jaccl.json` で生成した hostfile（MLX v0.32.4 の usage/distributed.rst）。`--env MLX_METAL_FAST_SYNCH=1` で GPU/CPU 同期を高速化できるが、デッドロックや GPU 停止の恐れがあるため、公式では既定で無効・未設定のままが推奨。
