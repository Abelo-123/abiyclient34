# ZIVIOP PLATFORM — MASTER KNOWLEDGE BASE

> **Generated at:** 2026-09-18T19:00:11.960Z

## 1. SERVICES & ARCHITECTURE

- **HIS CLIENT client**: `abiyclient34` (`srv-d8u366jaml3c73c4ah10`) - URL: https://abiyclient34.onrender.com - Workspace: `D:\next\aiby_client`
- **HIS CLIENT server**: `abiyback` (`srv-d8slauegvqtc738d12s0`) - URL: https://abiyback.onrender.com - Workspace: `D:\next\aiby_client\api`
- **HIS ADMIN CLIENT**: `abiyadmin` (`srv-d8u4rhe8bjmc73dcp290`) - URL: https://abiyadmin.onrender.com - Workspace: `D:\next\aiby_client`
- **HIS ADMIN SERVER**: `abiyadminback34` (`srv-d8soal8k1i2s739vrgog`) - URL: https://abiyadminback34.onrender.com - Workspace: `D:\next\abiy_admin\server`
- **ITS BOT**: `abiybot34` (`srv-d8sjfe4m0tmc739a5ef0`) - URL: https://abiybot34.onrender.com - Workspace: `D:\next\aiby_bot`

---

## 2. DIAGNOSTICS & DB DETAILS

