# Python Environment

Blender 内蔵 Python への pip パッケージ追加、bpy スタンドアローンモジュールのインストール、venv との組み合わせ方をまとめる。

## Blender のバージョンと内蔵 Python バージョンの確認

```sh
# Blender のバージョンを確認
blender --version

# 内蔵 Python のバージョンを確認（ヘッドレス）
blender --background --python-expr "import sys; print(sys.version)"
```

## bpy をスタンドアローン Python モジュールとしてインストール

```sh
# PyPI から最新版をインストール（Python バージョンの一致が必要）
pip install bpy

# バージョンを指定してインストール
pip install bpy==4.4.0

# Blender 公式 PyPI インデックスからアーカイブ版をインストール
pip install bpy==3.6.0 --extra-index-url https://download.blender.org/pypi/
```

各 Blender リリースは 1 つの Python バージョンにのみ対応する（例: bpy 5.1.x は Python 3.13）。インストール前に Python バージョンの一致を確認すること。

## bpy の動作確認

```sh
python -c "import bpy; print(bpy.app.version)"
```

## Blender 内蔵 Python に pip でパッケージを追加

> **警告**: 内蔵 Python へのパッケージインストールは Blender のバージョン更新時に消える。また、管理者権限が必要な場合がある。

```sh
# Linux / macOS — 内蔵 Python の場所を特定して pip でインストール
/path/to/blender/4.5/python/bin/python3.11 -m pip install numpy

# Windows — 内蔵 Python の場所を特定して pip でインストール
"C:\Program Files\Blender Foundation\Blender 4.5\4.5\python\bin\python.exe" -m pip install numpy
```

Blender の内蔵 Python パスはプラットフォームとバージョンによって異なる。ヘッドレスで確認する場合:

```sh
blender --background --python-expr "import sys; print(sys.executable)"
```

## Python スクリプトから内蔵 Python に pip インストール（Blender Text Editor）

```python
import subprocess
import sys
import os

python_exe = os.path.join(sys.prefix, "bin", "python.exe")  # Windows
# python_exe = os.path.join(sys.prefix, "bin", "python3")   # Linux/macOS

# ensurepip で pip を初期化
subprocess.call([python_exe, "-m", "ensurepip"])

# pip 自体を最新化
subprocess.call([python_exe, "-m", "pip", "install", "--upgrade", "pip"])

# パッケージをインストール
subprocess.call([python_exe, "-m", "pip", "install", "package_name"])
```

Blender の Text Editor でこのスクリプトを作成し「Run Script」で実行する。

## venv との組み合わせ（`--python-use-system-env`）

```sh
# venv を作成して有効化
python3 -m venv .venv
source .venv/bin/activate          # Linux / macOS
# .venv\Scripts\activate           # Windows

# 必要なパッケージを venv にインストール
pip install numpy pillow

# システム環境変数を引き継いで Blender を起動
blender --background --python-use-system-env --python script.py
```

`--python-use-system-env` は `PYTHONPATH` 等のシステム環境変数を Blender の Python に引き継ぐ。venv の `site-packages` を `PYTHONPATH` に追加することで、venv にインストールしたパッケージを Blender 内から `import` できる。

```sh
# PYTHONPATH を venv の site-packages に設定してから起動
export PYTHONPATH=".venv/lib/python3.11/site-packages:$PYTHONPATH"
blender --background --python-use-system-env --python script.py
```

## ユーザー site-packages を引き継ぐ

```sh
# ユーザーの ~/.local/lib/python*/site-packages を引き継ぐ
blender --background --python-use-user-env --python script.py
```

## インタラクティブ Python コンソールの起動

```sh
blender --python-console
```

GUI なしで Blender の Python 環境を対話的に試す際に使用する。
