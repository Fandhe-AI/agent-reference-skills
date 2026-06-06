# Validate

DRC・ERC による設計ルール検証とレポート生成。

## PCB デザインルールチェック (DRC)

```sh
kicad-cli pcb drc --output drc_report.rpt board.kicad_pcb
```

DRC レポートをテキスト形式で出力する。

## DRC を JSON 形式で出力

```sh
kicad-cli pcb drc --output drc_report.json --format json board.kicad_pcb
```

## DRC でゾーンを再充填してから検証

```sh
kicad-cli pcb drc --refill-zones --output drc_report.rpt board.kicad_pcb
```

## DRC 違反があれば終了コード 5 を返す（CI 向け）

```sh
kicad-cli pcb drc --exit-code-violations --output drc_report.rpt board.kicad_pcb
```

CI パイプラインで違反を検出したい場合に使用する。終了コード 5 = 違反あり、0 = 問題なし。

## DRC でスキーマティックとの整合確認

```sh
kicad-cli pcb drc --schematic-parity --output drc_report.rpt board.kicad_pcb
```

## DRC で全エラーを報告（エラー・警告・除外すべて）

```sh
kicad-cli pcb drc --severity-all --output drc_report.rpt board.kicad_pcb
```

## スキーマティック電気ルールチェック (ERC)

```sh
kicad-cli sch erc --output erc_report.rpt schematic.kicad_sch
```

## ERC を JSON 形式で出力

```sh
kicad-cli sch erc --output erc_report.json --format json schematic.kicad_sch
```

## ERC 違反があれば終了コード 5 を返す（CI 向け）

```sh
kicad-cli sch erc --exit-code-violations --output erc_report.rpt schematic.kicad_sch
```

## ボード統計レポートの出力

```sh
kicad-cli pcb export stats --output stats.rpt board.kicad_pcb
```

## ボード統計を JSON 形式で出力

```sh
kicad-cli pcb export stats --output stats.json --format json board.kicad_pcb
```
