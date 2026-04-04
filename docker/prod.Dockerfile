# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.12.0
ARG PNPM_VERSION=10.28.1

FROM node:${NODE_VERSION}-alpine AS ts-compiler

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /server

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install

USER node

COPY . .

RUN ["pnpm", "build"]

FROM image AS ts-remover

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /server

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod 

COPY --from=ts-compiler ./build .