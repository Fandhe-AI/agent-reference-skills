# Install

CadQuery のインストールと環境セットアップ。

## Miniforge のインストール（Linux / macOS）

```sh
curl -L -o miniforge.sh "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-$(uname)-$(uname -m).sh"
bash miniforge.sh -b -p $HOME/miniforge
source $HOME/miniforge/bin/activate
```

## Miniforge のインストール（Windows CMD）

```sh
curl -L -o miniforge.exe https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Windows-x86_64.exe
start "" /wait miniforge.exe /InstallationType=JustMe /RegisterPython=0 /NoRegistry=1 /NoScripts=1 /S /D=%USERPROFILE%\Miniforge
cmd /K ""%USERPROFILE%/Miniforge/Scripts/activate.bat" "%USERPROFILE%/Miniforge""
```

## CadQuery のインストール（conda 環境作成 + mamba）

```sh
conda create -n cq
conda activate cq
mamba install cadquery
```

conda-forge チャンネルがデフォルトの Miniforge / Mambaforge を前提とする。

## バージョンを指定してインストール

```sh
conda create -n cq231
conda activate cq231
mamba install cadquery=2.3.1
```

## 開発版（master ブランチ）のインストール

```sh
conda create -n cqdev
conda activate cqdev
mamba install -c cadquery cadquery=master
```

## pip でインストール（Python 3.9+）

```sh
python3 -m pip install --upgrade pip
pip install cadquery
```

仮想環境の使用を強く推奨。

## pip — GitHub 最新版からインストール

```sh
pip install git+https://github.com/CadQuery/cadquery.git
```

## pip — IPython / Jupyter サポートつきでインストール

```sh
pip install cadquery[ipython]
```

## pip — 開発者用インストール

```sh
pip install cadquery[dev]
```

## インストールの確認

```sh
python -c "import cadquery; cadquery.Workplane('XY').box(1,2,3).toSvg()"
```

エラーなく SVG が出力されれば成功。

## CQ-editor のインストール（Linux / macOS — インストーラー）

```sh
curl -LO https://github.com/CadQuery/CQ-editor/releases/download/nightly/CQ-editor-master-Linux-x86_64.sh
sh CQ-editor-master-Linux-x86_64.sh
$HOME/cq-editor/run.sh
```

## CQ-editor のインストール（conda）

```sh
conda create -n cqdev
conda activate cqdev
mamba install -c cadquery cq-editor=master
```

## CQ-editor のインストール（pip）

```sh
pip install PyQt5 spyder pyqtgraph logbook
pip install git+https://github.com/CadQuery/CQ-editor.git
```

## JupyterLab のインストール（conda）

```sh
mamba install jupyterlab
```

## JupyterLab のインストール（pip）

```sh
pip install jupyterlab
```

## JupyterLab の起動

```sh
jupyter lab
```
