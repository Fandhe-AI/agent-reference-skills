---
source: https://securesourcemanager.googleapis.com/$discovery/rest?version=v1
---

# Secure Source Manager API message schemas (securesourcemanager)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/securesourcemanager/`.

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `BatchCreatePullRequestCommentsRequest`

- The request to batch create pull request comments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requests` | array<CreatePullRequestCommentRequest> | Required. The request message specifying the resources to create. There should be exactly one CreatePullRequestCommentRequest with CommentDetail being REVIEW in the list, and no more than 100 CreatePullRequestCommentRequests with CommentDetail being CODE in the list |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `Branch`

- Branch represents a branch involved in a pull request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ref` | string | Required. Name of the branch. |
| `sha` | string | Output only. The commit at the tip of the branch. |

### `BranchRule`

- Metadata of a BranchRule. BranchRule is the protection rule to enforce pre-defined rules on designated branches within a repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowStaleReviews` | boolean | Optional. Determines if allow stale reviews or approvals before merging to the branch. |
| `annotations` | object | Optional. User annotations. These attributes can only be set and used by the user. See https://google.aip.dev/128#annotations for more details such as format and size limitations. |
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `disabled` | boolean | Optional. Determines if the branch rule is disabled or not. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `includePattern` | string | Optional. The pattern of the branch that can match to this BranchRule. Specified as regex. .\* for all branches. Examples: main, (main\|release.\*). Current MVP phase only support `.*` for wildcard. |
| `minimumApprovalsCount` | integer (int32) | Optional. The minimum number of approvals required for the branch rule to be matched. |
| `minimumReviewsCount` | integer (int32) | Optional. The minimum number of reviews required for the branch rule to be matched. |
| `name` | string | Optional. A unique identifier for a BranchRule. The name should be of the format: `projects/{project}/locations/{location}/repositories/{repository}/branchRules/{branch_rule}` |
| `requireCommentsResolved` | boolean | Optional. Determines if require comments resolved before merging to the branch. |
| `requireLinearHistory` | boolean | Optional. Determines if require linear history before merging to the branch. |
| `requirePullRequest` | boolean | Optional. Determines if the branch rule requires a pull request or not. |
| `requiredStatusChecks` | array<Check> | Optional. List of required status checks before merging to the branch. |
| `uid` | string | Output only. Unique identifier of the repository. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `Check`

- Check is a type for status check.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `context` | string | Required. The context of the check. |

### `CloseIssueRequest`

- The request to close an issue.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The current etag of the issue. If the etag is provided and does not match the current etag of the issue, closing will be blocked and an ABORTED error will be returned. |

### `ClosePullRequestRequest`

- ClosePullRequestRequest is the request to close a pull request.
- Version: v1

### `Code`

- The comment on a code line.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | string | Required. The comment body. |
| `effectiveCommitSha` | string | Output only. The effective commit sha this code comment is pointing to. |
| `effectiveRootComment` | string | Output only. The root comment of the conversation, derived from the reply field. |
| `position` | Position | Optional. The position of the comment. |
| `reply` | string | Optional. Input only. The PullRequestComment resource name that this comment is replying to. |
| `resolved` | boolean | Output only. Boolean indicator if the comment is resolved. |

### `Comment`

- The general pull request comment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | string | Required. The comment body. |

### `CreatePullRequestCommentRequest`

- The request to create a pull request comment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parent` | string | Required. The pull request in which to create the pull request comment. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` |
| `pullRequestComment` | PullRequestComment | Required. The pull request comment to create. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FetchBlobResponse`

- Response message containing the content of a blob.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | The content of the blob, encoded as base64. |
| `sha` | string | The SHA-1 hash of the blob. |

### `FetchTreeResponse`

- Response message containing a list of TreeEntry objects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `treeEntries` | array<TreeEntry> | The list of TreeEntry objects. |

### `FileDiff`

