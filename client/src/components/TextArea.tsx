import { TextareaHTMLAttributes } from 'react';

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {}

export const TextArea = ({ ...props }: TextAreaProps) => {
  return (
    <textarea
      className="p-2 w-full text-md placeholder-gray-500 text-gray-500 border border-gray-200 bg-transparent rounded-lg resize-none focus:border-indigo-700 outline-none focus:ring-1 focus:ring-indigo-700"
      {...props}
    ></textarea>
  );
};
