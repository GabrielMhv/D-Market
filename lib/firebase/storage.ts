import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { storage } from "./config";

/**
 * Sanitize filename to remove accents and special characters
 */
function sanitizeFilename(filename: string): string {
  return filename
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-zA-Z0-9.-]/g, "_") // Replace special chars with underscore
    .toLowerCase();
}

/**
 * Upload une image produit
 */
export async function uploadProductImage(
  file: File,
  productId: string
): Promise<string> {
  try {
    const timestamp = Date.now();
    const sanitizedName = sanitizeFilename(file.name);
    const fileName = `${timestamp}_${sanitizedName}`;
    const storageRef = ref(storage, `products/${productId}/${fileName}`);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image:", error);
    throw error;
  }
}

/**
 * Upload plusieurs images produit
 */
export async function uploadProductImages(
  files: File[],
  productId: string
): Promise<string[]> {
  try {
    const uploadPromises = files.map((file) =>
      uploadProductImage(file, productId)
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Erreur lors de l'upload des images:", error);
    throw error;
  }
}

/**
 * Supprimer une image produit
 */
export async function deleteProductImage(imageUrl: string): Promise<void> {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image:", error);
    throw error;
  }
}

/**
 * Supprimer toutes les images d'un produit
 */
export async function deleteAllProductImages(productId: string): Promise<void> {
  try {
    const folderRef = ref(storage, `products/${productId}`);
    const listResult = await listAll(folderRef);

    const deletePromises = listResult.items.map((item) => deleteObject(item));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Erreur lors de la suppression des images:", error);
    throw error;
  }
}
