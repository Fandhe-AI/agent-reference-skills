<!-- source: https://code.claude.com/docs/en/agent-sdk/python / last verified: 2026-08-07 -->

# Agent SDK reference - Python

Complete API reference for the Python Agent SDK: functions, classes, and types.

## Installation

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install claude-agent-sdk
```

On recent Debian, Ubuntu, and Homebrew Python installs, `pip install` against system Python fails with `error: externally-managed-environment` — use a virtual environment as above.

## Choosing between `query()` and `ClaudeSDKClient`

| Feature | `query()` | `ClaudeSDKClient` |
|---|---|---|
| Session | Creates a new session by default | Reuses same session |
| Conversation | Single exchange | Multiple exchanges in same context |
| Connection | Managed automatically | Manual control |
| Streaming Input | Supported | Supported |
| Interrupts | Not supported | Supported |
| Hooks | Supported | Supported |
| Custom Tools | Supported | Supported |
| Continue Chat | Manual via `continue_conversation` or `resume` | Automatic |
| Use Case | One-off tasks | Continuous conversations |

Use `query()` for one-off questions, independent tasks, simple automation, or a fresh start each time. Use `ClaudeSDKClient` for continuing conversations, follow-up questions, interactive applications (chat/REPL), response-driven logic, and explicit session lifecycle control.

## Functions

Signature blocks and bare `async for`/`async with` fragments below are illustrative — wrap the body in `async def main(): ...` and call `asyncio.run(main())` to run them.

### `query()`

Creates a new session for each interaction by default. Returns an async iterator that yields messages as they arrive. Each call starts fresh with no memory of previous interactions unless you pass `continue_conversation=True` or `resume` in `ClaudeAgentOptions`.

```python
async def query(
    *,
    prompt: str | AsyncIterable[dict[str, Any]],
    options: ClaudeAgentOptions | None = None,
    transport: Transport | None = None
) -> AsyncIterator[Message]
```

| Parameter | Type | Description |
|---|---|---|
| `prompt` | `str \| AsyncIterable[dict]` | The input prompt as a string or async iterable for streaming mode |
| `options` | `ClaudeAgentOptions \| None` | Optional configuration object (defaults to `ClaudeAgentOptions()` if `None`) |
| `transport` | `Transport \| None` | Optional custom transport for communicating with the CLI process |

Returns an `AsyncIterator[Message]`.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    options = ClaudeAgentOptions(
        system_prompt="You are an expert Python developer",
        permission_mode="acceptEdits",
    )
    async for message in query(prompt="Create a Python web server", options=options):
        print(message)

asyncio.run(main())
```

### `tool()`

Decorator for defining MCP tools with type safety.

```python
def tool(
    name: str,
    description: str,
    input_schema: type | dict[str, Any],
    annotations: ToolAnnotations | None = None
) -> Callable[[Callable[[Any], Awaitable[dict[str, Any]]]], SdkMcpTool[Any]]
```

| Parameter | Type | Description |
|---|---|---|
| `name` | `str` | Unique identifier for the tool |
| `description` | `str` | Human-readable description of what the tool does |
| `input_schema` | `type \| dict[str, Any]` | Schema for the tool's input parameters (simple type mapping, e.g. `{"text": str}`, or full JSON Schema) |
| `annotations` | `ToolAnnotations \| None` | Optional MCP tool annotations providing behavioral hints to clients |

Returns a decorator that wraps the tool implementation into an `SdkMcpTool` instance.

```python
from claude_agent_sdk import tool
from typing import Any

@tool("greet", "Greet a user", {"name": str})
async def greet(args: dict[str, Any]) -> dict[str, Any]:
    return {"content": [{"type": "text", "text": f"Hello, {args['name']}!"}]}
```

`ToolAnnotations` is re-exported from `mcp.types` (also `from claude_agent_sdk import ToolAnnotations`); all fields are optional hints and clients should not rely on them for security decisions:

| Field | Type | Default | Description |
|---|---|---|---|
| `title` | `str \| None` | `None` | Human-readable title for the tool |
| `readOnlyHint` | `bool \| None` | `False` | If `True`, the tool does not modify its environment |
| `destructiveHint` | `bool \| None` | `True` | If `True`, may perform destructive updates (only meaningful when `readOnlyHint` is `False`) |
| `idempotentHint` | `bool \| None` | `False` | If `True`, repeated calls with the same arguments have no additional effect |
| `openWorldHint` | `bool \| None` | `True` | If `True`, the tool interacts with external entities; `False` for a closed domain |

### `create_sdk_mcp_server()`

Creates an in-process MCP server that runs within your Python application.

```python
def create_sdk_mcp_server(
    name: str,
    version: str = "1.0.0",
    tools: list[SdkMcpTool[Any]] | None = None
) -> McpSdkServerConfig
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name` | `str` | — | Unique identifier for the server |
| `version` | `str` | `"1.0.0"` | Server version string |
| `tools` | `list[SdkMcpTool[Any]] \| None` | `None` | List of tool functions created with `@tool` |

