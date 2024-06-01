以下は、Spring Bootバックエンド部分のみのREADMEファイルです。

```markdown
# 従業員CRUDアプリケーション - バックエンド

このプロジェクトは、従業員を管理するためのSpring Bootを使用したCRUDアプリケーションのバックエンド部分です。データベースにはPostgreSQLを使用し、REST APIを提供します。

## 目次

- [前提条件](#前提条件)
- [セットアップ](#セットアップ)
  - [環境変数の設定](#環境変数の設定)
  - [データベースの設定](#データベースの設定)
- [アプリケーションの実行](#アプリケーションの実行)
- [APIエンドポイント](#apiエンドポイント)
- [Docker Composeの使用](#docker-composeの使用)
- [コントリビューション](#コントリビューション)
- [ライセンス](#ライセンス)

## 前提条件

- Java 11以上
- PostgreSQL
- Maven
- DockerおよびDocker Compose（Docker Composeを使用する場合）

## セットアップ

### 環境変数の設定

以下の環境変数を設定します。

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`

### データベースの設定

1. **PostgreSQLデータベースを作成:**

   PostgreSQLデータベースに接続し、以下のSQLスクリプトを実行して`employees`テーブルを作成します:

   ```sql
   CREATE TABLE employees (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       position VARCHAR(100),
       salary DECIMAL(10, 2)
   );
   ```

2. **`application.properties`ファイルを更新:**

   `src/main/resources/application.properties`ファイルを以下のように更新します:

   ```properties
   spring.datasource.url=${SPRING_DATASOURCE_URL}
   spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
   spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
   ```

## アプリケーションの実行

1. **依存関係をインストール:**

   ```sh
   mvn clean install
   ```

2. **アプリケーションを実行:**

   ```sh
   mvn spring-boot:run
   ```

## APIエンドポイント

- **GET /api/employees**
    - すべての従業員を取得

- **GET /api/employees/{id}**
    - IDで従業員を取得

- **POST /api/employees**
    - 新しい従業員を作成

- **PUT /api/employees/{id}**
    - 既存の従業員を更新

- **DELETE /api/employees/{id}**
    - 従業員を削除

## Docker Composeの使用

Docker Composeを使用して、バックエンドとPostgreSQLデータベースを一緒に起動することができます。

1. **Docker Composeファイルを作成:**

   プロジェクトのルートディレクトリに`docker-compose.yml`を作成します。

   ```yaml
   version: '3.8'

   services:
     postgres:
       image: postgres:13
       environment:
         POSTGRES_DB: employee_db
         POSTGRES_USER: user
         POSTGRES_PASSWORD: password
       volumes:
         - postgres_data:/var/lib/postgresql/data
       ports:
         - "5432:5432"

     backend:
       build:
         context: ./backend
         dockerfile: Dockerfile
       environment:
         SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/employee_db
         SPRING_DATASOURCE_USERNAME: user
         SPRING_DATASOURCE_PASSWORD: password
       ports:
         - "8080:8080"
       depends_on:
         - postgres

   volumes:
     postgres_data:
   ```

2. **Docker Composeを実行:**

   ```sh
   docker-compose up --build
   ```

## コントリビューション

バグ報告や機能改善のリクエストは歓迎します。

## ライセンス

このプロジェクトはMITライセンスの下で提供されています。
```

このREADMEファイルには、Spring Bootバックエンド部分のセットアップ、実行、およびAPIエンドポイントに関する情報が含まれています。また、Docker Composeを使用してアプリケーションを起動する手順も含まれています。