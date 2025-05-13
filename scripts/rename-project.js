const fs = require('fs');
const path = require('path');


const renameProject = () => {
  const args = process.argv.slice(2);
  const oldName = 'common-templates';
  const newName = args[0].replace('--newName=', '').replaceAll(' ', '');
  const excludeDirs = ['node_modules', '.git', 'dist', 'scripts']; // Директории для исключения

  function replaceInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const newContent = content.replace(new RegExp(oldName, 'g'), newName);
    fs.writeFileSync(filePath, newContent, 'utf-8');
  }

  function processDirectory(directory) {
    fs.readdirSync(directory).forEach(item => {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);

      if (excludeDirs.includes(item)) return;

      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (stat.isFile() && ['.js', '.jsx', '.json', '.md'].includes(path.extname(fullPath))) {
        replaceInFile(fullPath);
      }
    });
  }

  if (newName) {
    processDirectory(process.cwd()); // Запуск с текущей директории
    console.log(`Replaced "${oldName}" with "${newName}" in all files.`);
  } else {
    console.error('Script must have param --newName')
  }
}

renameProject();

