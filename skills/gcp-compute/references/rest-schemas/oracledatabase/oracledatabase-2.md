---
source: https://oracledatabase.googleapis.com/$discovery/rest?version=v1
---

# Oracle Database@Google Cloud API message schemas (oracledatabase) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/oracledatabase/`.

### `GoldengateJavaMessageServiceConnectionProperties`

- The properties of GoldengateJavaMessageServiceConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authenticationType` | string enum | Optional. Authentication type for Java Message Service. Values: `JMS_AUTHENTICATION_TYPE_UNSPECIFIED`, `NONE`, `BASIC`. |
| `connectionFactory` | string | Optional. The Java class implementing javax.jms.ConnectionFactory interface supplied by the JMS provider. |
| `connectionUrl` | string | Optional. Connection URL of the Java Message Service, specifying the protocol, host, and port. e.g.: 'mq://myjms.host.domain:7676' |
| `jndiConnectionFactory` | string | Optional. The Connection Factory can be looked up using this name. e.g.: 'ConnectionFactory' |
| `jndiInitialContextFactory` | string | Optional. The implementation of javax.naming.spi.InitialContextFactory interface used to obtain initial naming context. |
| `jndiProviderUrl` | string | Optional. The URL that Java Message Service will use to contact the JNDI provider. e.g.: 'tcp://myjms.host.domain:61616?jms.prefetchPolicy.all=1000' |
| `jndiSecurityCredentialsSecret` | string | Optional. The password associated to the principal. |
| `jndiSecurityPrincipal` | string | Optional. Specifies the identity of the principal (user) to be authenticated. |
| `keyStoreFile` | string | Optional. The base64 encoded content of the KeyStore file. |
| `keyStorePassword` | string | Optional. Input only. The KeyStore password in plain text. |
| `keyStorePasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses to connect the Java Message Service in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect the associated Java Message Service. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `securityProtocol` | string enum | Optional. Security protocol for Java Message Service. Values: `JMS_SECURITY_PROTOCOL_UNSPECIFIED`, `PLAIN`, `TLS`, `MTLS`. |
| `sslKeyPassword` | string | Optional. Input only. The password for the cert inside of the KeyStore in plain text. |
| `sslKeyPasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for the cert inside of the KeyStore. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `technologyType` | string | Optional. The technology type of JavaMessageServiceConnection. |
| `trustStoreFile` | string | Optional. The base64 encoded content of the TrustStore file. |
| `trustStorePassword` | string | Optional. Input only. The TrustStore password in plain text. |
| `trustStorePasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `useJndi` | boolean | Optional. If set to true, Java Naming and Directory Interface (JNDI) properties should be provided. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect to the Java Message Service. |

### `GoldengateKafkaConnectionProperties`

- The properties of GoldengateKafkaConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bootstrapServers` | array<KafkaBootstrapServer> | Optional. Kafka bootstrap. Equivalent of bootstrap.servers configuration property in Kafka: list of KafkaBootstrapServer objects specified by host/port. Used for establishing the initial connection to the Kafka cluster. Example: "server1.example.com:9092,server2.example.com:9092" |
| `clusterId` | string | Optional. The OCID of the Kafka cluster being referenced from OCI Streaming with Apache Kafka. |
| `consumerPropertiesFile` | string | Optional. The base64 encoded content of the consumer.properties file. |
| `keyStoreFile` | string | Optional. The base64 encoded content of the KeyStore file. |
| `keyStorePassword` | string | Optional. Input only. The KeyStore password in plain text. |
| `keyStorePasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `password` | string | Optional. Input only. The password for Kafka basic/SASL auth in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for Kafka basic/SASL auth. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `producerPropertiesFile` | string | Optional. The base64 encoded content of the producer.properties file. |
| `securityProtocol` | string enum | Optional. Security Type for Kafka. Values: `KAFKA_SECURITY_PROTOCOL_UNSPECIFIED`, `SSL`, `SASL_SSL`, `PLAINTEXT`, `SASL_PLAINTEXT`. |
| `sslKeyPassword` | string | Optional. Input only. The password for the cert inside of the KeyStore in plain text. |
| `sslKeyPasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for the cert inside of the KeyStore. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `streamPoolId` | string | Optional. The OCID of the stream pool being referenced. |
| `technologyType` | string | Optional. The technology type of KafkaConnection. |
| `trustStoreFile` | string | Optional. The base64 encoded content of the TrustStore file. |
| `trustStorePassword` | string | Optional. Input only. The TrustStore password in plain text. |
| `trustStorePasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `useResourcePrincipal` | boolean | Optional. Specifies that the user intends to authenticate to the instance using a resource principal. Applicable only for OCI Streaming connections. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect the associated system of the given technology. |

### `GoldengateKafkaSchemaRegistryConnectionProperties`

- The properties of GoldengateKafkaSchemaRegistryConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authenticationType` | string enum | Optional. Used authentication mechanism to access Schema Registry. Values: `AUTHENTICATION_TYPE_UNSPECIFIED`, `NONE`, `BASIC`, `MUTUAL`. |
| `keyStoreFile` | string | Optional. The base64 encoded content of the KeyStore file. |
| `keyStorePassword` | string | Optional. Input only. The KeyStore password in plain text. |
| `keyStorePasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `password` | string | Optional. Input only. The password to access Schema Registry in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password to access Schema Registry using basic authentication. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `sslKeyPassword` | string | Optional. Input only. The password for the cert inside the KeyStore in plain text. |
| `sslKeyPasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password for the cert inside the KeyStore. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `technologyType` | string | Optional. The technology type of KafkaSchemaRegistryConnection. |
| `trustStoreFile` | string | Optional. The base64 encoded content of the TrustStore file. |
| `trustStorePassword` | string | Optional. Input only. The TrustStore password in plain text. |
| `trustStorePasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `url` | string | Optional. Kafka Schema Registry URL. e.g.: 'https://server1.us.oracle.com:8081' |
| `username` | string | Optional. The username to access Schema Registry using basic authentication. This value is injected into 'schema.registry.basic.auth.user.info=user:password' configuration property. |

### `GoldengateMaintenanceConfig`

