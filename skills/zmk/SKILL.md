---
name: zmk
description: >
  ZMK Firmware (オープンソースキーボードファームウェア) リファレンス。
  Getting Started (hardware, user-setup, customization, zmk-cli)、
  Features (bluetooth, split keyboards, encoders, displays, lighting, pointing, studio, low-power)、
  Keymaps (keycodes, modifiers, combos, conditional layers)、
  Behaviors (タップ・ホールド、レイヤー、マクロ、tap-dance, sticky-key)、
  Input Processors、Hardware Integration、Troubleshooting。
user-invocable: false
model: sonnet
---

# ZMK Firmware リファレンス

ZMK Firmware — Zephyr RTOS 上に構築されたオープンソース (MIT) のキーボードファームウェア。
省電力・無線・分割キーボード対応を主眼に設計され、devicetree ベースの宣言的設定により多様な MCU（nRF52/RP2/SAMD21/STM32 等）と shield をサポートする。
公式ドキュメント (zmk.dev/docs) の全 11 カテゴリを構造化。
keymap 設計・behaviors 選択・config 設定・新規 board/shield 作成・ローカルビルド時に参照する。

## ディレクトリ構成

```text
skills/zmk/
  SKILL.md
  references/
    getting-started/
      README.md
      hardware.md
      user-setup.md
      zmk-cli.md
      customization.md
      faq.md
    features/
      README.md
      bluetooth.md
      split-keyboards.md
      encoders.md
      displays.md
      lighting.md
      pointing.md
      low-power-states.md
      studio.md
      modules.md
      led-indicators.md
      debouncing.md
      battery.md
    keymaps/
      README.md
      overview.md
      list-of-keycodes.md
      modifiers.md
      combos.md
      conditional-layers.md
      keymap-example.md
    behaviors/
      README.md
      overview.md
      key-press.md
      hold-tap.md
      tap-dance.md
      mod-morph.md
      sticky-key.md
      sticky-layer.md
      layers.md
      macros.md
      mouse-emulation.md
      sensor-rotate.md
      bluetooth.md
      outputs.md
      reset.md
      power.md
      soft-off.md
      caps-word.md
      key-repeat.md
      key-toggle.md
      backlight.md
      underglow.md
      studio-unlock.md
      misc.md
    input-processors/
      README.md
      overview.md
      usage.md
      code-mapper.md
      scaler.md
      temp-layer.md
      transformer.md
      behaviors.md
    config/
      README.md
      overview.md
      system.md
      bluetooth.md
      split.md
      kscan.md
      keymap.md
      combos.md
      behaviors.md
      encoders.md
      pointing.md
      displays.md
      lighting.md
      led-indicators.md
      studio.md
      battery.md
      power.md
      settings.md
      layout.md
      bootloader.md
    development/
      README.md
      devicetree.md
      events.md
      new-behavior.md
      module-creation.md
      studio-rpc-protocol.md
      usb-logging.md
    contributing/
      README.md
      clean-room.md
      documentation.md
      pull-requests.md
    hardware-integration/
      README.md
      overview.md
      new-board.md
      new-shield.md
      physical-layouts.md
      pinctrl.md
      hardware-metadata-files.md
      encoders.md
      dongle.md
      battery.md
      shift-registers.md
      soft-off-setup.md
      bootloader/
        README.md
        overview.md
        adafruit-nrf52.md
        rp2.md
        samd21-uf2.md
        stm32.md
        tinyuf2.md
      lighting/
        README.md
        overview.md
        backlight.md
        underglow.md
        led-indicators.md
    local-toolchain/
      README.md
      setup.md
      setup-container.md
      setup-native.md
      build-flash.md
      ide-integration.md
      posix-board.md
      pre-commit.md
      tests.md
  samples/
    README.md
    basic-keymap.md
    hold-tap-homerow-mods.md
    layer-switching.md
    combos.md
    macros.md
    tap-dance.md
    mod-morph.md
    sticky-key.md
    bluetooth-profiles.md
    encoder-volume-scroll.md
    config-repo-setup.md
  scripts/
    README.md
    install.md
    cli.md
    build.md
    flash.md
    dev-setup.md
    debug.md
    docs.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| 対応ハードウェア確認、ユーザーセットアップ、ZMK CLI の使い方 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `.conf` / `.keymap` / `build.yaml` のカスタマイズ、FAQ | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Bluetooth、Split keyboards、Encoders、Displays、Pointing 機能の有効化 | features | [references/features/README.md](references/features/README.md) |
| Low Power、Studio、Modules、LED Indicators、デバウンス設定 | features | [references/features/README.md](references/features/README.md) |
| keymap ファイル構造、keycodes 一覧、modifiers (LC/LS/LA/LG) | keymaps | [references/keymaps/README.md](references/keymaps/README.md) |
| combos、conditional layers の設定 | keymaps | [references/keymaps/README.md](references/keymaps/README.md) |
| `&kp` / `&mt` / `&lt` / `&mo` / `&sk` / `&sl` / `&td` の挙動と設定 | behaviors | [references/behaviors/README.md](references/behaviors/README.md) |
| `&macro` / `&mmv` / `&mwh` / `&out` / `&bt` / `&rgb_ug` / `&reset` / `&soft_off` の挙動と設定 | behaviors | [references/behaviors/README.md](references/behaviors/README.md) |
| Pointing デバイス入力の変換（code-mapper, scaler, temp-layer, transformer） | input-processors | [references/input-processors/README.md](references/input-processors/README.md) |
| `Kconfig` (`CONFIG_ZMK_*`) の全オプション、devicetree プロパティリファレンス | config | [references/config/README.md](references/config/README.md) |
| kscan / split / BLE / encoders / lighting / settings / layout 設定 | config | [references/config/README.md](references/config/README.md) |
| devicetree 基礎、events システム、新規 behavior 実装、USB logging | development | [references/development/README.md](references/development/README.md) |
| Zephyr モジュール作成、Studio RPC プロトコル | development | [references/development/README.md](references/development/README.md) |
| Clean room ポリシー、ドキュメント編集、PR ガイド | contributing | [references/contributing/README.md](references/contributing/README.md) |
| 新規 board / shield 作成、physical layouts、pinctrl、dongle、shift-registers | hardware-integration | [references/hardware-integration/README.md](references/hardware-integration/README.md) |
| battery 統合、soft-off setup、hardware metadata files | hardware-integration | [references/hardware-integration/README.md](references/hardware-integration/README.md) |
| Adafruit nRF52 / RP2 / SAMD21-UF2 / STM32 / TinyUF2 bootloader のフラッシュ手順 | hardware-integration/bootloader | [references/hardware-integration/bootloader/README.md](references/hardware-integration/bootloader/README.md) |
| Backlight / Underglow (RGB) / LED Indicators のハードウェア統合 | hardware-integration/lighting | [references/hardware-integration/lighting/README.md](references/hardware-integration/lighting/README.md) |
| Container / Native セットアップ、`west build` / `west flash`、IDE 連携 | local-toolchain | [references/local-toolchain/README.md](references/local-toolchain/README.md) |
| posix-board、pre-commit、テスト実行 | local-toolchain | [references/local-toolchain/README.md](references/local-toolchain/README.md) |
| keymap の典型的な書き方・動作サンプルを知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI・ビルド・フラッシュ・デバッグコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
