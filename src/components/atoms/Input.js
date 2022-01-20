import React from 'react';

export default function Input({
  label,
  name,
  value,
  handlerChange,
  disabled = false,
  readonly = false,
  placeholder = '',
  info = '',
  type = 'text',
  required = true,
  inputClassName,
}) {
  return (
    <div className="relative">
      <label
        htmlFor="first-name"
        className="block text-sm font-medium text-zinc-700 capitalize">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          disabled={disabled}
          readOnly={readonly}
          autoComplete="off"
          value={value}
          name={name}
          onChange={handlerChange}
          placeholder={placeholder}
          required={required}
          className={[
            'disabled:bg-opacity-20  shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-zinc-300 rounded-md',
            readonly && 'bg-zinc-300 cursor-not-allowed',
            inputClassName,
          ].join(' ')}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">{info}</p>
    </div>
  );
}
