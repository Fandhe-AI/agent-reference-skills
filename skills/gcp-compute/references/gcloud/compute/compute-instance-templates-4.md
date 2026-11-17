---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-templates
---

# gcloud compute instance-templates (part 4/4)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-templates remove-iam-policy-binding

```text
NAME
    gcloud compute instance-templates remove-iam-policy-binding - remove IAM
        policy binding from a Compute Engine instance template

SYNOPSIS
    gcloud compute instance-templates remove-iam-policy-binding
        INSTANCE_TEMPLATE --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding from the IAM policy of a Compute Engine
    instance template. One binding consists of a member, a role, and an
    optional condition.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/compute.admin' for
    the user 'test-user@gmail.com' with instance template 'my-template', run:

        $ gcloud compute instance-templates remove-iam-policy-binding \
            my-template --member='user:test-user@gmail.com' \
            --role='roles/compute.admin'

    To remove an IAM policy binding which expires at the end of the year 2018
    for the role of 'roles/compute.admin' and the user 'test-user@gmail.com'
    with instance template 'my-template', run:

        $ gcloud compute instance-templates remove-iam-policy-binding \
            my-template --member='user:test-user@gmail.com' \
            --role='roles/compute.admin' \
            --condition='expression=request.time <
         timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,descrip\
        tion=Expires at midnight on 2018-12-31'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Instance template resource - The instance template for which to remove IAM
     policy binding from. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument instance_template on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE_TEMPLATE
          ID of the instance_template or fully qualified identifier for the
          instance_template.

          To set the instance_template attribute:
          + provide the argument instance_template on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

OPTIONAL FLAGS
     At most one of these can be specified:

       --all
          Remove all bindings with this role and principal, irrespective of any
          conditions.

       --condition=[KEY=VALUE,...]
          The condition of the binding that you want to remove. When the
          condition is explicitly specified as None (--condition=None), a
          binding without a condition is removed. Otherwise, only a binding
          with a condition that exactly matches the specified condition
          (including the optional description) is removed. For more on
          conditions, refer to the conditions overview guide:
          https://cloud.google.com/iam/docs/conditions-overview

          When using the --condition flag, include the following key-value
          pairs:

           expression
              (Required) Condition expression that evaluates to True or False.
              This uses a subset of Common Expression Language syntax.

              If the condition expression includes a comma, use a different
              delimiter to separate the key-value pairs. Specify the delimiter
              before listing the key-value pairs. For example, to specify a
              colon (:) as the delimiter, do the following:
              --condition=^:^title=TITLE:expression=EXPRESSION. For more
              information, see
              https://cloud.google.com/sdk/gcloud/reference/topic/escaping.

           title
              (Required) A short string describing the purpose of the
              expression.

           description
              (Optional) Additional description for the expression.

       --condition-from-file=PATH_TO_FILE
          Path to a local JSON or YAML file that defines the condition. To see
          available fields, see the help for --condition. Use a full or
          relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute instance-templates remove-iam-policy-binding

        $ gcloud beta compute instance-templates remove-iam-policy-binding
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute instance-templates remove-iam-policy-binding my-template \
    --member='user:test-user@gmail.com' \
    --role='roles/compute.admin' \
    --condition='expression=request.time < timestamp("2019-01-01T00:00:00Z"),title=expires_end_of_2018,description=Expires at midnight on 2018-12-31'
```

### gcloud compute instance-templates set-iam-policy

```text
NAME
    gcloud compute instance-templates set-iam-policy - set the IAM policy for a
        Compute Engine instance template

SYNOPSIS
    gcloud compute instance-templates set-iam-policy INSTANCE_TEMPLATE
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given instance template as defined in a JSON or
    YAML file.

EXAMPLES
    The following command will read am IAM policy defined in a JSON file
    'policy.json' and set it for the instance template my-template:

        $ gcloud compute instance-templates set-iam-policy my-template \
            policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Instance template resource - The instance template to set the IAM policy
     for. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance_template on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE_TEMPLATE
          ID of the instance_template or fully qualified identifier for the
          instance_template.

          To set the instance_template attribute:
          + provide the argument instance_template on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute instance-templates set-iam-policy

        $ gcloud beta compute instance-templates set-iam-policy
```

