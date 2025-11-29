"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  sortBy?: "price-asc" | "price-desc" | "newest" | "popular";
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableSizes?: string[];
  availableColors?: string[];
}

export default function ProductFilters({
  onFilterChange,
  availableSizes = ["XS", "S", "M", "L", "XL", "XXL"],
  availableColors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
  ],
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const categories = [
    { value: "hommes", label: "Hommes" },
    { value: "femmes", label: "Femmes" },
    { value: "accessoires", label: "Accessoires" },
  ];

  const sortOptions = [
    { value: "newest", label: "Plus récents" },
    { value: "popular", label: "Populaires" },
    { value: "price-asc", label: "Prix croissant" },
    { value: "price-desc", label: "Prix décroissant" },
  ];

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleArrayFilter = (key: "sizes" | "colors", value: string) => {
    const currentArray = filters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray.length > 0 ? newArray : undefined);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) =>
      value !== undefined && (Array.isArray(value) ? value.length > 0 : true)
  ).length;

  return (
    <div className="mb-8">
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full gap-2"
        >
          <SlidersHorizontal size={20} />
          Filtres
          {activeFiltersCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filters Panel */}
      <div
        className={`
          ${isOpen ? "block" : "hidden"} lg:block
          bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <SlidersHorizontal size={20} />
            Filtres
            {activeFiltersCount > 0 && (
              <Badge variant="primary" size="sm">
                {activeFiltersCount}
              </Badge>
            )}
          </h3>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1"
            >
              <X size={16} />
              Effacer tout
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Catégorie
            </label>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={filters.category === category.value}
                    onChange={(e) => updateFilter("category", e.target.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {category.label}
                  </span>
                </label>
              ))}
              {filters.category && (
                <button
                  onClick={() => updateFilter("category", undefined)}
                  className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                  Toutes les catégories
                </button>
              )}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Prix (FCFA)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  updateFilter(
                    "minPrice",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  updateFilter(
                    "maxPrice",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Tailles
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleArrayFilter("sizes", size)}
                  className={`
                    px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all
                    ${
                      filters.sizes?.includes(size)
                        ? "border-primary-600 bg-primary-600 text-white"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-400"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Couleurs
            </label>
            <div className="flex flex-wrap gap-3">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => toggleArrayFilter("colors", color)}
                  className={`
                    w-10 h-10 rounded-full border-4 transition-all
                    ${
                      filters.colors?.includes(color)
                        ? "border-primary-600 scale-110"
                        : "border-gray-300 dark:border-gray-600 hover:scale-105"
                    }
                  `}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Trier par
            </label>
            <select
              value={filters.sortBy || ""}
              onChange={(e) =>
                updateFilter("sortBy", e.target.value || undefined)
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Par défaut</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
