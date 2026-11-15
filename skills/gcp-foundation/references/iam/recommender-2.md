---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/recommender
---

# Recommender IAM roles and permissions (part 2/6)

## Signature / Usage

Predefined roles of `recommender` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Recommender Viewer (`roles/recommender.viewer`)

- Enables Get and List operations.
- Permissions (298): `recommender.alloydbClusterPerformanceInsights.get`, `recommender.alloydbClusterPerformanceInsights.list`, `recommender.alloydbClusterPerformanceRecommendations.get`, `recommender.alloydbClusterPerformanceRecommendations.list`, `recommender.alloydbClusterReliabilityInsights.get`, `recommender.alloydbClusterReliabilityInsights.list`, `recommender.alloydbClusterReliabilityRecommendations.get`, `recommender.alloydbClusterReliabilityRecommendations.list`, `recommender.alloydbInstanceSecurityInsights.get`, `recommender.alloydbInstanceSecurityInsights.list`, `recommender.alloydbInstanceSecurityRecommendations.get`, `recommender.alloydbInstanceSecurityRecommendations.list`, `recommender.appengineVersionCostInsights.get`, `recommender.appengineVersionCostInsights.list`, `recommender.appengineVersionCostRecommendations.get`, `recommender.appengineVersionCostRecommendations.list`, `recommender.bigqueryCapacityCommitmentsInsights.get`, `recommender.bigqueryCapacityCommitmentsInsights.list`, `recommender.bigqueryCapacityCommitmentsRecommendations.get`, `recommender.bigqueryCapacityCommitmentsRecommendations.list`, `recommender.bigqueryMaterializedViewInsights.get`, `recommender.bigqueryMaterializedViewInsights.list`, `recommender.bigqueryMaterializedViewRecommendations.get`, `recommender.bigqueryMaterializedViewRecommendations.list`, `recommender.bigqueryPartitionClusterRecommendations.get`, `recommender.bigqueryPartitionClusterRecommendations.list`, `recommender.bigqueryTableStatsInsights.get`, `recommender.bigqueryTableStatsInsights.list`, `recommender.bigtableClusterPerformanceInsights.get`, `recommender.bigtableClusterPerformanceInsights.list`, `recommender.bigtableClusterPerformanceRecommendations.get`, `recommender.bigtableClusterPerformanceRecommendations.list`, `recommender.cloudAssetInsights.get`, `recommender.cloudAssetInsights.list`, `recommender.cloudCostGeneralInsights.get`, `recommender.cloudCostGeneralInsights.list`, `recommender.cloudCostGeneralRecommendations.get`, `recommender.cloudCostGeneralRecommendations.list`, `recommender.cloudDeprecationGeneralInsights.get`, `recommender.cloudDeprecationGeneralInsights.list`, `recommender.cloudDeprecationGeneralRecommendations.get`, `recommender.cloudDeprecationGeneralRecommendations.list`, `recommender.cloudFunctionsPerformanceInsights.get`, `recommender.cloudFunctionsPerformanceInsights.list`, `recommender.cloudFunctionsPerformanceRecommendations.get`, `recommender.cloudFunctionsPerformanceRecommendations.list`, `recommender.cloudManageabilityGeneralInsights.get`, `recommender.cloudManageabilityGeneralInsights.list`, `recommender.cloudManageabilityGeneralRecommendations.get`, `recommender.cloudManageabilityGeneralRecommendations.list`, `recommender.cloudPerformanceGeneralInsights.get`, `recommender.cloudPerformanceGeneralInsights.list`, `recommender.cloudPerformanceGeneralRecommendations.get`, `recommender.cloudPerformanceGeneralRecommendations.list`, `recommender.cloudRecentChangeInsights.get`, `recommender.cloudRecentChangeInsights.list`, `recommender.cloudRecentChangeRecommendations.get`, `recommender.cloudRecentChangeRecommendations.list`, `recommender.cloudRecentChangeRecommenderConfig.get`, `recommender.cloudReliabilityGeneralInsights.get`, `recommender.cloudReliabilityGeneralInsights.list`, `recommender.cloudReliabilityGeneralRecommendations.get`, `recommender.cloudReliabilityGeneralRecommendations.list`, `recommender.cloudSecurityGeneralInsights.get`, `recommender.cloudSecurityGeneralInsights.list`, `recommender.cloudSecurityGeneralRecommendations.get`, `recommender.cloudSecurityGeneralRecommendations.list`, `recommender.cloudsqlIdleInstanceRecommendations.get`, `recommender.cloudsqlIdleInstanceRecommendations.list`, `recommender.cloudsqlInstanceActivityInsights.get`, `recommender.cloudsqlInstanceActivityInsights.list`, `recommender.cloudsqlInstanceCpuUsageInsights.get`, `recommender.cloudsqlInstanceCpuUsageInsights.list`, `recommender.cloudsqlInstanceDiskUsageTrendInsights.get`, `recommender.cloudsqlInstanceDiskUsageTrendInsights.list`, `recommender.cloudsqlInstanceMemoryUsageInsights.get`, `recommender.cloudsqlInstanceMemoryUsageInsights.list`, `recommender.cloudsqlInstanceOomProbabilityInsights.get`, `recommender.cloudsqlInstanceOomProbabilityInsights.list`, `recommender.cloudsqlInstanceOutOfDiskRecommendations.get`, `recommender.cloudsqlInstanceOutOfDiskRecommendations.list`, `recommender.cloudsqlInstancePerformanceInsights.get`, `recommender.cloudsqlInstancePerformanceInsights.list`, `recommender.cloudsqlInstancePerformanceRecommendations.get`, `recommender.cloudsqlInstancePerformanceRecommendations.list`, `recommender.cloudsqlInstanceReliabilityInsights.get`, `recommender.cloudsqlInstanceReliabilityInsights.list`, `recommender.cloudsqlInstanceReliabilityRecommendations.get`, `recommender.cloudsqlInstanceReliabilityRecommendations.list`, `recommender.cloudsqlInstanceSecurityInsights.get`, `recommender.cloudsqlInstanceSecurityInsights.list`, `recommender.cloudsqlInstanceSecurityRecommendations.get`, `recommender.cloudsqlInstanceSecurityRecommendations.list`, `recommender.cloudsqlInstanceUnderprovisionedCpuUsageInsights.get`, `recommender.cloudsqlInstanceUnderprovisionedCpuUsageInsights.list`, `recommender.cloudsqlInstanceUnderprovisionedMemoryUsageInsights.get`, `recommender.cloudsqlInstanceUnderprovisionedMemoryUsageInsights.list`, `recommender.cloudsqlOverprovisionedInstanceRecommendations.get`, `recommender.cloudsqlOverprovisionedInstanceRecommendations.list`, `recommender.cloudsqlUnderProvisionedInstanceRecommendations.get`, `recommender.cloudsqlUnderProvisionedInstanceRecommendations.list`, `recommender.commitmentUtilizationInsights.get`, `recommender.commitmentUtilizationInsights.list`, `recommender.computeAddressIdleResourceInsights.get`, `recommender.computeAddressIdleResourceInsights.list`, `recommender.computeAddressIdleResourceRecommendations.get`, `recommender.computeAddressIdleResourceRecommendations.list`, `recommender.computeDiskIdleResourceInsights.get`, `recommender.computeDiskIdleResourceInsights.list`, `recommender.computeDiskIdleResourceRecommendations.get`, `recommender.computeDiskIdleResourceRecommendations.list`, `recommender.computeFirewallInsightTypeConfigs.get`, `recommender.computeFirewallInsights.get`, `recommender.computeFirewallInsights.list`, `recommender.computeIdleResourceInsights.get`, `recommender.computeIdleResourceInsights.list`, `recommender.computeIdleResourceRecommendations.get`, `recommender.computeIdleResourceRecommendations.list`, `recommender.computeIdleResourceRecommenderConfig.get`, `recommender.computeImageIdleResourceInsights.get`, `recommender.computeImageIdleResourceInsights.list`, `recommender.computeImageIdleResourceRecommendations.get`, `recommender.computeImageIdleResourceRecommendations.list`, `recommender.computeInstanceCpuUsageInsights.get`, `recommender.computeInstanceCpuUsageInsights.list`, `recommender.computeInstanceCpuUsagePredictionInsights.get`, `recommender.computeInstanceCpuUsagePredictionInsights.list`, `recommender.computeInstanceCpuUsageTrendInsights.get`, `recommender.computeInstanceCpuUsageTrendInsights.list`, `recommender.computeInstanceGroupManagerCpuUsageInsights.get`, `recommender.computeInstanceGroupManagerCpuUsageInsights.list`, `recommender.computeInstanceGroupManagerCpuUsagePredictionInsights.get`, `recommender.computeInstanceGroupManagerCpuUsagePredictionInsights.list`, `recommender.computeInstanceGroupManagerCpuUsageTrendInsights.get`, `recommender.computeInstanceGroupManagerCpuUsageTrendInsights.list`, `recommender.computeInstanceGroupManagerMachineTypeRecommendations.get`, `recommender.computeInstanceGroupManagerMachineTypeRecommendations.list`, `recommender.computeInstanceGroupManagerMemoryUsageInsights.get`, `recommender.computeInstanceGroupManagerMemoryUsageInsights.list`, `recommender.computeInstanceGroupManagerMemoryUsagePredictionInsights.get`, `recommender.computeInstanceGroupManagerMemoryUsagePredictionInsights.list`, `recommender.computeInstanceIdleResourceRecommendations.get`, `recommender.computeInstanceIdleResourceRecommendations.list`, `recommender.computeInstanceIdleResourceRecommenderConfig.get`, `recommender.computeInstanceMachineTypeRecommendations.get`, `recommender.computeInstanceMachineTypeRecommendations.list`, `recommender.computeInstanceMachineTypeRecommenderConfig.get`, `recommender.computeInstanceMemoryUsageInsights.get`, `recommender.computeInstanceMemoryUsageInsights.list`, `recommender.computeInstanceMemoryUsagePredictionInsights.get`, `recommender.computeInstanceMemoryUsagePredictionInsights.list`, `recommender.computeInstanceNetworkThroughputInsights.get`, `recommender.computeInstanceNetworkThroughputInsights.list`, `recommender.containerDiagnosisInsights.get`, `recommender.containerDiagnosisInsights.list`, `recommender.containerDiagnosisRecommendations.get`, `recommender.containerDiagnosisRecommendations.list`, `recommender.costInsights.get`, `recommender.costInsights.list`, `recommender.costRecommendations.listAll`, `recommender.costRecommendations.summarizeAll`, `recommender.dataflowDiagnosticsInsights.get`, `recommender.dataflowDiagnosticsInsights.list`, `recommender.errorReportingInsights.get`, `recommender.errorReportingInsights.list`, `recommender.errorReportingRecommendations.get`, `recommender.errorReportingRecommendations.list`, `recommender.firestoreDatabaseFirebaseRulesInsights.get`, `recommender.firestoreDatabaseFirebaseRulesInsights.list`, `recommender.firestoreDatabaseFirebaseRulesRecommendations.get`, `recommender.firestoreDatabaseFirebaseRulesRecommendations.list`, `recommender.firestoreDatabaseReliabilityInsights.get`, `recommender.firestoreDatabaseReliabilityInsights.list`, `recommender.firestoreDatabaseReliabilityRecommendations.get`, `recommender.firestoreDatabaseReliabilityRecommendations.list`, `recommender.gmpGuidedExperienceInsights.get`, `recommender.gmpGuidedExperienceInsights.list`, `recommender.gmpGuidedExperienceRecommendations.get`, `recommender.gmpGuidedExperienceRecommendations.list`, `recommender.gmpProjectManagementInsights.get`, `recommender.gmpProjectManagementInsights.list`, `recommender.gmpProjectManagementRecommendations.get`, `recommender.gmpProjectManagementRecommendations.list`, `recommender.gmpProjectProductSuggestionsInsights.get`, `recommender.gmpProjectProductSuggestionsInsights.list`, `recommender.gmpProjectProductSuggestionsRecommendations.get`, `recommender.gmpProjectProductSuggestionsRecommendations.list`, `recommender.iamPolicyChangeRiskInsights.get`, `recommender.iamPolicyChangeRiskInsights.list`, `recommender.iamPolicyChangeRiskRecommendations.get`, `recommender.iamPolicyChangeRiskRecommendations.list`, `recommender.iamPolicyInsights.get`, `recommender.iamPolicyInsights.list`, `recommender.iamPolicyLateralMovementInsights.get`, `recommender.iamPolicyLateralMovementInsights.list`, `recommender.iamPolicyRecommendations.get`, `recommender.iamPolicyRecommendations.list`, `recommender.iamPolicyRecommenderConfig.get`, `recommender.iamServiceAccountChangeRiskInsights.get`, `recommender.iamServiceAccountChangeRiskInsights.list`, `recommender.iamServiceAccountChangeRiskRecommendations.get`, `recommender.iamServiceAccountChangeRiskRecommendations.list`, `recommender.iamServiceAccountInsights.get`, `recommender.iamServiceAccountInsights.list`, `recommender.locations.get`, `recommender.locations.list`, `recommender.loggingProductSuggestionContainerInsights.get`, `recommender.loggingProductSuggestionContainerInsights.list`, `recommender.loggingProductSuggestionContainerRecommendations.get`, `recommender.loggingProductSuggestionContainerRecommendations.list`, `recommender.memorystoreManageabilityInsights.get`, `recommender.memorystoreManageabilityInsights.list`, `recommender.memorystoreManageabilityRecommendations.get`, `recommender.memorystoreManageabilityRecommendations.list`, `recommender.memorystorePerformanceInsights.get`, `recommender.memorystorePerformanceInsights.list`, `recommender.memorystorePerformanceRecommendations.get`, `recommender.memorystorePerformanceRecommendations.list`, `recommender.memorystoreReliabilityInsights.get`, `recommender.memorystoreReliabilityInsights.list`, `recommender.memorystoreReliabilityRecommendations.get`, `recommender.memorystoreReliabilityRecommendations.list`, `recommender.memorystoreUtilizationInsights.get`, `recommender.memorystoreUtilizationInsights.list`, `recommender.monitoringProductSuggestionComputeInsights.get`, `recommender.monitoringProductSuggestionComputeInsights.list`, `recommender.monitoringProductSuggestionComputeRecommendations.get`, `recommender.monitoringProductSuggestionComputeRecommendations.list`, `recommender.networkAnalyzerCloudSqlInsights.get`, `recommender.networkAnalyzerCloudSqlInsights.list`, `recommender.networkAnalyzerDynamicRouteInsights.get`, `recommender.networkAnalyzerDynamicRouteInsights.list`, `recommender.networkAnalyzerGkeConnectivityInsights.get`, `recommender.networkAnalyzerGkeConnectivityInsights.list`, `recommender.networkAnalyzerGkeIpAddressInsights.get`, `recommender.networkAnalyzerGkeIpAddressInsights.list`, `recommender.networkAnalyzerGkeServiceAccountInsights.get`, `recommender.networkAnalyzerGkeServiceAccountInsights.list`, `recommender.networkAnalyzerIpAddressInsights.get`, `recommender.networkAnalyzerIpAddressInsights.list`, `recommender.networkAnalyzerLoadBalancerInsights.get`, `recommender.networkAnalyzerLoadBalancerInsights.list`, `recommender.networkAnalyzerVpcConnectivityInsights.get`, `recommender.networkAnalyzerVpcConnectivityInsights.list`, `recommender.orgPolicyInsights.get`, `recommender.orgPolicyInsights.list`, `recommender.orgPolicyRecommendations.get`, `recommender.orgPolicyRecommendations.list`, `recommender.resourcemanagerProjectChangeRiskInsights.get`, `recommender.resourcemanagerProjectChangeRiskInsights.list`, `recommender.resourcemanagerProjectChangeRiskRecommendations.get`, `recommender.resourcemanagerProjectChangeRiskRecommendations.list`, `recommender.resourcemanagerProjectUtilizationInsightTypeConfigs.get`, `recommender.resourcemanagerProjectUtilizationInsights.get`, `recommender.resourcemanagerProjectUtilizationInsights.list`, `recommender.resourcemanagerProjectUtilizationRecommendations.get`, `recommender.resourcemanagerProjectUtilizationRecommendations.list`, `recommender.resourcemanagerProjectUtilizationRecommenderConfigs.get`, `recommender.resourcemanagerServiceLimitInsights.get`, `recommender.resourcemanagerServiceLimitInsights.list`, `recommender.resourcemanagerServiceLimitRecommendations.get`, `recommender.resourcemanagerServiceLimitRecommendations.list`, `recommender.runServiceCostInsights.get`, `recommender.runServiceCostInsights.list`, `recommender.runServiceCostRecommendations.get`, `recommender.runServiceCostRecommendations.list`, `recommender.runServiceIdentityInsights.get`, `recommender.runServiceIdentityInsights.list`, `recommender.runServiceIdentityRecommendations.get`, `recommender.runServiceIdentityRecommendations.list`, `recommender.runServicePerformanceInsights.get`, `recommender.runServicePerformanceInsights.list`, `recommender.runServicePerformanceRecommendations.get`, `recommender.runServicePerformanceRecommendations.list`, `recommender.runServiceSecurityInsights.get`, `recommender.runServiceSecurityInsights.list`, `recommender.runServiceSecurityRecommendations.get`, `recommender.runServiceSecurityRecommendations.list`, `recommender.spannerDatabaseSecurityInsights.get`, `recommender.spannerDatabaseSecurityInsights.list`, `recommender.spannerDatabaseSecurityRecommendations.get`, `recommender.spannerDatabaseSecurityRecommendations.list`, `recommender.spannerProjectReliabilityInsights.get`, `recommender.spannerProjectReliabilityInsights.list`, `recommender.spannerProjectReliabilityRecommendations.get`, `recommender.spannerProjectReliabilityRecommendations.list`, `recommender.spendBasedCommitmentInsights.get`, `recommender.spendBasedCommitmentInsights.list`, `recommender.spendBasedCommitmentRecommendations.get`, `recommender.spendBasedCommitmentRecommendations.list`, `recommender.spendBasedCommitmentRecommenderConfig.get`, `recommender.storageBucketSoftDeleteInsights.get`, `recommender.storageBucketSoftDeleteInsights.list`, `recommender.storageBucketSoftDeleteRecommendations.get`, `recommender.storageBucketSoftDeleteRecommendations.list`, `recommender.usageCommitmentRecommendations.get`, `recommender.usageCommitmentRecommendations.list`, `resourcemanager.projects.get`