### gcloud compute instance-templates test-iam-permissions

```text
NAME
    gcloud compute instance-templates test-iam-permissions - test IAM
        permissions for a Compute Engine instance template

SYNOPSIS
    gcloud compute instance-templates test-iam-permissions INSTANCE_TEMPLATE
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified instance template.

EXAMPLES
    To test if the caller has compute.instanceTemplates.get permission on an
    instance template, run:

        $ gcloud compute instance-templates test-iam-permissions \
            my-instance-template --permissions=compute.instanceTemplates.get

POSITIONAL ARGUMENTS
     Instance template resource - The instance template for which to test
     permissions. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance_template on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE_TEMPLATE
          ID of the instance_template or fully qualified identifier for the
          instance_template.

          To set the instance_template attribute:
          + provide the argument instance_template on the command line.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        Permissions to be tested.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute instance-templates test-iam-permissions

        $ gcloud beta compute instance-templates test-iam-permissions
```

### gcloud beta compute instance-templates add-iam-policy-binding

```text
NAME
    gcloud beta compute instance-templates add-iam-policy-binding - add IAM
        policy binding to a Compute Engine instance template

SYNOPSIS
    gcloud beta compute instance-templates add-iam-policy-binding
        INSTANCE_TEMPLATE --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates create

```text
NAME
    gcloud beta compute instance-templates create - create a Compute Engine
        virtual machine instance template

