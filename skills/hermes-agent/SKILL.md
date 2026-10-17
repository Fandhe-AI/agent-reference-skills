---
name: hermes-agent
description: >
  Hermes Agent (Nous Research の AI CLI エージェント)。インストール、
  CLI コマンド (chat, model, gateway, config, cron, webhook, mcp, skills, profile, hermes pm)、
  Configuration (Terminal Backends, Memory, TTS / STT, Auxiliary Models, Compression, Display, Local Models llama.cpp, Egress / Secrets)、
  Features (Tools, Skills, Hooks, Delegation, Kanban, Cron, Voice Mode, Personality, Context Files)、
  Messaging Gateway (Platform Support, Bot Mode, Connectors)、Security、Architecture、
  Hermes Desktop、Plugin Catalog、Profiles、Developer Guide、Nous Portal (Tool Gateway)。
user-invocable: false
---

# Hermes Agent リファレンス

Hermes Agent — Nous Research が開発したオープンソース AI CLI エージェント。
マルチ LLM プロバイダー対応、メッセージングプラットフォーム統合、MCP 連携、音声モード、スキルシステムを備える。
CLI 操作・設定カスタマイズ・機能活用・デプロイ時に参照する。

対象: Hermes Agent v0.22.2（2026-10-15、GitHub タグ v0.22.2 の website/docs/）

## ディレクトリ構成