- The maintenance configuration of the GoldengateDeployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bundleReleaseUpgradePeriodDays` | integer (int32) | Optional. Defines auto upgrade period for bundle releases. Manually configured period cannot be longer than service defined period for bundle releases. This period must be shorter or equal to major release upgrade period. Not passing this field during create will equate to using the service default. |
| `interimReleaseUpgradePeriodDays` | integer (int32) | Optional. Defines auto upgrade period for interim releases. This period must be shorter or equal to bundle release upgrade period. |
| `isInterimReleaseAutoUpgradeEnabled` | boolean | Optional. By default auto upgrade for interim releases are not enabled. If auto-upgrade is enabled for interim release, you have to specify interim_release_upgrade_period_days too. |
| `majorReleaseUpgradePeriodDays` | integer (int32) | Optional. Defines auto upgrade period for major releases. Manually configured period cannot be longer than service defined period for major releases. Not passing this field during create will equate to using the service default. |
| `securityPatchUpgradePeriodDays` | integer (int32) | Optional. Defines auto upgrade period for releases with security fix. Manually configured period cannot be longer than service defined period for security releases. Not passing this field during create will equate to using the service default. |

### `GoldengateMaintenanceWindow`

- The maintenance window of the GoldengateDeployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Required. Days of the week. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `startHour` | integer (int32) | Required. Start hour for maintenance period. Hour is in UTC. |

### `GoldengateMicrosoftFabricConnectionProperties`

- The properties of GoldengateMicrosoftFabricConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Optional. Azure client ID of the application. |
| `clientSecret` | string | Optional. Client secret associated with the client id. |
| `endpoint` | string | Optional. Optional Microsoft Fabric service endpoint. Default value: https://onelake.dfs.fabric.microsoft.com |
| `technologyType` | string | Optional. The technology type of MicrosoftFabricConnection. |
| `tenantId` | string | Optional. Azure tenant ID of the application. |

### `GoldengateMicrosoftSqlserverConnectionProperties`

- The properties of GoldengateMicrosoftSqlserverConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalAttributes` | array<NameValuePair> | Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string. |
| `database` | string | Optional. The name of the database. |
| `host` | string | Optional. The name or address of a host. |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses for Microsoft SQL Server connection in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Microsoft SQL Server connection. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `port` | integer (int32) | Optional. The port of an endpoint usually specified for a connection. |
| `securityProtocol` | string enum | Optional. Security Type for Microsoft SQL Server. Values: `MICROSOFT_SQLSERVER_SECURITY_PROTOCOL_UNSPECIFIED`, `PLAIN`, `TLS`. |
| `serverCertificateValidationRequired` | boolean | Optional. If set to true, the driver validates the certificate that is sent by the database server. |
| `sslCaFile` | string | Optional. Database Certificate - The base64 encoded content of a .pem or .crt file containing the server public key (for 1-way SSL). |
| `technologyType` | string | Optional. The technology type of MicrosoftSqlserverConnection. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect to the Microsoft SQL Server. |

### `GoldengateMongodbConnectionProperties`

- The properties of GoldengateMongodbConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionString` | string | Optional. MongoDB connection string. e.g.: 'mongodb://mongodb0.example.com:27017/recordsrecords' |
| `databaseId` | string | Optional. The OCID of the Oracle Autonomous Json Database. |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses to connect the Mongodb connection in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect the Mongodb connection. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `securityProtocol` | string enum | Optional. Security Type for MongoDB. Values: `MONGODB_SECURITY_PROTOCOL_UNSPECIFIED`, `PLAIN`, `TLS`, `MTLS`. |
| `technologyType` | string | Optional. The technology type of MongodbConnection. |
| `tlsCaFile` | string | Optional. Database Certificate - The base64 encoded content of a .pem file, containing the server public key (for 1 and 2-way SSL). |
| `tlsCertificateKeyFile` | string | Optional. Client Certificate - The base64 encoded content of a .pem file, containing the client public key (for 2-way SSL). |
| `tlsCertificateKeyFilePassword` | string | Optional. Input only. The Client Certificate key file password in plain text. |
| `tlsCertificateKeyFilePasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the Client Certificate key file password in Secret Manager. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect to the database. |

### `GoldengateMysqlConnectionProperties`

- Properties of GoldengateMysqlConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalAttributes` | array<NameValuePair> | Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string. |
| `database` | string | Optional. The name of the database. |
| `dbSystemId` | string | Optional. The OCID of the database system being referenced. |
| `host` | string | Optional. The name or address of a host. |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses to connect to MySQL in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect to MySQL. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `port` | integer (int32) | Optional. The port of an endpoint usually specified for a connection. |
| `securityProtocol` | string enum | Optional. Security Type for MySQL. Values: `MYSQL_SECURITY_PROTOCOL_UNSPECIFIED`, `PLAIN`, `TLS`, `MTLS`. |
| `sslCaFile` | string | Optional. Database Certificate - The base64 encoded content of a .pem or .crt file containing the server public key (for 1 and 2-way SSL). |
| `sslCertFile` | string | Optional. Client Certificate - The base64 encoded content of a .pem or .crt file containing the client public key (for 2-way SSL). |
| `sslCrlFile` | string | Optional. The base64 encoded list of certificates revoked by the trusted certificate authorities (Trusted CA). |
| `sslKeyFile` | string | Optional. Client Key - The base64 encoded content of a .pem or .crt file containing the client private key (for 2-way SSL). |
| `sslMode` | string enum | Optional. SSL modes for MySQL. Values: `SSL_MODE_UNSPECIFIED`, `DISABLED`, `PREFERRED`, `REQUIRED`, `VERIFY_CA`, `VERIFY_IDENTITY`. |
| `technologyType` | string | Optional. The technology type of MysqlConnection. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect the associated system of the given technology. |

### `GoldengateOciObjectStorageConnectionProperties`

- The properties of GoldengateOciObjectStorageConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `privateKeyFile` | string | Optional. The content of the private key file (PEM file) corresponding to the API key of the fingerprint. |
| `privateKeyPassphraseSecret` | string | Optional. The passphrase of the private key. |
| `publicKeyFingerprint` | string | Optional. The fingerprint of the API Key of the user specified by the userId. |
| `region` | string | Optional. The name of the region of OCI Object Storage. e.g.: us-ashburn-1 If the region is not provided, backend will default to the default region. |
| `technologyType` | string | Optional. The technology type of OciObjectStorageConnection. |
| `tenancyId` | string | Optional. The OCID of the related OCI tenancy. |
| `useResourcePrincipal` | boolean | Optional. Specifies that the user intends to authenticate to the instance using a resource principal. |
| `userId` | string | Optional. The OCID of the OCI user who will access the Object Storage. The user must have write access to the bucket they want to connect to. |

### `GoldengateOggDeployment`

- The Ogg data of the GoldengateDeployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminPassword` | string | Optional. Input only. The Goldengate deployment console password in plain text. |
| `adminPasswordSecretVersion` | string | Optional. Input only. The Goldengate deployment console password secret version. |
| `adminUsername` | string | Required. The Goldengate deployment console username. |
| `certificate` | string | Output only. The certificate of the GoldengateDeployment. |
| `credentialStore` | string enum | Output only. The credential store of the GoldengateDeployment. Values: `CREDENTIAL_STORE_UNSPECIFIED`, `GOLDENGATE`, `IAM`. |
| `deployment` | string | Required. The name given to the Goldengate service deployment. The name must be 1 to 32 characters long, must contain only alphanumeric characters and must start with a letter. |
| `groupRolesMapping` | GoldengateGroupToRolesMapping | Output only. The group to roles mapping of the GoldengateDeployment. |
| `identityDomainId` | string | Output only. The identity domain id of the GoldengateDeployment. |
| `oggVersion` | string | Optional. Version of OGG |
| `passwordSecretId` | string | Output only. The password secret id of the GoldengateDeployment. |

