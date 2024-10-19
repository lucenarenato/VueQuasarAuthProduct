<!-- TopProdutosMaisEstoque.vue -->
<template>
  <ChartComponent
    title="Top 10 Produtos com Mais Estoque"
    :chartOptions="options"
    :series="series"
  />
</template>

<script>
import ChartComponent from './ChartComponent.vue';
import { axiosInstance } from 'boot/axios';
import Swal from 'sweetalert2';

export default {
  name: 'TopProdutosMaisEstoque',
  components: { ChartComponent },
  data() {
    return {
      series: [
        {
          name: 'Quantidade em Estoque',
          data: []
        }
      ],
      options: {
        chart: {
          type: 'bar'
        },
        xaxis: {
          categories: [] // Inicialmente vazio, será preenchido após a requisição
        }
      }
    };
  },
  mounted() {
    this.fetchData(); // Chama a função para buscar os dados quando o componente é montado
  },
  methods: {
    async fetchData() {
      try {
        const response = await axiosInstance.get('/stock/statistics');

        // Acessa os dados do produto a partir da resposta da API
        const data = response.data.top_products_with_most_stock;

        // Verifica se os dados existem e estão no formato esperado
        if (Array.isArray(data) && data.length > 0) {
          // Filtra os 10 produtos com mais estoque
          const topProducts = data.slice(0, 10); // Assume que os dados já estão ordenados por quantidade

          // Processa os dados para preencher as séries e categorias do gráfico
          const categories = topProducts.map(item => item.product.title); // Extraindo os títulos dos produtos
          const stockData = topProducts.map(item => parseInt(item.total_quantity)); // Extraindo a quantidade em estoque

          // Atualiza as séries de dados do gráfico
          this.series[0].data = stockData;

          // Atualiza as categorias no eixo x do gráfico
          this.options.xaxis.categories = categories;
        } else {
          // Tratamento de erro para caso os dados não estejam no formato esperado
          Swal.fire({
            icon: 'error',
            title: 'Erro ao carregar dados',
            text: 'Os dados recebidos da API estão vazios ou em um formato inesperado.'
          });
        }
      } catch (error) {
        // Tratamento de erro para a requisição da API
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar os dados dos produtos com mais estoque.'
        });
        console.error('Erro ao buscar dados da API:', error);
      }
    }
  }
};
</script>
