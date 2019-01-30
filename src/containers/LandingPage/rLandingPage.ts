import { INPUT_EMAIL, INPUT_SUBJECT, INPUT_BODY } from '../../constans';

const initialEmailContact = {
  email: '',
  subject: '',
  body: '',
};

export const EmailContact = (state = initialEmailContact, action: any = {}) => {
  switch (action.type) {
    case INPUT_EMAIL:
      return Object.assign({}, state, { email: action.payload });
    case INPUT_SUBJECT:
      return Object.assign({}, state, { subject: action.payload });
    case INPUT_BODY:
      return Object.assign({}, state, { body: action.payload });
    default:
      return state;
  }
};