Returns an `McpSdkServerConfig` passable to `ClaudeAgentOptions.mcp_servers`.

```python
from claude_agent_sdk import tool, create_sdk_mcp_server, ClaudeAgentOptions

@tool("add", "Add two numbers", {"a": float, "b": float})
async def add(args):
    return {"content": [{"type": "text", "text": f"Sum: {args['a'] + args['b']}"}]}

calculator = create_sdk_mcp_server(name="calculator", version="2.0.0", tools=[add])

options = ClaudeAgentOptions(
    mcp_servers={"calc": calculator},
    allowed_tools=["mcp__calc__add"],
)
```

### `list_sessions()`

Lists past sessions with metadata. Synchronous.

```python
def list_sessions(
    directory: str | None = None,
    limit: int | None = None,
    offset: int = 0,
    include_worktrees: bool = True
) -> list[SDKSessionInfo]
```

Returns a list of `SDKSessionInfo`: `session_id`, `summary`, `last_modified` (ms epoch), `file_size`, `custom_title`, `first_prompt`, `git_branch`, `cwd`, `tag`, `created_at`.

```python
from claude_agent_sdk import list_sessions

for session in list_sessions(directory="/path/to/project", limit=10):
    print(f"{session.summary} ({session.session_id})")
```

### `get_session_messages()`

Retrieves messages from a past session. Synchronous.

```python
def get_session_messages(
    session_id: str,
    directory: str | None = None,
    limit: int | None = None,
    offset: int = 0
) -> list[SessionMessage]
```

`SessionMessage`: `type` (`"user" | "assistant"`), `uuid`, `session_id`, `message` (raw content), `parent_tool_use_id` (reserved).

### `get_session_info()`

Reads metadata for a single session by ID without scanning the full project directory. Synchronous.

```python
def get_session_info(
    session_id: str,
    directory: str | None = None,
) -> SDKSessionInfo | None
```

### `rename_session()`

Renames a session by appending a custom-title entry. Synchronous.

```python
def rename_session(session_id: str, title: str, directory: str | None = None) -> None
```

Raises `ValueError` if `session_id` is not a valid UUID or `title` is empty; `FileNotFoundError` if the session cannot be found.

### `tag_session()`

Tags a session; pass `None` to clear. Synchronous.

```python
def tag_session(session_id: str, tag: str | None, directory: str | None = None) -> None
```

Raises `ValueError` if `session_id` is not a valid UUID or `tag` is empty after sanitization; `FileNotFoundError` if the session cannot be found.

## Classes

### `ClaudeSDKClient`

Maintains a conversation session across multiple exchanges — the Python equivalent of how the TypeScript `query()` continues conversations internally.

```python
class ClaudeSDKClient:
    def __init__(self, options: ClaudeAgentOptions | None = None, transport: Transport | None = None)
    async def connect(self, prompt: str | AsyncIterable[dict] | None = None) -> None
    async def query(self, prompt: str | AsyncIterable[dict], session_id: str = "default") -> None
    async def receive_messages(self) -> AsyncIterator[Message]
    async def receive_response(self) -> AsyncIterator[Message]
    async def interrupt(self) -> None
    async def set_permission_mode(self, mode: str) -> None
    async def set_model(self, model: str | None = None) -> None
    async def rewind_files(self, user_message_id: str) -> None
    async def get_mcp_status(self) -> McpStatusResponse
    async def reconnect_mcp_server(self, server_name: str) -> None
    async def toggle_mcp_server(self, server_name: str, enabled: bool) -> None
    async def stop_task(self, task_id: str) -> None
    async def get_server_info(self) -> dict[str, Any] | None
    async def disconnect(self) -> None
```

| Method | Description |
|---|---|
| `connect(prompt)` | Connect with an optional initial prompt or message stream |
| `query(prompt, session_id)` | Send a new request in streaming mode |
| `receive_messages()` | Receive all messages as an async iterator |
| `receive_response()` | Receive messages until and including a `ResultMessage` |
| `interrupt()` | Send interrupt signal (streaming mode only) |
| `set_permission_mode(mode)` | Change permission mode for the current session |
| `set_model(model)` | Change the model; pass `None` to reset to default |
| `rewind_files(user_message_id)` | Restore files to their state at the given user message. Requires `enable_file_checkpointing=True` |
| `get_mcp_status()` | Status of all configured MCP servers (`McpStatusResponse`) |
| `reconnect_mcp_server(server_name)` | Retry connecting to a failed/disconnected MCP server |
| `toggle_mcp_server(server_name, enabled)` | Enable/disable an MCP server mid-session; disabling removes its tools |
| `stop_task(task_id)` | Stop a running background task; a `TaskNotificationMessage` with status `"stopped"` follows |
| `get_server_info()` | Server info including session ID and capabilities |
| `disconnect()` | Disconnect from Claude |

