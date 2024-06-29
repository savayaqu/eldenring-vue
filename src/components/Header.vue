<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import router from "@/router/index.js";
import Button from "@/components/Button.vue";
import { logOut } from "@/api/methods/auth/logOut.js";
import {onMounted, ref, watch} from "vue";

const profile = ref([]);
const originalProducts = ref([]); // Сохраняем оригинальный список продуктов
const state = useAuthStore();
const { token } = storeToRefs(state);



const handleLogout = async () => {
  await logOut();
  state.setToken('');
  await router.push({ name: 'login' });
};


</script>
<template>
  <header class="header">
    <ul class="list">
      <li class="item">
        <router-link to="/"><img class="img" src="" alt="Логотип"></router-link>
      </li>
      <template v-if="token">
        <li class="item">
          <router-link to="/profile"><img class="img-icon" src="" alt="Профиль"></router-link>
        </li>
        <li class="item">
          <Button @click="handleLogout()">Выход</Button>
        </li>
      </template>
      <template v-else>
        <li class="item">
          <router-link to="/login">Вход</router-link>
        </li>
        <li class="item">
          <router-link to="/register">Регистрация</router-link>
        </li>
      </template>
    </ul>
  </header>
</template>



<style scoped>
.img {
  width: 120px;
  height: 120px;
}
input {
  width: 270px;
  height: 30px;
  border-radius: 10px;
  border: none;
  font-size: 24px;
}
.products {
  list-style: none;
  width: 250px;
}
.list_products {
  margin-top: 5px;
}
.header__search {
  position: relative;
  width: 100%;
  max-height: 50px;
  background: gray;
  color: white;
  overflow-y: auto;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  z-index: 1060;
  top: 100%;
  border: 1px solid darkgray;
  border-top: 0;
}
.list {
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: space-around;
  list-style-type: none;
}
.item a {
  padding: 8px 10px;
  color: black;
  transition: .15s linear all;
}
.item a:hover {
  color: gray;
}
.img-icon {
  height: 30px;
  width: 30px;
}
</style>