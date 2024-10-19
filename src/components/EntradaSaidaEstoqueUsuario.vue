<!-- EntradaSaidaEstoqueUsuario.vue -->
<template>
  <ChartComponent
    title="Entrada e Saída de Estoque por Usuário"
    :chartOptions="options"
    :series="series"
  />
</template>

<script>
import ChartComponent from './ChartComponent.vue';
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { axiosInstance } from 'boot/axios';

export default {
  name: 'EntradaSaidaEstoqueUsuario',
  components: { ChartComponent },
  data() {
    return {
      series: [],
      options: {
        chart: {
          type: 'bar'
        },
        xaxis: {
          categories: [] // Será preenchido com os nomes dos produtos
        }
      }
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axiosInstance.get('/stock/statistics');

        const data = response.data.top_products_with_most_stock;

        // Processa os dados para preencher as séries e categorias do gráfico
        const categories = data.map(item => item.product.title);
        const entradaData = data.map(item => parseInt(item.total_quantity)); // Exemplo usando total_quantity como 'Entrada'
        const saidaData = entradaData.map(value => value - Math.floor(Math.random() * 50)); // Apenas como exemplo para Saída

        this.series = [
          {
            name: 'Entrada',
            data: entradaData
          },
          {
            name: 'Saída',
            data: saidaData
          }
        ];

        this.options.xaxis.categories = categories;
      } catch (error) {
        Swal.fire('Erro', 'Não foi possível carregar os dados do gráfico', 'error');
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchData(); // Chama a função para buscar os dados quando o componente é montado
  }
};
</script>
