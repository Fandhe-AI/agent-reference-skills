# GitHub Actions -- ランナー

GitHub ホステッドランナーとセルフホステッドランナーのリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners

---

## GitHub ホステッドランナー

GitHub が管理するクラウドホスト型の仮想マシン。ワークフロー実行ごとにクリーンなインスタンスが提供される。

---

## 利用可能なランナーラベル

### Linux ランナー

| ラベル | OS | アーキテクチャ | 備考 |
|---|---|---|---|
| `ubuntu-latest` | Ubuntu 24.04 | x64 | 最新の LTS に追従 |
| `ubuntu-24.04` | Ubuntu 24.04 | x64 | |
| `ubuntu-22.04` | Ubuntu 22.04 | x64 | |
| `ubuntu-20.04` | Ubuntu 20.04 | x64 | 非推奨、段階的に廃止予定 |

### Windows ランナー

| ラベル | OS | アーキテクチャ | 備考 |
|---|---|---|---|
| `windows-latest` | Windows Server 2022 | x64 | 最新版に追従 |
| `windows-2022` | Windows Server 2022 | x64 | |
| `windows-2019` | Windows Server 2019 | x64 | 非推奨、段階的に廃止予定 |

### macOS ランナー

| ラベル | OS | アーキテクチャ | 備考 |
|---|---|---|---|
| `macos-latest` | macOS 15 (Sequoia) | ARM64 (Apple Silicon) | 最新版に追従 |
| `macos-15` | macOS 15 (Sequoia) | ARM64 (Apple Silicon) | |
| `macos-14` | macOS 14 (Sonoma) | ARM64 (Apple Silicon) | |
| `macos-13` | macOS 13 (Ventura) | x64 (Intel) | |

---

## ハードウェアスペック

### 標準ランナー

| ランナー | CPU | メモリ | ストレージ |
|---|---|---|---|
| Ubuntu (x64) | 4 コア | 16 GB RAM | 14 GB SSD |
| Windows (x64) | 4 コア | 16 GB RAM | 14 GB SSD |
| macOS (ARM64) | 3 コア (M1) | 7 GB RAM | 14 GB SSD |
| macOS (x64/Intel) | 4 コア | 14 GB RAM | 14 GB SSD |

### ラージランナー（GitHub Team / Enterprise Cloud）

より多くの CPU コア、メモリ、ストレージを持つランナー。GPU ランナーも利用可能。

---

## プリインストールソフトウェア

ランナーには以下のカテゴリのツールがプリインストールされている:

- **言語ランタイム**: Node.js, Python, Ruby, Go, Java, .NET, PHP, Rust 等
- **パッケージマネージャ**: npm, yarn, pip, gem, cargo, nuget 等
- **ビルドツール**: make, cmake, gradle, maven 等
- **バージョン管理**: git, gh (GitHub CLI)
- **コンテナツール**: Docker, docker-compose
- **クラウド CLI**: AWS CLI, Azure CLI, Google Cloud SDK
- **ブラウザ**: Chrome, Firefox（テスト用）
- **その他**: curl, wget, jq, zip/unzip 等

詳細なインストール済みソフトウェア一覧: https://github.com/actions/runner-images

注意: プリインストールソフトウェアは毎週更新される。特定のバージョンが必要な場合は `setup-*` アクションを使用することを推奨。

```yaml
# バージョンを明示的に指定する推奨パターン
steps:
  - uses: actions/setup-node@v4
    with:
      node-version: '20'
  - uses: actions/setup-python@v5
    with:
      python-version: '3.12'
```

---

## ランナーの指定方法

### 単一ラベル

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

### マトリクスによる複数 OS

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
runs-on: ${{ matrix.os }}
```

### ラベルの配列（セルフホステッド用）

```yaml
runs-on: [self-hosted, linux, x64]
```

---

## セルフホステッドランナー

自前のインフラストラクチャでワークフローを実行するランナー。

### 主なユースケース

- カスタムハードウェア要件（GPU、大容量メモリ等）
- プライベートネットワーク内のリソースへのアクセス
- 特定の OS やソフトウェア環境の要件
- コスト最適化（大量のワークフロー実行時）

### セットアップ

1. リポジトリ/Organization 設定の「Actions」->「Runners」からランナーを追加
2. ランナーアプリケーションをダウンロードしてインストール
3. ランナーをサービスとして構成・起動

### ラベル

セルフホステッドランナーには自動的に以下のラベルが付与される:
- `self-hosted`
- OS ラベル: `linux`, `windows`, `macos`
- アーキテクチャラベル: `x64`, `arm`, `arm64`
- カスタムラベルの追加も可能

```yaml
runs-on: [self-hosted, linux, x64, gpu]
```

### セキュリティ上の注意

- パブリックリポジトリでのセルフホステッドランナーの使用は非推奨
- フォークからの PR がランナー上で任意のコードを実行できるリスクがある
- ランナーマシンは信頼できる環境に配置すること

---

## ネットワーク要件

GitHub ホステッドランナーの使用には、最低 70 kbps のアップロード/ダウンロード速度のネットワーク接続が必要。
