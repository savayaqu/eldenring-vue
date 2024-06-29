<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { addeditFight } from "@/api/methods/bosses/addeditFight.js";

const router = useRouter();
const bossId = router.currentRoute.value.params.id;
const boss = ref({});
const fight = ref({});

onMounted(async () => {
  const response = await addeditFight(bossId);
  boss.value = response.boss;
  fight.value = response.fight;
});

const updateFight = async () => {
  const updatedFight = {
    status: fight.value.status,
    attempts: fight.value.attempts + 1 // Инкрементируем попытки
  };
  const response = await addeditFight(bossId, updatedFight.status, updatedFight.attempts);
  fight.value.status = response.fight.status;
  fight.value.attempts = response.fight.attempts;
};
</script>

<template>
  <div class="boss-details">
    <h1 class="boss-name">{{ boss.name }}</h1>
    <div class="boss-image">
      <img :src="boss.image || 'https://via.placeholder.com/400'" :alt="boss.name" />
    </div>
    <div class="boss-info">
      <p><strong>Region:</strong> {{ boss.region }}</p>
      <p><strong>Description:</strong> {{ boss.description }}</p>
      <p><strong>Location:</strong> {{ boss.location }}</p>
    </div>
    <div class="boss-controls">
      <label for="status">Status:</label>
      <select id="status" v-model="fight.status" @change="updateFight()">
        <option value="0">Alive</option>
        <option value="1">Dead</option>
      </select>
      <button @click="updateFight()" class="attempts-button">Attempts: {{ fight.attempts }}</button>
    </div>
  </div>
</template>


<style scoped>
.boss-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.boss-name {
  font-size: 24px;
  margin-bottom: 10px;
}

.boss-image {
  text-align: center;
  margin-bottom: 20px;
}

.boss-image img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
}

.boss-info {
  margin-bottom: 20px;
}

.boss-info p {
  margin-bottom: 10px;
}

.boss-controls {
  display: flex;
  align-items: center;
}

.boss-controls label {
  margin-right: 10px;
  font-weight: bold;
}

.boss-controls select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.attempts-button {
  padding: 8px 12px;
  margin-left: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.attempts-button:hover {
  background-color: #0056b3;
}

</style>
