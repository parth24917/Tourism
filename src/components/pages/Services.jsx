import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AppButton from '../AppButton';
import { fieldSx, inheritFont } from '../Sxpresets';

const ACCENT = 'var(--accent, #2f5bea)';
const ACCENT_DARK = 'var(--accent-dark, #2347c0)';
const INK = 'var(--ink, #1f2937)';
const GREY_600 = 'var(--grey-600, #4b5563)';

// ids are unique now (they were all "2"), and price is a number, not "$199"
const packages = [
  { id: 1, image: '/images/Mountain.jpg', title: 'Adventure', description: 'Experience the thrill of mountain climbing.', price: 199 },
  { id: 2, image: '/images/Beach.jpg', title: 'Beach', description: 'Relax on the sunny beaches with crystal-clear waters.', price: 149 },
  { id: 3, image: '/images/Safari.jpg', title: 'Wildlife', description: 'Explore the exotic wildlife in the heart of nature.', price: 149 },
  { id: 4, image: '/images/City.jpg', title: 'City', description: 'Discover the vibrant life of metropolitan cities.', price: 249 },
  { id: 5, image: '/images/Cruise.jpg', title: 'Luxury', description: 'Sail across the ocean in a luxury cruise with scenic views.', price: 399 },
  { id: 6, image: '/images/Skiing.jpg', title: 'Adventure', description: 'Enjoy skiing on the best snowy slopes.', price: 249 },
];

// filter chips come from the data, so a new category appears automatically
const categories = ['All', ...new Set(packages.map((p) => p.title))];

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

const emptyForm = { name: '', email: '', date: '', travellers: '2' };

const Services = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const destination = (searchParams.get('destination') || '').trim();

  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null); // package being booked
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');

  const visible = packages.filter((p) => {
    const matchesCategory = category === 'All' || p.title === category;
    const matchesSearch =
      !destination ||
      `${p.title} ${p.description}`.toLowerCase().includes(destination.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openBooking = (pkg) => {
    // prefill from the hero search when the values are there
    setForm({
      ...emptyForm,
      date: searchParams.get('date') || '',
      travellers: searchParams.get('travellers') || '2',
    });
    setErrors({});
    setSelected(pkg);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const found = {};
    if (!form.name.trim()) found.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Enter a valid email address';
    if (!form.date) found.date = 'Choose a travel date';
    return found;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // demo only: there is no backend call here yet
    setToast(`Booking request received for the ${selected.title.toLowerCase()} package.`);
    setSelected(null);
  };

  return (
    <Box
      component="section"
      sx={{ bgcolor: 'var(--surface-warm, #faf8f5)', minHeight: '100vh', py: { xs: 6, md: 8 }, px: 2, ...inheritFont }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{
            fontWeight: 700,
            color: INK,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            letterSpacing: '-0.01em',
          }}
        >
          Travel packages
        </Typography>
        <Typography align="center" sx={{ mt: 1, color: GREY_600, fontSize: '1.1rem' }}>
          Prices are per person. Filter by trip style, then book.
        </Typography>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" justifyContent="center" sx={{ mt: 4, mb: 1 }}>
          {categories.map((c) => (
            <Chip
              key={c}
              label={c}
              clickable
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              sx={
                category === c
                  ? { bgcolor: ACCENT, color: '#fff', fontWeight: 600, '&:hover': { bgcolor: ACCENT_DARK } }
                  : { bgcolor: '#fff', color: INK, fontWeight: 500, border: '1px solid var(--line, #e5e7eb)' }
              }
            />
          ))}
        </Stack>

        <Typography
          align="center"
          aria-live="polite"
          sx={{ color: GREY_600, fontSize: '0.9rem', mb: 4 }}
        >
          Showing {visible.length} of {packages.length} packages
          {destination && ` matching "${destination}"`}
        </Typography>

        {visible.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography sx={{ color: INK, fontSize: '1.2rem', fontWeight: 600 }}>
              No packages match your search
            </Typography>
            <Typography sx={{ color: GREY_600, mt: 1, mb: 3 }}>
              Try a trip style such as beach or wildlife, or clear the search.
            </Typography>
            <AppButton
              onClick={() => {
                setCategory('All');
                navigate('/services');
              }}
            >
              Show all packages
            </AppButton>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {visible.map((p) => (
              <Card
                key={p.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  border: '1px solid var(--line, #e5e7eb)',
                  boxShadow: '0 6px 20px rgba(31, 41, 55, 0.08)',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 32px rgba(31, 41, 55, 0.16)' },
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={p.image}
                    alt={p.description}
                    loading="lazy"
                    sx={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
                  />
                  <Chip
                    label={p.title}
                    size="small"
                    sx={{ position: 'absolute', top: 14, left: 14, bgcolor: 'rgba(17, 24, 39, 0.7)', color: '#fff', fontWeight: 600 }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography component="h2" sx={{ color: INK, fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.4 }}>
                    {p.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Box>
                    <Typography sx={{ color: GREY_600, fontSize: '0.8rem' }}>From</Typography>
                    <Typography sx={{ color: INK, fontWeight: 700, fontSize: '1.4rem', lineHeight: 1.1 }}>
                      {formatPrice(p.price)}
                    </Typography>
                  </Box>
                  <AppButton onClick={() => openBooking(p)}>Book now</AppButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Container>

      <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} fullWidth maxWidth="xs" sx={inheritFont}>
        <form onSubmit={handleSubmit} noValidate>
          <DialogTitle sx={{ color: INK, fontWeight: 700 }}>
            Book the {selected?.title.toLowerCase()} package
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ color: GREY_600, mb: 2 }}>
              {selected && `${formatPrice(selected.price)} per person`}
            </Typography>
            <Stack spacing={2}>
              <TextField
                sx={fieldSx}
                label="Full name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                fullWidth
                autoFocus
              />
              <TextField
                sx={fieldSx}
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                fullWidth
              />
              <TextField
                sx={fieldSx}
                label="Travel date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                error={Boolean(errors.date)}
                helperText={errors.date}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                sx={fieldSx}
                label="Travellers"
                name="travellers"
                type="number"
                value={form.travellers}
                onChange={handleChange}
                inputProps={{ min: 1, max: 10 }}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <AppButton variant="outlined" onClick={() => setSelected(null)}>
              Cancel
            </AppButton>
            <AppButton type="submit">Request booking</AppButton>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={4000}
        onClose={() => setToast('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setToast('')} sx={{ bgcolor: ACCENT_DARK, fontFamily: 'inherit' }}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Services;