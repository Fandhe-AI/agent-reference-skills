---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/rules
---

# gcloud compute security-policies rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute security-policies rules add-preconfig-waf-exclusion

```text
NAME
    gcloud compute security-policies rules add-preconfig-waf-exclusion - add an
        exclusion configuration for preconfigured WAF evaluation into a
        security policy rule

SYNOPSIS
    gcloud compute security-policies rules add-preconfig-waf-exclusion PRIORITY
        --target-rule-set=TARGET_RULE_SET [--region=REGION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--security-policy=SECURITY_POLICY] [--target-rule-ids=[RULE_ID,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies rules add-preconfig-waf-exclusion is used
    to add an exclusion configuration for preconfigured WAF evaluation into a
    security policy rule.

    Note that request field exclusions are associated with a target, which can
    be a single rule set, or a rule set plus a list of rule IDs under the rule
    set.

EXAMPLES
    To add specific request field exclusions that are associated with the
    target of 'sqli-stable': ['owasp-crs-v030001-id942110-sqli',
    'owasp-crs-v030001-id942120-sqli'], run:

        $ gcloud compute security-policies rules \
            add-preconfig-waf-exclusion 1000 --security-policy=my-policy \
            --target-rule-set=sqli-stable \
            --target-rule-ids=owasp-crs-v030001-id942110-sqli,\
        owasp-crs-v030001-id942120-sqli \
            --request-header-to-exclude=op=EQUALS,val=abc \
            --request-header-to-exclude=op=STARTS_WITH,val=xyz \
            --request-uri-to-exclude=op=EQUALS_ANY \
            --request-body-to-exclude=op=CONTAINS,val=bad_data

    To add specific request field exclusions that are associated with the
    target of 'sqli-stable': [], run:

        $ gcloud compute security-policies rules \
            add-preconfig-waf-exclusion 1000 --security-policy=my-policy \
            --target-rule-set=sqli-stable \
            --request-cookie-to-exclude=op=EQUALS_ANY

POSITIONAL ARGUMENTS
     PRIORITY
        The priority of the rule to add the exclusion configuration for
        preconfigured WAF evaluation. Rules are evaluated in order from highest
        priority to lowest priority where 0 is the highest priority and
        2147483647 is the lowest priority.

REQUIRED FLAGS
     --target-rule-set=TARGET_RULE_SET
        Target WAF rule set where the request field exclusions being added
        would apply.

        This, together with the target rule IDs (if given), determines the
        target for associating request field exclusions. See --target-rule-ids.

OPTIONAL FLAGS
     --region=REGION
        Region of the security policy to add the exclusion configuration for
        preconfigured WAF evaluation. If not specified, you might be prompted
        to select a region (interactive mode only).

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        Overrides the default compute/region property value for this command
        invocation.

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

     --security-policy=SECURITY_POLICY
        The security policy that this rule belongs to.

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

        $ gcloud alpha compute security-policies rules \
            add-preconfig-waf-exclusion

        $ gcloud beta compute security-policies rules \
            add-preconfig-waf-exclusion
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute security-policies rules add-preconfig-waf-exclusion 1000 \
    --security-policy=my-policy \
    --target-rule-set=sqli-stable \
    --target-rule-ids=owasp-crs-v030001-id942110-sqli,owasp-crs-v030001-id942120-sqli \
    --request-header-to-exclude=op=EQUALS,val=abc \
    --request-header-to-exclude=op=STARTS_WITH,val=xyz \
    --request-uri-to-exclude=op=EQUALS_ANY \
    --request-body-to-exclude=op=CONTAINS,val=bad_data
```

### gcloud compute security-policies rules create

