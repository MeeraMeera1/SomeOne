//action types
const LOAD_NAMES = '/names/LOAD_NAMES';
const CREATE_NAME = "/names/CREATE_NAME";
const REMOVE_NAME = "/names/REMOVE_NAME";

//action creators 
const load = (names) => ({
    type: LOAD_NAMES,
    names,
});

const create = (name) => ({
    type: CREATE_NAME,
    pet,
});

const remove = (nameId) => ({
    type: REMOVE_NAME,
    nameId
})

//thunks
export const getNames = () => async (dispatch) => {
    const res = await fetch('/api/displaynames');
    const json = await res.json();
    if (res.ok) {
        dispatch(load(json.names));
    }
};