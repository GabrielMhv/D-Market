/**
 * Cloudinary Upload Service
 * Upload images directly from the client to Cloudinary
 */

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ddyevnaqn";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "d-market-products";

/**
 * Upload a single image to Cloudinary
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "products");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}

/**
 * Upload multiple images to Cloudinary
 */
export async function uploadImagesToCloudinary(
  files: File[]
): Promise<string[]> {
  try {
    const uploadPromises = files.map((file) => uploadImageToCloudinary(file));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    throw error;
  }
}

/**
 * Delete an image from Cloudinary (requires backend)
 * This is a placeholder - actual deletion should be done server-side
 */
export async function deleteImageFromCloudinary(
  publicId: string
): Promise<void> {
  console.warn("Image deletion should be implemented server-side for security");
  // TODO: Implement server-side deletion via API route
}
