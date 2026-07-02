#!/bin/bash
mkdir -p "$(dirname "$0")/db"
docker exec objetivisa-db pg_dump -U objetivisa --data-only --column-inserts objetivisa \
    > "$(dirname "$0")/db/seed.sql"
echo "Dados guardados em scripts/db/seed.sql"
