import { useState, FC, ChangeEventHandler } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface PasswordInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
  className?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = 'Құпиясөз',
  name = 'password',
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 pr-10 rounded bg-slate-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 focus:outline-none"
        aria-label={showPassword ? 'Құпиясөзді жасыру' : 'Құпиясөзді көрсету'}
      >
        {showPassword ? (
          <EyeSlashIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
