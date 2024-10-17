<template>
  <div>
    <h2>Formulário de Produto</h2>
    <form @submit.prevent="submitProductForm">
      <input
        v-model="productData.name"
        type="text"
        placeholder="Nome do Produto"
      />
      <input
        v-model="productData.code"
        type="text"
        placeholder="Código do Produto"
      />
      <input
        v-model="productData.status"
        type="text"
        placeholder="Status (ativo/inativo)"
      />
      <button type="submit">Salvar</button>
    </form>
    <div v-if="loading">Salvando dados do produto...</div>
    <div v-if="error">Erro ao salvar produto: {{ error.message }}</div>
    <div v-if="successMessage">{{ successMessage }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useApi } from 'src/composables/useApi.js';

export default {
  name: 'ProductForm',
  setup() {
    const productData = ref({ name: '', code: '', status: '' });
    const { response, error, loading } = useApi();
    const successMessage = ref('');

    const submitProductForm = async () => {
      const result = await useApi('/product/save', 'POST', productData.value);
      if (result && !result.error) {
        successMessage.value = 'Produto salvo com sucesso!';
      }
    };

    return {
      productData,
      error,
      loading,
      successMessage,
      submitProductForm,
    };
  },
};
</script>
