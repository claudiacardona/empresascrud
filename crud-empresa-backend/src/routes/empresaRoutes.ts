import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows]: any = await db.query('SELECT * FROM empresas');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const [rows]: any = await db.query('SELECT * FROM empresas WHERE id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Empresa no encontrada' });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  console.log('Datos recibidos:', req.body);
  const { nombreComercial, razonSocial, telefono, correoElectronico, nit, estado, direccion } = req.body;


  if (!nombreComercial || !razonSocial || !telefono || !correoElectronico || !nit || !estado || !direccion) {
    res.status(400).json({ message: 'Todos los campos son obligatorios' });
    return;
  }

  try {
    const [result]: any = await db.query(
      `INSERT INTO empresas (nombreComercial, razonSocial, telefono, correoElectronico, nit, estado, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombreComercial, razonSocial, telefono, correoElectronico, nit, estado, direccion]
    );
    res.status(201).json({ message: 'Empresa creada', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nombreComercial, razonSocial, telefono, nit, estado, direccion } = req.body;

  try {
    const [result]: any = await db.query(
      `UPDATE empresas SET nombreComercial = ?, razonSocial = ?, telefono = ?, nit = ?, estado = ?, direccion = ? WHERE id = ?`,
      [nombreComercial, razonSocial, telefono, nit, estado, direccion, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Empresa no encontrada' });
      return;
    }
    res.json({ message: 'Empresa actualizada' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const [result]: any = await db.query('DELETE FROM empresas WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Empresa no encontrada' });
      return;
    }
    res.json({ message: 'Empresa eliminada' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
