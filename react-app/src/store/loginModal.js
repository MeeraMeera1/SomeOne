const SHOW = "loginModal/SHOW";

const HIDE = "loginModal/HIDE";

export const ShowModal = () => ({ type: SHOW });

export const HideModal = () => ({ type: HIDE });

export default function reducer(state = { display: false }, action) {
  switch (action.type) {
    case SHOW:
      return { ...state, display: true };
    case HIDE:
      return { ...state, display: false };
    default:
      return state;
  }
}