### AlloyDB Recommender Admin (`roles/recommender.alloydbAdmin`)

- Admin of AlloyDB insights and recommendations.
- Permissions (20): `recommender.alloydbClusterPerformanceInsights.get`, `recommender.alloydbClusterPerformanceInsights.list`, `recommender.alloydbClusterPerformanceInsights.update`, `recommender.alloydbClusterPerformanceRecommendations.get`, `recommender.alloydbClusterPerformanceRecommendations.list`, `recommender.alloydbClusterPerformanceRecommendations.update`, `recommender.alloydbClusterReliabilityInsights.get`, `recommender.alloydbClusterReliabilityInsights.list`, `recommender.alloydbClusterReliabilityInsights.update`, `recommender.alloydbClusterReliabilityRecommendations.get`, `recommender.alloydbClusterReliabilityRecommendations.list`, `recommender.alloydbClusterReliabilityRecommendations.update`, `recommender.alloydbInstanceSecurityInsights.get`, `recommender.alloydbInstanceSecurityInsights.list`, `recommender.alloydbInstanceSecurityInsights.update`, `recommender.alloydbInstanceSecurityRecommendations.get`, `recommender.alloydbInstanceSecurityRecommendations.list`, `recommender.alloydbInstanceSecurityRecommendations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### AlloyDB Recommender Viewer (`roles/recommender.alloydbViewer`)

- Viewer of AlloyDB insights and recommendations.
- Permissions (14): `recommender.alloydbClusterPerformanceInsights.get`, `recommender.alloydbClusterPerformanceInsights.list`, `recommender.alloydbClusterPerformanceRecommendations.get`, `recommender.alloydbClusterPerformanceRecommendations.list`, `recommender.alloydbClusterReliabilityInsights.get`, `recommender.alloydbClusterReliabilityInsights.list`, `recommender.alloydbClusterReliabilityRecommendations.get`, `recommender.alloydbClusterReliabilityRecommendations.list`, `recommender.alloydbInstanceSecurityInsights.get`, `recommender.alloydbInstanceSecurityInsights.list`, `recommender.alloydbInstanceSecurityRecommendations.get`, `recommender.alloydbInstanceSecurityRecommendations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### App Engine Version Cost Recommender Admin (`roles/recommender.appengineversioncostAdmin`)

