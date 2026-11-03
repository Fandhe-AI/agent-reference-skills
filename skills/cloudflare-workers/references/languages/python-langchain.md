---
source: https://developers.cloudflare.com/workers/languages/python/packages/langchain/
---

# LangChain on Python Workers

LangChain Python packages provided by the Workers runtime.

## Signature / Usage

```bash
git clone https://github.com/cloudflare/python-workers-examples
cd python-workers-examples/langchain
uv run pywrangler dev
```

```python
from workers import WorkerEntrypoint, Response
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        prompt = PromptTemplate.from_template("Complete the following sentence: I am a {profession} and ")
        llm = OpenAI(api_key=self.env.API_KEY)
        chain = prompt | llm

        res = await chain.ainvoke({"profession": "electrician"})
        return Response(res.split(".")[0].strip())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `langchain` | package | Version `0.1.8`, provided by the Workers runtime. |
| `langchain-core` | package | Version `0.1.25`, provided by the Workers runtime. |
| `langchain-openai` | package | Version `0.0.6`, provided by the Workers runtime. |

## Related

- [python-packages.md](./python-packages.md)
- [python.md](./python.md)
