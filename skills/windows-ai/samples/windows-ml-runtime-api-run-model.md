# Windows ML Runtime API Run Model

Load a model, build a pipeline, bind a FLOAT32 tensor, run inference, and read the output with the experimental Windows ML Runtime API (C++).

```cpp
// Copyright (C) Microsoft Corporation. All rights reserved.

#include <Windows.h>
#include <cstdint>
#include <iostream>
#include <string>
#include <vector>
#include <winrt/base.h>

#include <WinMLRuntime.h>

#pragma comment(lib, "windowsapp.lib")

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
        model.get(),
        target.get(),
        L"model",
        stage.put()));

    winrt::com_ptr<IWinMLPipeline> pipeline;
    winrt::check_hresult(builder->Build(pipeline.put()));

    winrt::com_ptr<IWinMLModelSchema> schema;
    winrt::check_hresult(model->QueryInterface(
        __uuidof(IWinMLModelSchema),
        schema.put_void()));

    WINML_TENSOR_SCHEMA_DESC inputSchema = {};
    winrt::check_hresult(schema->GetInputTensorDesc(0, &inputSchema));

    if (inputSchema.dataType != WINML_TENSOR_DATA_TYPE_FLOAT32 ||
        (inputSchema.dimensionCount > 0 &&
         inputSchema.dimensions == nullptr))
    {
        winrt::throw_hresult(E_INVALIDARG);
    }

    UINT64 elementCount = 1;
    for (UINT32 i = 0; i < inputSchema.dimensionCount; ++i)
    {
        const UINT64 dimension = inputSchema.dimensions[i];
        if (dimension == 0 ||
            dimension == UINT64_MAX ||
            elementCount > UINT64_MAX / dimension)
        {
            winrt::throw_hresult(E_INVALIDARG);
        }

        elementCount *= dimension;
    }

    if (elementCount > SIZE_MAX)
    {
        winrt::throw_hresult(E_BOUNDS);
    }

    std::vector<float> inputData(
        static_cast<size_t>(elementCount),
        0.5f);

    WINML_TENSOR_DESC inputDesc = {};
    inputDesc.dataType = inputSchema.dataType;
    inputDesc.dimensionCount = inputSchema.dimensionCount;
    inputDesc.dimensions = inputSchema.dimensions;

    winrt::com_ptr<IWinMLRawTensorFactory> tensorFactory;
    winrt::check_hresult(target->QueryInterface(
        __uuidof(IWinMLRawTensorFactory),
        tensorFactory.put_void()));

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
    winrt::check_hresult(outputLock->GetData(
        &outputBytes,
        &outputSizeInBytes));

    (void)outputBytes;
    std::wcout << L"Output bytes: " << outputSizeInBytes << L'\n';
}

int wmain(int argc, wchar_t** argv)
{
    if (argc != 2)
    {
        std::wcerr << L"Usage: RuntimeApp.exe <model-path>\n";
        return 1;
    }

    RunModel(argv[1]);
    return 0;
}
```

## Notes

- Experimental: the Windows ML Runtime APIs are not supported for production and apps using them should not be published to the Microsoft Store. This is distinct from the ONNX Runtime based Windows ML APIs.
- Official pages differ on the `LoadModelFromFile` arity: this tutorial passes 4 arguments (path, nullptr, nullptr, out model), while the concepts, speech-recognition and text-generation pages pass 3 (path, nullptr, out model). Check the header of the installed experimental package.
- Complete "Set up a C++ project for the Windows ML Runtime API" (runtime/get-started) first. Run with `.\x64\Release\RuntimeApp.exe C:\models\model.onnx`.
- The helper assumes a model with one fixed-shape `FLOAT32` input; bind concrete dimensions for free dimensions and create matching storage for other data types.
- Pass the same execution target to `AddModelStage` and the tensor factory. The pointer from `GetData` is valid only while `outputLock` is alive.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/runtime/tutorial (retrieved 2026-10-16)
