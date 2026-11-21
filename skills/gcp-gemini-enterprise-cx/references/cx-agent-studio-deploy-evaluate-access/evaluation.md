---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/evaluation
---

# Evaluate a CX Agent Studio agent

Evaluation automates testing, catches regressions after changes, and measures the quality of agent responses. Start by clicking the **Evaluate** button at the top of the agent builder. There are three test case types (scenario, simulation, golden), run in evaluation runs that produce per-test-case results.

## Signature / Usage

### Concepts

- **Test case**: a self-contained test scenario. Types: **Scenario** (AI-generated conversations from a user goal, useful to define golden conversations), **Simulation** (ordered list of goals, also called milestones; the simulated user moves on only after the current goal's success criteria are met), **Golden** (an ideal conversation path for regression testing, including tool calls).
- **Run**: one complete execution of a set of golden, scenario, and simulation test cases against the agent. A run can include one or more test cases.
- **Result**: a single execution of a test case in a run (a test case run several times in one run gives several results).
- **Tags**: group test cases.

### Scenario

Click **Create scenario**; multiple scenarios are suggested, or create one from scratch. To keep a scenario, select it, open the menu in the top right corner, and choose **Save as golden conversation**. Each scenario has a user goal, for example:

```text
Securely book a specific room at a chosen hotel and receive a confirmation.
```

Expectations are of type **Message** (an expected agent response) or **Tool call** (a tool call with expected inputs and outputs), with conditions Must have, Must not have, After tool call, Variable value.

### Simulation

A simulation sits between a scenario (one open-ended goal) and a golden test case (every user turn pinned). Use it when the journey has several stages in a fixed order, when you must confirm an intermediate state (such as verifying a caller) first, or when a golden is too rigid but a single-goal scenario doesn't exercise the whole path.

Each step is one of: **User goal** (the simulated user generates utterances until the success criteria are met; fields **User goal**, **Success criteria**, **Max turns to achieve** with a default of 3, optional **User information** visible only to the simulated user), **Static utterance** (the simulated user sends exactly your text), or **Event** (sends a named event, such as a telephony event). Static utterance and event steps are labeled **Turn** and can have success criteria but no **Max turns to achieve** or **User information**. Write success criteria as observable agent behavior.

How a simulation runs: the simulated user works on the current step only; after each agent response the step is assessed against its criteria and, if met, marked completed and never re-opened; if a step isn't completed within its **Max turns to achieve**, the simulation stops and later steps are never attempted. The whole conversation is capped at 100 turns (the same limit as any simulated conversation). A simulation passes only if every step is completed, in addition to the other pass or fail criteria. Results show `Goals (2/3)`-style counts with a **Justification** per step.

The simulation editor has a **UI** tab and a **YAML** tab. Before you load the YAML below, declare `product_id` as a variable of the agent application: every key in `session_parameters` must be a variable declared in the agent application (see the validation rules below). The CX Agent Studio quickstart creates a variable this way: "Click the variables button on the right side of the agent builder", "Click **Create a variable** or **+**", type the variable name (here `product_id`), and "Click **Create**" (the quickstart leaves the type as **Text**; the quick-create-agent and variable pages in this skill cover the quickstart and variables):

```yaml
evals:
  - name: "billing_refund_request"
    tags:
      - "billing"
    session_parameters:
      product_id: "prod_123"
    steps:
      - goal: "Greet the agent and ask for a refund for product_id."
        success_criteria: "Agent asks for the reason for the refund."
        max_turns: 3
      - goal: "Provide the reason and insist on the refund."
        success_criteria: "Agent agrees to process the refund or escalates."
      - static_utterance: "I want to check my balance."
```

The mapping of YAML keys to console fields is in the table below. YAML validation rules: the document must contain an `evals` list and only the first entry is read; each entry needs a `name` and at least one step; every step needs at least one of `goal`, `static_utterance`, or `event`; every key in `session_parameters` must be a variable declared in the agent application; every string in `expectations` must be the prompt text of an existing expectation (case and surrounding whitespace ignored); unrecognized keys in an `evals` entry are rejected.

### Golden

Create from the simulator (**Save as golden**), from conversation history (search by conversation ID; if redaction is enabled, check responses and variables), from scratch (**Display name**, **+ Add user input**, **+ Add agent expectation**, **+ Add turn**), from a scenario result (**Save as golden conversation**), or by batch upload (CSV format on the golden test cases CSV format page). Expectation types: **Message** (semantic match), **Tool call** (optionally expected input arguments), **Agent Handoff** (transfer to a human agent or another bot). In stable replay mode, expected variables and tool responses inject context; in naive replay mode they have no effect.

### Settings, runs, import and export

- Goldens: pass/fail criteria at turn level (semantic similarity threshold, tool correctness threshold, hallucinations on or off) and expectation level (tool correctness threshold), golden run method (naive or stable replay), tool fake (mocked data instead of real production API calls).
- Scenarios: pass/fail criteria, conversation initiator (user or model), tool fake. Also audio evaluation recordings.
- Run by the run button on a row or by selecting several test cases; pick a saved version or auto-save the draft as a new version for the run. Detailed results show failed turns and a paginated list of turns with actual and expected responses.
- Export test cases or runs as YAML or JSON in a zip file; on import, the receiving agent must contain all resources (tools, variables, sub-agents) in the exported data.
- Personas (simulated user personas for scenario and simulation test cases, text and audio): **Persona management**, **+ Add persona** with **Name**, **User personality**, **User context**. Without a persona, a random one is chosen per scenario result.

### Use AI to improve test cases (Preview)

Preview, subject to the "Pre-GA Offerings Terms". Only agent applications with a single agent are supported. AI suggestions are optimal when the run count is 3 or more. Check **Find issues with AI** when running; Gemini generates a downloadable `loss_report`. Any user can view suggested fixes, but only the person who initiated the run can act on them; **Ask Gemini** opens the helper agent.

## Options / Props

### Simulation YAML keys

| YAML key | Console field |
|---|---|
| `name` | Test case name |
| `tags` | Tags |
| `session_parameters` | Variable Override |
| `goal` | User goal |
| `success_criteria` | Success criteria |
| `max_turns` | Max turns to achieve |
| `response_guide` | User information |
| `static_utterance` | Static utterance step |
| `event` | Event step |
| `expectations` | Expectations |

## Notes

### Metrics

- Tool correctness: golden, scenario, simulation. Percentage of expected parameters matched; a missed tool call scores 0, a call with no input parameters scores 1 if present. An unexpected tool call in a golden evaluation fails the result but doesn't change the value.
- User goal satisfaction: scenario, simulation. Binary (0 no, 1 yes); score is -1 if the `user_goal` has no explicit or implied goal. A simulation is judged against the **Test case name**.
- Goal completion: simulations only; each step reported as completed or not, with a justification.
- Hallucinations: golden and scenario. Computed per generated turn and only for turns containing tool calls (0 no, 1 yes); may return N/A; doesn't detect hallucinations within tool calls.
- Semantic match: golden only, turn level, values from 0 (completely inconsistent or contradictory) to 4 (fully consistent).
- Scenario expectations: scenario, simulation. Tool call expectations score 0 or 1 and don't penalize unexpected calls; when a tool call input expectation is met, the call is intercepted and replaced with a mock return value at runtime. Agent response expectations check that any agent response contains an expected string.
- Task completion: scenario, simulation. `User_Goal_Satisfied AND no_hallucinations_detected AND Expectations Satisfied` (plus every step completed for simulations); it is the overall pass or fail status of the result.

### Best practices

- Create dedicated test cases for each agent variant (voice and chat, SMS and chat SDK, brands) and cross-variant instruction leakage checks; run each case against the right deployment (a deployment encapsulates modality, model and channel); for builder-defined variable conditionals, inject the variable value when running the case.
- When using a coding agent to iterate on the agent, have it reconcile conflicting suggestions, flag tricky conflicts for human review, produce side-by-side diffs, and validate results against real transcripts.
- The source also shows Console click-paths for each step, not repeated here.
- The evaluation page requires `session_parameters` keys to be declared variables but gives no steps to declare one; the steps before the simulation YAML are quoted from the CX Agent Studio quickstart, which creates a **Text** variable named `username`. Which variable type `product_id` needs is not stated in the official docs.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/evaluation (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/create-agent (steps to create a variable; retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [version.md](./version.md)
- [deploy.md](./deploy.md)
- [access-control.md](./access-control.md)
