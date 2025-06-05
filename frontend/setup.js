#!/usr/bin/env node
/**
 * Frontend Setup Script for Book Tracker App
 * Helps set up environment configuration files
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupEnvironment() {
  console.log('🚀 Book Tracker Frontend Setup');
  console.log('='.repeat(40));
  
  const envChoice = await question('Choose environment (development/production) [development]: ');
  const environment = envChoice.trim().toLowerCase() || 'development';
  
  if (!['development', 'production'].includes(environment)) {
    console.log('❌ Invalid choice. Using development.');
    environment = 'development';
  }
  
  const sourceFile = `env.${environment}`;
  const targetFile = '.env';
  
  try {
    if (fs.existsSync(sourceFile)) {
      if (fs.existsSync(targetFile)) {
        const overwrite = await question('⚠️  .env file already exists. Overwrite? (y/N): ');
        if (overwrite.trim().toLowerCase() !== 'y') {
          console.log('❌ Setup cancelled.');
          rl.close();
          return;
        }
      }
      
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`✅ Environment configured for ${environment}`);
      console.log(`📄 Copied ${sourceFile} to ${targetFile}`);
      
      if (environment === 'production') {
        console.log('\n⚠️  IMPORTANT:');
        console.log('   - Update VITE_API_URL in .env file');
        console.log('   - Update VITE_API_BASE_URL in .env file');
        console.log('   - Review all production settings');
      }
      
      console.log('\n🎯 Next steps:');
      console.log('   1. Review and edit .env file if needed');
      console.log('   2. Install dependencies: npm install');
      console.log('   3. Run the app: npm run dev');
      
    } else {
      console.log(`❌ Environment file ${sourceFile} not found!`);
    }
  } catch (error) {
    console.error('❌ Error setting up environment:', error.message);
  }
  
  rl.close();
}

if (require.main === module) {
  setupEnvironment();
} 