import React, { useState, useEffect } from "react";
import c from "./Card.module.scss";

const Card = ({
  className,
  children,
  showTitle = false,
  title = "",
  dataHashId,
  error = false,
  headerClass,
  bodyClass,
  defaultClose = false,
  onTitleClick,
}) => {
  const [show, setShow] = useState(!defaultClose);
  // const [show, setShow] = useState(true);
  useEffect(() => {
    if (defaultClose) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [defaultClose]);

  return (
    <div
      className={`${c.cardContainer} ${!show && error ? c.error : ""} ${
        className ? className : ""
      }`}
    >
      {showTitle && (
        <div
          className={`${c.titleWrapper} ${headerClass ? headerClass : ""}`}
          onClick={() => {
            setShow(!show);
            if (onTitleClick) onTitleClick();
            // onChangeClosed(singleItem);
          }}
        >
          <h3
            data-hash-id={dataHashId ? dataHashId : ""}
            id={dataHashId ? dataHashId : ""}
            className="headerTitle"
          >
            {title || ""}
          </h3>
        </div>
      )}
      {showTitle ? (
        <div
          className={`${c.childWrapper} ${show ? "" : c.hide} ${
            bodyClass ? bodyClass : ""
          }`}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};
export default Card;
