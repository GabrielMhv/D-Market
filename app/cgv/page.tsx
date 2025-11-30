export default function CGVPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
          Conditions Générales de Vente
        </h1>
        <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
          <h2>1. Objet</h2>
          <p>
            Les présentes conditions générales de vente régissent les relations
            contractuelles entre E-Shop Bénin et son client, les deux parties
            les acceptant sans réserve.
          </p>

          <h2>2. Produits</h2>
          <p>
            Les produits proposés sont ceux qui figurent sur le site E-Shop
            Bénin, dans la limite des stocks disponibles. Chaque produit est
            accompagné d'un descriptif établi par le fournisseur.
          </p>

          <h2>3. Tarifs</h2>
          <p>
            Les prix figurant dans le catalogue sont des prix TTC en Francs CFA
            tenant compte de la TVA applicable au jour de la commande; tout
            changement du taux pourra être répercuté sur le prix des produits ou
            des services.
          </p>

          <h2>4. Commandes</h2>
          <p>
            L'acheteur, qui souhaite acheter un produit ou un service doit
            obligatoirement :
            <ul>
              <li>
                Remplir la fiche d'identification sur laquelle il indiquera
                toutes les coordonnées demandées;
              </li>
              <li>
                Remplir le bon de commande en ligne en donnant toutes les
                références des produits ou services choisis;
              </li>
              <li>Valider sa commande après l'avoir vérifiée;</li>
              <li>Effectuer le paiement dans les conditions prévues;</li>
              <li>Confirmer sa commande et son règlement.</li>
            </ul>
          </p>

          <h2>5. Livraison</h2>
          <p>
            Les livraisons sont faites à l'adresse indiquée dans le bon de
            commande qui ne peut être que dans la zone géographique convenue.
          </p>
        </div>
      </div>
    </main>
  );
}
