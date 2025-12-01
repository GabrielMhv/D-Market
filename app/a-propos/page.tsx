import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Notre Histoire
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Né d'une passion pour la mode et l'authenticité, E-Shop Bénin est
            devenu la référence du style à Cotonou. Nous croyons que chaque
            vêtement raconte une histoire, la vôtre.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              ✨
            </div>
            <h3 className="text-xl font-bold mb-4">Qualité Premium</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Nous sélectionnons rigoureusement chaque pièce pour garantir une
              durabilité et un confort exceptionnels.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              🌍
            </div>
            <h3 className="text-xl font-bold mb-4">Style Local & Global</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Une fusion unique entre les tendances internationales et
              l'élégance béninoise.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              🤝
            </div>
            <h3 className="text-xl font-bold mb-4">Service Client</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Une équipe dédiée à votre écoute pour vous accompagner dans tous
              vos choix.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">L'Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group">
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-[3/4] bg-gray-200 dark:bg-gray-700">
                  {/* Placeholder for team image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Membre {i}
                  </div>
                </div>
                <h3 className="font-bold text-lg">Prénom Nom</h3>
                <p className="text-primary-600">Poste</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
