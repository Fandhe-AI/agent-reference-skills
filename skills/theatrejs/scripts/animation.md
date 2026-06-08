# Animation

シーケンス（アニメーション）の再生・制御コードスニペット集。

## シーケンスの再生

```js
sheet.sequence.play()
```

## 無限ループ再生

```js
project.ready.then(() => sheet.sequence.play({ iterationCount: Infinity }))
```

## シーケンスの一時停止

```js
sheet.sequence.pause()
```

## 現在の再生位置の取得

```js
const position = sheet.sequence.position
```

## オーディオのアタッチ（URL 指定）

```js
sheet.sequence.attachAudio({
  source: 'http://localhost:3000/audio.mp3',
}).then(() => {
  console.log('Audio loaded!')
})
```

## オーディオのアタッチ（Web Audio API カスタムグラフ）

```js
const audioContext = new AudioContext()

sheet.sequence.attachAudio({
  source: audioBuffer,
  audioContext,
  destinationNode: audioContext.destination,
})
```

## オーディオのゲイン調整（カスタムルーティング）

```js
sheet.sequence.attachAudio({
  source: '/music.mp3',
}).then((audioGraph) => {
  const { audioContext, gainNode } = audioGraph

  gainNode.disconnect()
  const loweredGain = audioContext.createGain()
  loweredGain.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.connect(loweredGain)
  loweredGain.connect(audioContext.destination)
})
```
