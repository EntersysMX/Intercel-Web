import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Tooltip,
  Skeleton,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api';

const ICONS = [
  { value: 'CalendarToday', label: 'Calendario Día' },
  { value: 'DateRange', label: 'Rango de Fechas' },
  { value: 'Event', label: 'Evento' },
  { value: 'EventNote', label: 'Nota de Evento' },
  { value: 'CalendarMonth', label: 'Calendario Mes' },
  { value: 'Router', label: 'Router' },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState({ open: false, mode: 'create', category: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, category: null });
  const [form, setForm] = useState({
    name: '',
    label: '',
    icon: 'CalendarToday',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error('Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setForm({
      name: '',
      label: '',
      icon: 'CalendarToday',
      order: categories.length + 1,
      isActive: true,
    });
    setDialog({ open: true, mode: 'create', category: null });
  };

  const openEditDialog = (category) => {
    setForm({
      name: category.name,
      label: category.label,
      icon: category.icon,
      order: category.order,
      isActive: category.isActive,
    });
    setDialog({ open: true, mode: 'edit', category });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (dialog.mode === 'create') {
        const response = await createCategory(form);
        setCategories([...categories, response.data]);
        toast.success('Categoría creada');
      } else {
        const response = await updateCategory(dialog.category.id, {
          label: form.label,
          icon: form.icon,
          order: parseInt(form.order, 10),
          isActive: form.isActive,
        });
        setCategories(categories.map((c) =>
          c.id === dialog.category.id ? response.data : c
        ));
        toast.success('Categoría actualizada');
      }
      setDialog({ open: false, mode: 'create', category: null });
    } catch (error) {
      const message = error.response?.data?.error || 'Error al guardar';
      toast.error(message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(deleteDialog.category.id);
      setCategories(categories.filter((c) => c.id !== deleteDialog.category.id));
      toast.success('Categoría eliminada');
      setDeleteDialog({ open: false, category: null });
    } catch (error) {
      toast.error('Error al eliminar la categoría');
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Categorías</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={openCreateDialog}
        >
          Nueva Categoría
        </Button>
      </Box>

      {/* Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Orden</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Etiqueta</TableCell>
                <TableCell>Icono</TableCell>
                <TableCell align="center">Planes</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(7)].map((__, j) => (
                      <TableCell key={j}><Skeleton /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No hay categorías creadas
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id} hover>
                    <TableCell>{category.order}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>{category.name}</Typography>
                    </TableCell>
                    <TableCell>{category.label}</TableCell>
                    <TableCell>{category.icon}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={category.planCount || 0}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={category.isActive ? 'Activa' : 'Inactiva'}
                        size="small"
                        color={category.isActive ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => openEditDialog(category)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteDialog({ open: true, category })}
                          disabled={category.planCount > 0}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ open: false, mode: 'create', category: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialog.mode === 'create' ? 'Nueva Categoría' : 'Editar Categoría'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            {dialog.mode === 'create' && (
              <TextField
                fullWidth
                label="Nombre (identificador)"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                helperText="Identificador único, ej: daily, monthly"
              />
            )}
            <TextField
              fullWidth
              label="Etiqueta"
              name="label"
              value={form.label}
              onChange={handleChange}
              required
              helperText="Nombre visible, ej: Por día, Mensuales"
            />
            <TextField
              select
              fullWidth
              label="Icono"
              name="icon"
              value={form.icon}
              onChange={handleChange}
            >
              {ICONS.map((icon) => (
                <MenuItem key={icon.value} value={icon.value}>
                  {icon.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Orden"
              name="order"
              type="number"
              value={form.order}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.isActive}
                  onChange={handleChange}
                  name="isActive"
                />
              }
              label="Categoría activa"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ open: false, mode: 'create', category: null })}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {dialog.mode === 'create' ? 'Crear' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, category: null })}
      >
        <DialogTitle>Eliminar Categoría</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar la categoría "{deleteDialog.category?.label}"?
            Esta acción también eliminará todos los planes asociados.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, category: null })}>
            Cancelar
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;
