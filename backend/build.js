const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const handlersDir = path.join(__dirname, 'src', 'handlers');
const handlers = fs.readdirSync(handlersDir).filter(file => file.endsWith('.ts'));

handlers.forEach(handler => {
  const handlerName = path.basename(handler, '.ts');
  esbuild.build({
    entryPoints: [`src/handlers/${handler}`],
    entryNames: 'index',
    outdir: `dist/handlers/${handlerName}`,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: ['node20'],
    outExtension: { '.js': '.mjs' }
  }).catch(() => process.exit(1));
});