- Metadata of a FileDiff. FileDiff represents a single file diff in a pull request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Output only. The action taken on the file (eg. added, modified, deleted). Values: `ACTION_UNSPECIFIED`, `ADDED`, `MODIFIED`, `DELETED`. |
| `name` | string | Output only. The name of the file. |
| `patch` | string | Output only. The git patch containing the file changes. |
| `sha` | string | Output only. The commit pointing to the file changes. |

### `Hook`

- Metadata of a Secure Source Manager Hook.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `disabled` | boolean | Optional. Determines if the hook disabled or not. Set to true to stop sending traffic. |
| `events` | array<string> | Optional. The events that trigger hook on. Values: `UNSPECIFIED`, `PUSH`, `PULL_REQUEST`. |
| `name` | string | Identifier. A unique identifier for a Hook. The name should be of the format: `projects/{project}/locations/{location_id}/repositories/{repository_id}/hooks/{hook_id}` |
| `pushOption` | PushOption | Optional. The trigger option for push events. |
| `sensitiveQueryString` | string | Optional. The sensitive query string to be appended to the target URI. |
| `targetUri` | string | Required. The target URI to which the payloads will be delivered. |
| `uid` | string | Output only. Unique identifier of the hook. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |

### `HostConfig`

- HostConfig has different instance endpoints.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `api` | string | Output only. API hostname. |
| `gitHttp` | string | Output only. Git HTTP hostname. |
| `gitSsh` | string | Output only. Git SSH hostname. |
| `html` | string | Output only. HTML hostname. |

### `InitialConfig`

