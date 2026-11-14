# Optional Skills Catalog

Official optional skills ship under `optional-skills/` in hermes-agent but are not active by default; install them explicitly.

## Signature / Usage

```bash
hermes skills install official/<category>/<skill>
hermes skills install official/blockchain/solana
hermes skills install official/mlops/flash-attention

hermes skills uninstall <skill-name>
```

## Options / Props

Skills by category.

| Category | Skills |
|----------|--------|
| autonomous-ai-agents | `agent-merge-conflict-arbiter`, `antigravity-cli`, `blackbox`, `dynamic-workflow`, `grok`, `opencode`, `openhands` |
| blockchain | `evm`, `hyperliquid`, `solana` |
| communication | `one-three-one-rule` |
| creative | `ai-presenter-video`, `anatomy`, `archify`, `ascii-art`, `auteur`, `baoyu-article-illustrator`, `baoyu-comic`, `brag`, `brag-slim`, `comfyui`, `concept-diagrams`, `creative-ideation`, `design-md`, `draw-your-font`, `dream-loop`, `excalidraw`, `heartmula`, `hyperframes`, `impeccable`, `ip-as-logo`, `kanban-video-orchestrator`, `meme-generation`, `mono-color`, `pixel-art`, `pretext`, `simple-english`, `sketch`, `social-media-content-calendar`, `system-atlas`, `tldraw-offline`, `unreal-mcp` |
| data-science | `jupyter-notebook` |
| devops | `actual-setup`, `docker-management`, `hermes-s6-container-supervision`, `inference-sh-cli`, `pinggy-tunnel`, `setup-wizard-generator`, `watchers` |
| dogfood | `adversarial-ux-test` |
| email | `agentmail` |
| finance | `3-statement-model`, `comps-analysis`, `dcf-model`, `excel-author`, `lbo-model`, `merger-model`, `polymarket`, `pptx-author`, `stocks` |
| gaming | `minecraft-modpack-server`, `pokemon-player` |
| health | `fitness-nutrition`, `neuroskill-bci` |
| mcp | `fastmcp` (build/test/deploy Python MCP servers), `mcp-oauth-remote-gateway`, `mcporter` |
| media | `gif-search` (Tenor via curl + jq), `songsee` (audio spectrograms) |
| mlops | `accelerate`, `axolotl`, `chroma`, `dspy`, `evaluating-llms-harness`, `faiss`, `flash-attention`, `lambda-labs`, `llama-cpp`, `modal`, `nemo-curator`, `obliteratus`, `peft`, `pytorch-fsdp`, `pytorch-lightning`, `saelens`, `segment-anything-model`, `serving-llms-vllm`, `simpo`, `slime`, `tensorrt-llm`, `torchtitan`, `unsloth` |
| payments | `stripe-link-cli`, `stripe-projects` |
| productivity | `box`, `canvas`, `decision-questionnaire`, `here-now`, `live-dashboard`, `memento-flashcards`, `property-listings`, `shop`, `siyuan`, `telephony` |
| research | `bioinformatics`, `blogwatcher`, `darwinian-evolver`, `domain-intel`, `drug-discovery`, `gitnexus-explorer`, `llm-wiki`, `osint-investigation`, `parallel-cli`, `qmd`, `research-paper-writing`, `rss-feeds`, `scrapling` |
| security | `1password`, `godmode`, `oss-forensics`, `sherlock`, `unbroker`, `web-pentest` |
| smart-home | `openhue` |
| social-media | `reddit-reading` |
| software-development | `ast-grep`, `code-wiki`, `grill-me`, `hermes-agent-skill-authoring`, `inspecting-hermes-desktop-dom`, `node-inspect-debugger`, `pr-lens`, `python-debugpy`, `rest-graphql-debug`, `subagent-driven-development` |
| web-development | `cloudflare-temporary-deploy`, `har-derived-api-client`, `page-agent`, `publish-site`, `scrollcraft` |

## Notes

- Install path is `official/<category>/<skill>`. The source catalog does not state the install path of skills whose doc page slug differs from the skill name (for example `axolotl` links to `mlops-training-axolotl`); this is unconfirmed.
- To contribute a skill: create `optional-skills/<category>/<skill-name>/`, add a `SKILL.md` with standard frontmatter (name, description, version, author), put supporting files in `references/`, `templates/`, or `scripts/`, and open a pull request.
- Source: https://hermes-agent.nousresearch.com/docs/reference/optional-skills-catalog (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

Migration (v0.22 -> v0.23): the `migration` category (`openclaw-migration`) and the `yuanbao` category are gone from the catalog; OpenClaw import is now `hermes import-agent openclaw` from the `agent-importers` plugin, and the Yuanbao tools come from the `yuanbao` Hermes Labs plugin. `honcho` (skill) is no longer listed under autonomous-ai-agents. `gif-search` and `songsee` moved here from the bundled catalog (new `media` category). The following v0.22 optional skills are no longer listed: `audiocraft-audio-generation`, `clip`, `guidance`, `huggingface-hub`, `huggingface-tokenizers`, `instructor`, `llava`, `outlines`, `pinecone`, `qdrant`, `stable-diffusion`, `trl-fine-tuning`, `weights-and-biases`, `whisper`, `mpp-agent`, `shopify`, `duckduckgo-search`, `pinecone-research`, `searxng-search`. Moved here from the bundled catalog: `opencode`, `design-md`, `llm-wiki`, `box`, `hermes-agent-skill-authoring`, `inspecting-hermes-desktop-dom`, `node-inspect-debugger`, `python-debugpy`. The example `official/migration/openclaw-migration` is replaced by `official/mcp/fastmcp` in the v0.23 skills guide.

## Related

- [Bundled Skills Catalog](./skills-catalog.md)
- [Skills Hub](./skills-hub.md)
