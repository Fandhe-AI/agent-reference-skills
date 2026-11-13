---
source: https://opencode.ai/docs/console/go/#usage-limits
---

# OpenCode Go usage limits

Usage limits are defined as monthly dollar amounts. The tables below show the monthly limit for each plan and the token costs for each model. Token pricing is the same for Go, Go Plus, and Go Teams.

Each model has the following usage limits: 5-hour — 20% of the monthly limit; weekly — 50%; and monthly — 100%.

Each model's monthly limit below determines how its usage counts toward those allowances. Each response reports how much the request counted, as [`opencode.allowance`](https://opencode.ai/docs/console/api/inference/#cost).

Token prices are per 1M tokens.

## Signature / Usage

Snippet taken from https://opencode.ai/docs/console/go/#endpoints (selecting a Go model in OpenCode):

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode-go/kimi-k3",
}
```

### Estimated requests

The tables below estimate request counts based on typical Go usage patterns. Go Plus and Go Teams estimates scale with each model's higher usage limit.

#### Go plan: estimated requests

| Model | Requests per 5 hours | Requests per week | Requests per month |
| --- | --- | --- | --- |
| GLM-5.3-Flash | 6,320 | 15,790 | 31,580 |
| GLM-5.3 | 220 | 540 | 1,080 |
| GLM-5.2 | 880 | 2,150 | 4,300 |
| Kimi K3.1 Pro | 147 | 368 | 735 |
| Kimi K3 | 110 | 250 | 490 |
| Kimi K2.7 Code | 1,350 | 3,380 | 6,750 |
| LongCat-2.0 | 11,400 | 28,600 | 57,200 |
| Step 5 Preview | 430 | 1,070 | 2,130 |
| Beam Free | Unlimited | Unlimited | Unlimited |
| Iceman Contributor Free | Unlimited | Unlimited | Unlimited |
| LongCat 2.5 Free | Unlimited | Unlimited | Unlimited |
| MiMo-V2.6-Flash | 30,100 | 75,200 | 150,400 |
| MiMo-V2.6-Pro | 3,250 | 8,150 | 16,300 |
| MiMo-V2.5 | 30,100 | 75,200 | 150,400 |
| MiMo-V2.5-Pro | 3,250 | 8,150 | 16,300 |
| MiniMax M3.1 Flash | 3,880 | 9,690 | 19,380 |
| MiniMax M3 | 3,200 | 8,000 | 16,000 |
| Muse Spark 1.3 Contributor | 45,300 | 113,300 | 226,600 |
| Muse Spark 1.2 Contributor | 45,300 | 113,300 | 226,600 |
| Qwen3.8 Max | 160 | 400 | 810 |
| Qwen3.8 Flash | 5,400 | 13,500 | 27,000 |
| Qwen3.7 Plus | 4,300 | 10,800 | 21,600 |
| DeepSeek V4.1 Flash | 43,330 | 108,330 | 216,670 |
| DeepSeek V4 Pro | 1,050 | 2,600 | 5,200 |
| Hy4 | 2,710 | 6,770 | 13,500 |
| Hy4 preview | 1,350 | 3,380 | 6,770 |
| Hy3 | 4,300 | 10,750 | 21,500 |
| Grok 4.7 | 169 | 423 | 845 |
| GPT 6 Luna | 4,230 | 10,560 | 21,130 |
| GPT 5.6 Luna | 2,050 | 5,100 | 10,250 |
| Claude Haiku 5.5 | 3,850 | 9,620 | 19,230 |
| Gemini 4 Argon | 440 | 1,080 | 2,120 |

#### Go Plus plan: estimated requests

| Model | Requests per 5 hours | Requests per week | Requests per month |
| --- | --- | --- | --- |
| GLM-5.3-Flash | 18,960 | 47,370 | 94,740 |
| GLM-5.3 | 1,760 | 4,320 | 8,640 |
| GLM-5.2 | 2,640 | 6,450 | 12,900 |
| Kimi K3.1 Pro | 588 | 1,471 | 2,941 |
| Kimi K3 | 440 | 1,000 | 1,960 |
| Kimi K2.7 Code | 4,050 | 10,140 | 20,250 |
| LongCat-2.0 | 45,600 | 114,400 | 228,800 |
| Step 5 Preview | 1,720 | 4,280 | 8,520 |
| Beam Free | Unlimited | Unlimited | Unlimited |
| Iceman Contributor Free | Unlimited | Unlimited | Unlimited |
| LongCat 2.5 Free | Unlimited | Unlimited | Unlimited |
| MiMo-V2.6-Flash | 60,200 | 150,400 | 300,800 |
| MiMo-V2.6-Pro | 13,000 | 32,600 | 65,200 |
| MiMo-V2.5 | 60,200 | 150,400 | 300,800 |
| MiMo-V2.5-Pro | 13,000 | 32,600 | 65,200 |
| MiniMax M3.1 Flash | 15,500 | 38,760 | 77,520 |
| MiniMax M3 | 9,600 | 24,000 | 48,000 |
| Muse Spark 1.3 Contributor | 90,600 | 226,600 | 453,200 |
| Muse Spark 1.2 Contributor | 90,600 | 226,600 | 453,200 |
| Qwen3.8 Max | 640 | 1,600 | 3,240 |
| Qwen3.8 Flash | 16,200 | 40,500 | 81,000 |
| Qwen3.7 Plus | 12,900 | 32,400 | 64,800 |
| DeepSeek V4.1 Flash | 86,670 | 216,670 | 433,330 |
| DeepSeek V4 Pro | 4,200 | 10,400 | 20,800 |
| Hy4 | 10,840 | 27,080 | 54,000 |
| Hy4 preview | 5,400 | 13,520 | 27,080 |
| Hy3 | 17,200 | 43,000 | 86,000 |
| Grok 4.7 | 676 | 1,692 | 3,380 |
| GPT 6 Luna | 16,920 | 42,240 | 84,520 |
| GPT 5.6 Luna | 8,200 | 20,400 | 41,000 |
| Claude Haiku 5.5 | 15,380 | 38,460 | 76,920 |
| Gemini 4 Argon | 1,760 | 4,320 | 8,480 |

#### Go Teams plan: estimated requests

| Model | Requests per 5 hours | Requests per week | Requests per month |
| --- | --- | --- | --- |
| GLM-5.3-Flash | 6,847 | 17,110 | 34,210 |
| GLM-5.3 | 293 | 720 | 1,440 |
| GLM-5.2 | 953 | 2,330 | 4,660 |
| Kimi K3.1 Pro | 196 | 491 | 980 |
| Kimi K3 | 147 | 333 | 653 |
| Kimi K2.7 Code | 1,462 | 3,660 | 7,310 |
| LongCat-2.0 | 12,350 | 30,980 | 61,970 |
| Step 5 Preview | 573 | 1,430 | 2,840 |
| Beam Free | Unlimited | Unlimited | Unlimited |
| Iceman Contributor Free | Unlimited | Unlimited | Unlimited |
| LongCat 2.5 Free | Unlimited | Unlimited | Unlimited |
| MiMo-V2.6-Flash | 32,608 | 81,470 | 162,930 |
| MiMo-V2.6-Pro | 4,333 | 10,870 | 21,730 |
| MiMo-V2.5 | 32,608 | 81,470 | 162,930 |
| MiMo-V2.5-Pro | 4,333 | 10,870 | 21,730 |
| MiniMax M3.1 Flash | 4,850 | 12,110 | 24,230 |
| MiniMax M3 | 3,467 | 8,670 | 17,330 |
| Muse Spark 1.3 Contributor | 49,075 | 122,740 | 245,480 |
| Muse Spark 1.2 Contributor | 49,075 | 122,740 | 245,480 |
| Qwen3.8 Max | 213 | 530 | 1,080 |
| Qwen3.8 Flash | 6,300 | 15,750 | 31,500 |
| Qwen3.7 Plus | 4,658 | 11,700 | 23,400 |
| DeepSeek V4.1 Flash | 45,500 | 113,750 | 227,500 |
| DeepSeek V4 Pro | 1,400 | 3,470 | 6,930 |
| Hy4 | 2,936 | 7,330 | 14,630 |
| Hy4 preview | 1,575 | 3,940 | 7,900 |
| Hy3 | 4,658 | 11,650 | 23,290 |
| Grok 4.7 | 225 | 564 | 1,130 |
| GPT 6 Luna | 5,640 | 14,080 | 28,170 |
| GPT 5.6 Luna | 2,733 | 6,800 | 13,670 |
| Claude Haiku 5.5 | 5,133 | 12,830 | 25,640 |
| Gemini 4 Argon | 513 | 1,260 | 2,470 |

The estimates use the following token counts per request; actual usage varies.

- Grok 4.7 — 390 input, 32,500 cached, 120 output tokens per request
- GLM-5.3-Flash — 1,000 input, 55,000 cached, 200 output tokens per request
- GLM-5.3/5.2 — 700 input, 52,000 cached, 150 output tokens per request
- GPT 6 Luna — 1,000 input, 50,000 cached, 220 output tokens per request
- GPT 5.6 Luna — 1,000 input, 50,000 cached, 220 output tokens per request
- Claude Haiku 5.5 — 1,100 input, 55,000 cached, 240 output tokens per request
- Kimi K3.1 Pro — 1,050 input, 76,500 cached, 300 output tokens per request
- Kimi K3 — 1,050 input, 76,500 cached, 300 output tokens per request
- Kimi K2.7 Code — 870 input, 55,000 cached, 200 output tokens per request
- LongCat-2.0 — 920 input, 88,900 cached, 200 output tokens per request
- Step 5 Preview — 1,000 input, 55,000 cached, 200 output tokens per request
- DeepSeek V4.1 Flash — 410 input, 71,300 cached, 310 output tokens per request
- DeepSeek V4 Pro — 750 input, 82,000 cached, 290 output tokens per request
- MiniMax M3.1 Flash — 500 input, 49,400 cached, 360 output tokens per request
- MiniMax M3 — 510 input, 56,000 cached, 190 output tokens per request
- Muse Spark 1.3 Contributor — 620 input, 71,400 cached, 300 output tokens per request
- Muse Spark 1.2 Contributor — 620 input, 71,400 cached, 300 output tokens per request
- MiMo-V2.6-Flash — 830 input, 71,500 cached, 295 output tokens per request
- MiMo-V2.6-Pro — 790 input, 86,000 cached, 305 output tokens per request
- MiMo-V2.5 — 830 input, 71,500 cached, 295 output tokens per request
- MiMo-V2.5-Pro — 790 input, 86,000 cached, 305 output tokens per request
- Qwen3.8 Max — 420 input, 66,000 cached, 200 output tokens per request
- Qwen3.8 Flash — 600 input, 58,000 cached, 200 output tokens per request
- Qwen3.7 Plus — 500 input, 57,000 cached, 190 output tokens per request
- Hy4 — 830 input, 71,500 cached, 295 output tokens per request
- Hy4 preview — 830 input, 71,500 cached, 295 output tokens per request
- Hy3 — 830 input, 71,500 cached, 295 output tokens per request

You can track your current usage in the [console](https://opencode.ai/console).

If you reach the usage limit, you can continue using the free models.

Usage limits may change as we learn from early usage and feedback.

### Usage beyond limits

If you also have credits in your Console balance, you can turn on **Extra Usage** on the **Go** page. When enabled, Go will fall back to your [pay-as-you-go balance](./models-pricing.md) after you've reached your usage limits instead of blocking requests.

Go Teams starts with **Extra Usage** on, and you can turn it off or on again on the **Go** page.

### Why some models have lower usage

With Go, the included monthly usage varies by model.

For most models, we make this work through bulk discounts and reserved GPU capacity. We then pass those savings on to you as higher monthly usage.

For some models, we haven't had the opportunity to negotiate a discount or host them at a lower cost, either because the model is new or because their public pricing is already discounted.

For these models, you still get a little more than if you paid the model providers directly; this is why their included monthly usage is lower.

## Options / Props

### Go plan: prices and monthly limit

| Model | Input | Output | Cached Read | Cached Write | Monthly limit |
| --- | --- | --- | --- | --- | --- |
| GLM-5.3-Flash | $0.15 | $0.50 | $0.03 | - | **$60** |
| GLM-5.3 | $1.40 | $4.40 | $0.26 | - | **$15** |
| GLM-5.2 | $1.40 | $4.40 | $0.26 | - | **$60** |
| Kimi K3.1 Pro | $2.00 | $10.00 | $0.20 | $2.00 | **$15** |
| Kimi K3 | $3.00 | $15.00 | $0.30 | $3.00 | **$15** |
| Kimi K2.7 Code | $0.95 | $4.00 | $0.19 | - | **$60** |
| LongCat-2.0 | $0.30 | $1.20 | $0.006 | - | **$60** |
| Step 5 Preview | $1.00 | $2.70 | $0.10 | - | **$15** |
| Beam Free | Free | Free | Free | - | **Unlimited**<br /><small>limited time</small> |
| Iceman Contributor Free | Free | Free | Free | - | **Unlimited**<br /><small>limited time</small> |
| LongCat 2.5 Free | Free | Free | Free | - | **Unlimited**<br /><small>limited time</small> |
| MiMo-V2.6-Flash | $0.14 | $0.28 | $0.0028 | - | **$60** |
| MiMo-V2.6-Pro | $0.435 | $0.87 | $0.003625 | - | **$15** |
| MiMo-V2.5 | $0.14 | $0.28 | $0.0028 | - | **$60** |
| MiMo-V2.5-Pro | $0.435 | $0.87 | $0.003625 | - | **$15** |
| MiniMax M3.1 Flash | $0.15 | $0.60 | $0.015 | - | **$20** |
| MiniMax M3 (≤ 512K tokens) | $0.30 | $1.20 | $0.06 | - | **$60** |
| MiniMax M3 (> 512K tokens) | $0.60 | $2.40 | $0.12 | - | **$60** |
| Muse Spark 1.3 Contributor | $0.10 | $0.20 | $0.002 | - | **$60** |
| Muse Spark 1.2 Contributor | $0.10 | $0.20 | $0.002 | - | **$60** |
| Qwen3.8 Max | $2.00 | $6.00 | $0.25 | $2.50 | **$15** |
| Qwen3.8 Flash | $0.15 | $0.47 | $0.016 | $0.20 | **$30** |
| Qwen3.7 Plus (≤ 256K tokens) | $0.40 | $1.60 | $0.04 | $0.50 | **$60** |
| Qwen3.7 Plus (> 256K tokens) | $1.20 | $4.80 | $0.12 | $1.50 | **$60** |
| DeepSeek V4.1 Flash (Off-Peak) | $0.15 | $0.60 | $0.003 | - | **$100** |
| DeepSeek V4.1 Flash (Peak) | $0.30 | $1.20 | $0.006 | - | **$100** |
| DeepSeek V4 Pro (Off-Peak) | $0.66 | $1.98 | $0.022 | - | **$15** |
| DeepSeek V4 Pro (Peak) | $1.32 | $3.96 | $0.044 | - | **$15** |
| Hy4 | $0.834 | $2.501 | $0.042 | - | **$60** |
| Hy4 preview | $0.834 | $2.501 | $0.042 | - | **$30** |
| Hy3 | $0.14 | $0.58 | $0.035 | - | **$60** |
| Grok 4.7 (≤ 200K tokens) | $2.00 | $6.00 | $0.50 | - | **$15** |
| Grok 4.7 (> 200K tokens) | $4.00 | $12.00 | $1.00 | - | **$15** |
| GPT 6 Luna (≤ 272K tokens) | $0.10 | $0.50 | $0.01 | $0.125 | **$15** |
| GPT 6 Luna (> 272K tokens) | $0.20 | $0.75 | $0.02 | $0.25 | **$15** |
| GPT 5.6 Luna (≤ 272K tokens) | $0.20 | $1.20 | $0.02 | $0.25 | **$15** |
| GPT 5.6 Luna (> 272K tokens) | $0.40 | $1.80 | $0.04 | $0.50 | **$15** |
| Claude Haiku 5.5 (≤ 100K tokens) | $0.10 | $0.50 | $0.01 | $0.125 | **$15** |
| Claude Haiku 5.5 (> 100K tokens) | $0.50 | $2.50 | $0.05 | $0.625 | **$15** |
| Gemini 4 Argon (50% off) | ~~$4.00~~ $2.00 | ~~$20.00~~ $10.00 | ~~$0.20~~ $0.10 | - | **$30** |

### Go Plus plan: prices and monthly limit

| Model | Input | Output | Cached Read | Cached Write | Monthly limit |
| --- | --- | --- | --- | --- | --- |
| GLM-5.3-Flash | $0.15 | $0.50 | $0.03 | - | **$180** |
| GLM-5.3 | $1.40 | $4.40 | $0.26 | - | **$120** |
| GLM-5.2 | $1.40 | $4.40 | $0.26 | - | **$180** |
| Kimi K3.1 Pro | $2.00 | $10.00 | $0.20 | $2.00 | **$60** |
| Kimi K3 | $3.00 | $15.00 | $0.30 | $3.00 | **$60** |
| Kimi K2.7 Code | $0.95 | $4.00 | $0.19 | - | **$180** |
| LongCat-2.0 | $0.30 | $1.20 | $0.006 | - | **$240** |
| Step 5 Preview | $1.00 | $2.70 | $0.10 | - | **$60** |
| Beam Free | Free | Free | Free | - | **Unlimited**<br /><small>limited time</small> |
| Iceman Contributor Free | Free | Free | Free | - | **Unlimited**<br /><small>limited time</small> |
| LongCat 2.5 Free | Free | Free | Free | - | **Unlimited**<br /><small>limited time</small> |
| MiMo-V2.6-Flash | $0.14 | $0.28 | $0.0028 | - | **$120** |
| MiMo-V2.6-Pro | $0.435 | $0.87 | $0.003625 | - | **$60** |
| MiMo-V2.5 | $0.14 | $0.28 | $0.0028 | - | **$120** |
| MiMo-V2.5-Pro | $0.435 | $0.87 | $0.003625 | - | **$60** |
| MiniMax M3.1 Flash | $0.15 | $0.60 | $0.015 | - | **$80** |
| MiniMax M3 (≤ 512K tokens) | $0.30 | $1.20 | $0.06 | - | **$180** |
| MiniMax M3 (> 512K tokens) | $0.60 | $2.40 | $0.12 | - | **$180** |
| Muse Spark 1.3 Contributor | $0.10 | $0.20 | $0.002 | - | **$120** |
| Muse Spark 1.2 Contributor | $0.10 | $0.20 | $0.002 | - | **$120** |
| Qwen3.8 Max | $2.00 | $6.00 | $0.25 | $2.50 | **$60** |
| Qwen3.8 Flash | $0.15 | $0.47 | $0.016 | $0.20 | **$90** |
| Qwen3.7 Plus (≤ 256K tokens) | $0.40 | $1.60 | $0.04 | $0.50 | **$180** |
| Qwen3.7 Plus (> 256K tokens) | $1.20 | $4.80 | $0.12 | $1.50 | **$180** |
| DeepSeek V4.1 Flash (Off-Peak) | $0.15 | $0.60 | $0.003 | - | **$200** |
| DeepSeek V4.1 Flash (Peak) | $0.30 | $1.20 | $0.006 | - | **$200** |
| DeepSeek V4 Pro (Off-Peak) | $0.66 | $1.98 | $0.022 | - | **$60** |
| DeepSeek V4 Pro (Peak) | $1.32 | $3.96 | $0.044 | - | **$60** |
| Hy4 | $0.834 | $2.501 | $0.042 | - | **$240** |
| Hy4 preview | $0.834 | $2.501 | $0.042 | - | **$120** |
| Hy3 | $0.14 | $0.58 | $0.035 | - | **$240** |
| Grok 4.7 (≤ 200K tokens) | $2.00 | $6.00 | $0.50 | - | **$60** |
| Grok 4.7 (> 200K tokens) | $4.00 | $12.00 | $1.00 | - | **$60** |
| GPT 6 Luna (≤ 272K tokens) | $0.10 | $0.50 | $0.01 | $0.125 | **$60** |
| GPT 6 Luna (> 272K tokens) | $0.20 | $0.75 | $0.02 | $0.25 | **$60** |
| GPT 5.6 Luna (≤ 272K tokens) | $0.20 | $1.20 | $0.02 | $0.25 | **$60** |
| GPT 5.6 Luna (> 272K tokens) | $0.40 | $1.80 | $0.04 | $0.50 | **$60** |
| Claude Haiku 5.5 (≤ 100K tokens) | $0.10 | $0.50 | $0.01 | $0.125 | **$60** |
| Claude Haiku 5.5 (> 100K tokens) | $0.50 | $2.50 | $0.05 | $0.625 | **$60** |
| Gemini 4 Argon (50% off) | ~~$4.00~~ $2.00 | ~~$20.00~~ $10.00 | ~~$0.20~~ $0.10 | - | **$120** |

### Go Teams plan: prices and monthly limit

| Model | Input | Output | Cached Read | Cached Write | Monthly limit |
| --- | --- | --- | --- | --- | --- |
| GLM-5.3-Flash | $0.15 | $0.50 | $0.03 | - | **$65** |
| GLM-5.3 | $1.40 | $4.40 | $0.26 | - | **$20** |
| GLM-5.2 | $1.40 | $4.40 | $0.26 | - | **$65** |
| Kimi K3.1 Pro | $2.00 | $10.00 | $0.20 | $2.00 | **$20** |
| Kimi K3 | $3.00 | $15.00 | $0.30 | $3.00 | **$20** |
| Kimi K2.7 Code | $0.95 | $4.00 | $0.19 | - | **$65** |
| LongCat-2.0 | $0.30 | $1.20 | $0.006 | - | **$65** |
| Step 5 Preview | $1.00 | $2.70 | $0.10 | - | **$20** |
| Beam Free | Free | Free | Free | - | **Unlimited**<br /><small>limited time</small> |
| Iceman Contributor Free | Free | Free | Free | - | **Unlimited**<br /><small>limited time</small> |
| LongCat 2.5 Free | Free | Free | Free | - | **Unlimited**<br /><small>limited time</small> |
| MiMo-V2.6-Flash | $0.14 | $0.28 | $0.0028 | - | **$65** |
| MiMo-V2.6-Pro | $0.435 | $0.87 | $0.003625 | - | **$20** |
| MiMo-V2.5 | $0.14 | $0.28 | $0.0028 | - | **$65** |
| MiMo-V2.5-Pro | $0.435 | $0.87 | $0.003625 | - | **$20** |
| MiniMax M3.1 Flash | $0.15 | $0.60 | $0.015 | - | **$25** |
| MiniMax M3 (≤ 512K tokens) | $0.30 | $1.20 | $0.06 | - | **$65** |
| MiniMax M3 (> 512K tokens) | $0.60 | $2.40 | $0.12 | - | **$65** |
| Muse Spark 1.3 Contributor | $0.10 | $0.20 | $0.002 | - | **$65** |
| Muse Spark 1.2 Contributor | $0.10 | $0.20 | $0.002 | - | **$65** |
| Qwen3.8 Max | $2.00 | $6.00 | $0.25 | $2.50 | **$20** |
| Qwen3.8 Flash | $0.15 | $0.47 | $0.016 | $0.20 | **$35** |
| Qwen3.7 Plus (≤ 256K tokens) | $0.40 | $1.60 | $0.04 | $0.50 | **$65** |
| Qwen3.7 Plus (> 256K tokens) | $1.20 | $4.80 | $0.12 | $1.50 | **$65** |
| DeepSeek V4.1 Flash (Off-Peak) | $0.15 | $0.60 | $0.003 | - | **$105** |
| DeepSeek V4.1 Flash (Peak) | $0.30 | $1.20 | $0.006 | - | **$105** |
| DeepSeek V4 Pro (Off-Peak) | $0.66 | $1.98 | $0.022 | - | **$20** |
| DeepSeek V4 Pro (Peak) | $1.32 | $3.96 | $0.044 | - | **$20** |
| Hy4 | $0.834 | $2.501 | $0.042 | - | **$65** |
| Hy4 preview | $0.834 | $2.501 | $0.042 | - | **$35** |
| Hy3 | $0.14 | $0.58 | $0.035 | - | **$65** |
| Grok 4.7 (≤ 200K tokens) | $2.00 | $6.00 | $0.50 | - | **$20** |
| Grok 4.7 (> 200K tokens) | $4.00 | $12.00 | $1.00 | - | **$20** |
| GPT 6 Luna (≤ 272K tokens) | $0.10 | $0.50 | $0.01 | $0.125 | **$20** |
| GPT 6 Luna (> 272K tokens) | $0.20 | $0.75 | $0.02 | $0.25 | **$20** |
| GPT 5.6 Luna (≤ 272K tokens) | $0.20 | $1.20 | $0.02 | $0.25 | **$20** |
| GPT 5.6 Luna (> 272K tokens) | $0.40 | $1.80 | $0.04 | $0.50 | **$20** |
| Claude Haiku 5.5 (≤ 100K tokens) | $0.10 | $0.50 | $0.01 | $0.125 | **$20** |
| Claude Haiku 5.5 (> 100K tokens) | $0.50 | $2.50 | $0.05 | $0.625 | **$20** |
| Gemini 4 Argon (50% off) | ~~$4.00~~ $2.00 | ~~$20.00~~ $10.00 | ~~$0.20~~ $0.10 | - | **$35** |

**Beam Free:** Free for a limited time. Not available in Angola, Belarus, Cambodia, China (including Hong Kong and Macau), Cuba, the Democratic Republic of the Congo, Equatorial Guinea, Iran, Iraq, Laos, Libya, Nigeria, North Korea, Russia, Syria, Turkmenistan, Uzbekistan, Venezuela, or the Crimea, Donetsk, and Luhansk regions of Ukraine.

**Iceman Contributor Free:** Free for a limited time.

**LongCat 2.5 Free:** Free for a limited time.

**Gemini 4 Argon:** The 50% discount applies through November 30, 2026.

**DeepSeek V4.1 Flash / V4 Pro:** Peak hours are 01:00-04:00 and 06:00-10:00 UTC, Monday through Friday; all other hours, including weekends, are Off-Peak. [Learn more](https://api-docs.deepseek.com/quick_start/pricing/).

## Notes

- OpenCode Go is a Console subscription name, not the Go programming language (go-echo covers the Go web framework).
- The source presents the three plan tables as tabs (Go / Go Plus / Go Teams); they are expanded here as separate subsections. Token prices are identical across plans; only the monthly limit differs.
- Peak hours for DeepSeek: 01:00-04:00 and 06:00-10:00 UTC, Monday through Friday.
- "Usage beyond limits" and "Why some models have lower usage" are H3 headings under "Usage limits" in the source; their anchors were not measured, so `source` points at `#usage-limits`.

## Related

- [OpenCode Go](./go-overview.md)
- [Go endpoints](./go-endpoints.md)
- [Model pricing](./models-pricing.md)
- [Billing](../workspace/billing.md)
