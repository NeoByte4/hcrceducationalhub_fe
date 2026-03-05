import { Label } from "./label";

type Props = {
  children: React.ReactNode;
  label?: string;
  name: string;
  required?: boolean;
  error?: string;
};

const FormElementsWrapper = ({
  children,
  label,
  name,
  error,
  required = false,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label
          className="text-xs uppercase text-text-hint font-secondary"
          htmlFor={name}
        >
          {label}
          {required && <span className="text-primary-dark">*</span>}
        </Label>
      )}
      {children}
      {error && <p className="text-sm text-error font-secondary">*{error}</p>}
    </div>
  );
};

export default FormElementsWrapper;
