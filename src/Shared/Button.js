import React from "react";
import c from "./Button.module.scss";

export const ButtonTypes = {
  default_btn: "themBtn",
  primary_btn: "themBtnBg",
  primaryHover_btn: "themeDefaultBtn",
};

const Button = ({
  className,
  btnTheme,
  label,
  onClick,
  disable,
  children,
  type,
}) => {
  return (
    <button
      className={`${c.commonStyle} ${btnTheme ? c[btnTheme] : ""} ${
        className ? className : ""
      }`}
      onClick={onClick}
      disabled={disable ? true : false}
      type={type || "button"}
    >
      {label || children}
    </button>
  );
};
export default Button;
