This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
docker exec -it meu-postgres psql -U postgres -d meubanco

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

npx sequelize-cli db:migrate

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