- Launch stage: Beta
- Admin of App Engine Version Cost Insights and Recommendations.
- Permissions (10): `recommender.appengineVersionCostInsights.get`, `recommender.appengineVersionCostInsights.list`, `recommender.appengineVersionCostInsights.update`, `recommender.appengineVersionCostRecommendations.get`, `recommender.appengineVersionCostRecommendations.list`, `recommender.appengineVersionCostRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### App Engine Version Cost Recommender Viewer (`roles/recommender.appengineversioncostViewer`)

- Launch stage: Beta
- Viewer of App Engine Version Cost Insights and Recommendations.
- Permissions (8): `recommender.appengineVersionCostInsights.get`, `recommender.appengineVersionCostInsights.list`, `recommender.appengineVersionCostRecommendations.get`, `recommender.appengineVersionCostRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### BigQuery Slot Recommender Admin (`roles/recommender.bigQueryCapacityCommitmentsAdmin`)

- Launch stage: Beta
- Admin of BigQuery Capacity Commitments insights and recommendations.
- Permissions (10): `recommender.bigqueryCapacityCommitmentsInsights.get`, `recommender.bigqueryCapacityCommitmentsInsights.list`, `recommender.bigqueryCapacityCommitmentsInsights.update`, `recommender.bigqueryCapacityCommitmentsRecommendations.get`, `recommender.bigqueryCapacityCommitmentsRecommendations.list`, `recommender.bigqueryCapacityCommitmentsRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### BigQuery Recommender Billing Account Admin (`roles/recommender.bigQueryCapacityCommitmentsBillingAccountAdmin`)

- Launch stage: Beta
- Billing Account Admin of BigQuery Capacity Commitments insights and recommendations.
- Permissions (8): `billing.accounts.get`, `billing.accounts.list`, `recommender.bigqueryCapacityCommitmentsInsights.get`, `recommender.bigqueryCapacityCommitmentsInsights.list`, `recommender.bigqueryCapacityCommitmentsInsights.update`, `recommender.bigqueryCapacityCommitmentsRecommendations.get`, `recommender.bigqueryCapacityCommitmentsRecommendations.list`, `recommender.bigqueryCapacityCommitmentsRecommendations.update`

### BigQuery Recommender Billing Account Viewer (`roles/recommender.bigQueryCapacityCommitmentsBillingAccountViewer`)

- Launch stage: Beta
- Billing Account Viewer of BigQuery Capacity Commitments insights and recommendations.
- Permissions (6): `billing.accounts.get`, `billing.accounts.list`, `recommender.bigqueryCapacityCommitmentsInsights.get`, `recommender.bigqueryCapacityCommitmentsInsights.list`, `recommender.bigqueryCapacityCommitmentsRecommendations.get`, `recommender.bigqueryCapacityCommitmentsRecommendations.list`

### BigQuery Recommender Project Admin (`roles/recommender.bigQueryCapacityCommitmentsProjectAdmin`)

- Launch stage: Beta
- Project Admin of BigQuery Capacity Commitments insights and recommendations.
- Permissions (10): `recommender.bigqueryCapacityCommitmentsInsights.get`, `recommender.bigqueryCapacityCommitmentsInsights.list`, `recommender.bigqueryCapacityCommitmentsInsights.update`, `recommender.bigqueryCapacityCommitmentsRecommendations.get`, `recommender.bigqueryCapacityCommitmentsRecommendations.list`, `recommender.bigqueryCapacityCommitmentsRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### BigQuery Recommender Project Viewer (`roles/recommender.bigQueryCapacityCommitmentsProjectViewer`)

