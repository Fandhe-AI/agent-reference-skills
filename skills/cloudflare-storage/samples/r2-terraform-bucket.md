---
source: https://developers.cloudflare.com/r2/examples/terraform/
---

# Manage an R2 bucket with Terraform

Create an R2 bucket with the Cloudflare Terraform provider.

```hcl
terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}

provider "cloudflare" {
  api_token = "<YOUR_API_TOKEN>"
}

resource "cloudflare_r2_bucket" "cloudflare-bucket" {
  account_id = "<YOUR_ACCOUNT_ID>"
  name       = "my-tf-test-bucket"
  location   = "WEUR"
}
```

## Notes

- Run `terraform plan` then `terraform apply`. The Cloudflare provider manages buckets only; CORS and object lifecycle rules need the AWS provider (https://developers.cloudflare.com/r2/examples/terraform-aws/).
- Do not hard-code the API token; the placeholder is for illustration.
- Related: [R2 README](../references/r2/README.md), [buckets-create](../references/r2/buckets-create.md).
