---
source: https://appengine.googleapis.com/$discovery/rest?version=v1
---

# App Engine Admin API message schemas (appengine)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/appengine/`.

### `ApiConfigHandler`

- Google Cloud Endpoints (https://cloud.google.com/endpoints) configuration for API handlers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authFailAction` | string enum | Action to take when users access resources that require authentication. Defaults to redirect. Values: `AUTH_FAIL_ACTION_UNSPECIFIED`, `AUTH_FAIL_ACTION_REDIRECT`, `AUTH_FAIL_ACTION_UNAUTHORIZED`. |
| `login` | string enum | Level of login required to access this resource. Defaults to optional. Values: `LOGIN_UNSPECIFIED`, `LOGIN_OPTIONAL`, `LOGIN_ADMIN`, `LOGIN_REQUIRED`. |
| `script` | string | Path to the script from the application root directory. |
| `securityLevel` | string enum | Security (HTTPS) enforcement for this URL. Values: `SECURE_UNSPECIFIED`, `SECURE_DEFAULT`, `SECURE_NEVER`, `SECURE_OPTIONAL`, `SECURE_ALWAYS`. |
| `url` | string | URL to serve the endpoint at. |

### `ApiEndpointHandler`

- Uses Google Cloud Endpoints to handle requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scriptPath` | string | Path to the script from the application root directory. |

### `Application`

- An Application resource contains the top-level configuration of an App Engine application.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authDomain` | string | Google Apps authentication domain that controls which users can access this application.Defaults to open access for any Google Account. |
| `codeBucket` | string | Output only. Google Cloud Storage bucket that can be used for storing files associated with this application. This bucket is associated with the application and can be used by the gcloud deployment commands.@OutputOnly |
| `databaseType` | string enum | The type of the Cloud Firestore or Cloud Datastore database associated with this application. Values: `DATABASE_TYPE_UNSPECIFIED`, `CLOUD_DATASTORE`, `CLOUD_FIRESTORE`, `CLOUD_DATASTORE_COMPATIBILITY`. |
| `defaultBucket` | string | Output only. Google Cloud Storage bucket that can be used by this application to store content.@OutputOnly |
| `defaultCookieExpiration` | string (google-duration) | Cookie expiration policy for this application. |
| `defaultHostname` | string | Output only. Hostname used to reach this application, as resolved by App Engine.@OutputOnly |
| `dispatchRules` | array<UrlDispatchRule> | HTTP path dispatch rules for requests to the application that do not explicitly target a service or version. Rules are order-dependent. Up to 20 dispatch rules can be supported. |
| `featureSettings` | FeatureSettings | The feature specific settings to be used in the application. |
| `gcrDomain` | string | Output only. The Google Container Registry domain used for storing managed build docker images for this application. |
| `generatedCustomerMetadata` | object | Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetApplicationRequest |
| `iap` | IdentityAwareProxy | — |
| `id` | string | Identifier of the Application resource. This identifier is equivalent to the project ID of the Google Cloud Platform project where you want to deploy your application. Example: myapp. |
| `locationId` | string | Location from which this application runs. Application instances run out of the data centers in the specified location, which is also where all of the application's end user content is stored.Defaults to us-central.View the list of supported locations (https://cloud.google.com/appengine/docs/locations). |
| `name` | string | — |
| `serviceAccount` | string | The service account associated with the application. This is the app-level default identity. If no identity provided during create version, Admin API will fallback to this one. |
| `servingStatus` | string enum | Serving status of this application. Values: `UNSPECIFIED`, `SERVING`, `USER_DISABLED`, `SYSTEM_DISABLED`. |
| `sslPolicy` | string enum | The SSL policy that will be applied to the application. If set to Modern it will restrict traffic with TLS < 1.2 and allow only Modern Ciphers suite Values: `SSL_POLICY_UNSPECIFIED`, `DEFAULT`, `MODERN`. |

### `AuthorizedCertificate`

- An SSL certificate that a user has been authorized to administer. A user is authorized to administer any certificate that applies to one of their authorized domains.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateRawData` | CertificateRawData | The SSL certificate serving the AuthorizedCertificate resource. This must be obtained independently from a certificate authority. |
| `displayName` | string | The user-specified display name of the certificate. This is not guaranteed to be unique. Example: My Certificate. |
| `domainMappingsCount` | integer (int32) | Aggregate count of the domain mappings with this certificate mapped. This count includes domain mappings on applications for which the user does not have VIEWER permissions.Only returned by GET or LIST requests when specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly |
| `domainNames` | array<string> | Output only. Topmost applicable domains of this certificate. This certificate applies to these domains and their subdomains. Example: example.com.@OutputOnly |
| `expireTime` | string (google-datetime) | The time when this certificate expires. To update the renewal time on this certificate, upload an SSL certificate with a different expiration time using AuthorizedCertificates.UpdateAuthorizedCertificate.@OutputOnly |
| `id` | string | Output only. Relative name of the certificate. This is a unique value autogenerated on AuthorizedCertificate resource creation. Example: 12345.@OutputOnly |
| `managedCertificate` | ManagedCertificate | Only applicable if this certificate is managed by App Engine. Managed certificates are tied to the lifecycle of a DomainMapping and cannot be updated or deleted via the AuthorizedCertificates API. If this certificate is manually administered by the user, this field will be empty.@OutputOnly |
| `name` | string | Output only. Full path to the AuthorizedCertificate resource in the API. Example: apps/myapp/authorizedCertificates/12345.@OutputOnly |
| `visibleDomainMappings` | array<string> | Output only. The full paths to user visible Domain Mapping resources that have this certificate mapped. Example: apps/myapp/domainMappings/example.com.This may not represent the full list of mapped domain mappings if the user does not have VIEWER permissions on all of the applications that have this certificate mapped. See domain_mappings_count for a complete count.Only returned by GET or LIST requests when specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly |

### `AuthorizedDomain`

- A domain that a user has been authorized to administer. To authorize use of a domain, verify ownership via Search Console (https://search.google.com/search-console/welcome).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Fully qualified domain name of the domain authorized for use. Example: example.com. |
| `name` | string | Full path to the AuthorizedDomain resource in the API. Example: apps/myapp/authorizedDomains/example.com.@OutputOnly |

### `AutomaticScaling`

- Automatic scaling is based on request rate, response latencies, and other application metrics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `coolDownPeriod` | string (google-duration) | The time period that the Autoscaler (https://cloud.google.com/compute/docs/autoscaler/) should wait before it starts collecting information from a new instance. This prevents the autoscaler from collecting information when the instance is initializing, during which the collected usage would not be reliable. Only applicable in the App Engine flexible environment. |
| `cpuUtilization` | CpuUtilization | Target scaling by CPU usage. |
| `diskUtilization` | DiskUtilization | Target scaling by disk usage. |
| `maxConcurrentRequests` | integer (int32) | Number of concurrent requests an automatic scaling instance can accept before the scheduler spawns a new instance.Defaults to a runtime-specific value. |
| `maxIdleInstances` | integer (int32) | Maximum number of idle instances that should be maintained for this version. |
| `maxPendingLatency` | string (google-duration) | Maximum amount of time that a request should wait in the pending queue before starting a new instance to handle it. |
| `maxTotalInstances` | integer (int32) | Maximum number of instances that should be started to handle requests for this version. |
| `minIdleInstances` | integer (int32) | Minimum number of idle instances that should be maintained for this version. Only applicable for the default version of a service. |
| `minPendingLatency` | string (google-duration) | Minimum amount of time a request should wait in the pending queue before starting a new instance to handle it. |
| `minTotalInstances` | integer (int32) | Minimum number of running instances that should be maintained for this version. |
| `networkUtilization` | NetworkUtilization | Target scaling by network usage. |
| `requestUtilization` | RequestUtilization | Target scaling by request utilization. |
| `standardSchedulerSettings` | StandardSchedulerSettings | Scheduler settings for standard environment. |

### `AutomaticScaling` (v1beta)

- Automatic scaling is based on request rate, response latencies, and other application metrics.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `coolDownPeriod` | string (google-duration) | The time period that the Autoscaler (https://cloud.google.com/compute/docs/autoscaler/) should wait before it starts collecting information from a new instance. This prevents the autoscaler from collecting information when the instance is initializing, during which the collected usage would not be reliable. Only applicable in the App Engine flexible environment. |
| `cpuUtilization` | CpuUtilization | Target scaling by CPU usage. |
| `customMetrics` | array<CustomMetric> | Target scaling by user-provided metrics. Only applicable in the App Engine flexible environment. |
| `diskUtilization` | DiskUtilization | Target scaling by disk usage. |
| `maxConcurrentRequests` | integer (int32) | Number of concurrent requests an automatic scaling instance can accept before the scheduler spawns a new instance.Defaults to a runtime-specific value. |
| `maxIdleInstances` | integer (int32) | Maximum number of idle instances that should be maintained for this version. |
| `maxPendingLatency` | string (google-duration) | Maximum amount of time that a request should wait in the pending queue before starting a new instance to handle it. |
| `maxTotalInstances` | integer (int32) | Maximum number of instances that should be started to handle requests for this version. |
| `minIdleInstances` | integer (int32) | Minimum number of idle instances that should be maintained for this version. Only applicable for the default version of a service. |
| `minPendingLatency` | string (google-duration) | Minimum amount of time a request should wait in the pending queue before starting a new instance to handle it. |
| `minTotalInstances` | integer (int32) | Minimum number of running instances that should be maintained for this version. |
| `networkUtilization` | NetworkUtilization | Target scaling by network usage. |
| `requestUtilization` | RequestUtilization | Target scaling by request utilization. |
| `standardSchedulerSettings` | StandardSchedulerSettings | Scheduler settings for standard environment. |

### `BasicScaling`

- A service with basic scaling will create an instance when the application receives a request. The instance will be turned down when the app becomes idle. Basic scaling is ideal for work that is intermittent or driven by user activity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `idleTimeout` | string (google-duration) | Duration of time after the last request that an instance must wait before the instance is shut down. |
| `maxInstances` | integer (int32) | Maximum number of instances to create for this version. |

### `BatchUpdateIngressRulesRequest`

- Request message for Firewall.BatchUpdateIngressRules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ingressRules` | array<FirewallRule> | A list of FirewallRules to replace the existing set. |

### `BatchUpdateIngressRulesResponse`

- Response message for Firewall.UpdateAllIngressRules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ingressRules` | array<FirewallRule> | The full list of ingress FirewallRules for this application. |

### `BuildInfo`

- Google Cloud Build information.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `cloudBuildId` | string | The Google Cloud Build id. Example: "f966068f-08b2-42c8-bdfe-74137dff2bf9" |

### `CertificateRawData`

- An SSL certificate obtained from a certificate authority.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `privateKey` | string | Unencrypted PEM encoded RSA private key. This field is set once on certificate creation and then encrypted. The key size must be 2048 bits or fewer. Must include the header and footer. Example: -----BEGIN RSA PRIVATE KEY----- -----END RSA PRIVATE KEY----- @InputOnly |
| `publicCertificate` | string | PEM encoded x.509 public key certificate. This field is set once on certificate creation. Must include the header and footer. Example: -----BEGIN CERTIFICATE----- -----END CERTIFICATE----- |

### `CloudBuildOptions`

- Options for the build operations performed as a part of the version deployment. Only applicable for App Engine flexible environment when creating a version using source code directly.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appYamlPath` | string | Path to the yaml file used in deployment, used to determine runtime configuration details.Required for flexible environment builds.See https://cloud.google.com/appengine/docs/standard/python/config/appref for more details. |
| `cloudBuildTimeout` | string (google-duration) | The Cloud Build timeout used as part of any dependent builds performed by version creation. Defaults to 10 minutes. |

### `ContainerInfo`

- Docker image that is used to create a container and start a VM instance for the version that you deploy. Only applicable for instances running in the App Engine flexible environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `image` | string | URI to the hosted container image in Google Container Registry. The URI must be fully qualified and include a tag or digest. Examples: "gcr.io/my-project/image:tag" or "gcr.io/my-project/image@digest" |

### `ContainerState`

- ContainerState contains the externally-visible container state that is used to communicate the state and reasoning for that state to the CLH. This data is not persisted by CCFE, but is instead derived from CCFE's internal representation of the container state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentReasons` | Reasons | — |
| `previousReasons` | Reasons | The previous and current reasons for a container state will be sent for a container event. CLHs that need to know the signal that caused the container event to trigger (edges) as opposed to just knowing the state can act upon differences in the previous and current reasons.Reasons will be provided for every system: service management, data governance, abuse, and billing.If this is a CCFE-triggered event used for reconciliation then the current reasons will be set to their \*\_CONTROL_PLANE_SYNC state. The previous reasons will contain the last known set of non-unknown non-control_plane_sync reasons for the state. |
| `state` | string enum | The current state of the container. This state is the culmination of all of the opinions from external systems that CCFE knows about of the container. Values: `UNKNOWN_STATE`, `ON`, `OFF`, `DELETED`. |

### `CpuUtilization`

- Target scaling by CPU usage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationWindowLength` | string (google-duration) | Period of time over which CPU utilization is calculated. |
| `targetUtilization` | number (double) | Target CPU utilization ratio to maintain when scaling. Must be between 0 and 1. |

### `CreateVersionMetadataV1`

- Metadata for the given google.longrunning.Operation during a google.appengine.v1.CreateVersionRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudBuildId` | string | The Cloud Build ID if one was created as part of the version create. @OutputOnly |

### `CreateVersionMetadataV1Alpha`

- Metadata for the given google.longrunning.Operation during a google.appengine.v1alpha.CreateVersionRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudBuildId` | string | The Cloud Build ID if one was created as part of the version create. @OutputOnly |

### `CreateVersionMetadataV1Beta`

- Metadata for the given google.longrunning.Operation during a google.appengine.v1beta.CreateVersionRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudBuildId` | string | The Cloud Build ID if one was created as part of the version create. @OutputOnly |

### `CustomMetric`

- Allows autoscaling based on Stackdriver metrics.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `filter` | string | Allows filtering on the metric's fields. |
| `metricName` | string | The name of the metric. |
| `singleInstanceAssignment` | number (double) | May be used instead of target_utilization when an instance can handle a specific amount of work/resources and the metric value is equal to the current amount of work remaining. The autoscaler will try to keep the number of instances equal to the metric value divided by single_instance_assignment. |
| `targetType` | string | The type of the metric. Must be a string representing a Stackdriver metric type e.g. GAGUE, DELTA_PER_SECOND, etc. |
| `targetUtilization` | number (double) | The target value for the metric. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: A full date, with non-zero year, month, and day values. A month and day, with a zero year (for example, an anniversary). A year on its own, with a zero month and a zero day. A year and month, with a zero day (for example, a credit card expiration date).Related types: google.type.TimeOfDay google.type.DateTime google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DebugInstanceRequest`

- Request message for Instances.DebugInstance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sshKey` | string | Public SSH key to add to the instance. Examples: \[USERNAME\]:ssh-rsa \[KEY_VALUE\] \[USERNAME\] \[USERNAME\]:ssh-rsa \[KEY_VALUE\] google-ssh {"userName":"\[USERNAME\]","expireOn":"\[EXPIRE_TIME\]"}For more information, see Adding and Removing SSH Keys (https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys). |

### `Deployment`

- Code and application artifacts used to deploy a version to App Engine.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudBuildOptions` | CloudBuildOptions | Options for any Google Cloud Build builds created as a part of this deployment.These options will only be used if a new build is created, such as when deploying to the App Engine flexible environment using files or zip. |
| `container` | ContainerInfo | The Docker image for the container that runs the version. Only applicable for instances running in the App Engine flexible environment. |
| `files` | object | Manifest of the files stored in Google Cloud Storage that are included as part of this version. All files must be readable using the credentials supplied with this call. |
| `zip` | ZipInfo | The zip file for this deployment, if this is a zip deployment. |

### `Deployment` (v1beta)

- Code and application artifacts used to deploy a version to App Engine.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `build` | BuildInfo | Google Cloud Build build information. Only applicable for instances running in the App Engine flexible environment. |
| `cloudBuildOptions` | CloudBuildOptions | Options for any Google Cloud Build builds created as a part of this deployment.These options will only be used if a new build is created, such as when deploying to the App Engine flexible environment using files or zip. |
| `container` | ContainerInfo | The Docker image for the container that runs the version. Only applicable for instances running in the App Engine flexible environment. |
| `files` | object | Manifest of the files stored in Google Cloud Storage that are included as part of this version. All files must be readable using the credentials supplied with this call. |
| `zip` | ZipInfo | The zip file for this deployment, if this is a zip deployment. |

### `DiskUtilization`

- Target scaling by disk usage. Only applicable in the App Engine flexible environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetReadBytesPerSecond` | integer (int32) | Target bytes read per second. |
| `targetReadOpsPerSecond` | integer (int32) | Target ops read per seconds. |
| `targetWriteBytesPerSecond` | integer (int32) | Target bytes written per second. |
| `targetWriteOpsPerSecond` | integer (int32) | Target ops written per second. |

### `DomainMapping`

- A domain serving an App Engine application.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Relative name of the domain serving the application. Example: example.com. |
| `name` | string | Output only. Full path to the DomainMapping resource in the API. Example: apps/myapp/domainMapping/example.com.@OutputOnly |
| `resourceRecords` | array<ResourceRecord> | Output only. The resource records required to configure this domain mapping. These records must be added to the domain's DNS configuration in order to serve the application via this domain mapping.@OutputOnly |
| `sslSettings` | SslSettings | SSL configuration for this domain. If unconfigured, this domain will not serve with SSL. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EndpointsApiService`

- Google Cloud Endpoints (https://cloud.google.com/endpoints) configuration. The Endpoints API Service provides tooling for serving Open API and gRPC endpoints via an NGINX proxy. Only valid for App Engine Flexible environment deployments.The fields here refer to the name and configuration ID of a "service" resource in the Service Management API (https://cloud.google.com/service-management/overview).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configId` | string | Endpoints service configuration ID as specified by the Service Management API. For example "2016-09-19r1".By default, the rollout strategy for Endpoints is RolloutStrategy.FIXED. This means that Endpoints starts up with a particular configuration ID. When a new configuration is rolled out, Endpoints must be given the new configuration ID. The config_id field is used to give the configuration ID and is required in this case.Endpoints also has a rollout strategy called RolloutStrategy.MANAGED. When using this, Endpoints fetches the latest configuration and does not need the configuration ID. In this case, config_id must be omitted. |
| `disableTraceSampling` | boolean | Enable or disable trace sampling. By default, this is set to false for enabled. |
| `name` | string | Endpoints service name which is the name of the "service" resource in the Service Management API. For example "myapi.endpoints.myproject.cloud.goog" |
| `rolloutStrategy` | string enum | Endpoints rollout strategy. If FIXED, config_id must be specified. If MANAGED, config_id must be omitted. Values: `UNSPECIFIED_ROLLOUT_STRATEGY`, `FIXED`, `MANAGED`. |

### `Entrypoint`

- The entrypoint for the application.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `shell` | string | The format should be a shell command that can be fed to bash -c. |

### `ErrorHandler`

- Custom static error page to be served when an error occurs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorCode` | string enum | Error condition this handler applies to. Values: `ERROR_CODE_UNSPECIFIED`, `ERROR_CODE_DEFAULT`, `ERROR_CODE_OVER_QUOTA`, `ERROR_CODE_DOS_API_DENIAL`, `ERROR_CODE_TIMEOUT`. |
| `mimeType` | string | MIME type of file. Defaults to text/html. |
| `staticFile` | string | Static file content to be served for this error. |

### `ExportAppImageRequest`

- Request message for Versions.ExportAppImage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationRepository` | string | Optional. The full resource name of the AR repository to export to. Format: projects/{project}/locations/{location}/repositories/{repository} If not specified, defaults to projects/{project}/locations/{location}/repositories/gae-standard in the same region as the app. The default repository will be created if it does not exist. |

### `FeatureSettings`

- The feature specific settings to be used in the application. These define behaviors that are user configurable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `splitHealthChecks` | boolean | Boolean value indicating if split health checks should be used instead of the legacy health checks. At an app.yaml level, this means defaulting to 'readiness_check' and 'liveness_check' values instead of 'health_check' ones. Once the legacy 'health_check' behavior is deprecated, and this value is always true, this setting can be removed. |
| `useContainerOptimizedOs` | boolean | If true, use Container-Optimized OS (https://cloud.google.com/container-optimized-os/) base image for VMs, rather than a base Debian image. |

### `FileInfo`

- Single source file that is part of the version to be deployed. Each source file that is deployed must be specified separately.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mimeType` | string | The MIME type of the file.Defaults to the value from Google Cloud Storage. |
| `sha1Sum` | string | The SHA1 hash of the file, in hex. |
| `sourceUrl` | string | URL source to use to fetch this file. Must be a URL to a resource in Google Cloud Storage in the form 'http(s)://storage.googleapis.com//'. |

### `FirewallRule`

- A single firewall rule that is evaluated against incoming traffic and provides an action to take on matched requests. A positive integer between 1, Int32.MaxValue-1 that defines the order of rule evaluation. Rules with the lowest priority are evaluated first.A default rule at priority Int32.MaxValue matches all IPv4 and IPv6 traffic when no previous rule matches. Only the action of this rule can be modified by the user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | The action to take on matched requests. Values: `UNSPECIFIED_ACTION`, `ALLOW`, `DENY`. |
| `description` | string | An optional string description of this rule. This field has a maximum length of 400 characters. |
| `priority` | integer (int32) | — |
| `sourceRange` | string | IP address or range, defined using CIDR notation, of requests that this rule applies to. You can use the wildcard character "\*" to match all IPs equivalent to "0/0" and "::/0" together. Examples: 192.168.1.1 or 192.168.0.0/16 or 2001:db8::/32 or 2001:0db8:0000:0042:0000:8a2e:0370:7334. Truncation will be silently performed on addresses which are not properly truncated. For example, 1.2.3.4/24 is accepted as the same address as 1.2.3.0/24. Similarly, for IPv6, 2001:db8::1/32 is accepted as the same address as 2001:db8::/32. |

### `FlexibleRuntimeSettings`

- Runtime settings for the App Engine flexible environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operatingSystem` | string | The operating system of the application runtime. |
| `runtimeVersion` | string | The runtime version of an App Engine flexible application. |

### `GceTag`

- For use only by GCE. GceTag is a wrapper around the GCE administrative tag with parent info.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parent` | array<string> | The parents(s) of the tag. Eg. projects/123, folders/456 It usually contains only one parent. But, in some corner cases, it can contain multiple parents. Currently, organizations are not supported. |
| `tag` | string | The administrative_tag name. |

### `GoogleAppengineV1betaLocationMetadata`

- Metadata for the given google.cloud.location.Location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `flexibleEnvironmentAvailable` | boolean | App Engine flexible environment is available in the given location.@OutputOnly |
| `searchApiAvailable` | boolean | Output only. Search API (https://cloud.google.com/appengine/docs/standard/python/search) is available in the given location. |
| `standardEnvironmentAvailable` | boolean | App Engine standard environment is available in the given location.@OutputOnly |

### `HealthCheck`

- Health checking configuration for VM instances. Unhealthy instances are killed and replaced with new instances. Only applicable for instances in App Engine flexible environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkInterval` | string (google-duration) | Interval between health checks. |
| `disableHealthCheck` | boolean | Whether to explicitly disable health checks for this instance. |
| `healthyThreshold` | integer (uint32) | Number of consecutive successful health checks required before receiving traffic. |
| `host` | string | Host header to send when performing an HTTP health check. Example: "myapp.appspot.com" |
| `restartThreshold` | integer (uint32) | Number of consecutive failed health checks required before an instance is restarted. |
| `timeout` | string (google-duration) | Time before the health check is considered failed. |
| `unhealthyThreshold` | integer (uint32) | Number of consecutive failed health checks required before removing traffic. |

### `IdentityAwareProxy`

- Identity-Aware Proxy
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the serving infrastructure will authenticate and authorize all incoming requests.If true, the oauth2_client_id and oauth2_client_secret fields must be non-empty. |
| `oauth2ClientId` | string | OAuth2 client ID to use for the authentication flow. |
| `oauth2ClientSecret` | string | OAuth2 client secret to use for the authentication flow.For security reasons, this value cannot be retrieved via the API. Instead, the SHA-256 hash of the value is returned in the oauth2_client_secret_sha256 field.@InputOnly |
| `oauth2ClientSecretSha256` | string | Output only. Hex-encoded SHA-256 hash of the client secret.@OutputOnly |

### `Instance`

- An Instance resource is the computing unit that App Engine uses to automatically scale an application.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appEngineRelease` | string | Output only. App Engine release this instance is running on. |
| `availability` | string enum | Output only. Availability of the instance. Values: `UNSPECIFIED`, `RESIDENT`, `DYNAMIC`. |
| `averageLatency` | integer (int32) | Output only. Average latency (ms) over the last minute. |
| `errors` | integer (int32) | Output only. Number of errors since this instance was started. |
| `id` | string | Output only. Relative name of the instance within the version. Example: instance-1. |
| `memoryUsage` | string (int64) | Output only. Total memory in use (bytes). |
| `name` | string | Output only. Full path to the Instance resource in the API. Example: apps/myapp/services/default/versions/v1/instances/instance-1. |
| `qps` | number (float) | Output only. Average queries per second (QPS) over the last minute. |
| `requests` | integer (int32) | Output only. Number of requests since this instance was started. |
| `startTime` | string (google-datetime) | Output only. Time that this instance was started.@OutputOnly |
| `vmDebugEnabled` | boolean | Output only. Whether this instance is in debug mode. Only applicable for instances in App Engine flexible environment. |
| `vmId` | string | Output only. Virtual machine ID of this instance. Only applicable for instances in App Engine flexible environment. |
| `vmIp` | string | Output only. The IP address of this instance. Only applicable for instances in App Engine flexible environment. |
| `vmLiveness` | string enum | Output only. The liveness health check of this instance. Only applicable for instances in App Engine flexible environment. Values: `LIVENESS_STATE_UNSPECIFIED`, `UNKNOWN`, `HEALTHY`, `UNHEALTHY`, `DRAINING`, `TIMEOUT`. |
| `vmName` | string | Output only. Name of the virtual machine where this instance lives. Only applicable for instances in App Engine flexible environment. |
| `vmStatus` | string | Output only. Status of the virtual machine where this instance lives. Only applicable for instances in App Engine flexible environment. |
| `vmZoneName` | string | Output only. Zone where the virtual machine is located. Only applicable for instances in App Engine flexible environment. |

### `Library`

- Third-party Python runtime library that is required by the application.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the library. Example: "django". |
| `version` | string | Version of the library to select, or "latest". |

### `ListAuthorizedCertificatesResponse`

- Response message for AuthorizedCertificates.ListAuthorizedCertificates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificates` | array<AuthorizedCertificate> | The SSL certificates the user is authorized to administer. |
| `nextPageToken` | string | Continuation token for fetching the next page of results. |

### `ListAuthorizedDomainsResponse`

- Response message for AuthorizedDomains.ListAuthorizedDomains.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domains` | array<AuthorizedDomain> | The authorized domains belonging to the user. |
| `nextPageToken` | string | Continuation token for fetching the next page of results. |

### `ListDomainMappingsResponse`

- Response message for DomainMappings.ListDomainMappings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domainMappings` | array<DomainMapping> | The domain mappings for the application. |
| `nextPageToken` | string | Continuation token for fetching the next page of results. |

### `ListIngressRulesResponse`

- Response message for Firewall.ListIngressRules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ingressRules` | array<FirewallRule> | The ingress FirewallRules for this application. |
| `nextPageToken` | string | Continuation token for fetching the next page of results. |

### `ListInstancesResponse`

- Response message for Instances.ListInstances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<Instance> | The instances belonging to the requested version. |
| `nextPageToken` | string | Continuation token for fetching the next page of results. |

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
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets ListOperationsRequest.return_partial_success and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListRuntimesResponse`

- Response message for Applications.ListRuntimes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Continuation token for fetching the next page of results. |
| `runtimes` | array<Runtime> | The runtimes available to the requested application. |

### `ListServicesResponse`

- Response message for Services.ListServices.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Continuation token for fetching the next page of results. |
| `services` | array<Service> | The services belonging to the requested application. |

### `ListVersionsResponse`

- Response message for Versions.ListVersions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Continuation token for fetching the next page of results. |
| `versions` | array<Version> | The versions belonging to the requested service. |

### `LivenessCheck`

- Health checking configuration for VM instances. Unhealthy instances are killed and replaced with new instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkInterval` | string (google-duration) | Interval between health checks. |
| `failureThreshold` | integer (uint32) | Number of consecutive failed checks required before considering the VM unhealthy. |
| `host` | string | Host header to send when performing a HTTP Liveness check. Example: "myapp.appspot.com" |
| `initialDelay` | string (google-duration) | The initial delay before starting to execute the checks. |
| `path` | string | The request path. |
| `successThreshold` | integer (uint32) | Number of consecutive successful checks required before considering the VM healthy. |
| `timeout` | string (google-duration) | Time before the check is considered failed. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: "us-east1". |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: "projects/example-project/locations/us-east1" |

### `LocationMetadata`

- Metadata for the given google.cloud.location.Location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `flexibleEnvironmentAvailable` | boolean | App Engine flexible environment is available in the given location.@OutputOnly |
| `searchApiAvailable` | boolean | Output only. Search API (https://cloud.google.com/appengine/docs/standard/python/search) is available in the given location. |
| `standardEnvironmentAvailable` | boolean | App Engine standard environment is available in the given location.@OutputOnly |

### `ManagedCertificate`

- A certificate managed by App Engine.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastRenewalTime` | string (google-datetime) | Time at which the certificate was last renewed. The renewal process is fully managed. Certificate renewal will automatically occur before the certificate expires. Renewal errors can be tracked via ManagementStatus.@OutputOnly |
| `status` | string enum | Status of certificate management. Refers to the most recent certificate acquisition or renewal attempt.@OutputOnly Values: `MANAGEMENT_STATUS_UNSPECIFIED`, `OK`, `PENDING`, `FAILED_RETRYING_NOT_VISIBLE`, `FAILED_PERMANENT`, `FAILED_RETRYING_CAA_FORBIDDEN`, `FAILED_RETRYING_CAA_CHECKING`. |

### `ManualScaling`

- A service with manual scaling runs continuously, allowing you to perform complex initialization and rely on the state of its memory over time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | integer (int32) | Number of instances to assign to the service at the start. This number can later be altered by using the Modules API (https://cloud.google.com/appengine/docs/python/modules/functions) set_num_instances() function. |

### `Network`

- Extra network settings. Only applicable in the App Engine flexible environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forwardedPorts` | array<string> | List of ports, or port pairs, to forward from the virtual machine to the application container. Only applicable in the App Engine flexible environment. |
| `instanceIpMode` | string enum | The IP mode for instances. Only applicable in the App Engine flexible environment. Values: `INSTANCE_IP_MODE_UNSPECIFIED`, `EXTERNAL`, `INTERNAL`. |
| `instanceTag` | string | Tag to apply to the instance during creation. Only applicable in the App Engine flexible environment. |
| `name` | string | Google Compute Engine network where the virtual machines are created. Specify the short name, not the resource path.Defaults to default. |
| `sessionAffinity` | boolean | Enable session affinity. Only applicable in the App Engine flexible environment. |
| `subnetworkName` | string | Google Cloud Platform sub-network where the virtual machines are created. Specify the short name, not the resource path.If a subnetwork name is specified, a network name will also be required unless it is for the default network. If the network that the instance is being created in is a Legacy network, then the IP address is allocated from the IPv4Range. If the network that the instance is being created in is an auto Subnet Mode Network, then only network name should be specified (not the subnetwork_name) and the IP address is created from the IPCidrRange of the subnetwork that exists in that zone for that network. If the network that the instance is being created in is a custom Subnet Mode Network, then the subnetwork_name must be specified and the IP address is created from the IPCidrRange of the subnetwork.If specified, the subnetwork must exist in the same region as the App Engine flexible environment application. |

### `NetworkSettings`

- A NetworkSettings resource is a container for ingress settings for a version or service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ingressTrafficAllowed` | string enum | The ingress settings for version or service. Values: `INGRESS_TRAFFIC_ALLOWED_UNSPECIFIED`, `INGRESS_TRAFFIC_ALLOWED_ALL`, `INGRESS_TRAFFIC_ALLOWED_INTERNAL_ONLY`, `INGRESS_TRAFFIC_ALLOWED_INTERNAL_AND_LB`. |

### `NetworkUtilization`

- Target scaling by network usage. Only applicable in the App Engine flexible environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetReceivedBytesPerSecond` | integer (int32) | Target bytes received per second. |
| `targetReceivedPacketsPerSecond` | integer (int32) | Target packets received per second. |
| `targetSentBytesPerSecond` | integer (int32) | Target bytes sent per second. |
| `targetSentPacketsPerSecond` | integer (int32) | Target packets sent per second. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. |

### `OperationMetadataV1`

- Metadata for the given google.longrunning.Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createVersionMetadata` | CreateVersionMetadataV1 | — |
| `endTime` | string (google-datetime) | Time that this operation completed.@OutputOnly |
| `ephemeralMessage` | string | Ephemeral message that may change every time the operation is polled. @OutputOnly |
| `insertTime` | string (google-datetime) | Time that this operation was created.@OutputOnly |
| `method` | string | API method that initiated this operation. Example: google.appengine.v1.Versions.CreateVersion.@OutputOnly |
| `target` | string | Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly |
| `user` | string | User who requested this operation.@OutputOnly |
| `warning` | array<string> | Durable messages that persist on every operation poll. @OutputOnly |

### `OperationMetadataV1Alpha`

- Metadata for the given google.longrunning.Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createVersionMetadata` | CreateVersionMetadataV1Alpha | — |
| `endTime` | string (google-datetime) | Time that this operation completed.@OutputOnly |
| `ephemeralMessage` | string | Ephemeral message that may change every time the operation is polled. @OutputOnly |
| `insertTime` | string (google-datetime) | Time that this operation was created.@OutputOnly |
| `method` | string | API method that initiated this operation. Example: google.appengine.v1alpha.Versions.CreateVersion.@OutputOnly |
| `target` | string | Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly |
| `user` | string | User who requested this operation.@OutputOnly |
| `warning` | array<string> | Durable messages that persist on every operation poll. @OutputOnly |

### `OperationMetadataV1Beta`

- Metadata for the given google.longrunning.Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createVersionMetadata` | CreateVersionMetadataV1Beta | — |
| `endTime` | string (google-datetime) | Time that this operation completed.@OutputOnly |
| `ephemeralMessage` | string | Ephemeral message that may change every time the operation is polled. @OutputOnly |
| `insertTime` | string (google-datetime) | Time that this operation was created.@OutputOnly |
| `method` | string | API method that initiated this operation. Example: google.appengine.v1beta.Versions.CreateVersion.@OutputOnly |
| `target` | string | Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly |
| `user` | string | User who requested this operation.@OutputOnly |
| `warning` | array<string> | Durable messages that persist on every operation poll. @OutputOnly |

### `ProjectEvent`

- The request sent to CLHs during project events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventId` | string | The unique ID for this project event. CLHs can use this value to dedup repeated calls. required |
| `phase` | string enum | Phase indicates when in the container event propagation this event is being communicated. Events are sent before and after the per-resource events are propagated. required Values: `CONTAINER_EVENT_PHASE_UNSPECIFIED`, `BEFORE_RESOURCE_HANDLING`, `AFTER_RESOURCE_HANDLING`. |
| `projectMetadata` | ProjectsMetadata | The projects metadata for this project. required |
| `state` | ContainerState | The state of the organization that led to this event. |

### `ProjectsMetadata`

- ProjectsMetadata is the metadata CCFE stores about the all the relevant projects (tenant, consumer, producer).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerProjectId` | string | The consumer project id. |
| `consumerProjectNumber` | string (int64) | The consumer project number. |
| `consumerProjectState` | string enum | The CCFE state of the consumer project. It is the same state that is communicated to the CLH during project events. Notice that this field is not set in the DB, it is only set in this proto when communicated to CLH in the side channel. Values: `UNKNOWN_STATE`, `ON`, `OFF`, `DELETED`. |
| `gceTag` | array<GceTag> | The GCE tags associated with the consumer project and those inherited due to their ancestry, if any. Not supported by CCFE. |
| `isGceProjectDeprovisioning` | boolean | DEPRECATED: Indicates whether the GCE project is in the DEPROVISIONING state. This field is a temporary workaround (see b/475310865) to allow GCE extensions to bypass certain checks during deprovisioning. It will be replaced by a permanent solution in the future. |
| `p4ServiceAccount` | string | The service account authorized to operate on the consumer project. Note: CCFE only propagates P4SA with default tag to CLH. |
| `producerProjectId` | string | The producer project id. |
| `producerProjectNumber` | string (int64) | The producer project number. |
| `tenantProjectId` | string | The tenant project id. |
| `tenantProjectNumber` | string (int64) | The tenant project number. |

### `ReadinessCheck`

- Readiness checking configuration for VM instances. Unhealthy instances are removed from traffic rotation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appStartTimeout` | string (google-duration) | A maximum time limit on application initialization, measured from moment the application successfully replies to a healthcheck until it is ready to serve traffic. |
| `checkInterval` | string (google-duration) | Interval between health checks. |
| `failureThreshold` | integer (uint32) | Number of consecutive failed checks required before removing traffic. |
| `host` | string | Host header to send when performing a HTTP Readiness check. Example: "myapp.appspot.com" |
| `path` | string | The request path. |
| `successThreshold` | integer (uint32) | Number of consecutive successful checks required before receiving traffic. |
| `timeout` | string (google-duration) | Time before the check is considered failed. |

### `Reasons`

- Containers transition between and within states based on reasons sent from various systems. CCFE will provide the CLH with reasons for the current state per system.The current systems that CCFE supports are: Service Management (Inception) Data Governance (Wipeout) Abuse (Ares) Billing (Internal Cloud Billing API) Service Activation (Service Controller)
- Version: v1

| Field | Type | Description |
|---|---|---|
| `abuse` | string enum | — Values: `ABUSE_UNKNOWN_REASON`, `ABUSE_CONTROL_PLANE_SYNC`, `SUSPEND`, `REINSTATE`. |
| `billing` | string enum | — Values: `BILLING_UNKNOWN_REASON`, `BILLING_CONTROL_PLANE_SYNC`, `PROBATION`, `CLOSE`, `OPEN`. |
| `dataGovernance` | string enum | — Values: `DATA_GOVERNANCE_UNKNOWN_REASON`, `DATA_GOVERNANCE_CONTROL_PLANE_SYNC`, `HIDE`, `UNHIDE`, `PURGE`. |
| `serviceActivation` | string enum | Consumer Container denotes if the service is active within a project or not. This information could be used to clean up resources in case service in DISABLED_FULL i.e. Service is inactive > 30 days. Values: `SERVICE_ACTIVATION_STATUS_UNSPECIFIED`, `SERVICE_ACTIVATION_ENABLED`, `SERVICE_ACTIVATION_DISABLED`, `SERVICE_ACTIVATION_DISABLED_FULL`, `SERVICE_ACTIVATION_UNKNOWN_REASON`. |
| `serviceManagement` | string enum | — Values: `SERVICE_MANAGEMENT_UNKNOWN_REASON`, `SERVICE_MANAGEMENT_CONTROL_PLANE_SYNC`, `ACTIVATION`, `PREPARE_DEACTIVATION`, `ABORT_DEACTIVATION`, `COMMIT_DEACTIVATION`. |

### `RepairApplicationRequest`

- Request message for 'Applications.RepairApplication'.
- Version: v1

### `RequestUtilization`

- Target scaling by request utilization. Only applicable in the App Engine flexible environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetConcurrentRequests` | integer (int32) | Target number of concurrent requests. |
| `targetRequestCountPerSecond` | integer (int32) | Target requests per second. |

### `ResourceEvent`

- The request that is passed to CLH during per-resource events. The request will be sent with update semantics in all cases except for data governance purge events. These events will be sent with delete semantics and the CLH is expected to delete the resource receiving this event.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventId` | string | The unique ID for this per-resource event. CLHs can use this value to dedup repeated calls. required |
| `name` | string | The name of the resource for which this event is. required |
| `state` | ContainerState | The state of the project that led to this event. |

### `ResourceRecord`

- A DNS resource record.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Relative name of the object affected by this record. Only applicable for CNAME records. Example: 'www'. |
| `rrdata` | string | Data for this record. Values vary by record type, as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1). |
| `type` | string enum | Resource record type. Example: AAAA. Values: `RECORD_TYPE_UNSPECIFIED`, `A`, `AAAA`, `CNAME`. |

### `Resources`

- Machine resources for a version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpu` | number (double) | Number of CPU cores needed. |
| `diskGb` | number (double) | Disk size (GB) needed. |
| `kmsKeyReference` | string | The name of the encryption key that is stored in Google Cloud KMS. Only should be used by Cloud Composer to encrypt the vm disk |
| `memoryGb` | number (double) | Memory (GB) needed. |
| `volumes` | array<Volume> | User specified volumes. |

### `Runtime`

- Runtime versions for App Engine.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `decommissionedDate` | Date | Date when Runtime is decommissioned. |
| `deprecationDate` | Date | Date when Runtime is deprecated. |
| `displayName` | string | User-friendly display name, e.g. 'Node.js 12', etc. |
| `endOfSupportDate` | Date | Date when Runtime is end of support. |
| `environment` | string enum | The environment of the runtime. Values: `ENVIRONMENT_UNSPECIFIED`, `STANDARD`, `FLEXIBLE`. |
| `name` | string | The name of the runtime, e.g., 'go113', 'nodejs12', etc. |
| `stage` | string enum | The stage of life this runtime is in, e.g., BETA, GA, etc. Values: `RUNTIME_STAGE_UNSPECIFIED`, `DEVELOPMENT`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`, `DECOMMISSIONED`, `END_OF_SUPPORT`. |
| `supportedOperatingSystems` | array<string> | Supported operating systems for the runtime, e.g., 'ubuntu22', etc. |
| `warnings` | array<string> | Warning messages, e.g., a deprecation warning. |

### `ScriptHandler`

- Executes a script to handle the request that matches the URL pattern.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scriptPath` | string | Path to the script from the application root directory. |

### `Service`

- A Service resource is a logical component of an application that can share state and communicate in a secure fashion with other services. For example, an application that handles customer requests might include separate services to handle tasks such as backend data analysis or API requests from mobile devices. Each service has a collection of versions that define a specific set of code used to implement the functionality of that service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `generatedCustomerMetadata` | object | Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetServiceRequest |
| `id` | string | Output only. Relative name of the service within the application. Example: default.@OutputOnly |
| `labels` | object | A set of labels to apply to this service. Labels are key/value pairs that describe the service and all resources that belong to it (e.g., versions). The labels can be used to search and group resources, and are propagated to the usage and billing reports, enabling fine-grain analysis of costs. An example of using labels is to tag resources belonging to different environments (e.g., "env=prod", "env=qa"). Label keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, dashes, and international characters. Label keys must start with a lowercase letter or an international character. Each service can have at most 32 labels. |
| `name` | string | Output only. Full path to the Service resource in the API. Example: apps/myapp/services/default.@OutputOnly |
| `networkSettings` | NetworkSettings | Ingress settings for this service. Will apply to all versions. |
| `split` | TrafficSplit | Mapping that defines fractional HTTP traffic diversion to different versions within the service. |

### `SslSettings`

- SSL configuration for a DomainMapping resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateId` | string | ID of the AuthorizedCertificate resource configuring SSL for the application. Clearing this field will remove SSL support.By default, a managed certificate is automatically created for every domain mapping. To omit SSL support or to configure SSL manually, specify SslManagementType.MANUAL on a CREATE or UPDATE request. You must be authorized to administer the AuthorizedCertificate resource to manually map it to a DomainMapping resource. Example: 12345. |
| `pendingManagedCertificateId` | string | Output only. ID of the managed AuthorizedCertificate resource currently being provisioned, if applicable. Until the new managed certificate has been successfully provisioned, the previous SSL state will be preserved. Once the provisioning process completes, the certificate_id field will reflect the new managed certificate and this field will be left empty. To remove SSL support while there is still a pending managed certificate, clear the certificate_id field with an UpdateDomainMappingRequest.@OutputOnly |
| `sslManagementType` | string enum | SSL management type for this domain. If AUTOMATIC, a managed certificate is automatically provisioned. If MANUAL, certificate_id must be manually specified in order to configure SSL for this domain. Values: `SSL_MANAGEMENT_TYPE_UNSPECIFIED`, `AUTOMATIC`, `MANUAL`. |

### `SslSettings` (v1alpha)

- SSL configuration for a DomainMapping resource.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `certificateId` | string | ID of the AuthorizedCertificate resource configuring SSL for the application. Clearing this field will remove SSL support.By default, a managed certificate is automatically created for every domain mapping. To omit SSL support or to configure SSL manually, specify no_managed_certificate on a CREATE or UPDATE request. You must be authorized to administer the AuthorizedCertificate resource to manually map it to a DomainMapping resource. Example: 12345. |
| `isManagedCertificate` | boolean | Output only. Whether the mapped certificate is an App Engine managed certificate. Managed certificates are created by default with a domain mapping. To opt out, specify no_managed_certificate on a CREATE or UPDATE request.@OutputOnly |

### `StandardSchedulerSettings`

- Scheduler settings for standard environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxInstances` | integer (int32) | Maximum number of instances to run for this version. Set to 2147483647 to disable max_instances configuration. |
| `minInstances` | integer (int32) | Minimum number of instances to run for this version. Set to zero to disable min_instances configuration. |
| `targetCpuUtilization` | number (double) | Target CPU utilization ratio to maintain when scaling. |
| `targetThroughputUtilization` | number (double) | Target throughput utilization ratio to maintain when scaling |

### `StaticFilesHandler`

- Files served directly to the user for a given URL, such as images, CSS stylesheets, or JavaScript source files. Static file handlers describe which files in the application directory are static files, and which URLs serve them.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applicationReadable` | boolean | Whether files should also be uploaded as code data. By default, files declared in static file handlers are uploaded as static data and are only served to end users; they cannot be read by the application. If enabled, uploads are charged against both your code and static data storage resource quotas. |
| `expiration` | string (google-duration) | Time a static file served by this handler should be cached by web proxies and browsers. |
| `httpHeaders` | object | HTTP headers to use for all responses from these URLs. |
| `mimeType` | string | MIME type used to serve all files served by this handler.Defaults to file-specific MIME types, which are derived from each file's filename extension. |
| `path` | string | Path to the static files matched by the URL pattern, from the application root directory. The path can refer to text matched in groupings in the URL pattern. |
| `requireMatchingFile` | boolean | Whether this handler should match the request if the file referenced by the handler does not exist. |
| `uploadPathRegex` | string | Regular expression that matches the file paths for all files that should be referenced by this handler. |

### `Status`

- The Status type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each Status message contains three pieces of data: error code, error message, and error details.You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TrafficSplit`

- Traffic routing configuration for versions within a single service. Traffic splits define how traffic directed to the service is assigned to versions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocations` | object | Mapping from version IDs within the service to fractional (0.000, 1\] allocations of traffic for that version. Each version can be specified only once, but some versions in the service may not have any traffic allocation. Services that have traffic allocated cannot be deleted until either the service is deleted or their traffic allocation is removed. Allocations must sum to 1. Up to two decimal place precision is supported for IP-based splits and up to three decimal places is supported for cookie-based splits. |
| `shardBy` | string enum | Mechanism used to determine which version a request is sent to. The traffic selection algorithm will be stable for either type until allocations are changed. Values: `UNSPECIFIED`, `COOKIE`, `IP`, `RANDOM`. |

### `UrlDispatchRule`

- Rules to match an HTTP request and dispatch that request to a service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domain` | string | Domain name to match against. The wildcard "\*" is supported if specified before a period: "\*.".Defaults to matching all domains: "\*". |
| `path` | string | Pathname within the host. Must start with a "/". A single "\*" can be included at the end of the path.The sum of the lengths of the domain and path may not exceed 100 characters. |
| `service` | string | Resource ID of a service in this application that should serve the matched request. The service must already exist. Example: default. |

### `UrlMap`

- URL pattern and description of how the URL should be handled. App Engine can handle URLs by executing application code or by serving static files uploaded with the version, such as images, CSS, or JavaScript.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiEndpoint` | ApiEndpointHandler | Uses API Endpoints to handle requests. |
| `authFailAction` | string enum | Action to take when users access resources that require authentication. Defaults to redirect. Values: `AUTH_FAIL_ACTION_UNSPECIFIED`, `AUTH_FAIL_ACTION_REDIRECT`, `AUTH_FAIL_ACTION_UNAUTHORIZED`. |
| `login` | string enum | Level of login required to access this resource. Not supported for Node.js in the App Engine standard environment. Values: `LOGIN_UNSPECIFIED`, `LOGIN_OPTIONAL`, `LOGIN_ADMIN`, `LOGIN_REQUIRED`. |
| `redirectHttpResponseCode` | string enum | 30x code to use when performing redirects for the secure field. Defaults to 302. Values: `REDIRECT_HTTP_RESPONSE_CODE_UNSPECIFIED`, `REDIRECT_HTTP_RESPONSE_CODE_301`, `REDIRECT_HTTP_RESPONSE_CODE_302`, `REDIRECT_HTTP_RESPONSE_CODE_303`, `REDIRECT_HTTP_RESPONSE_CODE_307`. |
| `script` | ScriptHandler | Executes a script to handle the requests that match this URL pattern. Only the auto value is supported for Node.js in the App Engine standard environment, for example "script": "auto". |
| `securityLevel` | string enum | Security (HTTPS) enforcement for this URL. Values: `SECURE_UNSPECIFIED`, `SECURE_DEFAULT`, `SECURE_NEVER`, `SECURE_OPTIONAL`, `SECURE_ALWAYS`. |
| `staticFiles` | StaticFilesHandler | Returns the contents of a file, such as an image, as the response. |
| `urlRegex` | string | URL prefix. Uses regular expression syntax, which means regexp special characters must be escaped, but should not contain groupings. All URLs that begin with this prefix are handled by this handler, using the portion of the URL after the prefix as part of the file path. |

### `Version`

- A Version resource is a specific set of source code and configuration files that are deployed into a service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiConfig` | ApiConfigHandler | Serving configuration for Google Cloud Endpoints (https://cloud.google.com/endpoints).Only returned in GET requests if view=FULL is set. |
| `appEngineApis` | boolean | Allows App Engine second generation runtimes to access the legacy bundled services. |
| `appEngineBundledServices` | array<string> | List of specific App Engine Bundled Services that are enabled for this Version. Values: `BUNDLED_SERVICE_TYPE_UNSPECIFIED`, `BUNDLED_SERVICE_TYPE_APP_IDENTITY_SERVICE`, `BUNDLED_SERVICE_TYPE_BLOBSTORE`, `BUNDLED_SERVICE_TYPE_CAPABILITY_SERVICE`, `BUNDLED_SERVICE_TYPE_DATASTORE_V3`, `BUNDLED_SERVICE_TYPE_DEFERRED`, `BUNDLED_SERVICE_TYPE_IMAGES`, `BUNDLED_SERVICE_TYPE_MAIL`, `BUNDLED_SERVICE_TYPE_MEMCACHE`, `BUNDLED_SERVICE_TYPE_MODULES`, `BUNDLED_SERVICE_TYPE_NAMESPACES`, `BUNDLED_SERVICE_TYPE_NDB`, `BUNDLED_SERVICE_TYPE_SEARCH`, `BUNDLED_SERVICE_TYPE_TASKQUEUES`, `BUNDLED_SERVICE_TYPE_URLFETCH`, `BUNDLED_SERVICE_TYPE_USERS`. |
| `automaticScaling` | AutomaticScaling | Automatic scaling is based on request rate, response latencies, and other application metrics. Instances are dynamically created and destroyed as needed in order to handle traffic. |
| `basicScaling` | BasicScaling | A service with basic scaling will create an instance when the application receives a request. The instance will be turned down when the app becomes idle. Basic scaling is ideal for work that is intermittent or driven by user activity. |
| `betaSettings` | object | Metadata settings that are supplied to this version to enable beta runtime features. |
| `buildEnvVariables` | object | Environment variables available to the build environment.Only returned in GET requests if view=FULL is set. |
| `createTime` | string (google-datetime) | Time that this version was created.@OutputOnly |
| `createdBy` | string | Output only. Email address of the user who created this version.@OutputOnly |
| `defaultExpiration` | string (google-duration) | Duration that static files should be cached by web proxies and browsers. Only applicable if the corresponding StaticFilesHandler (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StaticFilesHandler) does not specify its own expiration time.Only returned in GET requests if view=FULL is set. |
| `deployment` | Deployment | Code and application artifacts that make up this version.Only returned in GET requests if view=FULL is set. |
| `diskUsageBytes` | string (int64) | Output only. Total size in bytes of all the files that are included in this version and currently hosted on the App Engine disk.@OutputOnly |
| `endpointsApiService` | EndpointsApiService | Cloud Endpoints configuration.If endpoints_api_service is set, the Cloud Endpoints Extensible Service Proxy will be provided to serve the API implemented by the app. |
| `entrypoint` | Entrypoint | The entrypoint for the application. |
| `env` | string | App Engine execution environment for this version.Defaults to standard. |
| `envVariables` | object | Environment variables available to the application.Only returned in GET requests if view=FULL is set. |
| `errorHandlers` | array<ErrorHandler> | Custom static error pages. Limited to 10KB per page.Only returned in GET requests if view=FULL is set. |
| `flexibleRuntimeSettings` | FlexibleRuntimeSettings | Settings for App Engine flexible runtimes. |
| `generatedCustomerMetadata` | object | Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetVersionRequest |
| `handlers` | array<UrlMap> | An ordered list of URL-matching patterns that should be applied to incoming requests. The first matching URL handles the request and other request handlers are not attempted.Only returned in GET requests if view=FULL is set. |
| `healthCheck` | HealthCheck | Configures health checking for instances. Unhealthy instances are stopped and replaced with new instances. Only applicable in the App Engine flexible environment. |
| `id` | string | Relative name of the version within the service. Example: v1. Version names can contain only lowercase letters, numbers, or hyphens. Reserved names: "default", "latest", and any name with the prefix "ah-". |
| `inboundServices` | array<string> | Before an application can receive email or XMPP messages, the application must be configured to enable the service. Values: `INBOUND_SERVICE_UNSPECIFIED`, `INBOUND_SERVICE_MAIL`, `INBOUND_SERVICE_MAIL_BOUNCE`, `INBOUND_SERVICE_XMPP_ERROR`, `INBOUND_SERVICE_XMPP_MESSAGE`, `INBOUND_SERVICE_XMPP_SUBSCRIBE`, `INBOUND_SERVICE_XMPP_PRESENCE`, `INBOUND_SERVICE_CHANNEL_PRESENCE`, `INBOUND_SERVICE_WARMUP`. |
| `instanceClass` | string | Instance class that is used to run this version. Valid values are: AutomaticScaling: F1, F2, F4, F4_1G ManualScaling or BasicScaling: B1, B2, B4, B8, B4_1GDefaults to F1 for AutomaticScaling and B1 for ManualScaling or BasicScaling. |
| `libraries` | array<Library> | Configuration for third-party Python runtime libraries that are required by the application.Only returned in GET requests if view=FULL is set. |
| `livenessCheck` | LivenessCheck | Configures liveness health checking for instances. Unhealthy instances are stopped and replaced with new instances |
| `manualScaling` | ManualScaling | A service with manual scaling runs continuously, allowing you to perform complex initialization and rely on the state of its memory over time. Manually scaled versions are sometimes referred to as "backends". |
| `name` | string | Output only. Full path to the Version resource in the API. Example: apps/myapp/services/default/versions/v1.@OutputOnly |
| `network` | Network | Extra network settings. Only applicable in the App Engine flexible environment. |
| `nobuildFilesRegex` | string | Files that match this pattern will not be built into this version. Only applicable for Go runtimes.Only returned in GET requests if view=FULL is set. |
| `readinessCheck` | ReadinessCheck | Configures readiness health checking for instances. Unhealthy instances are not put into the backend traffic rotation. |
| `resources` | Resources | Machine resources for this version. Only applicable in the App Engine flexible environment. |
| `runtime` | string | Desired runtime. Example: python27. |
| `runtimeApiVersion` | string | The version of the API in the given runtime environment. Please see the app.yaml reference for valid values at https://cloud.google.com/appengine/docs/standard//config/appref |
| `runtimeChannel` | string | The channel of the runtime to use. Only available for some runtimes. Defaults to the default channel. |
| `runtimeMainExecutablePath` | string | The path or name of the app's main executable. |
| `serviceAccount` | string | The identity that the deployed version will run as. Admin API will use the App Engine Appspot service account as default if this field is neither provided in app.yaml file nor through CLI flag. |
| `servingStatus` | string enum | Current serving status of this version. Only the versions with a SERVING status create instances and can be billed.SERVING_STATUS_UNSPECIFIED is an invalid value. Defaults to SERVING. Values: `SERVING_STATUS_UNSPECIFIED`, `SERVING`, `STOPPED`. |
| `threadsafe` | boolean | Whether multiple requests can be dispatched to this version at once. |
| `versionUrl` | string | Output only. Serving URL for this version. Example: "https://myversion-dot-myservice-dot-myapp.appspot.com"@OutputOnly |
| `vm` | boolean | Whether to deploy this version in a container on a virtual machine. |
| `vpcAccess` | VpcAccess | Enables VPC access connectivity for standard apps. |
| `vpcAccessConnector` | VpcAccessConnector | Enables VPC connectivity for standard apps. |
| `zones` | array<string> | The Google Compute Engine zones that are supported by this version in the App Engine flexible environment. Deprecated. |

### `Volume`

- Volumes mounted within the app container. Only applicable in the App Engine flexible environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Unique name for the volume. |
| `sizeGb` | number (double) | Volume size in gigabytes. |
| `volumeType` | string | Underlying volume type, e.g. 'tmpfs'. |

### `VpcAccess`

- VPC Access settings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkInterfaces` | array<VpcNetworkInterface> | The Direct VPC configuration. Currently only single network interface is supported. |
| `vpcEgress` | string enum | The traffic egress setting for the VPC network interface, controlling what traffic is diverted through it. Values: `VPC_EGRESS_UNSPECIFIED`, `ALL_TRAFFIC`, `PRIVATE_IP_RANGES`. |

### `VpcAccessConnector`

- VPC access connector specification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `egressSetting` | string enum | The egress setting for the connector, controlling what traffic is diverted through it. Values: `EGRESS_SETTING_UNSPECIFIED`, `ALL_TRAFFIC`, `PRIVATE_IP_RANGES`. |
| `name` | string | Full Serverless VPC Access Connector name e.g. projects/my-project/locations/us-central1/connectors/c1. |

### `VpcNetworkInterface`

- Network interface key message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | Optional. The VPC network that the App Engine resource will be able to send traffic to. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If network is not specified, it will be looked up from the subnetwork. Could be either a short name or a full path. e.g. {VPC_NETWORK} or projects/{HOST_PROJECT_ID}/global/networks/{VPC_NETWORK} |
| `subnet` | string | Optional. The VPC subnetwork that the App Engine resource will get IPs from. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used. Could be either a short name or a full path. e.g. {SUBNET_NAME} or projects/{HOST_PROJECT_ID}/regions/{REGION}/subnetworks/{SUBNET_NAME} |
| `tags` | array<string> | Optional. The network tags that will be applied to this App Engine resource. |

### `ZipInfo`

- The zip file information for a zip deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filesCount` | integer (int32) | An estimate of the number of files in a zip for a zip deployment. If set, must be greater than or equal to the actual number of files. Used for optimizing performance; if not provided, deployment may be slow. |
| `sourceUrl` | string | URL of the zip file to deploy from. Must be a URL to a resource in Google Cloud Storage in the form 'http(s)://storage.googleapis.com//'. |

### Shape of `ApiConfigHandler`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "authFailAction": "string enum",
  "login": "string enum",
  "script": "string",
  "securityLevel": "string enum",
  "url": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta, v1alpha of `appengine` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://appengine.googleapis.com/$discovery/rest?version=v1, https://appengine.googleapis.com/$discovery/rest?version=v1beta, https://appengine.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
