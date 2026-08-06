# Prepare an SFT dataset and create a fine-tuning job

Build a JSONL training file, upload it, and start a supervised fine-tuning (SFT) job.

```jsonl
{"messages":[{"role":"user","content":"What is the weather in San Francisco?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"San Francisco, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and country, eg. San Francisco, USA"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
```

```bash
# Upload the training file
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="fine-tune" \
  -F file="@mydata.jsonl"

# Create the fine-tuning job
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "training_file": "file-RCnFCYRhFDcq1aHxiYkBHw",
    "model": "gpt-4.1-nano-2025-04-14"
  }'

# Call the resulting fine-tuned model
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "ft:gpt-4.1-nano-2025-04-14:openai::BTz2REMH",
    "input": "What is the weather like in Boston today?"
  }'
```

## Notes

- This is an OpenAI LLM-evaluation/fine-tuning example; unrelated to a JS/TS test runner's `evals`.
- Use at least 10 JSONL rows; 50-100+ well-crafted, realistic prompt/output rows show meaningful improvement.
- Track progress via job event logs and checkpoints; use checkpoints to spot overfitting.
- OpenAI is winding down the SFT platform for new users; establish an evaluation baseline before creating new jobs.
