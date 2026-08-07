# Ruby SDK

Official OpenAI SDK for Ruby, distributed as the `openai` gem.

## Signature / Usage

```ruby
gem "openai"
```

```ruby
require "openai"

openai = OpenAI::Client.new

response = openai.responses.create(
  model: "gpt-5.6",
  input: "Write a one-sentence bedtime story about a unicorn."
)

puts(response.output_text)
```

## Notes

- `OpenAI::Client.new` reads the API key automatically from the `OPENAI_API_KEY` environment variable.
- Run the example with `ruby example.rb`.
- Source: [github.com/openai/openai-ruby](https://github.com/openai/openai-ruby).

## Related

- [Go SDK](./go-sdk.md)
- [Python SDK](./python-sdk.md)
