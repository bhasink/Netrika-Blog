import Vuex from '../libs/vuex'
import formFields from "./data";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        formFields,
        hasAccess: false,
    },
    getters: {
        getFields: state => {
            return state.formFields;
        },

        getStyles: state => {
            return state.styleData;
        },
    },
});