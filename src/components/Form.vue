
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6" md="8">
          <v-text-field
            outlined
            placeholder="Enter Name"
            v-model="name"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="phoneNumber"
            placeholder="Enter mobile no."
          ></v-text-field>
          <v-text-field
            outlined
            v-model="address"
            placeholder="Enter address"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="Dob"
            placeholder="Enter Date of birth"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="hobbies"
            placeholder="Enter hobbies"
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="4">
          <div class="d-flex justify-center mt-10" @click="submit">
            <v-btn>Save</v-btn>
          </div>
          <div class="d-flex justify-center mt-10" @click="EditForm">
            <v-btn>Edit</v-btn>
          </div>
          <div class="d-flex justify-center mt-10">
            <v-btn @click="clearForm">Clear Form</v-btn>
          </div>
          <div class="d-flex justify-center mt-10">
            <v-btn @click="ClearStore">Clear Store</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <div>Name: {{ getName }}</div>
          <div>Phone: {{ getPhoneNumber }}</div>
          <div>Address: {{ getAddress }}</div>
          <div>Dob: {{ getHobbies }}</div>
          <div>Hobbies: {{ getDob }}</div>
        </v-col>
        <v-col cols="6">
          <div>ArrayData: {{ formDataArray }}</div>
          <div></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Form",
  data() {
    return {
      name: "",
      phoneNumber: "",
      address: "",
      hobbies: "",
      Dob: "",
    };
  },
  computed: {
    ...mapGetters("userData", [
      "FormData",
      "getName",
      "getPhoneNumber",
      "getAddress",
      "getHobbies",
      "getDob",
      "formDataArray",
    ]),
  },

  methods: {
    ...mapActions("userData", ["Formdata", "clearStoreData"]),
    submit() {
      let payload = {
        name: "",
        phoneNumber: "",
        address: "",
        hobbies: "",
        Dob: "",
      };

      (payload.name = this.name),
        (payload.phoneNumber = this.phoneNumber),
        (payload.address = this.address),
        (payload.hobbies = this.hobbies),
        (payload.Dob = this.Dob);
      this.Formdata(payload);
      this.clearForm();
    },
    clearForm() {
      (this.name = ""),
        (this.phoneNumber = ""),
        (this.address = ""),
        (this.hobbies = ""),
        (this.Dob = "");
    },
    EditForm() {
      (this.name = this.FormData.name),
        (this.phoneNumber = this.FormData.phoneNumber),
        (this.address = this.FormData.address),
        (this.hobbies = this.FormData.hobbies),
        (this.Dob = this.FormData.Dob);
    },
    ClearStore() {
      this.clearStoreData();
    },
  },
};
</script>

<style>
</style>.