- Repository initialization configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultBranch` | string | Default branch name of the repository. |
| `gitignores` | array<string> | List of gitignore template names user can choose from. Valid values: actionscript, ada, agda, android, anjuta, ansible, appcelerator-titanium, app-engine, archives, arch-linux-packages, atmel-studio, autotools, backup, bazaar, bazel, bitrix, bricx-cc, c, cake-php, calabash, cf-wheels, chef-cookbook, clojure, cloud9, c-make, code-igniter, code-kit, code-sniffer, common-lisp, composer, concrete5, coq, cordova, cpp, craft-cms, cuda, cvs, d, dart, dart-editor, delphi, diff, dm, dreamweaver, dropbox, drupal, drupal-7, eagle, eclipse, eiffel-studio, elisp, elixir, elm, emacs, ensime, epi-server, erlang, esp-idf, espresso, exercism, expression-engine, ext-js, fancy, finale, flex-builder, force-dot-com, fortran, fuel-php, gcov, git-book, gnome-shell-extension, go, godot, gpg, gradle, grails, gwt, haskell, hugo, iar-ewarm, idris, igor-pro, images, infor-cms, java, jboss, jboss-4, jboss-6, jdeveloper, jekyll, jenkins-home, jenv, jet-brains, jigsaw, joomla, julia, jupyter-notebooks, kate, kdevelop4, kentico, ki-cad, kohana, kotlin, lab-view, laravel, lazarus, leiningen, lemon-stand, libre-office, lilypond, linux, lithium, logtalk, lua, lyx, mac-os, magento, magento-1, magento-2, matlab, maven, mercurial, mercury, metals, meta-programming-system, meteor, microsoft-office, model-sim, momentics, mono-develop, nanoc, net-beans, nikola, nim, ninja, node, notepad-pp, nwjs, objective--c, ocaml, octave, opa, open-cart, openssl, oracle-forms, otto, packer, patch, perl, perl6, phalcon, phoenix, pimcore, play-framework, plone, prestashop, processing, psoc-creator, puppet, pure-script, putty, python, qooxdoo, qt, r, racket, rails, raku, red, redcar, redis, rhodes-rhomobile, ros, ruby, rust, sam, sass, sbt, scala, scheme, scons, scrivener, sdcc, seam-gen, sketch-up, slick-edit, smalltalk, snap, splunk, stata, stella, sublime-text, sugar-crm, svn, swift, symfony, symphony-cms, synopsys-vcs, tags, terraform, tex, text-mate, textpattern, think-php, tortoise-git, turbo-gears-2, typo3, umbraco, unity, unreal-engine, vagrant, vim, virtual-env, virtuoso, visual-studio, visual-studio-code, vue, vvvv, waf, web-methods, windows, word-press, xcode, xilinx, xilinx-ise, xojo, yeoman, yii, zend-framework, zephir. |
| `license` | string | License template name user can choose from. Valid values: license-0bsd, license-389-exception, aal, abstyles, adobe-2006, adobe-glyph, adsl, afl-1-1, afl-1-2, afl-2-0, afl-2-1, afl-3-0, afmparse, agpl-1-0, agpl-1-0-only, agpl-1-0-or-later, agpl-3-0-only, agpl-3-0-or-later, aladdin, amdplpa, aml, ampas, antlr-pd, antlr-pd-fallback, apache-1-0, apache-1-1, apache-2-0, apafml, apl-1-0, apsl-1-0, apsl-1-1, apsl-1-2, apsl-2-0, artistic-1-0, artistic-1-0-cl8, artistic-1-0-perl, artistic-2-0, autoconf-exception-2-0, autoconf-exception-3-0, bahyph, barr, beerware, bison-exception-2-2, bittorrent-1-0, bittorrent-1-1, blessing, blueoak-1-0-0, bootloader-exception, borceux, bsd-1-clause, bsd-2-clause, bsd-2-clause-freebsd, bsd-2-clause-netbsd, bsd-2-clause-patent, bsd-2-clause-views, bsd-3-clause, bsd-3-clause-attribution, bsd-3-clause-clear, bsd-3-clause-lbnl, bsd-3-clause-modification, bsd-3-clause-no-nuclear-license, bsd-3-clause-no-nuclear-license-2014, bsd-3-clause-no-nuclear-warranty, bsd-3-clause-open-mpi, bsd-4-clause, bsd-4-clause-shortened, bsd-4-clause-uc, bsd-protection, bsd-source-code, bsl-1-0, busl-1-1, cal-1-0, cal-1-0-combined-work-exception, caldera, catosl-1-1, cc0-1-0, cc-by-1-0, cc-by-2-0, cc-by-3-0, cc-by-3-0-at, cc-by-3-0-us, cc-by-4-0, cc-by-nc-1-0, cc-by-nc-2-0, cc-by-nc-3-0, cc-by-nc-4-0, cc-by-nc-nd-1-0, cc-by-nc-nd-2-0, cc-by-nc-nd-3-0, cc-by-nc-nd-3-0-igo, cc-by-nc-nd-4-0, cc-by-nc-sa-1-0, cc-by-nc-sa-2-0, cc-by-nc-sa-3-0, cc-by-nc-sa-4-0, cc-by-nd-1-0, cc-by-nd-2-0, cc-by-nd-3-0, cc-by-nd-4-0, cc-by-sa-1-0, cc-by-sa-2-0, cc-by-sa-2-0-uk, cc-by-sa-2-1-jp, cc-by-sa-3-0, cc-by-sa-3-0-at, cc-by-sa-4-0, cc-pddc, cddl-1-0, cddl-1-1, cdla-permissive-1-0, cdla-sharing-1-0, cecill-1-0, cecill-1-1, cecill-2-0, cecill-2-1, cecill-b, cecill-c, cern-ohl-1-1, cern-ohl-1-2, cern-ohl-p-2-0, cern-ohl-s-2-0, cern-ohl-w-2-0, clartistic, classpath-exception-2-0, clisp-exception-2-0, cnri-jython, cnri-python, cnri-python-gpl-compatible, condor-1-1, copyleft-next-0-3-0, copyleft-next-0-3-1, cpal-1-0, cpl-1-0, cpol-1-02, crossword, crystal-stacker, cua-opl-1-0, cube, c-uda-1-0, curl, d-fsl-1-0, diffmark, digirule-foss-exception, doc, dotseqn, drl-1-0, dsdp, dvipdfm, ecl-1-0, ecl-2-0, ecos-exception-2-0, efl-1-0, efl-2-0, egenix, entessa, epics, epl-1-0, epl-2-0, erlpl-1-1, etalab-2-0, eu-datagrid, eupl-1-0, eupl-1-1, eupl-1-2, eurosym, fair, fawkes-runtime-exception, fltk-exception, font-exception-2-0, frameworx-1-0, freebsd-doc, freeimage, freertos-exception-2-0, fsfap, fsful, fsfullr, ftl, gcc-exception-2-0, gcc-exception-3-1, gd, gfdl-1-1-invariants-only, gfdl-1-1-invariants-or-later, gfdl-1-1-no-invariants-only, gfdl-1-1-no-invariants-or-later, gfdl-1-1-only, gfdl-1-1-or-later, gfdl-1-2-invariants-only, gfdl-1-2-invariants-or-later, gfdl-1-2-no-invariants-only, gfdl-1-2-no-invariants-or-later, gfdl-1-2-only, gfdl-1-2-or-later, gfdl-1-3-invariants-only, gfdl-1-3-invariants-or-later, gfdl-1-3-no-invariants-only, gfdl-1-3-no-invariants-or-later, gfdl-1-3-only, gfdl-1-3-or-later, giftware, gl2ps, glide, glulxe, glwtpl, gnu-javamail-exception, gnuplot, gpl-1-0-only, gpl-1-0-or-later, gpl-2-0-only, gpl-2-0-or-later, gpl-3-0-linking-exception, gpl-3-0-linking-source-exception, gpl-3-0-only, gpl-3-0-or-later, gpl-cc-1-0, gsoap-1-3b, haskell-report, hippocratic-2-1, hpnd, hpnd-sell-variant, htmltidy, i2p-gpl-java-exception, ibm-pibs, icu, ijg, image-magick, imatix, imlib2, info-zip, intel, intel-acpi, interbase-1-0, ipa, ipl-1-0, isc, jasper-2-0, jpnic, json, lal-1-2, lal-1-3, latex2e, leptonica, lgpl-2-0-only, lgpl-2-0-or-later, lgpl-2-1-only, lgpl-2-1-or-later, lgpl-3-0-linking-exception, lgpl-3-0-only, lgpl-3-0-or-later, lgpllr, libpng, libpng-2-0, libselinux-1-0, libtiff, libtool-exception, liliq-p-1-1, liliq-r-1-1, liliq-rplus-1-1, linux-openib, linux-syscall-note, llvm-exception, lpl-1-0, lpl-1-02, lppl-1-0, lppl-1-1, lppl-1-2, lppl-1-3a, lppl-1-3c, lzma-exception, make-index, mif-exception, miros, mit, mit-0, mit-advertising, mit-cmu, mit-enna, mit-feh, mit-modern-variant, mitnfa, mit-open-group, motosoto, mpich2, mpl-1-0, mpl-1-1, mpl-2-0, mpl-2-0-no-copyleft-exception, ms-pl, ms-rl, mtll, mulanpsl-1-0, mulanpsl-2-0, multics, mup, naist-2003, nasa-1-3, naumen, nbpl-1-0, ncgl-uk-2-0, ncsa, netcdf, net-snmp, newsletr, ngpl, nist-pd, nist-pd-fallback, nlod-1-0, nlpl, nokia, nokia-qt-exception-1-1, nosl, noweb, npl-1-0, npl-1-1, nposl-3-0, nrl, ntp, ntp-0, ocaml-lgpl-linking-exception, occt-exception-1-0, occt-pl, oclc-2-0, odbl-1-0, odc-by-1-0, ofl-1-0, ofl-1-0-no-rfn, ofl-1-0-rfn, ofl-1-1, ofl-1-1-no-rfn, ofl-1-1-rfn, ogc-1-0, ogdl-taiwan-1-0, ogl-canada-2-0, ogl-uk-1-0, ogl-uk-2-0, ogl-uk-3-0, ogtsl, oldap-1-1, oldap-1-2, oldap-1-3, oldap-1-4, oldap-2-0, oldap-2-0-1, oldap-2-1, oldap-2-2, oldap-2-2-1, oldap-2-2-2, oldap-2-3, oldap-2-4, oldap-2-7, oml, openjdk-assembly-exception-1-0, openssl, openvpn-openssl-exception, opl-1-0, oset-pl-2-1, osl-1-0, osl-1-1, osl-2-0, osl-2-1, osl-3-0, o-uda-1-0, parity-6-0-0, parity-7-0-0, pddl-1-0, php-3-0, php-3-01, plexus, polyform-noncommercial-1-0-0, polyform-small-business-1-0-0, postgresql, psf-2-0, psfrag, ps-or-pdf-font-exception-20170817, psutils, python-2-0, qhull, qpl-1-0, qt-gpl-exception-1-0, qt-lgpl-exception-1-1, qwt-exception-1-0, rdisc, rhecos-1-1, rpl-1-1, rpsl-1-0, rsa-md, rscpl, ruby, saxpath, sax-pd, scea, sendmail, sendmail-8-23, sgi-b-1-0, sgi-b-1-1, sgi-b-2-0, shl-0-51, shl-2-0, shl-2-1, simpl-2-0, sissl, sissl-1-2, sleepycat, smlnj, smppl, snia, spencer-86, spencer-94, spencer-99, spl-1-0, ssh-openssh, ssh-short, sspl-1-0, sugarcrm-1-1-3, swift-exception, swl, tapr-ohl-1-0, tcl, tcp-wrappers, tmate, torque-1-1, tosl, tu-berlin-1-0, tu-berlin-2-0, u-boot-exception-2-0, ucl-1-0, unicode-dfs-2015, unicode-dfs-2016, unicode-tou, universal-foss-exception-1-0, unlicense, upl-1-0, vim, vostrom, vsl-1-0, w3c, w3c-19980720, w3c-20150513, watcom-1-0, wsuipa, wtfpl, wxwindows-exception-3-1, x11, xerox, xfree86-1-1, xinetd, xnet, xpp, xskat, ypl-1-0, ypl-1-1, zed, zend-2-0, zimbra-1-3, zimbra-1-4, zlib, zlib-acknowledgement, zpl-1-1, zpl-2-0, zpl-2-1. |
| `readme` | string | README template name. Valid template name(s) are: default. |

### `Instance`

- A resource that represents a Secure Source Manager instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `hostConfig` | HostConfig | Output only. A list of hostnames for this instance. |
| `kmsKey` | string | Optional. Immutable. Customer-managed encryption key name, in the format projects/\*/locations/\*/keyRings/\*/cryptoKeys/\*. |
| `labels` | object | Optional. Labels as key value pairs. |
| `name` | string | Optional. A unique identifier for an instance. The name should be of the format: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` `project_number`: Maps to a unique int64 id assigned to each project. `location_id`: Refers to the region where the instance will be deployed. Since Secure Source Manager is a regional service, it must be one of the valid GCP regions. `instance_id`: User provided name for the instance, must be unique for a project_number and location_id combination. |
| `privateConfig` | PrivateConfig | Optional. Private settings for private instance. |
| `state` | string enum | Output only. Current state of the instance. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `PAUSED`, `UNKNOWN`. |
| `stateNote` | string enum | Output only. An optional field providing information about the current instance state. Values: `STATE_NOTE_UNSPECIFIED`, `PAUSED_CMEK_UNAVAILABLE`, `INSTANCE_RESUMING`. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |
| `workforceIdentityFederationConfig` | WorkforceIdentityFederationConfig | Optional. Configuration for Workforce Identity Federation to support third party identity provider. If unset, defaults to the Google OIDC IdP. |

