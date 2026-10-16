# Guide: Browser Use Agent on a Daily Schedule

Run a Browser Use agent inside a box (agent, browser, and output files in one box) and schedule it with cron. The example reads Hacker News every morning and saves a report.

## Signature / Usage

```python
import os
from upstash_box import Box

box = Box.create(
    runtime="python",
    browser=True,
    env={"ANTHROPIC_API_KEY": os.environ["ANTHROPIC_API_KEY"]},
)

def run(command):
    result = box.exec.command(command)
    if result.status != "completed":
        raise RuntimeError(result.result)

run("pip install browser-use")
box.files.write(path="agent.py", content=open("agent.py").read())
run("python3 agent.py")

# Run it every day at 08:00 UTC
box.schedule.exec(
    cron="0 8 * * *",
    command=["python3", "/workspace/home/agent.py"],
)
```

In-box agent (`agent.py`):

```python
from browser_use import Agent, Browser, ChatAnthropic

agent = Agent(
    task=TASK,
    llm=ChatAnthropic(model="claude-sonnet-4-5"),
    browser=Browser(
        executable_path="/usr/bin/chromium",
        headless=True,
        chromium_sandbox=False,
    ),
)
history = await agent.run(max_steps=15)
```

## Notes

- Needs a Box API key (`UPSTASH_BOX_API_KEY`) and an Anthropic API key; `pip install upstash-box`
- The agent writes reports to `/workspace/home/reports/<UTC date-time>.md`; read them later with `Box.get("<box-id>")` and `box.files.list("reports")`
- The box pauses when idle; each scheduled run wakes it and reports stay on the box
- Run `setup.py` once: each run creates a new box with its own daily schedule
- Delete the box with `box.delete()` when no longer needed

## Related

- [Schedules](./schedules.md)
- [Browser Overview](./browser-overview.md)
- [Browser Connect](./browser-connect.md)
