#!/bin/bash

COMMAND=$1

start() {
  docker-compose up --build -d
}

db_upgrade() {
    docker exec -it socialnetwork_backend_1 alembic upgrade head
}

case "$COMMAND" in
  start)
    start
    ;;
  db_upgrade)
    db_upgrade
    ;;
  *)
    echo "Usage: $0 {start|db_upgrade}"
    exit 1
    ;;
esac
