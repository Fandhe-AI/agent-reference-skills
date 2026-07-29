# binary-utilities

cuobjdump / nvdisasm / nvprune commands for inspecting and pruning CUDA binaries. Source: cuda-binary-utilities

## cuobjdump による SASS / PTX の抽出

```sh
cuobjdump -sass matmul.cubin
cuobjdump -ptx app
```

`-sass` は cubin を逆アセンブルして CUDA アセンブリを表示する。`-ptx` はホスト実行ファイル内に埋め込まれた PTX テキストを抽出する。任意の cubin / ホスト実行ファイルを指定する。

## cuobjdump による ELF セクション・リソース使用量の表示

```sh
cuobjdump -elf matmul.cubin
cuobjdump -res-usage matmul.cubin
```

`-elf` は ELF セクションを人が読める形式でダンプする。`-res-usage` は関数ごとのリソース使用量（レジスタ・共有メモリ等）を表示する。

## cuobjdump による埋め込み ELF の一覧・抽出

```sh
cuobjdump -lelf app
cuobjdump -xelf all app
```

`-lelf` はホスト実行ファイルに埋め込まれた全 ELF ファイルを一覧表示する。`-xelf all` は全てを、`-xelf <部分名>` は名前が一致するものだけを抽出する。

## nvdisasm による逆アセンブル

```sh
nvdisasm -c matmul.cubin
nvdisasm -g matmul.cubin
nvdisasm -json matmul.cubin
```

`-c` はコードセクションのみ出力する。`-g` はソース行情報を注釈する。`-json` は JSON 形式で出力する。

## nvdisasm による制御フローグラフ出力

```sh
nvdisasm -cfg matmul.cubin | dot -ocfg.png -Tpng
```

`-cfg` は DOT 形式の制御フローグラフを出力する。Graphviz の `dot` コマンドで画像化する。

## nvprune によるアーカイブの枝刈り

```sh
nvprune -arch sm_100 libcublas_static.a -o libcublas_static100.a
nvprune -gencode arch=compute_90,code=sm_90 input.o -o output.o
```

`-arch` は指定した単一アーキテクチャのコードのみを残す。`-gencode` は nvcc と同じ書式で複数アーキテクチャを指定する。
