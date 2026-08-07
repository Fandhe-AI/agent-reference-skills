# Reinforcement Fine-Tuning (RFT) with a grader

Fine-tune a reasoning model using a programmable grader that scores each candidate response, instead of fixed correct answers; the model is optimized toward high-scoring outputs.

```jsonl
{"messages":[{"role":"user","content":"Do you have a dedicated security team?"}],"compliant":"yes","explanation":"A dedicated security team follows strict protocols for handling incidents."}
{"messages":[{"role":"user","content":"Have you undergone third-party security audits or penetration testing in the last 12 months?"}],"compliant":"needs review","explanation":"The policy does not explicitly mention undergoing third-party security audits or penetration testing."}
```

```bash
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "training_file": "file-2STiufDaGXWCnT6XUBUEHW",
  "validation_file": "file-4TcgH85ej7dFCjZ1kThCYb",
  "model": "o4-mini-2025-04-16",
  "method": {
    "type": "reinforcement",
    "reinforcement": {
      "grader": {
        "type": "multi",
        "graders": {
          "explanation": {
            "name": "Explanation text grader",
            "type": "score_model",
            "input": [
              {"role": "user", "type": "message", "content": "Score 0-1 how well the model answer matches the reference.\nReference: {{item.explanation}}\nModel Answer: {{sample.output_json.explanation}}"}
            ],
            "model": "gpt-4o-2024-08-06"
          },
          "compliant": {
            "name": "compliant",
            "type": "string_check",
            "reference": "{{item.compliant}}",
            "operation": "eq",
            "input": "{{sample.output_json.compliant}}"
          }
        },
        "calculate_output": "0.5 * compliant + 0.5 * explanation"
      },
      "response_format": {
        "type": "json_schema",
        "json_schema": {
          "name": "security_assistant",
          "strict": true,
          "schema": {
            "type": "object",
            "properties": {
              "compliant": {"type": "string"},
              "explanation": {"type": "string"}
            },
            "required": ["compliant", "explanation"],
            "additionalProperties": false
          }
        }
      },
      "hyperparameters": {"reasoning_effort": "medium"}
    }
  }
}'
```

```bash
# Use the fine-tuned model (RFT only supports o4-mini-2025-04-16 as the base)
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "ft:o4-mini-2025-04-16:openai::BTz2REMH",
    "input": "What is 4+4?"
  }'
```

## Notes

- This is an OpenAI LLM-evaluation/fine-tuning example; unrelated to a JS/TS test runner's `evals`.
- RFT currently supports only `o4-mini-2025-04-16` as the base model. Unlike SFT, a `grader` assigns a numeric reward instead of matching a fixed correct answer.
- Monitor `train_reward_mean` (average reward on the training batch), `valid_reward_mean` (average reward on the validation set, more stable), and `reasoning_tokens_mean` during training.
- RFT is a poor fit when the model already scores at the absolute minimum/maximum, or when qualified human experts don't agree on the correct answer.
