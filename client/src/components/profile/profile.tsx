import React, { useState } from "react";

import { DownArrow } from "assets/svg";

import s from "./style.module.css";

export interface IProfileMenuList {
  name: string;
  onClick: () => void;
}

interface IProfile {
  user: {
    name: string;
    surname: string;
  };
  buttons: IProfileMenuList[];
}

export function Profile(props: IProfile) {
  const { user, buttons } = props;
  const [ isShowMenu, setIsShowMenu ] = useState<boolean>(false);
  const handleMenu = () => setIsShowMenu(!isShowMenu);

  const list = buttons.map((li, index) => {
    return (
      <button key={index} onClick={li.onClick}>{li.name}</button>
    )
  });

  return (
    <button className={s.container} onClick={handleMenu}>
      <p>{`${user.name} ${user.surname}`}</p>
      <DownArrow />
      {isShowMenu && <div className={s.menu}>{list}</div>}
    </button>
  )
}