- Launch stage: Beta
- Project Viewer of BigQuery Capacity Commitments insights and recommendations.
- Permissions (8): `recommender.bigqueryCapacityCommitmentsInsights.get`, `recommender.bigqueryCapacityCommitmentsInsights.list`, `recommender.bigqueryCapacityCommitmentsRecommendations.get`, `recommender.bigqueryCapacityCommitmentsRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### BigQuery Slot Recommender Viewer (`roles/recommender.bigQueryCapacityCommitmentsViewer`)

- Launch stage: Beta
- Viewer of BigQuery Capacity Commitments insights and recommendations.
- Permissions (8): `recommender.bigqueryCapacityCommitmentsInsights.get`, `recommender.bigqueryCapacityCommitmentsInsights.list`, `recommender.bigqueryCapacityCommitmentsRecommendations.get`, `recommender.bigqueryCapacityCommitmentsRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### BigQuery Materialized View Recommender Admin (`roles/recommender.bigqueryMaterializedViewAdmin`)

- Admin of BigQuery Materialized View Insights and Recommendations.
- Permissions (10): `recommender.bigqueryMaterializedViewInsights.get`, `recommender.bigqueryMaterializedViewInsights.list`, `recommender.bigqueryMaterializedViewInsights.update`, `recommender.bigqueryMaterializedViewRecommendations.get`, `recommender.bigqueryMaterializedViewRecommendations.list`, `recommender.bigqueryMaterializedViewRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### BigQuery Materialized View Recommender Viewer (`roles/recommender.bigqueryMaterializedViewViewer`)

- Viewer of BigQuery Materialized View Insights and Recommendations.
- Permissions (8): `recommender.bigqueryMaterializedViewInsights.get`, `recommender.bigqueryMaterializedViewInsights.list`, `recommender.bigqueryMaterializedViewRecommendations.get`, `recommender.bigqueryMaterializedViewRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### BigQuery Partitioning Clustering Recommender Admin (`roles/recommender.bigqueryPartitionClusterAdmin`)

- Launch stage: Beta
- Admin of BigQuery Partitioning Clustering recommendations.
- Permissions (8): `recommender.bigqueryPartitionClusterRecommendations.get`, `recommender.bigqueryPartitionClusterRecommendations.list`, `recommender.bigqueryPartitionClusterRecommendations.update`, `recommender.bigqueryTableStatsInsights.get`, `recommender.bigqueryTableStatsInsights.list`, `recommender.bigqueryTableStatsInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### BigQuery Partitioning Clustering Recommender Viewer (`roles/recommender.bigqueryPartitionClusterViewer`)

- Launch stage: Beta
- Viewer of BigQuery Partitioning Clustering recommendations.
- Permissions (6): `recommender.bigqueryPartitionClusterRecommendations.get`, `recommender.bigqueryPartitionClusterRecommendations.list`, `recommender.bigqueryTableStatsInsights.get`, `recommender.bigqueryTableStatsInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Bigtable Cluster Performance Recommender Admin (`roles/recommender.bigtableClusterPerformanceAdmin`)

- Launch stage: Beta
- Admin of Bigtable Cluster Performance Insights and Recommendations.
- Permissions (10): `recommender.bigtableClusterPerformanceInsights.get`, `recommender.bigtableClusterPerformanceInsights.list`, `recommender.bigtableClusterPerformanceInsights.update`, `recommender.bigtableClusterPerformanceRecommendations.get`, `recommender.bigtableClusterPerformanceRecommendations.list`, `recommender.bigtableClusterPerformanceRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Bigtable Cluster Performance Recommender Viewer (`roles/recommender.bigtableClusterPerformanceViewer`)

- Launch stage: Beta
- Viewer of Bigtable Cluster Performance Insights and Recommendations.
- Permissions (8): `recommender.bigtableClusterPerformanceInsights.get`, `recommender.bigtableClusterPerformanceInsights.list`, `recommender.bigtableClusterPerformanceRecommendations.get`, `recommender.bigtableClusterPerformanceRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Billing Account Usage Commitment Recommender Admin (`roles/recommender.billingAccountCudAdmin`)

- Launch stage: Beta
- Admin of Billing Account Usage Commitment Recommender.
- Permissions (8): `billing.accounts.get`, `billing.accounts.list`, `recommender.commitmentUtilizationInsights.get`, `recommender.commitmentUtilizationInsights.list`, `recommender.commitmentUtilizationInsights.update`, `recommender.usageCommitmentRecommendations.get`, `recommender.usageCommitmentRecommendations.list`, `recommender.usageCommitmentRecommendations.update`

### Billing Account Usage Commitment Recommender Viewer (`roles/recommender.billingAccountCudViewer`)

- Launch stage: Beta
- Viewer of Billing Account Usage Commitment Recommender.
- Permissions (6): `billing.accounts.get`, `billing.accounts.list`, `recommender.commitmentUtilizationInsights.get`, `recommender.commitmentUtilizationInsights.list`, `recommender.usageCommitmentRecommendations.get`, `recommender.usageCommitmentRecommendations.list`

### Cloud Asset Insights Admin (`roles/recommender.cloudAssetInsightsAdmin`)

- Admin of all Cloud Asset insights.
- Permissions (5): `recommender.cloudAssetInsights.get`, `recommender.cloudAssetInsights.list`, `recommender.cloudAssetInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Asset Insights Viewer (`roles/recommender.cloudAssetInsightsViewer`)

- Viewer of all Cloud Asset insights.
- Permissions (4): `recommender.cloudAssetInsights.get`, `recommender.cloudAssetInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Cost General Recommendations Recommender Admin (`roles/recommender.cloudCostRecommendationAdmin`)

