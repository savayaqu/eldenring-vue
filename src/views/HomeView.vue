<template>
  <div>
    <!-- Выбор региона -->
    <select v-model="selectedRegion" @change="filterBosses">
      <option value="">All Regions</option>
      <option v-for="region in regions" :key="region">{{ region }}</option>
    </select>

    <div class="cards">
      <template v-if="token">
        <div class="card" v-for="(boss, index) in filteredBosses" :key="boss.id" @click="handleGetBoss(boss.id)">
          <p>{{ boss.name }}</p>
          <img :src="boss.image" :alt="boss.name" class="card__image">
          <p>Location: {{ boss.location }}</p>
          <p>Region: {{ boss.region }}</p>
        </div>
      </template>
      <template v-else>
        <h1>Для просмотра содержимого войдите в аккаунт</h1>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { getBosses } from "@/api/methods/bosses/getBosses.js";
import router from "@/router/index.js";
const handleGetBoss = async (bossId) =>
    router.push({name: 'BossView', params: {id: bossId}})

const state = useAuthStore();
const { token } = storeToRefs(state);
const bosses = ref([]);
const regions = ref([]);
const selectedRegion = ref('');
const filteredBosses = ref([]); // Объявляем filteredBosses здесь

const loadBosses = async () => {
  bosses.value = await getBosses();
};

const filterBosses = () => {
  if (!selectedRegion.value) {
    filteredBosses.value = bosses.value;
  } else {
    filteredBosses.value = bosses.value.filter(boss => boss.region === selectedRegion.value);
  }
};

// Инициализация загрузки боссов и регионов при монтировании компонента
onMounted(async () => {
  await loadBosses();
  regions.value = [...new Set(bosses.value.map(boss => boss.region))];
  filterBosses(); // Инициализация фильтрации
});

// Отслеживание изменений в списке боссов или выбранном регионе
watch([bosses, selectedRegion], () => {
  filterBosses();
});

</script>



<style scoped>
.cards {
  display: grid;
  gap: 20px; /* Расстояние между карточками */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Адаптивное количество карточек в строке */
}

.card {
  height: 100%; /* Высота должна занимать всю высоту родительского контейнера */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd; /* Добавим рамку для наглядности */
  padding: 20px; /* Внутренний отступ */
  box-sizing: border-box; /* Учитываем внутренние отступы и рамку в вычисление размеров */
}

.card__image {
  max-width: 100%; /* Максимальная ширина изображения в пределах карточки */
  max-height: 100%; /* Максимальная высота изображения в пределах карточки */
  object-fit: contain; /* Сохранение пропорций и вписывание изображения */
}

.card p {
  overflow: hidden; /* Обрезаем текст, который не помещается */
  text-overflow: ellipsis; /* Добавляем многоточие для обрезанного текста */
  white-space: wrap; /* Предотвращаем перенос текста на новую строку */
  max-width: 90%; /* Максимальная ширина текста в пределах карточки */
}
</style>


