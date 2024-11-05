import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, CircularProgress, Alert } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook para navegación

  const hasSQLInjectionRisk = (input) => {
    const sqlInjectionPattern = /['";\-]/;
    return sqlInjectionPattern.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasSQLInjectionRisk(email) || hasSQLInjectionRisk(password)) {
      setError("Fields contain prohibited characters.");
      return;
    }

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch("https://devseccvr.alwaysdata.net/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        setSuccess(data.message);

        // Redirige a /projects después de 3 segundos
        setTimeout(() => {
          navigate("/projects");
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #9c27b0, #ff4081)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        sx={{
          maxWidth: 900,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', lg: '50%' },
            backgroundImage: 'url(https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmlibGlvdGVjYXxlbnwwfHwwfHx8MA%3D%3D)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(3px)',
            },
            color: '#fff',
            textAlign: 'center',
            p: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ position: 'relative', zIndex: 1 }}>
            Welcome to SwiftAura Platform
          </Typography>
        </Box>

        <Box sx={{ width: { xs: '100%', lg: '50%' }, p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
            Log In
          </Typography>
          <Typography variant="body2" color="textSecondary" textAlign="center" mb={3}>
            Access your account to manage your projects
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Email Address"
              placeholder="your@example.com"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <MailIcon sx={{ mr: 1 }} color="action" />,
              }}
            />
            <TextField
              label="Password"
              placeholder="********"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1 }} color="action" />,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1,
                background: 'linear-gradient(45deg, #A042F4, #F24E91)',
              }}
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={20} sx={{ color: '#fff' }} />}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="textSecondary">
              Need help?
            </Typography>
            <Typography variant="body2">
              <a href="#" style={{ color: '#3f51b5', textDecoration: 'none' }}>
                Support Platform
              </a>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
