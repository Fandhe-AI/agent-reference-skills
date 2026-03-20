# Packages API

GitHub Packagesのパッケージとバージョンを管理するAPI。

## エンドポイント

### ユーザースコープ

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/user/packages` | 認証ユーザーのパッケージ一覧を取得 |
| GET | `/user/packages/{package_type}/{package_name}` | パッケージを取得 |
| DELETE | `/user/packages/{package_type}/{package_name}` | パッケージを削除 |
| POST | `/user/packages/{package_type}/{package_name}/restore` | パッケージを復元 |
| GET | `/users/{username}/packages` | 指定ユーザーのパッケージ一覧を取得 |
| GET | `/users/{username}/packages/{package_type}/{package_name}` | 指定ユーザーのパッケージを取得 |
| DELETE | `/users/{username}/packages/{package_type}/{package_name}` | 指定ユーザーのパッケージを削除 |
| POST | `/users/{username}/packages/{package_type}/{package_name}/restore` | 指定ユーザーのパッケージを復元 |

### Organizationスコープ

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/orgs/{org}/packages` | Orgのパッケージ一覧を取得 |
| GET | `/orgs/{org}/packages/{package_type}/{package_name}` | パッケージを取得 |
| DELETE | `/orgs/{org}/packages/{package_type}/{package_name}` | パッケージを削除 |
| POST | `/orgs/{org}/packages/{package_type}/{package_name}/restore` | パッケージを復元 |

### バージョン管理

各スコープ（user/users/{username}/orgs/{org}）で以下のバージョン操作が可能:

| メソッド | パス（末尾部分） | 説明 |
|---------|-----------------|------|
| GET | `.../versions` | バージョン一覧を取得 |
| GET | `.../versions/{package_version_id}` | バージョンを取得 |
| DELETE | `.../versions/{package_version_id}` | バージョンを削除 |
| POST | `.../versions/{package_version_id}/restore` | バージョンを復元 |

## パッケージタイプ

| タイプ | 説明 |
|--------|------|
| `npm` | Node.jsパッケージ |
| `maven` | Javaパッケージ |
| `rubygems` | Rubyパッケージ |
| `docker` | Dockerイメージ |
| `nuget` | .NETパッケージ |
| `container` | コンテナイメージ（GitHub Container Registry） |

`package_type` パラメータには上記の値を指定する。

## パッケージの一覧取得

```
GET /user/packages
```

### クエリパラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| package_type | string | Yes | パッケージタイプ |
| visibility | string | No | `public`, `private`, `internal` |

## パッケージの削除

```
DELETE /user/packages/{package_type}/{package_name}
```

### 制限事項

- **パブリックパッケージで5,000回以上ダウンロードされたものは削除不可**
- この場合はGitHub Supportに連絡が必要
- プライベートパッケージは制限なく削除可能

## パッケージの復元

```
POST /user/packages/{package_type}/{package_name}/restore
```

### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| token | string | 復元トークン（削除レスポンスに含まれる） |

### 復元の条件

- 削除から30日以内
- 同名のパッケージが新たに公開されていないこと