### `GoldengateOracleAIDataPlatformConnectionProperties`

- The properties of GoldengateOracleAIDataPlatformConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionUrl` | string | Optional. Connection URL. It must start with 'jdbc:spark://' |
| `privateKeyFile` | string | Optional. The content of the private key file (PEM file) corresponding to the API key of the fingerprint. |
| `privateKeyPassphraseSecret` | string | Optional. The passphrase of the private key. |
| `publicKeyFingerprint` | string | Optional. The fingerprint of the API Key of the user specified by the user_id. |
| `region` | string | Optional. The name of the region. e.g.: us-ashburn-1 |
| `technologyType` | string | Optional. The technology type of OracleAiDataPlatformConnection. |
| `tenancyId` | string | Optional. The OCID of the related OCI tenancy. |
| `useResourcePrincipal` | boolean | Optional. Specifies that the user intends to authenticate to the instance using a resource principal. |
| `userId` | string | Optional. The OCID of the OCI user who will access. |

### `GoldengateOracleConnectionProperties`

- The properties of Goldengate Oracle Database Connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authenticationMode` | string enum | Optional. Authentication mode. Values: `ORACLE_AUTHENTICATION_MODE_UNSPECIFIED`, `TLS`, `MTLS`. |
| `connectionString` | string | Optional. Connect descriptor or Easy Connect Naming method used to connect to a database. |
| `gcpOracleDatabaseId` | string | Optional. Autonomous AI Database instance id of database in Oracle Database @ Google Cloud. If gcp_oracle_database_id is provided, connection_string must be empty. Format: projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database} |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `sessionMode` | string enum | Optional. The mode of the database connection session to be established by the data client. Values: `SESSION_MODE_UNSPECIFIED`, `DIRECT`, `REDIRECT`. |
| `technologyType` | string | Optional. The technology type. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect. |
| `walletFile` | string | Optional. The wallet contents Oracle Goldengate uses to make connections to a database. This attribute is expected to be base64 encoded. |

### `GoldengateOracleNosqlConnectionProperties`

- The properties of GoldengateOracleNosqlConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `privateKeyFile` | string | Optional. The content of the private key file (PEM file) corresponding to the API key of the fingerprint. |
| `privateKeyPassphraseSecret` | string | Optional. The passphrase of the private key. |
| `publicKeyFingerprint` | string | Optional. The fingerprint of the API Key of the user specified by the userId. |
| `region` | string | Optional. The name of the region. e.g.: us-ashburn-1 |
| `technologyType` | string | Optional. The technology type of OracleNosqlConnection. |
| `tenancyId` | string | Optional. The OCID of the OCI tenancy. |
| `useResourcePrincipal` | boolean | Optional. Specifies that the user intends to authenticate to the instance using a resource principal. |
| `userId` | string | Optional. The OCID of the OCI user who will access the Oracle NoSQL database. |

### `GoldengatePlacement`

- The placement of the GoldengateDeployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availabilityDomain` | string | Output only. The availability domain. |
| `faultDomain` | string | Output only. The fault domain. |

### `GoldengatePostgresqlConnectionProperties`

- The properties of GoldengatePostgresqlConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalAttributes` | array<NameValuePair> | Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string. |
| `database` | string | Optional. The name of the database. |
| `dbSystemId` | string | Optional. The OCID of the database system being referenced. |
| `host` | string | Optional. The name or address of a host. |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses for PostgreSQL connection in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for PostgreSQL connection. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `port` | integer (int32) | Optional. The port of an endpoint usually specified for a connection. |
| `securityProtocol` | string enum | Optional. Security protocol for PostgreSQL. Values: `POSTGRESQL_SECURITY_PROTOCOL_UNSPECIFIED`, `PLAIN`, `TLS`, `MTLS`. |
| `sslCaFile` | string | Optional. The base64 encoded certificate of the trusted certificate authorities (Trusted CA) for PostgreSQL. |
| `sslCertFile` | string | Optional. The base64 encoded certificate of the PostgreSQL server. |
| `sslCrlFile` | string | Optional. The base64 encoded list of certificates revoked by the trusted certificate authorities (Trusted CA). |
| `sslKeyFile` | string | Optional. The base64 encoded private key of the PostgreSQL server. |
| `sslMode` | string enum | Optional. SSL modes for PostgreSQL. Values: `POSTGRESQL_SSL_MODE_UNSPECIFIED`, `PREFER`, `REQUIRE`, `VERIFY_CA`, `VERIFY_FULL`. |
| `technologyType` | string | Optional. The technology type of PostgresqlConnection. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect the associated system of the given technology. |

### `GoldengateRedisConnectionProperties`

