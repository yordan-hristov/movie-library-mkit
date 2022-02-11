import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Movie Library',
        version: '1.0.0'
    }
};

const options = {
    swaggerDefinition,
    apis: [
        './index.js',
        './routes.js',
        './controllers/userController.js',
        './controllers/userFavoriteController.js',
        './controllers/userRatingController.js',
        './controllers/userNoteController.js',
        './controllers/movieController.js',
    ]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;