import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, MenuItem, Paper, TextField, Typography } from '@mui/material';
import AppButton from './AppButton';
import { fieldSx, inheritFont, menuSx } from './Sxpresets.js';

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
        minHeight: '100svh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2.5,
        pt: 12, // clears the navbar
        pb: 6,
        fontFamily: "'Outfit', 'Trebuchet MS', Arial, sans-serif",
        // swap for a local, compressed file: url('/images/hero.webp')
        background:
          "url('https://images.pexels.com/photos/2847871/pexels-photo-2847871.jpeg') center / cover no-repeat",
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(31, 41, 55, 0.72) 0%, rgba(31, 41, 55, 0.3) 50%, rgba(35, 71, 192, 0.55) 100%)',
        },
        ...inheritFont,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
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
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Browse all packages
        </AppButton>
      </Box>
    </Box>
  );
}

export default HeroSection;