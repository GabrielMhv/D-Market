# E-Shop Bénin - Site E-Commerce Moderne

Site e-commerce complet pour la vente de vêtements et accessoires au Bénin, avec paiement mobile money (MTN, Moov, Celtiis) via FedaPay.

## 🚀 Fonctionnalités

- ✅ Boutique avec filtres avancés (catégorie, prix, taille, couleur)
- ✅ Fiches produits détaillées avec galerie images
- ✅ Panier intelligent avec sauvegarde automatique
- ✅ Paiement mobile money (MTN, Moov, Celtiis) via FedaPay
- ✅ Authentification sécurisée (Firebase Auth)
- ✅ Dashboard admin avec statistiques
- ✅ Emails automatiques (confirmation, statut)
- ✅ Design premium responsive (glassmorphism, dark mode)

## 📊 Technologies

- **Frontend** : Next.js 14, React, TypeScript, Tailwind CSS
- **Backend** : Firebase (Auth, Firestore, Storage, Functions)
- **Paiement** : FedaPay (agrégateur mobile money Bénin)
- **Emails** : Nodemailer + Cloud Functions
- **Animations** : Framer Motion

## 🛠️ Installation

```bash
# Cloner le projet
git clone [votre-repo]
cd Site\ E-com

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés Firebase et FedaPay

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible sur http://localhost:3000

## 🔧 Configuration

### 1. Firebase

1. Créer un projet sur [Firebase Console](https://console.firebase.google.com/)
2. Activer Authentication (Email/Password)
3. Créer une base Firestore
4. Activer Storage
5. Copier les clés dans `.env.local`

### 2. Règles de Sécurité

```bash
# Déployer les règles Firestore et Storage
firebase login
firebase init
firebase deploy --only firestore:rules,storage:rules
```

### 3. Cloud Functions

```bash
# Installer les dépendances
cd functions
npm install

# Configurer les variables
firebase functions:config:set email.user="votre-email@gmail.com"
firebase functions:config:set email.password="mot-de-passe-app"
firebase functions:config:set fedapay.webhook_secret="votre-secret"

# Déployer
npm run build
firebase deploy --only functions
```

### 4. FedaPay

1. Créer un compte sur [FedaPay](https://fedapay.com/)
2. Récupérer les clés API (sandbox pour tests)
3. Configurer le webhook :
   ```
   https://us-central1-[project-id].cloudfunctions.net/fedapayWebhook
   ```
4. Ajouter les clés dans `.env.local`

## 📁 Structure

```
app/              # Pages Next.js (App Router)
components/       # Composants React réutilisables
lib/              # Services (Firebase, FedaPay)
functions/        # Cloud Functions
types/            # Types TypeScript
public/           # Assets statiques
```

## 🔐 Sécurité

- ✅ Règles Firestore pour protection des données
- ✅ Règles Storage pour validation des uploads
- ✅ Validation côté client et serveur
- ✅ Authentification Firebase sécurisée
- ✅ Paiements HTTPS via FedaPay

## 📧 Emails Automatiques

- Confirmation de commande
- Changement de statut (payée, en préparation, expédiée, livrée)
- Templates HTML professionnels

## 🎨 Design

- Design premium avec glassmorphism
- Dark mode complet
- Animations fluides (Framer Motion)
- Responsive mobile-first
- Google Fonts (Inter, Outfit)

## 📱 Paiement Mobile Money

Support complet des opérateurs béninois :

- **MTN Mobile Money**
- **Moov Money**
- **Celtiis Cash**

Intégration via FedaPay pour une expérience unifiée.

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
npm install -g vercel
vercel --prod
```

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

## 📚 Documentation

- [Guide de Sécurité](./SECURITY_RULES_GUIDE.md)
- [Guide Cloud Functions](./functions/DEPLOYMENT_GUIDE.md)
- [Récapitulatif Projet](./PROJET_FINAL.md)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT

## 👨‍💻 Auteur

Développé pour le marché béninois avec ❤️

---

**Statut** : 90% complet - Prêt pour le déploiement
**Version** : 1.0.0
