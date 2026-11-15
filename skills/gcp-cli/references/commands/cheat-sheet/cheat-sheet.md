---
source: https://docs.cloud.google.com/sdk/gcloud/reference/cheat-sheet
---

# gcloud cheat-sheet

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud cheat-sheet

```text
NAME
    gcloud cheat-sheet - display gcloud cheat sheet

SYNOPSIS
    gcloud cheat-sheet [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    A roster of go-to gcloud commands for the gcloud tool, Google Cloud's
    primary command-line tool.

  Getting started
    Get going with the gcloud command-line tool

      o gcloud init: Initialize, authorize, and configure the gcloud tool.
      o gcloud version: Display version and installed components.
      o gcloud components install: Install specific components.
      o gcloud components update: Update your Google Cloud CLI to the latest
        version.
      o gcloud config set project: Set a default Google Cloud project to work
        on.
      o gcloud info: Display current gcloud tool environment details.

  Help
    Google Cloud CLI is happy to help

      o gcloud help: Search the gcloud tool reference documents for specific
        terms.
      o gcloud feedback: Provide feedback for the Google Cloud CLI team.
      o gcloud topic: Supplementary help material for non-command topics like
        accessibility, filtering, and formatting.

  Personalization
    Make the Google Cloud CLI your own; personalize your configuration with
    properties

      o gcloud config set: Define a property (like compute/zone) for the
        current configuration.
      o gcloud config get: Fetch value of a Google Cloud CLI property.
      o gcloud config list: Display all the properties for the current
        configuration.
      o gcloud config configurations create: Create a new named
        configuration.
      o gcloud config configurations list: Display a list of all available
        configurations.
      o gcloud config configurations activate: Switch to an existing named
        configuration.

  Credentials
    Grant and revoke authorization to Google Cloud CLI

      o gcloud auth login: Authorize Google Cloud access for the gcloud tool
        with Google user credentials and set current account as active.
      o gcloud auth activate-service-account: Like gcloud auth login but with
        service account credentials.
      o gcloud auth list: List all credentialed accounts.
      o gcloud auth print-access-token: Display the current account's access
        token.
      o gcloud auth revoke: Remove access credentials for an account.

  Projects
    Manage project access policies

      o gcloud projects describe: Display metadata for a project (including
        its ID).
      o gcloud projects add-iam-policy-binding: Add an IAM policy binding to
        a specified project.

  Identity & Access Management
    Configuring Cloud Identity & Access Management (IAM) preferences and
    service accounts

      o gcloud iam list-grantable-roles: List IAM grantable roles for a
        resource.
      o gcloud iam roles create: Create a custom role for a project or org.
      o gcloud iam service-accounts create: Create a service account for a
        project.
      o gcloud iam service-accounts add-iam-policy-binding: Add an IAM policy
        binding to a service account.
      o gcloud iam service-accounts set-iam-policy: Replace existing IAM
        policy binding.
      o gcloud iam service-accounts keys list: List a service account's keys.

  Docker & Google Kubernetes Engine (GKE)
    Manage containerized applications on Kubernetes

      o gcloud auth configure-docker: Register the gcloud tool as a Docker
        credential helper.
      o gcloud container clusters create: Create a cluster to run GKE
        containers.
      o gcloud container clusters list: List clusters for running GKE
        containers.
      o gcloud container clusters get-credentials: Update kubeconfig to get
        kubectl to use a GKE cluster.
      o gcloud container images list-tags: List tag and digest metadata for a
        container image.

  Virtual Machines & Compute Engine
    Create, run, and manage VMs on Google infrastructure

      o gcloud compute zones list: List Compute Engine zones.
      o gcloud compute instances describe: Display a VM instance's details.
      o gcloud compute instances list: List all VM instances in a project.
      o gcloud compute disks snapshot: Create snapshot of persistent disks.
      o gcloud compute snapshots describe: Display a snapshot's details.
      o gcloud compute snapshots delete: Delete a snapshot.
      o gcloud compute ssh: Connect to a VM instance by using SSH.

  Serverless & App Engine
    Build highly scalable applications on a fully managed serverless platform

      o gcloud app deploy: Deploy your app's code and configuration to the
        App Engine server.
      o gcloud app versions list: List all versions of all services deployed
        to the App Engine server.
      o gcloud app browse: Open the current app in a web browser.
      o gcloud app create: Create an App Engine app within your current
        project.
      o gcloud app logs read: Display the latest App Engine app logs.

  Miscellaneous
    Commands that might come in handy

      o gcloud kms decrypt: Decrypt ciphertext (to a plaintext file) using a
        Cloud Key Management Service (Cloud KMS) key.
      o gcloud logging logs list: List your project's logs.
      o gcloud sql backups describe: Display info about a Cloud SQL instance
        backup.
      o gcloud sql export sql: Export data from a Cloud SQL instance to a SQL
        file.

EXAMPLES
    To view this cheat sheet, run:

        $ gcloud cheat-sheet

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/cheat-sheet (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
