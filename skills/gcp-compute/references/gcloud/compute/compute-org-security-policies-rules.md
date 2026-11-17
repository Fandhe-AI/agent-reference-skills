---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/rules
---

# gcloud compute org-security-policies rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute org-security-policies rules add-preconfig-waf-exclusion

```text
NAME
    gcloud compute org-security-policies rules add-preconfig-waf-exclusion -
        add an exclusion configuration for preconfigured WAF evaluation into a
        security policy rule

SYNOPSIS
    gcloud compute org-security-policies rules add-preconfig-waf-exclusion
        PRIORITY --security-policy=SECURITY_POLICY
        --target-rule-set=TARGET_RULE_SET [--organization=ORGANIZATION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--target-rule-ids=[RULE_ID,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies rules add-preconfig-waf-exclusion is
    used to add an exclusion configuration for preconfigured WAF evaluation
    into a security policy rule.

    Note that request field exclusions are associated with a target, which can
    be a single rule set, or a rule set plus a list of rule IDs under the rule
    set.

EXAMPLES
    To add specific request field exclusions that are associated with the
    target of 'sqli-stable': ['owasp-crs-v030001-id942110-sqli',
    'owasp-crs-v030001-id942120-sqli'], run:

        $ gcloud compute org-security-policies rules \
            add-preconfig-waf-exclusion 1000 --security-policy=1234567890 \
            --target-rule-set=sqli-stable \
            --target-rule-ids=owasp-crs-v030001-id942110-sqli,\
        owasp-crs-v030001-id942120-sqli \
            --request-header-to-exclude='op=EQUALS,val=abc' \
            --request-header-to-exclude='op=STARTS_WITH,val=xyz' \
            --request-uri-to-exclude='op=EQUALS_ANY' \
            --request-body-to-exclude='op=CONTAINS,val=bad_data'

    To add specific request field exclusions that are associated with the
    target of 'sqli-stable': [], run:

        $ gcloud compute org-security-policies rules \
            add-preconfig-waf-exclusion 1000 --security-policy=1234567890 \
            --target-rule-set=sqli-stable \
            --request-cookie-to-exclude='op=EQUALS_ANY'

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the security policy rule to add preconfig WAF exclusion.

REQUIRED FLAGS
     --security-policy=SECURITY_POLICY
        short name of the security policy into which the rule should be
        updated.

     --target-rule-set=TARGET_RULE_SET
        Target WAF rule set where the request field exclusions being added
        would apply.

        This, together with the target rule IDs (if given), determines the
        target for associating request field exclusions. See --target-rule-ids.

OPTIONAL FLAGS
     --organization=ORGANIZATION
        Organization which the organization security policy belongs to. Must be
        set if SECURITY_POLICY is short name.

     --request-body-to-exclude=[op=OP],[val=VAL]
        Adds a request body to the request field exclusions associated with the
        rule set and rule IDs (if provided). This flag specifies a request body
        to exclude from inspection during preconfigured WAF evaluation.

        For syntax, see --request-cookie-to-exclude.

        You can repeat this flag to specify multiple request bodies.

     --request-cookie-to-exclude=[op=OP],[val=VAL]
        Adds a request cookie to the request field exclusions associated with
        the rule set and rule IDs (if given). This specifies a request cookie
        whose value will be excluded from inspection during preconfigured WAF
        evaluation.

        You can specify an exact match or a partial match by using a field
        operator and a field value. Available field operators are:
        * EQUALS: the operator matches if the field value equals the
          specified value.
        * STARTS_WITH: the operator matches if the field value starts with
          the specified value.
        * ENDS_WITH: the operator matches if the field value ends with the
          specified value.
        * CONTAINS: the operator matches if the field value contains the
          specified value.
        * EQUALS_ANY: the operator matches if the field value is any value.

        A field value must be given if the field operator is not EQUALS_ANY,
        and cannot be given if the field operator is EQUALS_ANY. For example,
        --request-header-to-exclude op=EQUALS,val=abc or
        --request-header-to-exclude op=EQUALS_ANY.

        This flag can be repeated to specify multiple request headers to
        exclude. For example, --request-header-to-exclude op=EQUALS,val=abc
        --request-header-to-exclude op=STARTS_WITH,val=xyz.

     --request-header-to-exclude=[op=OP],[val=VAL]
        Adds a request header to the request field exclusions associated with
        the rule set and rule IDs (if given). This specifies a request header
        whose value will be excluded from inspection during preconfigured WAF
        evaluation.

        Refer to the syntax under --request-cookie-to-exclude.

        This flag can be repeated to specify multiple request headers.

     --request-query-param-to-exclude=[op=OP],[val=VAL]
        Adds a request query parameter to the request field exclusions
        associated with the rule set and rule IDs (if given). This specifies a
        request query parameter in the query string or in the POST body whose
        value will be excluded from inspection during preconfigured WAF
        evaluation.

        Refer to the syntax under --request-cookie-to-exclude.

        This flag can be repeated to specify multiple request query parameters.

     --request-uri-to-exclude=[op=OP],[val=VAL]
        Adds a request URI to the request field exclusions associated with the
        rule set and rule IDs (if given). This specifies a request URI from the
        request line to be excluded from inspection during preconfigured WAF
        evaluation.

        Refer to the syntax under --request-cookie-to-exclude.

        This flag can be repeated to specify multiple request URIs.

     --target-rule-ids=[RULE_ID,...]
        A comma-separated list of target rule IDs under the WAF rule set where
        the request field exclusions being added would apply. If omitted, the
        added request field exclusions will be associated with the rule set
        only, which would apply to all the rule IDs under the rule set.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies rules \
            add-preconfig-waf-exclusion

        $ gcloud beta compute org-security-policies rules \
            add-preconfig-waf-exclusion
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute org-security-policies rules add-preconfig-waf-exclusion 1000 \
    --security-policy=1234567890 \
    --target-rule-set=sqli-stable \
    --target-rule-ids=owasp-crs-v030001-id942110-sqli,owasp-crs-v030001-id942120-sqli \
    --request-header-to-exclude='op=EQUALS,val=abc' \
    --request-header-to-exclude='op=STARTS_WITH,val=xyz' \
    --request-uri-to-exclude='op=EQUALS_ANY' \
    --request-body-to-exclude='op=CONTAINS,val=bad_data'
```

