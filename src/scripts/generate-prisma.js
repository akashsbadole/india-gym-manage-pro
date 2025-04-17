
// This is a script to generate the Prisma client
// You should run this with: node src/scripts/generate-prisma.js
const { execSync } = require('child_process');

try {
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma client generated successfully!');
} catch (error) {
  console.error('Error generating Prisma client:', error);
  process.exit(1);
}
