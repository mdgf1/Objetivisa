# Objetivisa
Projeto de visualização politica a nível nacional.

## Requisitos
- [Docker](https://docs.docker.com/get-docker/) e Docker Compose

## Desenvolvimento local

```bash
docker compose --profile dev up -d
```

| Serviço       | URL                   |
|---------------|-----------------------|
| Frontend      | http://localhost:3000 |
| API           | http://localhost:3001 |
| Base de dados | localhost:3002        |

Para parar:
```bash
docker compose --profile dev down
```

## Base de dados

### Guardar dados
Com os containers a correr, exporta todos os dados para `db/seed.sql`:
```bash
./scripts/dump.sh
```

### Restaurar dados
```bash
./scripts/restore.sh
```

> O `seed.sql` pode ser commitado no git para partilhar dados entre máquinas ou para backup.

## Deploy (VPS)

### 1. Instalar Docker no servidor
```bash
curl -fsSL https://get.docker.com | sh
```

### 2. Copiar o projeto para o servidor
```bash
rsync -av --exclude='.git' /home/mig/Documents/Objetivisa/ user@your-server:/opt/objetivisa/
```

### 3. Restaurar a base de dados no servidor
Depois de arrancar os containers, corre:
```bash
./scripts/restore.sh
```

### 4. Arrancar em produção
```bash
docker compose --profile prod up -d --build
```

### 5. (Opcional) Domínio + HTTPS com Nginx
```nginx
server {
    server_name objetivisa.pt;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /api/ {
        proxy_pass http://localhost:3001;
    }
}
```

```bash
sudo certbot --nginx -d objetivisa.pt
```

## Licença
Consulta o ficheiro [LICENSE](LICENSE).
