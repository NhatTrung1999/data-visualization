
interface ILabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

const Label = ({ htmlFor, children, className }: ILabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
