<script setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import {reactive, ref} from "vue";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";
import {login} from "@/api/methods/auth/login.js";
import {useAuthStore} from "@/stores/auth.js";

const { setToken} = useAuthStore()

const inputData = reactive({
  nickname: '',
  password: '',
})

const errors = reactive({
  data: {},
  message: ''
})

const isLoading = ref(false)

const onSubmit = async () => {
  isLoading.value = true;

  errors.data = {};
  const data = await login(inputData.nickname, inputData.password);
  isLoading.value = false;

  if (data?.code === 422) {
    errors.data = data.errors; // Обрабатываем поле `errors`
    inputData.nickname = ''
    inputData.password = ''
    return;
  }
  if (data?.code === 401) {
    errors.message = data.message; // Обрабатываем поле `errors`
    inputData.nickname = ''
    inputData.password = ''
    return;
  }
  if (data?.data.api_token) {
    setToken(data.data.api_token);
  }

  await router.push({ name: 'HomeView' });
};

const onInputChange = (field, event) => {
  const value = event.target.value

  errors.data[field] = []
  inputData[field] = value
}
</script>

<template>
  <main>
    <h1 class="auth">Авторизация</h1>
    <Form :submit="onSubmit" method="POST">
        <FormItem
            id = "nickname"
            label="Введите ник"
            placeholder="Введите ник"
            type="text"
            :value="inputData.nickname"
            :error-message="errors.data?.nickname"
            @change="(event) => onInputChange('nickname', event)"
        />
        <FormItem
            id = "password"
            label="Введите пароль"
            placeholder="Введите пароль"
            type="password"
            :value="inputData.password"
            :error-message="errors.data?.password"
            @change="(event) => onInputChange('password', event)"
        />
        <Button @submit.prevent="onSubmit" type="submit">Войти</Button>
        <p v-if="errors.message" class="error">{{errors.message}}</p>
    </Form>
  </main>
</template>
<style scoped>
.error {
  color: red;
}
.auth {
  text-align: center;
}
</style>