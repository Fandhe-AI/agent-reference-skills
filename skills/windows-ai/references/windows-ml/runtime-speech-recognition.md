# Recognize speech with your own Whisper model using Windows ML (experimental)

The Speech Recognition API composes a Whisper encoder pipeline, a decoder pipeline, and a tokenizer, and handles the autoregressive transcription loop, streaming and cancellation on top of the Windows ML Runtime API.

## Signature / Usage

```cpp
// encoderPipeline/encoderStage and decoderPipeline/decoderStage are each a single-stage
// pipeline built from encoder_model.onnx / decoder_model.onnx (see the official page).
ComPtr<IWinMLTokenizer> tokenizer;
THROW_IF_FAILED(WinMLCreateTokenizerFromFile(
    L"C:\\models\\whisper\\tokenizer.json", tokenizer.GetAddressOf()));

const winml::tasks::speech::asr::AutomaticSpeechRecognitionArguments arguments{
    runtime.Get(),
    tokenizer.Get(),
    {
        encoderPipeline.Get(),
        encoderStage.Get(),
        decoderPipeline.Get(),
        decoderStage.Get(),
        target.Get(),
    },
};
winml::tasks::speech::asr::AutomaticSpeechRecognition speechRecognition;
THROW_IF_FAILED(winml::tasks::speech::asr::BuildAutomaticSpeechRecognition(
    arguments, speechRecognition));
```

Transcribe:

```cpp
ComPtr<IWinMLAutomaticSpeechRecognitionPullStream> stream;
THROW_IF_FAILED(speechRecognition.session->TranscribeWaveform(
    waveform.Get(),
    &waveformMetadata,
    cancellation.Get(),
    stream.GetAddressOf()));

WINML_AUTOMATIC_SPEECH_RECOGNITION_READ_STATUS status{};
LPCWSTR fragment = nullptr;
while (SUCCEEDED(stream->ReadNext(&status, &fragment)) &&
    status == WINML_AUTOMATIC_SPEECH_RECOGNITION_READ_STATUS_UPDATE)
{
    std::wprintf(L"%ls", fragment);
}

ComPtr<IWinMLAutomaticSpeechRecognitionResult> result;
THROW_IF_FAILED(stream->GetResult(result.GetAddressOf()));
```

## Notes

- Experimental and **not supported** for production use; available in C++ and Python, **C# not supported**.
- Built specifically for the **Whisper** encoder/decoder architecture; not a generic ASR API. Supply ONNX `encoder_model.onnx` and `decoder_model.onnx` plus a tokenizer file.
- Input is a Runtime tensor of mono floating-point PCM samples plus sample-rate and valid-length metadata (`waveform` / `waveformMetadata` come from your own audio-loading code).
- Windows doesn't ship a model for this API; you package and distribute the Whisper model. You still create the Runtime objects and pass them to the session.
- The result reports the full transcript and a finish reason (end-of-transcript token, cancellation, or error).
- Native API: `WinMLTasks.h` and `winml/tasks/speech/asr/WhisperAutomaticSpeechRecognition.hpp`; Python: `windowsml.tasks` with `windowsml.runtime`.
- For on-device speech-to-text with a Microsoft-managed model, use the ready-to-use Speech Recognition API instead.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/runtime/speech-recognition (retrieved 2026-10-16)

## Related

- [Windows ML Runtime API overview](./runtime-overview.md)
- [Generate text with your own language model](./runtime-text-generation.md)
