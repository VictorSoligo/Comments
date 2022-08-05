import Image from 'next/image';

import { useAuth } from '../contexts/Auth';

import classnames from 'classnames';

type ButtonProps = {
  onClick: () => void;
  text: string;
  icon: any;
  variant?: 'delete';
};

export const Button = ({ onClick, text, variant, icon }: ButtonProps) => {
  const { user } = useAuth();

  return (
    <button
      onClick={onClick}
      disabled={!user}
      className={classnames("flex items-center p-2 transition-colors rounded-md disabled:cursor-not-allowed", {
        "hover:bg-indigo-100": variant !== 'delete',
        "hover:bg-red-100": variant === 'delete',
      })}
    >
      <Image
        src={icon}
        height={16}
        width={16}
      />

      <span
        className={classnames('font-semibold ml-2', {
          'text-indigo-700': variant !== 'delete',
          'text-red-600': variant === 'delete',
        })}
      >
        {text}
      </span>
    </button>
  );
};
