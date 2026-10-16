# frameworks

pip installation of ROCm 10.1.0 PyTorch wheels and GPU recognition verification. Source: ai-ecosystem frameworks/pytorch/install

## ROCm 版 PyTorch のインストール

```sh
python -m pip install --index-url https://stable.repo.amd.com/rocm/whl-next/ "torch[device-all]==2.14.0+rocm10.1.0" "torchvision[device-all]==0.29.0a0+rocm10.1.0" "torchaudio==2.11.0.3+rocm10.1.0"
```

仮想環境内で実行する。特定アーキのみの場合は `device-gfx950` / `device-gfx942` / `device-gfx90a` / `device-gfx1200` 等の extras を `torch[...]` と `torchvision[...]` に指定する（例: `"torch[device-gfx950]==2.14.0+rocm10.1.0"`）。公式は torch 2.13.0 / 2.12.0 の組み合わせも併記している。

ROCm 10.1.0 のフレームワーク対応から TensorFlow 2.19.1 は外れた（release notes）。

## GPU 認識の確認

```sh
python3 -c 'import torch; print(torch.cuda.is_available())'
```

`True` が表示されれば PyTorch から ROCm GPU が認識されている。PyTorch は ROCm 環境でも `torch.cuda` 名前空間を使う。
