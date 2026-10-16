---
name: dgx-spark
description: >
  NVIDIA DGX Spark User Guide リファレンス。GB10 Grace Blackwell Superchip 仕様、
  first-boot / UEFI、ConnectX-7 Networking (旧 Spark Stacking)、複数 Spark 接続、
  NVIDIA Sync Cluster Assistant、DGX OS / NGC / container runtime、
  Release Notes (DGX OS 7.5.0)、known issues、PXE / cloud-init、fleet 運用、
  apt / fwupdmgr、recovery、PSIRT、
  NVIDIA Developer Forums 由来 troubleshooting、
  build.nvidia.com/spark playbook (vLLM / vLLM cluster / TensorRT-LLM / Ollama /
  ComfyUI / NIM / NeMo / VLM fine-tuning / NVIDIA PAIR / NCCL)、Tailscale、VS Code。
user-invocable: false
---

対象: DGX Spark User Guide（docs.nvidia.com/dgx/dgx-spark/、2026-10-17 取得。DGX OS 7.5.0 / July 2026 Release 時点）、playbooks は NVIDIA/dgx-spark-playbooks main @ c035e0a（2026-10-15、タグなし）

## ディレクトリ構成

```text
skills/dgx-spark/
  SKILL.md
  references/
    hardware/
      README.md
      system-specs.md
      physical-specs.md
      connectivity-and-io.md
      performance-specs.md
      power-and-thermal.md
    setup/
      README.md
      first-boot.md
    system-config/
      README.md
      system-config-and-operation.md
      uefi-settings.md
      spark-stacking.md        # (ConnectX-7 Networking)
    software/
      README.md
      software-overview.md
      dgx-dashboard.md
      nvidia-sync.md
      dgx-os.md
      nsight.md
      container-runtime-docker.md
      ngc.md
      nvaie-quickstart.md
    provisioning/
      README.md
      pxe.md
    enterprise/
      README.md
      enterprise-manageability.md
      enterprise-fleet-lifecycle.md
      enterprise-custom-install.md
    system-update/
      README.md
      os-and-component-update.md
      system-recovery.md
    support/
      README.md
      getting-support.md
      hardware-support.md
      ai-enterprise-support.md
      security-vulnerability-response.md
      field-diagnostic-software.md
    playbooks/
      README.md
      vllm.md
      trt-llm.md
      ollama.md
      comfy-ui.md
      nim-llm.md
      nemo-fine-tune.md
      nccl.md
      connect-two-sparks.md
      connect-multiple-sparks.md
      vllm-cluster.md
      vlm-finetuning.md
      pair.md
      tailscale.md
      vscode.md
      ...（他 36 ページ、計 50 ページ）
    release-notes/
      README.md
      release-notes.md
      known-issues.md
    community/
      README.md
      known-issues.md
      troubleshooting.md
  scripts/
    README.md
    install-update.md
    pxe-provisioning.md
    container-runtime.md
    recovery.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（または `scripts/README.md`）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| GPU/CPU/メモリ/ストレージ/ネットワークの仕様を知りたい | hardware | [references/hardware/README.md](references/hardware/README.md) |
| 筐体寸法・環境要件・電源/放熱を確認したい | hardware | [references/hardware/README.md](references/hardware/README.md) |
| 初回起動・セットアップウィザードの手順を知りたい | setup | [references/setup/README.md](references/setup/README.md) |
| UEFI 設定・Secure Boot・PXE boot を設定したい | system-config | [references/system-config/README.md](references/system-config/README.md) |
| ConnectX-7 Networking (旧 Spark Stacking)・NVIDIA Sync Cluster Assistant でクラスタ化したい | system-config / playbooks | [references/system-config/README.md](references/system-config/README.md) / [references/playbooks/README.md](references/playbooks/README.md) |
| DGX OS / DGX Dashboard / NVIDIA Sync の使い方を知りたい | software | [references/software/README.md](references/software/README.md) |
| Nsight でプロファイリングしたい、NGC / container runtime を使いたい | software | [references/software/README.md](references/software/README.md) |
| PXE boot によるネットワークインストールを構築したい | provisioning | [references/provisioning/README.md](references/provisioning/README.md) |
| fleet 規模のライフサイクル管理・air-gapped/cloud-init カスタムインストールをしたい | enterprise | [references/enterprise/README.md](references/enterprise/README.md) |
| apt / fwupdmgr で OS・コンポーネントを更新したい | system-update | [references/system-update/README.md](references/system-update/README.md) |
| リカバリー USB で工場出荷状態に戻したい | system-update | [references/system-update/README.md](references/system-update/README.md) |
| サポート窓口・PSIRT・field diagnostic を確認したい | support | [references/support/README.md](references/support/README.md) |
| 特定モデル/フレームワーク（vLLM, TRT-LLM, Ollama, ComfyUI, NIM, NeMo 等）を DGX Spark 上で動かす手順を知りたい | playbooks | [references/playbooks/README.md](references/playbooks/README.md) |
| 現行ソフトウェア版数（DGX OS / driver / CUDA / UEFI / firmware）・リリースごとの新機能/修正を知りたい | release-notes | [references/release-notes/README.md](references/release-notes/README.md) |
| NVIDIA 公式の既知の不具合（UMA メモリ表示・nvidia-smi Memory-Usage 等）を確認したい | release-notes | [references/release-notes/README.md](references/release-notes/README.md) |
| 既知の不具合・フォーラム由来のトラブルシューティングを調べたい | community | [references/community/README.md](references/community/README.md) |
| インストール・更新・PXE・コンテナ・リカバリーのコマンドをコピペで実行したい | scripts | [scripts/README.md](scripts/README.md) |
