---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/recommender
---

# Recommender IAM roles and permissions (part 3/6)

## Signature / Usage

Predefined roles of `recommender` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### IAM Recommender Viewer (`roles/recommender.iamViewer`)

- Viewer of IAM recommendations.
- Permissions (15): `recommender.iamPolicyInsights.get`, `recommender.iamPolicyInsights.list`, `recommender.iamPolicyLateralMovementInsights.get`, `recommender.iamPolicyLateralMovementInsights.list`, `recommender.iamPolicyRecommendations.get`, `recommender.iamPolicyRecommendations.list`, `recommender.iamPolicyRecommenderConfig.get`, `recommender.iamServiceAccountInsights.get`, `recommender.iamServiceAccountInsights.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `securitycenter.findings.group`, `securitycenter.userinterfacemetadata.get`

#### IAM Policy Change Risk Recommender Admin (`roles/recommender.iampolicychangeriskAdmin`)

- Launch stage: Beta
- Admin of IAM Policy Change Risk Insights and Recommendations.
- Permissions (10): `recommender.iamPolicyChangeRiskInsights.get`, `recommender.iamPolicyChangeRiskInsights.list`, `recommender.iamPolicyChangeRiskInsights.update`, `recommender.iamPolicyChangeRiskRecommendations.get`, `recommender.iamPolicyChangeRiskRecommendations.list`, `recommender.iamPolicyChangeRiskRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### IAM Policy Change Risk Recommender Viewer (`roles/recommender.iampolicychangeriskViewer`)

- Launch stage: Beta
- Viewer of IAM Policy Change Risk Insights and Recommendations.
- Permissions (8): `recommender.iamPolicyChangeRiskInsights.get`, `recommender.iamPolicyChangeRiskInsights.list`, `recommender.iamPolicyChangeRiskRecommendations.get`, `recommender.iamPolicyChangeRiskRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Memorystore Manageability Recommender Admin (`roles/recommender.memorystoremanageabilityAdmin`)

- Launch stage: Beta
- Admin of Memorystore Manageability Insights and Recommendations.
- Permissions (10): `recommender.locations.get`, `recommender.locations.list`, `recommender.memorystoreManageabilityInsights.get`, `recommender.memorystoreManageabilityInsights.list`, `recommender.memorystoreManageabilityInsights.update`, `recommender.memorystoreManageabilityRecommendations.get`, `recommender.memorystoreManageabilityRecommendations.list`, `recommender.memorystoreManageabilityRecommendations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Memorystore Manageability Recommender Viewer (`roles/recommender.memorystoremanageabilityViewer`)

- Launch stage: Beta
- Viewer of Memorystore Manageability Insights and Recommendations.
- Permissions (8): `recommender.locations.get`, `recommender.locations.list`, `recommender.memorystoreManageabilityInsights.get`, `recommender.memorystoreManageabilityInsights.list`, `recommender.memorystoreManageabilityRecommendations.get`, `recommender.memorystoreManageabilityRecommendations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Memorystore Performance Recommender Admin (`roles/recommender.memorystoreperformanceAdmin`)

- Launch stage: Beta
- Admin of Memorystore Performance Insights and Recommendations.
- Permissions (13): `recommender.locations.get`, `recommender.locations.list`, `recommender.memorystorePerformanceInsights.get`, `recommender.memorystorePerformanceInsights.list`, `recommender.memorystorePerformanceInsights.update`, `recommender.memorystorePerformanceRecommendations.get`, `recommender.memorystorePerformanceRecommendations.list`, `recommender.memorystorePerformanceRecommendations.update`, `recommender.memorystoreUtilizationInsights.get`, `recommender.memorystoreUtilizationInsights.list`, `recommender.memorystoreUtilizationInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Memorystore Performance Recommender Viewer (`roles/recommender.memorystoreperformanceViewer`)

- Launch stage: Beta
- Viewer of Memorystore Performance Insights and Recommendations.
- Permissions (10): `recommender.locations.get`, `recommender.locations.list`, `recommender.memorystorePerformanceInsights.get`, `recommender.memorystorePerformanceInsights.list`, `recommender.memorystorePerformanceRecommendations.get`, `recommender.memorystorePerformanceRecommendations.list`, `recommender.memorystoreUtilizationInsights.get`, `recommender.memorystoreUtilizationInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Memorystore Reliability Recommender Admin (`roles/recommender.memorystorereliabilityAdmin`)

- Launch stage: Beta
- Admin of Memorystore Reliability Insights and Recommendations.
- Permissions (10): `recommender.locations.get`, `recommender.locations.list`, `recommender.memorystoreReliabilityInsights.get`, `recommender.memorystoreReliabilityInsights.list`, `recommender.memorystoreReliabilityInsights.update`, `recommender.memorystoreReliabilityRecommendations.get`, `recommender.memorystoreReliabilityRecommendations.list`, `recommender.memorystoreReliabilityRecommendations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Memorystore Reliability Recommender Viewer (`roles/recommender.memorystorereliabilityViewer`)

