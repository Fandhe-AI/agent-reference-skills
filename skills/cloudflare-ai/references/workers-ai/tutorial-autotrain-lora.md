---
source: https://developers.cloudflare.com/workers-ai/guides/tutorials/fine-tune-models-with-autotrain/
---

# Tutorial: fine-tune a LoRA with Hugging Face AutoTrain

Train a LoRA adapter in the Hugging Face AutoTrain Advanced notebook, fix `adapter_config.json`, and upload it to Workers AI.

## Signature / Usage

Training data (`train.csv`, one column named `text`):

```text
### Human: What is the meaning of life? ### Assistant: 42.
```

Rows containing newlines are wrapped in quotes:

```text
"human: What is the meaning of life? \n bot: 42."
```

Mistral-style instruction format:

```text
<s>[INST] What is the meaning of life? [/INST] 42</s>
```

Line to add to the downloaded `adapter_config.json`:

```text
"model_type": "mistral"
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| project_name | string | — | Descriptive name for the AutoTrain project. |
| model_name | string | — | One of `mistralai/Mistral-7B-Instruct-v0.2`, `google/gemma-2b-it`, `google/gemma-7b-it`, `meta-llama/llama-2-7b-chat-hf`. |
| quantization | dropdown | — | Set to `none`. |
| lora-r | number | — | Set to `8`. |
| model_type | string | — | In `adapter_config.json`: `mistral`, `gemma`, or `llama`. |

## Notes

- Steps: create the CSV; open the AutoTrain Advanced Colab notebook (choose an A100 runtime; a typical session costs under $1 USD per the source); set project and hyperparameters; put `train.csv` in a `data` folder; Runtime > Run All; download `adapter_model.safetensors` and `adapter_config.json`; add `model_type`; upload and use the fine-tune (see Fine-tunes: LoRA adapters).
- If changing `quantization` breaks code generation, edit `quantization = none` to `quantization = "none"` in the notebook.
- An out-of-memory kill (`SIGKILL`) means a bigger GPU runtime is needed.
- Pushing to the Hugging Face Hub is optional.
- The tutorial belongs to the Hugging Face tooling; only the Workers AI upload and inference are Workers AI features.

## Related

- [Fine-tunes: LoRA adapters](./fine-tunes-loras.md)
- [Public LoRA adapters](./public-loras.md)
- [Tutorials index](./tutorials-index.md)
