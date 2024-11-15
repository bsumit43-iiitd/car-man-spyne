const fs = require('fs');

// JWT secret value
const JWT_SECRET = 'fc9049fd1cb7f2a5becf4d3dcf8c34be2f88b3ac41223557d219f1bad6b4c547c549be26c0d399f926794e1fff0f826358c02f41c821070ef576d88a105acb64';

// Create or overwrite .env file with JWT_SECRET
fs.writeFileSync('.env', `JWT_SECRET=${JWT_SECRET}\n`);

console.log('.env file has been created with JWT_SECRET');