```text
NAME
    gcloud compute security-policies rules create - create a Compute Engine
        security policy rule

SYNOPSIS
    gcloud compute security-policies rules create PRIORITY --action=ACTION
        (--expression=EXPRESSION --network-dest-ip-ranges=[DEST_IP_RANGE,...]
          --network-dest-ports=[DEST_PORT,...]
          --network-ip-protocols=[IP_PROTOCOL,...]
          --network-src-asns=[SRC_ASN,...]
          --network-src-ip-ranges=[SRC_IP_RANGE,...]
          --network-src-ports=[SRC_PORT,...]
          --network-src-region-codes=[SRC_REGION_CODE,...]
          --network-user-defined-fields=[NAME;VALUE:VALUE:...,...]
          --src-ip-ranges=[SRC_IP_RANGE,...])
        [--ban-duration-sec=BAN_DURATION_SEC]
        [--ban-threshold-count=BAN_THRESHOLD_COUNT]
        [--ban-threshold-interval-sec=BAN_THRESHOLD_INTERVAL_SEC]
        [--conform-action=CONFORM_ACTION] [--description=DESCRIPTION]
        [--enforce-on-key=ENFORCE_ON_KEY]
        [--enforce-on-key-configs=[[all],[ip],[xff-ip],
          [http-cookie=HTTP_COOKIE],[http-header=HTTP_HEADER],[http-path],[sni],
          [region-code],
          [tls-ja3-fingerprint],[user-ip],[tls-ja4-fingerprint],[asn]],[...]]
        [--enforce-on-key-name=ENFORCE_ON_KEY_NAME]
        [--exceed-action=EXCEED_ACTION]
        [--exceed-redirect-target=EXCEED_REDIRECT_TARGET]
        [--exceed-redirect-type=EXCEED_REDIRECT_TYPE] [--preview]
        [--rate-limit-threshold-count=RATE_LIMIT_THRESHOLD_COUNT]
        [--rate-limit-threshold-interval-sec=RATE_LIMIT_THRESHOLD_INTERVAL_SEC]
        [--recaptcha-action-site-keys=[SITE_KEY,...]]
        [--recaptcha-session-site-keys=[SITE_KEY,...]]
        [--redirect-target=REDIRECT_TARGET] [--redirect-type=REDIRECT_TYPE]
        [--region=REGION]
        [--request-headers-to-add=[REQUEST_HEADERS_TO_ADD,...]]
        [--security-policy=SECURITY_POLICY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies rules create is used to create security
    policy rules.

EXAMPLES
    To create a rule at priority 1000 to block the IP range 1.2.3.0/24, run:

        $ gcloud compute security-policies rules create 1000 \
            --action=deny-403 --security-policy=my-policy \
            --description="block 1.2.3.0/24" --src-ip-ranges=1.2.3.0/24

POSITIONAL ARGUMENTS
     PRIORITY
        The priority of the rule to add. Rules are evaluated in order from
        highest priority to lowest priority where 0 is the highest priority and
        2147483647 is the lowest priority.

REQUIRED FLAGS
     --action=ACTION
        The action to take if the request matches the match condition. ACTION
        must be one of:

         allow
            Allows the request from HTTP(S) Load Balancing.
         deny
            Denies the request from TCP/SSL Proxy and Network Load Balancing.
         deny-403
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 403.
         deny-404
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 404.
         deny-502
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 502.
         rate-based-ban
            Enforces rate-based ban action from HTTP(S) Load Balancing, based
            on rate limit options.
         redirect
            Redirects the request from HTTP(S) Load Balancing, based on
            redirect options.
         redirect-to-recaptcha
            (DEPRECATED) Redirects the request from HTTP(S) Load Balancing, for
            reCAPTCHA Enterprise assessment. This flag choice is deprecated.
            Use --action=redirect and --redirect-type=google-recaptcha instead.
         throttle
            Enforces throttle action from HTTP(S) Load Balancing, based on rate
            limit options.

     Security policy rule matcher.

     At least one of these must be specified:

       --expression=EXPRESSION
          The Cloud Armor rules language expression to match for this rule.

       --network-dest-ip-ranges=[DEST_IP_RANGE,...]
          The destination IPs/IP ranges to match for this rule. To match all
          IPs specify *.

       --network-dest-ports=[DEST_PORT,...]
          The destination ports to match for this rule. Each element can be an
          16-bit unsigned decimal number (e.g. "80") or range (e.g."0-1023"),
          To match all destination ports specify *.

       --network-ip-protocols=[IP_PROTOCOL,...]
          The IP protocols to match for this rule. Each element can be an 8-bit
          unsigned decimal number (e.g. "6"), range (e.g."253-254"), or one of
          the following protocol names: "tcp", "udp", "icmp", "esp", "ah",
          "ipip", or "sctp". To match all protocols specify *.

       --network-src-asns=[SRC_ASN,...]
          BGP Autonomous System Number associated with the source IP address to
          match for this rule.

       --network-src-ip-ranges=[SRC_IP_RANGE,...]
          The source IPs/IP ranges to match for this rule. To match all IPs
          specify *.

       --network-src-ports=[SRC_PORT,...]
          The source ports to match for this rule. Each element can be an
          16-bit unsigned decimal number (e.g. "80") or range (e.g."0-1023"),
          To match all source ports specify *.

       --network-src-region-codes=[SRC_REGION_CODE,...]
          The two letter ISO 3166-1 alpha-2 country code associated with the
          source IP address to match for this rule. To match all region codes
          specify *.

       --network-user-defined-fields=[NAME;VALUE:VALUE:...,...]
          Each element names a defined field and lists the matching values for
          that field.

       --src-ip-ranges=[SRC_IP_RANGE,...]
          The source IPs/IP ranges to match for this rule. To match all IPs
          specify *.

OPTIONAL FLAGS
     --ban-duration-sec=BAN_DURATION_SEC
        Can only be specified if the action for the rule is rate-based-ban. If
        specified, determines the time (in seconds) the traffic will continue
        to be banned by the rate limit after the rate falls below the
        threshold.

     --ban-threshold-count=BAN_THRESHOLD_COUNT
        Number of HTTP(S) requests for calculating the threshold for banning
        requests. Can only be specified if the action for the rule is
        rate-based-ban. If specified, the key will be banned for the configured
        BAN_DURATION_SEC when the number of requests that exceed the
        RATE_LIMIT_THRESHOLD_COUNT also exceed this BAN_THRESHOLD_COUNT.

     --ban-threshold-interval-sec=BAN_THRESHOLD_INTERVAL_SEC
        Interval over which the threshold for banning requests is computed. Can
        only be specified if the action for the rule is rate-based-ban. If
        specified, the key will be banned for the configured BAN_DURATION_SEC
        when the number of requests that exceed the RATE_LIMIT_THRESHOLD_COUNT
        also exceed this BAN_THRESHOLD_COUNT.

     --conform-action=CONFORM_ACTION
        Action to take when requests are under the given threshold. When
        requests are throttled, this is also the action for all requests which
        are not dropped. CONFORM_ACTION must be (only one value is supported):
        allow.

     --description=DESCRIPTION
        An optional, textual description for the rule.

     --enforce-on-key=ENFORCE_ON_KEY
        Different key types available to enforce the rate limit threshold limit
        on:
        * ip: each client IP address has this limit enforced separately
        * all: a single limit is applied to all requests matching this rule
        * http-header: key type takes the value of the HTTP header configured
          in enforce-on-key-name as the key value
        * xff-ip: takes the original IP address specified in the
          X-Forwarded-For header as the key
        * http-cookie: key type takes the value of the HTTP cookie configured
          in enforce-on-key-name as the key value
        * http-path: key type takes the value of the URL path in the request
        * sni: key type takes the value of the server name indication from
          the TLS session of the HTTPS request
        * region-code: key type takes the value of the region code from which
          the request originates
        * tls-ja3-fingerprint: key type takes the value of JA3 TLS/SSL
          fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3
        * user-ip: key type takes the IP address of the originating client,
          which is resolved based on user-ip-request-headers configured with
          the security policy
        * tls-ja4-fingerprint: key type takes the value of JA4 TLS/SSL
          fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3
        * asn: key type takes the value of the Autonomous System Number from
          which the request originates

        ENFORCE_ON_KEY must be one of: ip, all, http-header, xff-ip,
        http-cookie, http-path, sni, region-code, tls-ja3-fingerprint, user-ip,
        tls-ja4-fingerprint, asn.

     --enforce-on-key-configs=[[all],[ip],[xff-ip],[http-cookie=HTTP_COOKIE],[http-header=HTTP_HEADER],[http-path],[sni],[region-code],[tls-ja3-fingerprint],[user-ip],[tls-ja4-fingerprint],[asn]],[...]
        Specify up to 3 key type/name pairs to rate limit. Valid key types are:

        * ip: each client IP address has this limit enforced separately
        * all: a single limit is applied to all requests matching this rule
        * http-header: key type takes the value of the HTTP header configured
          in enforce-on-key-name as the key value
        * xff-ip: takes the original IP address specified in the
          X-Forwarded-For header as the key
        * http-cookie: key type takes the value of the HTTP cookie configured
          in enforce-on-key-name as the key value
        * http-path: key type takes the value of the URL path in the request
        * sni: key type takes the value of the server name indication from
          the TLS session of the HTTPS request
        * region-code: key type takes the value of the region code from which
          the request originates
        * tls-ja3-fingerprint: key type takes the value of JA3 TLS/SSL
          fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3
        * user-ip: key type takes the IP address of the originating client,
          which is resolved based on user-ip-request-headers configured with
          the security policy
        * tls-ja4-fingerprint: key type takes the value of JA4 TLS/SSL
          fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3
        * asn: key type takes the value of the Autonomous System Number from
          which the request originates

        Key names are only applicable to the following key types:
        * http-header: The name of the HTTP header whose value is taken as
          the key value.
        * http-cookie: The name of the HTTP cookie whose value is taken as
          the key value.

     --enforce-on-key-name=ENFORCE_ON_KEY_NAME
        Determines the key name for the rate limit key. Applicable only for the
        following rate limit key types:
        * http-header: The name of the HTTP header whose value is taken as
          the key value.
        * http-cookie: The name of the HTTP cookie whose value is taken as
          the key value.

     --exceed-action=EXCEED_ACTION
        Action to take when requests are above the given threshold. When a
        request is denied, return the specified HTTP response code. When a
        request is redirected, use the redirect options based on
        --exceed-redirect-type and --exceed-redirect-target below.
        EXCEED_ACTION must be one of: deny-403, deny-404, deny-429, deny-502,
        deny, redirect.

     --exceed-redirect-target=EXCEED_REDIRECT_TARGET
        URL target for the redirect action that is configured as the exceed
        action when the redirect type is external-302.

     --exceed-redirect-type=EXCEED_REDIRECT_TYPE
        Type for the redirect action that is configured as the exceed action.
        EXCEED_REDIRECT_TYPE must be one of: google-recaptcha, external-302.

     --preview
        If specified, the action will not be enforced.

     --rate-limit-threshold-count=RATE_LIMIT_THRESHOLD_COUNT
        Number of HTTP(S) requests for calculating the threshold for rate
        limiting requests.

     --rate-limit-threshold-interval-sec=RATE_LIMIT_THRESHOLD_INTERVAL_SEC
        Interval over which the threshold for rate limiting requests is
        computed.

     --recaptcha-action-site-keys=[SITE_KEY,...]
        A comma-separated list of site keys to be used during the validation of
        reCAPTCHA action-tokens. The provided site keys need to be created from
        the reCAPTCHA API under the same project where the security policy is
        created.

     --recaptcha-session-site-keys=[SITE_KEY,...]
        A comma-separated list of site keys to be used during the validation of
        reCAPTCHA session-tokens. The provided site keys need to be created
        from the reCAPTCHA API under the same project where the security policy
        is created.

     --redirect-target=REDIRECT_TARGET
        URL target for the redirect action. Must be specified if the redirect
        type is external-302. Cannot be specified if the redirect type is
        google-recaptcha.

     --redirect-type=REDIRECT_TYPE
        Type for the redirect action. Default to external-302 if unspecified
        while --redirect-target is given. REDIRECT_TYPE must be one of:
        google-recaptcha, external-302.

     --region=REGION
        Region of the security policy to add. If not specified, you might be
        prompted to select a region (interactive mode only).

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        Overrides the default compute/region property value for this command
        invocation.

     --request-headers-to-add=[REQUEST_HEADERS_TO_ADD,...]
        A comma-separated list of header names and header values to add to
        requests that match this rule.

     --security-policy=SECURITY_POLICY
        The security policy that this rule belongs to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute security-policies rules create

        $ gcloud beta compute security-policies rules create
```

