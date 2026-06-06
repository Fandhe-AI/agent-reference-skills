# CLI

`kicad-cli` バイナリを使った基本操作・バージョン確認・ヘルプ表示。

## バイナリの呼び出し（基本構文）

```sh
kicad-cli <subcommand> [subcommand ...] [options] INPUT_FILE
```

## macOS での実行

```sh
/Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli <subcommand> [options] INPUT_FILE
```

macOS ではフルパスで呼び出すか、PATH に追加して使用する。

## バージョン確認

```sh
kicad-cli version
```

## ヘルプ表示

```sh
kicad-cli --help
```

## サブコマンドのヘルプ表示

```sh
kicad-cli pcb --help
kicad-cli sch --help
kicad-cli fp --help
kicad-cli sym --help
kicad-cli jobset --help
```

## 特定コマンドのヘルプ表示

```sh
kicad-cli pcb export gerbers --help
kicad-cli sch export bom --help
kicad-cli pcb drc --help
```

任意のコマンド・サブコマンドに `--help` または `-h` を付けると使用方法が表示される。
