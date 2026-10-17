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
| autonomous-ai-agents | `agent-merge-conflict-arbiter`, `antigravity-cli`, `blackbox`, `dynamic-workflow`, `grok`, `honcho`, `openhands` |
| blockchain | `evm`, `hyperliquid`, `solana` |
| communication | `one-three-one-rule` |
| creative | `ai-presenter-video`, `anatomy`, `archify`, `ascii-art`, `audiocraft-audio-generation`, `auteur`, `baoyu-article-illustrator`, `baoyu-comic`, `brag`, `brag-slim`, `comfyui`, `concept-diagrams`, `creative-ideation`, `draw-your-font`, `dream-loop`, `excalidraw`, `heartmula`, `hyperframes`, `impeccable`, `ip-as-logo`, `kanban-video-orchestrator`, `meme-generation`, `mono-color`, `pixel-art`, `pretext`, `simple-english`, `sketch`, `social-media-content-calendar`, `system-atlas`, `tldraw-offline`, `unreal-mcp` |
| data-science | `jupyter-notebook` |
| devops | `actual-setup`, `docker-management`, `hermes-s6-container-supervision`, `inference-sh-cli`, `pinggy-tunnel`, `setup-wizard-generator`, `watchers` |
| dogfood | `adversarial-ux-test` |
| email | `agentmail` |
| finance | `3-statement-model`, `comps-analysis`, `dcf-model`, `excel-author`, `lbo-model`, `merger-model`, `polymarket`, `pptx-author`, `stocks` |
| gaming | `minecraft-modpack-server`, `pokemon-player` |
| health | `fitness-nutrition`, `neuroskill-bci` |
| mcp | `fastmcp` (build/test/deploy Python MCP servers), `mcp-oauth-remote-gateway`, `mcporter` |
| migration | `openclaw-migration` |
| mlops | `accelerate`, `axolotl`, `chroma`, `clip`, `dspy`, `evaluating-llms-harness`, `faiss`, `flash-attention`, `guidance`, `huggingface-hub`, `huggingface-tokenizers`, `instructor`, `lambda-labs`, `llama-cpp`, `llava`, `modal`, `nemo-curator`, `obliteratus`, `outlines`, `peft`, `pinecone`, `pytorch-fsdp`, `pytorch-lightning`, `qdrant`, `saelens`, `segment-anything-model`, `serving-llms-vllm`, `simpo`, `slime`, `stable-diffusion`, `tensorrt-llm`, `torchtitan`, `trl-fine-tuning`, `unsloth`, `weights-and-biases`, `whisper` |
| payments | `mpp-agent`, `stripe-link-cli`, `stripe-projects` |
| productivity | `canvas`, `decision-questionnaire`, `here-now`, `live-dashboard`, `memento-flashcards`, `property-listings`, `shop`, `shopify`, `siyuan`, `telephony` |
| research | `bioinformatics`, `blogwatcher`, `darwinian-evolver`, `domain-intel`, `drug-discovery`, `duckduckgo-search`, `gitnexus-explorer`, `osint-investigation`, `parallel-cli`, `pinecone-research`, `qmd`, `research-paper-writing`, `rss-feeds`, `scrapling`, `searxng-search` |
| security | `1password`, `godmode`, `oss-forensics`, `sherlock`, `unbroker`, `web-pentest` |
| smart-home | `openhue` |
| social-media | `reddit-reading` |
| software-development | `ast-grep`, `code-wiki`, `grill-me`, `pr-lens`, `rest-graphql-debug`, `subagent-driven-development` |
| web-development | `cloudflare-temporary-deploy`, `har-derived-api-client`, `page-agent`, `publish-site`, `scrollcraft` |
| yuanbao | `yuanbao` |

## Notes

- Install path is `official/<category>/<skill>`. The source catalog does not state the install path of skills whose doc page slug differs from the skill name (for example `axolotl` links to `mlops-training-axolotl`); this is unconfirmed.
- To contribute a skill: create `optional-skills/<category>/<skill-name>/`, add a `SKILL.md` with standard frontmatter (name, description, version, author), put supporting files in `references/`, `templates/`, or `scripts/`, and open a pull request.
- Source pin: Hermes Agent docs at release tag v0.22.2.

## Related

- [Bundled Skills Catalog](./skills-catalog.md)
- [Skills Hub](./skills-hub.md)
