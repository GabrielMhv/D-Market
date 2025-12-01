# 🔒 Guide de Déploiement des Règles de Sécurité Firebase

## Règles de Sécurité Créées

### 1. Firestore Rules (`firestore.rules`)

Protège les collections :

- **users** : Lecture/écriture par propriétaire ou admin
- **products** : Lecture publique, écriture admin uniquement
- **orders** : Lecture par propriétaire/admin, création par utilisateur authentifié
- **carts** : Accès uniquement par propriétaire
- **coupons** : Lecture publique, écriture admin uniquement
- **reviews** : Lecture publique, écriture par utilisateur authentifié

### 2. Storage Rules (`storage.rules`)

Protège les fichiers :

- **products/** : Lecture publique, écriture admin uniquement
- **avatars/** : Lecture publique, écriture par propriétaire
- Validation : Images uniquement, max 5MB

## 📋 Déploiement

### Option 1 : Via Firebase Console (Recommandé pour débuter)

1. **Firestore Rules** :

   - Allez sur [Firebase Console](https://console.firebase.google.com/)
   - Sélectionnez votre projet
   - Allez dans **Firestore Database** → **Règles**
   - Copiez le contenu de `firestore.rules`
   - Cliquez sur **Publier**

2. **Storage Rules** :
   - Allez dans **Storage** → **Règles**
   - Copiez le contenu de `storage.rules`
   - Cliquez sur **Publier**

### Option 2 : Via Firebase CLI

```bash
# Installer Firebase CLI (si pas déjà fait)
npm install -g firebase-tools

# Se connecter à Firebase
firebase login

# Initialiser Firebase dans le projet
firebase init

# Sélectionner :
# - Firestore
# - Storage
# - Utiliser les fichiers existants (firestore.rules et storage.rules)

# Déployer les règles
firebase deploy --only firestore:rules,storage:rules
```

## 🧪 Tester les Règles

### Dans Firebase Console

1. **Firestore** :

   - Allez dans **Firestore Database** → **Règles**
   - Cliquez sur l'onglet **Simulateur de règles**
   - Testez différents scénarios

2. **Storage** :
   - Allez dans **Storage** → **Règles**
   - Utilisez le simulateur de règles

### Exemples de Tests

```javascript
// Test 1 : Lecture publique des produits
// Type: get
// Path: /databases/(default)/documents/products/product123
// Auth: Non authentifié
// Résultat attendu: ✅ Autorisé

// Test 2 : Création de produit par utilisateur normal
// Type: create
// Path: /databases/(default)/documents/products/newProduct
// Auth: Utilisateur (non-admin)
// Résultat attendu: ❌ Refusé

// Test 3 : Lecture de commande par propriétaire
// Type: get
// Path: /databases/(default)/documents/orders/order123
// Auth: user_id du propriétaire
// Résultat attendu: ✅ Autorisé

// Test 4 : Modification de panier par autre utilisateur
// Type: update
// Path: /databases/(default)/documents/carts/otherUserId
// Auth: Utilisateur différent
// Résultat attendu: ❌ Refusé
```

## ⚠️ Points Importants

### Avant le Déploiement

1. **Créer un utilisateur admin** :

   ```javascript
   // Dans Firebase Console → Firestore
   // Collection: users
   // Document ID: [UID de votre compte]
   {
     name: "Admin",
     email: "admin@example.com",
     role: "admin",  // ← Important !
     created_at: new Date()
   }
   ```

2. **Vérifier les règles** :

   - Testez avec le simulateur
   - Vérifiez que les admins peuvent tout faire
   - Vérifiez que les utilisateurs normaux sont limités

3. **Backup** :
   - Exportez vos données Firestore avant de déployer
   - Gardez une copie des anciennes règles

### Après le Déploiement

1. **Tester en production** :

   - Créez un compte test
   - Essayez de créer un produit (devrait échouer)
   - Essayez de lire les produits (devrait réussir)
   - Essayez de créer une commande (devrait réussir si authentifié)

2. **Monitorer** :
   - Allez dans **Firestore** → **Utilisation**
   - Vérifiez les erreurs de règles
   - Ajustez si nécessaire

## 🔐 Sécurité Supplémentaire

### Variables d'Environnement

Assurez-vous que `.env.local` contient :

```env
NEXT_PUBLIC_FIREBASE_API_KEY=votre_clé
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_domaine
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_projet
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id

# Clés secrètes (NE PAS exposer au client)
FEDAPAY_SECRET_KEY=votre_clé_secrète
FEDAPAY_WEBHOOK_SECRET=votre_webhook_secret
```

### Restrictions API

Dans Firebase Console :

1. Allez dans **Paramètres du projet** → **Clés API**
2. Restreignez les clés API par :
   - Domaine (ex: votre-site.com)
   - Adresse IP (pour les clés serveur)

## 📚 Ressources

- [Documentation Firestore Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Documentation Storage Rules](https://firebase.google.com/docs/storage/security)
- [Simulateur de règles](https://firebase.google.com/docs/firestore/security/test-rules-emulator)

## ✅ Checklist de Déploiement

- [ ] Règles Firestore copiées et publiées
- [ ] Règles Storage copiées et publiées
- [ ] Utilisateur admin créé dans Firestore
- [ ] Tests effectués avec le simulateur
- [ ] Tests en production avec compte test
- [ ] Monitoring activé
- [ ] Variables d'environnement sécurisées
- [ ] Restrictions API configurées
