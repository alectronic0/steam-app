.PHONY: help dev build test test-watch lint lint-fix format security clean docker-build docker-run

help:
	@echo "Steam App - Available Commands"
	@echo "=============================="
	@echo "  make dev              - Start development server with hot reload"
	@echo "  make build            - Build production bundle"
	@echo "  make test             - Run tests with coverage"
	@echo "  make test-watch       - Run tests in watch mode"
	@echo "  make test-ci          - Run tests for CI pipeline"
	@echo "  make lint             - Run ESLint check"
	@echo "  make lint-fix         - Fix ESLint issues"
	@echo "  make format           - Format code with Prettier"
	@echo "  make format-check     - Check code formatting"
	@echo "  make type-check       - Run TypeScript type check"
	@echo "  make security         - Run npm audit"
	@echo "  make ci               - Run all CI checks (lint, type-check, test)"
	@echo "  make docker-build     - Build Docker image"
	@echo "  make docker-run       - Run in Docker"
	@echo "  make clean            - Clean build artifacts"

dev:
	bun run dev

build:
	bun run build

test:
	bun test --coverage

test-watch:
	bun run test:watch

test-ci:
	bun run test:ci

lint:
	bun run lint

lint-fix:
	bun run lint:fix

format:
	bun run format

format-check:
	bun run format:check

type-check:
	bun run type-check

security:
	npm audit --production || bun pm audit --production

ci: lint type-check test
	@echo "✅ All CI checks passed!"

docker-build:
	docker build -t steam-app:latest .

docker-run:
	docker-compose up -d

docker-stop:
	docker-compose down

clean:
	rm -rf dist node_modules coverage
	@echo "✅ Cleanup complete"