- Launch stage: Beta
- Admin of Cloud Cost General Recommendations Insights and Recommendations.
- Permissions (10): `recommender.cloudCostGeneralInsights.get`, `recommender.cloudCostGeneralInsights.list`, `recommender.cloudCostGeneralInsights.update`, `recommender.cloudCostGeneralRecommendations.get`, `recommender.cloudCostGeneralRecommendations.list`, `recommender.cloudCostGeneralRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Cost General Recommendations Recommender Viewer (`roles/recommender.cloudCostRecommendationViewer`)

- Launch stage: Beta
- Viewer of Cloud Cost General Recommendations Insights and Recommendations.
- Permissions (8): `recommender.cloudCostGeneralInsights.get`, `recommender.cloudCostGeneralInsights.list`, `recommender.cloudCostGeneralRecommendations.get`, `recommender.cloudCostGeneralRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Deprecation General Recommender Admin (`roles/recommender.cloudDeprecationRecommendationAdmin`)

- Launch stage: Beta
- Admin of Cloud Deprecation General Recommender Insights and Recommendations.
- Permissions (10): `recommender.cloudDeprecationGeneralInsights.get`, `recommender.cloudDeprecationGeneralInsights.list`, `recommender.cloudDeprecationGeneralInsights.update`, `recommender.cloudDeprecationGeneralRecommendations.get`, `recommender.cloudDeprecationGeneralRecommendations.list`, `recommender.cloudDeprecationGeneralRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Deprecation General Recommender Viewer (`roles/recommender.cloudDeprecationRecommendationViewer`)

- Launch stage: Beta
- Viewer of Cloud Deprecation General Recommender Insights and Recommendations.
- Permissions (8): `recommender.cloudDeprecationGeneralInsights.get`, `recommender.cloudDeprecationGeneralInsights.list`, `recommender.cloudDeprecationGeneralRecommendations.get`, `recommender.cloudDeprecationGeneralRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Manageability General Recommendations Recommender Admin (`roles/recommender.cloudManageabilityRecommendationAdmin`)

- Launch stage: Beta
- Admin of Cloud Manageability General Recommendations Insights and Recommendations.
- Permissions (10): `recommender.cloudManageabilityGeneralInsights.get`, `recommender.cloudManageabilityGeneralInsights.list`, `recommender.cloudManageabilityGeneralInsights.update`, `recommender.cloudManageabilityGeneralRecommendations.get`, `recommender.cloudManageabilityGeneralRecommendations.list`, `recommender.cloudManageabilityGeneralRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Manageability General Recommendations Recommender Viewer (`roles/recommender.cloudManageabilityRecommendationViewer`)

- Launch stage: Beta
- Viewer of Cloud Manageability General Recommendations Insights and Recommendations.
- Permissions (8): `recommender.cloudManageabilityGeneralInsights.get`, `recommender.cloudManageabilityGeneralInsights.list`, `recommender.cloudManageabilityGeneralRecommendations.get`, `recommender.cloudManageabilityGeneralRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Performance General Recommendations Recommender Admin (`roles/recommender.cloudPerformanceRecommendationAdmin`)

- Launch stage: Beta
- Admin of Cloud Performance General Recommendations Insights and Recommendations.
- Permissions (10): `recommender.cloudPerformanceGeneralInsights.get`, `recommender.cloudPerformanceGeneralInsights.list`, `recommender.cloudPerformanceGeneralInsights.update`, `recommender.cloudPerformanceGeneralRecommendations.get`, `recommender.cloudPerformanceGeneralRecommendations.list`, `recommender.cloudPerformanceGeneralRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Performance General Recommendations Recommender Viewer (`roles/recommender.cloudPerformanceRecommendationViewer`)

- Launch stage: Beta
- Viewer of Cloud Performance General Recommendations Insights and Recommendations.
- Permissions (8): `recommender.cloudPerformanceGeneralInsights.get`, `recommender.cloudPerformanceGeneralInsights.list`, `recommender.cloudPerformanceGeneralRecommendations.get`, `recommender.cloudPerformanceGeneralRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Reliability General Recommendations Recommender Admin (`roles/recommender.cloudReliabilityRecommendationAdmin`)

- Launch stage: Beta
- Admin of Cloud Reliability General Recommendations Insights and Recommendations.
- Permissions (10): `recommender.cloudReliabilityGeneralInsights.get`, `recommender.cloudReliabilityGeneralInsights.list`, `recommender.cloudReliabilityGeneralInsights.update`, `recommender.cloudReliabilityGeneralRecommendations.get`, `recommender.cloudReliabilityGeneralRecommendations.list`, `recommender.cloudReliabilityGeneralRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Reliability General Recommendations Recommender Viewer (`roles/recommender.cloudReliabilityRecommendationViewer`)

- Launch stage: Beta
- Viewer of Cloud Reliability General Recommendations Insights and Recommendations.
- Permissions (8): `recommender.cloudReliabilityGeneralInsights.get`, `recommender.cloudReliabilityGeneralInsights.list`, `recommender.cloudReliabilityGeneralRecommendations.get`, `recommender.cloudReliabilityGeneralRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Security General Recommendations Recommender Admin (`roles/recommender.cloudSecurityRecommendationAdmin`)

- Launch stage: Beta
- Admin of Cloud Security General Recommendations Insights and Recommendations.
- Permissions (10): `recommender.cloudSecurityGeneralInsights.get`, `recommender.cloudSecurityGeneralInsights.list`, `recommender.cloudSecurityGeneralInsights.update`, `recommender.cloudSecurityGeneralRecommendations.get`, `recommender.cloudSecurityGeneralRecommendations.list`, `recommender.cloudSecurityGeneralRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Security General Recommendations Recommender Viewer (`roles/recommender.cloudSecurityRecommendationViewer`)

- Launch stage: Beta
- Viewer of Cloud Security General Recommendations Insights and Recommendations.
- Permissions (8): `recommender.cloudSecurityGeneralInsights.get`, `recommender.cloudSecurityGeneralInsights.list`, `recommender.cloudSecurityGeneralRecommendations.get`, `recommender.cloudSecurityGeneralRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud SQL Recommender Admin (`roles/recommender.cloudsqlAdmin`)

