# Speech

| Name | Description | Path |
|------|-------------|------|
| SFSpeechRecognizer | Central object for managing speech recognition: authorization, locale, and task initiation. | [sfspeechrecognizer.md](./sfspeechrecognizer.md) |
| SFSpeechRecognitionRequest | Abstract base class for recognition requests; configure before starting a task. | [sfspeechrecognitionrequest.md](./sfspeechrecognitionrequest.md) |
| SFSpeechURLRecognitionRequest | Recognition request for a pre-recorded audio file at a given URL. | [sfspeechurlrecognitionrequest.md](./sfspeechurlrecognitionrequest.md) |
| SFSpeechAudioBufferRecognitionRequest | Recognition request for live or buffered audio; append buffers and call `endAudio()`. | [sfspeechaudiobufferrecognitionrequest.md](./sfspeechaudiobufferrecognitionrequest.md) |
| SFSpeechRecognitionResult | Partial or final result object delivered to the recognition task handler. | [sfspeechrecognitionresult.md](./sfspeechrecognitionresult.md) |
| SFTranscription | Full textual representation of recognized speech with per-segment detail. | [sftranscription.md](./sftranscription.md) |
| SFSpeechRecognitionTask | Task object for monitoring and canceling an in-flight recognition task. | [sfspeechrecognitiontask.md](./sfspeechrecognitiontask.md) |
| SFSpeechRecognizerAuthorizationStatus | Enum of authorization states: `notDetermined`, `denied`, `restricted`, `authorized`. | [sfspeechrecognizerauthorizationstatus.md](./sfspeechrecognizerauthorizationstatus.md) |