### gcloud compute security-policies rules delete

```text
NAME
    gcloud compute security-policies rules delete - delete Compute Engine
        security policy rules

SYNOPSIS
    gcloud compute security-policies rules delete [PRIORITY ...]
        [--region=REGION] [--security-policy=SECURITY_POLICY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies rules delete is used to delete security
    policy rules.

EXAMPLES
    To delete the rule at priority 1000, run:

        $ gcloud compute security-policies rules delete 1000 \
            --security-policy=my-policy

POSITIONAL ARGUMENTS
     [PRIORITY ...]
        The priority of the rules to delete. Rules are evaluated in order from
        highest priority to lowest priority where 0 is the highest priority and
        2147483647 is the lowest priority.

FLAGS
     --region=REGION
        Region of the security policy to delete. If not specified, you might be
        prompted to select a region (interactive mode only).

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        Overrides the default compute/region property value for this command
        invocation.

     --security-policy=SECURITY_POLICY
        The security policy that this rule belongs to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute security-policies rules delete

        $ gcloud beta compute security-policies rules delete
```

### gcloud compute security-policies rules describe

```text
NAME
    gcloud compute security-policies rules describe - describe a Compute Engine
        security policy rule

SYNOPSIS
    gcloud compute security-policies rules describe PRIORITY [--region=REGION]
        [--security-policy=SECURITY_POLICY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies rules describe displays all data
    associated with a security policy rule.

EXAMPLES
    To describe the rule at priority 1000, run:

        $ gcloud compute security-policies rules describe 1000 \
            --security-policy=my-policy

POSITIONAL ARGUMENTS
     PRIORITY
        The priority of the rule to describe. Rules are evaluated in order from
        highest priority to lowest priority where 0 is the highest priority and
        2147483647 is the lowest priority.

FLAGS
     --region=REGION
        Region of the security policy to describe. If not specified, you might
        be prompted to select a region (interactive mode only).

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        Overrides the default compute/region property value for this command
        invocation.

     --security-policy=SECURITY_POLICY
        The security policy that this rule belongs to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute security-policies rules describe

        $ gcloud beta compute security-policies rules describe
```

### gcloud compute security-policies rules remove-preconfig-waf-exclusion

