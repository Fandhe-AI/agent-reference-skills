# Tracing

Agents SDK に組み込まれた tracing の有効化・無効化・確認コマンド。tracing はサーバーサイド SDK パスではデフォルトで有効。

## tracing をグローバルに無効化する (環境変数)

```sh
export OPENAI_AGENTS_DISABLE_TRACING=1
```

## tracing をグローバルに無効化する (Python コード)

```python
from agents import set_tracing_disabled
set_tracing_disabled(True)
```

## 特定の Run のみ tracing を無効化する (Python コード)

```python
from agents import RunConfig, Runner

result = await Runner.run(
    agent,
    "Hello",
    run_config=RunConfig(tracing_disabled=True),
)
```

## トレースエクスポート用 API キーの設定 (Python コード)

```python
import os
from agents import set_tracing_export_api_key
set_tracing_export_api_key(os.environ["OPENAI_API_KEY"])
```

デフォルトの `OPENAI_API_KEY` とは別のキーでトレースを OpenAI にエクスポートしたい場合に使う。

## verbose ログの有効化 (Python コード)

```python
from agents import enable_verbose_stdout_logging
enable_verbose_stdout_logging()
```

## logger による詳細ログ設定 (Python コード)

```python
import logging
logger = logging.getLogger("openai.agents")
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())
```

## 外部トレースプロセッサーの追加 (Python コード)

```python
from agents import add_trace_processor

add_trace_processor(my_processor)
```

OpenAI バックエンドへの送信に加えて、独自のトレースプロセッサーへも送信する。Weights & Biases / Arize-Phoenix / MLflow / Braintrust / Pydantic Logfire / LangSmith / Langfuse など 26 以上のエコシステム統合が公式ドキュメントに列挙されている（個別の pip install コマンドは各統合先のドキュメントを参照）。

## 外部トレースプロセッサーへ置き換える (Python コード)

```python
from agents import set_trace_processors

set_trace_processors([my_processor])
```

OpenAI バックエンドへの送信を行わず、指定したプロセッサーのみにトレースを送る。
