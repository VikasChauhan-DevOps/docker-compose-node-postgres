# 🐳 Docker Compose Multi-Container Application

A practical multi-container DevOps showcase using **Docker Compose, Node.js, PostgreSQL, and Nginx**.

## 📌 Project Status

**Containerization & Architecture Showcase**

This repository demonstrates a multi-container application architecture and the configuration required to run the services together with Docker Compose.

## 🏗️ Architecture

```text
                         🌐 Browser
                              │
                         Host :8080
                              │
                              ▼
                    ┌─────────────────┐
                    │   Nginx :80     │
                    │ Reverse Proxy   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Node.js :3000   │
                    │   Express API   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ PostgreSQL :5432│
                    │   Persistent DB │
                    └─────────────────┘
                             │
                             ▼
                    Docker Named Volume
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Reverse proxy |
| Node.js | Application/API |
| Express | Web framework |
| PostgreSQL | Relational database |
| Docker Volume | Persistent database storage |
| Linux | Container host environment |

## 📦 Services

### Nginx
Public entry point on host port `8080`. It forwards requests to the Node.js application.

### Node.js
Runs the Express application on container port `3000` and communicates with PostgreSQL through the Docker Compose network.

### PostgreSQL
Stores application data and uses the named `postgres-data` volume for persistence.

## 🚀 Run the Project

Clone the repository:

```bash
git clone https://github.com/VikasChauhan-DevOps/docker-compose-node-postgres.git
cd docker-compose-node-postgres
```

Start all services:

```bash
docker compose up -d --build
```

Check containers:

```bash
docker compose ps
```

Open:

```text
http://localhost:8080
```

## 🔍 Useful Commands

View logs:

```bash
docker compose logs
```

View application logs:

```bash
docker compose logs app
```

View PostgreSQL logs:

```bash
docker compose logs db
```

Stop services:

```bash
docker compose down
```

Stop services and remove the database volume:

```bash
docker compose down -v
```

> Removing the volume deletes the PostgreSQL data stored by this project.

## ❤️ Health Check

The application exposes:

```text
GET /health
```

Example:

```bash
curl http://localhost:8080/health
```

Expected response:

```json
{"status":"ok","database":"connected"}
```

## 📂 Project Structure

```text
docker-compose-node-postgres/
│
├── app/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── public/
│       ├── index.html
│       ├── style.css
│       └── app.js
│
├── db/
│   └── init.sql
│
├── nginx/
│   └── default.conf
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

## 🧠 What I Practiced

- Multi-container application design
- Docker Compose service definitions
- Container-to-container networking
- Nginx reverse proxy configuration
- Node.js and PostgreSQL connectivity
- Docker health checks
- Named volumes and database persistence
- Application troubleshooting with container logs

## ⚠️ Security Note

The database credentials in this demonstration are intentionally simple for local practice. Real projects should use secrets management or environment-specific credentials and should never commit production passwords to GitHub.

## 👨‍💻 Author

**Vikas Chauhan**

DevOps Engineer

GitHub: https://github.com/VikasChauhan-DevOps
