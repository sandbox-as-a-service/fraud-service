# Fraud Detection API

A serverless fraud detection API built with TypeScript and deployed on Vercel. This service validates IP addresses and provides fraud detection capabilities.

## Project Structure

```
├── api/
│   └── index.ts          # Main Vercel serverless function
├── col/                  # Bruno API test collection
│   ├── bruno.json        # Bruno collection configuration
│   ├── success.bru       # Test case for successful requests
│   └── invalid-payload.bru # Test case for invalid payloads
├── package.json          # Dependencies and package manager config
├── tsconfig.json         # TypeScript configuration
├── pnpm-lock.yaml        # pnpm lockfile
└── README.md            # This file
```

## Setup

This project uses **pnpm** as the package manager. Use **corepack** to install it (do not use `npm install`).

### Prerequisites

- Node.js (configured for Node 22 via tsconfig)
- Corepack (usually comes with Node.js)

### Installation

1. Enable corepack to use pnpm:
   ```bash
   corepack enable
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

   **Note:** This project depends on private packages from `@sandbox-as-a-service/types`. You'll need proper NPM_TOKEN access to install all dependencies.

## API Usage

### Endpoint

- **URL:** `/api`
- **Method:** `POST`
- **Content-Type:** `application/json`

### Request Format

```json
{
  "ip": "192.168.1.1"
}
```

### Response Examples

**Success (200):**
```json
{
  "message": "Valid IP received",
  "ip": "192.168.1.1"
}
```

**Validation Error (400):**
```json
{
  "error": "Invalid payload",
  "details": [/* Zod validation errors */]
}
```

**Method Not Allowed (405):**
```json
{
  "error": "Method Not Allowed"
}
```

**Unsupported Media Type (415):**
```json
{
  "error": "Unsupported Media Type"
}
```

## Testing

This project includes a Bruno API test collection in the `col/` directory.

### Test Cases

- **success.bru**: Tests successful IP validation
- **invalid-payload.bru**: Tests handling of invalid payloads

### Running Tests

Use Bruno CLI or Bruno GUI to execute the test collection:

1. Install Bruno CLI:
   ```bash
   pnpm add -g @usebruno/cli
   ```

2. Run tests:
   ```bash
   bru run col/
   ```

## Development

### Local Development

For local development with Vercel:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Run locally
vercel dev
```

### TypeScript

The project uses TypeScript with strict configuration extending `@tsconfig/node22`. Type checking:

```bash
pnpm tsc --noEmit
```

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Zod** - Schema validation
- **Vercel** - Serverless deployment platform
- **Bruno** - API testing
- **pnpm** - Fast, disk space efficient package manager

## Deployment

This project is configured for deployment on Vercel. The `api/index.ts` file serves as the main serverless function endpoint.