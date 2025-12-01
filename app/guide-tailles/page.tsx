"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import { Ruler, User, Shirt } from "lucide-react";

export default function GuideTaillesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <FadeIn className="mb-8">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Ruler className="text-primary-600" size={40} />
            Guide des Tailles
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Trouvez la taille parfaite pour vous
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-6">
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="text-primary-600" size={24} />
              Vêtements Hommes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Taille
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Tour de poitrine (cm)
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Tour de taille (cm)
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Tour de hanches (cm)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">XS</td>
                    <td className="py-3 px-4">86-89</td>
                    <td className="py-3 px-4">71-74</td>
                    <td className="py-3 px-4">86-89</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">S</td>
                    <td className="py-3 px-4">90-93</td>
                    <td className="py-3 px-4">75-78</td>
                    <td className="py-3 px-4">90-93</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">M</td>
                    <td className="py-3 px-4">94-97</td>
                    <td className="py-3 px-4">79-82</td>
                    <td className="py-3 px-4">94-97</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">L</td>
                    <td className="py-3 px-4">98-101</td>
                    <td className="py-3 px-4">83-86</td>
                    <td className="py-3 px-4">98-101</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">XL</td>
                    <td className="py-3 px-4">102-105</td>
                    <td className="py-3 px-4">87-90</td>
                    <td className="py-3 px-4">102-105</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">XXL</td>
                    <td className="py-3 px-4">106-109</td>
                    <td className="py-3 px-4">91-94</td>
                    <td className="py-3 px-4">106-109</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shirt className="text-primary-600" size={24} />
              Vêtements Femmes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Taille
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Tour de poitrine (cm)
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Tour de taille (cm)
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Tour de hanches (cm)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">XS</td>
                    <td className="py-3 px-4">78-82</td>
                    <td className="py-3 px-4">60-64</td>
                    <td className="py-3 px-4">86-90</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">S</td>
                    <td className="py-3 px-4">83-87</td>
                    <td className="py-3 px-4">65-69</td>
                    <td className="py-3 px-4">91-95</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">M</td>
                    <td className="py-3 px-4">88-92</td>
                    <td className="py-3 px-4">70-74</td>
                    <td className="py-3 px-4">96-100</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">L</td>
                    <td className="py-3 px-4">93-97</td>
                    <td className="py-3 px-4">75-79</td>
                    <td className="py-3 px-4">101-105</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">XL</td>
                    <td className="py-3 px-4">98-103</td>
                    <td className="py-3 px-4">80-85</td>
                    <td className="py-3 px-4">106-111</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">XXL</td>
                    <td className="py-3 px-4">104-109</td>
                    <td className="py-3 px-4">86-91</td>
                    <td className="py-3 px-4">112-117</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Comment prendre vos mesures ?
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">📏 Tour de poitrine</h3>
                <p>
                  Mesurez horizontalement au niveau de la partie la plus forte
                  de la poitrine.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📏 Tour de taille</h3>
                <p>
                  Mesurez horizontalement au niveau de la partie la plus étroite
                  du torse.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📏 Tour de hanches</h3>
                <p>
                  Mesurez horizontalement au niveau de la partie la plus forte
                  des hanches.
                </p>
              </div>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Conseils
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                Prenez vos mesures en sous-vêtements pour plus de précision
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                Utilisez un mètre ruban souple
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                Ne serrez pas trop le mètre, il doit être ajusté sans comprimer
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                En cas de doute entre deux tailles, choisissez la plus grande
              </p>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Besoin d'aide ?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Si vous avez des questions sur les tailles, n'hésitez pas à{" "}
              <Link
                href="/contact"
                className="text-primary-600 hover:underline font-medium"
              >
                nous contacter
              </Link>
              . Notre équipe se fera un plaisir de vous aider à trouver la
              taille parfaite.
            </p>
          </Card>
        </StaggerContainer>

        <div className="mt-8 text-center">
          <Link
            href="/boutique"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Découvrir la boutique →
          </Link>
        </div>
      </div>
    </main>
  );
}
