# profiling

rocprofv3 tracing, ROCm Compute Profiler kernel analysis, and ROCm Systems Profiler instrumentation commands. Source: rocprofiler-sdk/using-rocprofv3, rocprofv3-cli-options, using-kernel-replay-rocprofv3, rocprofiler-compute profile mode, rocprofiler-systems output, ROCm 10.1.0 release notes

## HIP API / カーネルトレース

```sh
rocprofv3 --hip-trace -- ./myapp
```

`--hip-trace` は HIP API 呼び出しをトレースする。

```sh
rocprofv3 --kernel-trace --stats -- ./myapp
```

`--kernel-trace` はカーネル実行のみ、`--stats` はサマリ統計を追加出力する。`--` 以降にプロファイル対象の実行ファイルと引数を渡す。

## HIP event トレース

```sh
rocprofv3 --hip-event-trace -- ./myapp
```

`hipEventRecord` / `hipStreamWaitEvent` が生成する GPU 側の HIP event barrier をトレースする。`--hip-trace` と `--hip-runtime-trace` で自動的に有効化される。

## kernel replay によるカウンター収集（Beta）

```sh
rocprofv3 --pmc SQ_WAVES GRBM_COUNT --pmc GRBM_GUI_ACTIVE --replay-mode kernel --kernel-replay-beta-enabled -- <application>
```

複数の `--pmc` グループを 1 回のアプリ実行で収集する。dispatch ごとにグループ数だけ再実行し、パス間でデバイスメモリを復元する。`--kernel-replay-beta-enabled` は experimental である旨の明示。

主な制約（公式の Limitations）:

- Beta のため、フラグ・SDK API・出力スキーマは将来変更される可能性がある
- `--pmc` が必須で、各 `--pmc` グループは 1 ハードウェアパスに収まる必要がある
- `--att` / PC sampling / `--spm` とは併用不可（拒否される）
- HIP graph 起動は replay されない（警告のうえ通常実行）
- 単一パケット・単一 dispatch の submission のみ replay 対象
- 単一プロセスのみ（MPI / プロセス間協調は未対応）
- ホスト RAM に追跡対象デバイスメモリの複製を持つ。巨大なフットプリントでは application replay より高コストになりうる
- 復元対象は coarse-grained デバイス VRAM とモジュールスコープの `__device__` / `__constant__` 変数。unified / managed / `hipMallocAsync` / host / fine-grained 等は復元されない

## ROCm Compute Profiler によるカーネル解析

```sh
rocprof-compute profile -n vcopy_data -- ./vcopy -n 1048576 -b 256
```

`-n` でプロファイル名を指定し、`--` 以降にプロファイル対象のコマンドを渡す。ROCm Compute Profiler 3.9.0 以降、プロファイルは常に rocpd 形式で出力される。CSV backend、`--format-rocprof-output`、`--join-type` は削除済みで、旧 CSV backend で取得した workload は再プロファイルが必要。

```sh
rocprof-compute analyze --help
```

`analyze` はプロファイル結果を解析する。`rocprof-compute` は `omniperf` の後継コマンド。

## ROCm Systems Profiler による動的計装

```sh
rocprof-sys-instrument -o myapp.inst -- ./myapp
rocprof-sys-run -- ./myapp.inst
```

`rocprof-sys-instrument` はバイナリを計装して `-o` で指定した新しい実行ファイルを生成し（binary rewrite モード）、`rocprof-sys-run` で計装済みバイナリを実行する。`rocprof-sys-*` は `omnitrace-*` の後継コマンド。

## ROCm Systems Profiler の出力形式（rocpd / Perfetto）

```sh
rocprof-sys-sample --output-format proto -- ./your_application
```

出力形式を指定しない場合の既定は rocpd（SQLite、`rocpd.db`）。Perfetto（`.proto`）は `--output-format proto` で明示的に有効化する。両方出力する場合は `--output-format proto rocpd`。

手動計装は ROCTx（`rocprofiler-sdk-roctx`）を使う。旧 `rocprof-sys-user` ライブラリと `rocprofsys_user_*` C API は削除済み。