- Launch stage: Beta
- Viewer of Memorystore Reliability Insights and Recommendations.
- Permissions (8): `recommender.locations.get`, `recommender.locations.list`, `recommender.memorystoreReliabilityInsights.get`, `recommender.memorystoreReliabilityInsights.list`, `recommender.memorystoreReliabilityRecommendations.get`, `recommender.memorystoreReliabilityRecommendations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer Recommender Admin (`roles/recommender.networkAnalyzerAdmin`)

- Admin of Network Analyzer Insights and Recommendations.
- Permissions (28): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerCloudSqlInsights.get`, `recommender.networkAnalyzerCloudSqlInsights.list`, `recommender.networkAnalyzerCloudSqlInsights.update`, `recommender.networkAnalyzerDynamicRouteInsights.get`, `recommender.networkAnalyzerDynamicRouteInsights.list`, `recommender.networkAnalyzerDynamicRouteInsights.update`, `recommender.networkAnalyzerGkeConnectivityInsights.get`, `recommender.networkAnalyzerGkeConnectivityInsights.list`, `recommender.networkAnalyzerGkeConnectivityInsights.update`, `recommender.networkAnalyzerGkeIpAddressInsights.get`, `recommender.networkAnalyzerGkeIpAddressInsights.list`, `recommender.networkAnalyzerGkeIpAddressInsights.update`, `recommender.networkAnalyzerGkeServiceAccountInsights.get`, `recommender.networkAnalyzerGkeServiceAccountInsights.list`, `recommender.networkAnalyzerGkeServiceAccountInsights.update`, `recommender.networkAnalyzerIpAddressInsights.get`, `recommender.networkAnalyzerIpAddressInsights.list`, `recommender.networkAnalyzerIpAddressInsights.update`, `recommender.networkAnalyzerLoadBalancerInsights.get`, `recommender.networkAnalyzerLoadBalancerInsights.list`, `recommender.networkAnalyzerLoadBalancerInsights.update`, `recommender.networkAnalyzerVpcConnectivityInsights.get`, `recommender.networkAnalyzerVpcConnectivityInsights.list`, `recommender.networkAnalyzerVpcConnectivityInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer Cloud SQL Recommender Admin (`roles/recommender.networkAnalyzerCloudSqlAdmin`)

- Admin of Network Analyzer Cloud SQL Insights and Recommendations.
- Permissions (7): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerCloudSqlInsights.get`, `recommender.networkAnalyzerCloudSqlInsights.list`, `recommender.networkAnalyzerCloudSqlInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer Cloud SQL Recommender Viewer (`roles/recommender.networkAnalyzerCloudSqlViewer`)

- Viewer of Network Analyzer Cloud SQL Insights and Recommendations.
- Permissions (6): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerCloudSqlInsights.get`, `recommender.networkAnalyzerCloudSqlInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer Dynamic Route Recommender Admin (`roles/recommender.networkAnalyzerDynamicRouteAdmin`)

- Admin of Network Analyzer Dynamic Route Insights and Recommendations.
- Permissions (7): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerDynamicRouteInsights.get`, `recommender.networkAnalyzerDynamicRouteInsights.list`, `recommender.networkAnalyzerDynamicRouteInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer Dynamic Route Recommender Viewer (`roles/recommender.networkAnalyzerDynamicRouteViewer`)

- Viewer of Network Analyzer Dynamic Route Insights and Recommendations.
- Permissions (6): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerDynamicRouteInsights.get`, `recommender.networkAnalyzerDynamicRouteInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer GKE Connectivity Recommender Admin (`roles/recommender.networkAnalyzerGkeConnectivityAdmin`)

- Admin of Network Analyzer GKE Connectivity Insights and Recommendations.
- Permissions (7): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerGkeConnectivityInsights.get`, `recommender.networkAnalyzerGkeConnectivityInsights.list`, `recommender.networkAnalyzerGkeConnectivityInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer GKE Connectivity Recommender Viewer (`roles/recommender.networkAnalyzerGkeConnectivityViewer`)

- Viewer of Network Analyzer GKE Connectivity Insights and Recommendations.
- Permissions (6): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerGkeConnectivityInsights.get`, `recommender.networkAnalyzerGkeConnectivityInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer GKE IP Address Recommender Admin (`roles/recommender.networkAnalyzerGkeIpAddressAdmin`)

- Admin of Network Analyzer GKE IP Address Insights and Recommendations.
- Permissions (7): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerGkeIpAddressInsights.get`, `recommender.networkAnalyzerGkeIpAddressInsights.list`, `recommender.networkAnalyzerGkeIpAddressInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer GKE IP Address Recommender Viewer (`roles/recommender.networkAnalyzerGkeIpAddressViewer`)

- Viewer of Network Analyzer GKE IP Address Insights and Recommendations.
- Permissions (6): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerGkeIpAddressInsights.get`, `recommender.networkAnalyzerGkeIpAddressInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer GKE Service Account Insights Recommender Admin (`roles/recommender.networkAnalyzerGkeServiceAccountAdmin`)

- Admin of Network Analyzer GKE Service Account Insights Insights and Recommendations.
- Permissions (7): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerGkeServiceAccountInsights.get`, `recommender.networkAnalyzerGkeServiceAccountInsights.list`, `recommender.networkAnalyzerGkeServiceAccountInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer GKE Service Account Insights Recommender Viewer (`roles/recommender.networkAnalyzerGkeServiceAccountViewer`)

- Viewer of Network Analyzer GKE Service Account Insights Insights and Recommendations.
- Permissions (6): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerGkeServiceAccountInsights.get`, `recommender.networkAnalyzerGkeServiceAccountInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer IP Address Recommender Admin (`roles/recommender.networkAnalyzerIpAddressAdmin`)

- Admin of Network Analyzer IP Address Insights and Recommendations.
- Permissions (7): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerIpAddressInsights.get`, `recommender.networkAnalyzerIpAddressInsights.list`, `recommender.networkAnalyzerIpAddressInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer IP Address Recommender Viewer (`roles/recommender.networkAnalyzerIpAddressViewer`)

- Viewer of Network Analyzer IP Address Insights and Recommendations.
- Permissions (6): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerIpAddressInsights.get`, `recommender.networkAnalyzerIpAddressInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer Load Balancer Recommender Admin (`roles/recommender.networkAnalyzerLoadBalancerAdmin`)

- Admin of Network Analyzer Load Balancer Insights and Recommendations.
- Permissions (7): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerLoadBalancerInsights.get`, `recommender.networkAnalyzerLoadBalancerInsights.list`, `recommender.networkAnalyzerLoadBalancerInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer Load Balancer Recommender Viewer (`roles/recommender.networkAnalyzerLoadBalancerViewer`)

- Viewer of Network Analyzer Load Balancer Insights and Recommendations.
- Permissions (6): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerLoadBalancerInsights.get`, `recommender.networkAnalyzerLoadBalancerInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer Recommender Viewer (`roles/recommender.networkAnalyzerViewer`)

- Viewer of Network Analyzer Insights and Recommendations.
- Permissions (20): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerCloudSqlInsights.get`, `recommender.networkAnalyzerCloudSqlInsights.list`, `recommender.networkAnalyzerDynamicRouteInsights.get`, `recommender.networkAnalyzerDynamicRouteInsights.list`, `recommender.networkAnalyzerGkeConnectivityInsights.get`, `recommender.networkAnalyzerGkeConnectivityInsights.list`, `recommender.networkAnalyzerGkeIpAddressInsights.get`, `recommender.networkAnalyzerGkeIpAddressInsights.list`, `recommender.networkAnalyzerGkeServiceAccountInsights.get`, `recommender.networkAnalyzerGkeServiceAccountInsights.list`, `recommender.networkAnalyzerIpAddressInsights.get`, `recommender.networkAnalyzerIpAddressInsights.list`, `recommender.networkAnalyzerLoadBalancerInsights.get`, `recommender.networkAnalyzerLoadBalancerInsights.list`, `recommender.networkAnalyzerVpcConnectivityInsights.get`, `recommender.networkAnalyzerVpcConnectivityInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer VPC Connectivity Recommender Admin (`roles/recommender.networkAnalyzerVpcConnectivityAdmin`)

- Admin of Network Analyzer VPC Connectivity Insights and Recommendations.
- Permissions (7): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerVpcConnectivityInsights.get`, `recommender.networkAnalyzerVpcConnectivityInsights.list`, `recommender.networkAnalyzerVpcConnectivityInsights.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Network Analyzer VPC Connectivity Recommender Viewer (`roles/recommender.networkAnalyzerVpcConnectivityViewer`)

- Viewer of Network Analyzer VPC Connectivity Insights and Recommendations.
- Permissions (6): `recommender.locations.get`, `recommender.locations.list`, `recommender.networkAnalyzerVpcConnectivityInsights.get`, `recommender.networkAnalyzerVpcConnectivityInsights.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Org Policy Recommender Admin (`roles/recommender.orgPolicyAdmin`)

