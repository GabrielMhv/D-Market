# 🛍️ Site E-Commerce Bénin

Site e-commerce moderne pour la vente de vêtements et accessoires au Bénin, avec paiement mobile money (MTN, Moov, Celtiis).

## 🚀 Technologies

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage, Cloud Functions)
- **Paiement**: FedaPay (MTN, Moov, Celtiis)
- **UI**: Framer Motion, Lucide React
- **Monnaie**: Franc CFA (XOF)

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer les variables d'environnement dans .env.local
```

## ⚙️ Configuration

### Firebase

1. Créer un projet sur [Firebase Console](https://console.firebase.google.com/)
2. Activer Authentication, Firestore, Storage
3. Copier les clés de configuration dans `.env.local`

### FedaPay

1. Créer un compte sur [FedaPay](https://fedapay.com/)
2. Récupérer les clés API (Public Key et Secret Key)
3. Ajouter les clés dans `.env.local`

## 🏃 Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Vérifier les types TypeScript
npm run type-check

# Build de production
npm run build

# Démarrer en production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout racine
│   ├── page.tsx           # Page d'accueil
│   ├── globals.css        # Styles globaux
│   ├── boutique/          # Pages boutique
│   ├── produit/           # Pages produits
│   ├── auth/              # Authentification
│   ├── admin/             # Interface admin
│   └── api/               # API Routes
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   ├── layout/           # Header, Footer
│   ├── products/         # Composants produits
│   └── cart/             # Composants panier
├── lib/                  # Bibliothèques et utilitaires
│   └── firebase/         # Configuration Firebase
├── types/                # Types TypeScript
├── hooks/                # Hooks React personnalisés
└── utils/                # Fonctions utilitaires
```

## 🎨 Design System

Le site utilise un design moderne avec :

- **Glassmorphism** : Effets de verre translucide
- **Gradients vibrants** : Couleurs dynamiques
- **Animations fluides** : Transitions et micro-interactions
- **Dark mode** : Support du mode sombre
- **Responsive** : Mobile-first design

## 💳 Paiement Mobile Money

Support des opérateurs béninois :

- **MTN Mobile Money** : Préfixe 01
- **Moov Money** : Préfixe 01
- **Celtiis Cash** : Préfixe 01

Intégration via FedaPay pour une expérience de paiement unifiée.

## 📝 Fonctionnalités

### Public

- ✅ Catalogue de produits avec filtres
- ✅ Fiche produit détaillée
- ✅ Panier persistant
- ✅ Paiement mobile money
- ✅ Suivi de commande
- ✅ Authentification utilisateur

### Admin

- ✅ Dashboard avec statistiques
- ✅ Gestion des produits
- ✅ Gestion des commandes
- ✅ Gestion des clients
- ✅ Gestion des coupons
- ✅ Configuration du site

## 🔒 Sécurité

- Règles de sécurité Firestore
- Validation des entrées
- Rate limiting sur Cloud Functions
- Validation des webhooks FedaPay
- Protection des routes admin

## 📄 License

ISC

## 👨‍💻 Développement

Projet en cours de développement.
