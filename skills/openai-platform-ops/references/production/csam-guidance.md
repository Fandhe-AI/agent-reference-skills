# CSAM Guidance

Practical child-safety guidance for developers building on OpenAI services: prevent, detect, respond and report. OpenAI developed it with input from the Tech Coalition, Thorn, NCMEC (National Center for Missing & Exploited Children), and the IWF (Internet Watch Foundation).

## Signature / Usage

Policy guidance; the only API surface is `safety_identifier`, which ties each upload to a stable, hashed per-user value so OpenAI can monitor abuse and give more actionable feedback.

Snippet taken from https://developers.openai.com/api/docs/guides/safety-best-practices (the CSAM page itself has no code; for the Images API send the same `safety_identifier` on generation and edit requests).

```python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-6-astra",
    messages=[{"role": "user", "content": "This is a test"}],
    max_completion_tokens=5,
    safety_identifier="user_123456",
)
```

## Options / Props

| Stage | Baseline actions |
|-------|------------------|
| Prevent | Prohibit child sexual exploitation and abuse in terms of service / acceptable use policy; give users a visible reporting path routed to a monitored queue; associate every upload with a user and send `safety_identifier` |
| Detect | Perceptual hash matching (for example Microsoft PhotoDNA, Meta PDQ, YouTube CSAI Match, Safer by Thorn) with CSAM hash lists (NCMEC, IWF); novel-CSAM classifiers (Safer by Thorn predictive tools, Google Content Safety API); bad actor detection and enforcement against repeat offenders |
| Respond and report | Register to report to NCMEC (or your local reporting hotline); keep usable records and identifiers; write a response playbook; train and support reviewers; use moderation tools |

## Notes

- Hash both usernames and emails before sending them as `safety_identifier`; use a unique string per user. For the direct Images API, send the same stable identifier as `safety_identifier` for image generation and image edits. The `user` parameter is deprecated but remains supported for backward compatibility.
- Additional prevention measures: keyword / URL blocking or refusals for CSAM-related terms; warnings to users attempting CSAM-related behavior; for services available to children, direct users who report sexual images of themselves to support services (IWF / NSPCC Report Remove for UK children, NCMEC Take It Down); if a child faces immediate or imminent harm, refer to emergency services and give the child emergency contact information.
- The Moderation API detects potentially harmful content in text and images, but is not a substitute for dedicated CSAM detection. Its `sexual/minors` category covers sexual content involving people under 18 and is text-only. Use results to block or filter content, send content for human review, intervene on an account, or add friction to repeated misuse.
- Higher-risk products (livestreaming, image generation or editing, file storage, private connections) should add launch-time risk assessments, layered detection, human review of high-confidence or high-severity signals with reviewer well-being protections, rate limits and account controls, and regular testing.
- Specialist support named on the official page: Tech Coalition Pathways (free capacity-building program, PhotoDNA sublicense eligibility), Elevate (tailored consulting), Tech Coalition membership, and ROOST Coop (open-source review console with NCMEC CyberTipline reporting).
- These recommendations are a starting point, not legal advice or a universal standard of care; local laws and reporting obligations vary by jurisdiction.
- The Markdown twin of the official page strips inline links and partner names; names above were taken from the rendered HTML page. Several partner programs and URLs are not reproduced here; see the official page.
- Source: https://developers.openai.com/api/docs/guides/csam-guidance (fetched 2026-11-14).

## Related

- [Safety best practices](./safety-best-practices.md)
- [Under-18 guidance](./under-18-guidance.md)
- [Moderation](./moderation.md)
- [Safety checks](./safety-checks.md)
