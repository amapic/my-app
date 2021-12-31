// module.exports = {
//     process() {
//       return ''
//     }
//   }
// var path=require('path')
// module.exports = {
//   process(filename) {
//     return `module.exports =  ${JSON.stringify(path.basename(filename))};`;
//   }
// };

// svgTransformer.js
module.exports = {
  process(src, filename) {
    var path = require('path');
    const assetFilename = JSON.stringify(path.basename(filename));
    
    function pascalCase(str) {
      var { camelCase, toUpper } = require('lodash');
      return camelCase(str).replace(/^(.)/, toUpper);
    }

    if (filename.match(/\.svg$/)) {
      // Based on how SVGR generates a component name:
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
      const pascalCaseFilename = pascalCase(path.parse(filename).name);
      const componentName = `Svg${pascalCaseFilename}`;
      return `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${assetFilename}
            })
          };
        }),
      };`;
    }

    return `module.exports = ${assetFilename};`;
  },
};
// export default 'SvgrURL'
// export const ReactComponent = 'div'