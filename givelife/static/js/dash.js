// // Dados simulados para testes
// const simulatedData = {
//     donorProfiles: {
//         male: 60,  // Percentual de doadores do sexo masculino
//         female: 40  // Percentual de doadores do sexo feminino
//     },
//     totalDonations: 120, // Total de doações em litros
//     stockLevels: {
//         current: 85, // Nível atual de estoque de sangue
//         target: 100  // Meta de estoque
//     },
//     bloodTypesStock: [10, 5, 15, 3, 7, 2, 20, 12], // Estoque de sangue por tipo sanguíneo
//     dataByYearAndMonth: {
//         "2019": { JAN: 15, FEV: 20, MAR: 30, ABR: 40, MAI: 25, JUN: 35, JUL: 50, AGO: 60, SET: 70, OUT: 80, NOV: 90, DEZ: 100 },
//         "2022": { JAN: 20, FEV: 25, MAR: 35, ABR: 45, MAI: 30, JUN: 40, JUL: 55, AGO: 65, SET: 75, OUT: 85, NOV: 95, DEZ: 110 },
//     }
// };

// // Funcao para atualizar os dados no painel
// function updateDashboard() {
//     updateProfileData();
//     updateTotalDonations();
//     updateStockLevels();
//     updateBloodTypeStock();
// }

// // Atualiza os dados do perfil de doadores
// function updateProfileData() {
//     document.querySelector("#perfilDoadores .male").textContent = `${simulatedData.donorProfiles.male}% Homens`;
//     document.querySelector("#perfilDoadores .female").textContent = `${simulatedData.donorProfiles.female}% Mulheres`;
// }

// // Atualiza o total de doacoes
// function updateTotalDonations() {
//     document.querySelector("#totalRecebido p").textContent = `${simulatedData.totalDonations} Litros`;
// }

// // Atualiza os níveis de estoque
// function updateStockLevels() {
//     const current = simulatedData.stockLevels.current;
//     const target = simulatedData.stockLevels.target;
//     document.querySelector("#estoqueTotal .stock-level p:first-child").textContent = `Atual: ${current} Litros`;
//     document.querySelector("#estoqueTotal .stock-level p:last-child").textContent = `META: ${target} Litros`;
// }

// // Atualiza o gráfico de estoque por tipo sanguíneo
// function updateBloodTypeStock() {
//     bloodTypeChart.data.datasets[0].data = simulatedData.bloodTypesStock;
//     bloodTypeChart.update();
// }

// // Configuracao do gráfico de doaçoes mensais
// function createDonationsChartConfig(yearData) {
//     return {
//         type: "line",
//         data: {
//             labels: Object.keys(yearData),
//             datasets: [{
//                 label: "Doações de Sangue (L)",
//                 data: Object.values(yearData),
//                 borderColor: "#0275d8",
//                 backgroundColor: "rgba(2, 117, 216, 0.2)",
//                 fill: true
//             }],
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: { display: true },
//             },
//         },
//     };
// }

// // Configuração do grafico de estoque por tipo sanguíneo
// function createBloodTypeChartConfig() {
//     return {
//         type: "bar",
//         data: {
//             labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
//             datasets: [{
//                 label: "Estoque (L)",
//                 data: simulatedData.bloodTypesStock,
//                 backgroundColor: [
//                     "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
//                     "#9966FF", "#FF9F40", "#C9CBCF", "#36A2EB"
//                 ],
//             }],
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: { display: true },
//             },
//         },
//     };
// }

// // Função para gerar graficos
// function generateChart(ctx, config) {
//     return new Chart(ctx, config);
// }

// function addFilterListeners() {
    
//     document.querySelectorAll(".year-selector button").forEach(button => {
//         button.addEventListener("click", () => {
//             const selectedYear = button.textContent;
//             updateDonationsChart(selectedYear); // Atualiza o grafico de doacoes para o ano selecionado
//         });
//     });

//     document.querySelectorAll(".months button").forEach(button => {
//         button.addEventListener("click", () => {
//             alert(`Filtrando mês: ${button.textContent} do ano selecionado`);
//         });
//     });
// }

// // Atualiza o grafico de doacoes com o ano selecionado
// function updateDonationsChart(year) {
//     const donationsChartConfig = createDonationsChartConfig(simulatedData.dataByYearAndMonth[year]);
//     donationsChart = generateChart(
//         document.getElementById("donationsChart").getContext("2d"),
//         donationsChartConfig
//     );
// }

// // Funcao para inicializar o painel
// function initializeDashboard() {
//     // Gerar gráfico de doações
//     updateDonationsChart("2019");

//     // Gerar grafiico de estoque por tipo sanguíneo
//     bloodTypeChart = generateChart(
//         document.getElementById("bloodTypeChart").getContext("2d"),
//         createBloodTypeChartConfig()
//     );

//     // Atualizar os dados do painel
//     updateDashboard();

//     // Adicionar ouvintes de eventos para filtros
//     addFilterListeners();
// }

// // Chama a função de inicialização ao carregar a página
// window.onload = initializeDashboard;
// const moonIcon = document.getElementById("moonIcon");

// moonIcon.addEventListener("click", () => {
//     document.body.classList.toggle("dark-mode");

//     // Alternar o símbolo da lua de crescente para cheia
//     const isDarkMode = document.body.classList.contains("dark-mode");

//     if (isDarkMode) {
//         moonIcon.innerHTML = "\u263C"; // Lua cheia
//     } else {
//         moonIcon.innerHTML = "\u263E"; // Lua crescente
//     }
// });