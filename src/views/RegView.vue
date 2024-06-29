<script setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import {reactive, ref} from "vue";
import {register} from "@/api/methods/auth/register.js";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";

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
  isLoading.value = true

  errors.data = {}
  const data = await register(inputData.nickname, inputData.password)

  isLoading.value = false


  if (data?.code === 422) {
    errors.data = data.errors
    return
  }
  if (data?.code === 401) {
    errors.data = data.errors
    return
  }
  await router.push({name: 'LogView'})

}
const onInputChange = (field, event) => {
  const value = event.target.value;
  errors.data[field] = [];

  inputData[field] = value;
}


</script>
<template>
  <main>
    <h1 class="reg">Регистрация</h1>
    <Form :submit="onSubmit" method="POST">
        <div>
          <FormItem
              id="login"
              label="Введите ник"
              placeholder="Введите ник"
              type="text"
              :value="inputData.nickname"
              :error-message="errors.data?.nickname"
              @change="(event) => onInputChange('nickname', event)"
          />
          <FormItem
              id="password"
              label="Введите пароль"
              placeholder="Введите пароль"
              type="password"
              :value="inputData.password"
              :error-message="errors.data?.password"
              @change="(event) => onInputChange('password', event)"
          />
        </div>
        <Button @submit.prevent="onSubmit" type="submit">Зарегистрироваться</Button>
    </Form>
  </main>
</template>
<style scoped>
.error {
  color: red;
}
.reg {
  text-align: center;
}
.default {
  display: flex;
  gap: 20px;
}
</style>