```text
NAME
    gcloud compute security-policies rules remove-preconfig-waf-exclusion -
        remove an exclusion configuration for preconfigured WAF evaluation from
        a security policy rule

SYNOPSIS
    gcloud compute security-policies rules remove-preconfig-waf-exclusion
        PRIORITY --target-rule-set=TARGET_RULE_SET [--region=REGION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--security-policy=SECURITY_POLICY] [--target-rule-ids=[RULE_ID,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies rules remove-preconfig-waf-exclusion is
    used to remove an exclusion configuration for preconfigured WAF evaluation
    from a security policy rule.

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

        $ gcloud compute security-policies rules \
            remove-preconfig-waf-exclusion 1000 \
            --security-policy=my-policy --target-rule-set=sqli-stable \
            --target-rule-ids=owasp-crs-v030001-id942110-sqli,\
        owasp-crs-v030001-id942120-sqli \
            --request-header-to-exclude=op=EQUALS,val=abc \
            --request-header-to-exclude=op=STARTS_WITH,val=xyz \
            --request-uri-to-exclude=op=EQUALS_ANY \
            --request-body-to-exclude=op=CONTAINS,val=bad_data

    To remove all the request field exclusions that are associated with the
    target of 'sqli-stable': ['owasp-crs-v030001-id942110-sqli',
    'owasp-crs-v030001-id942120-sqli'], run:

        $ gcloud compute security-policies rules \
            remove-preconfig-waf-exclusion 1000 \
            --security-policy=my-policy --target-rule-set=sqli-stable \
            --target-rule-ids=owasp-crs-v030001-id942110-sqli,\
        owasp-crs-v030001-id942120-sqli

    To remove all the request field exclusions that are associated with the
    target of 'sqli-stable': [], run:

        $ gcloud compute security-policies rules \
            remove-preconfig-waf-exclusion 1000 \
            --security-policy=my-policy --target-rule-set=sqli-stable

    To remove all the request field exclusions that are configured under the
    security policy rule, regardless of the target, run:

        $ gcloud compute security-policies rules \
            remove-preconfig-waf-exclusion 1000 \
            --security-policy=my-policy --target-rule-set=*

POSITIONAL ARGUMENTS
     PRIORITY
        The priority of the rule to remove the exclusion configuration for
        preconfigured WAF evaluation. Rules are evaluated in order from highest
        priority to lowest priority where 0 is the highest priority and
        2147483647 is the lowest priority.

REQUIRED FLAGS
     --target-rule-set=TARGET_RULE_SET
        Target WAF rule set from where to remove the request field exclusions.

        This, together with the target rule IDs (if given), determines the
        target for associating request field exclusions. See --target-rule-ids.

        Note that the removal of request field exclusions is restricted to
        those associated with a matching target. Set this flag to * if you want
        to remove request field exclusions regardless of the target.

OPTIONAL FLAGS
     --region=REGION
        Region of the security policy to remove the exclusion configuration for
        preconfigured WAF evaluation. If not specified, you might be prompted
        to select a region (interactive mode only).

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        Overrides the default compute/region property value for this command
        invocation.

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

     --security-policy=SECURITY_POLICY
        The security policy that this rule belongs to.

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

        $ gcloud alpha compute security-policies rules \
            remove-preconfig-waf-exclusion

        $ gcloud beta compute security-policies rules \
            remove-preconfig-waf-exclusion
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute security-policies rules remove-preconfig-waf-exclusion 1000 \
    --security-policy=my-policy \
    --target-rule-set=sqli-stable \
    --target-rule-ids=owasp-crs-v030001-id942110-sqli,owasp-crs-v030001-id942120-sqli \
    --request-header-to-exclude=op=EQUALS,val=abc \
    --request-header-to-exclude=op=STARTS_WITH,val=xyz \
    --request-uri-to-exclude=op=EQUALS_ANY \
    --request-body-to-exclude=op=CONTAINS,val=bad_data

gcloud compute security-policies rules remove-preconfig-waf-exclusion 1000 \
    --security-policy=my-policy \
    --target-rule-set=sqli-stable \
    --target-rule-ids=owasp-crs-v030001-id942110-sqli,owasp-crs-v030001-id942120-sqli
```

### gcloud compute security-policies rules update

