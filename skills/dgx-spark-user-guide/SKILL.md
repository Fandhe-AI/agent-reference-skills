---
name: dgx-spark-user-guide
description: >
  NVIDIA DGX Spark User Guide リファレンス。GB10 Grace Blackwell Superchip
  ハードウェア仕様、first-boot / UEFI 設定、Spark Stacking クラスタ、
  DGX OS / NGC / container runtime ソフトウェアスタック、
  PXE / cloud-init プロビジョニング、fleet lifecycle 運用、
  apt / fwupdmgr 更新、system recovery、PSIRT サポート。
user-invocable: false
---

## ディレクトリ構成

```text
skills/dgx-spark-user-guide/
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
      spark-stacking.md
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
| 複数 DGX Spark を Spark Stacking でクラスタ化したい | system-config | [references/system-config/README.md](references/system-config/README.md) |
| DGX OS / DGX Dashboard / NVIDIA Sync の使い方を知りたい | software | [references/software/README.md](references/software/README.md) |
| Nsight でプロファイリングしたい、NGC / container runtime を使いたい | software | [references/software/README.md](references/software/README.md) |
| PXE boot によるネットワークインストールを構築したい | provisioning | [references/provisioning/README.md](references/provisioning/README.md) |
| fleet 規模のライフサイクル管理・air-gapped/cloud-init カスタムインストールをしたい | enterprise | [references/enterprise/README.md](references/enterprise/README.md) |
| apt / fwupdmgr で OS・コンポーネントを更新したい | system-update | [references/system-update/README.md](references/system-update/README.md) |
| リカバリー USB で工場出荷状態に戻したい | system-update | [references/system-update/README.md](references/system-update/README.md) |
| サポート窓口・PSIRT・field diagnostic を確認したい | support | [references/support/README.md](references/support/README.md) |
| インストール・更新・PXE・コンテナ・リカバリーのコマンドをコピペで実行したい | scripts | [scripts/README.md](scripts/README.md) |
