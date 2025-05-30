require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const countryRoutes = require('./routes/countries');
const app = express();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err.message));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Countries API');
});

app.use('/api/countries', countryRoutes);

app.use((err, _, res, __) => {          // global error handler
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(process.env.PORT, () =>
  console.log(`API running on http://localhost:${process.env.PORT}`)
);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Countries API',
      version: '1.0.0',
      description: 'API for managing country data, including CRUD operations.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      },
      {
        url: 'https://project-2-part-1-crud-operations.onrender.com',
        description: 'Production server'
      }
    ]
  },
  apis: ['./routes/*.js'] // Adjust the path to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Your existing routes and middleware
