import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, MenuItem, Paper, TextField, Typography } from '@mui/material';
import AppButton from './AppButton';
import { fieldSx, inheritFont, menuSx } from './Sxpresets.js';
import GridDistortion from './Aurora.jsx';

function HeroSection() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    destination: '',
    date: '',
    travellers: '2',
  });

  // one handler for every field, using each field's name prop
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(search).toString();
    navigate(`/services?${params}`);
  };

  return (
  <Box
    component="section"
    sx={{
      position: 'relative',
      width: '100%',
      minHeight: { xs: 600, md: 800 },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      px: 2,
    }}
  >
    {/* Layer 1: the distortion background fills the whole hero */}
    <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <GridDistortion
        imageSrc="https://images.pexels.com/photos/16207654/pexels-photo-16207654.jpeg"
        grid={10}
        mouse={0.25}
        strength={0.15}
        relaxation={0.9}
      />
    </Box>

    {/* Layer 2: dark tint so the white text stays readable */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background:
          'linear-gradient(180deg, rgba(43,47,54,0.55) 0%, rgba(47,91,234,0.35) 100%)',
      }}
    />

    {/* Layer 3: your content on top */}
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
        pointerEvents: 'none', // lets mouse movement reach the background
        width: '100%',
        maxWidth: 1080,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2.5,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: '#fff',
          fontSize: 'clamp(2.4rem, 6.5vw, 4.6rem)',
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          maxWidth: '17ch',
        }}
      >
        Adventure awaits. Where to next?
      </Typography>

      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.92)',
          fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
          lineHeight: 1.5,
          maxWidth: '52ch',
        }}
      >
        Hand-picked trips to mountains, beaches and wild places, with guides who know them.
      </Typography>

      <AppButton
        variant="outlined"
        onDark
        size="large"
        onClick={() => navigate('/services')}
        sx={{ width: { xs: '100%', sm: 'auto' }, pointerEvents: 'auto' }}
      >
        Browse all packages
      </AppButton>
    </Box>
  </Box>

  );
}

export default HeroSection;