- The properties of GoldengateRedisConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authenticationType` | string enum | Optional. Authentication type for Redis. Values: `REDIS_AUTHENTICATION_TYPE_UNSPECIFIED`, `NONE`, `BASIC`. |
| `keyStoreFile` | string | Optional. The base64 encoded content of the KeyStore file. |
| `keyStorePassword` | string | Optional. Input only. The KeyStore password in plain text. |
| `keyStorePasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the KeyStore password. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses for Redis connection in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Redis connection. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `redisClusterId` | string | Optional. The OCID of the Redis cluster. |
| `securityProtocol` | string enum | Optional. Security protocol for Redis. Values: `REDIS_SECURITY_PROTOCOL_UNSPECIFIED`, `PLAIN`, `TLS`, `MTLS`. |
| `servers` | string | Optional. Comma separated list of Redis server addresses, specified as host:port entries, where :port is optional. If port is not specified, it defaults to 6379. Example: "server1.example.com:6379,server2.example.com:6379" |
| `technologyType` | string | Optional. The technology type of RedisConnection. |
| `trustStoreFile` | string | Optional. The base64 encoded content of the TrustStore file. |
| `trustStorePassword` | string | Optional. Input only. The TrustStore password in plain text. |
| `trustStorePasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the TrustStore password. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect the associated system of the given technology. |

### `GoldengateSnowflakeConnectionProperties`

- The properties of GoldengateSnowflakeConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authenticationType` | string enum | Optional. Used authentication mechanism to access Snowflake. Values: `AUTHENTICATION_TYPE_UNSPECIFIED`, `BASIC`, `KEY_PAIR`. |
| `connectionUrl` | string | Optional. JDBC connection URL. e.g.: 'jdbc:snowflake://.snowflakecomputing.com/?warehouse=&db=' |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses to connect to Snowflake platform in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses to connect to Snowflake platform. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `privateKeyFile` | string | Optional. The content of private key file in PEM format. |
| `privateKeyPassphraseSecret` | string | Optional. Password if the private key file is encrypted. |
| `technologyType` | string | Optional. The technology type of SnowflakeConnection. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect to Snowflake. |

### `GoogleCloudStorageIcebergStorage`

- The Google Cloud Storage Iceberg storage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. The bucket of Google Cloud Storage. |
| `projectId` | string | Required. The project ID of Google Cloud Storage. |
| `serviceAccountKeyFile` | string | Optional. The base64 encoded content of the service account key file of Google Cloud Storage. |

### `IcebergCatalog`

- The Iceberg catalog details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `catalogType` | string enum | Required. The type of Iceberg catalog. Values: `CATALOG_TYPE_UNSPECIFIED`, `GLUE`, `HADOOP`, `NESSIE`, `POLARIS`, `REST`. |
| `glueIcebergCatalog` | GlueIcebergCatalog | The Glue Iceberg catalog. |
| `nessieIcebergCatalog` | NessieIcebergCatalog | The Nessie Iceberg catalog. |
| `polarisIcebergCatalog` | PolarisIcebergCatalog | The Polaris Iceberg catalog. |
| `restIcebergCatalog` | RestIcebergCatalog | The REST Iceberg catalog. |

### `IcebergStorage`

- The Iceberg storage details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `amazonS3IcebergStorage` | AmazonS3IcebergStorage | The Amazon S3 Iceberg storage. |
| `azureDataLakeStorageIcebergStorage` | AzureDataLakeStorageIcebergStorage | The Azure Data Lake Storage Iceberg storage. |
| `googleCloudStorageIcebergStorage` | GoogleCloudStorageIcebergStorage | The Google Cloud Storage Iceberg storage. |
| `storageType` | string enum | Required. The type of Iceberg storage. Values: `STORAGE_TYPE_UNSPECIFIED`, `AMAZON_S3`, `GOOGLE_CLOUD_STORAGE`, `AZURE_DATA_LAKE_STORAGE`. |

### `IdentityConnector`

- The identity connector details which will allow OCI to securely access the resources in the customer project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionState` | string enum | Output only. The connection state of the identity connector. Values: `CONNECTION_STATE_UNSPECIFIED`, `CONNECTED`, `PARTIALLY_CONNECTED`, `DISCONNECTED`, `UNKNOWN`. |
| `identityConnectorId` | string | Output only. The unique partner identifier for the Identity Connector, used to establish secure cross-cloud access between Google Cloud and OCI. This corresponds directly to the ID of the OracleDbGcpIdentityConnector resource in Oracle Cloud Infrastructure (OCI). |
| `lifecycleStateDetails` | string | Output only. Additional information about the current lifecycle state. |
| `serviceAgentEmail` | string | Output only. A google managed service account on which customers can grant roles to access resources in the customer project. Example: `p176944527254-55-75119d87fd8f@gcp-sa-oci.iam.gserviceaccount.com` |
| `workloadIdentityPool` | string | Output only. The resource name of the Workload Identity Pool configured for identity federation with OCI. This exact pool name can be used to configure VPC Service Controls (VPC-SC) egress rules. Format: `projects/{project}/locations/global/workloadIdentityPools/{workload_identity_pool}` |

### `IngressIp`

- The ingress IPs of the GoldengateDeployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ingressIpAddress` | string | Output only. The ingress IP. |

### `KafkaBootstrapServer`

- Represents a Kafka bootstrap server with host name, optional port defaults to 9092, and an optional private ip.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | Required. The name or address of a host. |
| `port` | integer (int32) | Optional. The port of an endpoint usually specified for a connection. |
| `privateIpAddress` | string | Optional. The private IP address of the connection's endpoint in the customer's VCN, typically a database endpoint or a big data endpoint (e.g. Kafka bootstrap server). In case the privateIp is provided, the subnetId must also be provided. In case the privateIp (and the subnetId) is not provided it is assumed the datasource is publicly accessible. In case the connection is accessible only privately, the lack of privateIp will result in not being able to access the connection. |

### `ListAutonomousDatabaseBackupsResponse`

- The response for `AutonomousDatabaseBackup.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autonomousDatabaseBackups` | array<AutonomousDatabaseBackup> | The list of Autonomous Database Backups. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListAutonomousDatabaseCharacterSetsResponse`

- The response for `AutonomousDatabaseCharacterSet.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autonomousDatabaseCharacterSets` | array<AutonomousDatabaseCharacterSet> | The list of Autonomous Database Character Sets. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListAutonomousDatabasesResponse`

