export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
          Politique de Confidentialité
        </h1>
        <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
          <h2>1. Collecte de l'information</h2>
          <p>
            Nous recueillons des informations lorsque vous vous inscrivez sur
            notre site, lorsque vous vous connectez à votre compte, faites un
            achat, participez à un concours, et / ou lorsque vous vous
            déconnectez. Les informations recueillies incluent votre nom, votre
            adresse e-mail, numéro de téléphone, et / ou carte de crédit.
          </p>

          <h2>2. Utilisation des informations</h2>
          <p>
            Toute les informations que nous recueillons auprès de vous peuvent
            être utilisées pour :
            <ul>
              <li>
                Personnaliser votre expérience et répondre à vos besoins
                individuels
              </li>
              <li>Fournir un contenu publicitaire personnalisé</li>
              <li>Améliorer notre site Web</li>
              <li>
                Améliorer le service client et vos besoins de prise en charge
              </li>
              <li>Vous contacter par e-mail</li>
              <li>Administrer un concours, une promotion, ou un enquête</li>
            </ul>
          </p>

          <h2>3. Confidentialité du commerce en ligne</h2>
          <p>
            Nous sommes les seuls propriétaires des informations recueillies sur
            ce site. Vos informations personnelles ne seront pas vendues,
            échangées, transférées, ou données à une autre société pour
            n'importe quelle raison, sans votre consentement, en dehors de ce
            qui est nécessaire pour répondre à une demande et / ou une
            transaction, comme par exemple pour expédier une commande.
          </p>

          <h2>4. Divulgation à des tiers</h2>
          <p>
            Nous ne vendons, n'échangeons et ne transférons pas vos informations
            personnelles identifiables à des tiers. Cela ne comprend pas les
            tierce parties de confiance qui nous aident à exploiter notre site
            Web ou à mener nos affaires, tant que ces parties conviennent de
            garder ces informations confidentielles.
          </p>
        </div>
      </div>
    </main>
  );
}
