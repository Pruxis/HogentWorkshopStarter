import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ style, ...props }) => <input {...props} />;

export default Input;