```text
================================================================================
ZIVIOP PLATFORM DIAGNOSTIC OVERVIEW
Generated at: 2026-09-18T19:00:11.955Z
================================================================================

SYSTEM ARCHITECTURE & ACTIVE TARGET SERVICES (5):
--------------------------------------------------------------------------------
* HIS CLIENT client:
  Local Folder:   D:\next\aiby_client
  Render URL:     https://abiyclient34.onrender.com
  Render Service: abiyclient34 (ID: srv-d8u366jaml3c73c4ah10)

* HIS CLIENT server:
  Local Folder:   D:\next\aiby_client\api
  Render URL:     https://abiyback.onrender.com
  Render Service: abiyback (ID: srv-d8slauegvqtc738d12s0)

* HIS ADMIN CLIENT:
  Local Folder:   D:\next\aiby_client
  Render URL:     https://abiyadmin.onrender.com
  Render Service: abiyadmin (ID: srv-d8u4rhe8bjmc73dcp290)

* HIS ADMIN SERVER:
  Local Folder:   D:\next\abiy_admin\server
  Render URL:     https://abiyadminback34.onrender.com
  Render Service: abiyadminback34 (ID: srv-d8soal8k1i2s739vrgog)

* ITS BOT:
  Local Folder:   D:\next\aiby_bot
  Render URL:     https://abiybot34.onrender.com
  Render Service: abiybot34 (ID: srv-d8sjfe4m0tmc739a5ef0)

================================================================================
SECTION 1: TARGET RENDER SERVICES LIVE ENVIRONMENT VARIABLES
================================================================================

[HIS CLIENT client] -> abiyclient34
Environment Variables (0):
------------------------------------------------------------

[HIS CLIENT server] -> abiyback
Environment Variables (16):
  CHAPA_BASE_URL = https://api.chapa.co/v1
  CHAPA_PUBLIC_KEY = [REDACTED]
  CHAPA_SECRET_KEY = [REDACTED]
  CURRENT_ENV = production
  DB_HOST = mysql-31cc9bfb-yohannesabate280-196b.j.aivencloud.com
  DB_NAME = defaultdb
  DB_PASS = [REDACTED]
  DB_USER = avnadmin
  DB_PORT = 28068
  MAX_DEPOSIT = 100000
  MIN_DEPOSIT = 10
  SITE_URL = paxyoback.infinityfreeapp.com
  GODOFPANEL_API_KEY = [REDACTED]
  SMS_API_KEY = [REDACTED]
  BOT_TOKEN = [REDACTED]
  BOT_TOKENS = [REDACTED]
------------------------------------------------------------

[HIS ADMIN CLIENT] -> abiyadmin
Environment Variables (0):
------------------------------------------------------------

[HIS ADMIN SERVER] -> abiyadminback34
Environment Variables (16):
  DB_HOST = mysql-31cc9bfb-yohannesabate280-196b.j.aivencloud.com
  DB_USER = avnadmin
  DB_PASS = [REDACTED]
  DB_NAME = defaultdb
  DB_PORT = 28068
  CHAPA_SECRET_KEY = [REDACTED]
  CHAPA_PUBLIC_KEY = [REDACTED]
  CHAPA_BASE_URL = https://api.chapa.co/v1
  MIN_DEPOSIT = 10
  MAX_DEPOSIT = 100000
  ADMIN_USERNAME = admin
  ADMIN_PASSWORD = [REDACTED]
  GODOFPANEL_API_KEY = [REDACTED]
  BOT_TOKEN = [REDACTED]
  CLIENT_BOT_TOKEN = [REDACTED]
  BOT_TOKENS = [REDACTED]
------------------------------------------------------------

[ITS BOT] -> abiybot34
Environment Variables (6):
  DB_HOST = mysql-31cc9bfb-yohannesabate280-196b.j.aivencloud.com
  DB_USER = avnadmin
  DB_PASS = [REDACTED]
  DB_NAME = defaultdb
  DB_PORT = 28068
  BOT_TOKEN = [REDACTED]
------------------------------------------------------------

================================================================================
SECTION 2: DATABASE OVERVIEW (20 TABLES)
================================================================================

TABLE: admin_recommended_services (Row Count: 2)
CREATE TABLE "admin_recommended_services" (
  "service_id" int NOT NULL,
  PRIMARY KEY ("service_id")
)
------------------------------------------------------------

TABLE: admin_users (Row Count: 0)
CREATE TABLE "admin_users" (
  "id" int NOT NULL AUTO_INCREMENT,
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE KEY "username" ("username"),
  KEY "idx_admin_users_created_at" ("created_at")
)
------------------------------------------------------------

TABLE: alerts (Row Count: 8)
CREATE TABLE "alerts" (
  "id" int NOT NULL AUTO_INCREMENT,
  "user_id" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  "title" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  "message" text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  "type" varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'info',
  "is_read" tinyint(1) DEFAULT '0',
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "idx_alerts_user_id" ("user_id")
)
------------------------------------------------------------

TABLE: auth (Row Count: 225)
CREATE TABLE "auth" (
  "tg_id" bigint NOT NULL,
  "username" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "password_hash" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "google_id" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "email" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "first_name" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "last_name" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "photo_url" text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  "balance" decimal(10,2) DEFAULT '0.00',
  "is_blocked" tinyint(1) DEFAULT '0',
  "auth_provider" varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'telegram',
  "last_login" datetime DEFAULT NULL,
  "last_seen" datetime DEFAULT NULL,
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  "last_deposit" datetime DEFAULT NULL,
  "last_order" datetime DEFAULT NULL,
  "total_spent" decimal(10,2) DEFAULT '0.00',
  "phone_number" varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "phone_verified" tinyint(1) DEFAULT '0',
  "referral_code" varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "referred_by" bigint DEFAULT NULL,
  "refers" longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY ("tg_id"),
  UNIQUE KEY "referral_code" ("referral_code"),
  KEY "idx_auth_last_deposit" ("last_deposit"),
  KEY "idx_auth_last_order" ("last_order"),
  KEY "idx_auth_created_at" ("created_at"),
  CONSTRAINT "auth_chk_1" CHECK (json_valid(`refers`))
)
------------------------------------------------------------

TABLE: broadcast_messages (Row Count: 0)
CREATE TABLE "broadcast_messages" (
  "id" int NOT NULL AUTO_INCREMENT,
  "broadcast_id" int NOT NULL,
  "tg_id" varchar(255) NOT NULL,
  "telegram_message_id" int NOT NULL,
  "status" varchar(50) DEFAULT 'sent',
  "error_message" text,
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  "custom_message" text,
  "bot_id" varchar(50) DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "broadcast_id" ("broadcast_id"),
  KEY "idx_broadcast_messages_tg_id" ("tg_id"),
  KEY "idx_broadcast_messages_status" ("status"),
  KEY "idx_broadcast_messages_created_at" ("created_at"),
  CONSTRAINT "broadcast_messages_ibfk_1" FOREIGN KEY ("broadcast_id") REFERENCES "broadcasts" ("id") ON DELETE CASCADE
)
------------------------------------------------------------

TABLE: broadcasts (Row Count: 0)
CREATE TABLE "broadcasts" (
  "id" int NOT NULL AUTO_INCREMENT,
  "message" text NOT NULL,
  "image_url" varchar(512) DEFAULT NULL,
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  "btn_text" varchar(255) DEFAULT 0x4F70656E2041707020F09F8EB5,
  "btn_url" varchar(512) DEFAULT 'https://musical-caramel-cae47e.netlify.app/',
  "bot_id" varchar(50) DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "idx_broadcasts_created_at" ("created_at")
)
------------------------------------------------------------

TABLE: chat_messages (Row Count: 0)
CREATE TABLE "chat_messages" (
  "id" int NOT NULL AUTO_INCREMENT,
  "user_id" varchar(50) NOT NULL,
  "message" text NOT NULL,
  "is_admin" tinyint(1) DEFAULT '0',
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
)
------------------------------------------------------------

TABLE: deposits (Row Count: 160)
CREATE TABLE "deposits" (
  "id" int NOT NULL AUTO_INCREMENT,
  "user_id" bigint NOT NULL,
  "amount" decimal(12,2) NOT NULL,
  "tx_ref" varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  "chapa_tx_ref" varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "checkout_url" varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "reference_id" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  "status" varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pending',
  "chapa_response" longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  "completed_at" datetime DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "idx_tx_ref" ("tx_ref"),
  KEY "idx_deposits_user_id" ("user_id"),
  KEY "idx_deposits_status_created" ("status","created_at"),
  CONSTRAINT "deposits_chk_1" CHECK (json_valid(`chapa_response`))
)
------------------------------------------------------------

TABLE: holidays (Row Count: 0)
CREATE TABLE "holidays" (
  "id" int NOT NULL AUTO_INCREMENT,
  "name" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  "discount_percent" int DEFAULT '0',
  "status" varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'inactive',
  "start_date" date DEFAULT NULL,
  "end_date" date DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "idx_holidays_status" ("status")
)
------------------------------------------------------------

TABLE: orders (Row Count: 96)
CREATE TABLE "orders" (
  "id" int NOT NULL AUTO_INCREMENT,
  "user_id" bigint NOT NULL,
  "api_order_id" int DEFAULT NULL,
  "service_id" int DEFAULT NULL,
  "reseller_cost" decimal(10,2) DEFAULT '0.00',
  "target_link" text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  "service_name" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "link" text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  "quantity" int DEFAULT NULL,
  "charge" decimal(10,2) DEFAULT '0.00',
  "status" varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pending',
  "custom_fields" longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  "remains" int DEFAULT '0',
  "start_count" int DEFAULT '0',
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "idx_orders_user_id" ("user_id"),
  KEY "idx_orders_status_created" ("status","created_at"),
  CONSTRAINT "orders_chk_1" CHECK (json_valid(`custom_fields`))
)
------------------------------------------------------------

TABLE: otp_verifications (Row Count: 23)
CREATE TABLE "otp_verifications" (
  "id" int NOT NULL AUTO_INCREMENT,
  "tg_id" varchar(50) NOT NULL,
  "phone_number" varchar(20) NOT NULL,
  "otp" varchar(6) NOT NULL,
  "expires_at" datetime NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE KEY "unique_tg_id" ("tg_id"),
  KEY "idx_otp_verifications_created_at" ("created_at")
)
------------------------------------------------------------

TABLE: recommended_services (Row Count: 0)
CREATE TABLE "recommended_services" (
  "id" int NOT NULL AUTO_INCREMENT,
  "service_id" int NOT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "service_id" ("service_id")
)
------------------------------------------------------------

TABLE: render_env_vars (Row Count: 38)
CREATE TABLE "render_env_vars" (
  "id" int NOT NULL AUTO_INCREMENT,
  "service_name" varchar(100) NOT NULL,
  "service_id" varchar(100) NOT NULL,
  "env_key" varchar(255) NOT NULL,
  "env_value" text,
  "updated_at" datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE KEY "idx_service_key" ("service_name","env_key")
)
------------------------------------------------------------

TABLE: service_adjustments (Row Count: 0)
CREATE TABLE "service_adjustments" (
  "service_id" int NOT NULL,
  "average_time" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY ("service_id")
)
------------------------------------------------------------

TABLE: service_custom (Row Count: 0)
CREATE TABLE "service_custom" (
  "id" int NOT NULL AUTO_INCREMENT,
  "service_id" int NOT NULL,
  "custom_rate" decimal(10,2) DEFAULT NULL,
  "profit_margin" decimal(5,2) DEFAULT '0.00',
  "is_enabled" tinyint(1) DEFAULT '1',
  "updated_at" datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "updated_by" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "custom_description" text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY ("id"),
  UNIQUE KEY "service_id" ("service_id"),
  KEY "idx_service_custom_id" ("service_id")
)
------------------------------------------------------------

TABLE: services (Row Count: 17)
CREATE TABLE "services" (
  "id" int NOT NULL AUTO_INCREMENT,
  "category" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  "name" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  "type" varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Default',
  "rate" decimal(10,2) NOT NULL,
  "min" int NOT NULL,
  "max" int NOT NULL,
  "average_time" varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N/A',
  "refill" tinyint(1) DEFAULT '0',
  "cancel" tinyint(1) DEFAULT '0',
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "idx_services_created_at" ("created_at")
)
------------------------------------------------------------

TABLE: settings (Row Count: 7)
CREATE TABLE "settings" (
  "setting_key" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  "setting_value" text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY ("setting_key")
)
------------------------------------------------------------

TABLE: transactions (Row Count: 157)
CREATE TABLE "transactions" (
  "id" int unsigned NOT NULL AUTO_INCREMENT,
  "user_id" bigint NOT NULL COMMENT 'tg_id from auth table',
  "type" varchar(50) NOT NULL,
  "amount" decimal(12,2) NOT NULL COMMENT 'Positive = credit, Negative = debit',
  "balance_after" decimal(12,2) NOT NULL COMMENT 'Snapshot of balance after this transaction',
  "reference_type" varchar(50) DEFAULT NULL,
  "reference_id" varchar(50) DEFAULT NULL,
  "description" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Human-readable description',
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "idx_user" ("user_id"),
  KEY "idx_type" ("type"),
  KEY "idx_created" ("created_at"),
  KEY "idx_transactions_user_id" ("user_id")
)
------------------------------------------------------------

TABLE: user_alerts (Row Count: 10)
CREATE TABLE "user_alerts" (
  "id" int NOT NULL AUTO_INCREMENT,
  "user_id" bigint NOT NULL,
  "message" text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  "is_read" tinyint(1) DEFAULT '0',
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "user_id" ("user_id"),
  KEY "idx_user_alerts_created_at" ("created_at")
)
------------------------------------------------------------

TABLE: withdrawals (Row Count: 0)
CREATE TABLE "withdrawals" (
  "id" int NOT NULL AUTO_INCREMENT,
  "user_id" varchar(255) NOT NULL,
  "amount" decimal(10,2) NOT NULL,
  "full_name" varchar(255) NOT NULL,
  "bank_name" varchar(255) NOT NULL,
  "account_number" varchar(255) NOT NULL,
  "status" varchar(50) DEFAULT 'pending',
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "idx_withdrawals_user_id" ("user_id"),
  KEY "idx_withdrawals_status" ("status"),
  KEY "idx_withdrawals_created_at" ("created_at")
)
------------------------------------------------------------

```
