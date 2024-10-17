<template>
  <div>
    <h2>Consulta de Estoque</h2>
    <form @submit.prevent="fetchStockData">
      <input
        v-model="filters.productName"
        type="text"
        placeholder="Nome do Produto"
      />
      <button type="submit">Buscar</button>
    </form>
    <div v-if="loading">Carregando dados do estoque...</div>
    <div v-else-if="error">Erro ao carregar dados: {{ error.message }}</div>
    <ul v-else>
      <li v-for="item in stockData" :key="item.id">
        {{ item.name }} - Quantidade: {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useApi } from 'src/composables/useApi.js';

export default {
  name: 'StockQuery',
  setup() {
    const filters = ref({ productName: '' });
    const { response: stockData, error, loading } = useApi('/stock', 'GET', filters);

    const fetchStockData = () => {
      // Recarrega os dados do estoque com base nos filtros
      useApi('/stock', 'GET', filters);
    };

    return {
      filters,
      stockData,
      error,
      loading,
      fetchStockData,
    };
  },
};
</script>
