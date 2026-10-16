---
name: apple-ml
description: >
  Apple オンデバイス機械学習フレームワークリファレンス。
  Core AI (.aimodel) / Core ML / Create ML / Vision / Natural Language / Speech / Media Intelligence / Music Understanding。
  AIModel, InferenceFunction, MLModel, MLMultiArray, MLTensor, MLComputeUnits, MLImageClassifier,
  VNCoreMLRequest, RecognizeTextRequest, NLTagger, NLEmbedding,
  SpeechAnalyzer, SpeechTranscriber, SFSpeechRecognizer, FaceGroupAnalyzer, MusicUnderstandingSession。
user-invocable: false
---

対象: Apple developer documentation（取得日 2026-10-16、iOS 27.0 SDK 時点）。Core AI / Media Intelligence / Music Understanding は iOS 27.0+。Speech の SpeechAnalyzer 系は 26.0+（AssetInputSequenceProvider / CaptureInputSequenceProvider / AnalyzerInputConverter のみ 27.0+）。

Core ML と Core AI の境界: 公式の文言では Core ML は decision trees / tabular などニューラルネット以外のモデル向け、Core AI は最新アーキテクチャ向けで、モデル形式は `.aimodel`。`.mlmodel` / `.mlpackage` との互換は未確認。

## ディレクトリ構成