Usable as an async context manager for automatic connection management. When iterating over messages, avoid `break` to exit early — it can cause asyncio cleanup issues; let iteration complete naturally or use flags instead.

```python
import asyncio
from claude_agent_sdk import ClaudeSDKClient

async def main():
    async with ClaudeSDKClient() as client:
        await client.query("Hello Claude")
        async for message in client.receive_response():
            print(message)

asyncio.run(main())
```

Multiple `query()` calls on the same client retain conversation context (each followed by draining `receive_response()`). Streaming input is supported by passing an async generator to `query()`. `interrupt()` sends a stop signal but does not clear the message buffer — messages already produced by the interrupted task, including its `ResultMessage`, remain in the stream and must be drained with `receive_response()` before reading the response to a new query.

Advanced permission control uses `can_use_tool` in `ClaudeAgentOptions`:

```python
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions
from claude_agent_sdk.types import PermissionResultAllow, PermissionResultDeny, ToolPermissionContext

async def custom_permission_handler(
    tool_name: str, input_data: dict, context: ToolPermissionContext
) -> PermissionResultAllow | PermissionResultDeny:
    if tool_name == "Write" and input_data.get("file_path", "").startswith("/system/"):
        return PermissionResultDeny(message="System directory write not allowed", interrupt=True)
    return PermissionResultAllow(updated_input=input_data)

options = ClaudeAgentOptions(can_use_tool=custom_permission_handler)
```

## Types

`@dataclass` classes (e.g. `ResultMessage`, `AgentDefinition`, `TextBlock`) are object instances at runtime with attribute access (`msg.result`). `TypedDict` classes (e.g. `ThinkingConfigEnabled`, `McpStdioServerConfig`, `SyncHookJSONOutput`) are plain dicts at runtime and require key access (`config["budget_tokens"]`, not `config.budget_tokens`). The `ClassName(field=value)` call syntax works for both, but only dataclasses produce objects with attributes.

### `SdkMcpTool`

```python
@dataclass
class SdkMcpTool(Generic[T]):
    name: str
    description: str
    input_schema: type[T] | dict[str, Any]
    handler: Callable[[T], Awaitable[dict[str, Any]]]
    annotations: ToolAnnotations | None = None
```

### `Transport`

Abstract base class for custom transport implementations (e.g. a remote connection instead of a local subprocess). Low-level internal API; the interface may change in future releases.

```python
class Transport(ABC):
    @abstractmethod
    async def connect(self) -> None: ...
    @abstractmethod
    async def write(self, data: str) -> None: ...
    @abstractmethod
    def read_messages(self) -> AsyncIterator[dict[str, Any]]: ...
    @abstractmethod
    async def close(self) -> None: ...
    @abstractmethod
    def is_ready(self) -> bool: ...
    @abstractmethod
    async def end_input(self) -> None: ...
```

Import: `from claude_agent_sdk import Transport`.

### `ClaudeAgentOptions`

Configuration dataclass for Claude Code queries.

```python
@dataclass
class ClaudeAgentOptions:
    tools: list[str] | ToolsPreset | None = None
    allowed_tools: list[str] = field(default_factory=list)
    system_prompt: str | SystemPromptPreset | SystemPromptFile | None = None
    mcp_servers: dict[str, McpServerConfig] | str | Path = field(default_factory=dict)
    strict_mcp_config: bool = False
    permission_mode: PermissionMode | None = None
    continue_conversation: bool = False
    resume: str | None = None
    session_id: str | None = None
    max_turns: int | None = None
    max_budget_usd: float | None = None
    disallowed_tools: list[str] = field(default_factory=list)
    model: str | None = None
    fallback_model: str | None = None
    betas: list[SdkBeta] = field(default_factory=list)
    output_format: dict[str, Any] | None = None
    permission_prompt_tool_name: str | None = None
    cwd: str | Path | None = None
    cli_path: str | Path | None = None
    settings: str | None = None
    add_dirs: list[str | Path] = field(default_factory=list)
    env: dict[str, str] = field(default_factory=dict)
    extra_args: dict[str, str | None] = field(default_factory=dict)
    max_buffer_size: int | None = None
    stderr: Callable[[str], None] | None = None
    can_use_tool: CanUseTool | None = None
    hooks: dict[HookEvent, list[HookMatcher]] | None = None
    user: str | None = None
    include_partial_messages: bool = False
    include_hook_events: bool = False
    fork_session: bool = False
    agents: dict[str, AgentDefinition] | None = None
    setting_sources: list[SettingSource] | None = None
    skills: list[str] | Literal["all"] | None = None
    sandbox: SandboxSettings | None = None
    plugins: list[SdkPluginConfig] = field(default_factory=list)
    thinking: ThinkingConfig | None = None
    effort: EffortLevel | None = None
    enable_file_checkpointing: bool = False
    session_store: SessionStore | None = None
    session_store_flush: SessionStoreFlushMode = "batched"
    load_timeout_ms: int = 60_000
    task_budget: TaskBudget | None = None
```

