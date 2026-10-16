# FFT

`mlx.core.fft` provides discrete Fourier transforms (1-D, 2-D, N-D, real-input variants), frequency helpers, shifts, and the short-time transforms `stft` / `istft`.

## Signature / Usage

```python
import mlx.core as mx

x = mx.random.normal((16000,))
spec = mx.fft.stft(x, n_fft=512, hop_length=128)   # shape (..., n_freq, n_frames), complex
y = mx.fft.istft(spec, n_fft=512, hop_length=128, length=16000)
```

## Options / Props

Functions listed in `fft.rst`: `fft`, `ifft`, `fft2`, `ifft2`, `fftn`, `ifftn`, `rfft`, `irfft`, `rfft2`, `irfft2`, `rfftn`, `irfftn`, `stft`, `istft`, `fftfreq`, `rfftfreq`, `fftshift`, `ifftshift`.

`stft(x, n_fft=2048, hop_length=None, win_length=None, window=None, center=True, pad_mode='reflect', norm='backward', onesided=None, stream=None)`

| Name | Type | Description |
| --- | --- | --- |
| x | array | The input array |
| n_fft | int | Size of the Fourier Transform. Default `2048` |
| hop_length | int | Samples between frames. Default `n_fft // 4` |
| win_length | int | Window size. Default `n_fft` |
| window | array | A one-dimensional window, centered and zero-padded to `n_fft`. Default is a rectangular window |
| center | bool | Pad both ends so frames are centered. Default `True` |
| pad_mode | str | One of `"reflect"`, `"constant"`, `"edge"`, used when `center` is `True`. Default `"reflect"` |
| norm | str | One of `"backward"`, `"ortho"`, `"forward"`. Default `"backward"` |
| onesided | bool | Return only non-negative frequencies. Default `True` for real input and `False` for complex input |

`istft(stft_matrix, n_fft=None, hop_length=None, win_length=None, window=None, center=True, norm='backward', onesided=None, length=None, stream=None)`

| Name | Type | Description |
| --- | --- | --- |
| stft_matrix | array | The STFT with shape `(..., n_freq, n_frames)` |
| n_fft | int | Size of the Fourier Transform. Inferred from `n_freq` and `onesided`; the onesided inference is even, so pass `n_fft` for an odd transform size |
| hop_length | int | Samples between frames. Default `n_fft // 4` |
| win_length | int | Window size. Default `n_fft` |
| window | array | A one-dimensional window. Default is a rectangular window |
| center | bool | Whether the STFT was centered. Default `True` |
| norm | str | One of `"backward"`, `"ortho"`, `"forward"`. Default `"backward"` |
| onesided | bool | Whether the STFT has only non-negative frequencies. Default `True` |
| length | int | Trim or zero-pad the output to this length |

## Notes

- `stft` splits the last axis of `x` into overlapping frames of length `n_fft`, applies `window`, and takes the Fourier Transform of each frame. The output is always complex with shape `(..., n_freq, n_frames)`.
- `istft` inverts `stft` by overlap-adding the windowed inverse transform of each frame, normalized by the squared-window envelope; it returns the reconstructed signal.
- `stft` and `istft` are new in the 0.32.x line (source pinned at tag `v0.32.4`).
- Source: https://ml-explore.github.io/mlx/build/html/python/fft.html (pinned source: https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/python/fft.rst)

## Related

- [Operations](./operations.md)
- [Array](./array.md)
