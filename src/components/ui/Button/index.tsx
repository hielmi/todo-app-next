import styles from "./Button.module.scss";

interface PropsTypes {
  type: "button" | "submit" | "reset";
  onClick?: (e: any) => void;
  isDisabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success" | "outlined";
  children: React.ReactNode;
  className?: string;
}

const Button = (props: PropsTypes) => {
  const {
    children,
    type,
    onClick,
    isDisabled,
    variant = "primary",
    className,
  } = props;
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={`${styles.button} ${styles[variant]} ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