### gcloud compute org-security-policies rules create

```text
NAME
    gcloud compute org-security-policies rules create - create a Compute Engine
        organizationsecurity policy rule

SYNOPSIS
    gcloud compute org-security-policies rules create PRIORITY --action=ACTION
        --security-policy=SECURITY_POLICY [--cloud-armor]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--direction=DIRECTION] [--[no-]enable-logging]
        [--layer4-configs=[LAYER4_CONFIG,...]] [--organization=ORGANIZATION]
        [--preview] [--target-resources=[TARGET_RESOURCES,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--expression=EXPRESSION | --src-ip-ranges=[SRC_IP_RANGE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies rules create is used to create
    organization security policy rules.

EXAMPLES
    To create a rule with priority 10 in an organization security policy with
    ID 123456789, run:

        $ gcloud compute org-security-policies rules create 10 \
            --security-policy=123456789 --action=allow \
            --description=example-rule --cloud-armor

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the security policy rule to create.

REQUIRED FLAGS
     --action=ACTION
        Action to take if the request matches the match condition. ACTION must
        be one of:

         allow
            Allows the request from HTTP(S) Load Balancing.
         deny
            (DEPRECATED) Only used for Hierarchical Firewalls.
         deny-403
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 403.
         deny-404
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 404.
         deny-502
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 502.
         goto-next
            Defers enforcement to the next policy in the hierarchy.
         redirect
            Redirects the request from HTTP(S) Load Balancing, based on
            redirect options.

     --security-policy=SECURITY_POLICY
        short name of the security policy into which the rule should be
        inserted.

OPTIONAL FLAGS
     --cloud-armor
        Specified for Hierarchical Cloud Armor rules.

     --description=DESCRIPTION
        An optional, textual description for the rule.

     --dest-ip-ranges=[DEST_IP_RANGE,...]
        Destination IP ranges to match for this rule. Can only be specified if
        DIRECTION is egress.

     --direction=DIRECTION
        Direction of the traffic the rule is applied. The default is to apply
        on incoming traffic. DIRECTION must be one of: INGRESS, EGRESS.

     --[no-]enable-logging
        Use this flag to enable logging of connections that allowed or denied
        by this rule. Use --enable-logging to enable and --no-enable-logging to
        disable.

     --layer4-configs=[LAYER4_CONFIG,...]
        A list of destination protocols and ports to which the firewall rule
        will apply.

     --organization=ORGANIZATION
        Organization which the organization security policy belongs to. Must be
        set if SECURITY_POLICY is short name.

     --preview
        If specified, the action will not be enforced.

     --target-resources=[TARGET_RESOURCES,...]
        List of URLs of target resources to which the rule is applied.

     --target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]
        List of target service accounts for the rule.

     Security policy rule matcher.

     At most one of these can be specified:

       --expression=EXPRESSION
          The Cloud Armor rules language expression to match for this rule.

       --src-ip-ranges=[SRC_IP_RANGE,...]
          The source IPs/IP ranges to match for this rule. To match all IPs
          specify *.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies rules create

        $ gcloud beta compute org-security-policies rules create
```

