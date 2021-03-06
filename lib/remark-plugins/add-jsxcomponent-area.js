function addJsxCode(options = {}) {

    const transformer = async (ast) => {

        let isFullBody = ast.children.filter(x => x.type == 'comment' && x.value.includes('truncate')).length > 0
        if (isFullBody && (options.importStatement || options.jsx)) {

            if (options.importStatement) {
                if (typeof options.importStatement === 'string') {
                    insertCode(ast, 'import', options.importStatement, options.position);
                } else {
                    options.importStatement.forEach(statement => {
                        insertCode(ast, 'import', statement, options.position);
                    });
                }
            }

            if (options.jsx) {
                if (typeof options.jsx === 'string') {
                    insertCode(ast, 'jsx', options.jsx);
                } else {
                    options.jsx.forEach(code => {
                        insertCode(ast, 'jsx', code);
                    });
                }
            }
        }
    };
    return transformer;

    function insertCode(ast, type, value, position) {

        if (position === 'start') {
            ast.children.splice(0, 0, {
                type: type,
                value: value
            })
        } else {
            ast.children.push({
                type: type,
                value: value
            });
        }


    }
};

module.exports = addJsxCode;