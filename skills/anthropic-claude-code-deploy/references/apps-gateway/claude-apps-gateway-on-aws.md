<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-on-aws.md / last verified: 2026-08-07 -->

# Deploy Claude apps gateway on AWS

Worked example of Claude apps gateway on AWS with Amazon Bedrock as the model upstream: ECS Fargate or EKS, Amazon RDS for PostgreSQL, AWS Secrets Manager, and IAM-role auth.

## Signature / Usage

```bash
export AWS_REGION=us-east-1
export ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
export VPC_ID=<your-vpc-id>
export PRIVATE_SUBNETS="<subnet-id-a> <subnet-id-b>"

# IAM: bedrock:InvokeModel + bedrock:InvokeModelWithResponseStream on
# inference-profile and foundation-model ARNs; ECS task role or EKS IRSA carries it.
# RDS: Postgres 16, private subnets, rds.force_ssl=1, sslmode=verify-full connection string.
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Amazon ECS on Fargate / Amazon EKS | compute | Runs the gateway container |
| Amazon RDS for PostgreSQL | store | Private subnets, storage encrypted, `sslmode=verify-full` against the AWS RDS CA bundle |
| AWS Secrets Manager | secrets | JWT signing key, OIDC client secret, Postgres URL |
| IAM task/IRSA role | auth | `bedrock:InvokeModel` / `bedrock:InvokeModelWithResponseStream` |
| Internal Application Load Balancer | ingress | `--ip-address-type ipv4` required (dual-stack publishes public AAAA records that fail the `/login` private-network check) |

## Notes

- Also supports Claude Platform on AWS as an upstream in place of, or alongside, Bedrock; see the `anthropicAws` upstream in the configuration reference.
- ALB idle timeout must be raised to `3600` seconds or streaming responses drop after 60 seconds of silence (e.g. long prompt processing before first token).
- IMDSv2 hop-limit 1 blocks Bedrock credential resolution from inside a container on plain EC2/node instance roles — prefer ECS task roles or EKS IRSA, which don't use instance metadata.
- A companion Terraform/`setup.sh` bundle at `examples/gateway/aws` in the `anthropics/claude-code` repo automates this walkthrough.

## Related

- [claude-apps-gateway-deploy.md](./claude-apps-gateway-deploy.md)
- [claude-apps-gateway-config.md](./claude-apps-gateway-config.md)
- [claude-apps-gateway-on-gcp.md](./claude-apps-gateway-on-gcp.md)
