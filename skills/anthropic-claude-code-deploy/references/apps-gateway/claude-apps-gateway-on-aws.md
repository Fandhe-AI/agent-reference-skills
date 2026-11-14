<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-on-aws.md / last verified: 2026-11-14 -->

# Deploy Claude apps gateway on AWS

Worked example of Claude apps gateway on AWS with Amazon Bedrock as the model upstream: ECS Fargate or EKS, Amazon RDS for PostgreSQL, AWS Secrets Manager, IAM-role auth, telemetry, and cost attribution. A working example for customer-managed infrastructure, not a supported production deployment.

## Signature / Usage

```bash
export AWS_REGION=us-east-1   # a US region where Bedrock serves the Claude models you need
export ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
export VPC_ID=<your-vpc-id>
export PRIVATE_SUBNETS="<subnet-id-a> <subnet-id-b>"
```

Bedrock invoke policy (task role on ECS, IRSA role on EKS):

```bash
cat > bedrock-invoke.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["bedrock:InvokeModel", "bedrock:InvokeModelWithResponseStream", "bedrock:CountTokens"],
    "Resource": [
      "arn:aws:bedrock:${AWS_REGION}:${ACCOUNT_ID}:inference-profile/us.anthropic.*",
      "arn:aws:bedrock:*::foundation-model/anthropic.*"
    ]
  }]
}
EOF
```

`gateway.yaml` (`upstreams` block; the `oidc` block is Okta-specific):

```yaml
listen:
  host: 0.0.0.0
  port: 8080
  public_url: https://claude-gateway.internal.example.com
  trusted_proxies: [<your-alb-subnet-cidrs>]

oidc:
  issuer: https://example.okta.com
  client_id: 0oa1example2
  client_secret: ${OIDC_CLIENT_SECRET}           # EKS: ${file:/secrets/oidc-client-secret}
  allowed_email_domains: [example.com]
  userinfo_fallback: true
  scopes: [openid, profile, email, offline_access, groups]

session:
  jwt_secret: ${GATEWAY_JWT_SECRET}              # EKS: ${file:/secrets/jwt-secret}
  ttl_hours: 8

store:
  postgres_url: ${GATEWAY_POSTGRES_URL}          # EKS: ${file:/secrets/postgres-url}

upstreams:
  - provider: bedrock
    region: <your-region>
    auth: {}                                     # AWS default credential chain
```

Internal ALB with a raised idle timeout (ECS track):

```bash
ALB_ARN="$(aws elbv2 create-load-balancer --name claude-gateway \
  --scheme internal --type application --ip-address-type ipv4 \
  --subnets $PRIVATE_SUBNETS --security-groups "$ALB_SG" \
  --query 'LoadBalancers[0].LoadBalancerArn' --output text)"

aws elbv2 create-listener --load-balancer-arn "$ALB_ARN" \
  --protocol HTTPS --port 443 \
  --ssl-policy ELBSecurityPolicy-TLS13-1-2-2021-06 \
  --certificates CertificateArn=<your-acm-certificate-arn> \
  --default-actions Type=forward,TargetGroupArn="$TG_ARN"

aws elbv2 modify-load-balancer-attributes --load-balancer-arn "$ALB_ARN" \
  --attributes Key=idle_timeout.timeout_seconds,Value=3600
```

Per-developer cost attribution with `assume_role` (Terraform, next to the task role):

