const fs = require('fs');
const path = require('path');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const askProjectName = () => {
  const rl = readline.createInterface({ input, output });

  rl.question('Enter new project name (Leave empty to skip): ', (answer) => {
    renameProject(answer);
    rl.close();
  });
}

const renameProject = (newName) => {
  const excludeDirs = ['node_modules', '.git']; // Директории для исключения
  const oldName = 'common-templates';

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

askProjectName();

