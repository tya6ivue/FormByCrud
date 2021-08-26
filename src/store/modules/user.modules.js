const state = {
  form: null,
  name: "",
  phoneNumber: "",
  address: "",
  hobbies: "",
  Dob: "",
  formData: [],
};

const getters = {
  FormData() {
    return state.form;
  },
  formDataArray() {
    return state.formData;
  },
  getName() {
    return state.name;
  },
  getPhoneNumber() {
    return state.phoneNumber;
  },
  getAddress() {
    return state.address;
  },
  getHobbies() {
    return state.hobbies;
  },
  getDob() {
    return state.Dob;
  },
};

const mutations = {
  FORM_DATA(state, paylaod) {
    state.form = paylaod;
    state.name = paylaod.name;
    state.address = paylaod.address;
    state.phoneNumber = paylaod.phoneNumber;
    state.Dob = paylaod.Dob;
    state.hobbies = paylaod.hobbies;
    state.formData.push(paylaod);
  },
  CLEAR_STORE(state) {
    state.form = null;
    state.name = "";
    state.address = "";
    state.phoneNumber = "";
    state.Dob = "";
    state.hobbies = "";
    state.formData = [];
  },
};

const actions = {
  Formdata({ commit }, paylaod) {
    commit("FORM_DATA", paylaod);
  },
  clearStoreData({ commit }) {
    commit("CLEAR_STORE");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
