# Under-18 Guidance

Additional safeguards developers should implement when using the API to serve minors (under 18 years old). These are in addition to the usage policies and terms and conditions.

## Signature / Usage

Policy guidance with no API surface. Pair it with a per-user `safety_identifier` so enforcement can target an individual rather than the organization:

```bash
curl https://api.openai.com/v1/responses \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{
"model": "gpt-5.6-terra",
"input": "This is a test",
"safety_identifier": "user_123456"
}'
```

### Regulatory standards

Organizations serving minors must comply with all applicable child protection, safety, and privacy laws, including the Children's Online Privacy Protection Act (COPPA). Do not use OpenAI services to process personal data of children under 13 (or the applicable age of digital consent) without first implementing zero data retention in the API. You are solely responsible for ensuring you and your users use OpenAI services in compliance with applicable law.

### Safety standards

Take reasonable steps to ensure content served to minors via the API is safe and age appropriate, in line with the usage policy to "Keep minors safe". This may include:

1. Age-appropriate disclosures to minors about AI tools and how to use them responsibly.
2. Age-appropriate content filters for potentially sensitive content.
3. Reasonable monitoring and reporting mechanisms, including escalation paths for high-risk interactions.
4. Where required or otherwise appropriate, age assurance systems so only intended users can access the product.

### Best practices

- Exercise heightened care when handling minors' data and interactions, and take appropriate action when risks to young users are identified.
- Use available safety tools and technical safety measures OpenAI provides to tailor experiences for specific user groups, including minors.
- Use OpenAI's most current flagship models, which incorporate the latest safety protections.

## Notes

- Source: https://developers.openai.com/api/docs/guides/safety-checks/under-18-api-guidance (fetched 2026-10-17).
- OpenAI reserves the right to audit organizations for compliance. Customers who fail to demonstrate compliance may receive warnings and, for repeated or serious noncompliance, suspension or termination of API access.

## Related

- [Safety best practices](./safety-best-practices.md)
- [Safety checks](./safety-checks.md)
- [Moderation](./moderation.md)
