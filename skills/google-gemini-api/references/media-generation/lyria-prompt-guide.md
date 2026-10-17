---
source: https://ai.google.dev/gemini-api/docs/lyria-prompt-guide
---

# Lyria prompt guide

How to write effective prompts for Lyria 3.5 & Lyria 3 Clip (non-streaming, 30-second clips or full songs with lyrics and vocals) and Lyria RealTime (real-time streaming and steering over WebSockets).

## Signature / Usage

A prompt can be a short phrase or a structured description:

```text
A folk song about cute cats avoiding puddles, female vocals, acoustic guitar, sound of rain
```

Lyria RealTime uses weighted prompts:

```python
prompts = [
    types.WeightedPrompt(text="minimal techno", weight=1.0),
    types.WeightedPrompt(text="deep sub bass", weight=0.6),
    types.WeightedPrompt(text="shimmering hi-hats", weight=0.4),
]
```

Steering during a live session:

```python
# Initial high-energy groove
await session.set_weighted_prompts(
    prompts=[
        types.WeightedPrompt(text="techno groove", weight=1.0),
        types.WeightedPrompt(text="acid 303 bass", weight=0.8),
    ]
)

# Transition to a melodic breakdown
await session.set_weighted_prompts(
    prompts=[
        types.WeightedPrompt(text="ambient synth pads", weight=1.0),
        types.WeightedPrompt(text="subtle reverberant piano", weight=0.7),
        types.WeightedPrompt(text="techno groove", weight=0.2),
    ]
)
```

Lyrics with section tags (Lyria 3.5):

```text
Lyrics:

[Intro]
Ooooh, yeah

[Verse 1]
Early morning rain on the window pane
City lights wash away the pain
Walking down this empty street again

[Chorus]
We keep moving on (moving on)
Until the morning light
Everything will be alright
```

## Options / Props

| Topic | Guidance (from source) |
|-------|------------------------|
| Genre and style | Lead with the primary genre; combine genres (for example "A fusion of metal and hip-hop") or specify an era or regional variant (for example "1960s French yé-yé pop") |
| Instruments | Lyria selects instrumentation automatically; declare specific instruments explicitly and describe how they sound and interact |
| Structure (Lyria 3.5) | Tags or arrows: `[Intro] -> [Verse 1] -> [Chorus] -> [Verse 2] -> [Chorus] -> [Bridge] -> [Outro]`; timing markers such as "Build to a beat drop at 12 seconds" |
| Lyrics | Lyria 3.5 generates vocals with lyrics by default; provide your own under a `Lyrics:` header, direct generated lyrics, or request an instrumental. Parentheses mark backing vocals / ad-libs |
| Vocal profiles | Female Soprano, Female Alto, Male Tenor, Male Baritone, Weathered Rocker |
| Tempo (BPM) | e.g. `120 BPM`, `slow tempo around 72 BPM` |
| Key and scale | e.g. `in G major`, `in D minor` |
| Mood | e.g. Ambient, Dreamy, Melancholic, Nostalgic, Upbeat |
| Lyria RealTime | Weighted prompts (text + float weight); blend genres, adjust weights over time, keep instrument and mood tags separate |

Genre keyword groups listed in the source: Electronic & Dance, Hip-Hop & R&B, Rock & Alternative, Jazz Soul & Funk, Folk & Traditional, Classical & Acoustic. Instrument keyword groups: Keyboards & Synths, Bass & Drums, Guitars & Strings, Wind & Brass, Percussion. See the official page for the full keyword lists.

Example Lyria 3.5 prompts:

```text
A 30-second lofi hip hop beat with dusty vinyl crackle, mellow Rhodes piano chords, a relaxed boom-bap drum groove at 82 BPM, and a warm upright bassline. Instrumental only.
```

```text
Dark, cinematic cyberpunk synthwave at 110 BPM in D minor. Heavy distorted bass, ominous arpeggiated analog synthesizers, distant metallic percussion, and an ethereal female vocalise swelling during the climax.
```

## Notes

- Both short and detailed prompts produce strong results.
- Genre and instrument keywords apply to Lyria 3.5 and Lyria RealTime; structure tags and lyrics behavior are described for Lyria 3.5.
- Availability: Lyria 3.5 uses the Interactions API (see music-generation.md); Lyria RealTime is the Live (WebSocket) path, a v1beta feature.

## Related

- [music-generation.md](./music-generation.md)
