# Jobset

`.kicad_jobset` ファイルで定義されたジョブセットを CLI から実行する。

## ジョブセットの全デスティネーションを実行

```sh
kicad-cli jobset run --file outputs.kicad_jobset project.kicad_pro
```

ジョブセットファイル内の全デスティネーションを順番に実行する。

## ジョブセットの特定デスティネーションのみ実行

```sh
kicad-cli jobset run --file outputs.kicad_jobset --output "Gerbers" project.kicad_pro
```

`--output` にはデスティネーションの説明文または ID を指定する。説明文はジョブセット内で一意である必要がある。

## エラー発生時に停止するジョブセット実行

```sh
kicad-cli jobset run --file outputs.kicad_jobset --stop-on-error project.kicad_pro
```

デフォルトではエラーがあっても続行する。`--stop-on-error` を付けるとジョブが失敗した時点で停止する。

## ジョブセットのヘルプ表示

```sh
kicad-cli jobset run --help
```