- Launch stage: Beta
- Admin of Cloud SQL insights and recommendations.
- Permissions (53): `recommender.cloudsqlIdleInstanceRecommendations.get`, `recommender.cloudsqlIdleInstanceRecommendations.list`, `recommender.cloudsqlIdleInstanceRecommendations.update`, `recommender.cloudsqlInstanceActivityInsights.get`, `recommender.cloudsqlInstanceActivityInsights.list`, `recommender.cloudsqlInstanceActivityInsights.update`, `recommender.cloudsqlInstanceCpuUsageInsights.get`, `recommender.cloudsqlInstanceCpuUsageInsights.list`, `recommender.cloudsqlInstanceCpuUsageInsights.update`, `recommender.cloudsqlInstanceDiskUsageTrendInsights.get`, `recommender.cloudsqlInstanceDiskUsageTrendInsights.list`, `recommender.cloudsqlInstanceDiskUsageTrendInsights.update`, `recommender.cloudsqlInstanceMemoryUsageInsights.get`, `recommender.cloudsqlInstanceMemoryUsageInsights.list`, `recommender.cloudsqlInstanceMemoryUsageInsights.update`, `recommender.cloudsqlInstanceOomProbabilityInsights.get`, `recommender.cloudsqlInstanceOomProbabilityInsights.list`, `recommender.cloudsqlInstanceOomProbabilityInsights.update`, `recommender.cloudsqlInstanceOutOfDiskRecommendations.get`, `recommender.cloudsqlInstanceOutOfDiskRecommendations.list`, `recommender.cloudsqlInstanceOutOfDiskRecommendations.update`, `recommender.cloudsqlInstancePerformanceInsights.get`, `recommender.cloudsqlInstancePerformanceInsights.list`, `recommender.cloudsqlInstancePerformanceInsights.update`, `recommender.cloudsqlInstancePerformanceRecommendations.get`, `recommender.cloudsqlInstancePerformanceRecommendations.list`, `recommender.cloudsqlInstancePerformanceRecommendations.update`, `recommender.cloudsqlInstanceReliabilityInsights.get`, `recommender.cloudsqlInstanceReliabilityInsights.list`, `recommender.cloudsqlInstanceReliabilityInsights.update`, `recommender.cloudsqlInstanceReliabilityRecommendations.get`, `recommender.cloudsqlInstanceReliabilityRecommendations.list`, `recommender.cloudsqlInstanceReliabilityRecommendations.update`, `recommender.cloudsqlInstanceSecurityInsights.get`, `recommender.cloudsqlInstanceSecurityInsights.list`, `recommender.cloudsqlInstanceSecurityInsights.update`, `recommender.cloudsqlInstanceSecurityRecommendations.get`, `recommender.cloudsqlInstanceSecurityRecommendations.list`, `recommender.cloudsqlInstanceSecurityRecommendations.update`, `recommender.cloudsqlInstanceUnderprovisionedCpuUsageInsights.get`, `recommender.cloudsqlInstanceUnderprovisionedCpuUsageInsights.list`, `recommender.cloudsqlInstanceUnderprovisionedCpuUsageInsights.update`, `recommender.cloudsqlInstanceUnderprovisionedMemoryUsageInsights.get`, `recommender.cloudsqlInstanceUnderprovisionedMemoryUsageInsights.list`, `recommender.cloudsqlInstanceUnderprovisionedMemoryUsageInsights.update`, `recommender.cloudsqlOverprovisionedInstanceRecommendations.get`, `recommender.cloudsqlOverprovisionedInstanceRecommendations.list`, `recommender.cloudsqlOverprovisionedInstanceRecommendations.update`, `recommender.cloudsqlUnderProvisionedInstanceRecommendations.get`, `recommender.cloudsqlUnderProvisionedInstanceRecommendations.list`, `recommender.cloudsqlUnderProvisionedInstanceRecommendations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud SQL Recommender Viewer (`roles/recommender.cloudsqlViewer`)

- Launch stage: Beta
- Viewer of Cloud SQL insights and recommendations.
- Permissions (36): `recommender.cloudsqlIdleInstanceRecommendations.get`, `recommender.cloudsqlIdleInstanceRecommendations.list`, `recommender.cloudsqlInstanceActivityInsights.get`, `recommender.cloudsqlInstanceActivityInsights.list`, `recommender.cloudsqlInstanceCpuUsageInsights.get`, `recommender.cloudsqlInstanceCpuUsageInsights.list`, `recommender.cloudsqlInstanceDiskUsageTrendInsights.get`, `recommender.cloudsqlInstanceDiskUsageTrendInsights.list`, `recommender.cloudsqlInstanceMemoryUsageInsights.get`, `recommender.cloudsqlInstanceMemoryUsageInsights.list`, `recommender.cloudsqlInstanceOomProbabilityInsights.get`, `recommender.cloudsqlInstanceOomProbabilityInsights.list`, `recommender.cloudsqlInstanceOutOfDiskRecommendations.get`, `recommender.cloudsqlInstanceOutOfDiskRecommendations.list`, `recommender.cloudsqlInstancePerformanceInsights.get`, `recommender.cloudsqlInstancePerformanceInsights.list`, `recommender.cloudsqlInstancePerformanceRecommendations.get`, `recommender.cloudsqlInstancePerformanceRecommendations.list`, `recommender.cloudsqlInstanceReliabilityInsights.get`, `recommender.cloudsqlInstanceReliabilityInsights.list`, `recommender.cloudsqlInstanceReliabilityRecommendations.get`, `recommender.cloudsqlInstanceReliabilityRecommendations.list`, `recommender.cloudsqlInstanceSecurityInsights.get`, `recommender.cloudsqlInstanceSecurityInsights.list`, `recommender.cloudsqlInstanceSecurityRecommendations.get`, `recommender.cloudsqlInstanceSecurityRecommendations.list`, `recommender.cloudsqlInstanceUnderprovisionedCpuUsageInsights.get`, `recommender.cloudsqlInstanceUnderprovisionedCpuUsageInsights.list`, `recommender.cloudsqlInstanceUnderprovisionedMemoryUsageInsights.get`, `recommender.cloudsqlInstanceUnderprovisionedMemoryUsageInsights.list`, `recommender.cloudsqlOverprovisionedInstanceRecommendations.get`, `recommender.cloudsqlOverprovisionedInstanceRecommendations.list`, `recommender.cloudsqlUnderProvisionedInstanceRecommendations.get`, `recommender.cloudsqlUnderProvisionedInstanceRecommendations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Compute Recommender Admin (`roles/recommender.computeAdmin`)

