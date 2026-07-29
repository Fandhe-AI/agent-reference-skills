# metal-performance-hud

Enabling the in-app Metal Performance HUD overlay via environment variables to inspect frame rate, GPU time, and shader compilation activity. Source: Monitoring your Metal app's graphics performance

## HUD を有効化する

```sh
export MTL_HUD_ENABLED=1
```

## フレーム毎の統計をログへ出力する

`MTL_HUD_ENABLED=1` と併用する。

```sh
export MTL_HUD_LOG_ENABLED=1
```

## シェーダーコンパイルのログを出力する

`MTL_HUD_ENABLED=1` と併用する。

> **注記**: シェーダー名をコンソールへ出力するため、出荷ビルドでの有効化は内部情報の露出になる。

```sh
export MTL_HUD_LOG_SHADER_ENABLED=1
```

## エンコーダーの GPU 時間計測を有効化する

```sh
export MTL_HUD_ENCODER_TIMING_ENABLED=1
```

## 数値の範囲（平均・最小・最大）を表示する

```sh
export MTL_HUD_SHOW_VALUE_RANGE=1
```
