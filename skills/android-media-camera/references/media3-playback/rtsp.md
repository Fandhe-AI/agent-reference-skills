# RTSP

Playing live and on-demand RTSP streams with ExoPlayer via `MediaItem` or `RtspMediaSource`. Source: https://developer.android.com/media/media3/exoplayer/rtsp

## Signature / Usage

```kotlin
implementation("androidx.media3:media3-exoplayer-rtsp:1.11.1")
```

```kotlin
val player = ExoPlayer.Builder(context).build()
player.setMediaItem(MediaItem.fromUri(rtspUri))
player.prepare()
```

```kotlin
val mediaSource: MediaSource =
  RtspMediaSource.Factory()
    .setSocketFactory(socketFactory) // optional
    .createMediaSource(MediaItem.fromUri(rtspUri))
player.setMediaSource(mediaSource)
player.prepare()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `RtspMediaSource.Factory.setTimeoutMs()` | method | Timeout for retrying with RTP/TCP after UDP inactivity; also used for end-of-stream detection. |
| `RtspMediaSource.Factory.setForceUseRtpTcp()` | method | Use RTP/TCP by default. |
| `RtspMediaSource.Factory.setSocketFactory()` | method | Override the default `SocketFactory.getDefault()` (for example, to route over a specific interface). |

## Notes

- Supported sample formats: H264 (the SDP media description must include SPS/PPS data in the fmtp attribute), AAC (ADTS bitstream), AC3.
- Supported network types: RTP over UDP unicast (multicast is not supported); interleaved RTSP (RTP over RTSP using TCP).
- Authentication: RTSP BASIC and DIGEST are supported. Put credentials in the URI: `rtsp://<username>:<password>@<host address>`.
- UDP is the default RTP transport. Behind a NAT lacking UDP port mapping, if no RTP packets arrive and playback has not started, ExoPlayer tears down the session and retries with RTP-over-RTSP (TCP).
- Setting a too-small timeout may cause an early end-of-stream signal under poor network conditions.
- Artifact version shown (1.11.1) is as given on the source page.

## Related

- [MediaSource and Factories](./media-source.md)
- [Network Stacks](./network-stacks.md)
- [Live Streaming](./live-streaming.md)
