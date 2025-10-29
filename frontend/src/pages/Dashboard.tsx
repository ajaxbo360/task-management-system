import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography variant="h4" component="h1">
              Dashboard
            </Typography>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>

          <Typography variant="h6" gutterBottom>
            Welcome back, {user?.name}! 👋
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Email: {user?.email}
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'primary.main',
                  color: 'white',
                }}
              >
                <Typography variant="h3">0</Typography>
                <Typography variant="body1">Total Tasks</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'warning.main',
                  color: 'white',
                }}
              >
                <Typography variant="h3">0</Typography>
                <Typography variant="body1">In Progress</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'success.main',
                  color: 'white',
                }}
              >
                <Typography variant="h3">0</Typography>
                <Typography variant="body1">Completed</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Button variant="contained" sx={{ mr: 2 }}>
              Create Task
            </Button>
            <Button variant="outlined">View All Tasks</Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default DashboardPage;