### gcloud compute org-security-policies rules delete

```text
NAME
    gcloud compute org-security-policies rules delete - delete a Compute Engine
        organization security policy rule

SYNOPSIS
    gcloud compute org-security-policies rules delete PRIORITY
        --security-policy=SECURITY_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies rules delete is used to delete
    organization security policy rule.

EXAMPLES
    To delete a rule with priority 10 in an organization security policy with
    ID 123456789, run:

        $ gcloud compute org-security-policies rules delete 10 \
            --security-policy=123456789

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the security policy rule to delete.

REQUIRED FLAGS
     --security-policy=SECURITY_POLICY
        short name of the security policy into which the rule should be
        deleted.

OPTIONAL FLAGS
     --organization=ORGANIZATION
        Organization which the organization security policy belongs to. Must be
        set if SECURITY_POLICY is short name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies rules delete

        $ gcloud beta compute org-security-policies rules delete
```

### gcloud compute org-security-policies rules describe

```text
NAME
    gcloud compute org-security-policies rules describe - describe a Compute
        Engine organization security policy rule

SYNOPSIS
    gcloud compute org-security-policies rules describe PRIORITY
        --security-policy=SECURITY_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies rules describe is used to describe
    organization security policy rule.

EXAMPLES
    To describe a rule with priority 10 in an organization security policy with
    ID 123456789, run:

        $ gcloud compute org-security-policies rules describe 10 \
            --security-policy=123456789

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the security policy rule to describe.

REQUIRED FLAGS
     --security-policy=SECURITY_POLICY
        short name of the security policy into which the rule should be
        described.

OPTIONAL FLAGS
     --organization=ORGANIZATION
        Organization which the organization security policy belongs to. Must be
        set if SECURITY_POLICY is short name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies rules describe

        $ gcloud beta compute org-security-policies rules describe
```

### gcloud compute org-security-policies rules remove-preconfig-waf-exclusion