- The response for `AutonomousDatabase.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autonomousDatabases` | array<AutonomousDatabase> | The list of Autonomous Databases. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListAutonomousDbVersionsResponse`

- The response for `AutonomousDbVersion.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autonomousDbVersions` | array<AutonomousDbVersion> | The list of Autonomous Database versions. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListCloudExadataInfrastructuresResponse`

- The response for `CloudExadataInfrastructures.list`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudExadataInfrastructures` | array<CloudExadataInfrastructure> | The list of Exadata Infrastructures. |
| `nextPageToken` | string | A token for fetching next page of response. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListCloudVmClustersResponse`

- The response for `CloudVmCluster.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudVmClusters` | array<CloudVmCluster> | The list of VM Clusters. |
| `nextPageToken` | string | A token to fetch the next page of results. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListDatabaseCharacterSetsResponse`

- The response for `DatabaseCharacterSet.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseCharacterSets` | array<DatabaseCharacterSet> | The list of DatabaseCharacterSets. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListDatabaseConnectionsResponse`

- The response for `DatabaseConnection.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseConnections` | array<DatabaseConnection> | The list of DatabaseConnections. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListDatabasesResponse`

- The response for `Database.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databases` | array<Database> | The list of Databases. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListDbNodesResponse`

- The response for `DbNode.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbNodes` | array<DbNode> | The list of DB Nodes |
| `nextPageToken` | string | A token identifying a page of results the node should return. |

### `ListDbServersResponse`

- The response for `DbServer.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbServers` | array<DbServer> | The list of database servers. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListDbSystemComputePerformancesResponse`

- Message for response to listing DbSystemComputePerformances
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbSystemComputePerformances` | array<DbSystemComputePerformance> | The list of DbSystemComputePerformance. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListDbSystemInitialStorageSizesResponse`

- The response for `DbSystemInitialStorageSizes.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbSystemInitialStorageSizes` | array<DbSystemInitialStorageSize> | The list of DbSystemInitialStorageSizes. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListDbSystemShapesResponse`

- The response for `DbSystemShape.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbSystemShapes` | array<DbSystemShape> | The list of Database System shapes. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListDbSystemsResponse`

- The response for `DbSystem.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbSystems` | array<DbSystem> | The list of DbSystems. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListDbVersionsResponse`

- The response for `DbVersions.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbVersions` | array<DbVersion> | The list of DbVersions. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListEntitlementsResponse`

- The response for `Entitlement.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlements` | array<Entitlement> | The list of Entitlements |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListExadbVmClustersResponse`

- The response for `ExadbVmCluster.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exadbVmClusters` | array<ExadbVmCluster> | The list of ExadbVmClusters. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListExascaleDbStorageVaultsResponse`

- The response for `ExascaleDbStorageVault.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exascaleDbStorageVaults` | array<ExascaleDbStorageVault> | The ExascaleDbStorageVaults. |
| `nextPageToken` | string | A token identifying a page of results the server should return. If present, the next page token can be provided to a subsequent ListExascaleDbStorageVaults call to list the next page. If empty, there are no more pages. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListFlexComponentsResponse`

- Message for response to listing FlexComponents
- Version: v1

| Field | Type | Description |
|---|---|---|
| `flexComponents` | array<FlexComponent> | The list of FlexComponent |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListGiVersionsResponse`

- The response for `GiVersion.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `giVersions` | array<GiVersion> | The list of Oracle Grid Infrastructure (GI) versions. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListGoldengateConnectionAssignmentsResponse`

- Response message for listing GoldengateConnectionAssignments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `goldengateConnectionAssignments` | array<GoldengateConnectionAssignment> | The list of GoldengateConnectionAssignments. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListGoldengateConnectionTypesResponse`

- Message for response to listing GoldengateConnectionTypes
- Version: v1

| Field | Type | Description |
|---|---|---|
| `goldengateConnectionTypes` | array<GoldengateConnectionType> | The list of GoldengateConnectionType |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListGoldengateConnectionsResponse`

- The response for `GoldengateConnection.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `goldengateConnections` | array<GoldengateConnection> | The list of GoldengateConnections. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Optional. Locations that could not be reached. |

### `ListGoldengateDeploymentEnvironmentsResponse`

- Message for response to listing GoldengateDeploymentEnvironments
- Version: v1

| Field | Type | Description |
|---|---|---|
| `goldengateDeploymentEnvironments` | array<GoldengateDeploymentEnvironment> | The list of GoldengateDeploymentEnvironment |
| `nextPageToken` | string | A token identifying a page of results the server should return. If this field is empty, there are no subsequent pages. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListGoldengateDeploymentTypesResponse`

- Message for response to listing GoldengateDeploymentTypes
- Version: v1

| Field | Type | Description |
|---|---|---|
| `goldengateDeploymentTypes` | array<GoldengateDeploymentType> | The list of GoldengateDeploymentType |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unordered list. The resource names of locations that could not be reached. |

### `ListGoldengateDeploymentVersionsResponse`

- Message for response to listing GoldengateDeploymentVersions
- Version: v1

| Field | Type | Description |
|---|---|---|
| `goldengateDeploymentVersions` | array<GoldengateDeploymentVersion> | The list of GoldengateDeploymentVersion |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListGoldengateDeploymentsResponse`

- The response for `GoldengateDeployment.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `goldengateDeployments` | array<GoldengateDeployment> | The list of GoldengateDeployments. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Optional. Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListMinorVersionsResponse`

- The response for `MinorVersion.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `minorVersions` | array<MinorVersion> | The list of MinorVersions. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListOdbDnsZonesResponse`

- The response for `OdbDnsZone.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `odbDnsZones` | array<OdbDnsZone> | The list of OdbDnsZones. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListOdbNetworksResponse`

- The response for `OdbNetwork.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `odbNetworks` | array<OdbNetwork> | The list of ODB Networks. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListOdbSubnetsResponse`

- The response for `OdbSubnet.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `odbSubnets` | array<OdbSubnet> | The list of ODB Subnets. |
| `unreachable` | array<string> | Unreachable locations when listing resources across all locations using wildcard location '-'. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListPluggableDatabasesResponse`

- The response for `PluggableDatabase.List`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `pluggableDatabases` | array<PluggableDatabase> | The list of PluggableDatabases. |

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