SYNOPSIS
    gcloud beta compute instance-templates create NAME
        [--accelerator=[count=COUNT],[type=TYPE]] [--no-boot-disk-auto-delete]
        [--boot-disk-device-name=BOOT_DISK_DEVICE_NAME]
        [--boot-disk-interface=BOOT_DISK_INTERFACE]
        [--boot-disk-kms-key-service-account=BOOT_DISK_KMS_KEY_SERVICE_ACCOUNT]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS]
        [--boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--boot-disk-size=BOOT_DISK_SIZE] [--boot-disk-type=BOOT_DISK_TYPE]
        [--can-ip-forward] [--configure-disk=[PROPERTY=VALUE,...]]
        [--create-disk=[PROPERTY=VALUE,...]] [--description=DESCRIPTION]
        [--discard-local-ssds-at-termination-timestamp=DISCARD_LOCAL_SSDS_AT_TERMINATION_TIMESTAMP]
        [--disk=[auto-delete=AUTO-DELETE],[boot=BOOT],[device-name=DEVICE-NAME],
          [interface=INTERFACE],[mode=MODE],[name=NAME]]
        [--enable-display-device] [--[no-]enable-nested-virtualization]
        [--[no-]enable-uefi-networking] [--[no-]expose-host-topology]
        [--external-ipv6-address=EXTERNAL_IPV6_ADDRESS]
        [--external-ipv6-prefix-length=EXTERNAL_IPV6_PREFIX_LENGTH]
        [--graceful-shutdown]
        [--graceful-shutdown-max-duration=GRACEFUL_SHUTDOWN_MAX_DURATION]
        [--host-error-timeout-seconds=HOST_ERROR_TIMEOUT_SECONDS]
        [--identity=IDENTITY] [--[no-]identity-certificate]
        [--identity-type=IDENTITY_TYPE]
        [--instance-template-region=INSTANCE_TEMPLATE_REGION]
        [--instance-termination-action=INSTANCE_TERMINATION_ACTION]
        [--internal-ipv6-address=INTERNAL_IPV6_ADDRESS]
        [--internal-ipv6-prefix-length=INTERNAL_IPV6_PREFIX_LENGTH]
        [--ipv6-network-tier=IPV6_NETWORK_TIER]
        [--key-revocation-action-type=POLICY] [--labels=[KEY=VALUE,...]]
        [--local-ssd=[device-name=DEVICE-NAME],
          [interface=INTERFACE],[size=SIZE]]
        [--local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT]
        [--machine-type=MACHINE_TYPE]
        [--maintenance-interval=MAINTENANCE_INTERVAL]
        [--maintenance-policy=MAINTENANCE_POLICY]
        [--max-run-duration=MAX_RUN_DURATION]
        [--mesh=[gke-cluster=GKE-CLUSTER],[workload=WORKLOAD]]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-cpu-platform=PLATFORM] [--min-node-cpu=MIN_NODE_CPU]
        [--network=NETWORK] [--network-interface=[PROPERTY=VALUE,...]]
        [--network-performance-configs=[PROPERTY=VALUE,...]]
        [--network-tier=NETWORK_TIER]
        [--partner-metadata=[NAMESPACE/KEY=VALUE,...]]
        [--partner-metadata-from-file=LOCAL_FILE_PATH]
        [--performance-monitoring-unit=PERFORMANCE_MONITORING_UNIT]
        [--post-key-revocation-action-type=POLICY] [--preemptible]
        [--preemption-notice-duration=PREEMPTION_NOTICE_DURATION]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--private-network-ip=PRIVATE_NETWORK_IP]
        [--provisioning-model=PROVISIONING_MODEL] [--region=REGION]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--resource-policies=[RESOURCE_POLICY,...]] [--no-restart-on-failure]
        [--shielded-integrity-monitoring] [--shielded-secure-boot]
        [--shielded-vtpm] [--[no-]skip-guest-os-shutdown]
        [--source-instance=SOURCE_INSTANCE]
        [--source-instance-zone=SOURCE_INSTANCE_ZONE] [--stack-type=STACK_TYPE]
        [--subnet=SUBNET] [--svsm-config=[PROPERTY=VALUE,...]]
        [--tags=TAG,[TAG,...]] [--termination-time=TERMINATION_TIME]
        [--threads-per-core=THREADS_PER_CORE] [--turbo-mode=TURBO_MODE]
        [--visible-core-count=VISIBLE_CORE_COUNT]
        [--address=ADDRESS | --no-address]
        [--boot-disk-kms-key=BOOT_DISK_KMS_KEY
          : --boot-disk-kms-keyring=BOOT_DISK_KMS_KEYRING
          --boot-disk-kms-location=BOOT_DISK_KMS_LOCATION
          --boot-disk-kms-project=BOOT_DISK_KMS_PROJECT]
        [--confidential-compute
          | --confidential-compute-type=CONFIDENTIAL_COMPUTE_TYPE]
        [--custom-cpu=CUSTOM_CPU --custom-memory=CUSTOM_MEMORY
          : --custom-extensions --custom-vm-type=CUSTOM_VM_TYPE]
        [--image-project=IMAGE_PROJECT --image=IMAGE
          | --image-family=IMAGE_FAMILY]
        [--node=NODE | --node-affinity-file=PATH_TO_FILE
          | --node-group=NODE_GROUP]
        [--reservation=RESERVATION
          --reservation-affinity=RESERVATION_AFFINITY; default="any"]
        [--scopes=[SCOPE,...] | --no-scopes]
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [--service-proxy=[enabled],[intercept-all-outbound-traffic],
          [use-regional-control-plane],[access-log=ACCESS-LOG],
          [envoy-bootstrap=ENVOY-BOOTSTRAP],
          [exclude-outbound-ip-ranges=EXCLUDE-OUTBOUND-IP-RANGES],
          [exclude-outbound-port-ranges=EXCLUDE-OUTBOUND-PORT-RANGES],
          [mesh=MESH],[network=NETWORK],[project-number=PROJECT-NUMBER],
          [proxy-port=PROXY-PORT],
          [scope=SCOPE],[serving-ports=SERVING-PORTS],[tracing=TRACING]
          --service-proxy-labels=[KEY=VALUE, ...,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates create-with-container

```text
NAME
    gcloud beta compute instance-templates create-with-container - creates a
        Compute Engine a virtual machine instance template that runs a Docker
        container

SYNOPSIS
    gcloud beta compute instance-templates create-with-container NAME
        [--accelerator=[count=COUNT],[type=TYPE]] [--no-boot-disk-auto-delete]
        [--boot-disk-device-name=BOOT_DISK_DEVICE_NAME]
        [--boot-disk-interface=BOOT_DISK_INTERFACE]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS]
        [--boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--boot-disk-size=BOOT_DISK_SIZE] [--boot-disk-type=BOOT_DISK_TYPE]
        [--can-ip-forward] [--container-arg=CONTAINER_ARG]
        [--container-command=CONTAINER_COMMAND]
        [--container-env=[KEY=VALUE, ...,...]]
        [--container-env-file=CONTAINER_ENV_FILE]
        [--container-image=CONTAINER_IMAGE]
        [--container-mount-disk=[mode=MODE],
          [mount-path=MOUNT-PATH],[name=NAME],[partition=PARTITION]]
        [--container-mount-host-path=[host-path=HOSTPATH,
          mount-path=MOUNTPATH[,mode=MODE],...]]
        [--container-mount-tmpfs=[mount-path=MOUNTPATH,...]]
        [--container-privileged]
        [--container-restart-policy=POLICY; default="always"]
        [--container-stdin] [--container-tty]
        [--create-disk=[PROPERTY=VALUE,...]] [--description=DESCRIPTION]
        [--disk=[auto-delete=AUTO-DELETE],[boot=BOOT],[device-name=DEVICE-NAME],
          [interface=INTERFACE],[mode=MODE],[name=NAME]]
        [--external-ipv6-address=EXTERNAL_IPV6_ADDRESS]
        [--external-ipv6-prefix-length=EXTERNAL_IPV6_PREFIX_LENGTH]
        [--identity=IDENTITY] [--[no-]identity-certificate]
        [--identity-type=IDENTITY_TYPE]
        [--internal-ipv6-address=INTERNAL_IPV6_ADDRESS]
        [--internal-ipv6-prefix-length=INTERNAL_IPV6_PREFIX_LENGTH]
        [--ipv6-network-tier=IPV6_NETWORK_TIER] [--labels=[KEY=VALUE,...]]
        [--local-ssd=[device-name=DEVICE-NAME],[interface=INTERFACE]]
        [--machine-type=MACHINE_TYPE] [--maintenance-policy=MAINTENANCE_POLICY]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-cpu-platform=PLATFORM] [--network=NETWORK]
        [--network-interface=[PROPERTY=VALUE,...]]
        [--network-tier=NETWORK_TIER] [--preemptible]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--private-network-ip=PRIVATE_NETWORK_IP]
        [--provisioning-model=PROVISIONING_MODEL] [--region=REGION]
        [--resource-policies=[RESOURCE_POLICY,...]] [--no-restart-on-failure]
        [--shielded-integrity-monitoring] [--shielded-secure-boot]
        [--shielded-vtpm] [--[no-]skip-guest-os-shutdown]
        [--stack-type=STACK_TYPE] [--subnet=SUBNET] [--tags=TAG,[TAG,...]]
        [--address=ADDRESS | --no-address]
        [--confidential-compute
          | --confidential-compute-type=CONFIDENTIAL_COMPUTE_TYPE]
        [--custom-cpu=CUSTOM_CPU --custom-memory=CUSTOM_MEMORY
          : --custom-extensions --custom-vm-type=CUSTOM_VM_TYPE]
        [--image-project=IMAGE_PROJECT --image=IMAGE
          | --image-family=IMAGE_FAMILY]
        [--reservation=RESERVATION
          --reservation-affinity=RESERVATION_AFFINITY; default="any"]
        [--scopes=[SCOPE,...] | --no-scopes]
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates delete

```text
NAME
    gcloud beta compute instance-templates delete - delete Compute Engine
        virtual machine instance templates

SYNOPSIS
    gcloud beta compute instance-templates delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates describe

```text
NAME
    gcloud beta compute instance-templates describe - describe a virtual
        machine instance template

SYNOPSIS
    gcloud beta compute instance-templates describe NAME [--view=VIEW]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates export

```text
NAME
    gcloud beta compute instance-templates export - export an instance template

SYNOPSIS
    gcloud beta compute instance-templates export NAME
        [--destination=DESTINATION] [--endpoint-mode=ENDPOINT_MODE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates get-iam-policy

```text
NAME
    gcloud beta compute instance-templates get-iam-policy - get the IAM policy
        for a Compute Engine instance template

SYNOPSIS
    gcloud beta compute instance-templates get-iam-policy INSTANCE_TEMPLATE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates import

```text
NAME
    gcloud beta compute instance-templates import - import an instance template

SYNOPSIS
    gcloud beta compute instance-templates import NAME
        [--endpoint-mode=ENDPOINT_MODE] [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates list

```text
NAME
    gcloud beta compute instance-templates list - list Google Compute Engine
        instance templates

SYNOPSIS
    gcloud beta compute instance-templates list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--view=VIEW]
        [--global | --regions=[REGION,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates remove-iam-policy-binding

```text
NAME
    gcloud beta compute instance-templates remove-iam-policy-binding - remove
        IAM policy binding from a Compute Engine instance template

SYNOPSIS
    gcloud beta compute instance-templates remove-iam-policy-binding
        INSTANCE_TEMPLATE --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates set-iam-policy

```text
NAME
    gcloud beta compute instance-templates set-iam-policy - set the IAM policy
        for a Compute Engine instance template

SYNOPSIS
    gcloud beta compute instance-templates set-iam-policy INSTANCE_TEMPLATE
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-templates test-iam-permissions

```text
NAME
    gcloud beta compute instance-templates test-iam-permissions - test IAM
        permissions for a Compute Engine instance template

SYNOPSIS
    gcloud beta compute instance-templates test-iam-permissions
        INSTANCE_TEMPLATE --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates add-iam-policy-binding

```text
NAME
    gcloud alpha compute instance-templates add-iam-policy-binding - add IAM
        policy binding to a Compute Engine instance template

SYNOPSIS
    gcloud alpha compute instance-templates add-iam-policy-binding
        INSTANCE_TEMPLATE --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates create

```text
NAME
    gcloud alpha compute instance-templates create - create a Compute Engine
        virtual machine instance template

SYNOPSIS
    gcloud alpha compute instance-templates create NAME
        [--accelerator=[count=COUNT],[type=TYPE]] [--no-boot-disk-auto-delete]
        [--boot-disk-device-name=BOOT_DISK_DEVICE_NAME]
        [--boot-disk-interface=BOOT_DISK_INTERFACE]
        [--boot-disk-kms-key-service-account=BOOT_DISK_KMS_KEY_SERVICE_ACCOUNT]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS]
        [--boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--boot-disk-size=BOOT_DISK_SIZE] [--boot-disk-type=BOOT_DISK_TYPE]
        [--can-ip-forward] [--configure-disk=[PROPERTY=VALUE,...]]
        [--create-disk=[PROPERTY=VALUE,...]] [--description=DESCRIPTION]
        [--discard-local-ssds-at-termination-timestamp=DISCARD_LOCAL_SSDS_AT_TERMINATION_TIMESTAMP]
        [--disk=[auto-delete=AUTO-DELETE],[boot=BOOT],[device-name=DEVICE-NAME],
          [interface=INTERFACE],[mode=MODE],[name=NAME]]
        [--enable-display-device] [--[no-]enable-nested-virtualization]
        [--[no-]enable-uefi-networking] [--enable-watchdog-timer]
        [--[no-]expose-host-topology]
        [--external-ipv6-address=EXTERNAL_IPV6_ADDRESS]
        [--external-ipv6-prefix-length=EXTERNAL_IPV6_PREFIX_LENGTH]
        [--graceful-shutdown]
        [--graceful-shutdown-max-duration=GRACEFUL_SHUTDOWN_MAX_DURATION]
        [--host-error-timeout-seconds=HOST_ERROR_TIMEOUT_SECONDS]
        [--identity=IDENTITY] [--[no-]identity-certificate]
        [--identity-type=IDENTITY_TYPE]
        [--instance-template-region=INSTANCE_TEMPLATE_REGION]
        [--instance-termination-action=INSTANCE_TERMINATION_ACTION]
        [--internal-ipv6-address=INTERNAL_IPV6_ADDRESS]
        [--internal-ipv6-prefix-length=INTERNAL_IPV6_PREFIX_LENGTH]
        [--ipv6-address=IPV6_ADDRESS] [--ipv6-network-tier=IPV6_NETWORK_TIER]
        [--ipv6-prefix-length=IPV6_PREFIX_LENGTH]
        [--key-revocation-action-type=POLICY] [--labels=[KEY=VALUE,...]]
        [--[no-]latency-tolerant] [--local-nvdimm=[size=SIZE]]
        [--local-ssd=[device-name=DEVICE-NAME],
          [interface=INTERFACE],[size=SIZE]]
        [--local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT]
        [--machine-type=MACHINE_TYPE]
        [--maintenance-interval=MAINTENANCE_INTERVAL]
        [--max-run-duration=MAX_RUN_DURATION]
        [--mesh=[gke-cluster=GKE-CLUSTER],[workload=WORKLOAD]]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-cpu-platform=PLATFORM] [--min-node-cpu=MIN_NODE_CPU]
        [--network=NETWORK] [--network-interface=[PROPERTY=VALUE,...]]
        [--network-performance-configs=[PROPERTY=VALUE,...]]
        [--network-tier=NETWORK_TIER] [--numa-node-count=NUMA_NODE_COUNT]
        [--partner-metadata=[NAMESPACE/KEY=VALUE,...]]
        [--partner-metadata-from-file=LOCAL_FILE_PATH]
        [--performance-monitoring-unit=PERFORMANCE_MONITORING_UNIT]
        [--post-key-revocation-action-type=POLICY] [--preemptible]
        [--preemption-notice-duration=PREEMPTION_NOTICE_DURATION]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--private-network-ip=PRIVATE_NETWORK_IP]
        [--provisioning-model=PROVISIONING_MODEL] [--region=REGION]
        [--resource-manager-tags=[KEY=VALUE,...]]
        [--resource-policies=[RESOURCE_POLICY,...]] [--no-restart-on-failure]
        [--shielded-integrity-monitoring] [--shielded-secure-boot]
        [--shielded-vtpm] [--[no-]skip-guest-os-shutdown]
        [--source-instance=SOURCE_INSTANCE]
        [--source-instance-zone=SOURCE_INSTANCE_ZONE] [--stack-type=STACK_TYPE]
        [--subnet=SUBNET] [--subnet-region=SUBNET_REGION]
        [--svsm-config=[PROPERTY=VALUE,...]] [--tags=TAG,[TAG,...]]
        [--termination-time=TERMINATION_TIME]
        [--threads-per-core=THREADS_PER_CORE] [--turbo-mode=TURBO_MODE]
        [--visible-core-count=VISIBLE_CORE_COUNT] [--vsock-mode=VSOCK_MODE]
        [--windows-license-optimization-mode=WINDOWS_LICENSE_OPTIMIZATION_MODE]
        [--address=ADDRESS | --no-address]
        [--boot-disk-kms-key=BOOT_DISK_KMS_KEY
          : --boot-disk-kms-keyring=BOOT_DISK_KMS_KEYRING
          --boot-disk-kms-location=BOOT_DISK_KMS_LOCATION
          --boot-disk-kms-project=BOOT_DISK_KMS_PROJECT]
        [--confidential-compute
          | --confidential-compute-type=CONFIDENTIAL_COMPUTE_TYPE]
        [--custom-cpu=CUSTOM_CPU --custom-memory=CUSTOM_MEMORY
          : --custom-extensions --custom-vm-type=CUSTOM_VM_TYPE]
        [--image-project=IMAGE_PROJECT --image=IMAGE
          | --image-family=IMAGE_FAMILY]
        [--maintenance-policy=MAINTENANCE_POLICY
          | --on-host-maintenance=MAINTENANCE_POLICY]
        [--node=NODE | --node-affinity-file=PATH_TO_FILE
          | --node-group=NODE_GROUP]
        [--reservation=RESERVATION
          --reservation-affinity=RESERVATION_AFFINITY; default="any"]
        [--scopes=[SCOPE,...] | --no-scopes]
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [--service-proxy=[enabled],[intercept-all-outbound-traffic],
          [intercept-dns],[use-regional-control-plane],[access-log=ACCESS-LOG],
          [envoy-bootstrap=ENVOY-BOOTSTRAP],
          [exclude-outbound-ip-ranges=EXCLUDE-OUTBOUND-IP-RANGES],
          [exclude-outbound-port-ranges=EXCLUDE-OUTBOUND-PORT-RANGES],
          [mesh=MESH],[network=NETWORK],[project-number=PROJECT-NUMBER],
          [proxy-port=PROXY-PORT],[scope=SCOPE],
          [serving-ports=SERVING-PORTS],[source=SOURCE],[tracing=TRACING]
          --service-proxy-labels=[KEY=VALUE, ...,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates create-with-container

```text
NAME
    gcloud alpha compute instance-templates create-with-container - creates a
        Compute Engine a virtual machine instance template that runs a Docker
        container

SYNOPSIS
    gcloud alpha compute instance-templates create-with-container NAME
        [--accelerator=[count=COUNT],[type=TYPE]] [--no-boot-disk-auto-delete]
        [--boot-disk-device-name=BOOT_DISK_DEVICE_NAME]
        [--boot-disk-interface=BOOT_DISK_INTERFACE]
        [--boot-disk-provisioned-iops=BOOT_DISK_PROVISIONED_IOPS]
        [--boot-disk-provisioned-throughput=BOOT_DISK_PROVISIONED_THROUGHPUT]
        [--boot-disk-size=BOOT_DISK_SIZE] [--boot-disk-type=BOOT_DISK_TYPE]
        [--can-ip-forward] [--container-arg=CONTAINER_ARG]
        [--container-command=CONTAINER_COMMAND]
        [--container-env=[KEY=VALUE, ...,...]]
        [--container-env-file=CONTAINER_ENV_FILE]
        [--container-image=CONTAINER_IMAGE]
        [--container-mount-disk=[mode=MODE],
          [mount-path=MOUNT-PATH],[name=NAME],[partition=PARTITION]]
        [--container-mount-host-path=[host-path=HOSTPATH,
          mount-path=MOUNTPATH[,mode=MODE],...]]
        [--container-mount-tmpfs=[mount-path=MOUNTPATH,...]]
        [--container-privileged]
        [--container-restart-policy=POLICY; default="always"]
        [--container-stdin] [--container-tty]
        [--create-disk=[PROPERTY=VALUE,...]] [--description=DESCRIPTION]
        [--disk=[auto-delete=AUTO-DELETE],[boot=BOOT],[device-name=DEVICE-NAME],
          [interface=INTERFACE],[mode=MODE],[name=NAME]]
        [--external-ipv6-address=EXTERNAL_IPV6_ADDRESS]
        [--external-ipv6-prefix-length=EXTERNAL_IPV6_PREFIX_LENGTH]
        [--identity=IDENTITY] [--[no-]identity-certificate]
        [--identity-type=IDENTITY_TYPE]
        [--internal-ipv6-address=INTERNAL_IPV6_ADDRESS]
        [--internal-ipv6-prefix-length=INTERNAL_IPV6_PREFIX_LENGTH]
        [--ipv6-address=IPV6_ADDRESS] [--ipv6-network-tier=IPV6_NETWORK_TIER]
        [--ipv6-prefix-length=IPV6_PREFIX_LENGTH] [--labels=[KEY=VALUE,...]]
        [--local-nvdimm=[size=SIZE]]
        [--local-ssd=[device-name=DEVICE-NAME],
          [interface=INTERFACE],[size=SIZE]] [--machine-type=MACHINE_TYPE]
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]]
        [--min-cpu-platform=PLATFORM] [--network=NETWORK]
        [--network-interface=[PROPERTY=VALUE,...]]
        [--network-tier=NETWORK_TIER] [--preemptible]
        [--private-ipv6-google-access-type=PRIVATE_IPV6_GOOGLE_ACCESS_TYPE]
        [--private-network-ip=PRIVATE_NETWORK_IP]
        [--provisioning-model=PROVISIONING_MODEL] [--region=REGION]
        [--resource-policies=[RESOURCE_POLICY,...]] [--no-restart-on-failure]
        [--shielded-integrity-monitoring] [--shielded-secure-boot]
        [--shielded-vtpm] [--[no-]skip-guest-os-shutdown]
        [--stack-type=STACK_TYPE] [--subnet=SUBNET]
        [--subnet-region=SUBNET_REGION] [--tags=TAG,[TAG,...]]
        [--vsock-mode=VSOCK_MODE] [--address=ADDRESS | --no-address]
        [--confidential-compute
          | --confidential-compute-type=CONFIDENTIAL_COMPUTE_TYPE]
        [--custom-cpu=CUSTOM_CPU --custom-memory=CUSTOM_MEMORY
          : --custom-extensions --custom-vm-type=CUSTOM_VM_TYPE]
        [--image-project=IMAGE_PROJECT --image=IMAGE
          | --image-family=IMAGE_FAMILY]
        [--maintenance-policy=MAINTENANCE_POLICY
          | --on-host-maintenance=MAINTENANCE_POLICY]
        [--reservation=RESERVATION
          --reservation-affinity=RESERVATION_AFFINITY; default="any"]
        [--scopes=[SCOPE,...] | --no-scopes]
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates delete

```text
NAME
    gcloud alpha compute instance-templates delete - delete Compute Engine
        virtual machine instance templates

SYNOPSIS
    gcloud alpha compute instance-templates delete NAME [NAME ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates describe

```text
NAME
    gcloud alpha compute instance-templates describe - describe a virtual
        machine instance template

SYNOPSIS
    gcloud alpha compute instance-templates describe NAME [--view=VIEW]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates export

```text
NAME
    gcloud alpha compute instance-templates export - export an instance
        template

SYNOPSIS
    gcloud alpha compute instance-templates export NAME
        [--destination=DESTINATION] [--endpoint-mode=ENDPOINT_MODE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates get-iam-policy

```text
NAME
    gcloud alpha compute instance-templates get-iam-policy - get the IAM policy
        for a Compute Engine instance template

SYNOPSIS
    gcloud alpha compute instance-templates get-iam-policy INSTANCE_TEMPLATE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates import

```text
NAME
    gcloud alpha compute instance-templates import - import an instance
        template

SYNOPSIS
    gcloud alpha compute instance-templates import NAME
        [--endpoint-mode=ENDPOINT_MODE] [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates list

```text
NAME
    gcloud alpha compute instance-templates list - list Google Compute Engine
        instance templates

SYNOPSIS
    gcloud alpha compute instance-templates list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--view=VIEW]
        [--global | --regions=[REGION,...]] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates remove-iam-policy-binding

```text
NAME
    gcloud alpha compute instance-templates remove-iam-policy-binding - remove
        IAM policy binding from a Compute Engine instance template

SYNOPSIS
    gcloud alpha compute instance-templates remove-iam-policy-binding
        INSTANCE_TEMPLATE --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates set-iam-policy

```text
NAME
    gcloud alpha compute instance-templates set-iam-policy - set the IAM policy
        for a Compute Engine instance template

SYNOPSIS
    gcloud alpha compute instance-templates set-iam-policy INSTANCE_TEMPLATE
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-templates test-iam-permissions

```text
NAME
    gcloud alpha compute instance-templates test-iam-permissions - test IAM
        permissions for a Compute Engine instance template

SYNOPSIS
    gcloud alpha compute instance-templates test-iam-permissions
        INSTANCE_TEMPLATE --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-templates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