- Launch stage: Beta
- Admin of Org Policy Insights and Recommendations.
- Permissions (10): `recommender.locations.get`, `recommender.locations.list`, `recommender.orgPolicyInsights.get`, `recommender.orgPolicyInsights.list`, `recommender.orgPolicyInsights.update`, `recommender.orgPolicyRecommendations.get`, `recommender.orgPolicyRecommendations.list`, `recommender.orgPolicyRecommendations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Org Policy Recommender Viewer (`roles/recommender.orgPolicyViewer`)

- Launch stage: Beta
- Viewer of Org Policy Insights and Recommendations.
- Permissions (8): `recommender.locations.get`, `recommender.locations.list`, `recommender.orgPolicyInsights.get`, `recommender.orgPolicyInsights.list`, `recommender.orgPolicyRecommendations.get`, `recommender.orgPolicyRecommendations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Product Suggestion Recommenders Admin (`roles/recommender.productSuggestionAdmin`)

- Launch stage: Beta
- Admin of all Product Suggestion insights and recommendations.
- Permissions (16): `recommender.locations.get`, `recommender.locations.list`, `recommender.loggingProductSuggestionContainerInsights.get`, `recommender.loggingProductSuggestionContainerInsights.list`, `recommender.loggingProductSuggestionContainerInsights.update`, `recommender.loggingProductSuggestionContainerRecommendations.get`, `recommender.loggingProductSuggestionContainerRecommendations.list`, `recommender.loggingProductSuggestionContainerRecommendations.update`, `recommender.monitoringProductSuggestionComputeInsights.get`, `recommender.monitoringProductSuggestionComputeInsights.list`, `recommender.monitoringProductSuggestionComputeInsights.update`, `recommender.monitoringProductSuggestionComputeRecommendations.get`, `recommender.monitoringProductSuggestionComputeRecommendations.list`, `recommender.monitoringProductSuggestionComputeRecommendations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Product Suggestion Recommenders Viewer (`roles/recommender.productSuggestionViewer`)

- Launch stage: Beta
- Viewer of all Product Suggestion insights and recommendations.
- Permissions (12): `recommender.locations.get`, `recommender.locations.list`, `recommender.loggingProductSuggestionContainerInsights.get`, `recommender.loggingProductSuggestionContainerInsights.list`, `recommender.loggingProductSuggestionContainerRecommendations.get`, `recommender.loggingProductSuggestionContainerRecommendations.list`, `recommender.monitoringProductSuggestionComputeInsights.get`, `recommender.monitoringProductSuggestionComputeInsights.list`, `recommender.monitoringProductSuggestionComputeRecommendations.get`, `recommender.monitoringProductSuggestionComputeRecommendations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Project Usage Commitment Recommender Admin (`roles/recommender.projectCudAdmin`)

