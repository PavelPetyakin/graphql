import React, { SyntheticEvent, useState } from "react";
import cx from "classnames";

import s from "./style.module.css";

interface IDropdown {
  label?: string; //
  name: string;
  value: string;
  className?: string; //
  onChange: (val: SyntheticEvent<HTMLInputElement>) => void;
}

export function Dropdown(props: IDropdown) {
  const { label, className="", value, ...other } = props;
  const [ isShow, setIsShow ] = useState<boolean>(false);

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
          <input type="radio" value="English" {...other} />
        </label>
        <label className={s.label}>
          <span>French</span>
          <input type="radio" value="French" {...other} />
        </label>
      </div>)}
    </div>
  );
}
