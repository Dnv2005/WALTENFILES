import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import yaml from 'yaml';
import swaggerUi from 'swagger-ui-express';


const app = express();
app.use(cors());
app.use(express.json());

let tareas = []; // almacenamiento en memoria

// GET /tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// POST /tareas
app.post('/tareas', (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'Texto requerido' });
  }

  const nueva = { id: uuid(), texto, completada: false };
  tareas.push(nueva);
  res.status(201).json(nueva);
});

// DELETE /tareas/:id
app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  tareas = tareas.filter(t => t.id !== id);
  res.json({ mensaje: 'Tarea eliminada' });
});

// PUT /tareas/:id (opcional: marcar completada)
app.put('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const { completada } = req.body;

  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return res.status(404).json({ error: 'No existe' });

  tarea.completada = completada;
  res.json(tarea);
});

const file = fs.readFileSync('./openapi.yaml', 'utf8');
const swaggerDocument = yaml.parse(file);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 80;
app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});