- Launch stage: Beta
- Admin of Project Usage Commitment Recommender.
- Permissions (11): `recommender.commitmentUtilizationInsights.get`, `recommender.commitmentUtilizationInsights.list`, `recommender.commitmentUtilizationInsights.update`, `recommender.locations.get`, `recommender.locations.list`, `recommender.spendBasedCommitmentRecommenderConfig.get`, `recommender.usageCommitmentRecommendations.get`, `recommender.usageCommitmentRecommendations.list`, `recommender.usageCommitmentRecommendations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Project Usage Commitment Recommender Viewer (`roles/recommender.projectCudViewer`)

- Launch stage: Beta
- Viewer of Project Usage Commitment Recommender.
- Permissions (9): `recommender.commitmentUtilizationInsights.get`, `recommender.commitmentUtilizationInsights.list`, `recommender.locations.get`, `recommender.locations.list`, `recommender.spendBasedCommitmentRecommenderConfig.get`, `recommender.usageCommitmentRecommendations.get`, `recommender.usageCommitmentRecommendations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Project Utilization Recommender Admin (`roles/recommender.projectUtilAdmin`)

- Admin of Project Utilization insights and recommendations.
- Permissions (12): `recommender.resourcemanagerProjectUtilizationInsightTypeConfigs.get`, `recommender.resourcemanagerProjectUtilizationInsightTypeConfigs.update`, `recommender.resourcemanagerProjectUtilizationInsights.get`, `recommender.resourcemanagerProjectUtilizationInsights.list`, `recommender.resourcemanagerProjectUtilizationInsights.update`, `recommender.resourcemanagerProjectUtilizationRecommendations.get`, `recommender.resourcemanagerProjectUtilizationRecommendations.list`, `recommender.resourcemanagerProjectUtilizationRecommendations.update`, `recommender.resourcemanagerProjectUtilizationRecommenderConfigs.get`, `recommender.resourcemanagerProjectUtilizationRecommenderConfigs.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Project Utilization Recommender Viewer (`roles/recommender.projectUtilViewer`)

- Viewer of Project Utilization insights and recommendations.
- Permissions (8): `recommender.resourcemanagerProjectUtilizationInsightTypeConfigs.get`, `recommender.resourcemanagerProjectUtilizationInsights.get`, `recommender.resourcemanagerProjectUtilizationInsights.list`, `recommender.resourcemanagerProjectUtilizationRecommendations.get`, `recommender.resourcemanagerProjectUtilizationRecommendations.list`, `recommender.resourcemanagerProjectUtilizationRecommenderConfigs.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### RecentChange RecommenderConfig Admin (`roles/recommender.recentChangeConfigAdmin`)

