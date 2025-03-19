<template>
  <div class="center-container">
    <aqCard class="card">
      <h1 class="title">
        <span class="aqua-title">Aqua</span>
        <span class="green-title">Green</span>
      </h1>
      <div class="v-form">
        <v-form ref="formRef" @submit.prevent="submitForm" class="login-form">
          <div class="form-group">
            <aqTextField
              v-model="userData.userName"
              label="Full Name"
              :rules="fullNameRules"
              required
            ></aqTextField>
          </div>
          <div class="form-group">
            <aqTextField
              v-model="userData.password"
              label="Password"
              type="password"
              :rules="passwordRules"
              required
            ></aqTextField>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="register" v-model="register" />
            <label for="register">Remember me</label>
          </div>
          <div class="form-group full-width-button">
            <aqBtn type="submit" @click="submitForm" label="Login" color="#d3781e"/>
          </div>
        </v-form>
      </div>
    </aqCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import aqBtn from '../../../components/aqBtn.vue'
import aqCard from '../../../components/aqCard.vue'
import aqTextField from '../../../components/aqTextField.vue'

const router = useRouter();

const userData = ref({
  userName: "",
  password: "",
});

const register = ref(false);

const fullNameRules = [
  (v) => !!v || "Username is required",
  (v) => v.length >= 3 || "Username must be at least 3 characters",
  (v) =>
    /^[a-zA-Z0-9_]+$/.test(v) ||
    "Username can only contain alphanumeric characters and underscores",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 6 || "Password must be at least 6 characters",
  (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
  (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
  (v) => /\d/.test(v) || "Password must contain at least one number",
];

const formRef = ref(null);

const submitForm = () => {
  formRef.value.validate().then((success) => {
    if (success) {
      console.log("Admin login submitted:", userData.value);
      router.push("");
    } else {
      console.log("Form is not valid");
    }
  });
};
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 1200px; /* Increased width for a larger card */
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
}

.aqua-title {
  color: #d3781e;
  font-style: italic;
}

.green-title {
  color: #1d8618;
  font-style: italic;
}

.v-form {
  display: flex;
  justify-content: center;
}

.login-form {
  width: 100%;
  max-width: 600px; /* Adjusted for larger form inside the card */
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.full-width-button {
  display: flex;
  justify-content: center;
}

.checkbox {
  display: flex;
  align-items: center;
  color: #004b8d;
  font-size: 15px;
}
</style>
