# frameworks

pip installation of ROCm-enabled PyTorch and GPU recognition verification. Source: install-on-linux/pytorch-install

## ROCm 版 PyTorch のインストール

```sh
pip3 install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/rocm7.2
```

`rocm7.2` はインストール済みの ROCm バージョンに応じて読み替える。安定版が必要な場合は nightly ではなく stable のインデックス URL を使う。

## GPU 認識の確認

```sh
python3 -c 'import torch; print(torch.cuda.is_available())'
```

`True` が表示されれば PyTorch から ROCm GPU が認識されている。PyTorch は ROCm 環境でも `torch.cuda` 名前空間を使う。
