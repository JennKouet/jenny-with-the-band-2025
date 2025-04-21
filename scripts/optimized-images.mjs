import sharp from "sharp";
import fs from "fs";
import path from "path";


// Dossiers source et destination
const inputFolder = "public/images";
const outputFolder = "public/images/uploads";

// Créer le dossier de destination s'il n'existe pas
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Fonction pour créer les répertoires manquants
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Création récursive des répertoires
  }
};

// Fonction pour parcourir récursivement les dossiers et optimiser les images
const walkDirectory = (dirPath) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const relativePath = path.relative(inputFolder, filePath);
    const outputPath = path.join(outputFolder, relativePath.replace(/\.(jpg|jpeg|png)$/i, ".webp"));

    // Si c'est un dossier, on appelle récursivement la fonction
    if (fs.statSync(filePath).isDirectory()) {
      walkDirectory(filePath); // Dossier
    } else {
      // Si c'est une image, on la compresse
      if (/\.(jpg|jpeg|png)$/i.test(file)) {
        // Créer le dossier de destination s'il n'existe pas
        const outputDir = path.dirname(outputPath);
        createDirectory(outputDir);

        // Si l'image optimisée existe déjà, on l'ignore
        if (fs.existsSync(outputPath)) {
          console.log(`⏩ Ignoré (déjà optimisé) : ${filePath}`);
          return;
        }

        // Compression de l'image
        sharp(filePath)
          .resize(1500) // Redimensionne l'image à 1500px de large (optionnel)
          .toFormat("webp") // Conversion en WebP
          .webp({ quality: 70 }) // Compression WebP
          .toFile(outputPath)
          .then(() => console.log(`✅ Optimisé : ${filePath}`))
          .catch((err) => console.error(`❌ Erreur sur ${filePath} :`, err));

        // Supprimer le fichier original après conversion
        //fs.unlinkSync(filePath);
      }
    }
  });
};

// Lancer la compression de toutes les images dans `public/img`
walkDirectory(inputFolder);
