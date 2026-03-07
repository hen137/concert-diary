# syntax=docker/dockerfile:1
FROM node:25-alpine
RUN git clone https://github.com/henrythompson/concert-diary.git
WORKDIR /concert-diary
RUN npm install -g pnpm
RUN pnpm install
EXPOSE 3000
CMD pnpm prod