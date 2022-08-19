import React from "react";

export default function Input({
  name,
  type,
  lable,
  value,
  onChange,
  autoComplete,
  errors,
  classlabel,
  classinput
}) {
  return (
    <div>
      <label htmlFor={name} className={classlabel}>
        {lable}
      </label>
      <div className="mt-1">
        <input
          onChange={onChange}
          id={name}
          name={name}
          value={value}
          type={type}
          autoComplete={autoComplete}
          className={classinput}
        />
        {errors && (
          <div className="w-full flex justify-start px-2 text-red-600 h-auto text-1xl ">
            {errors}
          </div>
        )}
      </div>
    </div>
  );
}
