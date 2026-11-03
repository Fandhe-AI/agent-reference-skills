---
source: https://developers.cloudflare.com/ai-gateway/observability/logging/logpush/
---

# Logpush

Export encrypted AI Gateway logs to external storage (e.g. R2) using Logpush; you decrypt them with your RSA private key.

## Signature / Usage

Generate the RSA key pair:

```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096
```

```bash
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

Adapted (not in the official docs): the official script embeds the private key as a string literal at the top of the file and uses a different `crypto.subtle` reference; here the key is read from a file path in an environment variable, and the redundant key-length check is dropped. Never commit the private key.

Decrypt a downloaded log file (`my_log.log.gz`):

```js
const crypto = require("crypto");
const fs = require("fs");
const zlib = require("zlib");
const readline = require("readline");

// PRIVATE_KEY_PATH points to the PEM private key generated above (keep it out of source control).
const privateKey = crypto.createPrivateKey(
	fs.readFileSync(process.env.PRIVATE_KEY_PATH, "utf8"),
);

async function importAESGCMKey(keyBuffer) {
	return await crypto.webcrypto.subtle.importKey(
		"raw",
		keyBuffer,
		{
			name: "AES-GCM",
			length: 256,
		},
		true,
		["encrypt", "decrypt"],
	);
}

async function decryptData(encryptedData, aesKey, iv) {
	const decryptedData = await crypto.webcrypto.subtle.decrypt(
		{ name: "AES-GCM", iv: iv },
		aesKey,
		encryptedData,
	);
	return new TextDecoder().decode(decryptedData);
}

async function decryptBase64(privateKey, data) {
	if (data.key === undefined) {
		return data;
	}

	const aesKeyBuf = crypto.privateDecrypt(
		{
			key: privateKey,
			oaepHash: "SHA256",
		},
		Buffer.from(data.key, "base64"),
	);
	const aesKey = await importAESGCMKey(aesKeyBuf);

	return await decryptData(
		Buffer.from(data.data, "base64"),
		aesKey,
		Buffer.from(data.iv, "base64"),
	);
}

async function run() {
	const lineReader = readline.createInterface({
		input: fs.createReadStream("my_log.log.gz").pipe(zlib.createGunzip()),
	});

	for await (const raw of lineReader) {
		const { Metadata, RequestBody, ResponseBody, ...remaining } = JSON.parse(raw);

		console.log({
			...remaining,
			Metadata: await decryptBase64(privateKey, Metadata),
			RequestBody: await decryptBase64(privateKey, RequestBody),
			ResponseBody: await decryptBase64(privateKey, ResponseBody),
		});
		console.log("--");
	}
}

run();
```

## Options / Props

| Item | Value |
|------|-------|
| Jobs per account | 4 |
| Max exported log size | 1 MB |
| Key pair | RSA 4096-bit; public key (spki PEM) uploaded to gateway settings |
| Encrypted fields | `Metadata`, `RequestBody`, `ResponseBody` (each carries `key`, `data`, `iv`) |

## Notes

- Corrected from the official docs: private key read from a file instead of an inline literal; `crypto.webcrypto.subtle` used consistently; the `for await` loop ensures lines are processed in order and awaited (the original used an async `line` callback).
- Hybrid encryption: a per-log AES-GCM key encrypts the data; that AES key is encrypted with your RSA public key (OAEP, SHA-256). The official page also shows an `openssl rsautl -decrypt` command for a generic encrypted file; it can only decrypt data small enough for direct RSA, so it does not apply to the hybrid AES-encrypted log bodies; use the script above.
- All three are required: upload the public key, turn on Logpush in gateway settings, and create and enable a Logpush job (choose destination per https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/, e.g. R2 at https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/r2/, selecting the AI Gateway dataset). Pricing: https://developers.cloudflare.com/logs/logpush/pricing/.
- Logpush exports regardless of whether log collection is on; `cf-aig-collect-log*` headers do not change what it exports. Limit increases are requested through a form linked from the official page.

## Related

- [observability-logging.md](./observability-logging.md)
- [reference-limits.md](./reference-limits.md)
