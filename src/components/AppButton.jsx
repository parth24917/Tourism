import { Button } from '@mui/material';

const ACCENT = 'var(--accent, #2f5bea)';
const ACCENT_DARK = 'var(--accent-dark, #2347c0)';
const ACCENT_TINT = 'var(--accent-tint, #e8edfd)';

// Every button on the site goes through this, so branding lives in one place.
// onDark: use on photos or the dark navbar (white outline instead of the accent).
export default function AppButton({
  variant = 'contained',
  size = 'medium',
  onDark = false,
  sx,
  ...props
}) {
  const filled = variant === 'contained';

  const colours = filled
    ? { bgcolor: ACCENT, '&:hover': { bgcolor: ACCENT_DARK } }
    : onDark
    ? {
        color: '#fff',
        borderColor: '#fff',
        '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255, 255, 255, 0.15)' },
      }
    : {
        color: ACCENT_DARK,
        borderColor: ACCENT,
        '&:hover': { borderColor: ACCENT_DARK, bgcolor: ACCENT_TINT },
      };

  return (
    <Button
      variant={variant}
      size={size}
      disableElevation
      sx={{
        textTransform: 'none', // MUI buttons are ALL CAPS by default
        fontFamily: 'inherit',
        fontWeight: 600,
        borderRadius: 2,
        px: 3,
        ...(size === 'large' && { py: 1.3, fontSize: '1.05rem' }),
        ...colours,
        ...sx,
      }}
      {...props}
    />
  );
}