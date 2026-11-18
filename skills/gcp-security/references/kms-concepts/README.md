# kms-concepts

| Name | Description | Path |
|------|-------------|------|
| key-management-service | Cloud KMS overview and choosing between default encryption, CMEK (software / HSM / EKM), CSEK and Confidential Computing | [key-management-service.md](./key-management-service.md) |
| resource-hierarchy | Keys, key versions, key rings, key handles, Autokey configs, EKM connections and resource ID formats | [resource-hierarchy.md](./resource-hierarchy.md) |
| key-states | Key version states, transitions and the scheduled-for-destruction duration | [key-states.md](./key-states.md) |
| protection-levels | SOFTWARE, HSM, HSM_SINGLE_TENANT, EXTERNAL and EXTERNAL_VPC compared | [protection-levels.md](./protection-levels.md) |
| envelope-encryption | DEK / KEK model and the encrypt / decrypt flows | [envelope-encryption.md](./envelope-encryption.md) |
| key-rotation | Automatic and manual rotation, asymmetric key considerations | [key-rotation.md](./key-rotation.md) |
| algorithms | Protection levels, key purposes and algorithms with SDK / REST names and quantum-safe flags | [algorithms.md](./algorithms.md) |
| digital-signatures | Asymmetric signing, PQC signature sizes and the signing workflow | [digital-signatures.md](./digital-signatures.md) |
| asymmetric-encryption | RSA encryption with a Cloud KMS public key and decryption in Cloud KMS | [asymmetric-encryption.md](./asymmetric-encryption.md) |
| mac-signatures | HMAC signing and verification with symmetric MAC keys | [mac-signatures.md](./mac-signatures.md) |
| key-encapsulation-mechanisms | ML-KEM and X-Wing KEM keys, sizes and decapsulation | [key-encapsulation-mechanisms.md](./key-encapsulation-mechanisms.md) |
| quotas | Cloud KMS quota metrics, tokens per operation, and pre-2026-02-16 quotas | [quotas.md](./quotas.md) |
