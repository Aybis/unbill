import { motion } from 'framer-motion';
import React from 'react';
import { Loading } from '.';

export default function Button({
  type,
  name,
  value,
  moreClass,
  isSubmit = false,
  handlerClick = null,
  children,
}) {
  let classBackground;

  if (type === 'in') {
    classBackground = 'bg-blue-600 shadow-blue-500/50 hover:bg-blue-500';
  } else if (type === 'out') {
    classBackground = 'bg-red-500  shadow-red-500/50 hover:bg-red-700';
  } else {
    classBackground = 'bg-blue-600 shadow-blue-500/50 hover:bg-blue-500';
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      disabled={isSubmit}
      onClick={handlerClick ?? undefined}
      name={name}
      className={[
        `font-semibold px-4 py-2 shadow-md text-center rounded-md  text-white flex justify-center items-center transition-all duration-300 ease-in-out`,
        isSubmit && 'bg-opacity-50',
        classBackground,
        moreClass,
      ].join(' ')}>
      {isSubmit ? <Loading color="text-white" height={5} width={5} /> : ''}
      {children}
    </motion.button>
  );
}
