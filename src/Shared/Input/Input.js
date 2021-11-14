import React, { useState, useRef, useImperativeHandle, useEffect } from "react";
import c from "./Input.module.scss";
const Input = React.forwardRef(
  (
    {
      className,
      maxWidth,
      type,
      placeholder,
      onClick,
      onChange,
      value,
      disabled,
      onKeyPress,
      required,
      custom,
      maxLength,
      minLength,
      isError,
      errorMsg = false,
      outerBoxClass,
      onBlur = true,
      customValidation = false,
      isSearch = false,
      onfocus,
    },
    ref
  ) => {
    const inputRef = useRef();
    const [isValid, setIsValid] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const inputClass = [
      className ? className : "",
      c.inputField,
      isValid ? "" : c.invalid,
      isSearch ? c.searchField : "",
    ];

    useEffect(() => {
      if (!isValid) validateInput();
    }, [inputValue]);

    useEffect(() => {
      setIsValid(!isError);
    }, [isError]);

    useEffect(() => {
      if (typeof value != "undefined") setInputValue(value);
    }, [value]);

    const activate = () => {
      inputRef.current.focus();
    };

    const getValue = () => {
      if (typeof value == "string") {
        return inputValue.trim();
      }
      return inputValue;
    };

    const clearValue = () => {
      setInputValue("");
    };

    const onInputChange = (e) => {
      setInputValue(inputRef.current.value);
      if (typeof onChange === "function") onChange(e);
    };

    const validateInput = () => {
      let min = minLength || 1;
      let max = maxLength || 10000000000;
      let isTempValid = true;
      if (required && (getValue().length < min || getValue().length > max))
        isTempValid = false;
      else if (typeof custom === "function" && !custom(getValue()))
        isTempValid = false;

      if (customValidation) {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if (!format.test(getValue())) {
          isTempValid = true;
        } else {
          isTempValid = false;
        }
      }
      setIsValid(isTempValid);
      return isTempValid;
    };
    useImperativeHandle(ref, () => {
      return {
        focus: activate,
        value: getValue,
        validate: validateInput,
        clear: clearValue,
      };
    });

    const incrementCounter = () => {
      let value = Number(inputValue) + 1;
      setInputValue(value.toString());
      if (typeof onChange === "function" && onChange)
        onChange({
          target: {
            value: value.toString(),
          },
        });
    };

    let decrementCounter = () => {
      let value = inputValue <= 0 ? 0 : Number(inputValue) - 1;
      setInputValue(value.toString());
      if (typeof onChange === "function" && onChange)
        onChange({
          target: {
            value: value.toString(),
          },
        });
    };

    return (
      <>
        <div
          className={`${c.inputBox} ${maxWidth ? maxWidth : ""} ${
            outerBoxClass ? outerBoxClass : ""
          }`}
        >
          <input
            className={inputClass.join(" ")}
            value={inputValue}
            type={type}
            placeholder={placeholder}
            onChange={onInputChange}
            onClick={onClick}
            disabled={disabled}
            ref={inputRef}
            onKeyPress={onKeyPress}
            onBlur={onBlur ? validateInput : null}
            min={minLength}
            onFocus={onfocus}
          />
          {type == "number" && !disabled && (
            <>
              <div className={c.sortingArrowWrapper}>
                <div
                  className={`${c.sortingArrow} ${c.sortingArrowUp}`}
                  onClick={incrementCounter}
                ></div>
                <div
                  className={`${c.sortingArrow} ${c.sortingArrowDown}`}
                  onClick={decrementCounter}
                ></div>
              </div>
            </>
          )}
        </div>
        {errorMsg
          ? !isValid && <div className="textError">{errorMsg}</div>
          : ""}
      </>
    );
  }
);

export default Input;
