import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TextField,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  ContentCopy,
  Star,
  StarBorder,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { getPlans, getCategories, deletePlan, duplicatePlan, updatePlan } from '../api';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, plan: null });
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [plansRes, categoriesRes] = await Promise.all([
        getPlans(),
        getCategories(),
      ]);
      setPlans(plansRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      toast.error('Error al cargar los planes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePlan(deleteDialog.plan.id);
      setPlans(plans.filter((p) => p.id !== deleteDialog.plan.id));
      toast.success('Plan eliminado');
      setDeleteDialog({ open: false, plan: null });
    } catch (error) {
      toast.error('Error al eliminar el plan');
    }
  };

  const handleDuplicate = async (plan) => {
    try {
      const response = await duplicatePlan(plan.id);
      setPlans([...plans, response.data]);
      toast.success('Plan duplicado');
    } catch (error) {
      toast.error('Error al duplicar el plan');
    }
  };

  const handleToggleFeatured = async (plan) => {
    try {
      await updatePlan(plan.id, { isFeatured: !plan.isFeatured });
      setPlans(plans.map((p) =>
        p.id === plan.id ? { ...p, isFeatured: !p.isFeatured } : p
      ));
      toast.success(plan.isFeatured ? 'Plan desmarcado como destacado' : 'Plan marcado como destacado');
    } catch (error) {
      toast.error('Error al actualizar el plan');
    }
  };

  const filteredPlans = filter === 'all'
    ? plans
    : plans.filter((p) => p.categoryId === filter);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4">Planes</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/plans/new')}
        >
          Nuevo Plan
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ py: 2 }}>
          <TextField
            select
            size="small"
            label="Filtrar por categoría"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">Todas las categorías</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.label}
              </MenuItem>
            ))}
          </TextField>
        </CardContent>
      </Card>

      {/* Plans Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Datos</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell>Duración</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Destacado</TableCell>
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
              ) : filteredPlans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No hay planes en esta categoría
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPlans.map((plan) => (
                  <TableRow key={plan.id} hover>
                    <TableCell>
                      <Box>
                        <Typography fontWeight={600}>{plan.data}</Typography>
                        {plan.originalData && (
                          <Typography variant="caption" color="text.secondary">
                            Antes: {plan.originalData} ({plan.multiplier})
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={plan.category?.label}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={700}>${plan.price}</Typography>
                    </TableCell>
                    <TableCell>{plan.duration}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={plan.isActive ? 'Activo' : 'Inactivo'}
                        size="small"
                        color={plan.isActive ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleToggleFeatured(plan)}
                        color={plan.isFeatured ? 'warning' : 'default'}
                      >
                        {plan.isFeatured ? <Star /> : <StarBorder />}
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/plans/${plan.id}/edit`)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Duplicar">
                        <IconButton
                          size="small"
                          onClick={() => handleDuplicate(plan)}
                        >
                          <ContentCopy />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteDialog({ open: true, plan })}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, plan: null })}
      >
        <DialogTitle>Eliminar Plan</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el plan "{deleteDialog.plan?.data}"?
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, plan: null })}>
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

export default Plans;
