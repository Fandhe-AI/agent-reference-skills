# metal-debug-env

Enabling Metal API Validation and Shader Validation via environment variables for development-time GPU error checking. Source: Validating your app's Metal API usage / Validating your app's Metal shader usage

> **警告**: 本ページの環境変数は開発・QA 向けであり、CPU/GPU の性能に測定可能な影響を与える。
> 出荷ビルドでは有効化しない。

## API Validation を有効化する（Source: Validating your app's Metal API usage）

```sh
export MTL_DEBUG_LAYER=1
```

エラー発生時の挙動は `MTL_DEBUG_LAYER_ERROR_MODE` で切り替える（既定値 `assert`）。

```sh
export MTL_DEBUG_LAYER_ERROR_MODE=assert
```

警告発生時の挙動は `MTL_DEBUG_LAYER_WARNING_MODE` で切り替える（既定値 `ignore`）。

```sh
export MTL_DEBUG_LAYER_WARNING_MODE=ignore
```

設定項目の一覧は `man` で確認できる。

```sh
man MetalValidation
```

## Shader Validation を有効化する（Source: Validating your app's Metal shader usage）

```sh
export MTL_SHADER_VALIDATION=1
```

エラー発生時にプログラムを停止させる場合は次を追加する。

```sh
export MTL_SHADER_VALIDATION_ABORT_ON_FAULT=1
```

Shader Validation のログを標準エラー出力へ流す場合は次を追加する。

```sh
export MTL_SHADER_VALIDATION_ENABLE_ERROR_REPORTING=1
export MTL_SHADER_VALIDATION_REPORT_TO_STDERR=1
```

有効化したプロセスのログは `log stream` で追跡できる。

```sh
log stream -process <appname>
```

> **注記**: Shader Validation はシェーダーのランタイムコンパイル時間を増やし、全 GPU 関数に計装コードを追加するため、
> API Validation よりも性能への影響が大きい。
