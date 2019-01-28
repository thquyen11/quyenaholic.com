import { SAMPLE_CONSTANS } from 'constans';

const initialsampleReducer = {
  sampleState: '',
};

export const sampleReducer = (state = initialsampleReducer, action: any = {}) => {
  switch (action.type) {
    case SAMPLE_CONSTANS:
      return Object.assign({}, state, { isSignedIn: true });
    default:
      return state;
  }
};
