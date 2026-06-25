---
name: apple-ml
description: >
  Apple オンデバイス機械学習フレームワークリファレンス。
  Core ML / Create ML / Vision / Natural Language / Speech。
  MLModel, MLModelConfiguration, MLMultiArray, MLComputeUnits,
  MLImageClassifier, MLTextClassifier, MLDataTable,
  VNImageRequestHandler, VNRecognizeTextRequest, VNCoreMLRequest,
  NLTagger, NLLanguageRecognizer, NLEmbedding,
  SFSpeechRecognizer, SFSpeechAudioBufferRecognitionRequest, SFTranscription。
user-invocable: false
---

## ディレクトリ構成

```text
skills/apple-ml/
  SKILL.md
  references/
    coreml/
      README.md
      mlmodel.md
      mlmodelconfiguration.md
      mlmodeldescription.md
      mlmodelasset.md
      mlmodelcollection.md
      mlmultiarray.md
      mlfeatureprovider.md
      mldictionaryfeatureprovider.md
      mlfeaturevalue.md
      mlpredictionoptions.md
      mlcomputeunits.md
    createml/
      README.md
      mlimageclassifier.md
      mlimageclassifier-modelparameters.md
      mlobjectdetector.md
      mlobjectdetectormetrics.md
      mltextclassifier.md
      mlclassifier.md
      mlclassifiermetrics.md
      mlregressor.md
      mlregressormetrics.md
      mlsoundclassifier.md
      mldatatable.md
      mldatavalue.md
      mltrainingsession.md
      mltrainingsessionparameters.md
      mljob.md
      mlcheckpoint.md
      mlmodelmetadata.md
      mlsplitstrategy.md
      mlcreateerror.md
    vision/
      README.md
      vnrequest.md
      vnimagerequesthandler.md
      imagerequesthandler.md
      vnsequencerequesthandler.md
      vnrecognizetextrequest.md
      recognizetextrequest.md
      vnclassifyimagerequest.md
      vncoremlrequest.md
      vncoremlmodel.md
      vndetectbarcodesrequest.md
      vndetectfacelandmarksrequest.md
      vndetectfacerectanglesrequest.md
      vndetecthumanbodyposerequest.md
      vnobservation.md
      vnrecognizedtextobservation.md
    natural-language/
      README.md
      nltagger.md
      nltag.md
      nltagscheme.md
      nltokenizer.md
      nllanguage.md
      nllanguagerecognizer.md
      nlembedding.md
      nlcontextualembedding.md
      nlmodel.md
      nlgazetteer.md
    speech/
      README.md
      sfspeechrecognizer.md
      sfspeechrecognizerauthorizationstatus.md
      sfspeechrecognitionrequest.md
      sfspeechaudiobufferrecognitionrequest.md
      sfspeechurlrecognitionrequest.md
      sfspeechrecognitiontask.md
      sfspeechrecognitionresult.md
      sftranscription.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| MLModel のロード・推論・設定を知りたい | coreml | [references/coreml/README.md](references/coreml/README.md) |
| MLMultiArray や MLFeatureProvider の使い方を知りたい | coreml | [references/coreml/README.md](references/coreml/README.md) |
| MLComputeUnits で GPU / ANE を切り替えたい | coreml | [references/coreml/README.md](references/coreml/README.md) |
| 画像分類・物体検出モデルをトレーニングしたい | createml | [references/createml/README.md](references/createml/README.md) |
| MLImageClassifier / MLTextClassifier を使いたい | createml | [references/createml/README.md](references/createml/README.md) |
| MLDataTable でデータを準備・加工したい | createml | [references/createml/README.md](references/createml/README.md) |
| 画像からテキストを認識したい（OCR） | vision | [references/vision/README.md](references/vision/README.md) |
| VNRequest / VNImageRequestHandler を使いたい | vision | [references/vision/README.md](references/vision/README.md) |
| VNCoreMLRequest で Core ML モデルを Vision に組み込みたい | vision | [references/vision/README.md](references/vision/README.md) |
| テキストのトークナイズ・品詞タグ付けをしたい | natural-language | [references/natural-language/README.md](references/natural-language/README.md) |
| NLLanguageRecognizer で言語を判定したい | natural-language | [references/natural-language/README.md](references/natural-language/README.md) |
| NLEmbedding / NLModel でテキスト埋め込みを使いたい | natural-language | [references/natural-language/README.md](references/natural-language/README.md) |
| 音声をテキストに変換したい（音声認識） | speech | [references/speech/README.md](references/speech/README.md) |
| SFSpeechRecognizer / SFSpeechAudioBufferRecognitionRequest を使いたい | speech | [references/speech/README.md](references/speech/README.md) |
| SFTranscription で認識結果を扱いたい | speech | [references/speech/README.md](references/speech/README.md) |
