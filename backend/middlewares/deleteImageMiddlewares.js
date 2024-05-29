import fs from 'fs';

function deleteUploadedFiles(files) {
  Object.values(files)
    .flat()
    .forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) console.log(`Failed to delete file: ${file.path}`);
      });
    });
}

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) console.error('Error deleting file:', err);
  });
}

export { deleteUploadedFiles, deleteFile };
