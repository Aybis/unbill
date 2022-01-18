import { useState } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (initialValues) => {
  const [state, setState] = useState(initialValues);

  return [
    state,
    (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    },
    (newState) => {
      setState({
        ...state,
        ...newState,
      });
    },
  ];
};
