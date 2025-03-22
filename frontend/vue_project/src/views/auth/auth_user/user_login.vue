<template>
  <div class="center-container">
    <aqCard class="aq-card">
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
              variant="outlined"
            />
          </div>
          <div class="form-group">
            <aqTextField
              v-model="userData.password"
              label="Password"
              type="password"
              :rules="passwordRules"
              variant="outlined"
              required
            ></aqTextField>
          </div>
          <div class="form-group full-width-button">
            <aqBtn type="submit" @click="submitForm" label="Login" color="#d3781e" />
          </div>
        </v-form>
      </div>
    </aqCard>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import aqBtn from "../../../components/aqBtn.vue";
import aqCard from "../../../components/aqCard.vue";
import aqTextField from "../../../components/aqTextField.vue";

const router = useRouter();

const userData = ref({
  userName: "",
  password: "",
});

const fullNameRules = [
  (v) => !!v || "Username is required",
  (v) => v.length >= 3 || "Username must be at least 3 characters",
  (v) => /^[a-zA-Z0-9_]+$/.test(v) || "Username can only contain alphanumeric characters and underscores",
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
      axios
        .post("http://localhost:8000/api/login", {
          username: userData.value.userName,
          password: userData.value.password,
        })
        .then((response) => {
          console.log("Login successful:", response.data);
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Login failed:", error.response.data);
        });
    } else {
      console.log("Form is not valid");
    }
  });
};
</script>

<style scoped>
.aq-card {
  width: 500px;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;
  margin: auto;
  justify-content: center;
}

.title {
  font-size: 32px;
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
  font-style: italic;
}
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
;
