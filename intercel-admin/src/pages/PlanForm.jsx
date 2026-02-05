import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Skeleton,
} from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { getPlan, createPlan, updatePlan, getCategories } from '../api';

const PlanForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    categoryId: '',
    price: '',
    data: '',
    originalData: '',
    multiplier: '',
    features: '',
    sms: '',
    duration: '',
    hasCalls: false,
    unlimitedSocial: false,
    isFeatured: false,
    isMifi: false,
    isActive: true,
    tag: '',
    order: 0,
  });

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadPlan();
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error('Error al cargar las categorías');
    }
  };

  const loadPlan = async () => {
    try {
      const response = await getPlan(id);
      const plan = response.data;
      setForm({
        categoryId: plan.categoryId,
        price: plan.price,
        data: plan.data,
        originalData: plan.originalData || '',
        multiplier: plan.multiplier || '',
        features: plan.features,
        sms: plan.sms || '',
        duration: plan.duration,
        hasCalls: plan.hasCalls,
        unlimitedSocial: plan.unlimitedSocial,
        isFeatured: plan.isFeatured,
        isMifi: plan.isMifi,
        isActive: plan.isActive,
        tag: plan.tag || '',
        order: plan.order,
      });
    } catch (error) {
      toast.error('Error al cargar el plan');
      navigate('/plans');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = {
        ...form,
        price: parseInt(form.price, 10),
        order: parseInt(form.order, 10),
        originalData: form.originalData || null,
        multiplier: form.multiplier || null,
        sms: form.sms || null,
        tag: form.tag || null,
      };

      if (isEditing) {
        await updatePlan(id, data);
        toast.success('Plan actualizado correctamente');
      } else {
        await createPlan(data);
        toast.success('Plan creado correctamente');
      }

      navigate('/plans');
    } catch (error) {
      const message = error.response?.data?.error || 'Error al guardar el plan';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box>
        <Skeleton height={60} sx={{ mb: 3 }} />
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              {[...Array(12)].map((_, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Skeleton height={56} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/plans')}
        >
          Volver
        </Button>
        <Typography variant="h4">
          {isEditing ? 'Editar Plan' : 'Nuevo Plan'}
        </Typography>
      </Box>

      {/* Form */}
      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Category */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Categoría"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  required
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Price */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Precio (MXN)"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>

              {/* Data */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Datos (ej: 2 GB, MIFI 10)"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Duration */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duración (ej: 30 días)"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Original Data */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Datos originales (opcional)"
                  name="originalData"
                  value={form.originalData}
                  onChange={handleChange}
                  helperText="Para promociones, ej: 2GB"
                />
              </Grid>

              {/* Multiplier */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Multiplicador (opcional)"
                  name="multiplier"
                  value={form.multiplier}
                  onChange={handleChange}
                >
                  <MenuItem value="">Sin promoción</MenuItem>
                  <MenuItem value="Doble">Doble</MenuItem>
                  <MenuItem value="Triple">Triple</MenuItem>
                </TextField>
              </Grid>

              {/* Features */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Características"
                  name="features"
                  value={form.features}
                  onChange={handleChange}
                  required
                  helperText="Descripción de las características incluidas"
                />
              </Grid>

              {/* SMS */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SMS (opcional)"
                  name="sms"
                  value={form.sms}
                  onChange={handleChange}
                  helperText="ej: 1,750 SMS"
                />
              </Grid>

              {/* Tag */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Etiqueta promocional (opcional)"
                  name="tag"
                  value={form.tag}
                  onChange={handleChange}
                  helperText="ej: Cámbiate y recibe el Doble de GB"
                />
              </Grid>

              {/* Order */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Orden"
                  name="order"
                  type="number"
                  value={form.order}
                  onChange={handleChange}
                  inputProps={{ min: 0 }}
                  helperText="Orden de aparición en la categoría"
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Switches */}
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.hasCalls}
                      onChange={handleChange}
                      name="hasCalls"
                    />
                  }
                  label="Incluye llamadas"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.unlimitedSocial}
                      onChange={handleChange}
                      name="unlimitedSocial"
                    />
                  }
                  label="Redes Sociales Ilimitadas"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.isMifi}
                      onChange={handleChange}
                      name="isMifi"
                    />
                  }
                  label="Es plan MIFI"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.isFeatured}
                      onChange={handleChange}
                      name="isFeatured"
                    />
                  }
                  label="Plan destacado"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.isActive}
                      onChange={handleChange}
                      name="isActive"
                    />
                  }
                  label="Plan activo"
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/plans')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={saving}
                  >
                    {saving ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Plan')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlanForm;
