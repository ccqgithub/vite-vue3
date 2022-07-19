const path = require('path');
const sass = require('sass');
const glob = require('glob');
const watch = require('node-watch');
const minimatch = require('minimatch');
const DtsCreator = require('typed-css-modules');
const { ESLint } = require('eslint');

const RealDtsCreator = DtsCreator.default;
const root = process.cwd();
const creator = new RealDtsCreator({
  rootDir: root,
  namedExports: true
});
const eslint = new ESLint({ fix: true });

const updateFile = async (f) => {
  try {
    const out = await sass.compileAsync(f, {
      importers: [
        {
          findFileUrl(url) {
            if (!url.startsWith('@')) return null;
            const p = path.resolve(__dirname, '../src/', url.substring(2));
            const res = new URL(`file://${p}`);
            return res;
          }
        }
      ]
    });
    await creator.create(f, out.css, true).then(async (content) => {
      const res = await eslint.lintText(content.formatted, {
        filePath: content.outputFilePath
      });
      return content.writeFile(() => res[0].output);
    });
  } catch (e) {
    console.error(e);
  }
};

watch(
  root,
  {
    recursive: true,
    filter: (f) => minimatch(f, '**/*.module.scss')
  },
  (evt, name) => {
    if (evt === 'update') {
      updateFile(name);
    }
  }
);

glob(
  '**/*.module.scss',
  {
    cwd: root
  },
  (er, files) => {
    files.forEach((f) => {
      updateFile(path.resolve(root, f));
    });
  }
);
