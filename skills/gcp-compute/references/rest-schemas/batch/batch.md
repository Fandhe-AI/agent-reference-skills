---
source: https://batch.googleapis.com/$discovery/rest?version=v1
---

# Batch API message schemas (batch)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/batch/`.

### `Accelerator`

- Accelerator describes Compute Engine accelerators to be attached to the VM.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | The number of accelerators of this type. |
| `driverVersion` | string | Optional. The NVIDIA GPU driver version that should be installed for this type. You can define the specific driver version such as "470.103.01", following the driver version requirements in https://cloud.google.com/compute/docs/gpus/install-drivers-gpu#minimum-driver. Batch will install the specific accelerator driver if qualified. |
| `installGpuDrivers` | boolean | Deprecated: please use instances\[0\].install_gpu_drivers instead. |
| `type` | string | The accelerator type. For example, "nvidia-tesla-t4". See `gcloud compute accelerator-types list`. |

### `ActionCondition`

- Conditions for actions to deal with task failures.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exitCodes` | array<integer> | Exit codes of a task execution. If there are more than 1 exit codes, when task executes with any of the exit code in the list, the condition is met and the action will be executed. |

### `AgentContainer`

- Container runnable representation on the agent side.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commands` | array<string> | Overrides the `CMD` specified in the container. If there is an ENTRYPOINT (either in the container image or with the entrypoint field below) then commands are appended as arguments to the ENTRYPOINT. |
| `entrypoint` | string | Overrides the `ENTRYPOINT` specified in the container. |
| `imageUri` | string | The URI to pull the container image from. |
| `options` | string | Arbitrary additional options to include in the "docker run" command when running this container, e.g. "--network host". |
| `volumes` | array<string> | Volumes to mount (bind mount) from the host machine files or directories into the container, formatted to match docker run's --volume option, e.g. /foo:/bar, or /foo:/bar:ro |

### `AgentEnvironment`

- AgentEnvironment is the Environment representation between Agent and CLH communication. The environment is used in both task level and agent level.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptedVariables` | AgentKMSEnvMap | An encrypted JSON dictionary where the key/value pairs correspond to environment variable names and their values. |
| `secretVariables` | object | A map of environment variable names to Secret Manager secret names. The VM will access the named secrets to set the value of each environment variable. |
| `variables` | object | A map of environment variable names to values. |

### `AgentInfo`

- VM Agent Info.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobId` | string | Optional. The assigned Job ID |
| `reportTime` | string (google-datetime) | When the AgentInfo is generated. |
| `state` | string enum | Agent state. Values: `AGENT_STATE_UNSPECIFIED`, `AGENT_STARTING`, `AGENT_RUNNING`, `AGENT_STOPPED`. |
| `taskGroupId` | string | The assigned task group ID. |
| `tasks` | array<AgentTaskInfo> | Task Info. |

### `AgentKMSEnvMap`

- AgentKMSEnvMap contains the encrypted key/value pair to be used in the environment on the Agent side.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cipherText` | string | The value of the cipherText response from the `encrypt` method. |
| `keyName` | string | The name of the KMS key that will be used to decrypt the cipher text. |

### `AgentMetadata`

- VM Agent Metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTime` | string (google-datetime) | When the VM agent started. Use agent_startup_time instead. |
| `creator` | string | Full name of the entity that created this vm. For MIG, this path is: projects/{project}/regions/{region}/InstanceGroupManagers/{igm} The value is retrieved from the vm metadata key of "created-by". |
| `imageVersion` | string | image version for the VM that this agent is installed on. |
| `instance` | string | GCP instance name ((internal link)). |
| `instanceId` | string (uint64) | GCP instance ID ((internal link)). |
| `instancePreemptionNoticeReceived` | boolean | If the GCP instance has received preemption notice. |
| `machineType` | string | Optional. machine type of the VM |
| `osRelease` | object | parsed contents of /etc/os-release |
| `version` | string | agent binary version running on VM |
| `zone` | string | Agent zone. |

### `AgentScript`

