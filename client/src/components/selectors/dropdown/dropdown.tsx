import React from "react";
import Select from "react-select";
import cx from "classnames";

import s from "./style.module.css";

interface IDropdown {
  label?: string;
  name: string;
  value: { value: string, label: string };
  className?: string;
  onChange: (val: Record<string, string>) => void;
  options: { value: string, label: string }[];
}

const customStyles = {
  control: (_: any, selectProps: any) => ({
    display: "flex",
    width: "240px",
    height: "42px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: selectProps.isFocused ? "#458CF8" : "#FAF00C",
    borderRadius: "5px",
    boxShadow: "0 3px 5px 0 rgba(0,0,0,0.2)",
  }),
}


export function Dropdown(props: IDropdown) {
  const { label, name, className, value, onChange, options } = props;
  const handleChange = (value: any, actionMeta: any) => {
    onChange({ [actionMeta.name]: value })
  }

  return (
    <div className={cx(s.container, className)}>
      {label}
      <Select
        styles={customStyles}
        value={value}
        name={name}
        onChange={handleChange}
        options={options}
        isSearchable={false}
      />
    </div>
  );
}