### `Issue`

- Metadata of an Issue.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | string | Optional. Issue body. Provides a detailed description of the issue. |
| `closeTime` | string (google-datetime) | Output only. Close timestamp (if closed). Cleared when is re-opened. |
| `createTime` | string (google-datetime) | Output only. Creation timestamp. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `name` | string | Identifier. Unique identifier for an issue. The issue id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue_id}` |
| `state` | string enum | Output only. State of the issue. Values: `STATE_UNSPECIFIED`, `OPEN`, `CLOSED`. |
| `title` | string | Required. Issue title. |
| `updateTime` | string (google-datetime) | Output only. Last updated timestamp. |

### `IssueComment`

- IssueComment represents a comment on an issue.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | string | Required. The comment body. |
| `createTime` | string (google-datetime) | Output only. Creation timestamp. |
| `name` | string | Identifier. Unique identifier for an issue comment. The comment id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue}/issueComments/{comment_id}` |
| `updateTime` | string (google-datetime) | Output only. Last updated timestamp. |

### `ListBranchRulesResponse`

- ListBranchRulesResponse is the response to listing branchRules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `branchRules` | array<BranchRule> | The list of branch rules. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListHooksResponse`

- ListHooksResponse is response to list hooks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hooks` | array<Hook> | The list of hooks. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListInstancesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<Instance> | The list of instances. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListIssueCommentsResponse`

- The response to list issue comments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `issueComments` | array<IssueComment> | The list of issue comments. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListIssuesResponse`