```text
NAME
    gcloud compute org-security-policies rules remove-preconfig-waf-exclusion -
        remove an exclusion configuration for preconfigured WAF evaluation from
        a security policy rule

SYNOPSIS
    gcloud compute org-security-policies rules remove-preconfig-waf-exclusion
        PRIORITY --security-policy=SECURITY_POLICY
        --target-rule-set=TARGET_RULE_SET [--organization=ORGANIZATION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--target-rule-ids=[RULE_ID,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies rules remove-preconfig-waf-exclusion
    is used to remove an exclusion configuration for preconfigured WAF
    evaluation from a security policy rule.

    Note that request field exclusions are associated with a target, which can
    be a single rule set, or a rule set plus a list of rule IDs under the rule
    set.

    It is possible to remove request field exclusions at 3 levels:
      o Remove specific request field exclusions that are associated with a
        matching target.
      o Remove all the request field exclusions that are associated with a
        matching target.
      o Remove all the request field exclusions that are configured under the
        security policy rule, regardless of the target.

EXAMPLES
    To remove specific request field exclusions that are associated with the
    target of 'sqli-stable': ['owasp-crs-v030001-id942110-sqli',
    'owasp-crs-v030001-id942120-sqli'], run:

        $ gcloud compute org-security-policies rules \
            remove-preconfig-waf-exclusion 1000 \
            --security-policy=1234567890 --target-rule-set=sqli-stable \
            --target-rule-ids='owasp-crs-v030001-id942110-sqli',\
        'owasp-crs-v030001-id942120-sqli' \
            --request-header-to-exclude='op=EQUALS,val=abc' \
            --request-header-to-exclude='op=STARTS_WITH,val=xyz' \
            --request-uri-to-exclude='op=EQUALS_ANY' \
            --request-body-to-exclude='op=CONTAINS,val=bad_data'

    To remove all the request field exclusions that are associated with the
    target of 'sqli-stable': ['owasp-crs-v030001-id942110-sqli',
    'owasp-crs-v030001-id942120-sqli'], run:

        $ gcloud compute org-security-policies rules \
            remove-preconfig-waf-exclusion 1000 \
            --security-policy=1234567890 --target-rule-set=sqli-stable \
            --target-rule-ids='owasp-crs-v030001-id942110-sqli',\
        'owasp-crs-v030001-id942120-sqli'

    To remove all the request field exclusions that are associated with the
    target of 'sqli-stable': [], run:

        $ gcloud compute org-security-policies rules \
            remove-preconfig-waf-exclusion 1000 \
            --security-policy=1234567890 --target-rule-set=sqli-stable

    To remove all the request field exclusions that are configured under the
    security policy rule, regardless of the target, run:

        $ gcloud compute org-security-policies rules \
            remove-preconfig-waf-exclusion 1000 \
            --security-policy=1234567890 --target-rule-set=*

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the security policy rule to remove preconfig WAF exclusion.

REQUIRED FLAGS
     --security-policy=SECURITY_POLICY
        short name of the security policy into which the rule should be
        updated.

     --target-rule-set=TARGET_RULE_SET
        Target WAF rule set from where to remove the request field exclusions.

        This, together with the target rule IDs (if given), determines the
        target for associating request field exclusions. See --target-rule-ids.

        Note that the removal of request field exclusions is restricted to
        those associated with a matching target. Set this flag to * if you want
        to remove request field exclusions regardless of the target.

OPTIONAL FLAGS
     --organization=ORGANIZATION
        Organization which the organization security policy belongs to. Must be
        set if SECURITY_POLICY is short name.

     --request-body-to-exclude=[op=OP],[val=VAL]
        Removes a request body from the existing request field exclusions
        associated with the rule set and rule IDs (if provided).

        For syntax, see --request-cookie-to-exclude.

        You can repeat this flag to specify multiple request bodies.

     --request-cookie-to-exclude=[op=OP],[val=VAL]
        Removes a request cookie from the existing request field exclusions
        associated with the rule set and rule IDs (if given).

        You can specify an exact match or a partial match by using a field
        operator and a field value. Available field operators are:
        * EQUALS: the operator matches if the field value equals the
          specified value.
        * STARTS_WITH: the operator matches if the field value starts with
          the specified value.
        * ENDS_WITH: the operator matches if the field value ends with the
          specified value.
        * CONTAINS: the operator matches if the field value contains the
          specified value.
        * EQUALS_ANY: the operator matches if the field value is any value.

        A field value must be given if the field operator is not EQUALS_ANY,
        and cannot be given if the field operator is EQUALS_ANY. For example,
        --request-header-to-exclude op=EQUALS,val=abc or
        --request-header-to-exclude op=EQUALS_ANY.

        This flag can be repeated to specify multiple request headers to
        exclude. For example, --request-header-to-exclude op=EQUALS,val=abc
        --request-header-to-exclude op=STARTS_WITH,val=xyz.

     --request-header-to-exclude=[op=OP],[val=VAL]
        Removes a request header from the existing request field exclusions
        associated with the rule set and rule IDs (if given).

        Refer to the syntax under --request-cookie-to-exclude.

        This flag can be repeated to specify multiple request headers.

     --request-query-param-to-exclude=[op=OP],[val=VAL]
        Removes a request query parameter from the existing request field
        exclusions associated with the rule set and rule IDs (if given).

        Refer to the syntax under --request-cookie-to-exclude.

        This flag can be repeated to specify multiple request query parameters.

     --request-uri-to-exclude=[op=OP],[val=VAL]
        Removes a request URI from the existing request field exclusions
        associated with the rule set and rule IDs (if given).

        Refer to the syntax under --request-cookie-to-exclude.

        This flag can be repeated to specify multiple request URIs.

     --target-rule-ids=[RULE_ID,...]
        A comma-separated list of target rule IDs under the WAF rule set from
        where to remove the request field exclusions. If omitted, the removal
        of request field exclusions is restricted to those associated with the
        rule set only, without specific rule IDs.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies rules \
            remove-preconfig-waf-exclusion

        $ gcloud beta compute org-security-policies rules \
            remove-preconfig-waf-exclusion
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute org-security-policies rules remove-preconfig-waf-exclusion 1000 \
    --security-policy=1234567890 \
    --target-rule-set=sqli-stable \
    --target-rule-ids='owasp-crs-v030001-id942110-sqli','owasp-crs-v030001-id942120-sqli' \
    --request-header-to-exclude='op=EQUALS,val=abc' \
    --request-header-to-exclude='op=STARTS_WITH,val=xyz' \
    --request-uri-to-exclude='op=EQUALS_ANY' \
    --request-body-to-exclude='op=CONTAINS,val=bad_data'

gcloud compute org-security-policies rules remove-preconfig-waf-exclusion 1000 \
    --security-policy=1234567890 \
    --target-rule-set=sqli-stable \
    --target-rule-ids='owasp-crs-v030001-id942110-sqli','owasp-crs-v030001-id942120-sqli'
```

