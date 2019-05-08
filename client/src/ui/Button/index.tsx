import React from 'react';

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
  type: 'submit' | 'button' | 'reset' | undefined;
  className?: string;
  style?: React.CSSProperties;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({ children, onClick, type, style, className }) => (
  <button
    className={className}
    type={type}
    style={{
      color: 'white',
      backgroundColor: '#DCDDF7',
      display: 'inline-block',
      fontWeight: 400,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      cursor: 'pointer',
      backgroundImage: 'none',
      border: '1px solid transparent',
      padding: '6px 12px',
      fontSize: '14px',
      height: '36px',
      ...style,
    }}
    onClick={onClick}>
    {children}
  </button>
);

export default Button;