- The response to list issues.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `issues` | array<Issue> | The list of issues. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

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

### `ListPullRequestCommentsResponse`

- The response to list pull request comments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to set as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `pullRequestComments` | array<PullRequestComment> | The list of pull request comments. |

### `ListPullRequestFileDiffsResponse`

- ListPullRequestFileDiffsResponse is the response containing file diffs returned from ListPullRequestFileDiffs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileDiffs` | array<FileDiff> | The list of pull request file diffs. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListPullRequestsResponse`

- ListPullRequestsResponse is the response to list pull requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `pullRequests` | array<PullRequest> | The list of pull requests. |

### `ListRepositoriesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `repositories` | array<Repository> | The list of repositories. |

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

### `MergePullRequestRequest`

- MergePullRequestRequest is the request to merge a pull request.
- Version: v1

### `OpenIssueRequest`

- The request to open an issue.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The current etag of the issue. If the etag is provided and does not match the current etag of the issue, opening will be blocked and an ABORTED error will be returned. |

### `OpenPullRequestRequest`

- OpenPullRequestRequest is the request to open a pull request.
- Version: v1

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
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `Position`

- The position of the code comment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `line` | string (int64) | Required. The line number of the comment. Positive value means it's on the new side of the diff, negative value means it's on the old side. |
| `path` | string | Required. The path of the file. |

