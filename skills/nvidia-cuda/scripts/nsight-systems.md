# nsight-systems

nsys CLI commands for system-wide timeline profiling, session control, and post-collection analysis. Source: nsight-systems UserGuide

## タイムラインプロファイリング

```sh
nsys profile --trace=cuda,nvtx --output=report --duration=30 --sample=process-tree ./matmul
```

`--trace` で収集対象（CUDA API・NVTX 等）を指定し、`--output` でレポートファイル名を、`--duration` で収集時間（秒）を、`--sample` で CPU サンプリング範囲を指定する。

## NVTX 範囲によるキャプチャ制御

```sh
nsys profile --trace=cuda,nvtx --capture-range=nvtx --nvtx-capture=capture_region@my_domain ./matmul
```

指定した NVTX 範囲（`nvtxRangePush`/`nvtxRangePop` 等で命名した range と domain）に入っている間だけ収集する。

## セッションの起動・開始・停止

```sh
nsys launch ./matmul
nsys start --output=report
nsys stop
nsys shutdown
```

`launch` はプロファイル対象を起動して待機状態にし、`start` / `stop` で収集区間を制御し、`shutdown` でセッションを終了する。

## セッション一覧の確認

```sh
nsys sessions list
```

## レポートの統計・エクスポート・分析

```sh
nsys stats report.nsys-rep
nsys export --type=sqlite report.nsys-rep
nsys import report.qdstrm --output-file=report.nsys-rep
nsys analyze --rule=all report.nsys-rep
```

`stats` はサマリー統計を出力し、`export` は SQLite 等の形式へ変換し、`import` は中間形式（`.qdstrm`）から `.nsys-rep` を生成し、`analyze` はルールベースの診断を行う。

`.nsys-rep` にはソースパス・カーネル名・環境情報が埋め込まれるため、リポジトリにコミットしない。共有時は内部情報が含まれ得る点に注意する。