- Admin of compute recommendations.
- Permissions (74): `recommender.computeAddressIdleResourceInsights.get`, `recommender.computeAddressIdleResourceInsights.list`, `recommender.computeAddressIdleResourceInsights.update`, `recommender.computeAddressIdleResourceRecommendations.get`, `recommender.computeAddressIdleResourceRecommendations.list`, `recommender.computeAddressIdleResourceRecommendations.update`, `recommender.computeDiskIdleResourceInsights.get`, `recommender.computeDiskIdleResourceInsights.list`, `recommender.computeDiskIdleResourceInsights.update`, `recommender.computeDiskIdleResourceRecommendations.get`, `recommender.computeDiskIdleResourceRecommendations.list`, `recommender.computeDiskIdleResourceRecommendations.update`, `recommender.computeIdleResourceInsights.get`, `recommender.computeIdleResourceInsights.list`, `recommender.computeIdleResourceInsights.update`, `recommender.computeIdleResourceRecommendations.get`, `recommender.computeIdleResourceRecommendations.list`, `recommender.computeIdleResourceRecommendations.update`, `recommender.computeImageIdleResourceInsights.get`, `recommender.computeImageIdleResourceInsights.list`, `recommender.computeImageIdleResourceInsights.update`, `recommender.computeImageIdleResourceRecommendations.get`, `recommender.computeImageIdleResourceRecommendations.list`, `recommender.computeImageIdleResourceRecommendations.update`, `recommender.computeInstanceCpuUsageInsights.get`, `recommender.computeInstanceCpuUsageInsights.list`, `recommender.computeInstanceCpuUsageInsights.update`, `recommender.computeInstanceCpuUsagePredictionInsights.get`, `recommender.computeInstanceCpuUsagePredictionInsights.list`, `recommender.computeInstanceCpuUsagePredictionInsights.update`, `recommender.computeInstanceCpuUsageTrendInsights.get`, `recommender.computeInstanceCpuUsageTrendInsights.list`, `recommender.computeInstanceCpuUsageTrendInsights.update`, `recommender.computeInstanceGroupManagerCpuUsageInsights.get`, `recommender.computeInstanceGroupManagerCpuUsageInsights.list`, `recommender.computeInstanceGroupManagerCpuUsageInsights.update`, `recommender.computeInstanceGroupManagerCpuUsagePredictionInsights.get`, `recommender.computeInstanceGroupManagerCpuUsagePredictionInsights.list`, `recommender.computeInstanceGroupManagerCpuUsagePredictionInsights.update`, `recommender.computeInstanceGroupManagerCpuUsageTrendInsights.get`, `recommender.computeInstanceGroupManagerCpuUsageTrendInsights.list`, `recommender.computeInstanceGroupManagerCpuUsageTrendInsights.update`, `recommender.computeInstanceGroupManagerMachineTypeRecommendations.get`, `recommender.computeInstanceGroupManagerMachineTypeRecommendations.list`, `recommender.computeInstanceGroupManagerMachineTypeRecommendations.update`, `recommender.computeInstanceGroupManagerMemoryUsageInsights.get`, `recommender.computeInstanceGroupManagerMemoryUsageInsights.list`, `recommender.computeInstanceGroupManagerMemoryUsageInsights.update`, `recommender.computeInstanceGroupManagerMemoryUsagePredictionInsights.get`, `recommender.computeInstanceGroupManagerMemoryUsagePredictionInsights.list`, `recommender.computeInstanceGroupManagerMemoryUsagePredictionInsights.update`, `recommender.computeInstanceIdleResourceRecommendations.get`, `recommender.computeInstanceIdleResourceRecommendations.list`, `recommender.computeInstanceIdleResourceRecommendations.update`, `recommender.computeInstanceIdleResourceRecommenderConfig.get`, `recommender.computeInstanceIdleResourceRecommenderConfig.update`, `recommender.computeInstanceMachineTypeRecommendations.get`, `recommender.computeInstanceMachineTypeRecommendations.list`, `recommender.computeInstanceMachineTypeRecommendations.update`, `recommender.computeInstanceMachineTypeRecommenderConfig.get`, `recommender.computeInstanceMachineTypeRecommenderConfig.update`, `recommender.computeInstanceMemoryUsageInsights.get`, `recommender.computeInstanceMemoryUsageInsights.list`, `recommender.computeInstanceMemoryUsageInsights.update`, `recommender.computeInstanceMemoryUsagePredictionInsights.get`, `recommender.computeInstanceMemoryUsagePredictionInsights.list`, `recommender.computeInstanceMemoryUsagePredictionInsights.update`, `recommender.computeInstanceNetworkThroughputInsights.get`, `recommender.computeInstanceNetworkThroughputInsights.list`, `recommender.computeInstanceNetworkThroughputInsights.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Compute Recommender Viewer (`roles/recommender.computeViewer`)

- Viewer of compute recommendations.
- Permissions (48): `recommender.computeAddressIdleResourceInsights.get`, `recommender.computeAddressIdleResourceInsights.list`, `recommender.computeAddressIdleResourceRecommendations.get`, `recommender.computeAddressIdleResourceRecommendations.list`, `recommender.computeDiskIdleResourceInsights.get`, `recommender.computeDiskIdleResourceInsights.list`, `recommender.computeDiskIdleResourceRecommendations.get`, `recommender.computeDiskIdleResourceRecommendations.list`, `recommender.computeIdleResourceInsights.get`, `recommender.computeIdleResourceInsights.list`, `recommender.computeIdleResourceRecommendations.get`, `recommender.computeIdleResourceRecommendations.list`, `recommender.computeImageIdleResourceInsights.get`, `recommender.computeImageIdleResourceInsights.list`, `recommender.computeImageIdleResourceRecommendations.get`, `recommender.computeImageIdleResourceRecommendations.list`, `recommender.computeInstanceCpuUsageInsights.get`, `recommender.computeInstanceCpuUsageInsights.list`, `recommender.computeInstanceCpuUsagePredictionInsights.get`, `recommender.computeInstanceCpuUsagePredictionInsights.list`, `recommender.computeInstanceCpuUsageTrendInsights.get`, `recommender.computeInstanceCpuUsageTrendInsights.list`, `recommender.computeInstanceGroupManagerCpuUsageInsights.get`, `recommender.computeInstanceGroupManagerCpuUsageInsights.list`, `recommender.computeInstanceGroupManagerCpuUsagePredictionInsights.get`, `recommender.computeInstanceGroupManagerCpuUsagePredictionInsights.list`, `recommender.computeInstanceGroupManagerCpuUsageTrendInsights.get`, `recommender.computeInstanceGroupManagerCpuUsageTrendInsights.list`, `recommender.computeInstanceGroupManagerMachineTypeRecommendations.get`, `recommender.computeInstanceGroupManagerMachineTypeRecommendations.list`, `recommender.computeInstanceGroupManagerMemoryUsageInsights.get`, `recommender.computeInstanceGroupManagerMemoryUsageInsights.list`, `recommender.computeInstanceGroupManagerMemoryUsagePredictionInsights.get`, `recommender.computeInstanceGroupManagerMemoryUsagePredictionInsights.list`, `recommender.computeInstanceIdleResourceRecommendations.get`, `recommender.computeInstanceIdleResourceRecommendations.list`, `recommender.computeInstanceMachineTypeRecommendations.get`, `recommender.computeInstanceMachineTypeRecommendations.list`, `recommender.computeInstanceMemoryUsageInsights.get`, `recommender.computeInstanceMemoryUsageInsights.list`, `recommender.computeInstanceMemoryUsagePredictionInsights.get`, `recommender.computeInstanceMemoryUsagePredictionInsights.list`, `recommender.computeInstanceNetworkThroughputInsights.get`, `recommender.computeInstanceNetworkThroughputInsights.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### GKE Diagnosis Recommender Admin (`roles/recommender.containerDiagnosisAdmin`)

- Admin of GKE Diagnosis Insights and Recommendations.
- Permissions (10): `recommender.containerDiagnosisInsights.get`, `recommender.containerDiagnosisInsights.list`, `recommender.containerDiagnosisInsights.update`, `recommender.containerDiagnosisRecommendations.get`, `recommender.containerDiagnosisRecommendations.list`, `recommender.containerDiagnosisRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### GKE Diagnosis Recommender Viewer (`roles/recommender.containerDiagnosisViewer`)

- Viewer of GKE Diagnosis Insights and Recommendations.
- Permissions (8): `recommender.containerDiagnosisInsights.get`, `recommender.containerDiagnosisInsights.list`, `recommender.containerDiagnosisRecommendations.get`, `recommender.containerDiagnosisRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Dataflow Diagnostics Admin (`roles/recommender.dataflowDiagnosticsAdmin`)

- Admin of Diagnostics recommendations.
- Permissions (7): `recommender.dataflowDiagnosticsInsights.get`, `recommender.dataflowDiagnosticsInsights.list`, `recommender.dataflowDiagnosticsInsights.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Dataflow Diagnostics Viewer (`roles/recommender.dataflowDiagnosticsViewer`)

- Viewer of Diagnostics recommendations.
- Permissions (6): `recommender.dataflowDiagnosticsInsights.get`, `recommender.dataflowDiagnosticsInsights.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Error Reporting Recommender Admin (`roles/recommender.errorReportingAdmin`)