### `PrivateConfig`

- PrivateConfig includes settings for private instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caPool` | string | Optional. Immutable. CA pool resource, resource must in the format of `projects/{project}/locations/{location}/caPools/{ca_pool}`. |
| `httpServiceAttachment` | string | Output only. Service Attachment for HTTP, resource is in the format of `projects/{project}/regions/{region}/serviceAttachments/{service_attachment}`. |
| `isPrivate` | boolean | Required. Immutable. Indicate if it's private instance. |
| `pscAllowedProjects` | array<string> | Optional. Additional allowed projects for setting up PSC connections. Instance host project is automatically allowed and does not need to be included in this list. |
| `sshServiceAttachment` | string | Output only. Service Attachment for SSH, resource is in the format of `projects/{project}/regions/{region}/serviceAttachments/{service_attachment}`. |

### `PullRequest`

- Metadata of a PullRequest. PullRequest is the request from a user to merge a branch (head) into another branch (base).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `base` | Branch | Required. The branch to merge changes in. |
| `body` | string | Optional. The pull request body. Provides a detailed description of the changes. |
| `closeTime` | string (google-datetime) | Output only. Close timestamp (if closed or merged). Cleared when pull request is re-opened. |
| `createTime` | string (google-datetime) | Output only. Creation timestamp. |
| `head` | Branch | Immutable. The branch containing the changes to be merged. |
| `name` | string | Output only. A unique identifier for a PullRequest. The number appended at the end is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/pullRequests/{pull_request_id}` |
| `state` | string enum | Output only. State of the pull request (open, closed or merged). Values: `STATE_UNSPECIFIED`, `OPEN`, `CLOSED`, `MERGED`. |
| `title` | string | Required. The pull request title. |
| `updateTime` | string (google-datetime) | Output only. Last updated timestamp. |

### `PullRequestComment`