- Admin of RecentChange RecommenderConfigs.
- Permissions (6): `recommender.cloudRecentChangeRecommenderConfig.get`, `recommender.cloudRecentChangeRecommenderConfig.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Recent Change Risk Recommender Admin (`roles/recommender.recentchangeriskAdmin`)

- Admin of Recent Change Risk Insights and Recommendations.
- Permissions (12): `recommender.cloudRecentChangeInsights.get`, `recommender.cloudRecentChangeInsights.list`, `recommender.cloudRecentChangeInsights.update`, `recommender.cloudRecentChangeRecommendations.get`, `recommender.cloudRecentChangeRecommendations.list`, `recommender.cloudRecentChangeRecommendations.update`, `recommender.cloudRecentChangeRecommenderConfig.get`, `recommender.cloudRecentChangeRecommenderConfig.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Recent Change Risk Recommender Viewer (`roles/recommender.recentchangeriskViewer`)

- Viewer of Recent Change Risk Insights and Recommendations.
- Permissions (8): `recommender.cloudRecentChangeInsights.get`, `recommender.cloudRecentChangeInsights.list`, `recommender.cloudRecentChangeRecommendations.get`, `recommender.cloudRecentChangeRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Service Limit Recommender Admin (`roles/recommender.serviceLimitAdmin`)

- Launch stage: Beta
- Admin of Service Limit insights and recommendations.
- Permissions (8): `recommender.resourcemanagerServiceLimitInsights.get`, `recommender.resourcemanagerServiceLimitInsights.list`, `recommender.resourcemanagerServiceLimitInsights.update`, `recommender.resourcemanagerServiceLimitRecommendations.get`, `recommender.resourcemanagerServiceLimitRecommendations.list`, `recommender.resourcemanagerServiceLimitRecommendations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Service Limit Recommender Viewer (`roles/recommender.serviceLimitViewer`)

- Launch stage: Beta
- Viewer of Service Limit insights and recommendations.
- Permissions (6): `recommender.resourcemanagerServiceLimitInsights.get`, `recommender.resourcemanagerServiceLimitInsights.list`, `recommender.resourcemanagerServiceLimitRecommendations.get`, `recommender.resourcemanagerServiceLimitRecommendations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Service Account Change Risk Recommender Admin (`roles/recommender.serviceaccntchangeriskAdmin`)

- Launch stage: Beta
- Admin of Service Account Change Risk Insights and Recommendations.
- Permissions (10): `recommender.iamServiceAccountChangeRiskInsights.get`, `recommender.iamServiceAccountChangeRiskInsights.list`, `recommender.iamServiceAccountChangeRiskInsights.update`, `recommender.iamServiceAccountChangeRiskRecommendations.get`, `recommender.iamServiceAccountChangeRiskRecommendations.list`, `recommender.iamServiceAccountChangeRiskRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Service Account Change Risk Recommender Viewer (`roles/recommender.serviceaccntchangeriskViewer`)

- Launch stage: Beta
- Viewer of Service Account Change Risk Insights and Recommendations.
- Permissions (8): `recommender.iamServiceAccountChangeRiskInsights.get`, `recommender.iamServiceAccountChangeRiskInsights.list`, `recommender.iamServiceAccountChangeRiskRecommendations.get`, `recommender.iamServiceAccountChangeRiskRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Spanner Project Reliability Recommender Admin (`roles/recommender.spannerAdmin`)

- Launch stage: Beta
- Admin of Spanner Project Reliability Insights and Recommendations.
- Permissions (16): `recommender.locations.get`, `recommender.locations.list`, `recommender.spannerDatabaseSecurityInsights.get`, `recommender.spannerDatabaseSecurityInsights.list`, `recommender.spannerDatabaseSecurityInsights.update`, `recommender.spannerDatabaseSecurityRecommendations.get`, `recommender.spannerDatabaseSecurityRecommendations.list`, `recommender.spannerDatabaseSecurityRecommendations.update`, `recommender.spannerProjectReliabilityInsights.get`, `recommender.spannerProjectReliabilityInsights.list`, `recommender.spannerProjectReliabilityInsights.update`, `recommender.spannerProjectReliabilityRecommendations.get`, `recommender.spannerProjectReliabilityRecommendations.list`, `recommender.spannerProjectReliabilityRecommendations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Spanner Project Reliability Recommender Viewer (`roles/recommender.spannerViewer`)

