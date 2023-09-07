const template = require('@babel/template')

const myplugin = ({ types: t }) => {
  return {
    visitor: {
      Program(path, state) {
        const filename = state.file.opts.filename;
        if (!filename.includes('Story')) return

        console.log('## inserting import', filename);
        const idf = t.identifier("withProfiler");
        const importSpec = t.importDefaultSpecifier(idf, idf);
        const importDeclaration = t.importDeclaration(
          [importSpec],
          t.stringLiteral('./withProfiler')
        );

        path.unshiftContainer("body", importDeclaration);
      },

      ExportNamedDeclaration(path, state) {
        const filename = state.file.opts.filename
        console.log('## ExportNamedDeclare.visit', filename);
        const def = path.get('declaration.declarations.0')

        const compName = def.node.id.name
        const origArrowFn = def.node.init
        // use template to transform a string to equivalent AST node CallExpression
        const wrappedFn = buildFunctionWrapper({
          ORIGINAL_FN_CALL: origArrowFn,
          COMP_NAME: `'${compName}'`,
        })
        console.log(`## applying withProfiler ${compName}`)
        // where magic happens, replace original node ArrowFunctionExpression -> new node CallExpression
        path.get('declaration.declarations.0.init').replaceWith(wrappedFn)
      }
    }
  };
};
const buildFunctionWrapper = template.default(`{
  withProfiler(COMP_NAME, ORIGINAL_FN_CALL,)
}`);

module.exports = myplugin;