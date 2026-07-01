#!/bin/bash
SEED="$(dirname "$0")/../db/seed.sql"
if [ ! -f "$SEED" ]; then
    echo "Erro: db/seed.sql não encontrado. Corre primeiro dump.sh."
    exit 1
fi
docker exec -i objetivisa-db psql -U objetivisa objetivisa < "$SEED"
echo "Base de dados restaurada de db/seed.sql"
