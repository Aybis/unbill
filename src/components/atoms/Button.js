import { motion } from 'framer-motion';
import React from 'react';
import { Loading } from '.';

export default function Button({ type, value, moreClass, isSubmit = false }) {
  let classBackground;

  if (type === 'in') {
    classBackground = 'bg-blue-600';
  } else if (type === 'out') {
    classBackground = 'bg-red-600';
  } else {
    classBackground = 'bg-blue-600';
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      disabled={isSubmit}
      className={[
        `font-semibold px-8 py-2 text-center mx-auto rounded-md  text-white flex justify-center items-center`,
        isSubmit && 'bg-opacity-50',
        classBackground,
        moreClass,
      ].join(' ')}>
      {isSubmit ? <Loading color="text-white" height={6} width={6} /> : ''}
      <p>{value}</p>
    </motion.button>
  );
}
