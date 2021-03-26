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
    name,
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

export const createName = (name, nameIdtoUpdate = null) => async (dispatch) => {
    const {
        nameId,
        display_name,
    } = name;

    const formData = new FormData();
    formData.append('nameId', nameId);
    formData.append('display_name', display_name);

    if (nameIdtoUpdate) {
        const res = await fetch(`/api/displaynames/${nameIdtoUpdate}`, {
            method: 'PUT',
            body: formData,
        });

        const updatedName = await res.json();

        if (res.ok) {
            dispatch(create(updatedName));
            return updatedName;
        } else {
            const errors = name;
            return errors;
        }
    } else {
        const res = await fetch('/api/displaynames', {
            method: 'POST',
            body: formData,
        });

        const name = await res.json();

        if (!name.errors) {
            dispatch(create(name));
            return name;
        } else {
            const errors = name;
            return errors;
        }
    }
};

export const deleteName = (nameId) => async (dispatch) => {
    const res = await fetch(`/api/pets/${nameId}`, {
        method: 'Delete',
    });

    if(res.ok) {
        dispatch(remove(nameId));
    }
};