```text
skills/hermes-agent/
  SKILL.md
  references/
    getting-started/
      README.md
      installation.md
      quickstart.md
      learning-path.md
      platform-support.md
      nix-setup.md
      termux.md
      updating.md
    cli/
      README.md
      commands.md
      interface.md
      slash-commands.md
      profile-commands.md
      cli-symbols.md
      tui.md
    configuration/
      README.md
      configuration.md
      configuring-models.md
      managed-scope.md
    user-guide/
      README.md
      desktop.md
      multi-connection-desktop.md
      bot-mode.md
      profiles.md
      profile-distributions.md
      multi-profile-gateways.md
      sessions.md
      session-storage-recovery.md
      checkpoints-and-rollback.md
      docker.md
      git-worktrees.md
      local-models.md
      import-from-other-agents.md
      switching-to-source.md
      which-file-does-what.md
      windows-native.md
      windows-wsl-quickstart.md
    features/
      README.md
      overview.md
      tools.md
      tool-search.md
      tool-gateway.md
      skills.md
      mcp.md
      memory.md
      memory-providers.md
      voice-mode.md
      tts.md
      wake-word.md
      personality.md
      skins.md
      pets.md
      context-files.md
      context-references.md
      plugins.md
      plugin-catalog.md
      built-in-plugins.md
      browser.md
      computer-use.md
      vision.md
      image-generation.md
      web-search.md
      x-search.md
      spotify.md
      document-extraction.md
      credential-vault.md
      curator.md
      deliverable-mode.md
      lsp.md
      mixture-of-agents.md
      language-packs.md
      codex-app-server-runtime.md
      subscription-proxy.md
      bot-screen.md
      web-dashboard.md
      extending-the-dashboard.md
    automation/
      README.md
      cron.md
      delegation.md
      kanban.md
      kanban-tutorial.md
      kanban-multi-gateway.md
      kanban-worker-lanes.md
      goals.md
      hooks.md
      loops.md
      heartbeat.md
      batch-processing.md
      code-execution.md
    messaging/
      README.md
      messaging.md
      telegram.md
      discord.md
      slack.md
      whatsapp.md
      whatsapp-cloud.md
      signal.md
      email.md
      sms.md
      matrix.md
      mattermost.md
      homeassistant.md
      webhooks.md
      a2a.md
      bluebubbles.md
      buzz.md
      dingtalk.md
      feishu.md
      google_chat.md
      irc.md
      line.md
      msgraph-webhook.md
      ntfy.md
      open-webui.md
      photon.md
      qqbot.md
      raft.md
      relay.md
      simplex.md
      teams.md
      teams-meetings.md
      wecom.md
      wecom-callback.md
      weixin.md
      yuanbao.md
    security/
      README.md
      security.md
      egress.md
      egress-iron-proxy.md
      egress-network-isolation.md
      secrets.md
      secrets-bitwarden.md
      secrets-command.md
      secrets-onepassword.md
    integrations/
      README.md
      overview.md
      providers.md
      provider-routing.md
      fallback-providers.md
      credential-pools.md
      nous-portal.md
      acp.md
      api-server.md
      honcho.md
      buzz.md
    guides/
      README.md
      mcp-guide.md
      voice-mode-guide.md
      run-nemotron-3-ultra-free.md
      tips.md
      local-llm-on-mac.md
      local-ollama-setup.md
      daily-briefing-bot.md
      team-telegram-assistant.md
      python-library.md
      use-soul-with-hermes.md
      automate-with-cron.md
      cron-script-only.md
      cron-troubleshooting.md
      work-with-skills.md
      delegation-patterns.md
      github-pr-review-agent.md
      webhook-github-pr-review.md
      agent-email-address.md
      automation-blueprints.md
      aws-bedrock.md
      azure-foundry.md
      google-gemini.md
      google-vertex.md
      desktop-native-signin.md
      manage-hermes-cloud-with-mcp.md
      microsoft-graph-app-registration.md
      migrate-from-openclaw.md
      minimax-oauth.md
      oauth-over-ssh.md
      operate-teams-meeting-pipeline.md
      pipe-script-output.md
      run-hermes-with-nous-portal.md
      secure-hermes-on-a-work-machine.md
      troubleshooting-agent-quality.md
      xai-grok-oauth.md
    architecture/
      README.md
      architecture.md
      agent-loop.md
      prompt-assembly.md
      context-compression-and-caching.md
      micro-compaction.md
      gateway-internals.md
      gateway-session-lifecycle.md
      gateway-monitoring.md
      multiplexing-gateway.md
      session-storage.md
      state-db-recovery.md
      provider-runtime.md
      tools-runtime.md
      middleware.md
      cli-internals.md
      cron-internals.md
      acp-internals.md
      browser-supervisor.md
      egress-internals.md
      streaming-tts.md
      completion-backlog-delivery.md
      trajectory-format.md
    developer-guide/
      README.md
      plugins.md
      plugins-application-declarations.md
      plugins-catalog-submission.md
      adding-tools.md
      adding-providers.md
      adding-platform-adapters.md
      creating-skills.md
      extending-the-cli.md
      programmatic-integration.md
      subagent-lifecycle-api.md
      observer-hooks.md
      plugin-llm-access.md
      desktop-plugin-sdk.md
      model-provider-plugin.md
      memory-provider-plugin.md
      context-engine-plugin.md
      browser-provider-plugin.md
      image-gen-provider-plugin.md
      video-gen-provider-plugin.md
      web-search-provider-plugin.md
      terminal-environment-plugin.md
      secret-source-plugin.md
    reference/
      README.md
      faq.md
      skills-hub.md
      environment-variables.md
      tools-reference.md
      toolsets-reference.md
      mcp-config-reference.md
      model-catalog.md
      skills-catalog.md
      optional-skills-catalog.md
      automation-blueprints-catalog.md
      package-management.md
  samples/
    README.md
    basic-chat.md
    mcp-server-setup.md
    messaging-gateway.md
    skills-install.md
    memory-management.md
    voice-mode.md
    docker-terminal.md
    cron-scheduling.md
    cron-script-only.md
    pipe-script-output.md
    webhook-github-pr-review.md
    python-library.md
    import-from-other-agents.md
  scripts/
    README.md
    install.md
    cli.md
    setup.md
    gateway.md
    skills.md
    mcp.md
    sessions.md
    auth.md
    cron.md
    plugins.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール、クイックスタート、学習パス、Nix / Termux、更新、サポート対象プラットフォーム階層 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| CLI 起動オプション、TUI、スラッシュコマンド、profile コマンド、全 CLI コマンドリファレンス | cli | [references/cli/README.md](references/cli/README.md) |
| config.yaml 設定、Terminal Backend (Docker/SSH/Modal 等)、モデル設定、managed scope、TTS/STT、Compression | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Hermes Desktop、Bot Mode、Profiles、Sessions、Docker、Git worktrees、Local Models、Windows、Claude Code / Codex からの移行 | user-guide | [references/user-guide/README.md](references/user-guide/README.md) |
| Tools & Toolsets、Memory、Skills、MCP、Voice Mode、Plugin Catalog、Browser、Computer Use、Web Dashboard、Personality | features | [references/features/README.md](references/features/README.md) |
| Cron、Delegation、Kanban、Goals、Hooks、Loops、Heartbeat、Batch、Code Execution | automation | [references/automation/README.md](references/automation/README.md) |
| Messaging Gateway、各プラットフォーム個別ページ (Telegram / Discord / Slack / WhatsApp / Teams / IRC 等)、サービス管理 | messaging | [references/messaging/README.md](references/messaging/README.md) |
| セキュリティモデル、Dangerous Command Approval、egress proxy、secrets (Bitwarden / 1Password)、Container Isolation | security | [references/security/README.md](references/security/README.md) |
| MCP 実践ガイド、Voice Mode、Bedrock / Azure / Gemini / Vertex、OAuth、cron 運用、Tips | guides | [references/guides/README.md](references/guides/README.md) |
| agent loop、prompt assembly、compression、gateway / session storage / provider runtime 内部 | architecture | [references/architecture/README.md](references/architecture/README.md) |
| plugin 開発、provider / tool / platform adapter 追加、Desktop Plugin SDK、Subagent Lifecycle API、skill 作成 | developer-guide | [references/developer-guide/README.md](references/developer-guide/README.md) |
| FAQ、env vars、tools / toolsets、MCP config、model catalog、skills catalog、package management | reference | [references/reference/README.md](references/reference/README.md) |
| Nous Portal、プロバイダー、provider routing、fallback、credential pools、ACP、API server | integrations | [references/integrations/README.md](references/integrations/README.md) |
| 典型的な使い方を知りたい（チャット、MCP、音声、Docker、cron、webhook、Python library、移行等） | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・ゲートウェイ起動・認証・Cron 等を実行したい | scripts | [scripts/README.md](scripts/README.md) |