- Admin of Error Reporting Insights and Recommendations.
- Permissions (10): `recommender.errorReportingInsights.get`, `recommender.errorReportingInsights.list`, `recommender.errorReportingInsights.update`, `recommender.errorReportingRecommendations.get`, `recommender.errorReportingRecommendations.list`, `recommender.errorReportingRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Error Reporting Recommender Viewer (`roles/recommender.errorReportingViewer`)

- Viewer of Error Reporting Insights and Recommendations.
- Permissions (8): `recommender.errorReportingInsights.get`, `recommender.errorReportingInsights.list`, `recommender.errorReportingRecommendations.get`, `recommender.errorReportingRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Recommendations Exporter (`roles/recommender.exporter`)

- Exporter of Recommendations
- Permissions (1): `recommender.resources.export`

### Firestore Database Firebase rules Recommender Admin (`roles/recommender.firestoredatabasefirebaserulesAdmin`)

- Launch stage: Beta
- Admin of Firestore Database Firebase rules Insights and Recommendations.
- Permissions (10): `recommender.firestoreDatabaseFirebaseRulesInsights.get`, `recommender.firestoreDatabaseFirebaseRulesInsights.list`, `recommender.firestoreDatabaseFirebaseRulesInsights.update`, `recommender.firestoreDatabaseFirebaseRulesRecommendations.get`, `recommender.firestoreDatabaseFirebaseRulesRecommendations.list`, `recommender.firestoreDatabaseFirebaseRulesRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Firestore Database Firebase rules Recommender Viewer (`roles/recommender.firestoredatabasefirebaserulesViewer`)

- Launch stage: Beta
- Viewer of Firestore Database Firebase rules Insights and Recommendations.
- Permissions (8): `recommender.firestoreDatabaseFirebaseRulesInsights.get`, `recommender.firestoreDatabaseFirebaseRulesInsights.list`, `recommender.firestoreDatabaseFirebaseRulesRecommendations.get`, `recommender.firestoreDatabaseFirebaseRulesRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Firestore Database Reliability Recommender Admin (`roles/recommender.firestoredatabasereliabilityAdmin`)

- Admin of Firestore Database Reliability Insights and Recommendations.
- Permissions (10): `recommender.firestoreDatabaseReliabilityInsights.get`, `recommender.firestoreDatabaseReliabilityInsights.list`, `recommender.firestoreDatabaseReliabilityInsights.update`, `recommender.firestoreDatabaseReliabilityRecommendations.get`, `recommender.firestoreDatabaseReliabilityRecommendations.list`, `recommender.firestoreDatabaseReliabilityRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Firestore Database Reliability Recommender Viewer (`roles/recommender.firestoredatabasereliabilityViewer`)

- Viewer of Firestore Database Reliability Insights and Recommendations.
- Permissions (8): `recommender.firestoreDatabaseReliabilityInsights.get`, `recommender.firestoreDatabaseReliabilityInsights.list`, `recommender.firestoreDatabaseReliabilityRecommendations.get`, `recommender.firestoreDatabaseReliabilityRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Firewall Recommender Admin (`roles/recommender.firewallAdmin`)

- Admin of Firewall insights and recommendations.
- Permissions (10): `monitoring.timeSeries.list`, `recommender.computeFirewallInsightTypeConfigs.get`, `recommender.computeFirewallInsightTypeConfigs.update`, `recommender.computeFirewallInsights.get`, `recommender.computeFirewallInsights.list`, `recommender.computeFirewallInsights.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Firewall Recommender Viewer (`roles/recommender.firewallViewer`)

- Viewer of Firewall insights and recommendations.
- Permissions (8): `monitoring.timeSeries.list`, `recommender.computeFirewallInsightTypeConfigs.get`, `recommender.computeFirewallInsights.get`, `recommender.computeFirewallInsights.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Google Maps Platform Insights/Recommendations Admin (`roles/recommender.gmpAdmin`)

- Admin of all Google Maps Platform insights and recommendations.
- Permissions (20): `recommender.gmpGuidedExperienceInsights.get`, `recommender.gmpGuidedExperienceInsights.list`, `recommender.gmpGuidedExperienceInsights.update`, `recommender.gmpGuidedExperienceRecommendations.get`, `recommender.gmpGuidedExperienceRecommendations.list`, `recommender.gmpGuidedExperienceRecommendations.update`, `recommender.gmpProjectManagementInsights.get`, `recommender.gmpProjectManagementInsights.list`, `recommender.gmpProjectManagementInsights.update`, `recommender.gmpProjectManagementRecommendations.get`, `recommender.gmpProjectManagementRecommendations.list`, `recommender.gmpProjectManagementRecommendations.update`, `recommender.gmpProjectProductSuggestionsInsights.get`, `recommender.gmpProjectProductSuggestionsInsights.list`, `recommender.gmpProjectProductSuggestionsInsights.update`, `recommender.gmpProjectProductSuggestionsRecommendations.get`, `recommender.gmpProjectProductSuggestionsRecommendations.list`, `recommender.gmpProjectProductSuggestionsRecommendations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Google Maps Platform Insights/Recommendations Viewer (`roles/recommender.gmpViewer`)

- Viewer of all Google Maps Platform insights and recommendations.
- Permissions (14): `recommender.gmpGuidedExperienceInsights.get`, `recommender.gmpGuidedExperienceInsights.list`, `recommender.gmpGuidedExperienceRecommendations.get`, `recommender.gmpGuidedExperienceRecommendations.list`, `recommender.gmpProjectManagementInsights.get`, `recommender.gmpProjectManagementInsights.list`, `recommender.gmpProjectManagementRecommendations.get`, `recommender.gmpProjectManagementRecommendations.list`, `recommender.gmpProjectProductSuggestionsInsights.get`, `recommender.gmpProjectProductSuggestionsInsights.list`, `recommender.gmpProjectProductSuggestionsRecommendations.get`, `recommender.gmpProjectProductSuggestionsRecommendations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### IAM Recommender Admin (`roles/recommender.iamAdmin`)

- Admin of IAM recommendations.
- Permissions (23): `recommender.iamPolicyInsights.get`, `recommender.iamPolicyInsights.list`, `recommender.iamPolicyInsights.update`, `recommender.iamPolicyLateralMovementInsights.get`, `recommender.iamPolicyLateralMovementInsights.list`, `recommender.iamPolicyLateralMovementInsights.update`, `recommender.iamPolicyRecommendations.get`, `recommender.iamPolicyRecommendations.list`, `recommender.iamPolicyRecommendations.update`, `recommender.iamPolicyRecommenderConfig.get`, `recommender.iamPolicyRecommenderConfig.update`, `recommender.iamServiceAccountInsights.get`, `recommender.iamServiceAccountInsights.list`, `recommender.iamServiceAccountInsights.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `securitycenter.findings.group`, `securitycenter.userinterfacemetadata.get`, `securitycentermanagement.securityCommandCenter.activate`, `securitycentermanagement.securityCommandCenter.checkActivationOperation`, `securitycentermanagement.securityCommandCenter.checkEligibility`

### IAM Recommender Viewer (`roles/recommender.iamViewer`)

- Viewer of IAM recommendations.
- Permissions (15): `recommender.iamPolicyInsights.get`, `recommender.iamPolicyInsights.list`, `recommender.iamPolicyLateralMovementInsights.get`, `recommender.iamPolicyLateralMovementInsights.list`, `recommender.iamPolicyRecommendations.get`, `recommender.iamPolicyRecommendations.list`, `recommender.iamPolicyRecommenderConfig.get`, `recommender.iamServiceAccountInsights.get`, `recommender.iamServiceAccountInsights.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `securitycenter.findings.group`, `securitycenter.userinterfacemetadata.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/recommender.viewer"
```

## Notes

- Roles and permissions of the `recommender` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/recommender (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