| Property | Type | Default | Description |
|---|---|---|---|
| `tools` | `list[str] \| ToolsPreset \| None` | `None` | Tools configuration. `{"type": "preset", "preset": "claude_code"}` for Claude Code's default tools |
| `allowed_tools` | `list[str]` | `[]` | Tools to auto-approve without prompting. Does not restrict Claude to only these tools; unlisted tools fall through to `permission_mode`/`can_use_tool`. Use `disallowed_tools` to block |
| `system_prompt` | `str \| SystemPromptPreset \| SystemPromptFile \| None` | `None` | Custom string, `{"type": "preset", "preset": "claude_code"}` with optional `"append"`, or `{"type": "file", "path": "..."}` |
| `mcp_servers` | `dict[str, McpServerConfig] \| str \| Path` | `{}` | MCP server configs or path to config file |
| `strict_mcp_config` | `bool` | `False` | When `True`, use only servers passed in `mcp_servers`; ignore project `.mcp.json`, user settings, plugin-provided servers, and claude.ai connectors |
| `permission_mode` | `PermissionMode \| None` | `None` | Permission mode for tool usage |
| `continue_conversation` | `bool` | `False` | Continue the most recent conversation |
| `resume` | `str \| None` | `None` | Session ID to resume |
| `session_id` | `str \| None` | `None` | Specific UUID session ID. Can't combine with `continue_conversation`/`resume` unless `fork_session` is also set |
| `max_turns` | `int \| None` | `None` | Maximum agentic turns (tool-use round trips) |
| `max_budget_usd` | `float \| None` | `None` | Stop the query when the client-side cost estimate reaches this USD value |
| `disallowed_tools` | `list[str]` | `[]` | Tools to deny. A bare name removes the tool from context; a scoped rule (e.g. `"Bash(rm *)"`) denies matching calls in every mode including `bypassPermissions` |
| `enable_file_checkpointing` | `bool` | `False` | Enable file change tracking for rewinding |
| `model` | `str \| None` | `None` | Claude model alias or full model name |
| `fallback_model` | `str \| None` | `None` | Fallback model if the primary model fails |
| `betas` | `list[SdkBeta]` | `[]` | Beta features to enable |
| `output_format` | `dict[str, Any] \| None` | `None` | Structured response format, e.g. `{"type": "json_schema", "schema": {...}}` |
| `permission_prompt_tool_name` | `str \| None` | `None` | MCP tool name for permission prompts |
| `cwd` | `str \| Path \| None` | `None` | Current working directory |
| `cli_path` | `str \| Path \| None` | `None` | Custom path to the Claude Code CLI executable |
| `settings` | `str \| None` | `None` | Path to settings file |
| `add_dirs` | `list[str \| Path]` | `[]` | Additional directories Claude can access |
| `env` | `dict[str, str]` | `{}` | Environment variables merged on top of the inherited process environment |
| `extra_args` | `dict[str, str \| None]` | `{}` | Additional CLI arguments passed directly |
| `max_buffer_size` | `int \| None` | `None` | Maximum bytes when buffering CLI stdout |
| `stderr` | `Callable[[str], None] \| None` | `None` | Callback for stderr output from CLI |
| `can_use_tool` | `CanUseTool \| None` | `None` | Tool permission callback, invoked only when the permission flow falls through to a prompt. Not invoked for calls auto-approved by `allowed_tools`, allow rules, or `permission_mode`. `AskUserQuestion`, connector tools set to `ask`, and MCP tools marked `requiresUserInteraction` reach it even if allowed; in `dontAsk` mode these are denied instead |
| `hooks` | `dict[HookEvent, list[HookMatcher]] \| None` | `None` | Hook configurations for intercepting events |
| `user` | `str \| None` | `None` | User identifier |
| `include_partial_messages` | `bool` | `False` | Include partial message streaming events (`StreamEvent`) |
| `include_hook_events` | `bool` | `False` | Include hook lifecycle events as `HookEventMessage` objects |
| `fork_session` | `bool` | `False` | When resuming with `resume`, fork to a new session ID instead of continuing the original |
| `agents` | `dict[str, AgentDefinition] \| None` | `None` | Programmatically defined subagents |
| `plugins` | `list[SdkPluginConfig]` | `[]` | Load custom plugins from local paths |
| `sandbox` | `SandboxSettings \| None` | `None` | Configure sandbox behavior programmatically |
| `setting_sources` | `list[SettingSource] \| None` | `None` (CLI defaults: all sources) | Which filesystem settings to load. `[]` disables user/project/local settings; endpoint-managed policy still loads |
| `skills` | `list[str] \| Literal["all"] \| None` | `None` | Skills available to the session. `"all"` enables every discovered skill. Exact names only — malformed/wildcard names raise `ValueError` before starting the process. Adds the Skill tool to `allowed_tools` automatically |
| `thinking` | `ThinkingConfig \| None` | `None` | Controls extended thinking behavior |
| `effort` | `EffortLevel \| None` | `None` | Effort level for thinking depth |
| `session_store` | `SessionStore \| None` | `None` | Mirror session transcripts to an external backend so any host can resume them |
| `session_store_flush` | `Literal["batched", "eager"]` | `"batched"` | When to flush mirrored transcript entries. `"batched"` flushes once per turn or when the buffer fills; `"eager"` flushes in the background after every frame. Ignored when `session_store` is `None` |
| `load_timeout_ms` | `int` | `60000` | Per-call timeout for `session_store.load()` / `list_subkeys()` during resume materialization |
| `task_budget` | `TaskBudget \| None` | `None` | API-side token budget. Sent as `output_config.task_budget` with the `task-budgets-2026-03-13` beta header. Pass `{"total": <int>}` |

