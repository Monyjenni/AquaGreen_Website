<template>
  <div class="center-container">
    <aqCard class="card">
      <h1 class="title">
        <span class="aqua-title">Aqua</span>
        <span class="gree-title">Green</span>
      </h1>
      <v-form ref="formRef" @submit.prevent="submitForm" class="signup-form">
        <div class="form-column">
          <div class="left-column">
            <div class="form-group">
              <aqTextField
                v-model="signupData.firstName"
                label="Full Name"
                required
                :rules="fullNameRules"
                variant="outlined"
              ></aqTextField>
            </div>
            <div class="form-group">
              <aqTextField
                v-model="signupData.email"
                label="Email"
                type="email"
                :rules="emailRules"
                required
                variant="outlined"
              ></aqTextField>
            </div>
            <div class="form-group">
              <aqTextField
                v-model="signupData.phoneNumber"
                label="Phone"
                type="text"
                required
                :rules="phoneNumberRules"
                variant="outlined"
              ></aqTextField>
            </div>
            <div class="form-group">
              <aqTextField
                v-model="signupData.password"
                label="Password"
                type="password"
                :rules="passwordRules"
                required
                variant="outlined"
              ></aqTextField>
            </div>
            <div class="form-group">
              <aqTextField
                v-model="signupData.confirmPassword"
                type="password"
                label="Confirm Password"
                :rules="confirmPasswordRules"
                required
                variant="outlined"
              ></aqTextField>
            </div>
          </div>
        </div>
        <div class="center">
          <span
            >Already have an account? <a href="#" @click="toggleMode">Log In</a></span
          >
        </div>
        <div class="form-group full-width-button">
          <aqBtn type="submit" @click="submitForm" label="Sign up" color="#d3781e"/>
        </div>
      </v-form>
    </aqCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import aqBtn from '../../../components/aqBtn.vue'
import aqCard from '../../../components/aqCard.vue'
import aqTextField from '../../../components/aqTextField.vue'

const router = useRouter();

const signupData = ref({
  firstName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  universityName: "",
  faculty: "",
  profilePicture: null,
});

const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 6 || "Password must be at least 6 characters",
  (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
  (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
  (v) => /\d/.test(v) || "Password must contain at least one number",
];

const confirmPasswordRules = [
  (v) => !!v || "Confirm Password is required",
  (v) => v === signupData.value.password || "Passwords do not match",
];

const fullNameRules = [
  (v) => !!v || "Full Name is required",
  (v) => v.length >= 3 || "Full Name must be at least 3 characters",
  (v) =>
    /^[A-Za-z\s]+$/.test(v) ||
    "Full Name should contain only alphabetic characters and spaces",
];

const phoneNumberRules = [
  (v) => !!v || "Phone number is required",
  (v) => /^\d{10}$/.test(v) || "Phone number must be 10 digits",
];

const formRef = ref(null);

const submitForm = () => {
  formRef.value.validate().then((success) => {
    if (success) {
      const formData = new FormData();
      formData.append('firstName', signupData.value.firstName);
      formData.append('email', signupData.value.email);
      formData.append('phoneNumber', signupData.value.phoneNumber);
      formData.append('password', signupData.value.password);
      formData.append('password_confirmation', signupData.value.confirmPassword);
      axios.post('http://localhost:8000/api/register', formData)
        .then(response => {
          console.log(response.data);
          router.push('/login');
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log('Form is not valid');
    }
  });
};


const toggleMode = () => {
  router.push("/login");
};
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/);
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.card {
  width: 500px;
  max-height: 100vh;
  margin: 10px 10px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.aqua-title {
  color: #d3781e;
  font-style: italic;
}

.green-title {
  color: #1d8618;
}

.center {
  text-align: center;
  font-size: 18px;
}

.form-column {
  display: contents;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.full-width-button aqBtn {
  width: 100%;
}

.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #004b8d;
  font-size: 15px;
  margin-top: 10px;
}
</style>