```text
NAME
    gcloud compute security-policies rules update - update a Compute Engine
        security policy rule

SYNOPSIS
    gcloud compute security-policies rules update PRIORITY [--action=ACTION]
        [--ban-duration-sec=BAN_DURATION_SEC]
        [--ban-threshold-count=BAN_THRESHOLD_COUNT]
        [--ban-threshold-interval-sec=BAN_THRESHOLD_INTERVAL_SEC]
        [--conform-action=CONFORM_ACTION] [--description=DESCRIPTION]
        [--enforce-on-key=ENFORCE_ON_KEY]
        [--enforce-on-key-configs=[[all],[ip],[xff-ip],
          [http-cookie=HTTP_COOKIE],[http-header=HTTP_HEADER],[http-path],[sni],
          [region-code],
          [tls-ja3-fingerprint],[user-ip],[tls-ja4-fingerprint],[asn]],[...]]
        [--enforce-on-key-name=ENFORCE_ON_KEY_NAME]
        [--exceed-action=EXCEED_ACTION]
        [--exceed-redirect-target=EXCEED_REDIRECT_TARGET]
        [--exceed-redirect-type=EXCEED_REDIRECT_TYPE] [--[no-]preview]
        [--rate-limit-threshold-count=RATE_LIMIT_THRESHOLD_COUNT]
        [--rate-limit-threshold-interval-sec=RATE_LIMIT_THRESHOLD_INTERVAL_SEC]
        [--recaptcha-action-site-keys=[SITE_KEY,...]]
        [--recaptcha-session-site-keys=[SITE_KEY,...]]
        [--redirect-target=REDIRECT_TARGET] [--redirect-type=REDIRECT_TYPE]
        [--region=REGION]
        [--request-headers-to-add=[REQUEST_HEADERS_TO_ADD,...]]
        [--security-policy=SECURITY_POLICY]
        [--expression=EXPRESSION --network-dest-ip-ranges=[DEST_IP_RANGE,...]
          --network-dest-ports=[DEST_PORT,...]
          --network-ip-protocols=[IP_PROTOCOL,...]
          --network-src-asns=[SRC_ASN,...]
          --network-src-ip-ranges=[SRC_IP_RANGE,...]
          --network-src-ports=[SRC_PORT,...]
          --network-src-region-codes=[SRC_REGION_CODE,...]
          --network-user-defined-fields=[NAME;VALUE:VALUE:...,...]
          --src-ip-ranges=[SRC_IP_RANGE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies rules update is used to update security
    policy rules.

EXAMPLES
    To update the description and IP ranges of a rule at priority 1000, run:

        $ gcloud compute security-policies rules update 1000 \
            --security-policy=my-policy --description="block 1.2.3.4/32" \
            --src-ip-ranges=1.2.3.4/32

POSITIONAL ARGUMENTS
     PRIORITY
        The priority of the rule to update. Rules are evaluated in order from
        highest priority to lowest priority where 0 is the highest priority and
        2147483647 is the lowest priority.

FLAGS
     --action=ACTION
        The action to take if the request matches the match condition. ACTION
        must be one of:

         allow
            Allows the request from HTTP(S) Load Balancing.
         deny
            Denies the request from TCP/SSL Proxy and Network Load Balancing.
         deny-403
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 403.
         deny-404
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 404.
         deny-502
            Denies the request from HTTP(S) Load Balancing, with an HTTP
            response status code of 502.
         rate-based-ban
            Enforces rate-based ban action from HTTP(S) Load Balancing, based
            on rate limit options.
         redirect
            Redirects the request from HTTP(S) Load Balancing, based on
            redirect options.
         redirect-to-recaptcha
            (DEPRECATED) Redirects the request from HTTP(S) Load Balancing, for
            reCAPTCHA Enterprise assessment. This flag choice is deprecated.
            Use --action=redirect and --redirect-type=google-recaptcha instead.
         throttle
            Enforces throttle action from HTTP(S) Load Balancing, based on rate
            limit options.

     --ban-duration-sec=BAN_DURATION_SEC
        Can only be specified if the action for the rule is rate-based-ban. If
        specified, determines the time (in seconds) the traffic will continue
        to be banned by the rate limit after the rate falls below the
        threshold.

     --ban-threshold-count=BAN_THRESHOLD_COUNT
        Number of HTTP(S) requests for calculating the threshold for banning
        requests. Can only be specified if the action for the rule is
        rate-based-ban. If specified, the key will be banned for the configured
        BAN_DURATION_SEC when the number of requests that exceed the
        RATE_LIMIT_THRESHOLD_COUNT also exceed this BAN_THRESHOLD_COUNT.

     --ban-threshold-interval-sec=BAN_THRESHOLD_INTERVAL_SEC
        Interval over which the threshold for banning requests is computed. Can
        only be specified if the action for the rule is rate-based-ban. If
        specified, the key will be banned for the configured BAN_DURATION_SEC
        when the number of requests that exceed the RATE_LIMIT_THRESHOLD_COUNT
        also exceed this BAN_THRESHOLD_COUNT.

     --conform-action=CONFORM_ACTION
        Action to take when requests are under the given threshold. When
        requests are throttled, this is also the action for all requests which
        are not dropped. CONFORM_ACTION must be (only one value is supported):
        allow.

     --description=DESCRIPTION
        An optional, textual description for the rule.

     --enforce-on-key=ENFORCE_ON_KEY
        Different key types available to enforce the rate limit threshold limit
        on:
        * ip: each client IP address has this limit enforced separately
        * all: a single limit is applied to all requests matching this rule
        * http-header: key type takes the value of the HTTP header configured
          in enforce-on-key-name as the key value
        * xff-ip: takes the original IP address specified in the
          X-Forwarded-For header as the key
        * http-cookie: key type takes the value of the HTTP cookie configured
          in enforce-on-key-name as the key value
        * http-path: key type takes the value of the URL path in the request
        * sni: key type takes the value of the server name indication from
          the TLS session of the HTTPS request
        * region-code: key type takes the value of the region code from which
          the request originates
        * tls-ja3-fingerprint: key type takes the value of JA3 TLS/SSL
          fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3
        * user-ip: key type takes the IP address of the originating client,
          which is resolved based on user-ip-request-headers configured with
          the security policy
        * tls-ja4-fingerprint: key type takes the value of JA4 TLS/SSL
          fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3
        * asn: key type takes the value of the Autonomous System Number from
          which the request originates

        ENFORCE_ON_KEY must be one of: ip, all, http-header, xff-ip,
        http-cookie, http-path, sni, region-code, tls-ja3-fingerprint, user-ip,
        tls-ja4-fingerprint, asn.

     --enforce-on-key-configs=[[all],[ip],[xff-ip],[http-cookie=HTTP_COOKIE],[http-header=HTTP_HEADER],[http-path],[sni],[region-code],[tls-ja3-fingerprint],[user-ip],[tls-ja4-fingerprint],[asn]],[...]
        Specify up to 3 key type/name pairs to rate limit. Valid key types are:

        * ip: each client IP address has this limit enforced separately
        * all: a single limit is applied to all requests matching this rule
        * http-header: key type takes the value of the HTTP header configured
          in enforce-on-key-name as the key value
        * xff-ip: takes the original IP address specified in the
          X-Forwarded-For header as the key
        * http-cookie: key type takes the value of the HTTP cookie configured
          in enforce-on-key-name as the key value
        * http-path: key type takes the value of the URL path in the request
        * sni: key type takes the value of the server name indication from
          the TLS session of the HTTPS request
        * region-code: key type takes the value of the region code from which
          the request originates
        * tls-ja3-fingerprint: key type takes the value of JA3 TLS/SSL
          fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3
        * user-ip: key type takes the IP address of the originating client,
          which is resolved based on user-ip-request-headers configured with
          the security policy
        * tls-ja4-fingerprint: key type takes the value of JA4 TLS/SSL
          fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3
        * asn: key type takes the value of the Autonomous System Number from
          which the request originates

        Key names are only applicable to the following key types:
        * http-header: The name of the HTTP header whose value is taken as
          the key value.
        * http-cookie: The name of the HTTP cookie whose value is taken as
          the key value.

     --enforce-on-key-name=ENFORCE_ON_KEY_NAME
        Determines the key name for the rate limit key. Applicable only for the
        following rate limit key types:
        * http-header: The name of the HTTP header whose value is taken as
          the key value.
        * http-cookie: The name of the HTTP cookie whose value is taken as
          the key value.

     --exceed-action=EXCEED_ACTION
        Action to take when requests are above the given threshold. When a
        request is denied, return the specified HTTP response code. When a
        request is redirected, use the redirect options based on
        --exceed-redirect-type and --exceed-redirect-target below.
        EXCEED_ACTION must be one of: deny-403, deny-404, deny-429, deny-502,
        deny, redirect.

     --exceed-redirect-target=EXCEED_REDIRECT_TARGET
        URL target for the redirect action that is configured as the exceed
        action when the redirect type is external-302.

     --exceed-redirect-type=EXCEED_REDIRECT_TYPE
        Type for the redirect action that is configured as the exceed action.
        EXCEED_REDIRECT_TYPE must be one of: google-recaptcha, external-302.

     --[no-]preview
        If specified, the action will not be enforced. Use --preview to enable
        and --no-preview to disable.

     --rate-limit-threshold-count=RATE_LIMIT_THRESHOLD_COUNT
        Number of HTTP(S) requests for calculating the threshold for rate
        limiting requests.

     --rate-limit-threshold-interval-sec=RATE_LIMIT_THRESHOLD_INTERVAL_SEC
        Interval over which the threshold for rate limiting requests is
        computed.

     --recaptcha-action-site-keys=[SITE_KEY,...]
        A comma-separated list of site keys to be used during the validation of
        reCAPTCHA action-tokens. The provided site keys need to be created from
        the reCAPTCHA API under the same project where the security policy is
        created.

     --recaptcha-session-site-keys=[SITE_KEY,...]
        A comma-separated list of site keys to be used during the validation of
        reCAPTCHA session-tokens. The provided site keys need to be created
        from the reCAPTCHA API under the same project where the security policy
        is created.

     --redirect-target=REDIRECT_TARGET
        URL target for the redirect action. Must be specified if the redirect
        type is external-302. Cannot be specified if the redirect type is
        google-recaptcha.

     --redirect-type=REDIRECT_TYPE
        Type for the redirect action. Default to external-302 if unspecified
        while --redirect-target is given. REDIRECT_TYPE must be one of:
        google-recaptcha, external-302.

     --region=REGION
        Region of the security policy to update. If not specified, you might be
        prompted to select a region (interactive mode only).

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        Overrides the default compute/region property value for this command
        invocation.

     --request-headers-to-add=[REQUEST_HEADERS_TO_ADD,...]
        A comma-separated list of header names and header values to add to
        requests that match this rule.

     --security-policy=SECURITY_POLICY
        The security policy that this rule belongs to.

     Security policy rule matcher.

     --expression=EXPRESSION
        The Cloud Armor rules language expression to match for this rule.

     --network-dest-ip-ranges=[DEST_IP_RANGE,...]
        The destination IPs/IP ranges to match for this rule. To match all IPs
        specify *.

     --network-dest-ports=[DEST_PORT,...]
        The destination ports to match for this rule. Each element can be an
        16-bit unsigned decimal number (e.g. "80") or range (e.g."0-1023"), To
        match all destination ports specify *.

     --network-ip-protocols=[IP_PROTOCOL,...]
        The IP protocols to match for this rule. Each element can be an 8-bit
        unsigned decimal number (e.g. "6"), range (e.g."253-254"), or one of
        the following protocol names: "tcp", "udp", "icmp", "esp", "ah",
        "ipip", or "sctp". To match all protocols specify *.

     --network-src-asns=[SRC_ASN,...]
        BGP Autonomous System Number associated with the source IP address to
        match for this rule.

     --network-src-ip-ranges=[SRC_IP_RANGE,...]
        The source IPs/IP ranges to match for this rule. To match all IPs
        specify *.

     --network-src-ports=[SRC_PORT,...]
        The source ports to match for this rule. Each element can be an 16-bit
        unsigned decimal number (e.g. "80") or range (e.g."0-1023"), To match
        all source ports specify *.

     --network-src-region-codes=[SRC_REGION_CODE,...]
        The two letter ISO 3166-1 alpha-2 country code associated with the
        source IP address to match for this rule. To match all region codes
        specify *.

     --network-user-defined-fields=[NAME;VALUE:VALUE:...,...]
        Each element names a defined field and lists the matching values for
        that field.

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

        $ gcloud alpha compute security-policies rules update

        $ gcloud beta compute security-policies rules update
```