```text
skills/apple-ml/
  SKILL.md
  references/
    coreai/
      README.md
      integrating-on-device-ai-models.md
      aimodel.md
      aimodelasset.md
      aimodelcache.md
      inferencefunction.md
      inferencefunctiondescriptor.md
      inferencevalue.md
      imagedescriptor.md
      computestream.md
      computeunitkind.md
      ndarray.md
      ndarraydescriptor.md
      specializationoptions.md
      managing-model-specialization-and-caching.md
      compiling-core-ai-models-ahead-of-time.md
      debugging-and-profiling.md
      asseterror.md
      background-inference-entitlement.md
    coreml/
      README.md
      mlmodel.md
      mlmodelconfiguration.md
      mlmodeldescription.md
      mlmodelasset.md
      mlmodelcollection.md
      mlmodelstructure.md
      mlmodelerror.md
      mlmultiarray.md
      mlshapedarray.md
      mltensor.md
      mltensorscalar.md
      mltensorrangeexpression.md
      mlfeatureprovider.md
      mldictionaryfeatureprovider.md
      mlfeaturevalue.md
      mlsendablefeaturevalue.md
      mlbatchprovider.md
      mlarraybatchprovider.md
      mlpredictionoptions.md
      mlstate.md
      mlstateconstraint.md
      mlcomputeunits.md
      mlcomputedevice.md
      mlcomputedeviceprotocol.md
      mlcpucomputedevice.md
      mlgpucomputedevice.md
      mlneuralenginecomputedevice.md
      mlcomputeplan.md
      mlcomputepolicy.md
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
      mlactionclassifier.md
      mlhandposeclassifier.md
      mlhandactionclassifier.md
      mlactivityclassifier.md
      mlstyletransfer.md
      mlwordtagger.md
      mlwordtaggermetrics.md
      mlgazetteer.md
      mlwordembedding.md
      mlrecommender.md
      mlrecommendermetrics.md
      mlboundingboxanchor.md
      mlboundingboxcoordinatesorigin.md
      mlboundingboxunits.md
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
      vnobservation.md
      vnimagerequesthandler.md
      vnsequencerequesthandler.md
      vnrecognizetextrequest.md
      vnrecognizedtextobservation.md
      vnclassifyimagerequest.md
      vncoremlrequest.md
      vncoremlmodel.md
      vndetectbarcodesrequest.md
      vndetectfacelandmarksrequest.md
      vndetectfacerectanglesrequest.md
      vndetecthumanbodyposerequest.md
      visionrequest.md
      visionobservation.md
      visionerror.md
      imagerequesthandler.md
      targetedimagerequesthandler.md
      videoprocessor.md
      imageprocessingrequest.md
      statefulrequest.md
      targetedrequest.md
      poseproviding.md
      boundingboxproviding.md
      boundingregionproviding.md
      quadrilateralproviding.md
      normalizedpoint.md
      normalizedrect.md
      normalizedregion.md
      normalizedcircle.md
      coordinateorigin.md
      recognizetextrequest.md
      recognizedocumentsrequest.md
      classifyimagerequest.md
      coremlrequest.md
      calculateimageaestheticsscoresrequest.md
      generateimagefeatureprintrequest.md
      detectbarcodesrequest-modern.md
      detectcontoursrequest.md
      detectrectanglesrequest.md
      detectdocumentsegmentationrequest.md
      detecttextrectanglesrequest.md
      detectfacerectanglesrequest-modern.md
      detectfacelandmarksrequest-modern.md
      detectfacecapturequalityrequest.md
      detecthumanbodyposerequest-modern.md
      detecthumanbodypose3drequest.md
      detecthumanhandposerequest.md
      detecthumanrectanglesrequest.md
      detectanimalbodyposerequest.md
      recognizeanimalsrequest.md
      detecthorizonrequest.md
      detectlenssmudgerequest.md
      detecttrajectoriesrequest.md
      generatepersoninstancemaskrequest.md
      generatepersonsegmentationrequest.md
      generateforegroundinstancemaskrequest.md
      generateiterativesegmentationrequest.md
      isolating-an-object-from-a-tap-box-or-scribble.md
      generateattentionbasedsaliencyimagerequest.md
      generateobjectnessbasedsaliencyimagerequest.md
      trackobjectrequest.md
      trackrectanglerequest.md
      trackopticalflowrequest.md
      trackhomographicimageregistrationrequest.md
      tracktranslationalimageregistrationrequest.md
      downloadableassetsrequest.md
      downloadableassetsrequeststatus.md
      barcodereadertool.md
      ocrtool.md
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
      nlcontextualembeddingkey.md
      nlscript.md
      nlmodel.md
      nlgazetteer.md
    speech/
      README.md
      speechanalyzer.md
      speechtranscriber.md
      dictationtranscriber.md
      speechdetector.md
      speechmodule.md
      localedependentspeechmodule.md
      speechmoduleresult.md
      analyzerinput.md
      assetinputsequenceprovider.md
      captureinputsequenceprovider.md
      analyzerinputconverter.md
      assetinventory.md
      assetinstallationrequest.md
      speechmodels.md
      sfspeechrecognizer.md
      sfspeechrecognizerauthorizationstatus.md
      sfspeechrecognitionrequest.md
      sfspeechaudiobufferrecognitionrequest.md
      sfspeechurlrecognitionrequest.md
      sfspeechrecognitiontask.md
      sfspeechrecognitionresult.md
      sftranscription.md
      sfspeechlanguagemodel.md
      sfspeechlanguagemodel-configuration.md
      sfcustomlanguagemodeldata.md
    media-intelligence/
      README.md
      detecting-and-grouping-faces-in-images.md
      facegroupanalyzer.md
      mediaintelligenceimageasset.md
      finding-the-best-moments-in-a-video.md
      videoanalyzer.md
      mediaintelligencevideoasset.md
      highlightanalysisrequest.md
      keyframeanalysisrequest.md
      mediaintelligenceerror.md
    music-understanding/
      README.md
      musicunderstandingsession.md
      musicunderstandingsession-sessionresult.md
      musicunderstandingsession-timedvalue.md
      musicunderstandingsession-rangedvalue.md
      rhythmresult.md
      keyresult.md
      loudnessresult.md
      paceresult.md
      structureresult.md
      instrumentactivityresult.md
      musicunderstandingerror.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Core AI で .aimodel をロード・推論したい（AIModel / InferenceFunction / NDArray） | coreai | [references/coreai/README.md](references/coreai/README.md) |
| Core AI のモデル specialization・キャッシュ・ahead-of-time コンパイル（coreai-build）を知りたい | coreai | [references/coreai/README.md](references/coreai/README.md) |
| Core AI モデルのデバッグ・プロファイル・バックグラウンド推論 entitlement を知りたい | coreai | [references/coreai/README.md](references/coreai/README.md) |
| MLModel のロード・推論・設定を知りたい | coreml | [references/coreml/README.md](references/coreml/README.md) |
| MLMultiArray / MLTensor / MLFeatureProvider の使い方を知りたい | coreml | [references/coreml/README.md](references/coreml/README.md) |
| MLComputeUnits / MLComputeDevice で CPU・GPU・ANE を切り替えたい | coreml | [references/coreml/README.md](references/coreml/README.md) |
| MLState・MLComputePlan など Core ML の状態・計算計画を扱いたい | coreml | [references/coreml/README.md](references/coreml/README.md) |
| 画像分類・物体検出モデルをトレーニングしたい | createml | [references/createml/README.md](references/createml/README.md) |
| MLImageClassifier / MLTextClassifier を使いたい | createml | [references/createml/README.md](references/createml/README.md) |
| Create ML でアクション・ハンドポーズ・単語タグ・レコメンダーモデルを学習したい | createml | [references/createml/README.md](references/createml/README.md) |
| MLDataTable でデータを準備・加工したい | createml | [references/createml/README.md](references/createml/README.md) |
| 画像からテキストを認識したい（OCR） | vision | [references/vision/README.md](references/vision/README.md) |
| VNRequest / VNImageRequestHandler を使いたい | vision | [references/vision/README.md](references/vision/README.md) |
| VNCoreMLRequest で Core ML モデルを Vision に組み込みたい | vision | [references/vision/README.md](references/vision/README.md) |
| Vision の modern Swift API（VisionRequest / ImageRequestHandler / 追跡・顕著性・セグメンテーション）を使いたい | vision | [references/vision/README.md](references/vision/README.md) |
| Foundation Models 用の OCRTool / BarcodeReaderTool を使いたい | vision | [references/vision/README.md](references/vision/README.md) |
| テキストのトークナイズ・品詞タグ付けをしたい | natural-language | [references/natural-language/README.md](references/natural-language/README.md) |
| NLLanguageRecognizer で言語を判定したい | natural-language | [references/natural-language/README.md](references/natural-language/README.md) |
| NLEmbedding / NLContextualEmbedding / NLModel でテキスト埋め込みを使いたい | natural-language | [references/natural-language/README.md](references/natural-language/README.md) |
| SpeechAnalyzer / SpeechTranscriber でモダンな音声認識・文字起こしをしたい | speech | [references/speech/README.md](references/speech/README.md) |
| 音声アセットを管理したい（AssetInventory） | speech | [references/speech/README.md](references/speech/README.md) |
| 従来の SFSpeechRecognizer / SFSpeechAudioBufferRecognitionRequest で音声認識したい | speech | [references/speech/README.md](references/speech/README.md) |
| カスタム言語モデル（SFSpeechLanguageModel）を使いたい | speech | [references/speech/README.md](references/speech/README.md) |
| SFTranscription で認識結果を扱いたい | speech | [references/speech/README.md](references/speech/README.md) |
| 写真の顔を人物ごとにグループ化したい（FaceGroupAnalyzer） | media-intelligence | [references/media-intelligence/README.md](references/media-intelligence/README.md) |
| 動画のハイライト・キーフレームを抽出したい（VideoAnalyzer） | media-intelligence | [references/media-intelligence/README.md](references/media-intelligence/README.md) |
| 楽曲の BPM・キー・ラウドネス・構造・楽器を解析したい（MusicUnderstandingSession） | music-understanding | [references/music-understanding/README.md](references/music-understanding/README.md) |