### `LocationMetadata`

- Metadata for a given Location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcpOracleZones` | array<string> | Output only. Google Cloud Platform Oracle zones in a location. |

### `MaintenanceWindow`

- Maintenance window as defined by Oracle. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/MaintenanceWindow
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customActionTimeoutMins` | integer (int32) | Optional. Determines the amount of time the system will wait before the start of each database server patching operation. Custom action timeout is in minutes and valid value is between 15 to 120 (inclusive). |
| `daysOfWeek` | array<string> | Optional. Days during the week when maintenance should be performed. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `hoursOfDay` | array<integer> | Optional. The window of hours during the day when maintenance should be performed. The window is a 4 hour slot. Valid values are: 0 - represents time slot 0:00 - 3:59 UTC 4 - represents time slot 4:00 - 7:59 UTC 8 - represents time slot 8:00 - 11:59 UTC 12 - represents time slot 12:00 - 15:59 UTC 16 - represents time slot 16:00 - 19:59 UTC 20 - represents time slot 20:00 - 23:59 UTC |
| `isCustomActionTimeoutEnabled` | boolean | Optional. If true, enables the configuration of a custom action timeout (waiting period) between database server patching operations. |
| `leadTimeWeek` | integer (int32) | Optional. Lead time window allows user to set a lead time to prepare for a down time. The lead time is in weeks and valid value is between 1 to 4. |
| `months` | array<string> | Optional. Months during the year when maintenance should be performed. Values: `MONTH_UNSPECIFIED`, `JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`, `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`. |
| `patchingMode` | string enum | Optional. Cloud CloudExadataInfrastructure node patching method, either "ROLLING" or "NONROLLING". Default value is ROLLING. Values: `PATCHING_MODE_UNSPECIFIED`, `ROLLING`, `NON_ROLLING`. |
| `preference` | string enum | Optional. The maintenance window scheduling preference. Values: `MAINTENANCE_WINDOW_PREFERENCE_UNSPECIFIED`, `CUSTOM_PREFERENCE`, `NO_PREFERENCE`. |
| `weeksOfMonth` | array<integer> | Optional. Weeks during the month when maintenance should be performed. Weeks start on the 1st, 8th, 15th, and 22nd days of the month, and have a duration of 7 days. Weeks start and end based on calendar dates, not days of the week. |

### `MinorVersion`

- MinorVersion represents a minor version of a GI. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/GiMinorVersionSummary/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gridImageId` | string | Optional. The ID of the Grid Image. |
| `name` | string | Identifier. The name of the MinorVersion resource with the format: projects/{project}/locations/{region}/giVersions/{gi_version}/minorVersions/{minor_version} |
| `version` | string | Optional. The valid Oracle grid infrastructure software version. |

### `NameValuePair`

- A name-value pair representing an attribute entry usable in a list of attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Required. The name of the property entry. |
| `value` | string | Required. The value of the property entry. |

### `NessieIcebergCatalog`

- The Nessie Iceberg catalog.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `branch` | string | Required. The Nessie branch. |
| `uri` | string | Required. The Nessie uri. |

### `OdbDnsZone`

- Represents OdbDnsZone resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The date and time that the OdbDnsZone was created. |
| `domain` | string | Required. Immutable. The DNS suffix for the zone. Ex: abc.example.com. |
| `labels` | object | Optional. Labels or tags associated with the resource. |
| `name` | string | Identifier. The name of the OdbDnsZone resource in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbDnsZones/{odb_dns_zone} |
| `state` | string enum | Output only. State of the OdbDnsZone. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `INACTIVE`, `TERMINATING`, `FAILED`. |

### `OdbNetwork`

- Represents OdbNetwork resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The date and time that the OdbNetwork was created. |
| `entitlementId` | string | Output only. The ID of the subscription entitlement associated with the OdbNetwork. |
| `gcpOracleZone` | string | Optional. Immutable. The GCP Oracle zone where OdbNetwork is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability. |
| `labels` | object | Optional. Labels or tags associated with the resource. |
| `name` | string | Identifier. The name of the OdbNetwork resource in the following format: projects/{project}/locations/{region}/odbNetworks/{odb_network} |
| `network` | string | Required. Immutable. The name of the VPC network in the following format: projects/{project}/global/networks/{network} |
| `reconciling` | boolean | Output only. Indicates whether the OdbNetwork is currently reconciling changes. |
| `serviceConnectivityConfig` | ServiceConnectivityConfig | Optional. Configuration to enable the service (Oracledatabase@Google Cloud) to establish connectivity to the database. This should be specified if you intend to associate this OdbNetwork with a DatabaseConnection resource to `ExecuteSQL` on the database, or to create a ServiceIntegration with the Database. Please don't specify it otherwise to avoid complicating the network setup. |
| `state` | string enum | Output only. State of the ODB Network. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `TERMINATING`, `FAILED`. |

### `OdbSubnet`

- Represents OdbSubnet resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cidrRange` | string | Required. Immutable. The CIDR range of the subnet. |
| `createTime` | string (google-datetime) | Output only. The date and time that the OdbNetwork was created. |
| `labels` | object | Optional. Labels or tags associated with the resource. |
| `name` | string | Identifier. The name of the OdbSubnet resource in the following format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet} |
| `purpose` | string enum | Required. Immutable. Purpose of the subnet. Values: `PURPOSE_UNSPECIFIED`, `CLIENT_SUBNET`, `BACKUP_SUBNET`. |
| `state` | string enum | Output only. State of the ODB Subnet. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `TERMINATING`, `FAILED`. |

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
| `percentComplete` | number (double) | Output only. An estimated percentage of the operation that has been completed at a given moment of time, between 0 and 100. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. The status of the operation. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `PluggableDatabase`

- The PluggableDatabase resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/PluggableDatabase/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The date and time that the PluggableDatabase was created. |
| `name` | string | Identifier. The name of the PluggableDatabase resource in the following format: projects/{project}/locations/{region}/pluggableDatabases/{pluggable_database} |
| `ociUrl` | string | Output only. HTTPS link to OCI resources exposed to Customer via UI Interface. |
| `properties` | PluggableDatabaseProperties | Optional. The properties of the PluggableDatabase. |

### `PluggableDatabaseConnectionStrings`

