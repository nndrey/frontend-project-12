install:
	cd app && npm ci

build:
	cd app && npm run build

start:
	cd app && npx start-server -s ./dist