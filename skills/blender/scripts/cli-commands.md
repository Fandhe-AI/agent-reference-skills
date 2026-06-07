# CLI Commands

Blender のコマンドライン引数一覧。ヘッドレス実行・レンダリング・デバッグ等の用途別にまとめる。

## バージョン確認

```sh
blender --version
```

## ヘルプの表示

```sh
blender --help
```

## 基本起動

```sh
# GUI で起動
blender

# 指定した .blend ファイルを開いて起動
blender <file.blend>

# ユーザー設定・スタートアップファイルをスキップして起動
blender --factory-startup

# 最後に開いたファイルを開いて起動
blender --open-last
```

## ヘッドレス実行（`--background`）

> **警告**: `--background` では GUI が起動しない。X サーバーや Wayland が不要なためサーバー・CI 環境での使用に適するが、UI に依存する操作は実行できない。

```sh
# GUI なしで起動（何も実行せず終了）
blender --background

# .blend ファイルを読み込んでヘッドレス起動
blender --background <file.blend>

# Python スクリプトを実行してヘッドレス終了
blender --background --python script.py

# .blend を読み込んで Python スクリプトを実行
blender --background <file.blend> --python script.py

# Python 式をインラインで実行
blender --background --python-expr "import bpy; print(bpy.app.version)"

# .blend 内のテキストブロックに保存されたスクリプトを実行
blender --background <file.blend> --python-text MyScript
```

引数の実行順序は指定順と同じ。`--render-output` より前に `--render-frame` を置くと出力パスが反映されないため注意。

## Python スクリプトへの引数渡し

```sh
# `--` 以降の引数はオプション処理から除外され sys.argv に渡される
blender --background --python script.py -- --my-arg value
```

スクリプト側での受け取り方:

```python
import sys

argv = sys.argv
idx = argv.index("--") + 1
args = argv[idx:]  # ["--my-arg", "value"]
```

## レンダリング

```sh
# フレーム 1 をレンダリング
blender --background <file.blend> --render-frame 1

# 相対フレーム指定（現在フレームから +5）
blender --background <file.blend> --render-frame +5

# 複数フレームをカンマ区切りで指定
blender --background <file.blend> --render-frame 1,5,10

# フレーム範囲を指定
blender --background <file.blend> --render-frame 1..10

# アニメーション全体をレンダリング（start〜end フレーム）
blender --background <file.blend> --render-anim

# 出力パスを指定してレンダリング（# はフレーム番号のパディング）
blender --background <file.blend> --render-output /tmp/render_### --render-frame 1

# レンダーエンジンを指定（CYCLES / EEVEE / WORKBENCH）
blender --background <file.blend> --engine CYCLES --render-frame 1

# 開始・終了フレームを上書きしてアニメーションレンダリング
blender --background <file.blend> --frame-start 10 --frame-end 50 --render-anim

# フレームステップ（例: 2 フレームおきにレンダリング）
blender --background <file.blend> --frame-jump 2 --render-anim

# 使用 CPU スレッド数を指定（0 = 全コア）
blender --background <file.blend> --threads 8 --render-anim

# アクティブシーンを指定
blender --background <file.blend> --scene MyScene --render-frame 1

# 出力フォーマットを指定（PNG / JPEG / OPEN_EXR / FFMPEG 等）
blender --background <file.blend> --render-format PNG --render-frame 1
```

## Cycles デバイス指定

```sh
# Cycles レンダーに使用するデバイスを指定（-- の後に渡す）
blender --background <file.blend> --engine CYCLES -- --cycles-device CUDA
blender --background <file.blend> --engine CYCLES -- --cycles-device OPTIX
blender --background <file.blend> --engine CYCLES -- --cycles-device HIP
blender --background <file.blend> --engine CYCLES -- --cycles-device METAL
blender --background <file.blend> --engine CYCLES -- --cycles-device CPU

# メモリ・時間統計を出力
blender --background <file.blend> --engine CYCLES -- --cycles-print-stats
```

## Python 実行制御

```sh
# アドオンリストを無効化して起動
blender --no-addons

# システム環境変数を Python に引き継ぐ
blender --background --python-use-system-env --python script.py

# ユーザー site-packages を Python に引き継ぐ
blender --background --python-use-user-env --python script.py

# ブレンドファイル内の自動スクリプト実行を許可
blender --background <file.blend> --enable-autoexec --python script.py

# Python 例外発生時の終了コードを指定（デフォルト: 0）
blender --background --python script.py --python-exit-code 1

# 対話型 Python コンソールで起動
blender --python-console
```

## ネットワーク制御

```sh
# インターネットアクセスを許可
blender --online-mode

# インターネットアクセスを禁止
blender --offline-mode
```

## ウィンドウ制御

```sh
# ウィンドウ位置とサイズを指定（x y width height）
blender --window-geometry 100 100 1920 1080

# ボーダー付きウィンドウで起動
blender --window-border

# 最大化ウィンドウで起動
blender --window-maximized

# フルスクリーンで起動
blender --window-fullscreen
```

## ロギング・デバッグ

```sh
# デバッグモードで起動
blender --debug

# ログレベルを指定（fatal / error / warning / info / debug / trace）
blender --log-level info

# 特定ログカテゴリを有効化（ワイルドカード使用可）
blender --log "render.*"

# ログをファイルに出力
blender --log-level debug --log-file /tmp/blender.log

# 利用可能なログカテゴリ一覧を表示
blender --log-list-categories

# ステータス出力を抑制
blender --quiet

# Python デバッグを有効化
blender --debug-python

# メモリデバッグを有効化
blender --debug-memory
```

## GPU バックエンド

```sh
# GPU バックエンドを強制指定（opengl / vulkan）
blender --gpu-backend opengl
blender --gpu-backend vulkan
```

## コマンドモード（`-c` / `--command`）

```sh
# コマンドモードで実行（残りの引数をコマンドが消費する）
blender --command <command> [args...]
```

Extension サブコマンドの詳細は `addon-lifecycle.md` を参照。
