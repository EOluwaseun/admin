import React from 'react';

function CustomInput(props) {
  const { type, label, i_id, i_class, name, val, onbl, onCh } = props;
  return (
    <div>
      <input
        type={type}
        className={`p-4 bg-transparent bg-slate-50 border outline-none w-full mb-3 ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onBlur={onbl}
        onChange={onCh}
      />
      {/* <label htmlFor={label}>{label}</label> */}
    </div>
  );
}

export default CustomInput;
