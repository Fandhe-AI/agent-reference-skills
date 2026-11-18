---
source: https://docs.cloud.google.com/vpc-service-controls/docs/restricted-vip-services
---

# Services supported by the restricted VIP

The restricted Virtual IP (VIP) with Private Google Access provides a private network route for requests to Google Cloud services without exposing them to the internet. It supports all APIs that VPC Service Controls can protect, plus several additional services as dependencies.

## Signature / Usage

The restricted VIP is reached by mapping `*.googleapis.com` to `restricted.googleapis.com` (`199.36.153.4/30`) in DNS. For a VPC network that uses the restricted VIP, VPC accessible services limit which of the supported services it can reach (example from the VPC accessible services page):

```bash
gcloud access-context-manager perimeters update my-authorized-perimeter \
  --enable-vpc-accessible-services \
  --add-vpc-allowed-services=storage.googleapis.com
```

## Options / Props

### Support stages

| Stage | Meaning |
|-------|---------|
| GA | Fully supported by the restricted VIP and can be protected by VPC Service Controls perimeters. |
| Beta | Beta-stage level of support for the restricted VIP; can be protected by perimeters. |
| Alpha | Alpha-stage level of support; can be protected by perimeters for testing purposes only. |
| Restricted VIP only | Integrated with the restricted VIP to support other services and resources inside a perimeter. Cannot be added to a perimeter as a protected service. |
| Other | Service has not yet been assigned a support stage. |

### Services

