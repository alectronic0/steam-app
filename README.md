# 🎨 steam-app - Frontend Microservice

React web application for comparing Steam libraries with a responsive, modern UI.

**Part of:** [Steam Games Comparison App](../README.md)

## 📦 Service Overview

- **Language:** TypeScript + React 18.2
- **Build Tool:** Bun + esbuild
- **Testing:** Jest + React Testing Library
- **Port:** 3000
- **Package Manager:** Bun (or npm/yarn compatible)

## 🚀 Quick Start

### Prerequisites
- Bun 1.0+ (or Node.js 18+)
- Running steam-api backend (or API_URL configured)

### Run Locally

```bash
# Setup
bun install

# Development with hot reload
bun run dev
# Available at http://localhost:3000

# Or with npm
npm install
npm run dev
```

### Run with Docker

```bash
# Build
docker build -t steam-app:latest .

# Run standalone
docker run -p 3000:3000 \
  -e API_URL=http://steam-api:8080 \
  steam-app:latest

# Run with full stack
docker-compose up -d
```

## 🎯 Features

- ✅ Compare two Steam libraries
- ✅ Find shared games instantly
- ✅ Filter by co-op and multiplayer games
- ✅ Responsive design (mobile-friendly)
- ✅ Error handling with user feedback

## 🔄 Development

### Common Commands
```bash
make help              # Show all commands
make dev              # Start dev server
make build            # Build production
make test             # Run tests
make lint             # Check code quality
make format           # Format code
make type-check       # TypeScript check
make security         # Scan dependencies
make ci               # Run all checks
```

### Project Structure
```
steam-app/
├── src/
│   ├── App.tsx              # Main React component
│   ├── App.css              # Styling
│   ├── App.test.tsx         # Component tests
│   ├── api.ts               # API configuration
│   ├── api.test.ts          # API tests
│   ├── index.tsx            # Entry point
│   └── setupTests.ts        # Jest setup
├── index.html               # HTML template
├── .eslintrc.json          # ESLint config
├── .prettierrc.json        # Prettier config
├── jest.config.mjs         # Jest config
├── package.json            # Dependencies
├── Dockerfile              # Docker build
├── docker-compose.yml      # Local compose
└── Makefile                # Commands
```

## 🧪 Testing

### Run Tests
```bash
make test              # Run with coverage
make test-watch        # Watch mode
```

### Write Tests
```typescript
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render', () => {
    render(<App />);
    expect(screen.getByText(/Steam Games/i)).toBeInTheDocument();
  });
});
```

## 🔍 Code Quality

### Checks Available
```bash
make lint              # ESLint
make format            # Prettier
make type-check        # TypeScript
make security          # npm audit
```

## 🌍 API Integration

The app communicates with steam-api backend:

**Endpoints:**
- `GET /health` - Backend health check
- `GET /user?user_id_1=X&user_id_2=Y` - Compare libraries

**Configuration** (`src/api.ts`):
- Auto-detects environment (localhost vs Docker)
- Configurable via `API_URL` environment variable

## 🚢 Deployment

### Docker
```bash
docker build -t steam-app:latest .
docker run -p 3000:3000 \
  -e API_URL=http://steam-api:8080 \
  steam-app:latest
```

### Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: steam-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: steam-app
  template:
    metadata:
      labels:
        app: steam-app
    spec:
      containers:
      - name: steam-app
        image: steam-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: API_URL
          value: "http://steam-api:8080"
```

## 🔗 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| API_URL | auto-detect | Backend API URL |
| NODE_ENV | production | Environment type |

## 🐛 Troubleshooting

### Can't Connect to Backend
- Check steam-api is running: `curl http://localhost:8080/health`
- Verify API_URL environment variable
- Check Docker network connectivity

### Port Already in Use
```bash
lsof -i :3000
npm run dev -- --port 3001
```

## 🚀 Next Steps

- Read [main README](../README.md) for full stack info
- Check [CI_CD_GUIDE.md](../CI_CD_GUIDE.md) for testing
- Deploy backend: [steam-api README](../steam-api/README.md)

## 📞 Support

- Frontend issues? Check `src/App.tsx`
- API problems? See [API Integration](#-api-integration)
- Testing help? Read [CI_CD_GUIDE.md](../CI_CD_GUIDE.md)

## 📄 License

MIT
