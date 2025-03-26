// Configuración de los gráficos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // PIB por Estado
    const pibEstadosChart = new Chart(document.getElementById('pibEstadosChart'), {
        type: 'bar',
        data: {
            labels: ['Amazonas', 'Pará', 'Rondônia', 'Acre', 'Tocantins', 'Amapá', 'Roraima'],
            datasets: [{
                label: 'PIB da Bioeconomia (R$ Bilhões)',
                data: [12.8, 10.2, 3.5, 2.2, 1.8, 1.2, 0.8],
                backgroundColor: '#2E7D32'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'R$ Bilhões'
                    }
                }
            }
        }
    });

    // Empleos por Estado
    const empregosEstadosChart = new Chart(document.getElementById('empregosEstadosChart'), {
        type: 'bar',
        data: {
            labels: ['Amazonas', 'Pará', 'Rondônia', 'Acre', 'Tocantins', 'Amapá', 'Roraima'],
            datasets: [{
                label: 'Empregos Diretos',
                data: [450000, 380000, 150000, 80000, 50000, 30000, 20000],
                backgroundColor: '#388E3C'
            }, {
                label: 'Empregos Indiretos',
                data: [280000, 250000, 120000, 60000, 40000, 25000, 15000],
                backgroundColor: '#66BB6A'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Empregos'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('pt-BR');
                        }
                    }
                }
            }
        }
    });

    // Exportaciones por Estado
    const exportacoesEstadosChart = new Chart(document.getElementById('exportacoesEstadosChart'), {
        type: 'pie',
        data: {
            labels: ['Amazonas', 'Pará', 'Rondônia', 'Outros Estados'],
            datasets: [{
                data: [45, 35, 15, 5],
                backgroundColor: [
                    '#2E7D32',
                    '#388E3C',
                    '#43A047',
                    '#66BB6A'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });

    // Inversiones por Estado
    const investimentosEstadosChart = new Chart(document.getElementById('investimentosEstadosChart'), {
        type: 'radar',
        data: {
            labels: ['Amazonas', 'Pará', 'Rondônia', 'Acre', 'Tocantins', 'Amapá', 'Roraima'],
            datasets: [{
                label: 'Investimento Público',
                data: [580, 420, 350, 280, 220, 180, 150],
                borderColor: '#2E7D32',
                backgroundColor: 'rgba(46, 125, 50, 0.2)'
            }, {
                label: 'Investimento Privado',
                data: [820, 650, 420, 320, 280, 220, 180],
                borderColor: '#43A047',
                backgroundColor: 'rgba(67, 160, 71, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 1000,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value + 'M';
                        }
                    }
                }
            }
        }
    });

    // Manejar las pestañas de estados
    const estadoTabs = document.querySelectorAll('.estado-tab');
    const estadoContents = document.querySelectorAll('.estado-content');

    estadoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover clase active de todas las pestañas y contenidos
            estadoTabs.forEach(t => t.classList.remove('active'));
            estadoContents.forEach(c => c.classList.remove('active'));

            // Agregar clase active a la pestaña seleccionada y su contenido
            tab.classList.add('active');
            const estado = tab.dataset.estado;
            document.getElementById(estado).classList.add('active');
        });
    });

    // Ajustar tamaño de los gráficos cuando se redimensiona la ventana
    window.addEventListener('resize', function() {
        const charts = [pibEstadosChart, empregosEstadosChart, exportacoesEstadosChart, investimentosEstadosChart];
        charts.forEach(chart => {
            if (chart) chart.resize();
        });
    });

    // Configuración del mapa interactivo
    const estadosNorte = [
        {
            nombre: 'Amazonas',
            coords: [-3.4653, -65.8561],
            poblacion: '4.2 milhões',
            capital: 'Manaus',
            dados: {
                pib: 'R$ 12,8 bilhões',
                bioeconomia: {
                    principais_produtos: ['Açaí', 'Castanha', 'Guaraná', 'Óleos Essenciais'],
                    empregos: '450.000 diretos',
                    comunidades: '450 atendidas',
                    projetos: '85 ativos'
                },
                exportacoes: 'US$ 980 milhões em bioeconomia',
                areas_protegidas: '42% do território',
                pesquisa: '12 centros de pesquisa'
            }
        },
        {
            nombre: 'Pará',
            coords: [-3.7900, -52.4700],
            poblacion: '8.8 milhões',
            capital: 'Belém',
            dados: {
                pib: 'R$ 10,2 bilhões',
                bioeconomia: {
                    principais_produtos: ['Açaí', 'Cacau', 'Castanha', 'Andiroba'],
                    empregos: '380.000 diretos',
                    comunidades: '380 atendidas',
                    projetos: '72 ativos'
                },
                exportacoes: 'US$ 850 milhões em bioeconomia',
                areas_protegidas: '35% do território',
                pesquisa: '8 centros de pesquisa'
            }
        },
        {
            nombre: 'Rondônia',
            coords: [-8.7619, -63.9039],
            poblacion: '1.8 milhões',
            capital: 'Porto Velho',
            dados: {
                pib: 'R$ 3,5 bilhões',
                bioeconomia: {
                    principais_produtos: ['Café', 'Castanha', 'Açaí'],
                    empregos: '150.000 diretos',
                    comunidades: '220 atendidas',
                    projetos: '45 ativos'
                },
                exportacoes: 'US$ 420 milhões em bioeconomia',
                areas_protegidas: '28% do território',
                pesquisa: '5 centros de pesquisa'
            }
        },
        {
            nombre: 'Acre',
            coords: [-9.0238, -70.8120],
            poblacion: '895 mil',
            capital: 'Rio Branco',
            dados: {
                pib: 'R$ 2,2 bilhões',
                bioeconomia: {
                    principais_produtos: ['Castanha', 'Borracha', 'Açaí'],
                    empregos: '80.000 diretos',
                    comunidades: '180 atendidas',
                    projetos: '38 ativos'
                },
                exportacoes: 'US$ 280 milhões em bioeconomia',
                areas_protegidas: '45% do território',
                pesquisa: '3 centros de pesquisa'
            }
        },
        {
            nombre: 'Tocantins',
            coords: [-10.1689, -48.3317],
            poblacion: '1.6 milhões',
            capital: 'Palmas',
            dados: {
                pib: 'R$ 1,8 bilhões',
                bioeconomia: {
                    principais_produtos: ['Babaçu', 'Pequi', 'Buriti'],
                    empregos: '50.000 diretos',
                    comunidades: '150 atendidas',
                    projetos: '32 ativos'
                },
                exportacoes: 'US$ 180 milhões em bioeconomia',
                areas_protegidas: '25% do território',
                pesquisa: '4 centros de pesquisa'
            }
        },
        {
            nombre: 'Amapá',
            coords: [0.9020, -52.0030],
            poblacion: '860 mil',
            capital: 'Macapá',
            dados: {
                pib: 'R$ 1,2 bilhões',
                bioeconomia: {
                    principais_produtos: ['Açaí', 'Castanha', 'Óleos Naturais'],
                    empregos: '30.000 diretos',
                    comunidades: '120 atendidas',
                    projetos: '28 ativos'
                },
                exportacoes: 'US$ 150 milhões em bioeconomia',
                areas_protegidas: '62% do território',
                pesquisa: '2 centros de pesquisa'
            }
        },
        {
            nombre: 'Roraima',
            coords: [2.8235, -60.6758],
            poblacion: '745 mil',
            capital: 'Boa Vista',
            dados: {
                pib: 'R$ 0,8 bilhões',
                bioeconomia: {
                    principais_produtos: ['Açaí', 'Castanha', 'Produtos Indígenas'],
                    empregos: '20.000 diretos',
                    comunidades: '95 atendidas',
                    projetos: '25 ativos'
                },
                exportacoes: 'US$ 85 milhões em bioeconomia',
                areas_protegidas: '46% do território',
                pesquisa: '2 centros de pesquisa'
            }
        }
    ];

    // Inicializar el mapa con los datos detallados
    const map = L.map('amazonMap').setView([-3.4653, -62.2159], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Agregar marcadores con información detallada
    estadosNorte.forEach(estado => {
        const popupContent = `
            <div class="estado-popup">
                <h3>${estado.nombre}</h3>
                <p><strong>Capital:</strong> ${estado.capital}</p>
                <p><strong>População:</strong> ${estado.poblacion}</p>
                <h4>Dados da Bioeconomia:</h4>
                <ul>
                    <li><strong>PIB:</strong> ${estado.dados.pib}</li>
                    <li><strong>Principais Produtos:</strong> ${estado.dados.bioeconomia.principais_produtos.join(', ')}</li>
                    <li><strong>Empregos:</strong> ${estado.dados.bioeconomia.empregos}</li>
                    <li><strong>Comunidades:</strong> ${estado.dados.bioeconomia.comunidades}</li>
                    <li><strong>Projetos:</strong> ${estado.dados.bioeconomia.projetos}</li>
                    <li><strong>Exportações:</strong> ${estado.dados.exportacoes}</li>
                    <li><strong>Áreas Protegidas:</strong> ${estado.dados.areas_protegidas}</li>
                    <li><strong>Pesquisa:</strong> ${estado.dados.pesquisa}</li>
                </ul>
            </div>
        `;

        L.marker(estado.coords)
            .bindPopup(popupContent, {
                maxWidth: 300,
                className: 'estado-popup'
            })
            .addTo(map);
    });
}); 