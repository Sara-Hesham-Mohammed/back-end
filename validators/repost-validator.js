const {check} = require('express-validator');

module.exports.validateRepost = () => [
    check('content')
        .optional()
        .isString()
        .withMessage('Content must be a string'),
    check('caption')
        .optional()
        .isString()
        .withMessage('Caption must be a string'),
    check('article')
        .notEmpty()
        .withMessage('Article details are required')
        .isObject()
        .withMessage('Article must be an object')
        .custom((article) => {
            if (!article.title || !article.url || !article.source) {
                throw new Error('Article must include title, url, and source');
            }
            return true;
        }),
];

