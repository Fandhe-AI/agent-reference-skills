# profiling

rocprofv3 tracing, ROCm Compute Profiler kernel analysis, and ROCm Systems Profiler instrumentation commands. Source: rocprofiler-sdk/using-rocprofv3

## HIP API / カーネルトレース

```sh
rocprofv3 --hip-trace -- ./myapp
```

`--hip-trace` は HIP API 呼び出しをトレースする。

```sh
rocprofv3 --kernel-trace --stats -- ./myapp
```

`--kernel-trace` はカーネル実行のみ、`--stats` はサマリ統計を追加出力する。`--` 以降にプロファイル対象の実行ファイルと引数を渡す。

## ROCm Compute Profiler によるカーネル解析

```sh
rocprof-compute profile -n vcopy_data -- ./vcopy -n 1048576 -b 256
```

`-n` でプロファイル名を指定し、`--` 以降にプロファイル対象のコマンドを渡す。

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
