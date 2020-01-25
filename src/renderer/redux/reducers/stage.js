const initialStruct = {
    status: null,
    version: null
};

const initialState = {
    marketplace: { ...initialStruct },
    organization: { ...initialStruct }
};

export default (state = initialState, action) => {
    switch (action.type) {
    }
};