```hcl
resource "aws_iam_role" "bedrock_user" {
  name = "claude-gateway-bedrock-user"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "sts:AssumeRole", Principal = { AWS = aws_iam_role.task.arn } }]
  })
}
resource "aws_iam_role_policy" "bedrock_user_invoke" {   # same Bedrock policy as the task role's
  role   = aws_iam_role.bedrock_user.id
  policy = aws_iam_role_policy.bedrock_invoke.policy
}
resource "aws_iam_role_policy" "task_assume_bedrock_user" {
  role   = aws_iam_role.task.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "sts:AssumeRole", Resource = aws_iam_role.bedrock_user.arn }]
  })
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Amazon ECS on Fargate / Amazon EKS | compute | Runs the gateway container (ECS service or EKS Deployment) |
| Amazon ECR | image | Repository with immutable tags and `scanOnPush=true`; build `linux/amd64` with the `linux-x64` binary (Fargate on ARM64: `linux-arm64` binary and `cpuArchitecture` `ARM64`) |
| Amazon RDS for PostgreSQL | store | Postgres 16, private subnets, `--no-publicly-accessible --storage-encrypted`, parameter group `rds.force_ssl=1`, `sslmode=verify-full` against the AWS RDS CA bundle |
| AWS Secrets Manager | secrets | `gateway-jwt-secret`, `gateway-oidc-client-secret`, `gateway-postgres-url` |
| IAM task/IRSA role | auth | `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream`, `bedrock:CountTokens` on inference-profile and foundation-model ARNs |
| ECS execution role | auth | Separate from the task role; pulls the image from ECR and injects Secrets Manager values (`AmazonECSTaskExecutionRolePolicy` plus `secretsmanager:GetSecretValue` / `DescribeSecret` on the three secret ARNs, using the `-??????` suffix) |
| Internal Application Load Balancer | ingress | `--ip-address-type ipv4` required (dual-stack publishes public AAAA records that fail the `/login` private-network check); target group health check `/readyz` |
| `listen.public_url` / `listen.trusted_proxies` | config | External `https://` origin; ALB subnet CIDRs |
| `assume_role` with `session_name: email` | upstream key | Per-developer cost attribution; requires gateway on Claude Code v2.1.281+ |
| `telemetry.forward_to` | config | Authenticated OTLP relay to a collector (e.g. ADOT) |

## Notes