- The connection strings used to connect to the Oracle Database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allConnectionStrings` | object | Optional. All connection strings to use to connect to the pluggable database. |
| `pdbDefault` | string | Optional. The default connection string to use to connect to the pluggable database. |
| `pdbIpDefault` | string | Optional. The default connection string to use to connect to the pluggable database using IP. |

### `PluggableDatabaseNodeLevelDetails`

- The Pluggable Database Node Level Details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeName` | string | Required. The Node name of the Database home. |
| `openMode` | string enum | Required. The mode that the pluggable database is in to open it. Values: `PLUGGABLE_DATABASE_OPEN_MODE_UNSPECIFIED`, `READ_ONLY`, `READ_WRITE`, `MOUNTED`, `MIGRATE`. |
| `pluggableDatabaseId` | string | Required. The OCID of the Pluggable Database. |

### `PluggableDatabaseProperties`

- The properties of a PluggableDatabase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compartmentId` | string | Required. The OCID of the compartment. |
| `connectionStrings` | PluggableDatabaseConnectionStrings | Optional. The Connection strings used to connect to the Oracle Database. |
| `containerDatabaseOcid` | string | Required. The OCID of the CDB. |
| `databaseManagementConfig` | DatabaseManagementConfig | Output only. The configuration of the Database Management service. |
| `definedTags` | object | Optional. Defined tags for this resource. Each key is predefined and scoped to a namespace. |
| `freeformTags` | object | Optional. Free-form tags for this resource. Each tag is a simple key-value pair with no predefined name, type, or namespace. |
| `isRestricted` | boolean | Optional. The restricted mode of the pluggable database. If a pluggable database is opened in restricted mode, the user needs both create a session and have restricted session privileges to connect to it. |
| `lifecycleDetails` | string | Output only. Additional information about the current lifecycle state. |
| `lifecycleState` | string enum | Output only. The current state of the pluggable database. Values: `PLUGGABLE_DATABASE_LIFECYCLE_STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `TERMINATING`, `TERMINATED`, `UPDATING`, `FAILED`, `RELOCATING`, `RELOCATED`, `REFRESHING`, `RESTORE_IN_PROGRESS`, `RESTORE_FAILED`, `BACKUP_IN_PROGRESS`, `DISABLED`. |
| `ocid` | string | Output only. The OCID of the pluggable database. |
| `operationsInsightsState` | string enum | Output only. The status of Operations Insights for this Database. Values: `OPERATIONS_INSIGHTS_STATE_UNSPECIFIED`, `ENABLING`, `ENABLED`, `DISABLING`, `NOT_ENABLED`, `FAILED_ENABLING`, `FAILED_DISABLING`. |
| `pdbName` | string | Required. The database name. |
| `pdbNodeLevelDetails` | array<PluggableDatabaseNodeLevelDetails> | Optional. Pluggable Database Node Level Details |

### `PolarisIcebergCatalog`

- The Polaris Iceberg catalog.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Required. The Polaris client ID. |
| `clientSecret` | string | Optional. The Polaris client secret. |
| `polarisCatalog` | string | Required. The catalog name within Polaris. |
| `principalRole` | string | Required. The Polaris principal role. |
| `uri` | string | Required. The Polaris uri. |

### `PscInterfaceConfig`

- Configuration for a Private Service Connect (PSC) interface used by Oracledatabase@Google Cloud to establish private connectivity to the database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkAttachment` | string | Optional. The resource name of the Network Attachment that Oracledatabase@Google Cloud will use to establish private connectivity to the database via a Private Service Connect Interface (PSC-I). Format: projects/{project}/regions/{region}/networkAttachments/{network_attachment} |

### `RefreshAutonomousDatabaseRequest`

- Request message for RefreshAutonomousDatabase method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `refreshCutoffTime` | string (google-datetime) | Required. The timestamp to which the Autonomous Database refreshable clone will be refreshed. Changes made in the primary database after this timestamp are not part of the data refresh. |

### `RemoveVirtualMachineExadbVmClusterRequest`

- The request for `ExadbVmCluster.RemoveVirtualMachine`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostnames` | array<string> | Required. The list of host names of db nodes to be removed from the ExadbVmCluster. |
| `requestId` | string | Optional. An optional ID to identify the request. This value is used to identify duplicate requests. If you make a request with the same request ID and the original request is still in progress or completed, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `RestIcebergCatalog`

- The REST Iceberg catalog.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `properties` | string | Optional. The base64 encoded content of the configuration file containing additional properties for the REST catalog. |
| `uri` | string | Required. The REST uri. |

### `RestartAutonomousDatabaseRequest`

- The request for `AutonomousDatabase.Restart`.
- Version: v1

### `RestoreAutonomousDatabaseRequest`

- The request for `AutonomousDatabase.Restore`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `restoreTime` | string (google-datetime) | Required. The time and date to restore the database to. |

### `Row`

- A single row from a sql result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<Value> | List of values in a row of sql result. |

### `ScheduledOperationDetails`

- Details of scheduled operation. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/ScheduledOperationDetails
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dayOfWeek` | string enum | Output only. Day of week. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `startTime` | TimeOfDay | Output only. Auto start time. |
| `stopTime` | TimeOfDay | Output only. Auto stop time. |

### `ServiceConnectivityConfig`

- Configuration to enable the service (Oracledatabase@Google Cloud) to establish connectivity to the database. This should be specified if you intend to associate this OdbNetwork with a DatabaseConnection resource to `ExecuteSQL` on the database, or to create a ServiceIntegration with the Database. Please don't specify it otherwise to avoid complicating the network setup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pscInterfaceConfig` | PscInterfaceConfig | Optional. Configuration for Private Service Connect (PSC) interface. |

### `SourceConfig`

