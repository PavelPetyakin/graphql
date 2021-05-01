import React, { SyntheticEvent, useState } from "react";
import cx from "classnames";

import s from "./style.module.css";

interface IDropdown {
  label?: string;
  name: string;
  value: string;
  className?: string;
  onChange: (val: Record<string, string>) => void;
}

export function Dropdown(props: IDropdown) {
  // eslint-disable-next-line no-unused-vars
  const { label, name, className, value, onChange, ...other } = props;
  const [ isShow, setIsShow ] = useState<boolean>(false);
  const [ selectedValue, setSelectedValue ] =
    useState<Record<string, string>>({ [name]: value });
  console.log("selectedValue:", selectedValue)
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setSelectedValue({ [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <div className={s.container}>
      {label}
      <input
        className={cx(s.select, className, { [s.active]: isShow })}
        value={value}
        readOnly={true}
        onClick={() => setIsShow(!isShow)}
      />
      {isShow && (<div className={s.options}>
        <label className={s.label}>
          <span>English</span>
          <input
            name={name}
            type="radio"
            value="English"
            onChange={handleChange}
            {...other}
          />
        </label>
        <label className={s.label}>
          <span>French</span>
          <input
            name={name}
            type="radio"
            value="French"
            onChange={handleChange}
            {...other}
          />
        </label>
      </div>)}
    </div>
  );
}
