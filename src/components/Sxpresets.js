const ACCENT = 'var(--accent, #2f5bea)';
const ACCENT_DARK = 'var(--accent-dark, #2347c0)';
const ACCENT_TINT = 'var(--accent-tint, #e8edfd)';

// MUI sets its own font (Roboto) on every component; this makes them use the site font.
export const inheritFont = {
  '& .MuiTypography-root, & .MuiButton-root, & .MuiChip-root, & .MuiInputBase-root, & .MuiInputLabel-root, & .MuiFormHelperText-root, & .MuiAlert-root, & .MuiMenuItem-root': {
    fontFamily: 'inherit',
  },
};

// Without a theme, MUI focuses inputs in its default blue. This keeps focus on the site accent.
export const fieldSx = {
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: ACCENT,
  },
  '& .MuiInputLabel-root.Mui-focused': { color: ACCENT_DARK },
};

// For a Select's dropdown, which renders in a portal outside the parent component.
export const menuSx = {
  ...inheritFont,
  '& .MuiMenuItem-root.Mui-selected, & .MuiMenuItem-root.Mui-selected:hover': {
    bgcolor: ACCENT_TINT,
  },
};