- The source configuration for the standby Autonomous Database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoRefreshFrequencySeconds` | integer (int32) | Optional. The frequency in seconds a refreshable clone is refreshed after auto-refresh is enabled. |
| `autoRefreshPointLagSeconds` | integer (int32) | Optional. The time, in seconds, the data of the automatic refreshable clone lags the primary database at the point of refresh. |
| `autoRefreshStartTime` | string (google-datetime) | Optional. The date and time that auto-refreshing will begin for an Autonomous Database refreshable clone. This value controls only the start time for the first refresh operation. |
| `automaticBackupsReplicationEnabled` | boolean | Optional. This field specifies if the replication of automatic backups is enabled when creating a Data Guard. |
| `autonomousDatabase` | string | Optional. The name of the primary Autonomous Database that is used to create a Peer Autonomous Database from a source. |
| `autonomousDatabaseBackup` | string | Optional. The name of the Autonomous Database Backup resource with the format: projects/{project}/locations/{region}/autonomousDatabaseBackups/{autonomous_database_backup} Required when source_type is BACKUP_FROM_ID. |
| `backupTime` | string (google-datetime) | Optional. The timestamp specified for the point-in-time clone of the source Autonomous Database. This field is only applicable in case of BACKUP_FROM_TIMESTAMP source type and when use_latest_available_backup is false. |
| `cloneType` | string enum | Optional. The clone type of the Autonomous Database. This field is only applicable in case of cloning Values: `CLONE_TYPE_UNSPECIFIED`, `FULL`, `METADATA`. |
| `refreshableMode` | string enum | Optional. The refresh mode of the clone. Values: `REFRESHABLE_MODE_UNSPECIFIED`, `AUTOMATIC`, `MANUAL`. |
| `sourceType` | string enum | Optional. The source type of the Autonomous Database. Values: `SOURCE_TYPE_UNSPECIFIED`, `CLONE_DATABASE`, `CROSS_REGION_DISASTER_RECOVERY`, `CLONE_TO_REFRESHABLE`, `BACKUP_FROM_ID`, `BACKUP_FROM_TIMESTAMP`. |
| `useLatestAvailableBackup` | boolean | Optional. Clone from latest available backup timestamp. This field is only applicable in case of BACKUP_FROM_TIMESTAMP source type. |

### `SqlParameter`

- Represents a bind variable (parameter) for SQL execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. The name of the SQL bind parameter (excluding the leading colon, e.g. "id"). If omitted, parameters bind positionally based on their order in the list. |
| `typeName` | string | Optional. Optional: Datatype hint for the parameter (e.g., "VARCHAR2", "NUMBER", "DATE", "TIMESTAMP"). If omitted, the Oracle driver will infer the type from the value string. |
| `value` | any | Required. Use protobuf.Value so clients can pass ints, bools, and strings natively. |

### `SqlResult`

- SqlResult represents the result for the execution of a sql statement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | array<Column> | List of columns included in the result, including data type. |
| `rows` | array<Row> | Rows returned by the SQL statement. |

### `StartAutonomousDatabaseRequest`

- The request for `AutonomousDatabase.Start`.
- Version: v1

### `StartGoldengateDeploymentRequest`

- The request for `GoldengateDeployment.Start`.
- Version: v1

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StopAutonomousDatabaseRequest`

- The request for `AutonomousDatabase.Stop`.
- Version: v1

### `StopGoldengateDeploymentRequest`

- The request for `GoldengateDeployment.Stop`.
- Version: v1

### `StorageSizeDetails`

- The initial storage size, in gigabytes, that is applicable for virtual machine DBSystem.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataStorageSizeInGbs` | integer (int32) | Output only. The data storage size, in gigabytes, that is applicable for virtual machine DBSystem. |
| `recoStorageSizeInGbs` | integer (int32) | Output only. The RECO/REDO storage size, in gigabytes, that is applicable for virtual machine DBSystem. |

### `SwitchoverAutonomousDatabaseRequest`

- The request for `OracleDatabase.SwitchoverAutonomousDatabase`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `peerAutonomousDatabase` | string | Optional. The peer database name to switch over to. Required for cross-region standby, and must be omitted for in-region Data Guard. |

### `TestConnectionAssignmentError`

- Error details for TestGoldengateConnectionAssignment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | The text describing the action required to fix the issue. |
| `code` | string | A short error code that defines the error, meant for programmatic parsing. |
| `issue` | string | The text describing the root cause of the reported issue. |
| `message` | string | A human-readable error message. |

### `TestDatabaseConnectionRequest`

- Request message for `DatabaseConnection.TestDatabaseConnection`.
- Version: v1

### `TestDatabaseConnectionResponse`

- Response message for `DatabaseConnection.TestDatabaseConnection`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorMessage` | string | Error message if the test connection failed. |
| `success` | boolean | Whether the test connection was successful. |

### `TestGoldengateConnectionAssignmentRequest`

- Request message for TestGoldengateConnectionAssignment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Optional. The type of the test of the assigned connection. The only type actually supported is DEFAULT. Values: `TEST_TYPE_UNSPECIFIED`, `DEFAULT`. |

### `TestGoldengateConnectionAssignmentResponse`

- The result of the connectivity test performed between the Goldengate deployment and the associated database / service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | TestConnectionAssignmentError | Error details if test connection failed. |
| `errors` | array<TestConnectionAssignmentError> | List of test connection assignment error objects. |
| `resultType` | string enum | Type of the result i.e. Success, Failure or Timeout. Values: `RESULT_TYPE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `TIMED_OUT`. |

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `TimeZone`

- Represents a time zone from the IANA Time Zone Database (https://www.iana.org/time-zones).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | IANA Time Zone Database time zone. For example "America/New_York". |
| `version` | string | Optional. IANA Time Zone Database version number. For example "2019a". |

### `Value`

- A single value in a row from a sql result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nullValue` | boolean | Set to true if the cell value is NULL. |
| `value` | string | The cell value represented in string format. Timestamps should be converted using RFC3339Nano format. |

### Shape of `GoldengateJavaMessageServiceConnectionProperties`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "authenticationType": "string enum",
  "connectionFactory": "string",
  "connectionUrl": "string",
  "jndiConnectionFactory": "string",
  "jndiInitialContextFactory": "string",
  "jndiProviderUrl": "string",
  "jndiSecurityCredentialsSecret": "string",
  "jndiSecurityPrincipal": "string",
  "keyStoreFile": "string",
  "keyStorePassword": "string",
  "keyStorePasswordSecretVersion": "string",
  "password": "string",
  "passwordSecretVersion": "string",
  "securityProtocol": "string enum",
  "sslKeyPassword": "string",
  "sslKeyPasswordSecretVersion": "string",
  "technologyType": "string",
  "trustStoreFile": "string",
  "trustStorePassword": "string",
  "trustStorePasswordSecretVersion": "string",
  "useJndi": "boolean",
  "username": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `oracledatabase` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://oracledatabase.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
