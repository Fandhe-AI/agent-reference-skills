# Vision

| Name | Description | Path |
|------|-------------|------|
| VNRequest | Abstract base class for all Vision analysis requests | [vnrequest.md](./vnrequest.md) |
| VNImageRequestHandler | Processes Vision requests against a single image (iOS 11+, callback-based) | [vnimagerequesthandler.md](./vnimagerequesthandler.md) |
| VNSequenceRequestHandler | Processes Vision requests across a sequence of frames for stateful tracking | [vnsequencerequesthandler.md](./vnsequencerequesthandler.md) |
| VNDetectFaceRectanglesRequest | Detects faces and returns bounding boxes as VNFaceObservation | [vndetectfacerectanglesrequest.md](./vndetectfacerectanglesrequest.md) |
| VNDetectFaceLandmarksRequest | Detects facial landmarks (eyes, mouth, contours) within faces | [vndetectfacelandmarksrequest.md](./vndetectfacelandmarksrequest.md) |
| VNRecognizeTextRequest | Finds and recognizes text in an image (iOS 13+, callback-based) | [vnrecognizetextrequest.md](./vnrecognizetextrequest.md) |
| VNDetectBarcodesRequest | Detects barcodes and QR codes; returns payload and symbology | [vndetectbarcodesrequest.md](./vndetectbarcodesrequest.md) |
| VNCoreMLRequest | Runs a Core ML model on an image via Vision pipeline | [vncoremlrequest.md](./vncoremlrequest.md) |
| VNCoreMLModel | Wraps an MLModel for use with VNCoreMLRequest | [vncoremlmodel.md](./vncoremlmodel.md) |
| VNClassifyImageRequest | Classifies image content using Apple's built-in Vision model | [vnclassifyimagerequest.md](./vnclassifyimagerequest.md) |
| VNDetectHumanBodyPoseRequest | Detects 2D human body pose joint positions in an image | [vndetecthumanbodyposerequest.md](./vndetecthumanbodyposerequest.md) |
| VNObservation | Abstract base class for all Vision analysis results | [vnobservation.md](./vnobservation.md) |
| VNRecognizedTextObservation | Observation holding recognized text candidates and bounding box | [vnrecognizedtextobservation.md](./vnrecognizedtextobservation.md) |
| ImageRequestHandler | Modern async/await image handler (iOS 18+) | [imagerequesthandler.md](./imagerequesthandler.md) |
| RecognizeTextRequest | Modern async/await text recognition request (iOS 18+) | [recognizetextrequest.md](./recognizetextrequest.md) |
