import { createRouter, createWebHistory } from "vue-router";

import UserLogin from "@/pages/auth/userScreen/user_login.vue";
import UserRegister from "@/pages/auth/userScreen/user_register.vue";
import File_Upload from "@/pages/user/file_upload.vue";

const router = createRouter({
  history: createWebHistory(), // Remove process.env.BASE_URL
  routes: [
    {
      path: "/login",
      name: "login",
      component: UserLogin,
    },
    {
      path: "/register",
      name: "register",
      component: UserRegister,
    },
    {
      path: "/file_upload",
      name: "file_upload",
      component: File_Upload,
    },
  ],
});

export default router; 