### gcloud compute org-security-policies rules update

```text
NAME
    gcloud compute org-security-policies rules update - update a Compute Engine
        security policy rule

SYNOPSIS
    gcloud compute org-security-policies rules update PRIORITY
        --security-policy=SECURITY_POLICY [--action=ACTION] [--cloud-armor]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--direction=DIRECTION] [--[no-]enable-logging]
        [--layer4-configs=[LAYER4_CONFIG,...]] [--new-priority=NEW_PRIORITY]
        [--organization=ORGANIZATION] [--[no-]preview]
        [--target-resources=[TARGET_RESOURCES,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--expression=EXPRESSION | --src-ip-ranges=[SRC_IP_RANGE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies rules update is used to update
    organization security policy rules.

EXAMPLES
    To update a rule with priority 10 in an organization security policy with
    ID 123456789 to change the action to allow and description to
    new-example-rule, run:

        $ gcloud compute org-security-policies rules update 10 \
            --security-policy=123456789 --action=allow \
            --description=new-example-rule

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the security policy rule to update.

REQUIRED FLAGS
     --security-policy=SECURITY_POLICY
        short name of the security policy into which the rule should be
        updated.

OPTIONAL FLAGS
     --action=ACTION
        Action to take if the request matches the match condition. ACTION must
        be one of:

         allow
            Allows the request from HTTP(S) Load Balancing.
         deny
            (DEPRECATED) Only used for Hierarchical Firewalls.
         deny-403
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 403.
         deny-404
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 404.
         deny-502
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 502.
         goto-next
            Defers enforcement to the next policy in the hierarchy.
         redirect
            Redirects the request from HTTP(S) Load Balancing, based on
            redirect options.

     --cloud-armor
        Specified for Hierarchical Cloud Armor rules.

     --description=DESCRIPTION
        An optional, textual description for the rule.

     --dest-ip-ranges=[DEST_IP_RANGE,...]
        Destination IP ranges to match for this rule. Can only be specified if
        DIRECTION is egress.

     --direction=DIRECTION
        Direction of the traffic the rule is applied. The default is to apply
        on incoming traffic. DIRECTION must be one of: INGRESS, EGRESS.

     --[no-]enable-logging
        Use this flag to enable logging of connections that allowed or denied
        by this rule. Use --enable-logging to enable and --no-enable-logging to
        disable.

     --layer4-configs=[LAYER4_CONFIG,...]
        A list of destination protocols and ports to which the firewall rule
        will apply.

     --new-priority=NEW_PRIORITY
        New priority for the rule to update. Valid in [0, 65535].

     --organization=ORGANIZATION
        Organization which the organization security policy belongs to. Must be
        set if SECURITY_POLICY is short name.

     --[no-]preview
        If specified, the action will not be enforced. Use --preview to enable
        and --no-preview to disable.

     --target-resources=[TARGET_RESOURCES,...]
        List of URLs of target resources to which the rule is applied.

     --target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]
        List of target service accounts for the rule.

     Security policy rule matcher.

     At most one of these can be specified:

       --expression=EXPRESSION
          The Cloud Armor rules language expression to match for this rule.

       --src-ip-ranges=[SRC_IP_RANGE,...]
          The source IPs/IP ranges to match for this rule. To match all IPs
          specify *.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies rules update

        $ gcloud beta compute org-security-policies rules update
```

