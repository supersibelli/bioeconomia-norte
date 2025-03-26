// Configuración de Chart.js
document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de Impacto Económico
    const impactCtx = document.getElementById('impactChart').getContext('2d');
    new Chart(impactCtx, {
        type: 'bar',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Exportações (Milhões USD)',
                data: [800, 950, 1100, 1300, 1500],
                backgroundColor: 'rgba(46, 125, 50, 0.7)',
                borderColor: 'rgba(46, 125, 50, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução das Exportações da Bioeconomia'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Milhões USD'
                    }
                }
            }
        }
    });

    // Animación de números estadísticos
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const finalNumber = parseInt(numberElement.getAttribute('data-number'));
                animateNumber(numberElement, finalNumber);
                observer.unobserve(numberElement);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(number => {
        observer.observe(number);
    });

    // Inicializar el mapa centrado en la Região Norte
    const map = L.map('amazonMap').setView([-3.4653, -62.2159], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Estados de la Região Norte con datos específicos de productos principales
    const northRegionStates = [
        {
            name: 'Acre',
            coords: [-9.0238, -70.8120],
            info: {
                capital: 'Rio Branco',
                area: '164.123 km²',
                produtos: 'Castanha-do-Pará, Andiroba',
                producao: {
                    castanha: {
                        valor: '8.500 ton/ano',
                        fonte: 'IBGE - Produção da Extração Vegetal, 2023'
                    },
                    andiroba: {
                        valor: '450 ton/ano',
                        fonte: 'Embrapa Acre, 2023'
                    }
                }
            }
        },
        {
            name: 'Amapá',
            coords: [1.4085, -51.7957],
            info: {
                capital: 'Macapá',
                area: '142.828 km²',
                produtos: 'Açaí, Andiroba',
                producao: {
                    acai: {
                        valor: '182.000 ton/ano',
                        fonte: 'CONAB - Boletim do Açaí, 2023'
                    },
                    andiroba: {
                        valor: '300 ton/ano',
                        fonte: 'Embrapa Amapá, 2023'
                    }
                }
            }
        },
        {
            name: 'Amazonas',
            coords: [-3.4653, -62.2159],
            info: {
                capital: 'Manaus',
                area: '1.559.159 km²',
                produtos: 'Castanha-do-Pará, Andiroba',
                producao: {
                    castanha: {
                        valor: '12.000 ton/ano',
                        fonte: 'IDAM - Instituto de Desenvolvimento Agropecuário do Amazonas, 2023'
                    },
                    andiroba: {
                        valor: '800 ton/ano',
                        fonte: 'Embrapa Amazônia Ocidental, 2023'
                    }
                }
            }
        },
        {
            name: 'Pará',
            coords: [-4.2604, -54.7804],
            info: {
                capital: 'Belém',
                area: '1.247.954 km²',
                produtos: 'Açaí, Cacau, Castanha-do-Pará',
                producao: {
                    acai: {
                        valor: '1.470.000 ton/ano',
                        fonte: 'SEDAP-PA - Secretaria de Desenvolvimento Agropecuário, 2023'
                    },
                    cacau: {
                        valor: '132.000 ton/ano',
                        fonte: 'CEPLAC - Comissão Executiva do Plano da Lavoura Cacaueira, 2023'
                    },
                    castanha: {
                        valor: '14.500 ton/ano',
                        fonte: 'IDESP-PA, 2023'
                    }
                }
            }
        },
        {
            name: 'Rondônia',
            coords: [-11.5057, -63.5806],
            info: {
                capital: 'Porto Velho',
                area: '237.576 km²',
                produtos: 'Café, Cacau',
                producao: {
                    cafe: {
                        valor: '2.300.000 sacas/ano',
                        fonte: 'CONAB - Companhia Nacional de Abastecimento, 2023'
                    },
                    cacau: {
                        valor: '15.000 ton/ano',
                        fonte: 'Embrapa Rondônia, 2023'
                    }
                }
            }
        },
        {
            name: 'Roraima',
            coords: [2.7376, -62.0751],
            info: {
                capital: 'Boa Vista',
                area: '224.300 km²',
                produtos: 'Castanha-do-Pará',
                producao: {
                    castanha: '4.500 ton/ano'
                }
            }
        },
        {
            name: 'Tocantins',
            coords: [-10.1753, -48.2982],
            info: {
                capital: 'Palmas',
                area: '277.720 km²',
                produtos: 'Cacau',
                producao: {
                    cacau: '8.000 ton/ano'
                }
            }
        }
    ];

    // Estilo personalizado para los marcadores
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pin"></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });

    // Agregar marcadores con información detallada
    northRegionStates.forEach(state => {
        const producaoHtml = Object.entries(state.info.producao)
            .map(([produto, info]) => {
                const produtoFormatado = produto.charAt(0).toUpperCase() + produto.slice(1);
                return `
                    <div class="producao-item">
                        <p><strong>${produtoFormatado}:</strong> ${info.valor}</p>
                        <p class="fonte-info">Fonte: ${info.fonte}</p>
                    </div>
                `;
            })
            .join('');

        const marker = L.marker(state.coords, {icon: customIcon})
            .bindPopup(`
                <div class="popup-content">
                    <h3>${state.name}</h3>
                    <p><strong>Capital:</strong> ${state.info.capital}</p>
                    <p><strong>Principais Produtos:</strong> ${state.info.produtos}</p>
                    <div class="producao-info">
                        <h4>Produção Anual:</h4>
                        ${producaoHtml}
                    </div>
                </div>
            `)
            .addTo(map);
    });

    // Agregar estilos adicionales para las fuentes
    const style = document.createElement('style');
    style.textContent = `
        .popup-content {
            padding: 10px;
        }
        .popup-content h3 {
            margin: 0 0 10px 0;
            color: var(--primary-color);
        }
        .fonte-info {
            font-size: 0.8em;
            color: #666;
            font-style: italic;
            margin-top: 2px;
        }
        .producao-item {
            margin-bottom: 10px;
        }
        .custom-marker {
            background-color: var(--primary-color);
            border-radius: 50%;
            border: 2px solid white;
        }
    `;
    document.head.appendChild(style);

    // Manejo de clicks en los enlaces del menú
    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajuste para el navbar fijo
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Función para animar números
function animateNumber(element, final) {
    let current = 0;
    const duration = 2000;
    const step = final / (duration / 16);
    
    function update() {
        current += step;
        if (current < final) {
            element.textContent = Math.round(current).toLocaleString();
            requestAnimationFrame(update);
        } else {
            element.textContent = final.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Función para crear gráficos (requiere Chart.js)
function createChart(ctx, data) {
    return new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Actualizar los datos del gráfico para mostrar solo los 5 productos principales
const producaoData = {
    labels: ['Açaí', 'Castanha-do-Pará', 'Café', 'Cacau', 'Andiroba'],
    datasets: [{
        label: 'Produção Anual (toneladas)',
        data: [1652000, 39500, 138000, 155000, 1550],
        backgroundColor: [
            'rgba(146, 43, 133, 0.6)',  // Púrpura para Açaí
            'rgba(153, 102, 51, 0.6)',   // Marrón para Castanha
            'rgba(139, 69, 19, 0.6)',    // Marrón oscuro para Café
            'rgba(210, 105, 30, 0.6)',   // Chocolate para Cacau
            'rgba(34, 139, 34, 0.6)'     // Verde para Andiroba
        ]
    }]
};

function imprimirProduto(produto) {
    // Preparar el documento para impresión
    const printSection = document.createElement('div');
    printSection.className = 'printing-section';
    
    // Clonar el producto para no modificar el original
    const produtoClone = produto.cloneNode(true);
    produtoClone.classList.add('printing');
    
    // Remover el botón de impresión del clon
    const printButton = produtoClone.querySelector('.print-button');
    if (printButton) {
        printButton.remove();
    }
    
    // Agregar el clon a la sección de impresión
    printSection.appendChild(produtoClone);
    
    // Guardar el contenido actual del body
    const originalContent = document.body.innerHTML;
    
    // Reemplazar el contenido con solo el producto a imprimir
    document.body.innerHTML = '';
    document.body.appendChild(printSection);
    
    // Cambiar el título del documento
    const productTitle = produtoClone.querySelector('h3').textContent;
    const originalTitle = document.title;
    document.title = `Relatório - ${productTitle}`;
    
    // Imprimir
    window.print();
    
    // Restaurar el contenido original
    document.body.innerHTML = originalContent;
    document.title = originalTitle;
    
    // Reinicializar eventos si es necesario
    initializeEvents();
}

// Función para reinicializar eventos después de restaurar el contenido
function initializeEvents() {
    // Reinicializar los botones de impresión
    document.querySelectorAll('.print-button').forEach(button => {
        button.onclick = () => imprimirProduto(button.closest('.produto-card'));
    });
    
    // Reinicializar otros eventos si los hay
    // ...
}

// Funcionalidad para modo presentación
function initPresentationMode() {
    const presentationContainer = document.createElement('div');
    presentationContainer.className = 'slide-mode';
    
    const sections = document.querySelectorAll('section');
    let currentSlide = 0;
    
    sections.forEach((section, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = section.innerHTML;
        if (index === 0) slide.classList.add('active');
        presentationContainer.appendChild(slide);
    });
    
    const controls = `
        <div class="slide-controls">
            <button class="slide-button prev">Anterior</button>
            <button class="slide-button next">Siguiente</button>
            <button class="slide-button exit">Salir</button>
        </div>
        <div class="slide-progress"></div>
    `;
    
    presentationContainer.insertAdjacentHTML('beforeend', controls);
    document.body.appendChild(presentationContainer);
    
    // Actualizar progreso
    const updateProgress = () => {
        const progress = document.querySelector('.slide-progress');
        const width = (currentSlide / (sections.length - 1)) * 100;
        progress.style.width = `${width}%`;
    };
    
    // Navegación
    document.querySelector('.prev').addEventListener('click', () => {
        if (currentSlide > 0) {
            document.querySelectorAll('.slide')[currentSlide].classList.remove('active');
            currentSlide--;
            document.querySelectorAll('.slide')[currentSlide].classList.add('active');
            updateProgress();
        }
    });
    
    document.querySelector('.next').addEventListener('click', () => {
        if (currentSlide < sections.length - 1) {
            document.querySelectorAll('.slide')[currentSlide].classList.remove('active');
            currentSlide++;
            document.querySelectorAll('.slide')[currentSlide].classList.add('active');
            updateProgress();
        }
    });
    
    document.querySelector('.exit').addEventListener('click', () => {
        presentationContainer.remove();
    });
    
    // Teclas de navegación
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') document.querySelector('.next').click();
        if (e.key === 'ArrowLeft') document.querySelector('.prev').click();
        if (e.key === 'Escape') document.querySelector('.exit').click();
    });
    
    updateProgress();
}

// Agregar botón para iniciar modo presentación
const presentationButton = document.createElement('button');
presentationButton.className = 'presentation-button';
presentationButton.innerHTML = '📽️ Modo Presentación';
presentationButton.onclick = initPresentationMode;
document.body.appendChild(presentationButton);

function initSidebarMode() {
    // Crear sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'presentation-sidebar';
    
    // Crear índice
    const index = document.createElement('ul');
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const li = document.createElement('li');
        const title = section.querySelector('h2')?.textContent || section.id;
        li.textContent = title;
        li.onclick = () => {
            // Remover active de todos
            document.querySelectorAll('.presentation-sidebar li').forEach(item => 
                item.classList.remove('active')
            );
            // Agregar active al clickeado
            li.classList.add('active');
            // Scroll a la sección
            section.scrollIntoView({ behavior: 'smooth' });
        };
        index.appendChild(li);
    });
    
    sidebar.appendChild(index);
    
    // Agregar botón para salir del modo presentación
    const exitButton = document.createElement('button');
    exitButton.className = 'slide-button exit';
    exitButton.textContent = 'Salir del Modo Presentación';
    exitButton.onclick = () => {
        sidebar.remove();
        document.body.classList.remove('with-sidebar');
        presentationButton.style.display = 'block';
    };
    sidebar.appendChild(exitButton);
    
    // Ajustar el contenido principal
    document.body.classList.add('with-sidebar');
    document.body.insertBefore(sidebar, document.body.firstChild);
    presentationButton.style.display = 'none';
} 