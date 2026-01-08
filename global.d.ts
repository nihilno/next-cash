declare global {
  type DatePickerProps = {
    value: Date;
    onChange: (date: Date | undefined) => void;
  };
}

export {};