| Support stage | Services |
|---------------|----------|
| Restricted VIP only | `discovery.googleapis.com`, `oauth2.googleapis.com`, `openidconnect.googleapis.com`, `reauth.googleapis.com` |
| GA | `accessapproval.googleapis.com`, `accesscontextintelligence.googleapis.com`, `addressvalidation.googleapis.com`, `agentregistry.googleapis.com`, `aiplatform.googleapis.com`, `alloydb.googleapis.com`, `analyticshub.googleapis.com`, `apigee.googleapis.com`, `apigeeconnect.googleapis.com`, `apihub.googleapis.com`, `apikeys.googleapis.com`, `apphub.googleapis.com`, `apptopology.googleapis.com`, `artifactregistry.googleapis.com`, `assuredoss.googleapis.com`, `auditmanager.googleapis.com`, `automl.googleapis.com`, `autoscaling.googleapis.com`, `backupdr.googleapis.com`, `baremetalsolution.googleapis.com`, `batch.googleapis.com`, `beyondcorp.googleapis.com`, `biglake.googleapis.com`, `bigquery.googleapis.com`, `bigquerydatapolicy.googleapis.com`, `bigquerydatatransfer.googleapis.com`, `bigquerymigration.googleapis.com`, `bigtable.googleapis.com`, `binaryauthorization.googleapis.com`, `blockchainnodeengine.googleapis.com`, `certificatemanager.googleapis.com`, `ces.googleapis.com`, `chronicle.googleapis.com`, `chronicleservicemanager.googleapis.com`, `cloud.googleapis.com`, `cloudaicompanion.googleapis.com`, `cloudasset.googleapis.com`, `cloudbuild.googleapis.com`, `cloudcontrolspartner.googleapis.com`, `clouddeploy.googleapis.com`, `clouderrorreporting.googleapis.com`, `cloudfunctions.googleapis.com`, `cloudkms.googleapis.com`, `cloudprofiler.googleapis.com`, `cloudquotas.googleapis.com`, `cloudscheduler.googleapis.com`, `cloudsearch.googleapis.com`, `cloudtasks.googleapis.com`, `cloudtrace.googleapis.com`, `commerceorggovernance.googleapis.com`, `composer.googleapis.com`, `compute.googleapis.com`, `confidentialcomputing.googleapis.com`, `config.googleapis.com`, `configdelivery.googleapis.com`, `connectgateway.googleapis.com`, `connectors.googleapis.com`, `contactcenteraiplatform.googleapis.com`, `contactcenterinsights.googleapis.com`, `container.googleapis.com`, `containeranalysis.googleapis.com`, `containerfilesystem.googleapis.com`, `containerregistry.googleapis.com`, `containersecurity.googleapis.com`, `containerthreatdetection.googleapis.com`, `contentwarehouse.googleapis.com`, `databasecenter.googleapis.com`, `databaseinsights.googleapis.com`, `datacatalog.googleapis.com`, `dataflow.googleapis.com`, `dataform.googleapis.com`, `datafusion.googleapis.com`, `datalineage.googleapis.com`, `datamigration.googleapis.com`, `datapipelines.googleapis.com`, `dataplex.googleapis.com`, `dataproc.googleapis.com`, `datastream.googleapis.com`, `developerconnect.googleapis.com`, `discoveryengine.googleapis.com`, `dlp.googleapis.com`, `dns.googleapis.com`, `documentai.googleapis.com`, `earthengine.googleapis.com`, `edgecontainer.googleapis.com`, `edgenetwork.googleapis.com`, `essentialcontacts.googleapis.com`, `eventarc.googleapis.com`, `eventarcpublishing.googleapis.com`, `file.googleapis.com`, `financialservices.googleapis.com`, `firebaseappcheck.googleapis.com`, `firebaseapphosting.googleapis.com`, `firebasedataconnect.googleapis.com`, `firebaserules.googleapis.com`, `firebasevertexai.googleapis.com`, `firestore.googleapis.com`, `fpnv.googleapis.com`, `gameservices.googleapis.com`, `geminidataanalytics.googleapis.com`, `gkebackup.googleapis.com`, `gkeconnect.googleapis.com`, `gkehub.googleapis.com`, `gkemulticloud.googleapis.com`, `gkeonprem.googleapis.com`, `healthcare.googleapis.com`, `hypercomputecluster.googleapis.com`, `iamcredentials.googleapis.com`, `iap.googleapis.com`, `iaptunnel.googleapis.com`, `identitytoolkit.googleapis.com`, `ids.googleapis.com`, `integrations.googleapis.com`, `kmsinventory.googleapis.com`, `krmapihosting.googleapis.com`, `kubernetesmetadata.googleapis.com`, `language.googleapis.com`, `licensemanager.googleapis.com`, `livestream.googleapis.com`, `logging.googleapis.com`, `looker.googleapis.com`, `lustre.googleapis.com`, `maintenance.googleapis.com`, `managedidentities.googleapis.com`, `managedkafka.googleapis.com`, `memcache.googleapis.com`, `memorystore.googleapis.com`, `meshca.googleapis.com`, `meshconfig.googleapis.com`, `metastore.googleapis.com`, `microservices.googleapis.com`, `migrationcenter.googleapis.com`, `ml.googleapis.com`, `modelarmor.googleapis.com`, `monitoring.googleapis.com`, `netapp.googleapis.com`, `networkconnectivity.googleapis.com`, `networkmanagement.googleapis.com`, `networksecurity.googleapis.com`, `networkservices.googleapis.com`, `notebooks.googleapis.com`, `ondemandscanning.googleapis.com`, `opsconfigmonitoring.googleapis.com`, `oracledatabase.googleapis.com`, `orgpolicy.googleapis.com`, `osconfig.googleapis.com`, `oslogin.googleapis.com`, `parallelstore.googleapis.com`, `parametermanager.googleapis.com`, `policysimulator.googleapis.com`, `policytroubleshooter.googleapis.com`, `privateca.googleapis.com`, `privilegedaccessmanager.googleapis.com`, `publicca.googleapis.com`, `pubsub.googleapis.com`, `pubsublite.googleapis.com`, `rapidmigrationassessment.googleapis.com`, `recaptchaenterprise.googleapis.com`, `recommender.googleapis.com`, `redis.googleapis.com`, `run.googleapis.com`, `secretmanager.googleapis.com`, `securesourcemanager.googleapis.com`, `securetoken.googleapis.com`, `securitycenter.googleapis.com`, `securitycentermanagement.googleapis.com`, `servicecontrol.googleapis.com`, `servicedirectory.googleapis.com`, `servicehealth.googleapis.com`, `servicenetworking.googleapis.com`, `serviceusage.googleapis.com`, `spanner.googleapis.com`, `speakerid.googleapis.com`, `speech.googleapis.com`, `sqladmin.googleapis.com`, `ssh-serialport.googleapis.com`, `storage.googleapis.com`, `storagebatchoperations.googleapis.com`, `storageinsights.googleapis.com`, `storagetransfer.googleapis.com`, `sts.googleapis.com`, `telemetry.googleapis.com`, `texttospeech.googleapis.com`, `timeseriesinsights.googleapis.com`, `tpu.googleapis.com`, `trafficdirector.googleapis.com`, `transcoder.googleapis.com`, `translate.googleapis.com`, `vectorsearch.googleapis.com`, `videointelligence.googleapis.com`, `videostitcher.googleapis.com`, `vision.googleapis.com`, `visualinspection.googleapis.com`, `vmmigration.googleapis.com`, `vmwareengine.googleapis.com`, `vpcaccess.googleapis.com`, `webrisk.googleapis.com`, `websecurityscanner.googleapis.com`, `workflows.googleapis.com`, `workloadmanager.googleapis.com`, `workstations.googleapis.com` |
| Beta support | `adsdatahub.googleapis.com`, `assuredworkloads.googleapis.com`, `businessaicode.googleapis.com`, `cloudcode.googleapis.com`, `cloudlocationfinder.googleapis.com`, `cloudresourcemanager.googleapis.com`, `cloudsecuritycompliance.googleapis.com`, `cloudsupport.googleapis.com`, `designcenter.googleapis.com`, `dialogflow.googleapis.com`, `domains.googleapis.com`, `firebasecrashlytics.googleapis.com`, `geminicloudassist.googleapis.com`, `geocoding-backend.googleapis.com`, `iam.googleapis.com`, `lifesciences.googleapis.com`, `places.googleapis.com`, `retail.googleapis.com`, `saasservicemgmt.googleapis.com`, `seclm.googleapis.com`, `visionai.googleapis.com`, `workloadidentity.googleapis.com` |

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/docs/restricted-vip-services (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/vpc-service-controls/docs/vpc-accessible-services. It updates the enforced perimeter configuration and needs an access policy (`--policy` or the `access_context_manager/policy` property).
- `perimeters update` is disruptive: requests from the VPC network to services not in the allowed list are denied as soon as the change propagates. Test with `gcloud access-context-manager perimeters dry-run update` (same flags) and try it on a disposable perimeter first.
- The service list is not exhaustive. The restricted VIP also includes additional endpoints as dependencies of the listed ones; for example, Container Registry uses `gcr.io` and `*.gcr.io`.
- For GKE Container Registry DNS setup, see the source's "Setting up Container Registry for GKE private clusters" page; GKE itself is in the `gcp-gke` skill.
- The support stage refers to the level of support the integration of the service with the restricted VIP receives, not the launch stage of the service.
- Services listed as "Beta support" are marked by the source with that exact label (not "Beta"). No service in the table has the Alpha or Other stage.

## Related

- [private-connectivity.md](./private-connectivity.md)
- [vpc-accessible-services.md](./vpc-accessible-services.md)
- [service-perimeters.md](./service-perimeters.md)
