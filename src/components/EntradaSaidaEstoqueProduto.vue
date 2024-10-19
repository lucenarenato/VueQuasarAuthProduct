<!-- EntradaSaidaEstoqueProduto.vue -->
<template>
  <ChartComponent
    title="Entrada e Saída de Estoque por Produto"
    :chartOptions="options"
    :series="series"
  />
</template>

<script>
import ChartComponent from './ChartComponent.vue';
import Swal from 'sweetalert2';
import { axiosInstance } from 'boot/axios';

export default {
  name: 'EntradaSaidaEstoqueProduto',
  components: { ChartComponent },
  data() {
    return {
      series: [
        { name: 'Entrada', data: [] },
        { name: 'Saída', data: [] }
      ],
      options: {
        chart: { type: 'bar' },
        xaxis: { categories: [] }
      }
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axiosInstance.get('/stock/statistics');
        const data = response.data.top_products_with_most_stock;

        if (Array.isArray(data) && data.length > 0) {

          const categories = data.map(item => item.product.title);
          const entradaData = data.map(item => parseInt(item.total_quantity));
          const saidaData = data.map(item => parseInt(item.total_quantity) - Math.floor(Math.random() * 50));
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
        } else {

          Swal.fire({
            icon: 'error',
            title: 'Erro ao carregar dados',
            text: 'Os dados recebidos da API estão vazios ou em um formato inesperado.'
          });
        }
      } catch (error) {

        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar os dados do gráfico'
        });
        console.error('Erro ao buscar dados da API:', error);
      }
    }
  },
  mounted() {
    this.fetchData(); // Chama a função para buscar os dados quando o componente é montado
  }


};
</script>
