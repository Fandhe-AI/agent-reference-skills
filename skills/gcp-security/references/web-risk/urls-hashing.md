---
source: https://docs.cloud.google.com/web-risk/docs/urls-hashing
---

# Hashing URLs

To check a URL against a Web Risk list (locally or on the server) the Update API client computes the hash prefix of the URL: canonicalize, create suffix/prefix expressions, compute full-length SHA256 hashes, take the hash prefix. These steps mirror how the server maintains the lists.

## Signature / Usage

### Canonicalization test cases

```text
Canonicalize("http://host/%25%32%35") = "http://host/%25";
Canonicalize("http://host/%25%32%35%25%32%35") = "http://host/%25%25";
Canonicalize("http://host/%2525252525252525") = "http://host/%25";
Canonicalize("http://host/asdf%25%32%35asd") = "http://host/asdf%25asd";
Canonicalize("http://host/%%%25%32%35asd%%") = "http://host/%25%25%25asd%25%25";
Canonicalize("http://www.google.com/") = "http://www.google.com/";
Canonicalize("http://%31%36%38%2e%31%38%38%2e%39%39%2e%32%36/%2E%73%65%63%75%72%65/%77%77%77%2E%65%62%61%79%2E%63%6F%6D/") = "http://168.188.99.26/.secure/www.ebay.com/";
Canonicalize("http://195.127.0.11/uploads/%20%20%20%20/.verify/.eBaysecure=updateuserdataxplimnbqmn-xplmvalidateinfoswqpcmlx=hgplmcx/") = "http://195.127.0.11/uploads/%20%20%20%20/.verify/.eBaysecure=updateuserdataxplimnbqmn-xplmvalidateinfoswqpcmlx=hgplmcx/";
Canonicalize("http://host%23.com/%257Ea%2521b%2540c%2523d%2524e%25f%255E00%252611%252A22%252833%252944_55%252B") = "http://host%23.com/~a!b@c%23d$e%25f^00&11*22(33)44_55+";
Canonicalize("http://3279880203/blah") = "http://195.127.0.11/blah";
Canonicalize("http://www.google.com/blah/..") = "http://www.google.com/";
Canonicalize("www.google.com/") = "http://www.google.com/";
Canonicalize("www.google.com") = "http://www.google.com/";
Canonicalize("http://www.evil.com/blah#frag") = "http://www.evil.com/blah";
Canonicalize("http://www.GOOgle.com/") = "http://www.google.com/";
Canonicalize("http://www.google.com.../") = "http://www.google.com/";
Canonicalize("http://www.google.com/foo\tbar\rbaz\n2") ="http://www.google.com/foobarbaz2";
Canonicalize("http://www.google.com/q?") = "http://www.google.com/q?";
Canonicalize("http://www.google.com/q?r?") = "http://www.google.com/q?r?";
Canonicalize("http://www.google.com/q?r?s") = "http://www.google.com/q?r?s";
Canonicalize("http://evil.com/foo#bar#baz") = "http://evil.com/foo";
Canonicalize("http://evil.com/foo;") = "http://evil.com/foo;";
Canonicalize("http://evil.com/foo?bar;") = "http://evil.com/foo?bar;";
Canonicalize("http://\x01\x80.com/") = "http://%01%80.com/";
Canonicalize("http://notrailingslash.com") = "http://notrailingslash.com/";
Canonicalize("http://www.gotaport.com:1234/") = "http://www.gotaport.com/";
Canonicalize("  http://www.google.com/  ") = "http://www.google.com/";
Canonicalize("http:// leadingspace.com/") = "http://%20leadingspace.com/";
Canonicalize("http://%20leadingspace.com/") = "http://%20leadingspace.com/";
Canonicalize("%20leadingspace.com/") = "http://%20leadingspace.com/";
Canonicalize("https://www.securesite.com/") = "https://www.securesite.com/";
Canonicalize("http://host.com/ab%23cd") = "http://host.com/ab%23cd";
Canonicalize("http://host.com//twoslashes?more//slashes") = "http://host.com/twoslashes?more//slashes";
```

### Suffix/prefix expressions for `http://a.b.c/1/2.html?param=1`

```text
a.b.c/1/2.html?param=1
a.b.c/1/2.html
a.b.c/
a.b.c/1/
b.c/1/2.html?param=1
b.c/1/2.html
b.c/
b.c/1/
```

## Options / Props

### Canonicalization steps

| Step | Rule |
|---|---|
| Prerequisite | URL parsed and valid per RFC 2396; IDN converted to ASCII Punycode; the URL must include a path (leading slash, `http://google.com/`). |
| 1 | Remove tab (`0x09`), CR (`0x0d`) and LF (`0x0a`) characters; don't remove their escape sequences such as `%0a`. |
| 2 | Remove a trailing fragment. |
| 3 | Repeatedly remove percent-escapes until none remain. |
| Hostname | Remove all leading and trailing dots; replace consecutive dots with one; if it parses as an IP address, normalize to 4 dot-separated decimal values (handle octal, hex, fewer than four components); lowercase everything. |
| Path | Resolve `/../` and `/./` (replace `/./` with `/`, remove `/../` with the preceding component); replace runs of slashes with one. Don't apply these to query parameters. |
| Escaping | Percent-escape all characters <= ASCII 32, >= 127, `#` and `%`, using uppercase hex. |

### Suffix/prefix expressions

| Item | Rule |
|---|---|
| Combinations | Up to 30 host-suffix / path-prefix combinations, using only host and path (scheme, username, password and port are discarded). With query parameters, at least one combination includes the full path and query. |
| Host (max 5 strings) | The exact hostname, plus up to four hostnames formed from the last five components by successively removing the leading component (the top-level domain can be skipped). Not applied when the host is an IP address. |
| Path (max 6 strings) | The exact path with query parameters; the exact path without query parameters; four paths from the root `/` successively appending path components, with trailing slash. |

### Hashes and prefixes

| Item | Rule |
|---|---|
| Full hash | SHA256 of each suffix/prefix expression. |
| Hash prefix | The most significant 4-32 bytes of the SHA256 hash. |
| FIPS-180-2 B1 | Input `abc`: digest `ba7816bf 8f01cfea 414140de 5dae2223 b00361a3 96177a9c b410ff61 f20015ad`; 32-bit prefix `ba7816bf`. |
| FIPS-180-2 B2 | Input `abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq`: digest `248d6a61 d20638b8 e5c02693 0c3e6039 a33ce459 64ff2167 f6ecedd4 19db06c1`; 48-bit prefix `248d6a61 d206`. |

## Notes

- Expression examples in the source for `http://a.b.c.d.e.f.g/1.html` and `http://1.2.3.4/1/` are omitted. The source's pseudo-C unit test for `TruncatedSha256Prefix` (FIPS-180-2 examples B1-B3, including a million `a` characters) is also omitted; the B1 / B2 values are in the table above.
- Source: https://docs.cloud.google.com/web-risk/docs/urls-hashing (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [update-api.md](./update-api.md)
- [lists.md](./lists.md)
- [local-databases.md](./local-databases.md)
