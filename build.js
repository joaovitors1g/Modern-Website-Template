const Bundler = require('parcel-bundler');
const Path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const SveltePlugin = require('parcel-plugin-imagemin');
console.log(isProd);
// Localização do arquivo como único entrypoint:
const entryFiles = Path.join(__dirname, './index.html');
// Ou: múltiplos arquivos como globbing (também pode ser como .js)
// const entryFiles = './src/*.js';
// Ou: múltiplos arquivos em um array
// const entryFiles = ['./src/index.html', './some/other/directory/scripts.js'];

// Opções do bundler
const options = {
  production: true,
  outDir: './dist', // O diretório de saída para construir os arquivos, dist é o padrão
  outFile: 'index.html', // O nome do arquivo de saída
  watch: !isProd, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  publicUrl: './', // A URL onde o servidor será servido, '/' é o padrão
  cache: true, // Habilita ou desabilita o cache, true é o padrão
  cacheDir: '.cache', // O diretório de cache a ser utilizado, .cache é o padrão
  contentHash: false, // Desabilita o hash de conteúdo de ser incluído no nome do arquivo
  minify: isProd, // Minifica o arquivo, habilitado se process.env.NODE_ENV === 'production'
  logLevel: 3, // 5 = irá salvar tudo em um arquivo, 4 = assim como o 3 mas com timestamp e adicionalmente irá logar as requisições http realizadas para o servidor, 3 = irá loggar tudo, 2 = irá loggar avisos e erros, 1 = irá loggar erros
  sourceMaps: false, // Habilita ou desabilita sourcemaps, habilitado é o padrão (builds minificadas atualmente sempre criam sourcemaps)
  detailedReport: true // Exibe um report detalhado dos bundles, assets, tamanho de arquivos e tempos, false é o padrão, os reports são exibidos somente se o watch estiver desabilidado
};

(async function() {
  // Inicializa o bundler utilizando a localização do entrypoint e as configurações especificadas.
  const bundler = new Bundler(entryFiles, options);

  // Executa o bundler, isto retorna o bundle principal
  // Utiliza os eventos, se você estiver com o modo watch essa promise será disparada uma única vez e não a cada rebuild
  SveltePlugin(bundler);
  await bundler.bundle();
  
})();