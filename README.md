
# TP - API Microservices Réseau Social

Ce projet est une API backend conçue pour un réseau social, réalisée en **Node.js**, structurée en **microservices**, avec stockage des données dans **MongoDB**.  
Il répond aux exigences de **modularité**, **sécurité**, et **scalabilité**.

## 📁 Architecture des microservices

Le projet se compose de **3 microservices indépendants** :

- 🔐 `auth-service` : gestion des utilisateurs (inscription, connexion, mot de passe oublié)
- 📨 `posts-service` : gestion des publications
- ❤️ `likes-service` : gestion des likes liés aux posts

Chaque service :
- a sa propre base MongoDB
- expose ses propres routes via Express
- est isolé pour faciliter la maintenance et le déploiement

---

## ⚙️ Technologies utilisées

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- bcryptjs
- axios (pour la communication inter-services)
- nodemon (dev)

---

## 🔐 `auth-service` (port 3001)

### Fonctions :
- `POST /api/auth/register` → Inscription
- `POST /api/auth/login` → Connexion
- `GET /api/auth/reminder/:userName` → Rappel de mot de passe

> Mots de passe sécurisés avec **bcrypt**.  
> Respect des normes RGPD.

---

## 📨 `posts-service` (port 3002)

### Fonctions :
- `POST /api/posts` → Créer un post
- `GET /api/posts` → Voir tous les posts
- `PUT /api/posts/:id` → Modifier un post
- `DELETE /api/posts/:id` → Supprimer un post
- `PUT /api/posts/:id/like` → Incrémenter compteur de likes
- `PUT /api/posts/:id/unlike` → Décrémenter compteur de likes

> Chaque post contient un `userName`, un `content` et un compteur de `likes`.

---

## ❤️ `likes-service` (port 3003)

### Fonctions :
- `POST /api/likes` → Ajouter un like  
- `DELETE /api/likes` → Supprimer un like  
- `GET /api/likes/:postId` → Voir les likes d’un post

> Lorsqu’un like est ajouté ou retiré, le service appelle `posts-service` pour mettre à jour le compteur de likes automatiquement (via **axios**).

---

## 🔗 Communication entre services

- Le `likes-service` utilise **axios** pour appeler les routes `/like` et `/unlike` du `posts-service`.
- Les identifiants des utilisateurs (`userName`) et des posts (`postId`) sont utilisés pour relier les entités.

---

## 📄 Exemple de `.env` global (dans `social-network-api/.env`)

```
USERS=http://localhost:3001
POSTS=http://localhost:3002
LIKES=http://localhost:3003
```

---

## ▶️ Lancer le projet (en local)

Lancer chaque service dans son terminal :

```bash
cd auth-service
npm install
npm start
```

```bash
cd posts-service
npm install
npm start
```

```bash
cd likes-service
npm install
npm start
```

---

## ✅ Objectifs pédagogiques atteints

- ✔️ Architecture microservices fonctionnelle
- ✔️ Sécurisation des mots de passe
- ✔️ Communication inter-services REST
- ✔️ API REST complète et claire
- ✔️ Scalable et modulaire

---

## 📮 Auteur
Mehdi — TP API Microservices | 2025