`AgentDefinition` field names use camelCase (`disallowedTools`, `permissionMode`, `maxTurns`) to match the wire format shared with TypeScript, differing from `ClaudeAgentOptions`'s Python snake_case (`disallowed_tools`, `permission_mode`). Passing a snake_case keyword to `AgentDefinition` raises `TypeError` at construction.

#### Handle slow or stalled API responses

```python
from claude_agent_sdk import ClaudeAgentOptions

options = ClaudeAgentOptions(
    env={
        "API_TIMEOUT_MS": "120000",
        "CLAUDE_CODE_MAX_RETRIES": "2",
        "CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS": "120000",
    },
)
```

- `API_TIMEOUT_MS`: per-request timeout, default `600000`ms.
- `CLAUDE_CODE_MAX_RETRIES`: max API retries, default `10`, capped at `15`. Set `CLAUDE_CODE_RETRY_WATCHDOG=1` for unattended runs to retry capacity errors indefinitely.
- `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS`: stall watchdog for `run_in_background` subagents, default `600000`ms.
- `CLAUDE_ENABLE_STREAM_WATCHDOG` / `CLAUDE_STREAM_IDLE_TIMEOUT_MS`: aborts a request when headers arrived but the body stopped streaming; on by default, `CLAUDE_STREAM_IDLE_TIMEOUT_MS` defaults to `300000`ms.

### `SystemPromptPreset`

```python
class SystemPromptPreset(TypedDict):
    type: Literal["preset"]
    preset: Literal["claude_code"]
    append: NotRequired[str]
    exclude_dynamic_sections: NotRequired[bool]
```

`exclude_dynamic_sections` moves per-session context (working directory, git-repo flag, auto-memory paths) into the first user message instead of the system prompt, improving prompt-cache reuse across users/machines.

### `SystemPromptFile`

Loads a custom system prompt from disk instead of a string, mapped to the CLI `--system-prompt-file` flag. Use this for large prompts: the string form is passed on the subprocess argv and is subject to OS command-line length limits (roughly 128 KB on Linux, roughly 32 KB total on Windows).

```python
class SystemPromptFile(TypedDict):
    type: Literal["file"]
    path: str
```

### `SettingSource`

```python
SettingSource = Literal["user", "project", "local"]
```

| Value | Description | Location |
|---|---|---|
| `"user"` | Global user settings | `~/.claude/settings.json` |
| `"project"` | Shared project settings (version controlled) | `.claude/settings.json` |
| `"local"` | Local project settings, gitignored | `.claude/settings.local.json` |

When `setting_sources` is omitted or `None`, `query()` loads the same filesystem settings as the CLI (user, project, local). Endpoint-managed policy always loads; server-managed settings load when the session authenticates with an organization credential on an eligible configuration. In Python SDK 0.1.59 and earlier, `setting_sources=[]` was treated the same as omitting the option (bug fixed in later releases; TypeScript is unaffected). Settings precedence (highest to lowest): local, project, user. Programmatic options such as `agents` and `allowed_tools` override filesystem settings; managed policy settings override programmatic options.

### `AgentDefinition`

```python
@dataclass
class AgentDefinition:
    description: str
    prompt: str
    tools: list[str] | None = None
    disallowedTools: list[str] | None = None
    model: str | None = None
    skills: list[str] | None = None
    memory: Literal["user", "project", "local"] | None = None
    mcpServers: list[str | dict[str, Any]] | None = None
    initialPrompt: str | None = None
    maxTurns: int | None = None
    background: bool | None = None
    effort: EffortLevel | int | None = None
    permissionMode: PermissionMode | None = None
```

| Field | Required | Description |
|---|---|---|
| `description` | Yes | Natural language description of when to use this agent |
| `prompt` | Yes | The agent's system prompt |
| `tools` | No | Allowed tool names; if omitted, inherits every tool available to subagents |
| `disallowedTools` | No | Tool names to remove. MCP server-level patterns accepted: `mcp__server`, `mcp__server__*`, `mcp__*` |
| `model` | No | `"sonnet"` / `"opus"` / `"haiku"` / `"inherit"` alias, or full model ID |
| `skills` | No | Skill names preloaded into the agent's context at startup |
| `memory` | No | Memory source: `"user"`, `"project"`, or `"local"` |
| `mcpServers` | No | MCP servers available to this agent: a server name or an inline `{name: config}` dict |
| `initialPrompt` | No | Auto-submitted as the first user turn when this agent runs as the main thread agent |
| `maxTurns` | No | Maximum agentic turns before stopping |
| `background` | No | Run as a non-blocking background task when invoked |
| `effort` | No | Reasoning effort: named level or integer |
| `permissionMode` | No | Permission mode for tool execution within this agent |

