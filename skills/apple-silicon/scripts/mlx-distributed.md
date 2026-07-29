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
mlx.launch --backend nccl --hosts linux-1,linux-2 -n 8 --no-verify-script -- ./my-job.sh
```

## MPI バックエンドに追加引数を渡す

```sh
mlx.launch --backend mpi --mpi-arg '--mca btl_tcp_if_include en0' --hostfile hosts.json my_script.py
```