- Region: pick a US region where Bedrock serves the Claude models you need. The built-in model catalog resolves to `us.anthropic.*` inference profiles and the IAM policy grants those ARNs; in a non-US region add a `models:` block with that geo's inference-profile IDs and change the IAM ARN prefix.
- Prerequisites: AWS CLI v2 and Docker; a VPC with at least two private subnets in different AZs with NAT gateway egress; an Okta OIDC web app with redirect URI `https://<gateway-host>/oauth/callback` (any OIDC IdP works); a TLS hostname (Route 53 private hosted zone plus an ACM certificate, imported or from AWS Private CA).
- Bedrock isn't the only upstream on AWS: the gateway also supports Claude Platform on AWS (Anthropic-operated Claude API with AWS authentication and AWS Marketplace billing) in place of or alongside Bedrock; its upstream entry, credentials, and IAM permissions differ (see the Claude Platform on AWS upstream reference in the configuration reference).
- Entra ID instead of Okta: set `issuer` to `https://login.microsoftonline.com/<tenant-id>/v2.0`, drop `userinfo_fallback` and the `groups` scope; Entra emits group Object IDs so `managed.policies` must match on GUIDs or on App Roles with `oidc.groups_claim: roles`.
- Security groups: corporate network to ALB on 443, ALB to gateway on 8080, gateway to Postgres on 5432. On EKS the AWS Load Balancer Controller creates its own frontend security group, so `$ALB_SG` / `$GW_SG` go unused: use the `inbound-cidrs` annotation and let the database security group admit the cluster's security group.
- Bedrock access: Bedrock enables model access by default in commercial regions; the remaining account-level gate is Anthropic's one-time use case form (submit via a Model catalog entry in the Bedrock console; access is immediate). The first invoke may also trigger an automatic AWS Marketplace subscription (403 `AccessDeniedException` until it finishes).
- RDS: the literal `--master-user-password` (and `--secret-string`) argument is visible in the process table and audit/EDR logs; on a shared or monitored host pass values via `--cli-input-json` or `file://` from a `0600` file. The trust anchor is the AWS RDS certificate bundle (`https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem`), downloaded per build (AWS rotates it), copied to `/etc/claude/rds-global-bundle.pem` and trusted via `NODE_EXTRA_CA_CERTS`. Don't append `sslrootcert=` to the URL: the driver reads only `sslmode` and would forward it to Postgres as a startup parameter, which the server rejects.
- `trusted_proxies`: on both tracks the front end is an internal ALB whose nodes take addresses from its subnets, so set it to those subnets' CIDRs. This trusts every host in them: keep the corporate ingress CIDR from overlapping and don't share the subnets with untrusted workloads that could spoof `X-Forwarded-For`. The ALB's `routing.http.xff_client_port.enabled` can be either setting (the gateway reads client addresses with the port dropped).
- Secrets reach the container differently: on ECS the build copies `gateway.yaml` into the image at `/etc/claude/gateway.yaml` and the task definition injects the three secrets as environment variables via its `secrets` field (`${GATEWAY_JWT_SECRET}`, `${OIDC_CLIENT_SECRET}`, `${GATEWAY_POSTGRES_URL}`); on EKS mount `gateway.yaml` from a ConfigMap and secrets as files at `/secrets` (`${file:/secrets/...}`), sourced via External Secrets Operator, the Secrets Store CSI driver's AWS provider, or `kubectl`. A config edit on ECS means rebuild under a new tag, register a new task definition revision, and redeploy (also after changing `public_url`; update the OAuth client's redirect URI to `<public_url>/oauth/callback` first).
- Run the ECS cluster with a log group (`/ecs/claude-gateway`) and a 90-day retention policy aligned with your audit retention. The service uses `deploymentCircuitBreaker={enable=true,rollback=true}` and `--health-check-grace-period-seconds 60`. Use `--ssl-policy ELBSecurityPolicy-TLS13-1-2-2021-06`; omitting it falls back to the legacy `ELBSecurityPolicy-2016-08` default that accepts TLS 1.0/1.1.
- ALB idle timeout: the ALB default is 60 seconds. Gateways v2.1.229+ send an SSE `ping` about every 15 seconds of silence on Bedrock and Claude Platform on AWS upstreams (relaying the API's own pings on an Anthropic API upstream), so streams stay inside the default; raising to `3600` adds margin. Gateways older than v2.1.229 send nothing during quiet periods (e.g. extended thinking), so the 60-second default cuts the stream: update the gateway or set `idle_timeout.timeout_seconds` to `3600` (`modify-load-balancer-attributes`, or the `alb.ingress.kubernetes.io/load-balancer-attributes: idle_timeout.timeout_seconds=3600` Ingress annotation on EKS).
- EKS: needs `kubectl`, `eksctl`, an existing cluster on `$VPC_ID` with an IAM OIDC provider and the AWS Load Balancer Controller. Use IRSA (`eksctl create iamserviceaccount`, trust policy federated on the cluster's OIDC provider, scoped to `system:serviceaccount:claude-gateway:gateway`) rather than the ECS roles; the Secrets Store CSI AWS provider needs both `GetSecretValue` and `DescribeSecret` (otherwise rotations aren't picked up). Ingress annotations: `scheme: internal`, `target-type: ip`, `ip-address-type: ipv4`, `inbound-cidrs: <your-corporate-cidr>`, `certificate-arn`, `ssl-policy: ELBSecurityPolicy-TLS13-1-2-2021-06`, and the idle timeout attribute above. With IRSA the pod never needs the instance metadata service (an egress NetworkPolicy may block `169.254.169.254`).
- Egress: tasks in private subnets reach Bedrock, the IdP, Secrets Manager, ECR, and CloudWatch Logs through the NAT gateway. To keep Bedrock traffic off the public path, create a `bedrock-runtime` interface VPC endpoint and point the upstream's `base_url` at it (the IdP still needs internet egress). Without NAT, use interface endpoints for Secrets Manager, ECR, and CloudWatch Logs plus an S3 gateway endpoint.
- Give developers a privately resolvable hostname (Route 53 private hosted zone alias to the ALB) and set `listen.public_url` to it; the ALB's own `*.elb.amazonaws.com` name resolves privately on an internal ALB but can't carry your ACM certificate. Then push the managed settings snippet (`forceLoginMethod`, `forceLoginGatewayUrl`, `parentSettingsBehavior: "merge"`) to each device via MDM; there is no gateway option in the login picker.
- IMDSv2 hop-limit 1 blocks credential resolution from a container on plain EC2/node instance roles (ECS EC2 launch type without a task role, EKS nodes without IRSA); symptom: every Bedrock request returns 502 with `Could not load credentials from any providers`. Neither track here is affected. Prefer task roles / IRSA, or raise the hop limit with `aws ec2 modify-instance-metadata-options --instance-id <id> --http-put-response-hop-limit 2`.
- Telemetry: sessions signed in through `/login` stamp OTLP exports with `user.id`, `user.email`, `user.groups`. Set `telemetry.forward_to` together with `listen.public_url`; the gateway pushes OTEL exporter settings to every connected client and forwards OTLP verbatim (metrics default; logs and traces opt in per destination), buffering nothing. Client telemetry is off until `telemetry.forward_to` is configured, and each interactive client shows a security approval dialog. Point it at an OpenTelemetry collector (e.g. AWS Distro for OpenTelemetry) run as its own internal service over `https://` (loopback exception needs `CLAUDE_GATEWAY_ALLOW_LOOPBACK`). Gateway logs: ECS Fargate delivers stderr via `awslogs` to the log group; on EKS install the Amazon CloudWatch Observability add-on with container log capture or a Fluent Bit DaemonSet, or the audit trail is lost. Container metrics: `aws ecs update-cluster-settings --cluster claude-gateway --settings name=containerInsights,value=enabled` (EKS: the add-on).
- Cost attribution: by default all spend appears under one IAM principal. (1) `assume_role` with `session_name: email` on the Bedrock upstream: a second role holds the Bedrock permissions and trusts the gateway's principal, which needs `sts:AssumeRole` on it; the gateway assumes it once per developer per hour (one STS call per developer per hour per replica) and signs every Bedrock call, `CountTokens` included, with it. Requires Claude Code v2.1.281+; the role may be in another AWS account. The private subnets need a path to `sts.<region>.amazonaws.com` (NAT or an STS interface endpoint). Requests appear as `arn:aws:sts::<account>:assumed-role/<role>/<email>`; use a billing export with IAM principal data. (2) Per team with application inference profiles: one profile per team and model, tagged and activated as a cost allocation tag, one `models:` id per team (include the served model's id, such as `claude-opus-4-8`, so the spend meter can price it) pinned by `managed.policies` `availableModels` with `enforceAvailableModels: true` and a `match: {}` catch-all (without it, a developer matching no policy gets every model and can bill either profile). Developers start with `--model <team-id>`. The signing role must also be allowed to invoke `application-inference-profile/*`. A developer on two teams needs an IdP group and a first-listed policy allowing both ids; the first matching policy applies by default, and spend caps stay one total per developer (lowest of their groups' caps by default), so set a per-user cap to avoid one team's lower cap stopping the other.
- Terraform bundle `examples/gateway/aws` in the `anthropics/claude-code` repo: `setup.sh` (idempotent `aws` provisioner for the ECS Fargate track; you create the Okta client secret and ACM certificate yourself, the Bedrock use case form and Route 53 alias print as next steps, and the MDM push stays manual), `gateway.yaml.example`, `Dockerfile` (prebuilt `linux-x64` binary, `gateway.yaml`, RDS bundle), and `terraform/` (ECS Fargate scope; two-pass apply: targeted apply for ECR, build and push, then full apply). Also see AWS-maintained samples at `https://github.com/aws-samples/anthropic-on-aws/tree/main/claude-apps-gateway`.
- Troubleshooting (AWS-specific): `403 AccessDeniedException` (use case form not submitted, Marketplace subscription not finished, or policy missing inference-profile or foundation-model ARNs); `ValidationException` that on-demand throughput isn't supported (a custom `models:` entry maps a bare foundation-model ID; map to the `us.anthropic.*` inference profile ID); ECS `ResourceInitializationError` before any gateway log (execution role can't read the secrets, or no path to Secrets Manager / ECR); Postgres connection-timeout at boot (database security group must admit the gateway's on 5432, same VPC); Postgres TLS verification error (image lacks the RDS bundle or `NODE_EXTRA_CA_CERTS`).
- Source: https://code.claude.com/docs/en/claude-apps-gateway-on-aws.md, fetched 2026-11-14

## Related

- [claude-apps-gateway-deploy.md](./claude-apps-gateway-deploy.md)
- [claude-apps-gateway-config.md](./claude-apps-gateway-config.md)
- [claude-apps-gateway-spend-limits.md](./claude-apps-gateway-spend-limits.md)
- [claude-apps-gateway-on-gcp.md](./claude-apps-gateway-on-gcp.md)