### gcloud beta compute security-policies rules add-preconfig-waf-exclusion

```text
NAME
    gcloud beta compute security-policies rules add-preconfig-waf-exclusion -
        add an exclusion configuration for preconfigured WAF evaluation into a
        security policy rule

SYNOPSIS
    gcloud beta compute security-policies rules add-preconfig-waf-exclusion
        PRIORITY --target-rule-set=TARGET_RULE_SET [--region=REGION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--security-policy=SECURITY_POLICY] [--target-rule-ids=[RULE_ID,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute security-policies rules create

```text
NAME
    gcloud beta compute security-policies rules create - create a Compute
        Engine security policy rule

SYNOPSIS
    gcloud beta compute security-policies rules create PRIORITY --action=ACTION
        (--expression=EXPRESSION --network-dest-ip-ranges=[DEST_IP_RANGE,...]
          --network-dest-ports=[DEST_PORT,...]
          --network-ip-protocols=[IP_PROTOCOL,...]
          --network-src-asns=[SRC_ASN,...]
          --network-src-ip-ranges=[SRC_IP_RANGE,...]
          --network-src-ports=[SRC_PORT,...]
          --network-src-region-codes=[SRC_REGION_CODE,...]
          --network-user-defined-fields=[NAME;VALUE:VALUE:...,...]
          --src-ip-ranges=[SRC_IP_RANGE,...])
        [--ban-duration-sec=BAN_DURATION_SEC]
        [--ban-threshold-count=BAN_THRESHOLD_COUNT]
        [--ban-threshold-interval-sec=BAN_THRESHOLD_INTERVAL_SEC]
        [--conform-action=CONFORM_ACTION] [--description=DESCRIPTION]
        [--enforce-on-key=ENFORCE_ON_KEY]
        [--enforce-on-key-configs=[[all],[ip],[xff-ip],
          [http-cookie=HTTP_COOKIE],[http-header=HTTP_HEADER],[http-path],[sni],
          [region-code],
          [tls-ja3-fingerprint],[user-ip],[tls-ja4-fingerprint],[asn]],[...]]
        [--enforce-on-key-name=ENFORCE_ON_KEY_NAME]
        [--exceed-action=EXCEED_ACTION]
        [--exceed-redirect-target=EXCEED_REDIRECT_TARGET]
        [--exceed-redirect-type=EXCEED_REDIRECT_TYPE] [--preview]
        [--rate-limit-threshold-count=RATE_LIMIT_THRESHOLD_COUNT]
        [--rate-limit-threshold-interval-sec=RATE_LIMIT_THRESHOLD_INTERVAL_SEC]
        [--recaptcha-action-site-keys=[SITE_KEY,...]]
        [--recaptcha-session-site-keys=[SITE_KEY,...]]
        [--redirect-target=REDIRECT_TARGET] [--redirect-type=REDIRECT_TYPE]
        [--region=REGION]
        [--request-headers-to-add=[REQUEST_HEADERS_TO_ADD,...]]
        [--security-policy=SECURITY_POLICY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute security-policies rules delete

```text
NAME
    gcloud beta compute security-policies rules delete - delete Compute Engine
        security policy rules

SYNOPSIS
    gcloud beta compute security-policies rules delete [PRIORITY ...]
        [--region=REGION] [--security-policy=SECURITY_POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute security-policies rules describe

```text
NAME
    gcloud beta compute security-policies rules describe - describe a Compute
        Engine security policy rule

SYNOPSIS
    gcloud beta compute security-policies rules describe PRIORITY
        [--region=REGION] [--security-policy=SECURITY_POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute security-policies rules remove-preconfig-waf-exclusion

```text
NAME
    gcloud beta compute security-policies rules remove-preconfig-waf-exclusion
        - remove an exclusion configuration for preconfigured WAF evaluation
        from a security policy rule

SYNOPSIS
    gcloud beta compute security-policies rules remove-preconfig-waf-exclusion
        PRIORITY --target-rule-set=TARGET_RULE_SET [--region=REGION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--security-policy=SECURITY_POLICY] [--target-rule-ids=[RULE_ID,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute security-policies rules update

```text
NAME
    gcloud beta compute security-policies rules update - update a Compute
        Engine security policy rule

SYNOPSIS
    gcloud beta compute security-policies rules update PRIORITY
        [--action=ACTION] [--ban-duration-sec=BAN_DURATION_SEC]
        [--ban-threshold-count=BAN_THRESHOLD_COUNT]
        [--ban-threshold-interval-sec=BAN_THRESHOLD_INTERVAL_SEC]
        [--conform-action=CONFORM_ACTION] [--description=DESCRIPTION]
        [--enforce-on-key=ENFORCE_ON_KEY]
        [--enforce-on-key-configs=[[all],[ip],[xff-ip],
          [http-cookie=HTTP_COOKIE],[http-header=HTTP_HEADER],[http-path],[sni],
          [region-code],
          [tls-ja3-fingerprint],[user-ip],[tls-ja4-fingerprint],[asn]],[...]]
        [--enforce-on-key-name=ENFORCE_ON_KEY_NAME]
        [--exceed-action=EXCEED_ACTION]
        [--exceed-redirect-target=EXCEED_REDIRECT_TARGET]
        [--exceed-redirect-type=EXCEED_REDIRECT_TYPE] [--[no-]preview]
        [--rate-limit-threshold-count=RATE_LIMIT_THRESHOLD_COUNT]
        [--rate-limit-threshold-interval-sec=RATE_LIMIT_THRESHOLD_INTERVAL_SEC]
        [--recaptcha-action-site-keys=[SITE_KEY,...]]
        [--recaptcha-session-site-keys=[SITE_KEY,...]]
        [--redirect-target=REDIRECT_TARGET] [--redirect-type=REDIRECT_TYPE]
        [--region=REGION]
        [--request-headers-to-add=[REQUEST_HEADERS_TO_ADD,...]]
        [--security-policy=SECURITY_POLICY]
        [--expression=EXPRESSION --network-dest-ip-ranges=[DEST_IP_RANGE,...]
          --network-dest-ports=[DEST_PORT,...]
          --network-ip-protocols=[IP_PROTOCOL,...]
          --network-src-asns=[SRC_ASN,...]
          --network-src-ip-ranges=[SRC_IP_RANGE,...]
          --network-src-ports=[SRC_PORT,...]
          --network-src-region-codes=[SRC_REGION_CODE,...]
          --network-user-defined-fields=[NAME;VALUE:VALUE:...,...]
          --src-ip-ranges=[SRC_IP_RANGE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies rules add-preconfig-waf-exclusion

```text
NAME
    gcloud alpha compute security-policies rules add-preconfig-waf-exclusion -
        add an exclusion configuration for preconfigured WAF evaluation into a
        security policy rule

SYNOPSIS
    gcloud alpha compute security-policies rules add-preconfig-waf-exclusion
        PRIORITY --target-rule-set=TARGET_RULE_SET [--region=REGION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--security-policy=SECURITY_POLICY] [--target-rule-ids=[RULE_ID,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies rules create

```text
NAME
    gcloud alpha compute security-policies rules create - create a Compute
        Engine security policy rule

SYNOPSIS
    gcloud alpha compute security-policies rules create PRIORITY
        --action=ACTION
        (--expression=EXPRESSION --network-dest-ip-ranges=[DEST_IP_RANGE,...]
          --network-dest-ports=[DEST_PORT,...]
          --network-ip-protocols=[IP_PROTOCOL,...]
          --network-src-asns=[SRC_ASN,...]
          --network-src-ip-ranges=[SRC_IP_RANGE,...]
          --network-src-ports=[SRC_PORT,...]
          --network-src-region-codes=[SRC_REGION_CODE,...]
          --network-user-defined-fields=[NAME;VALUE:VALUE:...,...]
          --src-ip-ranges=[SRC_IP_RANGE,...])
        [--ban-duration-sec=BAN_DURATION_SEC]
        [--ban-threshold-count=BAN_THRESHOLD_COUNT]
        [--ban-threshold-interval-sec=BAN_THRESHOLD_INTERVAL_SEC]
        [--conform-action=CONFORM_ACTION] [--description=DESCRIPTION]
        [--enforce-on-key=ENFORCE_ON_KEY]
        [--enforce-on-key-configs=[[all],[ip],[xff-ip],
          [http-cookie=HTTP_COOKIE],[http-header=HTTP_HEADER],[http-path],[sni],
          [region-code],
          [tls-ja3-fingerprint],[user-ip],[tls-ja4-fingerprint],[asn]],[...]]
        [--enforce-on-key-name=ENFORCE_ON_KEY_NAME]
        [--exceed-action=EXCEED_ACTION]
        [--exceed-action-rpc-status-code=EXCEED_ACTION_RPC_STATUS_CODE]
        [--exceed-action-rpc-status-message=EXCEED_ACTION_RPC_STATUS_MESSAGE]
        [--exceed-redirect-target=EXCEED_REDIRECT_TARGET]
        [--exceed-redirect-type=EXCEED_REDIRECT_TYPE] [--preview]
        [--rate-limit-threshold-count=RATE_LIMIT_THRESHOLD_COUNT]
        [--rate-limit-threshold-interval-sec=RATE_LIMIT_THRESHOLD_INTERVAL_SEC]
        [--recaptcha-action-site-keys=[SITE_KEY,...]]
        [--recaptcha-session-site-keys=[SITE_KEY,...]]
        [--redirect-target=REDIRECT_TARGET] [--redirect-type=REDIRECT_TYPE]
        [--region=REGION]
        [--request-headers-to-add=[REQUEST_HEADERS_TO_ADD,...]]
        [--security-policy=SECURITY_POLICY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies rules delete

```text
NAME
    gcloud alpha compute security-policies rules delete - delete Compute Engine
        security policy rules

SYNOPSIS
    gcloud alpha compute security-policies rules delete [PRIORITY ...]
        [--region=REGION] [--security-policy=SECURITY_POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies rules describe

```text
NAME
    gcloud alpha compute security-policies rules describe - describe a Compute
        Engine security policy rule

SYNOPSIS
    gcloud alpha compute security-policies rules describe PRIORITY
        [--region=REGION] [--security-policy=SECURITY_POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies rules remove-preconfig-waf-exclusion

```text
NAME
    gcloud alpha compute security-policies rules remove-preconfig-waf-exclusion
        - remove an exclusion configuration for preconfigured WAF evaluation
        from a security policy rule

SYNOPSIS
    gcloud alpha compute security-policies rules remove-preconfig-waf-exclusion
        PRIORITY --target-rule-set=TARGET_RULE_SET [--region=REGION]
        [--request-body-to-exclude=[op=OP],[val=VAL]]
        [--request-cookie-to-exclude=[op=OP],[val=VAL]]
        [--request-header-to-exclude=[op=OP],[val=VAL]]
        [--request-query-param-to-exclude=[op=OP],[val=VAL]]
        [--request-uri-to-exclude=[op=OP],[val=VAL]]
        [--security-policy=SECURITY_POLICY] [--target-rule-ids=[RULE_ID,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies rules update

```text
NAME
    gcloud alpha compute security-policies rules update - update a Compute
        Engine security policy rule

SYNOPSIS
    gcloud alpha compute security-policies rules update PRIORITY
        [--action=ACTION] [--ban-duration-sec=BAN_DURATION_SEC]
        [--ban-threshold-count=BAN_THRESHOLD_COUNT]
        [--ban-threshold-interval-sec=BAN_THRESHOLD_INTERVAL_SEC]
        [--conform-action=CONFORM_ACTION] [--description=DESCRIPTION]
        [--enforce-on-key=ENFORCE_ON_KEY]
        [--enforce-on-key-configs=[[all],[ip],[xff-ip],
          [http-cookie=HTTP_COOKIE],[http-header=HTTP_HEADER],[http-path],[sni],
          [region-code],
          [tls-ja3-fingerprint],[user-ip],[tls-ja4-fingerprint],[asn]],[...]]
        [--enforce-on-key-name=ENFORCE_ON_KEY_NAME]
        [--exceed-action=EXCEED_ACTION]
        [--exceed-action-rpc-status-code=EXCEED_ACTION_RPC_STATUS_CODE]
        [--exceed-action-rpc-status-message=EXCEED_ACTION_RPC_STATUS_MESSAGE]
        [--exceed-redirect-target=EXCEED_REDIRECT_TARGET]
        [--exceed-redirect-type=EXCEED_REDIRECT_TYPE] [--[no-]preview]
        [--rate-limit-threshold-count=RATE_LIMIT_THRESHOLD_COUNT]
        [--rate-limit-threshold-interval-sec=RATE_LIMIT_THRESHOLD_INTERVAL_SEC]
        [--recaptcha-action-site-keys=[SITE_KEY,...]]
        [--recaptcha-session-site-keys=[SITE_KEY,...]]
        [--redirect-target=REDIRECT_TARGET] [--redirect-type=REDIRECT_TYPE]
        [--region=REGION]
        [--request-headers-to-add=[REQUEST_HEADERS_TO_ADD,...]]
        [--security-policy=SECURITY_POLICY]
        [--expression=EXPRESSION --network-dest-ip-ranges=[DEST_IP_RANGE,...]
          --network-dest-ports=[DEST_PORT,...]
          --network-ip-protocols=[IP_PROTOCOL,...]
          --network-src-asns=[SRC_ASN,...]
          --network-src-ip-ranges=[SRC_IP_RANGE,...]
          --network-src-ports=[SRC_PORT,...]
          --network-src-region-codes=[SRC_REGION_CODE,...]
          --network-user-defined-fields=[NAME;VALUE:VALUE:...,...]
          --src-ip-ranges=[SRC_IP_RANGE,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute security-policies rules create --action redirect-to-recaptcha`: "(DEPRECATED) Redirects the request from HTTP(S) Load Balancing, for reCAPTCHA Enterprise assessment. This flag choice is deprecated. Use --action=redirect and --redirect-type=google-recaptcha instead."; `gcloud compute security-policies rules update --action redirect-to-recaptcha`: "(DEPRECATED) Redirects the request from HTTP(S) Load Balancing, for reCAPTCHA Enterprise assessment. This flag choice is deprecated. Use --action=redirect and --redirect-type=google-recaptcha instead.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
