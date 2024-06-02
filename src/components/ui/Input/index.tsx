import styles from "./Input.module.scss";
type PropsTypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  icon?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (e: any) => void;
};

const Input = (props: PropsTypes) => {
  const {
    label,
    name,
    type,
    icon,
    placeholder,
    defaultValue,
    disabled = false,
    className,
    onChange,
  } = props;
  return (
    <div className={`${styles.container} ${className}`}>
      {icon && <i className={`${styles.container__icon} ${icon}`}></i>}
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={styles.container__input}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
