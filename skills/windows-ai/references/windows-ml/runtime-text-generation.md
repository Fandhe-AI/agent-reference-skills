# Generate text with your own language model using Windows ML (experimental)

The Text Generation API runs tokenization, autoregressive decoding, streaming and cancellation over your own ONNX or GGUF language model, on top of the Windows ML Runtime API.

## Signature / Usage

```cpp
winml::tasks::text_generation::onnx::StateTensorPair stateTensorPairs[] = {{1, 1}};
winml::tasks::text_generation::Options options;
options.values = winml::tasks::MakeTextGenerationOptions(/* maxNewTokens */ 64);

winml::tasks::text_generation::onnx::BuildTextGenerationArguments arguments;
arguments.runtime = runtime.Get();
arguments.model = model.Get();
arguments.target = target.Get();
arguments.tokenizer = tokenizer.Get();
arguments.tokenInputName = L"input_ids";
arguments.outputName = L"logits";
arguments.debugName = L"my-text-generation";
arguments.stateTensorPairs = stateTensorPairs;
arguments.sequenceCapacityHint = 128;
arguments.outputKind = WINML_TEXT_GENERATION_OUTPUT_KIND_LOGITS;
arguments.eosPolicy = WINML_TEXT_GENERATION_EOS_POLICY_TOKENIZER_DEFAULT;
arguments.options = &options;

winml::tasks::text_generation::TextGeneration textGeneration;
THROW_IF_FAILED(winml::tasks::text_generation::onnx::BuildTextGeneration(
    arguments, textGeneration));
```

Stream generated text:

```cpp
ComPtr<IWinMLTextGenerationPullStream> stream;
THROW_IF_FAILED(textGeneration.session->GenerateText(
    L"The sky is often",
    textGeneration.options.Get(),
    cancellation.Get(),
    stream.GetAddressOf()));

WINML_TEXT_GENERATION_READ_STATUS status{};
UINT32 tokenId = 0;
LPCWSTR fragment = nullptr;
while (SUCCEEDED(stream->ReadNext(&status, &tokenId, &fragment)) &&
    status == WINML_TEXT_GENERATION_READ_STATUS_UPDATE)
{
    std::wprintf(L"%ls", fragment);
}

ComPtr<IWinMLTextGenerationResult> result;
THROW_IF_FAILED(stream->GetResult(result.GetAddressOf()));
```

(`runtime`, `model`, `target`, `tokenizer` come from `WinMLCreateRuntime`, `LoadModelFromFile`, `CreateCpuExecutionTarget`, and `WinMLCreateTokenizerFromFile`; `cancellation` from `textGeneration.tasks->CreateCancellationSource`.)

## Options / Props

| Model format | Requirements |
| --- | --- |
| ONNX (`.onnx`) / ORT (`.ort`) | Run through ONNX Runtime. Must expose a token-ID input, a logits output, and one fixed-capacity state tensor pair holding the KV cache and sequence position. Separate tokenizer source required (for example `tokenizer.json`). |
| GGUF (`.gguf`) | Run through llama.cpp. Tokenizer is embedded; no separate tokenizer needed. |

The completed result reports the full generated text and token IDs, prompt and generated-token counts, and a finish reason (end-of-sequence token, stop token, requested token limit, sequence capacity, cancellation, or error).

## Notes

- Experimental and **not supported** for production use; available in C++ and Python, **C# not supported**.
- Windows doesn't ship a model for this API; you choose, package, and distribute the model and tokenizer.
- You still create the Runtime objects (model, execution target, pipeline) and pass them to the session; hardware placement is not hidden.
- Samples validate the contract against the Qwen2.5-0.5B-Instruct family, exported with a Task-specific graph packing KV cache and sequence position into one state pair. Other decoder-only models with the same contract should also work.
- Native API: `WinMLTasks.h` and `winml/tasks/text_generation/TextGeneration.hpp`; Python: `windowsml.tasks` with `windowsml.runtime`.
- For on-device generation with a Microsoft-managed model, use the ready-to-use local LLMs instead.

## Related

- [Windows ML Runtime API overview](./runtime-overview.md)
- [Windows ML Runtime API concepts](./runtime-concepts.md)
- [Recognize speech with your own Whisper model](./runtime-speech-recognition.md)
