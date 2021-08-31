
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
            type="number"
            min="0"
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
          <div class="d-flex justify-center mt-10">
            <v-btn @click="ClearData">Clear All Data</v-btn>
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
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Dob</th>
                  <th>Hobbies</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(person, index) in formDataArray" :key="index">
                  <td>{{ person.name }}</td>
                  <td>{{ person.phoneNumber }}</td>
                  <td>{{ person.address }}</td>
                  <td>{{ person.Dob }}</td>
                  <td>{{ person.hobbies }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-snackbar v-model="snackbar" :multi-line="multiLine">
        {{ snackBarMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
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
      multiLine: true,
      snackbar: false,
      Checksnackbar: false,
      snackBarMessage: "",
      stored: [],
    };
  },

  mounted() {
    let retrievedObject = localStorage.getItem("userDatacreD");
    this.stored = JSON.parse(retrievedObject);

    if (this.stored && this.stored.length) {
      this.sendData();
    }
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
      "StoreData",
    ]),
  },

  methods: {
    ...mapActions("userData", ["Formdata", "clearStoreData", "RetreiveData"]),
    async submit() {
      let checkName = this.name;
      let checkPhone = this.phoneNumber;
      let checkAddress = this.address;
      let checkHobbies = this.hobbies;
      let checkDob = this.Dob;
      if (checkName && checkPhone && checkAddress && checkHobbies && checkDob) {
        let duplicatePresent = false;

        if (this.formDataArray && this.formDataArray.length) {
          this.formDataArray.forEach((el) => {
            if (el.name === checkName) {
              duplicatePresent = true;
            }
          });
        }
        if (duplicatePresent) {
          this.snackBarMessage = "Name already exist";
          this.snackbar = true;
          return;
        }

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

        await this.Formdata(payload);
        this.clearForm();
        this.snackBarMessage = "Form saved";
        this.snackbar = true;
      } else {
        this.snackBarMessage = "Fields can't be empty";
        this.snackbar = true;
      }
    },
    clearForm() {
      (this.name = ""),
        (this.phoneNumber = ""),
        (this.address = ""),
        (this.hobbies = ""),
        (this.Dob = "");
      this.snackBarMessage = "Form data is successfully deleted";
      this.snackbar = true;
    },
    EditForm() {
      if (this.FormData) {
        (this.name = this.FormData.name),
          (this.phoneNumber = this.FormData.phoneNumber),
          (this.address = this.FormData.address),
          (this.hobbies = this.FormData.hobbies),
          (this.Dob = this.FormData.Dob);
      }
    },

    async sendData() {
      await this.RetreiveData(this.stored);
    },

    async ClearStore() {
      this.clearForm();
      await this.clearStoreData();
      this.snackBarMessage = "Store cleared";
      this.snackbar = true;
      this.snackBarMessage = "store data is successfully deleted";
      this.snackbar = true;
    },

    async ClearData() {
      this.clearForm();
      await this.clearStoreData();
      localStorage.removeItem("userDatacreD");
      this.snackBarMessage = "Your data is successfully deleted";
      this.snackbar = true;
    },
  },
};
</script>

<style>
</style>.