### `PermissionMode`

```python
PermissionMode = Literal[
    "default",           # Standard permission behavior
    "acceptEdits",        # Auto-accept file edits
    "plan",                # Planning mode - explore without editing
    "dontAsk",             # Deny anything not pre-approved instead of prompting
    "bypassPermissions",   # Bypass permission checks; explicit ask rules still prompt
    "auto",                 # Model classifier approves or denies permission prompts
]
```

### `EffortLevel`

```python
EffortLevel = Literal["low", "medium", "high", "xhigh", "max"]
```

`"xhigh"` falls back to `"high"` on models that don't support it.

### `CanUseTool`

```python
CanUseTool = Callable[
    [str, dict[str, Any], ToolPermissionContext], Awaitable[PermissionResult]
]
```

The callback is the SDK replacement for the interactive permission prompt: invoked only when the permission evaluation flow resolves to a prompt. Tool calls already approved by `allowed_tools`, a settings allow rule, or the permission mode (e.g. `acceptEdits`, `bypassPermissions`) never invoke it. To gate every tool call, use a `PreToolUse` hook instead. `AskUserQuestion`, MCP tools marked `requiresUserInteraction`, and connector tools your organization set to `ask` reach the callback even when an allow rule matches; in `dontAsk` mode these calls are denied instead.

### `ToolPermissionContext`

```python
@dataclass
class ToolPermissionContext:
    signal: Any | None = None
    suggestions: list[PermissionUpdate] = field(default_factory=list)
    tool_use_id: str | None = None
    agent_id: str | None = None
    blocked_path: str | None = None
    decision_reason: str | None = None
    title: str | None = None
    display_name: str | None = None
    description: str | None = None
```

| Field | Description |
|---|---|
| `signal` | Reserved for future abort signal support |
| `suggestions` | Permission update suggestions from the CLI. Bash prompts include a `localSettings`-destination suggestion; returning it in `updated_permissions` persists the rule to `.claude/settings.local.json` |
| `tool_use_id` | Identifier of the specific tool call; always populated |
| `agent_id` | Sub-agent ID when the call originates from a subagent; `None` for the main agent |
| `blocked_path` | File path that triggered the permission request, if applicable |
| `decision_reason` | Reason this prompt was triggered, forwarded from a PreToolUse hook's `permissionDecisionReason` when it returned `"ask"` |
| `title` | Full permission prompt sentence, e.g. `Claude wants to read foo.txt` |
| `display_name` | Short noun phrase for the tool action, e.g. `Read file` |
| `description` | Human-readable subtitle for the permission UI |

### `PermissionResult`

```python
PermissionResult = PermissionResultAllow | PermissionResultDeny
```

### `PermissionResultAllow`

```python
@dataclass
class PermissionResultAllow:
    behavior: Literal["allow"] = "allow"
    updated_input: dict[str, Any] | None = None
    updated_permissions: list[PermissionUpdate] | None = None
```

### `PermissionResultDeny`

```python
@dataclass
class PermissionResultDeny:
    behavior: Literal["deny"] = "deny"
    message: str = ""
    interrupt: bool = False
```

### `PermissionUpdate`

```python
@dataclass
class PermissionUpdate:
    type: Literal[
        "addRules", "replaceRules", "removeRules",
        "setMode", "addDirectories", "removeDirectories",
    ]
    rules: list[PermissionRuleValue] | None = None
    behavior: Literal["allow", "deny", "ask"] | None = None
    mode: PermissionMode | None = None
    directories: list[str] | None = None
    destination: (
        Literal["userSettings", "projectSettings", "localSettings", "session"] | None
    ) = None
```

### `PermissionRuleValue`

```python
@dataclass
class PermissionRuleValue:
    tool_name: str
    rule_content: str | None = None
```

### `ToolsPreset`

```python
class ToolsPreset(TypedDict):
    type: Literal["preset"]
    preset: Literal["claude_code"]
```

### `ThinkingConfig`

```python
ThinkingDisplay = Literal["summarized", "omitted"]

class ThinkingConfigAdaptive(TypedDict):
    type: Literal["adaptive"]
    display: NotRequired[ThinkingDisplay]

class ThinkingConfigEnabled(TypedDict):
    type: Literal["enabled"]
    budget_tokens: int
    display: NotRequired[ThinkingDisplay]

class ThinkingConfigDisabled(TypedDict):
    type: Literal["disabled"]

ThinkingConfig = ThinkingConfigAdaptive | ThinkingConfigEnabled | ThinkingConfigDisabled
```

