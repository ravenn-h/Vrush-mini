# Vrush-mini

A WhatsApp multi-device pairing server built with Node.js and Express.

## Overview

Vrush-mini is a WhatsApp bot pairing server that allows users to connect WhatsApp sessions via pairing codes. It uses `@whiskeysockets/baileys` for WhatsApp connectivity.

## Project Structure

- `site.js` — Main Express server (entry point), runs on port 5000
- `pair.js` — WhatsApp pairing logic using Baileys
- `autoload.js` — Auto-loads existing paired sessions on startup
- `sessionManager.js` — Manages active WhatsApp sessions
- `config.js` — Bot configuration (owner, bot name, settings)
- `case.js` — Bot command handlers
- `Delay.js` — Delay utility functions
- `frontend/` — Static HTML frontend (login, dashboard, admin pages)
- `store/` — Persistent storage (pairing codes, user data)
- `sesFolder/` — Paired number records
- `allfunc/` — Additional bot functions
- `logs/` — PM2/server log output

## Tech Stack

- **Runtime**: Node.js 20
- **Web Framework**: Express.js
- **WhatsApp**: @whiskeysockets/baileys (custom fork: Richiethgoat/XD-Baileys)
- **Session**: express-session
- **Port**: 5000 (0.0.0.0)

## Running the App

```bash
node site.js
```

The workflow "Start application" runs `node site.js` and serves on port 5000.

## Deployment

Configured as a VM deployment (always-on) since it maintains persistent WhatsApp sessions and local file state.

## Key Routes

- `/` → redirects based on auth state
- `/login.html` → user login
- `/dashboard` → paired user dashboard
- `/admin` → admin panel (username: vrush_admin)
- `/pair` → WhatsApp pairing endpoint
- `/admin-data` → paginated admin data API