- Launch stage: Beta
- Viewer of Spanner Project Reliability Insights and Recommendations.
- Permissions (12): `recommender.locations.get`, `recommender.locations.list`, `recommender.spannerDatabaseSecurityInsights.get`, `recommender.spannerDatabaseSecurityInsights.list`, `recommender.spannerDatabaseSecurityRecommendations.get`, `recommender.spannerDatabaseSecurityRecommendations.list`, `recommender.spannerProjectReliabilityInsights.get`, `recommender.spannerProjectReliabilityInsights.list`, `recommender.spannerProjectReliabilityRecommendations.get`, `recommender.spannerProjectReliabilityRecommendations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Spend Based Commitment Recommender Admin (`roles/recommender.ucsAdmin`)

- Launch stage: Beta
- Admin of Spend Based Commitment Recommender.
- Permissions (12): `billing.accounts.get`, `billing.accounts.list`, `recommender.locations.get`, `recommender.locations.list`, `recommender.spendBasedCommitmentInsights.get`, `recommender.spendBasedCommitmentInsights.list`, `recommender.spendBasedCommitmentInsights.update`, `recommender.spendBasedCommitmentRecommendations.get`, `recommender.spendBasedCommitmentRecommendations.list`, `recommender.spendBasedCommitmentRecommendations.update`, `recommender.spendBasedCommitmentRecommenderConfig.get`, `recommender.spendBasedCommitmentRecommenderConfig.update`

#### Spend Based Commitment Recommender Viewer (`roles/recommender.ucsViewer`)

- Launch stage: Beta
- Viewer of Spend Based Commitment Recommender.
- Permissions (9): `billing.accounts.get`, `billing.accounts.list`, `recommender.locations.get`, `recommender.locations.list`, `recommender.spendBasedCommitmentInsights.get`, `recommender.spendBasedCommitmentInsights.list`, `recommender.spendBasedCommitmentRecommendations.get`, `recommender.spendBasedCommitmentRecommendations.list`, `recommender.spendBasedCommitmentRecommenderConfig.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/recommender.iamViewer"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `recommender.alloydbClusterPerformanceInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/alloydb.editor`, `roles/alloydb.viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbClusterPerformanceInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/alloydb.editor`, `roles/alloydb.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbClusterPerformanceInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/alloydb.admin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/iam.databasesAdmin`, `roles/recommender.alloydbAdmin` |
| `recommender.alloydbClusterPerformanceRecommendations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/alloydb.editor`, `roles/alloydb.viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbClusterPerformanceRecommendations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/alloydb.editor`, `roles/alloydb.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbClusterPerformanceRecommendations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/alloydb.admin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/iam.databasesAdmin`, `roles/recommender.alloydbAdmin` |
| `recommender.alloydbClusterReliabilityInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/alloydb.editor`, `roles/alloydb.viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbClusterReliabilityInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/alloydb.editor`, `roles/alloydb.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbClusterReliabilityInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/alloydb.admin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/iam.databasesAdmin`, `roles/recommender.alloydbAdmin` |
| `recommender.alloydbClusterReliabilityRecommendations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/alloydb.editor`, `roles/alloydb.viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbClusterReliabilityRecommendations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/alloydb.editor`, `roles/alloydb.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbClusterReliabilityRecommendations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/alloydb.admin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/iam.databasesAdmin`, `roles/recommender.alloydbAdmin` |
| `recommender.alloydbInstanceSecurityInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.databasesAdmin`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbInstanceSecurityInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbInstanceSecurityInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/alloydb.admin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/iam.databasesAdmin`, `roles/recommender.alloydbAdmin` |
| `recommender.alloydbInstanceSecurityRecommendations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.databasesAdmin`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbInstanceSecurityRecommendations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.alloydbAdmin`, `roles/recommender.alloydbViewer` |
| `recommender.alloydbInstanceSecurityRecommendations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/alloydb.admin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/iam.databasesAdmin`, `roles/recommender.alloydbAdmin` |
| `recommender.appengineVersionCostInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.appAdmin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/appengine.appViewer`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.appengineversioncostAdmin`, `roles/recommender.appengineversioncostViewer` (+1 service agent role) |
| `recommender.appengineVersionCostInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.appAdmin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/appengine.appViewer`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.appengineversioncostAdmin`, `roles/recommender.appengineversioncostViewer` (+1 service agent role) |
| `recommender.appengineVersionCostInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.appAdmin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/recommender.appengineversioncostAdmin` (+1 service agent role) |
| `recommender.appengineVersionCostRecommendations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.appAdmin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/appengine.appViewer`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.appengineversioncostAdmin`, `roles/recommender.appengineversioncostViewer` (+1 service agent role) |
| `recommender.appengineVersionCostRecommendations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.appAdmin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/appengine.appViewer`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.appengineversioncostAdmin`, `roles/recommender.appengineversioncostViewer` (+1 service agent role) |
| `recommender.appengineVersionCostRecommendations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.appAdmin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/recommender.appengineversioncostAdmin` (+1 service agent role) |
| `recommender.bigqueryCapacityCommitmentsInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.resourceAdmin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.bigQueryCapacityCommitmentsAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountViewer`, `roles/recommender.bigQueryCapacityCommitmentsProjectAdmin`, `roles/recommender.bigQueryCapacityCommitmentsProjectViewer`, `roles/recommender.bigQueryCapacityCommitmentsViewer` |
| `recommender.bigqueryCapacityCommitmentsInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.resourceAdmin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.bigQueryCapacityCommitmentsAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountViewer`, `roles/recommender.bigQueryCapacityCommitmentsProjectAdmin`, `roles/recommender.bigQueryCapacityCommitmentsProjectViewer`, `roles/recommender.bigQueryCapacityCommitmentsViewer` |
| `recommender.bigqueryCapacityCommitmentsInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquery.resourceAdmin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.bigQueryCapacityCommitmentsAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountAdmin`, `roles/recommender.bigQueryCapacityCommitmentsProjectAdmin` |
| `recommender.bigqueryCapacityCommitmentsRecommendations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.resourceAdmin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.bigQueryCapacityCommitmentsAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountViewer`, `roles/recommender.bigQueryCapacityCommitmentsProjectAdmin`, `roles/recommender.bigQueryCapacityCommitmentsProjectViewer`, `roles/recommender.bigQueryCapacityCommitmentsViewer` |
| `recommender.bigqueryCapacityCommitmentsRecommendations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquery.resourceAdmin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.bigQueryCapacityCommitmentsAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountViewer`, `roles/recommender.bigQueryCapacityCommitmentsProjectAdmin`, `roles/recommender.bigQueryCapacityCommitmentsProjectViewer`, `roles/recommender.bigQueryCapacityCommitmentsViewer` |
| `recommender.bigqueryCapacityCommitmentsRecommendations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquery.resourceAdmin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.bigQueryCapacityCommitmentsAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountAdmin`, `roles/recommender.bigQueryCapacityCommitmentsProjectAdmin` |
| `recommender.bigqueryMaterializedViewInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.bigqueryMaterializedViewAdmin`, `roles/recommender.bigqueryMaterializedViewViewer` |
| `recommender.bigqueryMaterializedViewInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.bigqueryMaterializedViewAdmin`, `roles/recommender.bigqueryMaterializedViewViewer` |
| `recommender.bigqueryMaterializedViewInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.bigqueryMaterializedViewAdmin` |
| `recommender.bigqueryMaterializedViewRecommendations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.bigqueryMaterializedViewAdmin`, `roles/recommender.bigqueryMaterializedViewViewer` |
| `recommender.bigqueryMaterializedViewRecommendations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.bigqueryMaterializedViewAdmin`, `roles/recommender.bigqueryMaterializedViewViewer` |
| `recommender.bigqueryMaterializedViewRecommendations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.bigqueryMaterializedViewAdmin` |
| `recommender.bigqueryPartitionClusterRecommendations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.bigqueryPartitionClusterAdmin`, `roles/recommender.bigqueryPartitionClusterViewer` |
| `recommender.bigqueryPartitionClusterRecommendations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.bigqueryPartitionClusterAdmin`, `roles/recommender.bigqueryPartitionClusterViewer` |
| `recommender.bigqueryPartitionClusterRecommendations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.bigqueryPartitionClusterAdmin` |
| `recommender.bigqueryTableStatsInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.bigqueryPartitionClusterAdmin`, `roles/recommender.bigqueryPartitionClusterViewer` |
| `recommender.bigqueryTableStatsInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.bigqueryPartitionClusterAdmin`, `roles/recommender.bigqueryPartitionClusterViewer` |
| `recommender.bigqueryTableStatsInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.bigqueryPartitionClusterAdmin` |
| `recommender.bigtableClusterPerformanceInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.bigtableClusterPerformanceAdmin`, `roles/recommender.bigtableClusterPerformanceViewer` |
| `recommender.bigtableClusterPerformanceInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.bigtableClusterPerformanceAdmin`, `roles/recommender.bigtableClusterPerformanceViewer` |
| `recommender.bigtableClusterPerformanceInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.bigtableClusterPerformanceAdmin` |
| `recommender.bigtableClusterPerformanceRecommendations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.bigtableClusterPerformanceAdmin`, `roles/recommender.bigtableClusterPerformanceViewer` |
| `recommender.bigtableClusterPerformanceRecommendations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.bigtableClusterPerformanceAdmin`, `roles/recommender.bigtableClusterPerformanceViewer` |
| `recommender.bigtableClusterPerformanceRecommendations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.bigtableClusterPerformanceAdmin` |
| `recommender.cloudAssetInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudasset.admin`, `roles/cloudasset.editor`, `roles/cloudasset.viewer`, `roles/geminicloudassist.investigationOwner`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudasset.owner`, `roles/cloudhub.operator`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/geminicloudassist.investigationAdmin`, `roles/geminicloudassist.investigationCreator`, `roles/geminicloudassist.investigationEditor`, `roles/geminicloudassist.investigationUser`, `roles/geminicloudassist.investigationViewer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/recommender.cloudAssetInsightsAdmin`, `roles/recommender.cloudAssetInsightsViewer` (+6 service agent roles) |
| `recommender.cloudAssetInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudasset.admin`, `roles/cloudasset.editor`, `roles/cloudasset.viewer`, `roles/geminicloudassist.investigationOwner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudasset.owner`, `roles/cloudhub.operator`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/geminicloudassist.investigationAdmin`, `roles/geminicloudassist.investigationCreator`, `roles/geminicloudassist.investigationEditor`, `roles/geminicloudassist.investigationUser`, `roles/geminicloudassist.investigationViewer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/recommender.cloudAssetInsightsAdmin`, `roles/recommender.cloudAssetInsightsViewer` (+6 service agent roles) |
| `recommender.cloudAssetInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/cloudasset.owner`, `roles/recommender.cloudAssetInsightsAdmin` |
| `recommender.cloudCostGeneralInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.cloudCostRecommendationAdmin`, `roles/recommender.cloudCostRecommendationViewer` |
| `recommender.cloudCostGeneralInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.cloudCostRecommendationAdmin`, `roles/recommender.cloudCostRecommendationViewer` |
| `recommender.cloudCostGeneralInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.cloudCostRecommendationAdmin` |
| `recommender.cloudCostGeneralRecommendations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.cloudCostRecommendationAdmin`, `roles/recommender.cloudCostRecommendationViewer` |
| `recommender.cloudCostGeneralRecommendations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.cloudCostRecommendationAdmin`, `roles/recommender.cloudCostRecommendationViewer` |
| `recommender.cloudCostGeneralRecommendations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.cloudCostRecommendationAdmin` |
| `recommender.cloudDeprecationGeneralInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.cloudDeprecationRecommendationAdmin`, `roles/recommender.cloudDeprecationRecommendationViewer` |
| `recommender.cloudDeprecationGeneralInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.cloudDeprecationRecommendationAdmin`, `roles/recommender.cloudDeprecationRecommendationViewer` |
| `recommender.cloudDeprecationGeneralInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.cloudDeprecationRecommendationAdmin` |
| `recommender.cloudDeprecationGeneralRecommendations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser`, `roles/recommender.cloudDeprecationRecommendationAdmin`, `roles/recommender.cloudDeprecationRecommendationViewer` |
| `recommender.cloudDeprecationGeneralRecommendations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/recommender.cloudDeprecationRecommendationAdmin`, `roles/recommender.cloudDeprecationRecommendationViewer` |
| `recommender.cloudDeprecationGeneralRecommendations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.cloudDeprecationRecommendationAdmin` |
| `recommender.cloudFunctionsPerformanceInsights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/cloudfunctions.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudfunctions.developer`, `roles/cloudhub.operator`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `recommender.cloudFunctionsPerformanceInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/cloudfunctions.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/recommender.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudfunctions.developer`, `roles/cloudhub.operator`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `recommender.cloudFunctionsPerformanceInsights.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/firebase.admin`, `roles/recommender.admin`, `roles/recommender.editor`, `roles/cloudfunctions.developer`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.devOps` |

## Notes

- Roles and permissions of the `recommender` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/recommender (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
