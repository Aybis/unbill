import { motion } from 'framer-motion';
import React from 'react';
import { InputRadio } from '../atoms';

export default function GroupInputRadio({
  data,
  title,
  setState,
  textName,
  handlerOnClick,
  isSelected = 0,
}) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.09,
        staggerChildren: 0.05,
      },
    },
  };

  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <motion.div className="relative">
      <h1 className="font-semibold text-zinc-700 ">{title}</h1>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={`grid grid-cols-${data.length} gap-2 py-3 px-2 bg-zinc-200 bg-opacity-70 rounded-lg mt-2`}>
        {data.map((item, index) => (
          <InputRadio
            key={index}
            handlerOnClick={handlerOnClick}
            selected={isSelected}
            label={textName === 'kondisi' ? capitalize(item) : item}
            name={textName}
            value={textName === 'is_shift' ? index + 1 : item}
            setState={setState}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
