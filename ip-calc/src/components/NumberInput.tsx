import { useState } from "react";

interface NumberInputProps {
  onChange: (value: number) => void;
  value: number;
  max?: number;
}

export default function NumberInput(props: NumberInputProps) {
  const { onChange, value, max } = props;

  const [dirtyValue, setDirtyValue] = useState(value.toString());

  return (
    <input
      type="text"
      value={dirtyValue}
      onChange={(e) => {
        const val = e.target.value
          ? String(e.target.value.trim())
          : String(e.target.value);

        if (val === "") {
          setDirtyValue(val);
        }

        if (val.match(/^\d+?$/)) {
          setDirtyValue(val);
          const parsed = parseInt(val, 10);

          onChange(max ? Math.min(parsed, max) : parsed);
        }
      }}
      onBlur={(e) => {
        const val = e.target.value
          ? String(e.target.value.trim())
          : String(e.target.value);
        if (val === "") {
          setDirtyValue("0");
          onChange(0);
        } else {
          const parsed = parseInt(val, 10);
          setDirtyValue(
            max ? Math.min(parsed, max).toString() : parsed.toString()
          );
        }
      }}
    />
  );
}