| Variant | Fields | Description |
|---|---|---|
| `adaptive` | `type`, `display` | Claude adaptively decides when to think |
| `enabled` | `type`, `budget_tokens`, `display` | Thinking with a specific token budget |
| `disabled` | `type` | Disable thinking |

`display` controls whether thinking text returns `"summarized"` or `"omitted"`. On Claude Opus 4.7+, the API default is `"omitted"`; set `"summarized"` to receive content in `ThinkingBlock` outputs. Claude Code doesn't send `display` to Amazon Bedrock or Google Cloud's Agent Platform.

### `SdkBeta`

```python
SdkBeta = Literal["context-1m-2025-08-07"]
```

### Content block and message types

```python
@dataclass
class TextBlock:
    """Text content block."""
    text: str

@dataclass
class ThinkingBlock:
    """Thinking content block."""
    thinking: str
    signature: str

@dataclass
class ToolUseBlock:
    """Tool use content block."""
    id: str
    name: str
    input: dict[str, Any]

@dataclass
class ToolResultBlock:
    """Tool result content block."""
    tool_use_id: str
    content: str | list[dict[str, Any]] | None = None
    is_error: bool | None = None

ContentBlock = (
    TextBlock | ThinkingBlock | ToolUseBlock | ToolResultBlock
    | ServerToolUseBlock | ServerToolResultBlock
)

@dataclass
class UserMessage:
    """User message."""
    content: str | list[ContentBlock]
    uuid: str | None = None
    parent_tool_use_id: str | None = None
    tool_use_result: dict[str, Any] | None = None

@dataclass
class AssistantMessage:
    """Assistant message with content blocks."""
    content: list[ContentBlock]
    model: str
    parent_tool_use_id: str | None = None
    error: AssistantMessageError | None = None
    usage: dict[str, Any] | None = None
    message_id: str | None = None
    stop_reason: str | None = None
    session_id: str | None = None
    uuid: str | None = None

@dataclass
class SystemMessage:
    """System message with metadata."""
    subtype: str
    data: dict[str, Any]

@dataclass
class ResultMessage:
    """Result message with cost and usage information."""
    subtype: str
    duration_ms: int
    duration_api_ms: int
    is_error: bool
    num_turns: int
    session_id: str
    stop_reason: str | None = None
    total_cost_usd: float | None = None
    usage: dict[str, Any] | None = None
    result: str | None = None
    structured_output: Any = None
    model_usage: dict[str, ModelUsage] | None = None
    permission_denials: list[Any] | None = None
    deferred_tool_use: DeferredToolUse | None = None
    errors: list[str] | None = None
    api_error_status: int | None = None
    uuid: str | None = None
    terminal_reason: str | None = None

@dataclass
class StreamEvent:
    """Stream event for partial message updates during streaming."""
    uuid: str
    session_id: str
    event: dict[str, Any]
    parent_tool_use_id: str | None = None
```

`ResultMessage.usage` carries `cache_creation_input_tokens`/`cache_read_input_tokens` among other keys; see `../operations/cost-tracking.md` for how to read cost and usage from these fields. `ResultMessage.terminal_reason` is set to `"aborted_streaming"` or `"aborted_tools"` on an interrupted turn.

### `DeferredToolUse`

```python
@dataclass
class DeferredToolUse:
    """Tool use that was deferred by a PreToolUse hook returning "defer"."""
    id: str
    name: str
    input: dict[str, Any]
```

When a `PreToolUse` hook returns `permissionDecision: "defer"`, the run stops and the result message carries the deferred tool call here.

### `TaskBudget`

```python
class TaskBudget(TypedDict):
    """API-side task budget in tokens."""
    total: int
```

Sent as `output_config.task_budget` with the `task-budgets-2026-03-13` beta header, so the model can pace tool use and wrap up before the limit.

### MCP server configuration types

```python
McpServerConfig = (
    McpStdioServerConfig | McpSSEServerConfig | McpHttpServerConfig | McpSdkServerConfig
)

class McpStdioServerConfig(TypedDict):
    """MCP stdio server configuration."""
    type: NotRequired[Literal["stdio"]]
    command: str
    args: NotRequired[list[str]]
    env: NotRequired[dict[str, str]]

class McpSSEServerConfig(TypedDict):
    """MCP SSE server configuration."""
    type: Literal["sse"]
    url: str
    headers: NotRequired[dict[str, str]]

class McpHttpServerConfig(TypedDict):
    """MCP HTTP server configuration."""
    type: Literal["http"]
    url: str
    headers: NotRequired[dict[str, str]]
```

### `McpStatusResponse`

```python
class McpStatusResponse(TypedDict):
    """Response from ClaudeSDKClient.get_mcp_status(). Wraps the list of
    server statuses under the mcpServers key, matching the wire-format
    response shape."""
    mcpServers: list[McpServerStatus]
```

### `SandboxSettings`

