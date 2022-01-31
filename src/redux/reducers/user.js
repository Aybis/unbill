import * as type from '../types/user';

const initialState = {
  session: '',
  avatar: '',
  listUnit: {},
  isValidation: false,
  refresh: '',
  profile: {},
  isLoading: false,
  isError: false,
  message: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.SESSION:
      return {
        ...state,
        session: action.payload,
        isValidation: true,
      };

    case type.REFRESH:
      return {
        ...state,
        refresh: action.payload,
      };

    case type.IMAGE:
      return {
        ...state,
        avatar: action.payload,
      };

    case type.LIST_UNIT:
      return {
        ...state,
        listUnit: action.payload,
      };

    case type.PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    case type.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case type.MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
}
