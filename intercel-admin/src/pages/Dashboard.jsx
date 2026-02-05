import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Skeleton,
} from '@mui/material';
import {
  LocalOffer,
  Category,
  TrendingUp,
  Add,
} from '@mui/icons-material';
import { getCategories, getPlans } from '../api';

const StatCard = ({ title, value, icon, color, loading }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" variant="body2" gutterBottom>
            {title}
          </Typography>
          {loading ? (
            <Skeleton width={60} height={40} />
          ) : (
            <Typography variant="h4" fontWeight={700}>
              {value}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${color}.light`,
            color: `${color}.main`,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ plans: 0, categories: 0, activePlans: 0 });
  const [loading, setLoading] = useState(true);
  const [recentPlans, setRecentPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesRes, plansRes] = await Promise.all([
        getCategories(),
        getPlans(),
      ]);

      const categories = categoriesRes.data;
      const plans = plansRes.data;

      setStats({
        categories: categories.length,
        plans: plans.length,
        activePlans: plans.filter((p) => p.isActive).length,
      });

      // Get recent plans (last 5)
      setRecentPlans(plans.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography color="text.secondary">
            Bienvenido al panel de administración de Intercel
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/plans/new')}
        >
          Nuevo Plan
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total de Planes"
            value={stats.plans}
            icon={<LocalOffer sx={{ fontSize: 28 }} />}
            color="primary"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Categorías"
            value={stats.categories}
            icon={<Category sx={{ fontSize: 28 }} />}
            color="secondary"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Planes Activos"
            value={stats.activePlans}
            icon={<TrendingUp sx={{ fontSize: 28 }} />}
            color="success"
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Acciones Rápidas
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/plans/new')}
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  <Add sx={{ mr: 1 }} /> Crear nuevo plan
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/plans')}
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  <LocalOffer sx={{ mr: 1 }} /> Ver todos los planes
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/categories')}
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  <Category sx={{ mr: 1 }} /> Gestionar categorías
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Planes Recientes
              </Typography>
              {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} height={40} />
                  ))}
                </Box>
              ) : recentPlans.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {recentPlans.map((plan) => (
                    <Box
                      key={plan.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: 'grey.50',
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'grey.100' },
                      }}
                      onClick={() => navigate(`/plans/${plan.id}/edit`)}
                    >
                      <Box>
                        <Typography fontWeight={600}>{plan.data}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {plan.category?.label}
                        </Typography>
                      </Box>
                      <Typography fontWeight={700} color="primary.main">
                        ${plan.price}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="text.secondary">No hay planes aún</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
