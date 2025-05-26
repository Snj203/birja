<template>
  <div class="oauth-callback">
    <p>Идет авторизация...</p>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "OAuthCallback",
  setup() {
    const router = useRouter();

    onMounted(async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        console.log(token);
        if(token) {
          const response = await axios.get(
            "http://localhost:8081/api/auth/oauth2/success",
            {
              params: { token }
            }
          );
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data));
        }



        router.push("/");
      } catch (error) {
        console.error("Ошибка при получении токенов:", error);
        router.push("/login");
      }
    });

    return {};
  },
};
</script>

<style scoped>
.oauth-callback {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