- PullRequestComment represents a comment on a pull request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | Code | Optional. The comment on a code line. |
| `comment` | Comment | Optional. The general pull request comment. |
| `createTime` | string (google-datetime) | Output only. Creation timestamp. |
| `name` | string | Identifier. Unique identifier for the pull request comment. The comment id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/pullRequests/{pull_request}/pullRequestComments/{comment_id}` |
| `review` | Review | Optional. The review summary comment. |
| `updateTime` | string (google-datetime) | Output only. Last updated timestamp. |

### `PushOption`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `branchFilter` | string | Optional. Trigger hook for matching branches only. Specified as glob pattern. If empty or \*, events for all branches are reported. Examples: main, {main,release\*}. See https://pkg.go.dev/github.com/gobwas/glob documentation. |

### `Repository`

- Metadata of a Secure Source Manager repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `description` | string | Optional. Description of the repository, which cannot exceed 500 characters. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `initialConfig` | InitialConfig | Input only. Initial configurations for the repository. |
| `instance` | string | Optional. The name of the instance in which the repository is hosted, formatted as `projects/{project_number}/locations/{location_id}/instances/{instance_id}` When creating repository via securesourcemanager.googleapis.com, this field is used as input. When creating repository via \*.sourcemanager.dev, this field is output only. |
| `name` | string | Optional. A unique identifier for a repository. The name should be of the format: `projects/{project}/locations/{location_id}/repositories/{repository_id}` |
| `uid` | string | Output only. Unique identifier of the repository. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |
| `uris` | URIs | Output only. URIs for the repository. |

### `ResolvePullRequestCommentsRequest`

- The request to resolve multiple pull request comments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoFill` | boolean | Optional. If set, at least one comment in a thread is required, rest of the comments in the same thread will be automatically updated to resolved. If unset, all comments in the same thread need be present. |
| `names` | array<string> | Required. The names of the pull request comments to resolve. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}/pullRequestComments/{comment_id}` Only comments from the same threads are allowed in the same request. |

### `Review`

- The review summary comment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actionType` | string enum | Required. The review action type. Values: `ACTION_TYPE_UNSPECIFIED`, `COMMENT`, `CHANGE_REQUESTED`, `APPROVED`. |
| `body` | string | Optional. The comment body. |
| `effectiveCommitSha` | string | Output only. The effective commit sha this review is pointing to. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `TreeEntry`

- Represents an entry within a tree structure (like a Git tree).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string | Output only. The file mode as a string (e.g., "100644"). Indicates file type. Output-only. |
| `path` | string | Output only. The path of the file or directory within the tree (e.g., "src/main/java/MyClass.java"). Output-only. |
| `sha` | string | Output only. The SHA-1 hash of the object (unique identifier). Output-only. |
| `size` | string (int64) | Output only. The size of the object in bytes (only for blobs). Output-only. |
| `type` | string enum | Output only. The type of the object (TREE, BLOB, COMMIT). Output-only. Values: `OBJECT_TYPE_UNSPECIFIED`, `TREE`, `BLOB`, `COMMIT`. |

### `URIs`

- URIs for the repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `api` | string | Output only. API is the URI for API access. |
| `gitHttps` | string | Output only. git_https is the git HTTPS URI for git operations. |
| `html` | string | Output only. HTML is the URI for user to view the repository in a browser. |

### `UnresolvePullRequestCommentsRequest`

- The request to unresolve multiple pull request comments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoFill` | boolean | Optional. If set, at least one comment in a thread is required, rest of the comments in the same thread will be automatically updated to unresolved. If unset, all comments in the same thread need be present. |
| `names` | array<string> | Required. The names of the pull request comments to unresolve. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}/pullRequestComments/{comment_id}` Only comments from the same threads are allowed in the same request. |

### `WorkforceIdentityFederationConfig`

- WorkforceIdentityFederationConfig allows this instance to support users from external identity providers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Immutable. Whether Workforce Identity Federation is enabled. |

### Shape of `AuditConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "auditLogConfigs": "array<AuditLogConfig>",
  "service": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `securesourcemanager` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://securesourcemanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
