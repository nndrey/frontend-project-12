install:
	npm ci

build:
	rm -rf frontend/dist
	npm run build

start-backend:
	npm run start
start:
	make start-backend

develop:
	npm run develop

preview:
	npm run preview