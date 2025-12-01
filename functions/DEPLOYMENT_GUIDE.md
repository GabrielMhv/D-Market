# 🚀 Guide de Déploiement des Cloud Functions

## Fonctions Créées

### 1. **sendOrderConfirmationEmail**

- **Trigger** : Création d'une nouvelle commande dans Firestore
- **Action** : Envoie un email de confirmation au client
- **Contenu** : Détails de la commande, produits, adresse de livraison

### 2. **sendOrderStatusEmail**

- **Trigger** : Mise à jour du statut d'une commande
- **Action** : Envoie un email au client pour l'informer du changement
- **Statuts gérés** : paid, processing, shipped, delivered, cancelled

### 3. **fedapayWebhook**

- **Trigger** : Requête HTTP POST de FedaPay
- **Action** : Met à jour le statut de la commande selon le paiement
- **Événements** : transaction.approved, transaction.declined

### 4. **cleanupAbandonedCarts**

- **Trigger** : Planifié (toutes les 24h)
- **Action** : Supprime les paniers abandonnés depuis plus de 30 jours

---

## 📋 Configuration Requise

### 1. Variables d'Environnement

```bash
# Configurer les variables Firebase Functions
firebase functions:config:set email.user="votre-email@gmail.com"
firebase functions:config:set email.password="votre-mot-de-passe-app"
firebase functions:config:set fedapay.webhook_secret="votre-webhook-secret"

# Ou utiliser .env pour le développement local
# Créer functions/.env
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
FEDAPAY_WEBHOOK_SECRET=votre-webhook-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Configuration Gmail

Pour utiliser Gmail avec Nodemailer :

1. Activer la validation en 2 étapes sur votre compte Google
2. Générer un mot de passe d'application :
   - Allez sur https://myaccount.google.com/security
   - Sélectionnez "Mots de passe des applications"
   - Créez un nouveau mot de passe pour "Mail"
   - Utilisez ce mot de passe dans `email.password`

---

## 🔧 Installation

```bash
# Aller dans le dossier functions
cd functions

# Installer les dépendances
npm install

# Compiler TypeScript
npm run build
```

---

## 🚀 Déploiement

### Déployer toutes les fonctions

```bash
firebase deploy --only functions
```

### Déployer une fonction spécifique

```bash
firebase deploy --only functions:sendOrderConfirmationEmail
firebase deploy --only functions:sendOrderStatusEmail
firebase deploy --only functions:fedapayWebhook
firebase deploy --only functions:cleanupAbandonedCarts
```

---

## 🧪 Tests Locaux

### Émulateur Firebase

```bash
# Démarrer l'émulateur
cd functions
npm run serve

# Les fonctions seront disponibles sur :
# http://localhost:5001/votre-project-id/us-central1/nomDeLaFonction
```

### Tester le webhook FedaPay

```bash
# Utiliser curl ou Postman
curl -X POST http://localhost:5001/votre-project-id/us-central1/fedapayWebhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "transaction.approved",
    "data": {
      "id": "txn_123",
      "custom_metadata": {
        "orderId": "ORDER-123"
      }
    }
  }'
```

---

## 🔗 Configuration FedaPay

### Configurer le Webhook

1. Allez sur le dashboard FedaPay
2. Dans **Paramètres** → **Webhooks**
3. Ajoutez l'URL de votre fonction :
   ```
   https://us-central1-votre-project-id.cloudfunctions.net/fedapayWebhook
   ```
4. Sélectionnez les événements :
   - `transaction.approved`
   - `transaction.declined`
5. Copiez le secret webhook et configurez-le :
   ```bash
   firebase functions:config:set fedapay.webhook_secret="votre-secret"
   ```

---

## 📊 Monitoring

### Voir les logs

```bash
# Tous les logs
firebase functions:log

# Logs d'une fonction spécifique
firebase functions:log --only sendOrderConfirmationEmail

# Logs en temps réel
firebase functions:log --follow
```

### Console Firebase

- Allez sur https://console.firebase.google.com/
- Sélectionnez votre projet
- **Functions** → **Logs**

---

## ⚠️ Points Importants

### Limites du Plan Gratuit (Spark)

- ❌ Pas d'accès aux API externes (Gmail, FedaPay)
- ✅ Fonctions Firestore triggers OK
- ✅ Scheduled functions OK

### Plan Blaze (Pay-as-you-go)

- ✅ Accès complet aux API externes
- ✅ Pas de limite de déploiement
- 💰 Facturation selon l'utilisation

### Passer au Plan Blaze

```bash
# Via Firebase Console
# Paramètres du projet → Utilisation et facturation → Modifier le forfait
```

---

## 🐛 Dépannage

### Erreur "EAUTH" (Gmail)

- Vérifiez que vous utilisez un mot de passe d'application
- Activez "Accès moins sécurisé" (non recommandé)

### Webhook non reçu

- Vérifiez l'URL dans FedaPay
- Vérifiez les logs Firebase
- Testez avec l'émulateur local

### Fonction timeout

- Augmentez le timeout dans firebase.json :
  ```json
  {
    "functions": {
      "timeoutSeconds": 60,
      "memory": "256MB"
    }
  }
  ```

---

## 📚 Ressources

- [Documentation Firebase Functions](https://firebase.google.com/docs/functions)
- [Documentation Nodemailer](https://nodemailer.com/)
- [Documentation FedaPay Webhooks](https://docs.fedapay.com/webhooks/)

---

## ✅ Checklist de Déploiement

- [ ] Variables d'environnement configurées
- [ ] Mot de passe d'application Gmail généré
- [ ] Dépendances installées (`npm install`)
- [ ] Code compilé (`npm run build`)
- [ ] Testé avec l'émulateur
- [ ] Déployé sur Firebase (`firebase deploy --only functions`)
- [ ] Webhook FedaPay configuré
- [ ] Logs vérifiés
- [ ] Test end-to-end effectué