- Script runnable representation on the agent side.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | Script file path on the host VM. To specify an interpreter, please add a `#!`(also known as shebang line (https://en.wikipedia.org/wiki/Shebang\_(Unix))) as the first line of the file.(For example, to execute the script using bash, `#!/bin/bash` should be the first line of the file. To execute the script using`Python3`, `#!/usr/bin/env python3` should be the first line of the file.) Otherwise, the file will by default be executed by `/bin/sh`. |
| `text` | string | Shell script text. To specify an interpreter, please add a `#!\n` at the beginning of the text.(For example, to execute the script using bash, `#!/bin/bash\n` should be added. To execute the script using`Python3`, `#!/usr/bin/env python3\n` should be added.) Otherwise, the script will by default be executed by `/bin/sh`. |

### `AgentTask`

- TODO(b/182501497) The message needs to be redefined when the Agent API server updates data in storage per the backend design.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentTaskSpec` | AgentTaskSpec | AgentTaskSpec is the taskSpec representation between Agent and CLH communication. This field will replace the TaskSpec field above in future to have a better separation between user-facaing API and internal API. |
| `intendedState` | string enum | The intended state of the task. Values: `INTENDED_STATE_UNSPECIFIED`, `ASSIGNED`, `CANCELLED`, `DELETED`. |
| `reachedBarrier` | string (int64) | The highest barrier reached by all tasks in the task's TaskGroup. |
| `spec` | TaskSpec | Task Spec. This field will be replaced by agent_task_spec below in future. |
| `status` | TaskStatus | Task status. |
| `task` | string | Task name. |
| `taskSource` | string enum | TaskSource represents the source of the task. Values: `TASK_SOURCE_UNSPECIFIED`, `BATCH_INTERNAL`, `USER`. |

### `AgentTaskInfo`

- Task Info
- Version: v1

| Field | Type | Description |
|---|---|---|
| `runnable` | string (int64) | The highest index of a runnable started by the agent for this task. The runnables are indexed from 1. Value 0 is undefined. |
| `taskId` | string | ID of the Task |
| `taskStatus` | TaskStatus | The status of the Task. If we need agent specific fields we should fork the public TaskStatus into an agent specific one. Or add them below. |

### `AgentTaskLoggingOption`

- AgentTaskLoggingOption contains the options for the logging of the task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | Labels to be added to the log entry. Now only cloud logging is supported. |

### `AgentTaskRunnable`

- AgentTaskRunnable is the Runnable representation between Agent and CLH communication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alwaysRun` | boolean | By default, after a Runnable fails, no further Runnable are executed. This flag indicates that this Runnable must be run even if the Task has already failed. This is useful for Runnables that copy output files off of the VM or for debugging. The always_run flag does not override the Task's overall max_run_duration. If the max_run_duration has expired then no further Runnables will execute, not even always_run Runnables. |
| `background` | boolean | This flag allows a Runnable to continue running in the background while the Task executes subsequent Runnables. This is useful to provide services to other Runnables (or to provide debugging support tools like SSH servers). |
| `container` | AgentContainer | Container runnable. |
| `environment` | AgentEnvironment | Environment variables for this Runnable (overrides variables set for the whole Task or TaskGroup). |
| `ignoreExitStatus` | boolean | Normally, a non-zero exit status causes the Task to fail. This flag allows execution of other Runnables to continue instead. |
| `script` | AgentScript | Script runnable. |
| `timeout` | string (google-duration) | Timeout for this Runnable. |

### `AgentTaskSpec`

- AgentTaskSpec is the user's TaskSpec representation between Agent and CLH communication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `environment` | AgentEnvironment | Environment variables to set before running the Task. |
| `loggingOption` | AgentTaskLoggingOption | Logging option for the task. |
| `maxRunDuration` | string (google-duration) | Maximum duration the task should run before being automatically retried (if enabled) or automatically failed. Format the value of this field as a time limit in seconds followed by `s`—for example, `3600s` for 1 hour. The field accepts any value between 0 and the maximum listed for the `Duration` field type at https://protobuf.dev/reference/protobuf/google.protobuf/#duration; however, the actual maximum run time for a job will be limited to the maximum run time for a job listed at https://cloud.google.com/batch/quotas#max-job-duration. |
| `runnables` | array<AgentTaskRunnable> | AgentTaskRunnable is runanbles that will be executed on the agent. |
| `userAccount` | AgentTaskUserAccount | User account on the VM to run the runnables in the agentTaskSpec. If not set, the runnable will be run under root user. |

### `AgentTaskUserAccount`

- AgentTaskUserAccount contains the information of a POSIX account on the guest os which is used to execute the runnables.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gid` | string (int64) | gid id an unique identifier of the POSIX account group corresponding to the user account. |
| `uid` | string (int64) | uid is an unique identifier of the POSIX account corresponding to the user account. |

### `AgentTimingInfo`

- VM timing information
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentStartupTime` | string (google-datetime) | Agent startup time |
| `bootTime` | string (google-datetime) | Boot timestamp of the VM OS |
| `scriptStartupTime` | string (google-datetime) | Startup time of the Batch VM script. |

### `AllocationPolicy`

- A Job's resource allocation policy describes when, where, and how compute resources should be allocated for the Job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceFlexibilityPolicy` | InstanceFlexibilityPolicy | Optional. The instance flexibility policy for the job. This configuration overrides the `instances` configuration. Only allowed in job level. Not allowed in task group level. |
| `instances` | array<InstancePolicyOrTemplate> | Describe instances that can be created by this AllocationPolicy. Only instances\[0\] is supported now. |
| `labels` | object | Custom labels to apply to the job and all the Compute Engine resources that both are created by this allocation policy and support labels. Use labels to group and describe the resources they are applied to. Batch automatically applies predefined labels and supports multiple `labels` fields for each job, which each let you apply custom labels to various resources. Label names that start with "goog-" or "google-" are reserved for predefined labels. For more information about labels with Batch, see Organize resources using labels (https://cloud.google.com/batch/docs/organize-resources-using-labels). |
| `location` | LocationPolicy | Location where compute resources should be allocated for the Job. |
| `network` | NetworkPolicy | The network policy. If you define an instance template in the `InstancePolicyOrTemplate` field, Batch will use the network settings in the instance template instead of this field. |
| `placement` | PlacementPolicy | The placement policy. |
| `serviceAccount` | ServiceAccount | Defines the service account for Batch-created VMs. If omitted, the default Compute Engine service account (https://cloud.google.com/compute/docs/access/service-accounts#default_service_account) is used. Must match the service account specified in any used instance template configured in the Batch job. Includes the following fields: \* email: The service account's email address. If not set, the default Compute Engine service account is used. \* scopes: Additional OAuth scopes to grant the service account, beyond the default cloud-platform scope. (list of strings) |
| `tags` | array<string> | Optional. Tags applied to the VM instances. The tags identify valid sources or targets for network firewalls. Each tag must be 1-63 characters long, and comply with RFC1035 (https://www.ietf.org/rfc/rfc1035.txt). |

### `AttachedDisk`

- A new or an existing persistent disk (PD) or a local ssd attached to a VM instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deviceName` | string | Device name that the guest operating system will see. It is used by Runnable.volumes field to mount disks. So please specify the device_name if you want Batch to help mount the disk, and it should match the device_name field in volumes. |
| `existingDisk` | string | Name of an existing PD. |
| `newDisk` | Disk | — |

### `Barrier`

- A barrier runnable automatically blocks the execution of subsequent runnables until all the tasks in the task group reach the barrier.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Barriers are identified by their index in runnable list. Names are not required, but if present should be an identifier. |

### `CancelJobRequest`

- CancelJob Request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CloudLoggingOption`

- `CloudLoggingOption` contains additional settings for Cloud Logging logs generated by Batch job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `useGenericTaskMonitoredResource` | boolean | Optional. Set this field to `true` to change the monitored resource type (https://cloud.google.com/monitoring/api/resources) for Cloud Logging logs generated by this Batch job from the `batch.googleapis.com/Job` (https://cloud.google.com/monitoring/api/resources#tag_batch.googleapis.com/Job) type to the formerly used `generic_task` (https://cloud.google.com/monitoring/api/resources#tag_generic_task) type. |

### `ComputeResource`

- Compute resource requirements. ComputeResource defines the amount of resources required for each task. Make sure your tasks have enough resources to successfully run. If you also define the types of resources for a job to use with the InstancePolicyOrTemplate (https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicyortemplate) field, make sure both fields are compatible with each other.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bootDiskMib` | string (int64) | Extra boot disk size in MiB for each task. |
| `cpuMilli` | string (int64) | The milliCPU count. `cpuMilli` defines the amount of CPU resources per task in milliCPU units. For example, `1000` corresponds to 1 vCPU per task. If undefined, the default value is `2000`. If you also define the VM's machine type using the `machineType` in InstancePolicy (https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicy) field or inside the `instanceTemplate` in the InstancePolicyOrTemplate (https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicyortemplate) field, make sure the CPU resources for both fields are compatible with each other and with how many tasks you want to allow to run on the same VM at the same time. For example, if you specify the `n2-standard-2` machine type, which has 2 vCPUs each, you are recommended to set `cpuMilli` no more than `2000`, or you are recommended to run two tasks on the same VM if you set `cpuMilli` to `1000` or less. |
| `memoryMib` | string (int64) | Memory in MiB. `memoryMib` defines the amount of memory per task in MiB units. If undefined, the default value is `2000`. If you also define the VM's machine type using the `machineType` in InstancePolicy (https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicy) field or inside the `instanceTemplate` in the InstancePolicyOrTemplate (https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicyortemplate) field, make sure the memory resources for both fields are compatible with each other and with how many tasks you want to allow to run on the same VM at the same time. For example, if you specify the `n2-standard-2` machine type, which has 8 GiB each, you are recommended to set `memoryMib` to no more than `8192`, or you are recommended to run two tasks on the same VM if you set `memoryMib` to `4096` or less. |

### `Container`

- Container runnable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `blockExternalNetwork` | boolean | If set to true, external network access to and from container will be blocked, containers that are with block_external_network as true can still communicate with each other, network cannot be specified in the `container.options` field. |
| `commands` | array<string> | Required for some container images. Overrides the `CMD` specified in the container. If there is an `ENTRYPOINT` (either in the container image or with the `entrypoint` field below) then these commands are appended as arguments to the `ENTRYPOINT`. |
| `enableImageStreaming` | boolean | Optional. If set to true, this container runnable uses Image streaming. Use Image streaming to allow the runnable to initialize without waiting for the entire container image to download, which can significantly reduce startup time for large container images. When `enableImageStreaming` is set to true, the container runtime is containerd (https://containerd.io/) instead of Docker. Additionally, this container runnable only supports the following `container` subfields: `imageUri`, `commands[]`, `entrypoint`, and `volumes[]`; any other `container` subfields are ignored. For more information about the requirements and limitations for using Image streaming with Batch, see the `image-streaming` sample on GitHub (https://github.com/GoogleCloudPlatform/batch-samples/tree/main/api-samples/image-streaming). |
| `entrypoint` | string | Required for some container images. Overrides the `ENTRYPOINT` specified in the container. |
| `imageUri` | string | Required. The URI to pull the container image from. |
| `options` | string | Required for some container images. Arbitrary additional options to include in the `docker run` command when running this container—for example, `--network host`. For the `--volume` option, use the `volumes` field for the container. |
| `password` | string | Required if the container image is from a private Docker registry. The password to login to the Docker registry that contains the image. For security, it is strongly recommended to specify an encrypted password by using a Secret Manager secret: `projects/*/secrets/*/versions/*`. Warning: If you specify the password using plain text, you risk the password being exposed to any users who can view the job or its logs. To avoid this risk, specify a secret that contains the password instead. Learn more about Secret Manager (https://cloud.google.com/secret-manager/docs/) and using Secret Manager with Batch (https://cloud.google.com/batch/docs/create-run-job-secret-manager). |
| `username` | string | Required if the container image is from a private Docker registry. The username to login to the Docker registry that contains the image. You can either specify the username directly by using plain text or specify an encrypted username by using a Secret Manager secret: `projects/*/secrets/*/versions/*`. However, using a secret is recommended for enhanced security. Caution: If you specify the username using plain text, you risk the username being exposed to any users who can view the job or its logs. To avoid this risk, specify a secret that contains the username instead. Learn more about Secret Manager (https://cloud.google.com/secret-manager/docs/) and using Secret Manager with Batch (https://cloud.google.com/batch/docs/create-run-job-secret-manager). |
| `volumes` | array<string> | Volumes to mount (bind mount) from the host machine files or directories into the container, formatted to match `--volume` option for the `docker run` command—for example, `/foo:/bar` or `/foo:/bar:ro`. If the `TaskSpec.Volumes` field is specified but this field is not, Batch will mount each volume from the host machine to the container with the same mount path by default. In this case, the default mount option for containers will be read-only (`ro`) for existing persistent disks and read-write (`rw`) for other volume types, regardless of the original mount options specified in `TaskSpec.Volumes`. If you need different mount settings, you can explicitly configure them in this field. |

### `Disk`

- A new persistent disk or a local ssd. A VM can only have one local SSD setting but multiple local SSD partitions. See https://cloud.google.com/compute/docs/disks#pdspecs and https://cloud.google.com/compute/docs/disks#localssds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskInterface` | string | Local SSDs are available through both "SCSI" and "NVMe" interfaces. If not indicated, "NVMe" will be the default one for local ssds. This field is ignored for persistent disks as the interface is chosen automatically. See https://cloud.google.com/compute/docs/disks/persistent-disks#choose_an_interface. |
| `image` | string | URL for a VM image to use as the data source for this disk. For example, the following are all valid URLs: \* Specify the image by its family name: projects/{project}/global/images/family/{image_family} \* Specify the image version: projects/{project}/global/images/{image_version} You can also use Batch customized image in short names. The following image values are supported for a boot disk: \* `batch-debian`: use Batch Debian images. \* `batch-cos`: use Batch Container-Optimized images. \* `batch-hpc-rocky`: use Batch HPC Rocky Linux images. |
| `sizeGb` | string (int64) | Disk size in GB. \*\*Non-Boot Disk\*\*: If the `type` specifies a persistent disk, this field is ignored if `data_source` is set as `image` or `snapshot`. If the `type` specifies a local SSD, this field should be a multiple of 375 GB, otherwise, the final size will be the next greater multiple of 375 GB. \*\*Boot Disk\*\*: Batch will calculate the boot disk size based on source image and task requirements if you do not speicify the size. If both this field and the `boot_disk_mib` field in task spec's `compute_resource` are defined, Batch will only honor this field. Also, this field should be no smaller than the source disk's size when the `data_source` is set as `snapshot` or `image`. For example, if you set an image as the `data_source` field and the image's default disk size 30 GB, you can only use this field to make the disk larger or equal to 30 GB. |
| `snapshot` | string | Name of a snapshot used as the data source. Snapshot is not supported as boot disk now. |
| `type` | string | Disk type as shown in `gcloud compute disk-types list`. For example, local SSD uses type "local-ssd". Persistent disks and boot disks use "pd-balanced", "pd-extreme", "pd-ssd" or "pd-standard". If not specified, "pd-standard" will be used as the default type for non-boot disks, "pd-balanced" will be used as the default type for boot disks. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Environment`

- An Environment describes a collection of environment variables to set when executing Tasks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptedVariables` | KMSEnvMap | An encrypted JSON dictionary where the key/value pairs correspond to environment variable names and their values. |
| `secretVariables` | object | A map of environment variable names to Secret Manager secret names. The VM will access the named secrets to set the value of each environment variable. |
| `variables` | object | A map of environment variable names to values. |

### `GCS`

- Represents a Google Cloud Storage volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `remotePath` | string | Remote path, either a bucket name or a subdirectory of a bucket, e.g.: bucket_name, bucket_name/subdirectory/ |

### `InstanceFlexibilityPolicy`

- Allows creating VMs from multiple types of machines. Instance flexibility configuration overrides instances configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceSelections` | object | Required. Named instance selections configuring properties that the group will use when creating new VMs. The map key is a user-specified name for the instance selection. The key must be 1-63 characters long, and comply with RFC1035 (https://www.ietf.org/rfc/rfc1035.txt). Specifically, the key must consist of lowercase letters, numbers, and hyphens. The first character must be a lowercase letter, and the last character must be a lowercase letter or number. The maximum number of instance selections is 50. Exceeding this limit results in a validation error with code `INVALID_ARGUMENT`. |

### `InstancePolicy`

- InstancePolicy describes an instance type and resources attached to each VM created by this InstancePolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accelerators` | array<Accelerator> | The accelerators attached to each VM instance. |
| `bootDisk` | Disk | Boot disk to be created and attached to each VM by this InstancePolicy. Boot disk will be deleted when the VM is deleted. Batch API now only supports booting from image. |
| `disks` | array<AttachedDisk> | Non-boot disks to be attached for each VM created by this InstancePolicy. New disks will be deleted when the VM is deleted. A non-boot disk is a disk that can be of a device with a file system or a raw storage drive that is not ready for data storage and accessing. |
| `machineType` | string | The Compute Engine machine type. |
| `minCpuPlatform` | string | The minimum CPU platform. See https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform. |
| `provisioningModel` | string enum | The provisioning model. Values: `PROVISIONING_MODEL_UNSPECIFIED`, `STANDARD`, `SPOT`, `PREEMPTIBLE`, `RESERVATION_BOUND`, `FLEX_START`. |
| `reservation` | string | Optional. If not specified (default), VMs will consume any applicable reservation. If "NO_RESERVATION" is specified, VMs will not consume any reservation. Otherwise, if specified, VMs will consume only the specified reservation. |

### `InstancePolicyOrTemplate`

- InstancePolicyOrTemplate lets you define the type of resources to use for this job either with an InstancePolicy or an instance template. If undefined, Batch picks the type of VM to use and doesn't include optional VM resources such as GPUs and extra disks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `blockProjectSshKeys` | boolean | Optional. Set this field to `true` if you want Batch to block project-level SSH keys from accessing this job's VMs. Alternatively, you can configure the job to specify a VM instance template that blocks project-level SSH keys. In either case, Batch blocks project-level SSH keys while creating the VMs for this job. Batch allows project-level SSH keys for a job's VMs only if all the following are true: + This field is undefined or set to `false`. + The job's VM instance template (if any) doesn't block project-level SSH keys. Notably, you can override this behavior by manually updating a VM to block or allow project-level SSH keys. For more information about blocking project-level SSH keys, see the Compute Engine documentation: https://cloud.google.com/compute/docs/connect/restrict-ssh-keys#block-keys |
| `installGpuDrivers` | boolean | Set this field true if you want Batch to help fetch drivers from a third party location and install them for GPUs specified in `policy.accelerators` or `instance_template` on your behalf. Default is false. For Container-Optimized Image cases, Batch will install the accelerator driver following milestones of https://cloud.google.com/container-optimized-os/docs/release-notes. For non Container-Optimized Image cases, following https://github.com/GoogleCloudPlatform/compute-gpu-installation/blob/main/linux/install_gpu_driver.py. |
| `installOpsAgent` | boolean | Optional. Set this field true if you want Batch to install Ops Agent on your behalf. Default is false. |
| `instanceTemplate` | string | An instance template used to create VMs. Batch supports global and regional instance templates from the same project as the job. In case of a regional instance template, the job and the instance template must be in the same region. As shown in the following examples, you can specify the instance template as either only its ID, only its name (not unique), or a partial or full URL. If you specify only its name, then Batch checks for a global instance template first. The following formats are valid for global instance templates: \* `{instance_template_id_number}` \* `{instance_template_name}` (not unique) \* `projects/{project}/global/instanceTemplates/{instance_template_id_number}` \* `projects/{project}/global/instanceTemplates/{instance_template_name}` \* `https://www.googleapis.com/compute/v1/projects/{project}/global/instanceTemplates/{instance_template_id_number}` \* `https://www.googleapis.com/compute/v1/projects/{project}/global/instanceTemplates/{instance_template_name}` The following formats are valid for regional instance templates: \* `{instance_template_id_number}` \* `{instance_template_name}` (not unique) \* `projects/{project}/regions/{region}/instanceTemplates/{instance_template_id_number}` \* `projects/{project}/regions/{region}/instanceTemplates/{instance_template_name}` \* `https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceTemplates/{instance_template_id_number}` \* `https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceTemplates/{instance_template_name}` |
| `policy` | InstancePolicy | InstancePolicy. |

### `InstanceSelection`

- Defines an instance selection for a given instance flexibility policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `machineTypes` | array<string> | Required. The Compute Engine machine type IDs. Only the machine type ID is supported, such as `n1-standard-16`. Full or partial URLs are not accepted. The total maximum number of machine types across all instance selections is 200. Exceeding this limit results in a validation error with code `INVALID_ARGUMENT`. |
| `rank` | integer (int32) | Optional. Indicates the preference of this instance selection. Lower number means higher preference. First try is to create a VM based on the machine-type with lowest rank and fallback to next rank based on availability. Machine types and instance selections with the same rank have the same preference. |

### `InstanceStatus`

- VM instance status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bootDisk` | Disk | The VM boot disk. |
| `machineType` | string | The Compute Engine machine type. |
| `provisioningModel` | string enum | The VM instance provisioning model. Values: `PROVISIONING_MODEL_UNSPECIFIED`, `STANDARD`, `SPOT`, `PREEMPTIBLE`, `RESERVATION_BOUND`, `FLEX_START`. |
| `taskPack` | string (int64) | The max number of tasks can be assigned to this instance type. |

### `Job`

- The Cloud Batch Job description.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocationPolicy` | AllocationPolicy | Compute resource allocation for all TaskGroups in the Job. |
| `createTime` | string (google-datetime) | Output only. When the Job was created. |
| `labels` | object | Custom labels to apply to the job and any Cloud Logging LogEntry (https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry) that it generates. Use labels to group and describe the resources they are applied to. Batch automatically applies predefined labels and supports multiple `labels` fields for each job, which each let you apply custom labels to various resources. Label names that start with "goog-" or "google-" are reserved for predefined labels. For more information about labels with Batch, see Organize resources using labels (https://cloud.google.com/batch/docs/organize-resources-using-labels). |
| `logsPolicy` | LogsPolicy | Log preservation policy for the Job. |
| `name` | string | Output only. Job name. For example: "projects/123456/locations/us-central1/jobs/job01". |
| `notifications` | array<JobNotification> | Notification configurations. |
| `priority` | string (int64) | Priority of the Job. The valid value range is \[0, 100). Default value is 0. Higher value indicates higher priority. A job with higher priority value is more likely to run earlier if all other requirements are satisfied. |
| `status` | JobStatus | Output only. Job status. It is read only for users. |
| `taskGroups` | array<TaskGroup> | Required. TaskGroups in the Job. Only one TaskGroup is supported now. |
| `uid` | string | Output only. A system generated unique ID for the Job. |
| `updateTime` | string (google-datetime) | Output only. The last time the Job was updated. |

### `JobNotification`

- Notification configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | Message | The attribute requirements of messages to be sent to this Pub/Sub topic. Without this field, no message will be sent. |
| `pubsubTopic` | string | The Pub/Sub topic where notifications for the job, like state changes, will be published. If undefined, no Pub/Sub notifications are sent for this job. Specify the topic using the following format: `projects/{project}/topics/{topic}`. Notably, if you want to specify a Pub/Sub topic that is in a different project than the job, your administrator must grant your project's Batch service agent permission to publish to that topic. For more information about configuring Pub/Sub notifications for a job, see https://cloud.google.com/batch/docs/enable-notifications. |

### `JobStatus`

- Job status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `runDuration` | string (google-duration) | The duration of time that the Job spent in status RUNNING. |
| `state` | string enum | Job state Values: `STATE_UNSPECIFIED`, `QUEUED`, `SCHEDULED`, `RUNNING`, `SUCCEEDED`, `FAILED`, `DELETION_IN_PROGRESS`, `CANCELLATION_IN_PROGRESS`, `CANCELLED`. |
| `statusEvents` | array<StatusEvent> | Job status events |
| `taskGroups` | object | Aggregated task status for each TaskGroup in the Job. The map key is TaskGroup ID. |

### `KMSEnvMap`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cipherText` | string | The value of the cipherText response from the `encrypt` method. |
| `keyName` | string | The name of the KMS key that will be used to decrypt the cipher text. |

### `LifecyclePolicy`

- LifecyclePolicy describes how to deal with task failures based on different conditions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Action to execute when ActionCondition is true. When RETRY_TASK is specified, we will retry failed tasks if we notice any exit code match and fail tasks if no match is found. Likewise, when FAIL_TASK is specified, we will fail tasks if we notice any exit code match and retry tasks if no match is found. Values: `ACTION_UNSPECIFIED`, `RETRY_TASK`, `FAIL_TASK`. |
| `actionCondition` | ActionCondition | Conditions that decide why a task failure is dealt with a specific action. |

### `ListJobsResponse`

- ListJob Response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobs` | array<Job> | Jobs. |
| `nextPageToken` | string | Next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListTasksResponse`

- ListTasks Response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Next page token. |
| `tasks` | array<Task> | Tasks. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `LocationPolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedLocations` | array<string> | A list of location names that are allowed for the job's VMs formatted as URLs. Each location can be a region or a zone, but you can only specify one region or multiple zones in one region per job. For example, `["regions/us-central1"]` allow VMs in any zones in region `us-central1`, and `["zones/us-central1-a", "zones/us-central1-c"]` only allow VMs in zones `us-central1-a` and `us-central1-c`. However, `["regions/us-central1", "zones/us-central1-a", "zones/us-central1-b", "zones/us-west1-a"]` causes an error because it contains multiple regions (`us-central1` and `us-west1`). The specified region or zones must be in the same region in which the job is created starting on the following dates: + For projects that have successfully submitted before July 31, 2026 at least one job that uses the `allowedLocations[]` field with any region or zones outside of the job's location, the changes are starting on \_June 30, 2027\_. + For all other projects, the changes are starting on \_July 31, 2026\_. For example, for job `projects/123/locations/us-central1/jobs/jobid`, the specified region or zones must be in `us-central1`. Using a different region (e.g. `regions/us-west1`) or a zone not in `us-central1` (e.g. `zones/us-west1-a`) causes an error. |

### `LogsPolicy`

- LogsPolicy describes if and how a job's logs are preserved. Logs include information that is automatically written by the Batch service agent and any information that you configured the job's runnables to write to the `stdout` or `stderr` streams.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudLoggingOption` | CloudLoggingOption | Optional. When `destination` is set to `CLOUD_LOGGING`, you can optionally set this field to configure additional settings for Cloud Logging. |
| `destination` | string enum | If and where logs should be saved. Values: `DESTINATION_UNSPECIFIED`, `CLOUD_LOGGING`, `PATH`. |
| `logsPath` | string | When `destination` is set to `PATH`, you must set this field to the path where you want logs to be saved. This path can point to a local directory on the VM or (if congifured) a directory under the mount path of any Cloud Storage bucket, network file system (NFS), or writable persistent disk that is mounted to the job. For example, if the job has a bucket with `mountPath` set to `/mnt/disks/my-bucket`, you can write logs to the root directory of the `remotePath` of that bucket by setting this field to `/mnt/disks/my-bucket/`. |

### `Message`

- Message details. Describe the conditions under which messages will be sent. If no attribute is defined, no message will be sent by default. One message should specify either the job or the task level attributes, but not both. For example, job level: JOB_STATE_CHANGED and/or a specified new_job_state; task level: TASK_STATE_CHANGED and/or a specified new_task_state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `newJobState` | string enum | The new job state. Values: `STATE_UNSPECIFIED`, `QUEUED`, `SCHEDULED`, `RUNNING`, `SUCCEEDED`, `FAILED`, `DELETION_IN_PROGRESS`, `CANCELLATION_IN_PROGRESS`, `CANCELLED`. |
| `newTaskState` | string enum | The new task state. Values: `STATE_UNSPECIFIED`, `PENDING`, `ASSIGNED`, `RUNNING`, `FAILED`, `SUCCEEDED`, `UNEXECUTED`. |
| `type` | string enum | The message type. Values: `TYPE_UNSPECIFIED`, `JOB_STATE_CHANGED`, `TASK_STATE_CHANGED`. |

### `NFS`

- Represents an NFS volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `remotePath` | string | Remote source path exported from the NFS, e.g., "/share". |
| `server` | string | The IP address of the NFS. |

### `NetworkInterface`

- A network interface.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | The URL of an existing network resource. You can specify the network as a full or partial URL. For example, the following are all valid URLs: \* https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network} \* projects/{project}/global/networks/{network} \* global/networks/{network} |
| `nicType` | string enum | Optional. The NIC type of the network interface. Values: `NIC_TYPE_UNSPECIFIED`, `GVNIC`, `IRDMA`, `MRDMA`. |
| `noExternalIpAddress` | boolean | Default is false (with an external IP address). Required if no external public IP address is attached to the VM. If no external public IP address, additional configuration is required to allow the VM to access Google Services. See https://cloud.google.com/vpc/docs/configure-private-google-access and https://cloud.google.com/nat/docs/gce-example#create-nat for more information. |
| `subnetwork` | string | The URL of an existing subnetwork resource in the network. You can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs: \* https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/subnetworks/{subnetwork} \* projects/{project}/regions/{region}/subnetworks/{subnetwork} \* regions/{region}/subnetworks/{subnetwork} |

### `NetworkPolicy`

- NetworkPolicy describes VM instance network configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkInterfaces` | array<NetworkInterface> | Network configurations. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `PlacementPolicy`

- PlacementPolicy describes a group placement policy for the VMs controlled by this AllocationPolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collocation` | string | UNSPECIFIED vs. COLLOCATED (default UNSPECIFIED). Use COLLOCATED when you want VMs to be located close to each other for low network latency between the VMs. No placement policy will be generated when collocation is UNSPECIFIED. |
| `maxDistance` | string (int64) | When specified, causes the job to fail if more than max_distance logical switches are required between VMs. Batch uses the most compact possible placement of VMs even when max_distance is not specified. An explicit max_distance makes that level of compactness a strict requirement. Not yet implemented |

### `ReportAgentStateRequest`

- Request to report agent's state. The Request itself implies the agent is healthy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentInfo` | AgentInfo | Agent info. |
| `agentTimingInfo` | AgentTimingInfo | Agent timing info. |
| `metadata` | AgentMetadata | Agent metadata. |

### `ReportAgentStateResponse`

- Response to ReportAgentStateRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultReportInterval` | string (google-duration) | Default report interval override |
| `minReportInterval` | string (google-duration) | Minimum report interval override |
| `tasks` | array<AgentTask> | Tasks assigned to the agent |
| `useBatchMonitoredResource` | boolean | If true, the cloud logging for batch agent will use batch.googleapis.com/Job as monitored resource for Batch job related logging. |

### `Runnable`

- Runnable describes instructions for executing a specific script or container as part of a Task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alwaysRun` | boolean | By default, after a Runnable fails, no further Runnable are executed. This flag indicates that this Runnable must be run even if the Task has already failed. This is useful for Runnables that copy output files off of the VM or for debugging. The always_run flag does not override the Task's overall max_run_duration. If the max_run_duration has expired then no further Runnables will execute, not even always_run Runnables. |
| `background` | boolean | Normally, a runnable that doesn't exit causes its task to fail. However, you can set this field to `true` to configure a background runnable. Background runnables are allowed continue running in the background while the task executes subsequent runnables. For example, background runnables are useful for providing services to other runnables or providing debugging-support tools like SSH servers. Specifically, background runnables are killed automatically (if they have not already exited) a short time after all foreground runnables have completed. Even though this is likely to result in a non-zero exit status for the background runnable, these automatic kills are not treated as task failures. |
| `barrier` | Barrier | Barrier runnable. |
| `container` | Container | Container runnable. |
| `displayName` | string | Optional. DisplayName is an optional field that can be provided by the caller. If provided, it will be used in logs and other outputs to identify the script, making it easier for users to understand the logs. If not provided the index of the runnable will be used for outputs. |
| `environment` | Environment | Environment variables for this Runnable (overrides variables set for the whole Task or TaskGroup). |
| `ignoreExitStatus` | boolean | Normally, a runnable that returns a non-zero exit status fails and causes the task to fail. However, you can set this field to `true` to allow the task to continue executing its other runnables even if this runnable fails. |
| `labels` | object | Labels for this Runnable. |
| `script` | Script | Script runnable. |
| `timeout` | string (google-duration) | Timeout for this Runnable. |

### `Script`

- Script runnable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | The path to a script file that is accessible from the host VM(s). Unless the script file supports the default `#!/bin/sh` shell interpreter, you must specify an interpreter by including a shebang line (https://en.wikipedia.org/wiki/Shebang\_(Unix) as the first line of the file. For example, to execute the script using bash, include `#!/bin/bash` as the first line of the file. Alternatively, to execute the script using Python3, include `#!/usr/bin/env python3` as the first line of the file. |
| `text` | string | The text for a script. Unless the script text supports the default `#!/bin/sh` shell interpreter, you must specify an interpreter by including a shebang line (https://en.wikipedia.org/wiki/Shebang\_(Unix) at the beginning of the text. For example, to execute the script using bash, include `#!/bin/bash\n` at the beginning of the text. Alternatively, to execute the script using Python3, include `#!/usr/bin/env python3\n` at the beginning of the text. |

### `ServiceAccount`

- Carries information about a Google Cloud service account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | Email address of the service account. |
| `scopes` | array<string> | List of scopes to be enabled for this service account. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StatusEvent`

- Status event.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of the event. |
| `eventTime` | string (google-datetime) | The time this event occurred. |
| `taskExecution` | TaskExecution | Task Execution. This field is only defined for task-level status events where the task fails. |
| `taskState` | string enum | Task State. This field is only defined for task-level status events. Values: `STATE_UNSPECIFIED`, `PENDING`, `ASSIGNED`, `RUNNING`, `FAILED`, `SUCCEEDED`, `UNEXECUTED`. |
| `type` | string | Type of the event. |

### `Task`

- A Cloud Batch task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Task name. The name is generated from the parent TaskGroup name and 'id' field. For example: "projects/123456/locations/us-west1/jobs/job01/taskGroups/group01/tasks/task01". |
| `status` | TaskStatus | Task Status. |

### `TaskExecution`

- This Task Execution field includes detail information for task execution procedures, based on StatusEvent types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exitCode` | integer (int32) | The exit code of a finished task. If the task succeeded, the exit code will be 0. If the task failed but not due to the following reasons, the exit code will be 50000. Otherwise, it can be from different sources: \* Batch known failures: https://cloud.google.com/batch/docs/troubleshooting#reserved-exit-codes. \* Batch runnable execution failures; you can rely on Batch logs to further diagnose: https://cloud.google.com/batch/docs/analyze-job-using-logs. If there are multiple runnables failures, Batch only exposes the first error. |

### `TaskGroup`

- A TaskGroup defines one or more Tasks that all share the same TaskSpec.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. TaskGroup name. The system generates this field based on parent Job name. For example: "projects/123456/locations/us-west1/jobs/job01/taskGroups/group01". |
| `parallelism` | string (int64) | Max number of tasks that can run in parallel. Default to min(task_count, parallel tasks per job limit). See: Job Limits (https://cloud.google.com/batch/quotas#job_limits). Field parallelism must be 1 if the scheduling_policy is IN_ORDER. |
| `permissiveSsh` | boolean | When true, Batch will configure SSH to allow passwordless login between VMs running the Batch tasks in the same TaskGroup. |
| `requireHostsFile` | boolean | When true, Batch will populate a file with a list of all VMs assigned to the TaskGroup and set the BATCH_HOSTS_FILE environment variable to the path of that file. Defaults to false. The host file supports up to 1000 VMs. |
| `runAsNonRoot` | boolean | Optional. If not set or set to false, Batch uses the root user to execute runnables. If set to true, Batch runs the runnables using a non-root user. Currently, the non-root user Batch used is generated by OS Login. For more information, see About OS Login (https://cloud.google.com/compute/docs/oslogin). |
| `schedulingPolicy` | string enum | Scheduling policy for Tasks in the TaskGroup. The default value is AS_SOON_AS_POSSIBLE. Values: `SCHEDULING_POLICY_UNSPECIFIED`, `AS_SOON_AS_POSSIBLE`, `IN_ORDER`. |
| `taskCount` | string (int64) | Number of Tasks in the TaskGroup. Default is 1. |
| `taskCountPerNode` | string (int64) | Max number of tasks that can be run on a VM at the same time. If not specified, the system will decide a value based on available compute resources on a VM and task requirements. |
| `taskEnvironments` | array<Environment> | An array of environment variable mappings, which are passed to Tasks with matching indices. If task_environments is used then task_count should not be specified in the request (and will be ignored). Task count will be the length of task_environments. Tasks get a BATCH_TASK_INDEX and BATCH_TASK_COUNT environment variable, in addition to any environment variables set in task_environments, specifying the number of Tasks in the Task's parent TaskGroup, and the specific Task's index in the TaskGroup (0 through BATCH_TASK_COUNT - 1). |
| `taskSpec` | TaskSpec | Required. Tasks in the group share the same task spec. |

### `TaskGroupStatus`

- Aggregated task status for a TaskGroup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `counts` | object | Count of task in each state in the TaskGroup. The map key is task state name. |
| `instances` | array<InstanceStatus> | Status of instances allocated for the TaskGroup. |

### `TaskSpec`

- Spec of a task
- Version: v1

| Field | Type | Description |
|---|---|---|
| `computeResource` | ComputeResource | ComputeResource requirements. |
| `environment` | Environment | Environment variables to set before running the Task. |
| `environments` | object | Deprecated: please use environment(non-plural) instead. |
| `lifecyclePolicies` | array<LifecyclePolicy> | Lifecycle management schema when any task in a task group is failed. Currently we only support one lifecycle policy. When the lifecycle policy condition is met, the action in the policy will execute. If task execution result does not meet with the defined lifecycle policy, we consider it as the default policy. Default policy means if the exit code is 0, exit task. If task ends with non-zero exit code, retry the task with max_retry_count. |
| `maxRetryCount` | integer (int32) | Maximum number of retries on failures. The default, 0, which means never retry. The valid value range is \[0, 10\]. |
| `maxRunDuration` | string (google-duration) | Maximum duration the task should run before being automatically retried (if enabled) or automatically failed. Format the value of this field as a time limit in seconds followed by `s`—for example, `3600s` for 1 hour. The field accepts any value between 0 and the maximum listed for the `Duration` field type at https://protobuf.dev/reference/protobuf/google.protobuf/#duration; however, the actual maximum run time for a job will be limited to the maximum run time for a job listed at https://cloud.google.com/batch/quotas#max-job-duration. |
| `runnables` | array<Runnable> | Required. The sequence of one or more runnables (executable scripts, executable containers, and/or barriers) for each task in this task group to run. Each task runs this list of runnables in order. For a task to succeed, all of its script and container runnables each must meet at least one of the following conditions: + The runnable exited with a zero status. + The runnable didn't finish, but you enabled its `background` subfield. + The runnable exited with a non-zero status, but you enabled its `ignore_exit_status` subfield. |
| `volumes` | array<Volume> | Volumes to mount before running Tasks using this TaskSpec. |

### `TaskStatus`

- Status of a task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Task state. Values: `STATE_UNSPECIFIED`, `PENDING`, `ASSIGNED`, `RUNNING`, `FAILED`, `SUCCEEDED`, `UNEXECUTED`. |
| `statusEvents` | array<StatusEvent> | Detailed info about why the state is reached. |

### `Volume`

- Volume describes a volume and parameters for it to be mounted to a VM.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deviceName` | string | Device name of an attached disk volume, which should align with a device_name specified by job.allocation_policy.instances\[0\].policy.disks\[i\].device_name or defined by the given instance template in job.allocation_policy.instances\[0\].instance_template. |
| `gcs` | GCS | A Google Cloud Storage (GCS) volume. |
| `mountOptions` | array<string> | Mount options vary based on the type of storage volume: \* For a Cloud Storage bucket, all the mount options provided by the `gcsfuse` tool (https://cloud.google.com/storage/docs/gcsfuse-cli) are supported. \* For an existing persistent disk, all mount options provided by the `mount` command (https://man7.org/linux/man-pages/man8/mount.8.html) except writing are supported. This is due to restrictions of multi-writer mode (https://cloud.google.com/compute/docs/disks/sharing-disks-between-vms). \* For any other disk or a Network File System (NFS), all the mount options provided by the `mount` command are supported. |
| `mountPath` | string | The mount path for the volume, e.g. /mnt/disks/share. |
| `nfs` | NFS | A Network File System (NFS) volume. For example, a Filestore file share. |

### Shape of `Accelerator`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "count": "string (int64)",
  "driverVersion": "string",
  "installGpuDrivers": "boolean",
  "type": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `batch` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Source: https://batch.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
