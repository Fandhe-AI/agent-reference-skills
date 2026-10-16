# Run a model with the Windows ML Runtime API

The standard Runtime API sequence: create runtime, load model, build a one-stage pipeline, bind an input tensor, run, and read the output under a lock.

## Signature / Usage

```cpp
void RunModel(std::wstring const& modelPath)
{
    winrt::com_ptr<IWinMLRuntime> runtime;
    winrt::check_hresult(WinMLCreateRuntime(
        __uuidof(IWinMLRuntime),
        runtime.put_void()));

    winrt::com_ptr<IWinMLModel> model;
    winrt::check_hresult(runtime->LoadModelFromFile(
        modelPath.c_str(),
        nullptr,
        nullptr,
        model.put()));

    winrt::com_ptr<IWinMLExecutionTarget> target;
    winrt::check_hresult(runtime->CreateCpuExecutionTarget(target.put()));

    winrt::com_ptr<IWinMLPipelineBuilder> builder;
    winrt::check_hresult(runtime->CreatePipelineBuilder(builder.put()));

    winrt::com_ptr<IWinMLStage> stage;
    winrt::check_hresult(builder->AddModelStage(
        model.get(), target.get(), L"model", stage.put()));

    winrt::com_ptr<IWinMLPipeline> pipeline;
    winrt::check_hresult(builder->Build(pipeline.put()));

    winrt::com_ptr<IWinMLModelSchema> schema;
    winrt::check_hresult(model->QueryInterface(
        __uuidof(IWinMLModelSchema), schema.put_void()));

    WINML_TENSOR_SCHEMA_DESC inputSchema = {};
    winrt::check_hresult(schema->GetInputTensorDesc(0, &inputSchema));

    // ... compute elementCount from inputSchema.dimensions, fill inputData (float) ...

    WINML_TENSOR_DESC inputDesc = {};
    inputDesc.dataType = inputSchema.dataType;
    inputDesc.dimensionCount = inputSchema.dimensionCount;
    inputDesc.dimensions = inputSchema.dimensions;

    winrt::com_ptr<IWinMLRawTensorFactory> tensorFactory;
    winrt::check_hresult(target->QueryInterface(
        __uuidof(IWinMLRawTensorFactory), tensorFactory.put_void()));

    winrt::com_ptr<IWinMLTensor> inputTensor;
    winrt::check_hresult(tensorFactory->CreateTensor(
        &inputDesc,
        inputData.data(),
        inputData.size() * sizeof(float),
        inputTensor.put()));

    winrt::check_hresult(stage->BindInput(0, inputTensor.get()));
    winrt::check_hresult(pipeline->Run());

    winrt::com_ptr<IWinMLTensor> outputTensor;
    winrt::check_hresult(stage->GetOutput(0, outputTensor.put()));

    winrt::com_ptr<IWinMLTensorDataLock> outputLock;
    winrt::check_hresult(outputTensor->Lock(
        WINML_TENSOR_LOCK_MODE_READ,
        WINML_TENSOR_LOCK_FLAG_NONE,
        outputLock.put()));

    BYTE* outputBytes = nullptr;
    UINT64 outputSizeInBytes = 0;
    winrt::check_hresult(outputLock->GetData(&outputBytes, &outputSizeInBytes));
}
```

Build and run:

```powershell
.\x64\Release\RuntimeApp.exe C:\models\model.onnx
```

## Notes

- Experimental and **not supported** for production use.
- Prerequisite: complete the C++ project setup page. You need an ONNX model whose input contract you understand.
- The model can be anywhere the app can read; pass an absolute or relative path to `LoadModelFromFile`.
- The helper assumes one fixed-shape `FLOAT32` input (not a product limitation). For free dimensions, bind concrete tensor dimensions per run; for other data types, create matching input storage. The full source rejects dimension 0, `UINT64_MAX`, and overflow, and throws `E_INVALIDARG` / `E_BOUNDS`; the snippet above elides that loop (see the official page).
- Pass the same execution target to both `AddModelStage` and the tensor factory to keep model preparation and tensor placement on one target.
- `Lock` establishes a CPU-access window; the pointer from `GetData` stays valid only while `outputLock` is alive.
- Interpret the output tensor per the model's output schema; labels, sampling, and preprocessing belong in the app.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/runtime/tutorial (retrieved 2026-10-16)

## Related

- [Set up a C++ project for the Windows ML Runtime API](./runtime-get-started.md)
- [Windows ML Runtime API concepts](./runtime-concepts.md)
- [Windows ML Runtime API overview](./runtime-overview.md)
