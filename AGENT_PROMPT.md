# ZIVIOP PLATFORM — AGENT INSTRUCTIONS & ARCHITECTURE

This workspace is configured for **Ziviop Platform**.

## Target Services:
- **HIS CLIENT client**: `abiyclient34` (srv-d8u366jaml3c73c4ah10) -> Path: `D:\next\aiby_client`
- **HIS CLIENT server**: `abiyback` (srv-d8slauegvqtc738d12s0) -> Path: `D:\next\aiby_client\api`
- **HIS ADMIN CLIENT**: `abiyadmin` (srv-d8u4rhe8bjmc73dcp290) -> Path: `D:\next\aiby_client`
- **HIS ADMIN SERVER**: `abiyadminback34` (srv-d8soal8k1i2s739vrgog) -> Path: `D:\next\abiy_admin\server`
- **ITS BOT**: `abiybot34` (srv-d8sjfe4m0tmc739a5ef0) -> Path: `D:\next\aiby_bot`

## Operational Guidelines:
Run `node fetch_render_and_db.js` whenever environment variables or database schemas are updated to keep the system knowledge synced.
