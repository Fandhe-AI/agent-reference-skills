# Endpoints

Skills API と Tunnels API はいずれも beta（必要ヘッダーは各ページの Notes を参照）。ハブページ 4 件（/api/beta/skills 等）は子ページの連結のみのため個別ファイル化していない。

| Name | Description | Path |
|------|-------------|------|
| Archive Tunnel | Tunnel archival・irreversible・hostname retirement・token invalidation | [tunnels-archive.md](./tunnels-archive.md) |
| Archive Tunnel Certificate | Tunnel certificate archival・trust set から削除・record 保持 | [tunnels-certificates-archive.md](./tunnels-certificates-archive.md) |
| Create Skill | POST /v1/skills・multipart/form-data upload・SKILL.md package | [skills-create.md](./skills-create.md) |
| Create Skill Version | POST /v1/skills/{skill_id}/versions・version timestamp | [skills-versions-create.md](./skills-versions-create.md) |
| Create Tunnel | POST /v1/tunnels・hostname allocation・CA certificate 前提条件 | [tunnels-create.md](./tunnels-create.md) |
| Create Tunnel Certificate | Tunnel に CA certificate 登録・max 2 non-archived cert・zero-downtime rotation | [tunnels-certificates-create.md](./tunnels-certificates-create.md) |
| Delete Skill | DELETE /v1/skills/{skill_id}・skill deletion | [skills-delete.md](./skills-delete.md) |
| Delete Skill Version | DELETE /v1/skills/{skill_id}/versions/{version}・specific version deletion | [skills-versions-delete.md](./skills-versions-delete.md) |
| Download Skill Version Content | GET /v1/skills/{skill_id}/versions/{version}/content・zip archive response | [skills-versions-download.md](./skills-versions-download.md) |
| Get Skill | GET /v1/skills/{skill_id}・skill metadata retrieval | [skills-retrieve.md](./skills-retrieve.md) |
| Get Skill Version | GET /v1/skills/{skill_id}/versions/{version}・skill version detail | [skills-versions-retrieve.md](./skills-versions-retrieve.md) |
| Get Tunnel | GET /v1/tunnels/{tunnel_id}・tunnel detail retrieval | [tunnels-retrieve.md](./tunnels-retrieve.md) |
| Get Tunnel Certificate | GET /v1/tunnels/{tunnel_id}/certificates/{certificate_id}・certificate detail | [tunnels-certificates-retrieve.md](./tunnels-certificates-retrieve.md) |
| List Skills | GET /v1/skills・pagination・source filter (custom/anthropic) | [skills-list.md](./skills-list.md) |
| List Skill Versions | GET /v1/skills/{skill_id}/versions・version history・pagination | [skills-versions-list.md](./skills-versions-list.md) |
| List Tunnel Certificates | GET /v1/tunnels/{tunnel_id}/certificates・archived certificate exclude (option) | [tunnels-certificates-list.md](./tunnels-certificates-list.md) |
| List Tunnels | GET /v1/tunnels・newest first・archived exclude (option) | [tunnels-list.md](./tunnels-list.md) |
| Reveal Tunnel Token | POST /v1/tunnels/{tunnel_id}/reveal_token・connector token fetch・credential | [tunnels-reveal_token.md](./tunnels-reveal_token.md) |
| Rotate Tunnel Token | POST /v1/tunnels/{tunnel_id}/rotate_token・new token issue・existing connection persist | [tunnels-rotate_token.md](./tunnels-rotate_token.md) |
