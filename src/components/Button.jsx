import { Link } from 'react-router-dom';
import AppButton from './AppButton';

// Maps the old class-name props onto MUI props, so existing call sites keep working.
const STYLES = {
  'btn--primary': { variant: 'contained' },
  'btn--outline': { variant: 'outlined', onDark: true }, // old outline was white-on-dark
  'btn--test': { variant: 'contained' },
};

const SIZES = {
  'btn--medium': 'medium',
  'btn--large': 'large',
};

export const Button = ({
  children,
  to, // pass a route to make it a link; leave it out for a normal button
  type = 'button',
  onClick,
  buttonStyle,
  buttonSize,
  ...rest
}) => {
  const { variant, onDark } = STYLES[buttonStyle] || STYLES['btn--primary'];
  const size = SIZES[buttonSize] || 'medium';

  // A link renders as <a> (no button nested inside a link); otherwise a real <button>
  const elementProps = to ? { component: Link, to } : { type };

  return (
    <AppButton
      variant={variant}
      onDark={onDark}
      size={size}
      onClick={onClick}
      {...elementProps}
      {...rest}
    >
      {children}
    </AppButton>
  );
};

export default Button;