### gcloud beta compute org-security-policies rules add-preconfig-waf-exclusion

```text
NAME
    gcloud beta compute org-security-policies rules add-preconfig-waf-exclusion
        - add an exclusion configuration for preconfigured WAF evaluation into
        a security policy rule

SYNOPSIS
    gcloud beta compute org-security-policies rules add-preconfig-waf-exclusion
        PRIORITY --security-policy=SECURITY_POLICY
        --target-rule-set=TARGET_RULE_SET [--organization=ORGANIZATION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--target-rule-ids=[RULE_ID,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-security-policies rules create

```text
NAME
    gcloud beta compute org-security-policies rules create - create a Compute
        Engine organizationsecurity policy rule

SYNOPSIS
    gcloud beta compute org-security-policies rules create PRIORITY
        --action=ACTION --security-policy=SECURITY_POLICY [--cloud-armor]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--direction=DIRECTION] [--[no-]enable-logging]
        [--layer4-configs=[LAYER4_CONFIG,...]] [--organization=ORGANIZATION]
        [--preview] [--target-resources=[TARGET_RESOURCES,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--expression=EXPRESSION | --src-ip-ranges=[SRC_IP_RANGE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-security-policies rules delete

```text
NAME
    gcloud beta compute org-security-policies rules delete - delete a Compute
        Engine organization security policy rule

SYNOPSIS
    gcloud beta compute org-security-policies rules delete PRIORITY
        --security-policy=SECURITY_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-security-policies rules describe

```text
NAME
    gcloud beta compute org-security-policies rules describe - describe a
        Compute Engine organization security policy rule

SYNOPSIS
    gcloud beta compute org-security-policies rules describe PRIORITY
        --security-policy=SECURITY_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-security-policies rules remove-preconfig-waf-exclusion

```text
NAME
    gcloud beta compute org-security-policies rules
        remove-preconfig-waf-exclusion - remove an exclusion configuration for
        preconfigured WAF evaluation from a security policy rule

SYNOPSIS
    gcloud beta compute org-security-policies rules
        remove-preconfig-waf-exclusion PRIORITY
        --security-policy=SECURITY_POLICY --target-rule-set=TARGET_RULE_SET
        [--organization=ORGANIZATION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--target-rule-ids=[RULE_ID,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-security-policies rules update

```text
NAME
    gcloud beta compute org-security-policies rules update - update a Compute
        Engine security policy rule

SYNOPSIS
    gcloud beta compute org-security-policies rules update PRIORITY
        --security-policy=SECURITY_POLICY [--action=ACTION] [--cloud-armor]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--direction=DIRECTION] [--[no-]enable-logging]
        [--layer4-configs=[LAYER4_CONFIG,...]] [--new-priority=NEW_PRIORITY]
        [--organization=ORGANIZATION] [--[no-]preview]
        [--target-resources=[TARGET_RESOURCES,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--expression=EXPRESSION | --src-ip-ranges=[SRC_IP_RANGE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies rules add-preconfig-waf-exclusion

```text
NAME
    gcloud alpha compute org-security-policies rules
        add-preconfig-waf-exclusion - add an exclusion configuration for
        preconfigured WAF evaluation into a security policy rule

SYNOPSIS
    gcloud alpha compute org-security-policies rules
        add-preconfig-waf-exclusion PRIORITY --security-policy=SECURITY_POLICY
        --target-rule-set=TARGET_RULE_SET [--organization=ORGANIZATION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--target-rule-ids=[RULE_ID,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies rules create

```text
NAME
    gcloud alpha compute org-security-policies rules create - create a Compute
        Engine security policy rule

SYNOPSIS
    gcloud alpha compute org-security-policies rules create PRIORITY
        --action=ACTION --security-policy=SECURITY_POLICY [--cloud-armor]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--dest-ports=[DEST_PORTS,...]] [--direction=DIRECTION]
        [--[no-]enable-logging] [--layer4-configs=[LAYER4_CONFIG,...]]
        [--organization=ORGANIZATION] [--preview]
        [--target-resources=[TARGET_RESOURCES,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--expression=EXPRESSION | --src-ip-ranges=[SRC_IP_RANGE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies rules delete

```text
NAME
    gcloud alpha compute org-security-policies rules delete - delete a Compute
        Engine organization security policy rule

SYNOPSIS
    gcloud alpha compute org-security-policies rules delete PRIORITY
        --security-policy=SECURITY_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies rules describe

```text
NAME
    gcloud alpha compute org-security-policies rules describe - describe a
        Compute Engine organization security policy rule

SYNOPSIS
    gcloud alpha compute org-security-policies rules describe PRIORITY
        --security-policy=SECURITY_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies rules remove-preconfig-waf-exclusion

```text
NAME
    gcloud alpha compute org-security-policies rules
        remove-preconfig-waf-exclusion -

SYNOPSIS
    gcloud alpha compute org-security-policies rules
        remove-preconfig-waf-exclusion PRIORITY
        --security-policy=SECURITY_POLICY --target-rule-set=TARGET_RULE_SET
        [--organization=ORGANIZATION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--target-rule-ids=[RULE_ID,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies rules update

```text
NAME
    gcloud alpha compute org-security-policies rules update - update a Compute
        Engine security policy rule

SYNOPSIS
    gcloud alpha compute org-security-policies rules update PRIORITY
        --security-policy=SECURITY_POLICY [--action=ACTION] [--cloud-armor]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--dest-ports=[DEST_PORTS,...]] [--direction=DIRECTION]
        [--[no-]enable-logging] [--layer4-configs=[LAYER4_CONFIG,...]]
        [--new-priority=NEW_PRIORITY] [--organization=ORGANIZATION]
        [--[no-]preview] [--target-resources=[TARGET_RESOURCES,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--expression=EXPRESSION | --src-ip-ranges=[SRC_IP_RANGE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute org-security-policies rules create --action deny`: "(DEPRECATED) Only used for Hierarchical Firewalls."; `gcloud compute org-security-policies rules update --action deny`: "(DEPRECATED) Only used for Hierarchical Firewalls.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
