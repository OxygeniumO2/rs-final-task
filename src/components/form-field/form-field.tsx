import { FormikProps } from 'formik';
import { FormValues } from '../../interfaces/interfaces';
import styles from './form-field.module.scss';

interface FormFieldProps<T extends FormValues> {
  stylesField?: string;
  stylesError?: string;
  stylesInput?: string;
  showError?: boolean;
  isRequired?: boolean;
  formik: FormikProps<T>;
  labelText: string;
  id: string;
  name: keyof T;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  children?: React.ReactNode;
  value?: string;
  min?: string;
  max?: string;
}

const FormField = <T extends FormValues>({
  stylesField,
  stylesError,
  stylesInput,
  showError = true,
  isRequired = false,
  formik,
  labelText,
  placeholder,
  id,
  name,
  type,
  autoComplete,
  children,
  min,
  max,
}: FormFieldProps<T>) => {
  return (
    <div className={stylesField}>
      <label className={styles.label} htmlFor={id}>
        {labelText}
        {isRequired ? <span>*</span> : ''}
      </label>
      <div style={{ width: 'fit-content' }}>
        <input
          className={stylesInput}
          style={
            formik.touched[name] && formik.errors[name]
              ? { borderColor: 'red', outlineColor: 'red' }
              : formik.values[name]
                ? { borderColor: 'green', outlineColor: 'green' }
                : { outlineColor: 'blue' }
          }
          min={min}
          max={max}
          id={id}
          name={name as string}
          placeholder={placeholder}
          type={type}
          autoComplete={autoComplete}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched(name as string, true, false);
          }}
          onBlur={() => {
            formik.handleBlur(name);
          }}
          value={formik.values[name]}
        />
        {children}
      </div>
      {showError && formik.touched[name] && formik.errors[name] ? (
        <div className={stylesError}>{formik.errors[name] as string}</div>
      ) : null}
    </div>
  );
};

export default FormField;