Controls how Claude Code sandboxes bash commands for filesystem and network isolation. Filesystem and network *restrictions* are configured via permission rules, not via these settings: filesystem read restrictions use Read deny rules, write restrictions use Edit allow/deny rules, and network restrictions use WebFetch allow/deny rules.

```python
class SandboxSettings(TypedDict, total=False):
    enabled: bool                          # default False; macOS/Linux only
    autoAllowBashIfSandboxed: bool          # default True
    excludedCommands: list[str]             # e.g. ["git", "docker"]
    allowUnsandboxedCommands: bool          # default True
    network: SandboxNetworkConfig
    ignoreViolations: SandboxIgnoreViolations
    enableWeakerNestedSandbox: bool         # default False; Linux only, reduces security
```

```python
sandbox_settings: SandboxSettings = {
    "enabled": True,
    "autoAllowBashIfSandboxed": True,
    "excludedCommands": ["docker"],
    "network": {
        "allowUnixSockets": ["/var/run/docker.sock"],
        "allowLocalBinding": True,
    },
}
```

### Hook types

```python
HookEvent = (
    Literal["PreToolUse"] | Literal["PostToolUse"] | Literal["PostToolUseFailure"]
    | Literal["UserPromptSubmit"] | Literal["Stop"] | Literal["SubagentStop"]
    | Literal["PreCompact"] | Literal["Notification"] | Literal["SubagentStart"]
    | Literal["PermissionRequest"]
)

@dataclass
class HookMatcher:
    """Hook matcher configuration."""
    matcher: str | None = None       # tool name or combination, e.g. "Write|MultiEdit|Edit"
    hooks: list[HookCallback] = field(default_factory=list)
    timeout: float | None = None     # seconds, default 60
```

`SyncHookJSONOutput` (common control fields `continue_`/`suppressOutput`/`stopReason`; decision fields `decision`/`systemMessage`/`reason`; and `hookSpecificOutput` for event-specific controls like `permissionDecision` on `PreToolUse` or `additionalContext` on `PostToolUse`) and `AsyncHookJSONOutput` (`async_: Literal[True]`, `asyncTimeout: NotRequired[int]`) are both `TypedDict`s. Field names without underscores (`async`, `continue`) shown in the CLI documentation must be written with a trailing underscore in Python (`async_`, `continue_`), converted automatically for the CLI wire format.

## Errors

From `claude_agent_sdk._errors` (exported at the package root):

```python
class ClaudeSDKError(Exception):
    """Base exception for all Claude SDK errors."""

class CLIConnectionError(ClaudeSDKError):
    """Raised when unable to connect to Claude Code."""

class CLINotFoundError(CLIConnectionError):
    """Raised when Claude Code is not found or not installed."""
    def __init__(self, message: str = "Claude Code not found", cli_path: str | None = None): ...

class ProcessError(ClaudeSDKError):
    """Raised when the CLI process fails. Carries exit_code and stderr."""
    def __init__(self, message: str, exit_code: int | None = None, stderr: str | None = None): ...

class CLIJSONDecodeError(ClaudeSDKError):
    """Raised when unable to decode JSON from CLI output. Carries line and original_error."""
    def __init__(self, line: str, original_error: Exception): ...

class MessageParseError(ClaudeSDKError):
    """Raised when unable to parse a message from CLI output. Carries data."""
    def __init__(self, message: str, data: dict[str, Any] | None = None): ...
```

See `../operations/troubleshooting.md` for the specific `CLINotFoundError` and `CLIConnectionError` messages and fixes documented on the official troubleshooting page.

## Notes

- The rendered docs page (`/docs/en/agent-sdk/python`) exceeds what WebFetch's summarizer can hold in a single pass; content beyond `ThinkingConfig` (message classes, hook types, MCP server config, `SandboxSettings`, `McpStatusResponse`, `TaskBudget`, `DeferredToolUse`, and error classes) was cross-verified against the published SDK source instead of the rendered page (`anthropics/claude-agent-sdk-python`, `src/claude_agent_sdk/types.py` and `_errors.py`, matching the installable `claude-agent-sdk` package). Field names, defaults, and docstrings above are taken verbatim from that source.
- Not retrieved (present in the SDK but out of scope for this pass — consult the source or rendered docs directly if needed): `ServerToolUseBlock`, `ServerToolResultBlock`, `AssistantMessageError`, `SessionStore` protocol details, `SdkPluginConfig`, `SessionStoreFlushMode`, `SandboxNetworkConfig`, `SandboxIgnoreViolations`, `McpServerStatus`, `HookCallback` signature, `HookSpecificOutput` variants, `TaskNotificationMessage`.
- Two-way field-name mismatch: `AgentDefinition` uses camelCase; `ClaudeAgentOptions` uses snake_case. This is intentional (wire-format vs. Python convention) — see the `AgentDefinition` section above.

## Related

- [TypeScript SDK reference](../api-reference/typescript.md)
- [Cost Tracking](../operations/cost-tracking.md)
- [Troubleshooting](../operations/troubleshooting.md)
