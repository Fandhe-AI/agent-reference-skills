---
name: zmk
description: >
  ZMK Firmware リファレンス。
  Getting Started (hardware, user-setup, customization, zmk-cli),
  Troubleshooting (building/connection/flashing/hardware issues),
  Features (bluetooth, split-keyboards, encoders, displays, lighting, pointing, studio, low-power-states 等 12 種),
  Keymaps (overview, keymap-example, list-of-keycodes, modifiers, combos, conditional-layers),
  Behaviors (key-press, hold-tap, layers, macros, tap-dance, sticky-key, mod-morph, mouse-emulation, outputs, bluetooth, backlight, underglow, power, reset, soft-off, studio-unlock, sensor-rotate 等 22 種),
  Input Processors (code-mapper, scaler, temp-layer, transformer, behaviors),
  Configuration (Kconfig + Devicetree settings 19 種),
  Development (devicetree, events, module-creation, new-behavior, studio-rpc-protocol, usb-logging),
  Contributing (clean-room, documentation, pull-requests),
  Hardware Integration (new-board, new-shield, physical-layouts, pinctrl, dongle, bootloader, lighting),
  Local Toolchain (setup container/native, build-flash, ide-integration, tests, pre-commit)
user-invocable: false
model: sonnet
---

# ZMK Firmware リファレンス

ZMK Firmware — Zephyr RTOS 上に構築されたオープンソース (MIT) のキーボードファームウェア。
省電力・無線・分割キーボード対応を主眼に設計され、devicetree ベースの宣言的設定により多様な MCU（nRF52/RP2/SAMD21/STM32 等）と shield をサポートする。
公式ドキュメント (zmk.dev/docs) の全 11 カテゴリを構造化。
keymap 設計・behaviors 選択・config 設定・新規 board/shield 作成・ローカルビルド時に参照する。

## ディレクトリ構造

```
skills/zmk/
├── SKILL.md                                          ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md                     ← Getting Started 索引（5 ページ）
    ├── troubleshooting/README.md                     ← Troubleshooting 索引（5 ページ）
    ├── features/README.md                            ← Features 索引（12 ページ）
    ├── keymaps/README.md                             ← Keymaps overview 索引（6 ページ）
    ├── behaviors/README.md                           ← Behaviors 索引（23 ページ）
    ├── input-processors/README.md                    ← Input Processors 索引（7 ページ）
    ├── config/README.md                              ← Configuration 索引（19 ページ）
    ├── development/README.md                         ← Development core 索引（6 ページ）
    ├── contributing/README.md                        ← Contributing 索引（3 ページ）
    ├── hardware-integration/README.md                ← Hardware Integration 索引（12 ページ）
    │   ├── bootloader/README.md                      ← Bootloader 索引（6 ページ）
    │   └── lighting/README.md                        ← HW Lighting 索引（4 ページ）
    └── local-toolchain/README.md                     ← Local Toolchain 索引（8 ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| 対応ハードウェア確認、インストール手順、ZMK CLI、`.conf`/`.keymap`/`build.yaml` のカスタマイズ、FAQ | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| ビルド失敗、Bluetooth ペアリング失敗、フラッシュエラー、GPIO/ハードウェア起因の不具合の診断と修正 | troubleshooting | [references/troubleshooting/README.md](./references/troubleshooting/README.md) |
| Bluetooth、Split keyboards、Encoders、Displays、Lighting、Pointing、Low Power、Studio、Modules 等の機能概要と有効化 | features | [references/features/README.md](./references/features/README.md) |
| keymap ファイル構造、keycodes 一覧、modifiers (LC/LS/LA/LG)、combos、conditional layers | keymaps | [references/keymaps/README.md](./references/keymaps/README.md) |
| `&kp`, `&mt`, `&lt`, `&mo`, `&sk`, `&sl`, `&td`, `&macro`, `&mmv`/`&mwh`, `&out`, `&bt`, `&bl`, `&rgb_ug`, `&reset`, `&soft_off` 等の挙動と設定 | behaviors | [references/behaviors/README.md](./references/behaviors/README.md) |
| Pointing デバイス入力の変換（code-mapper, scaler, temp-layer, transformer）、`input-processors` プロパティ | input-processors | [references/input-processors/README.md](./references/input-processors/README.md) |
| Kconfig (`CONFIG_ZMK_*`)、devicetree プロパティの完全リファレンス（kscan, split, BLE, encoders, lighting, settings 等） | config | [references/config/README.md](./references/config/README.md) |
| devicetree 基礎、events システム、Zephyr モジュール作成、新規 behavior 実装、Studio RPC、USB logging | development | [references/development/README.md](./references/development/README.md) |
| Clean room ポリシー、ドキュメント編集、Conventional Commits 準拠の PR ガイド | contributing | [references/contributing/README.md](./references/contributing/README.md) |
| 新規 board/shield 作成、physical layouts、pinctrl、dongle、battery、shift-registers、soft-off setup、bootloader/lighting 統合 | hardware-integration | [references/hardware-integration/README.md](./references/hardware-integration/README.md) |
| Adafruit nRF52 / RP2 / SAMD21-UF2 / STM32 / TinyUF2 各 bootloader の対応とフラッシュ手順 | hardware-integration/bootloader | [references/hardware-integration/bootloader/README.md](./references/hardware-integration/bootloader/README.md) |
| Backlight / Underglow (RGB) / LED Indicators のハードウェア統合 | hardware-integration/lighting | [references/hardware-integration/lighting/README.md](./references/hardware-integration/lighting/README.md) |
| Container / Native セットアップ、`west build`/`west flash`、IDE 連携、posix-board、pre-commit、tests | local-toolchain | [references/local-toolchain/README.md](./references/local-toolchain/README.md) |
