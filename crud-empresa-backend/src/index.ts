import express from 'express';
import cors from 'cors'; 
import empresasRoutes from './routes/empresaRoutes'; 

const app = express();

app.use(cors());

app.use(express.json());

app.use('/empresas', empresasRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
