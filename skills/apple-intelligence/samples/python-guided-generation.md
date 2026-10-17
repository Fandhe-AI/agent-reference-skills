---
source: https://apple.github.io/python-apple-fm-sdk/guided_generation.html
---

# Python Guided Generation

Constrain output to a Python class with the `@fm.generable` decorator and `fm.guide()` constraints.

```python
import apple_fm_sdk as fm
from typing import List

@fm.generable("Product review analysis")
class ProductReview:
    sentiment: str = fm.guide("Overall sentiment", anyOf=["positive", "negative", "neutral"])
    rating: float = fm.guide("Product rating", range=(1.0, 5.0))
    keywords: List[str] = fm.guide("Key features mentioned", count=3)

async def analyze_review():
    session = fm.LanguageModelSession(instructions="You are a product review analyzer.")

    result = await session.respond(
        "This laptop is amazing! Great performance and battery life.",
        generating=ProductReview
    )
    
    print(f"Sentiment: {result.sentiment}")  # for example, "positive"
    print(f"Rating: {result.rating}")        # for example, 4.5
    print(f"Keywords: {result.keywords}")    # for example, ["performance", "battery", "laptop"]
```

```python
import apple_fm_sdk as fm
from typing import List

@fm.generable("Task item")
class Task:
    title: str = fm.guide("Task title")
    priority: str = fm.guide("Priority", anyOf=["high", "medium", "low"])
    completed: bool = fm.guide("Completion status")

@fm.generable("Task list")
class TaskList:
    tasks: List[Task] = fm.guide("List of tasks", count=3)
    total_count: int = fm.guide("Total number of tasks")

async def extract_tasks():
    session = fm.LanguageModelSession("Extract tasks from text.")

    result = await session.respond(
        "I need to: 1) Buy groceries (high priority), "
        "2) Call dentist (medium), 3) Read book (low)",
        generating=TaskList,
    )

    for task in result.tasks:
        print(f"- {task.title} [{task.priority}]")
```

```python
import apple_fm_sdk as fm
from typing import Optional

async def safe_guided_generation(prompt: str, MyGenerable: Optional[type] = None):
    try:
        if MyGenerable:
            return await fm.LanguageModelSession().respond(
                prompt, generating=MyGenerable
            )
        else:
            return await fm.LanguageModelSession().respond(prompt)
    except fm.InvalidGenerationSchemaError as e:
        print(f"Schema error: {e}")
    except fm.UnsupportedGuideError as e:
        print(f"Unsupported constraint: {e}")
    except Exception as e:
        print(f"Generation error: {e}")
```

## Notes

- Swift equivalent: `Generable` and `GenerationSchema`, see `../references/structured-output/generable.md` and `../references/structured-output/generation-schema.md`.
- Only classes decorated with `@generable` can be passed as `generating=`; the decorator applies Python dataclasses, so the class must be dataclass-compatible.
- Supported `fm.guide()` constraints shown in the docs: `anyOf`, `range`, `count`, and `regex`. `SystemLanguageModel` only supports simple regex patterns such as `\d+` or `\w+`.
- A Swift-exported schema can be used with `session.respond(prompt, json_schema=swift_schema)`.
- Package `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`).
