# Run models with llama.cpp on DGX Spark

Build llama.cpp with CUDA support for the GB10 GPU and serve LLMs via an OpenAI-compatible API, demonstrated with Qwen3.6-35B-A3B and MTP speculative decoding.

## Signature / Usage

```bash
git clone https://github.com/ggml-org/llama.cpp
cmake -B build -DGGML_CUDA=ON -DCMAKE_CUDA_ARCHITECTURES=121
cmake --build build --config Release
./build/bin/llama-server -m model.gguf
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| unsloth/Qwen3.6-35B-A3B-MTP-GGUF | model | Q4_K_XL quantization example |

## Notes

- Requires ~30GB free RAM for model + KV-cache, ~40GB free disk, CMake 3.14+, CUDA Toolkit
- Any GGUF-format checkpoint is compatible
- Duration: 30 minutes plus ~35GB model download

## Related

- [vLLM for Inference](./vllm.md)
- [Speculative Decoding](./speculative-decoding.md)
