<template>
  <div>
    <h2>Entrada de Estoque</h2>
    <form @submit.prevent="submitStockEntry">
      <input
        v-model="newStock.productId"
        type="text"
        placeholder="ID do Produto"
      />
      <input
        v-model="newStock.title"
        type="text"
        placeholder="Título"
      />
      <input
        v-model="newStock.description"
        type="text"
        placeholder="Descrição"
      />
      <input
        v-model="newStock.price"
        type="number"
        placeholder="Preço"
      />
      <input
        v-model="newStock.image"
        type="text"
        placeholder="URL da Imagem"
      />
      <input
        v-model="newStock.barcode"
        type="text"
        placeholder="Código de Barras"
      />
      <input
        v-model="newStock.is_active"
        type="checkbox"
      /> Ativo
      <input
        v-model="newStock.SKU"
        type="text"
        placeholder="SKU"
      />
      <input
        v-model="newStock.quantity"
        type="number"
        placeholder="Quantidade"
      />
      <button type="submit">Adicionar</button>
    </form>

    <div v-if="loading">Adicionando ao estoque...</div>
    <div v-if="error">Erro ao adicionar: {{ error.message }}</div>
    <div v-if="successMessage">{{ successMessage }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useApi } from 'src/composables/useApi.js';

export default {
  name: 'StockEntryForm',
  setup() {
    const newStock = ref({
      productId: '',
      title: '',
      description: '',
      price: 0,
      image: '',
      barcode: '',
      is_active: false,
      SKU: '',
      quantity: 0
    });

    const { response, error, loading } = useApi();
    const successMessage = ref('');

    const submitStockEntry = async () => {
      const result = await useApi('/stock/add', 'POST', newStock.value);
      if (result && !result.error) {
        successMessage.value = 'Estoque adicionado com sucesso!';
      }
    };

    return {
      newStock,
      error,
      loading,
      successMessage,
      submitStockEntry,
    };
  },
};
</script>
