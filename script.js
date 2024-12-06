<script>
    document.addEventListener("DOMContentLoaded", function () {

        const packagePrices = {
            'mudaqui1': {
                'PIX': 24.60,
                'CREDITO': 29.90
            },
            'mudaqui2': {
                'PIX': 53.10,
                'CREDITO': 59.30
            },
            'mudaqui3': {
                'PIX': 80.65,
                'CREDITO': 91.00
            },
            'mudaqui4': {
                'PIX': 132.90,
                'CREDITO': 149.90
            },
            'mudaqui5': {
                'PIX': 265.00,
                'CREDITO': 299.00
            },
            'mudaqui6': {
                'PIX': 369.60,
                'CREDITO': 419.00
            },
            'mudaqui7': {
                'PIX': 645.00,
                'CREDITO': 720.00
            },
            'mudaqui8': {
                'PIX': 1188.00,
                'CREDITO': 1350.00
            },
            'mudaqui9': {
                'PIX': 16.99,
                'CREDITO': 19.20
            },
            'mudaqui10': {
                'PIX': 46.45,
                'CREDITO': 52.35
            },
            'mudaqui11': {
                'PIX': 85.40,
                'CREDITO': 97.00
            },
            'mudaqui12': {
                'PIX': 146.90,
                'CREDITO': 149.90
            }
        };

        const additionalPackagesMapping = {
            'mudaqui1': [
                { name: '+100 INSCRITOS', price: 16.99 }
            ],
            'mudaqui2': [
                { name: '+100 INSCRITOS', price: 16.99 },
                { name: '+300 INSCRITOS', price: 46.45 }
            ],
            'mudaqui3': [
                { name: '+100 INSCRITOS', price: 16.99 },
                { name: '+300 INSCRITOS', price: 46.45 }
            ],
            'mudaqui4': [
                { name: '+300 INSCRITOS', price: 46.45 },
                { name: '+500 INSCRITOS', price: 85.40 }
            ],
            'mudaqui5': [
                { name: '+500 INSCRITOS', price: 85.40 },
                { name: '+1.000 INSCRITOS', price: 146.90 }
            ],
            'mudaqui6': [
                { name: '+500 INSCRITOS', price: 85.40 },
                { name: '+1.000 INSCRITOS', price: 146.90 }
            ],
            'mudaqui7': [
                { name: '+500 INSCRITOS', price: 85.40 },
                { name: '+1.000 INSCRITOS', price: 146.90 }
            ],
            'mudaqui8': [
                { name: '+500 INSCRITOS', price: 85.40 },
                { name: '+1.000 INSCRITOS', price: 146.90 }
            ],
            'mudaqui9': [
                { name: '+1.000 VISUALIZAÇÕES', price: 24.60 }
            ],
            'mudaqui10': [
                { name: '+1.000 VISUALIZAÇÕES', price: 24.60 },
                { name: '+3.000 VISUALIZAÇÕES', price: 53.10 }
            ],
            'mudaqui11': [
                { name: '+1.000 VISUALIZAÇÕES', price: 24.60 },
                { name: '+3.000 VISUALIZAÇÕES', price: 53.10 }
            ],
            'mudaqui12': [
                { name: '+1.000 VISUALIZAÇÕES', price: 24.60 },
                { name: '+3.000 VISUALIZAÇÕES', price: 53.10 }
            ]
        };

        function initializePopup(popupId) {
            const popup = document.getElementById(popupId);
            const button = document.querySelector(`.adquirir-btn[data-target="${popupId}"]`);
            const popupBox = popup.querySelector('.popup-box');
            const originalPopupContent = popupBox.innerHTML; // Armazenar o conteúdo original

            // Variáveis globais
            let recordIdCarrinho = null;
            let recordIdPedidofeito = null;
            let totalPrice = 0;
            let totalPurchaseValue = 0;
            let orderId = null;
            let nameInput = null;
            let whatsappInput = null;
            let linkInput = null;
            let finalizeButton = null;
            let paymentIcon = null;
            let nameValid = false;
            let whatsappValid = false;
            let videoValid = false;
            let selectedAdditionalPackage = null;
            let isCampaignOptimized = false;
            let paymentId = null;
            let paymentCheckInterval = null;
            let countdownInterval = null;
            let countdownTime = 4; // 4 segundos
            let videoViewCount = null;
            let channelSubscriberCount = null;
            let videoTitle = '';
            let channelName = '';
            let linkAdicional = '';
            let quantidadeInicialAdicional = '';
            let additionalVideoViewCount = null;
            let isCreatingRecordCarrinho = false;
            let isCreatingRecordPedidofeito = false;
            let pendingUpdatesCarrinho = [];
            let pendingUpdatesPedidofeito = [];
            let additionalVideoLinkValue = '';
            let progressBar = null;
            let progressText = null;
            let paymentSection = null;
            let confirmationSection = null;
            let userNameDisplay = null;
            let initialTitle = null;

            // Função para formatar números
            function formatNumber(num) {
                return Number(num).toLocaleString('pt-BR');
            }

            // Função para limitar texto a 25 caracteres com "..."
            function limitText(text, maxLength) {
                if (text.length > maxLength) {
                    return text.substring(0, maxLength) + '...';
                } else {
                    return text;
                }
            }

            // Função para gerar ID de pedido
            function generateOrderId() {
                const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const randomLetters = letters.charAt(Math.floor(Math.random() * letters.length)) + letters.charAt(Math.floor(Math.random() * letters.length));
                const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Número de 4 dígitos
                return randomLetters + randomNumbers;
            }

            // Função para trocar a cor do label e o background do checkbox ao selecionar
            function toggleBackground(input, label) {
                if (input.checked) {
                    label.style.backgroundColor = '#04a57d'; // Troca o fundo do label para verde
                    input.style.backgroundColor = '#e60000'; // Troca o fundo da caixa de seleção para vermelho
                } else {
                    label.style.backgroundColor = '#e60000'; // Volta o fundo do label para vermelho
                    input.style.backgroundColor = ''; // Remove o fundo da caixa de seleção
                }
            }

            function closeModal() {
                popup.style.display = 'none';

                // Remove a sobreposição de desfoque
                const blurOverlay = document.getElementById('blur-overlay');
                if (blurOverlay) {
                    blurOverlay.remove();
                }

                // Salvar dados no carrinho se o pagamento não foi aprovado
                if (!paymentId || !isPaymentApproved) {
                    salvarDadosCarrinho();
                }

                resetModal();
            }

            // Função para formatar a data e hora
            function formatarDataHora() {
                const agora = new Date();
                return agora.toLocaleString();
            }

            // Função para salvar dados na tabela "carrinho"
            function gravarDadosCarrinho(parteAtualizada, valor) {
                const data = {
                    "fields": {
                        [parteAtualizada]: valor
                    }
                };

                if (!recordIdCarrinho) {
                    if (!isCreatingRecordCarrinho) {
                        // Se o recordIdCarrinho não existe e não está sendo criado, precisamos criar o registro
                        isCreatingRecordCarrinho = true;
                        data.fields["Data e hora"] = formatarDataHora();
                        let url = "https://api.airtable.com/v0/appQ3o0zL8k1P2mAf/carrinho"; // Substitua YOUR_APP_ID pelo ID da sua base no Airtable
                        const headers = {
                            "Authorization": "Bearer pataAV1pDUlymQByz.b56fa8a46f9512dc629d2031724d5d902f7a935b6367895f072e696769cf09e7", // Substitua pela sua chave de API
                            "Content-Type": "application/json"
                        };

                        fetch(url, {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(result => {
                            recordIdCarrinho = result.id;
                            isCreatingRecordCarrinho = false;
                            console.log("Novo registro no carrinho criado:", result);
                            // Se houver dados pendentes, atualizar o registro
                            if (pendingUpdatesCarrinho.length > 0) {
                                pendingUpdatesCarrinho.forEach(update => {
                                    gravarDadosCarrinho(update.parteAtualizada, update.valor);
                                });
                                pendingUpdatesCarrinho = [];
                            }
                        })
                        .catch(error => {
                            isCreatingRecordCarrinho = false;
                            console.error("Erro ao criar registro no carrinho:", error);
                            alert("Erro ao criar novo registro no carrinho: " + JSON.stringify(error));
                        });
                    } else {
                        // Se o registro está sendo criado, armazenar os dados pendentes
                        pendingUpdatesCarrinho.push({ parteAtualizada, valor });
                    }
                } else {
                    // Se o recordIdCarrinho já existe, atualizamos o registro
                    let url = `https://api.airtable.com/v0/appQ3o0zL8k1P2mAf/carrinho/${recordIdCarrinho}`;
                    const headers = {
                        "Authorization": "Bearer pataAV1pDUlymQByz.b56fa8a46f9512dc629d2031724d5d902f7a935b6367895f072e696769cf09e7", // Substitua pela sua chave de API
                        "Content-Type": "application/json"
                    };

                    fetch(url, {
                        method: "PATCH",
                        headers: headers,
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(result => {
                        console.log("Registro no carrinho atualizado:", result);
                    })
                    .catch(error => {
                        console.error("Erro ao atualizar registro no carrinho:", error);
                        alert("Erro ao atualizar dados no carrinho: " + JSON.stringify(error));
                    });
                }
            }

            // Função para salvar dados na tabela "pedidofeito" (apenas após pagamento aprovado)
            function gravarDadosPedidofeito(parteAtualizada, valor) {
                const data = {
                    "fields": {
                        [parteAtualizada]: valor
                    }
                };

                if (!recordIdPedidofeito) {
                    if (!isCreatingRecordPedidofeito) {
                        // Se o recordIdPedidofeito não existe e não está sendo criado, precisamos criar o registro
                        isCreatingRecordPedidofeito = true;
                        data.fields["Data e hora"] = formatarDataHora();
                        let url = "https://api.airtable.com/v0/appQ3o0zL8k1P2mAf/pedidofeito"; // Substitua YOUR_APP_ID pelo ID da sua base no Airtable
                        const headers = {
                            "Authorization": "Bearer pataAV1pDUlymQByz.b56fa8a46f9512dc629d2031724d5d902f7a935b6367895f072e696769cf09e7", // Substitua pela sua chave de API
                            "Content-Type": "application/json"
                        };

                        fetch(url, {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(result => {
                            recordIdPedidofeito = result.id;
                            isCreatingRecordPedidofeito = false;
                            console.log("Novo registro criado em pedidofeito:", result);
                            // Se houver dados pendentes, atualizar o registro
                            if (pendingUpdatesPedidofeito.length > 0) {
                                pendingUpdatesPedidofeito.forEach(update => {
                                    gravarDadosPedidofeito(update.parteAtualizada, update.valor);
                                });
                                pendingUpdatesPedidofeito = [];
                            }
                        })
                        .catch(error => {
                            isCreatingRecordPedidofeito = false;
                            console.error("Erro ao criar registro em pedidofeito:", error);
                            alert("Erro ao criar novo registro: " + JSON.stringify(error));
                        });
                    } else {
                        // Se o registro está sendo criado, armazenar os dados pendentes
                        pendingUpdatesPedidofeito.push({ parteAtualizada, valor });
                    }
                } else {
                    // Se o recordIdPedidofeito já existe, atualizamos o registro
                    let url = `https://api.airtable.com/v0/appQ3o0zL8k1P2mAf/pedidofeito/${recordIdPedidofeito}`;
                    const headers = {
                        "Authorization": "Bearer pataAV1pDUlymQByz.b56fa8a46f9512dc629d2031724d5d902f7a935b6367895f072e696769cf09e7", // Substitua pela sua chave de API
                        "Content-Type": "application/json"
                    };

                    fetch(url, {
                        method: "PATCH",
                        headers: headers,
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(result => {
                        console.log("Registro atualizado em pedidofeito:", result);
                    })
                    .catch(error => {
                        console.error("Erro ao atualizar registro em pedidofeito:", error);
                        alert("Erro ao atualizar dados: " + JSON.stringify(error));
                    });
                }
            }

            function enviarNome() {
                const nome = nameInput.value;
                gravarDadosCarrinho('Nome', nome);
                // Removido gravarDadosPedidofeito
            }

            function enviarWhatsApp() {
                const whatsapp = whatsappInput.value;
                gravarDadosCarrinho('WhatsApp', whatsapp);
                // Removido gravarDadosPedidofeito
            }

            function enviarLink() {
                const linkValue = linkInput.value;
                const fieldName = 'Link';
                gravarDadosCarrinho(fieldName, linkValue);
                // Removido gravarDadosPedidofeito
            }

            // Função para salvar dados no carrinho ao fechar o modal sem concluir o pagamento
            function salvarDadosCarrinho() {
                // Salvar os dados necessários no carrinho
                enviarNome();
                enviarWhatsApp();
                enviarLink();

                // Salvar outros dados se necessário
                const pacote = initialTitle;
                gravarDadosCarrinho('Pacote Contratado', pacote);

                const campanhaOtimizadaValor = isCampaignOptimized ? 'SIM' : 'NÃO';
                gravarDadosCarrinho('Otimizada', campanhaOtimizadaValor);

                const adicionalContratado = selectedAdditionalPackage ? selectedAdditionalPackage.name : 'NÃO';
                gravarDadosCarrinho('Adicional', adicionalContratado);

                // Valor total
                gravarDadosCarrinho('Valor Total', totalPrice);

                // Mensagem
                const mensagem = construirMensagem(false);
                gravarDadosCarrinho('Mensagem', mensagem);
            }

            // Função para construir a mensagem personalizada
            function construirMensagem(isFinalizarPedido) {
                const nome = nameInput.value.trim();
                const pacote = initialTitle;
                const linkCliente = linkInput.value.trim();

                // Determinar o tipo de item
                let item = '';
                if (['mudaqui1', 'mudaqui2', 'mudaqui3', 'mudaqui4', 'mudaqui5', 'mudaqui6', 'mudaqui7', 'mudaqui8'].includes(popupId)) {
                    item = 'Visualizações';
                } else if (['mudaqui9', 'mudaqui10', 'mudaqui11', 'mudaqui12'].includes(popupId)) {
                    item = 'Inscritos';
                }

                let itemType = '';
                if (item === 'Visualizações') {
                    itemType = 'vídeo:';
                } else if (item === 'Inscritos') {
                    itemType = 'canal:';
                }

                let mensagem = '';

                if (isFinalizarPedido) {
                    // Mensagem para quando o pagamento foi aprovado
                    mensagem = `Olá ${nome} 😃, `;
                    if (orderId) {
                        mensagem += `Recebemos seu pedido: *${orderId}*\n\n`;
                    } else {
                        mensagem += `Obrigado por iniciar seu pedido.\n\n`;
                    }

                    mensagem += `Seu pedido: 📋\n\n`;
                    mensagem += `Pacote: *${pacote}* 🚀\n`;
                    mensagem += `Seu link: ${linkCliente}\n`;

                    // Obter a quantidade atual
                    let quantidadeAtual = null;
                    if (item === 'Visualizações' && videoViewCount !== null) {
                        quantidadeAtual = parseInt(videoViewCount);
                        mensagem += `Atual: *${formatNumber(quantidadeAtual)}*\n`;
                    } else if (item === 'Inscritos' && channelSubscriberCount !== null) {
                        quantidadeAtual = parseInt(channelSubscriberCount);
                        mensagem += `Atual: *${formatNumber(quantidadeAtual)}*\n`;
                    }

                    if (isCampaignOptimized) {
                        mensagem += `*Campanha otimizada*\n`;
                    }
                    if (selectedAdditionalPackage) {
                        mensagem += `Adicional: *${selectedAdditionalPackage.name}*\n`;
                        if (linkAdicional && linkAdicional !== 'Aguardando link do adicional') {
                            mensagem += `Link Adicional: ${linkAdicional}\n`;
                        }
                        if (quantidadeInicialAdicional && !isNaN(quantidadeInicialAdicional)) {
                            mensagem += `Atual: *${formatNumber(quantidadeInicialAdicional)}*\n`;
                        }
                    }

                    mensagem += `Status do pedido: *Na fila para iniciar*\n\n`;
                    mensagem += `⚠️Atenção! Seu pedido está na fila para iniciar, em até *6 a 12* 🕒 horas a partir dessa mensagem já começam os resultados e em até *24 horas* no máximo estará finalizado.\n`;
                    mensagem += `Se tiver alguma dúvida pode nos acionar aqui, em breve nossa equipe irá respondê-lo(a).\n`;

                } else {
                    // Mensagem para quando o pagamento não foi finalizado (carrinho)
                    mensagem = `Olá ${nome}, você está um passo de turbinar seu canal.\n`;
                    mensagem += `Você selecionou *${pacote}* para o ${itemType} ${linkCliente}.\n`;

                    if (isCampaignOptimized) {
                        mensagem += `Você também selecionou *Campanha Otimizada* para melhorar o engajamento.\n`;
                    }
                    if (selectedAdditionalPackage) {
                        mensagem += `E um adicional de *${selectedAdditionalPackage.name}*\n`;
                    }

                    mensagem += `Continue sua compra em nosso site oficial e aproveite os resultados em seu canal.\n`;

                    let siteLink = '';
                    if (item === 'Inscritos') {
                        siteLink = 'https://promovercanal.com/#inscritos';
                    } else if (item === 'Visualizações') {
                        siteLink = 'https://promovercanal.com/#visualizacoes';
                    }
                    mensagem += `${siteLink}\n`;
                }

                return mensagem;
            }

            // Função para enviar tipo de pagamento e mensagem
            function enviarTipoPagamento() {
                const tipoPagamentoElement = popup.querySelector('input[name="payment"]:checked');
                if (tipoPagamentoElement) {
                    const valorPagamento = tipoPagamentoElement.value.toUpperCase();
                    gravarDadosCarrinho('TIPO DE PAGAMENTO', valorPagamento);
                    // Removido gravarDadosPedidofeito

                    // Construir e gravar a mensagem personalizada
                    const mensagem = construirMensagem(false);
                    gravarDadosCarrinho('Mensagem', mensagem);
                    // Removido gravarDadosPedidofeito
                }
            }

            // Função para gerar o pagamento via PIX chamando o backend
            async function generatePixPayment(amount) {
                const amountString = amount.toFixed(2).replace(',', '.'); // Certificar que o separador decimal é ponto
                const response = await fetch("https://promovercanal.com/gerar_pix.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `amount=${amountString}`
                });

                const data = await response.json();

                if (data.point_of_interaction) {
                    return data;
                } else {
                    alert("Erro ao gerar o pagamento. Tente novamente.");
                    console.error(data);
                    throw new Error("Erro ao gerar o pagamento.");
                }
            }

            // Função para extrair o ID do vídeo do URL
            function extractVideoID(url) {
                const patterns = [
                    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/|user\/.*#p\/u\/\d+\/|c\/.*#p\/u\/\d+\/|@[^\/]+\/video\/))([^?&"'>]+)/,
                    /youtube\.com\/watch\?v=([^&]+)/,
                    /youtube\.com\/embed\/([^?&"'>]+)/,
                    /youtube\.com\/v\/([^?&"'>]+)/,
                    /youtu\.be\/([^?&"'>]+)/,
                    /youtube\.com\/shorts\/([^?&"'>]+)/,
                ];

                for (let pattern of patterns) {
                    const match = url.match(pattern);
                    if (match && match[1]) {
                        return match[1];
                    }
                }
                return null;
            }

            // Função para extrair o ID do canal ou do vídeo do URL
            function extractID(url) {
                const channelPatterns = [
                    /youtube\.com\/channel\/([^?&"'>]+)/,
                    /youtube\.com\/user\/([^?&"'>]+)/,
                    /youtube\.com\/c\/([^?&"'>]+)/,
                    /youtube\.com\/@([^?&"'>]+)/,
                ];

                const videoPatterns = [
                    /youtube\.com\/watch\?v=([^?&"'>]+)/,
                    /youtu\.be\/([^?&"'>]+)/,
                ];

                for (let pattern of channelPatterns) {
                    const match = url.match(pattern);
                    if (match && match[1]) {
                        return { type: 'channel', id: decodeURIComponent(match[1]) };
                    }
                }

                for (let pattern of videoPatterns) {
                    const match = url.match(pattern);
                    if (match && match[1]) {
                        return { type: 'video', id: decodeURIComponent(match[1]) };
                    }
                }

                return null;
            }

            // Função para obter a quantidade de visualizações do vídeo
            function getVideoViewCount(videoUrl) {
                return new Promise((resolve, reject) => {
                    const videoId = extractVideoID(videoUrl);
                    if (!videoId) {
                        resolve({ viewCount: 'N/A', title: '' }); // Não foi possível extrair o ID do vídeo
                        return;
                    }
                    const apiKey = 'AIzaSyCalpmgZLYhkCrgrkPLH65-E5d9mPTu-5s'; // Substitua pela sua chave de API do YouTube Data API
                    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;

                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            if (data.items && data.items.length > 0) {
                                const viewCount = data.items[0].statistics.viewCount;
                                const title = data.items[0].snippet.title;
                                resolve({ viewCount, title });
                            } else {
                                resolve({ viewCount: 'N/A', title: '' });
                            }
                        })
                        .catch(error => {
                            console.error('Erro ao buscar dados do vídeo:', error);
                            resolve({ viewCount: 'N/A', title: '' });
                        });
                });
            }

            // Função para obter a contagem de inscritos com o ID do canal
            async function getChannelSubscriberCount(channelId) {
                const apiKey = 'AIzaSyCalpmgZLYhkCrgrkPLH65-E5d9mPTu-5s'; // Substitua pela sua chave de API do YouTube Data API
                const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;

                const response = await fetch(channelUrl);
                const data = await response.json();

                if (data.items && data.items.length > 0) {
                    const subscriberCount = data.items[0].statistics.subscriberCount;
                    const channelName = data.items[0].snippet.title;
                    return { subscriberCount, channelName };
                } else {
                    throw new Error('Canal não encontrado');
                }
            }

            // Função para obter o channelId a partir do videoId
            async function getChannelIDFromVideo(videoId) {
                const apiKey = 'AIzaSyCalpmgZLYhkCrgrkPLH65-E5d9mPTu-5s'; // Substitua pela sua chave de API do YouTube Data API
                const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

                const response = await fetch(videoUrl);
                const data = await response.json();

                if (data.items && data.items.length > 0) {
                    return data.items[0].snippet.channelId;
                } else {
                    throw new Error('Vídeo não encontrado');
                }
            }

            // Função para obter a contagem de inscritos com base no URL fornecido
            async function getSubscriberCount(url) {
                const idInfo = extractID(url);

                if (!idInfo) {
                    return { subscriberCount: 'N/A', channelName: '' };
                }

                try {
                    let channelId;

                    // Caso o link seja um canal direto ou handle (@username)
                    if (idInfo.type === 'channel') {
                        channelId = idInfo.id;

                        // Se for um handle (@username), usa a API de busca para encontrar o ID do canal
                        if (url.includes('/@')) {
                            const apiKey = 'AIzaSyCalpmgZLYhkCrgrkPLH65-E5d9mPTu-5s'; // Substitua pela sua chave de API do YouTube Data API
                            const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelId}&key=${apiKey}`;
                            
                            const response = await fetch(searchUrl);
                            const data = await response.json();

                            if (data.items && data.items.length > 0) {
                                channelId = data.items[0].id.channelId;
                            } else {
                                throw new Error('Canal não encontrado');
                            }
                        }
                    }

                    // Caso o link seja de um vídeo
                    if (idInfo.type === 'video') {
                        // Obter o channelId associado ao vídeo
                        channelId = await getChannelIDFromVideo(idInfo.id);
                    }

                    // Obter a contagem de inscritos e nome do canal com o channelId
                    const { subscriberCount, channelName } = await getChannelSubscriberCount(channelId);
                    return { subscriberCount, channelName };

                } catch (error) {
                    console.error('Erro ao buscar contagem de inscritos:', error);
                    return { subscriberCount: 'N/A', channelName: '' };
                }
            }

            // Variável para rastrear se o pagamento foi aprovado
            let isPaymentApproved = false;

            // Função para processar aprovação do pagamento
            async function processPaymentApproval() {
                clearInterval(paymentCheckInterval); // Parar de verificar o status

                isPaymentApproved = true; // Marcar que o pagamento foi aprovado

                // Gerar ID do pedido
                const IDPEDIDO = generateOrderId();
                orderId = IDPEDIDO; // Salvar o ID do pedido
                gravarDadosPedidofeito('Id do pedido', IDPEDIDO);

                // Registrar Data e hora
                const dataHora = formatarDataHora();
                gravarDadosPedidofeito('Data e hora', dataHora);

                // Certificar que os dados do usuário estão salvos
                const nomeCliente = nameInput.value.trim();
                gravarDadosPedidofeito('Nome', nomeCliente);

                const whatsappCliente = whatsappInput.value.trim();
                gravarDadosPedidofeito('WhatsApp', whatsappCliente);

                const linkCliente = linkInput.value.trim();
                gravarDadosPedidofeito('Link', linkCliente);

                // Determinar o tipo de item
                let item = '';
                if (['mudaqui1', 'mudaqui2', 'mudaqui3', 'mudaqui4', 'mudaqui5', 'mudaqui6', 'mudaqui7', 'mudaqui8'].includes(popupId)) {
                    item = 'Visualizações';
                } else if (['mudaqui9', 'mudaqui10', 'mudaqui11', 'mudaqui12'].includes(popupId)) {
                    item = 'Inscritos';
                }

                // Coletar as informações necessárias
                const pacote = initialTitle;
                gravarDadosPedidofeito('Pacote Contratado', pacote);

                const campanhaOtimizadaValor = isCampaignOptimized ? 'SIM' : 'NÃO';
                gravarDadosPedidofeito('Otimizada', campanhaOtimizadaValor);

                const adicionalContratado = selectedAdditionalPackage ? selectedAdditionalPackage.name : 'NÃO';
                gravarDadosPedidofeito('Adicional', adicionalContratado);

                // Quantidade Atual
                let quantidadeAtual = null;
                if (item === 'Visualizações' && videoViewCount !== null) {
                    quantidadeAtual = parseInt(videoViewCount);
                    gravarDadosPedidofeito('Quantidade Atual', quantidadeAtual);
                } else if (item === 'Inscritos' && channelSubscriberCount !== null) {
                    quantidadeAtual = parseInt(channelSubscriberCount);
                    gravarDadosPedidofeito('Quantidade Atual', quantidadeAtual);
                }

                // Variáveis para o link adicional e quantidade inicial adicional
                if (selectedAdditionalPackage) {
                    if (selectedAdditionalPackage.name.includes('INSCRITOS')) {
                        // Para pacotes adicionais de inscritos, usamos o mesmo canal
                        const channelUrl = linkInput.value.trim();
                        linkAdicional = channelUrl;
                        gravarDadosPedidofeito('Link do adicional', linkAdicional);

                        // Obter quantidade inicial de inscritos
                        const result = await getSubscriberCount(channelUrl);
                        const inicioAdicional = parseInt(result.subscriberCount);
                        quantidadeInicialAdicional = inicioAdicional;
                        gravarDadosPedidofeito('Inicio do adicional', quantidadeInicialAdicional);
                    } else if (selectedAdditionalPackage.name.includes('VISUALIZAÇÕES')) {
                        // Para pacotes adicionais de visualizações, aguardamos o usuário fornecer o link
                        linkAdicional = 'Aguardando link do adicional';
                        quantidadeInicialAdicional = null;
                        gravarDadosPedidofeito('Link do adicional', linkAdicional);
                        gravarDadosPedidofeito('Inicio do adicional', 'Aguardando');
                    }
                }

                // Status do pedido
                gravarDadosPedidofeito('Status do pedido', 'Na fila para Iniciar');

                // Prazo para termino
                gravarDadosPedidofeito('Prazo para termino', '24 Horas');

                // Valor Total
                totalPurchaseValue = totalPrice;
                gravarDadosPedidofeito('Valor Total', totalPurchaseValue);

                // Tipo de pagamento
                const tipoPagamentoElement = popup.querySelector('input[name="payment"]:checked');
                if (tipoPagamentoElement) {
                    const valorPagamento = tipoPagamentoElement.value.toUpperCase();
                    gravarDadosPedidofeito('TIPO DE PAGAMENTO', valorPagamento);
                }

                // Mensagem
                const mensagem = construirMensagem(true);
                gravarDadosPedidofeito('Mensagem', mensagem);

                // Remover o registro do carrinho, se existir
                if (recordIdCarrinho) {
                    deleteRecordCarrinho(recordIdCarrinho);
                }

                // Construir mensagem para WhatsApp
                let mensagemWhatsApp = construirMensagemWhatsApp();

                // URL-encode the message
                const mensagemWhatsAppEncoded = encodeURIComponent(mensagemWhatsApp);

                // Construir o conteúdo do resumo
                let summaryContent = `
                    <div class="close-btn">
                        <span>X</span>
                    </div>
                    <div class="summary-container" style="background-color: #0E0D0D7D; border-radius: 10px;">
                        <h2 class="order-id" style="background-color: #00ff00; color: black; text-align: center; display: inline-block; padding: 5px 10px; border-radius: 5px;">Pedido ${IDPEDIDO}</h2>
                        <div style="background-color: white; padding: 10px; border-radius: 5px;">
                            <p><strong style="color: black;">Pacote:</strong> <span style="color:#e60000; font-weight:bold;">${pacote}</span></p>
                `;

                if (isCampaignOptimized) {
                    summaryContent += `<p><span style="background-color: #e60000; color: yellow; font-weight: bold;">+ Campanha otimizada</span></p>`;
                }

                if (selectedAdditionalPackage) {
                    summaryContent += `<p><strong style="color: black;">Adicional contratado:</strong></p>
                    <p><span style="color: #e60000; font-weight:bold;">${selectedAdditionalPackage.name}</span></p>`;
                }

                summaryContent += `</div>`;

                // Inserir o texto antes do primeiro background
                summaryContent += `
                    <p style="color: white; font-weight: bold;">Quantidades Atuais antes de iniciar</p>
                    <div style="display: inline-flex; flex-direction: column; align-items: center; background-color: black; padding: 10px; border-top: 2px dashed yellow; border-left: 2px dashed yellow; border-right: 2px dashed yellow; border-radius: 8px 8px 0 0;">
        <div style="display: flex; align-items: center; margin-bottom: 2px;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 512 512" width="18" height="18" style="margin-right: 6px;">
                <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
            </svg>
            <span style="color: white; font-weight: bold; font-size: 14px;">Tire um print dessa tela!</span>
        </div>
        <div style="margin-top: 0px; text-align: center; line-height: 1;">
            <span style="color: white; font-size: 14px; font-weight: bold;">Pedido: </span>
            <span id="order-id" style="color: yellow; font-size: 14px; font-weight: bold;">${IDPEDIDO}</span>
        </div>
    </div>
                `;

                // Quantidade Atual
                if (item) {
                    summaryContent += `<div style="background-color: #fff9e6; border: 2px dashed rgb(4, 165, 125); padding: 10px; margin-bottom: 10px;">`;
                    summaryContent += `<p style="color: black;"><strong>Quantidade atual de ${item}:</strong></p>`;
                    if (item === 'Visualizações' && videoViewCount !== null) {
                        const displayedVideoTitle = limitText(videoTitle, 25);
                        summaryContent += `<p style="color: rgb(4, 165, 125); font-weight: bold;">${formatNumber(videoViewCount)} Visualizações</p>`;
                        summaryContent += `<p style="color: black;"><span>Titulo do Vídeo:</span></p>`;
                        summaryContent += `<p style="color: rgb(4, 165, 125); font-weight: bold;">${displayedVideoTitle}</p>`;
                    } else if (item === 'Inscritos' && channelSubscriberCount !== null) {
                        const displayedChannelName = limitText(channelName, 25);
                        summaryContent += `<p style="color: rgb(4, 165, 125); font-weight: bold;">${formatNumber(channelSubscriberCount)} Inscritos</p>`;
                        summaryContent += `<p style="color: black;"><span>Nome do Canal:</span></p>`;
                        summaryContent += `<p style="color: rgb(4, 165, 125); font-weight: bold;">${displayedChannelName}</p>`;
                    } else {
                        summaryContent += `<p style="color: rgb(4, 165, 125); font-weight: bold;">Carregando...</p>`;
                    }
                    summaryContent += `</div>`;
                }

                // Se tiver contratado um pacote adicional de inscritos
                if (selectedAdditionalPackage && selectedAdditionalPackage.name.includes('INSCRITOS')) {
                    const channelUrl = linkInput.value;
                    summaryContent += `<div style="background-color: #fff9e6; border: 2px dashed rgb(4, 165, 125); padding: 10px; margin-bottom: 10px;">`;
                    summaryContent += `<p style="color: black;"><strong>Quantidade atual de Inscritos:</strong></p>`;
                    if (channelSubscriberCount !== null) {
                        const displayedChannelName = limitText(channelName, 25);
                        summaryContent += `<p style="color: rgb(4, 165, 125); font-weight: bold;">${formatNumber(channelSubscriberCount)} Inscritos</p>`;
                        summaryContent += `<p style="color: black;"><span>Nome do Canal:</span></p>`;
                        summaryContent += `<p style="color: rgb(4, 165, 125); font-weight: bold;">${displayedChannelName}</p>`;
                    } else {
                        summaryContent += `<p id="quantInscri" style="color: rgb(4, 165, 125); font-weight: bold;">Carregando...</p>`;
                        summaryContent += `<p style="color: black;"><span>Nome do Canal:</span></p>`;
                        summaryContent += `<p id="channelName" style="color: rgb(4, 165, 125); font-weight: bold;"></p>`;
                        getSubscriberCount(channelUrl).then(result => {
                            channelSubscriberCount = result.subscriberCount;
                            channelName = result.channelName;
                            const quantInscriElement = popup.querySelector('#quantInscri');
                            quantInscriElement.textContent = `${formatNumber(channelSubscriberCount)} Inscritos`;

                            // Atualizar o nome do canal
                            const channelNameElement = popup.querySelector('#channelName');
                            if (channelNameElement) {
                                const displayedChannelName = limitText(channelName, 25);
                                channelNameElement.textContent = `${displayedChannelName}`;
                            }
                        });
                    }
                    summaryContent += `</div>`;
                }

                // Se tiver contratado um pacote adicional de visualizações
                if (selectedAdditionalPackage && selectedAdditionalPackage.name.includes('VISUALIZAÇÕES')) {
                    summaryContent += `
                        <p><strong>Insira o link do vídeo adicional:</strong></p>
                        <div style="position: relative; display: inline-block;">
                            <input type="text" id="additionalVideoLink" placeholder="link do vídeo" style="padding-left: 30px; margin-top: 10px;" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="position: absolute; left: 5px; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; fill: red;">
                                <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/>
                            </svg>
                        </div>
                        <div id="quantViewContainer"></div>
                    `;
                }

                // Mensagem final e botão WhatsApp
                summaryContent += `
                    <p style="background-color: white; color: #e60000; text-align: center; padding: 5px 10px; border-radius: 5px;">
                        Em até <strong>24 Horas</strong> seu pedido será finalizado!
                    </p>
                    <p style="color: white; text-align: center;">
                        Envie seu pedido no WhatsApp 👇
                    </p>
                    <div style="text-align: center;">
                        <a href="https://wa.me/5587991501951?text=${mensagemWhatsAppEncoded}" target="_blank" style="background-color: #00ff00; color: black; font-weight: bold; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">WhatsApp</a>
                    </div>
                    <p style="text-align: center; color: yellow; font-style: italic; font-size: smaller;">
                       ⚠️ A resposta pode demorar um pouco devido ao grande número de mensagens
                    </p>
                </div>
                `;

                // Atualizar o conteúdo do popup-box
                popupBox.innerHTML = summaryContent;

                // Resetar a posição de scroll para o topo
                popupBox.scrollTop = 0;

                // Reanexar o event listener do botão de fechar
                popup.querySelector('.close-btn').addEventListener('click', closeModal);

                // Se houver input para link de vídeo adicional
                const additionalVideoLinkInput = popup.querySelector('#additionalVideoLink');
                if (additionalVideoLinkInput) {
                    const quantViewContainer = popup.querySelector('#quantViewContainer');

                    additionalVideoLinkInput.addEventListener('input', async function() {
                        additionalVideoLinkValue = this.value.trim();
                        if (additionalVideoLinkValue) {
                            linkAdicional = additionalVideoLinkValue;
                            gravarDadosPedidofeito('Link do adicional', linkAdicional);

                            // Obter quantidade inicial de visualizações do vídeo adicional
                            const result = await getVideoViewCount(additionalVideoLinkValue);
                            const displayedVideoTitle = limitText(result.title, 25);
                            quantViewContainer.innerHTML = `
                            <div style="background-color: #fff9e6; border: 2px dashed rgb(4, 165, 125); padding: 10px; margin-bottom: 10px;">
                                <p style="color: black;"><strong>Quantidade atual de Visualizações:</strong></p>
                                <p style="color: rgb(4, 165, 125); font-weight: bold;">${formatNumber(result.viewCount)} Visualizações</p>
                                <p style="color: black;"><span>Título do Vídeo:</span></p>
                                <p style="color: rgb(4, 165, 125); font-weight: bold;">${displayedVideoTitle}</p>
                            </div>`;

                            // Salvar 'Inicio do adicional' no Airtable
                            const inicioAdicional = parseInt(result.viewCount);
                            quantidadeInicialAdicional = inicioAdicional;
                            additionalVideoViewCount = inicioAdicional;
                            gravarDadosPedidofeito('Inicio do adicional', inicioAdicional);

                            // Atualizar a mensagem principal
                            const mensagemAtualizada = construirMensagem(true);
                            gravarDadosPedidofeito('Mensagem', mensagemAtualizada);

                            // Atualizar a mensagem do WhatsApp
                            const mensagemWhatsAppAtualizada = construirMensagemWhatsApp();
                            const mensagemWhatsAppEncoded = encodeURIComponent(mensagemWhatsAppAtualizada);

                            // Atualizar o link do botão do WhatsApp
                            const whatsappButton = popup.querySelector('a[href^="https://wa.me/"]');
                            if (whatsappButton) {
                                whatsappButton.href = `https://wa.me/5587991501951?text=${mensagemWhatsAppEncoded}`;
                            }
                        }
                    });
                }

                // **Alteração para carregar a página em segundo plano usando um iframe invisível**
                const conversionIframe = document.createElement('iframe');
                conversionIframe.style.width = '0';
                conversionIframe.style.height = '0';
                conversionIframe.style.border = 'none';
                conversionIframe.style.display = 'none';
                conversionIframe.src = 'https://promovercanal.com/status';
                document.body.appendChild(conversionIframe);

                // Remover o iframe após 5 segundos
                setTimeout(() => {
                    if (conversionIframe) {
                        conversionIframe.remove();
                    }
                }, 5000);
            }

            // Função para deletar registro do carrinho
            function deleteRecordCarrinho(recordId) {
                const url = `https://api.airtable.com/v0/appQ3o0zL8k1P2mAf/carrinho/${recordId}`;
                const headers = {
                    "Authorization": "Bearer pataAV1pDUlymQByz.b56fa8a46f9512dc629d2031724d5d902f7a935b6367895f072e696769cf09e7", // Substitua pela sua chave de API
                    "Content-Type": "application/json"
                };

                fetch(url, {
                    method: "DELETE",
                    headers: headers
                })
                .then(response => response.json())
                .then(result => {
                    console.log("Registro deletado do carrinho:", result);
                })
                .catch(error => {
                    console.error("Erro ao deletar registro do carrinho:", error);
                });
            }

            // Função para construir a mensagem do WhatsApp
            function construirMensagemWhatsApp() {
                const IDPEDIDO = orderId || 'N/A';
                const pacote = initialTitle;
                const linkCliente = linkInput.value.trim();
                let quantidadeAtual = null;
                let item = '';
                if (['mudaqui1', 'mudaqui2', 'mudaqui3', 'mudaqui4', 'mudaqui5', 'mudaqui6', 'mudaqui7', 'mudaqui8'].includes(popupId)) {
                    item = 'Visualizações';
                    quantidadeAtual = videoViewCount ? parseInt(videoViewCount) : 'N/A';
                } else if (['mudaqui9', 'mudaqui10', 'mudaqui11', 'mudaqui12'].includes(popupId)) {
                    item = 'Inscritos';
                    quantidadeAtual = channelSubscriberCount ? parseInt(channelSubscriberCount) : 'N/A';
                }

                let mensagemWhatsApp = `Olá, esse é meu pedido: *${IDPEDIDO}*
    Pacote contratado: ${pacote}
    Link: ${linkCliente}
    Quantidade Inicial: ${quantidadeAtual}`;

                if (isCampaignOptimized) {
                    mensagemWhatsApp += `
    *Campanha otimizada*`;
                }

                if (selectedAdditionalPackage) {
                    mensagemWhatsApp += `
    Pacote adicional: ${selectedAdditionalPackage.name}`;
                    if (linkAdicional && linkAdicional !== 'Aguardando link do adicional') {
                        mensagemWhatsApp += `
    Link do adicional: ${linkAdicional}`;
                    }
                    if (quantidadeInicialAdicional && !isNaN(quantidadeInicialAdicional)) {
                        mensagemWhatsApp += `
    Quantidade inicial adicional: ${quantidadeInicialAdicional}`;
                    }
                }

                mensagemWhatsApp += `
    Status do pedido: *Na Fila para iniciar*
    Prazo para entrega = *24 Horas*
    Valor = *R$ ${totalPurchaseValue.toFixed(2)}*
    
    Aguardo atendimento… (Em algumas horas serei atendido)
    `;

                return mensagemWhatsApp;
            }

            // Função para verificar o status do pagamento
            async function checkPaymentStatus() {
                if (!paymentId) return;

                const response = await fetch(`https://promovercanal.com/check_payment_status.php?payment_id=${paymentId}`, {
                    method: "GET"
                });
                const data = await response.json();

                if (data.status === "approved") {
                    processPaymentApproval();
                }
            }

            // Função para enviar clique no botão e gerar PIX
            async function enviarCliqueBotao() {
        gravarDadosCarrinho('CLIQUE NO BOTÃO', true);
        // Removido gravarDadosPedidofeito

        // Construir e gravar a mensagem personalizada
        const mensagem = construirMensagem(false);
        gravarDadosCarrinho('Mensagem', mensagem);
        // Removido gravarDadosPedidofeito

        // Armazenar o valor total da compra
        totalPurchaseValue = totalPrice;
        gravarDadosCarrinho('Valor Total', totalPurchaseValue);
        // Removido gravarDadosPedidofeito

        // Gerar o pagamento PIX
        let pixData;
        try {
            pixData = await generatePixPayment(totalPurchaseValue);
        } catch (error) {
            console.error("Erro ao gerar PIX:", error);
            alert("Erro ao gerar o PIX. Por favor, tente novamente.");
            return;
        }

        const pixCode = pixData.point_of_interaction.transaction_data.qr_code;
        const qrCodeBase64 = pixData.point_of_interaction.transaction_data.qr_code_base64;

        // Armazenar o ID do pagamento
        paymentId = pixData.id;

        // Iniciar a verificação do status de pagamento
        checkPaymentStatus();
        paymentCheckInterval = setInterval(checkPaymentStatus, 3000); // Verifica a cada 3 segundos

        // Injetar estilos CSS se ainda não estiverem presentes
        if (!document.getElementById('aguardando-pagamento-styles')) {
            const style = document.createElement('style');
            style.id = 'aguardando-pagamento-styles';
            style.innerHTML = `
            .aguardando-pagamento {
                color: #CA9E3B;
                font-weight: bold;
                animation: blinking 1s infinite;
            }
            @keyframes blinking {
                0% { opacity: 1; }
                50% { opacity: 0; }
                100% { opacity: 1; }
            }
            .bolinha {
                color: #CA9E3B;
            }
            `;
            document.head.appendChild(style);
        }

        // Construir o conteúdo do resumo
        let summaryContent = `
            <div class="close-btn">
                <span>X</span>
            </div>
            <div class="summary-container">
                <h2>SEU PEDIDO</h2>
                <p><strong>Pacote:</strong> <span style="color:#00ff00; font-weight:bold;">${initialTitle}</span></p>
        `;

        if (isCampaignOptimized) {
            summaryContent += `<p><strong>Campanha Otimizada:</strong> <span style="color:#00ff00; font-weight:bold;">Sim</span></p>`;
        }

        if (selectedAdditionalPackage) {
            summaryContent += `<p><strong>Pacote Adicional:</strong> <span style="color:#00ff00; font-weight:bold;">${selectedAdditionalPackage.name}</span></p>`;
        }

        // Adicionar Valor Total com estilização
        summaryContent += `
                <div class="valor-total">
                    TOTAL = R$ ${totalPrice.toFixed(2)}
                </div>
            </div>
            <div class="pix-section" style="color: black;">
                <div class="timer">
                    Você tem <span id="countdown">06:00</span>
                </div>
                <div class="timer-text">
                    minutos para pagar esse pix
                </div>
                <div class="bordered-section">
                    <span class="purchase-value">R$ ${totalPrice.toFixed(2)}</span>
                    <h3>Escanear QR Code</h3>
                    <img id="qrCodeImage" src="data:image/png;base64,${qrCodeBase64}" alt="QR Code PIX" />
                </div>
                <div class="bordered-section">
                    <span class="purchase-value">R$ ${totalPrice.toFixed(2)}</span>
                    <h3>Código PIX (copia e cola)</h3>
                    <div id="pixCodeDisplay">
                        ${pixCode.substring(0,27)}...
                    </div>
                    <button id="copyPixCodeBtn">Clique para copiar código PIX</button>
                </div>
                <p class="aguardando-pagamento"><span class="bolinha">●</span> Aguardando Pagamento</p>
                <p class="nome-responsavel">Nome responsável:</p>
                <p class="nome">William Santos De Lima</p>
            </div>
        `;

        // Substituir o conteúdo do popup-box pelo resumo
        popupBox.innerHTML = summaryContent;

        // Resetar a posição de scroll para o topo
        popupBox.scrollTop = 0;

        // Reanexar o event listener do botão de fechar
        popup.querySelector('.close-btn').addEventListener('click', closeModal);

        // Adicionar event listener ao botão de copiar código PIX
        const copyPixCodeBtn = popup.querySelector('#copyPixCodeBtn');
        const pixCodeDisplay = popup.querySelector('#pixCodeDisplay');

        function copyPixCode() {
            navigator.clipboard.writeText(pixCode).then(function() {
                copyPixCodeBtn.textContent = 'Copiado';
                copyPixCodeBtn.classList.add('copied');
            }, function(err) {
                console.error('Erro ao copiar o código PIX: ', err);
            });
        }

        copyPixCodeBtn.addEventListener('click', copyPixCode);
        pixCodeDisplay.addEventListener('click', copyPixCode);

        // Iniciar o temporizador de contagem regressiva
        let timeLeft = 6 * 60; // 6 minutos em segundos
        const countdownElement = popup.querySelector('#countdown');
        const timerInterval = setInterval(function() {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            // Adicionar zero à esquerda se os segundos forem menores que 10
            seconds = seconds < 10 ? '0' + seconds : seconds;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            countdownElement.textContent = `${minutes}:${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                // Lidar com o fim do tempo
                // Exibir mensagem e botão de suporte
                const pixSection = popup.querySelector('.pix-section');
                const supportMessage = document.createElement('p');
                supportMessage.textContent = 'Se houve algum problema com pagamento clique no botão abaixo';
                pixSection.appendChild(supportMessage);

                const supportButton = document.createElement('button');
                supportButton.id = 'supportBtn';
                supportButton.textContent = 'Fale com o suporte';
                supportButton.addEventListener('click', function() {
                    window.open('https://wa.me/5587991501951', '_blank');
                });
                pixSection.appendChild(supportButton);
            }

            timeLeft--;
        }, 1000);

        
    }

            // Função para inicializar os elementos e event listeners
            function initializeElements() {
                nameInput = popup.querySelector('.name');
                whatsappInput = popup.querySelector('.whatsapp');
                linkInput = popup.querySelector('.video') || popup.querySelector('.channel');
                finalizeButton = popup.querySelector('.finalize-button');
                paymentIcon = popup.querySelector('.payment-icon');

                const errorMessage = document.createElement("div");
                errorMessage.style.color = "yellow";
                errorMessage.style.fontWeight = "bold";
                errorMessage.style.display = "none"; // Esconde por padrão
                errorMessage.textContent = "Insira um link válido";
                linkInput.parentNode.insertBefore(errorMessage, linkInput.nextSibling);

                // Função de validação e exibição da mensagem de erro
                function validateLink() {
                    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/.+$/;
                    videoValid = urlPattern.test(linkInput.value.trim());
                    if (!videoValid) {
                        errorMessage.style.display = "block"; // Exibe a mensagem de erro
                    } else {
                        errorMessage.style.display = "none"; // Esconde a mensagem de erro
                    }
                    validateInput(linkInput, videoValid);
                }

                linkInput.addEventListener("input", validateLink);

                // **Adicionado evento para permitir colar no input e ocultar o teclado no mobile**
                linkInput.addEventListener("paste", function() {
                    if (isMobileDevice()) {
                        // Permitir que o paste aconteça antes de ocultar o teclado
                        setTimeout(function() {
                            // Oculta o teclado virtual após o paste
                            linkInput.blur();
                        }, 0);
                    }
                });

                // Função para verificar se é um dispositivo mobile
                function isMobileDevice() {
                    return /Mobi|Android/i.test(navigator.userAgent);
                }

                // Eventos de blur e change nos campos
                nameInput.addEventListener('input', enviarNome);
                whatsappInput.addEventListener('input', enviarWhatsApp);
                linkInput.addEventListener('input', enviarLink);

                popup.querySelectorAll('input[name="payment"]').forEach(radio => {
                    radio.addEventListener('change', enviarTipoPagamento);
                });

                finalizeButton.addEventListener('click', function () {
                    // Mudar o texto do botão
                    finalizeButton.textContent = 'Gerando pedido aguarde...';

                    // Adicionar a classe para mudar a cor do botão
                    finalizeButton.classList.add('finalize-button-active');

                    enviarCliqueBotao();
                });

                // Validação e manipulação do progresso
                progressBar = popup.querySelector(".progress-bar");
                progressText = popup.querySelector(".progress-text");
                paymentSection = popup.querySelector(".payment-section");
                confirmationSection = popup.querySelector(".confirmation-section");
                userNameDisplay = popup.querySelector(".user-name");
                initialTitle = popup.querySelector(".initial-title").textContent;

                nameInput.addEventListener("input", function () {
                    let nameValue = nameInput.value
                        .toLowerCase()
                        .replace(/\b\w/g, function (char) {
                            return char.toUpperCase();
                        });

                    nameInput.value = nameValue;
                    nameValid = nameValue.trim() !== "";
                    validateInput(nameInput, nameValid);
                });

                whatsappInput.addEventListener("input", function () {
                    let number = whatsappInput.value.replace(/\D/g, '');
                    number = number.replace(/^(\d{2})(\d)/g, "($1) $2");
                    number = number.replace(/(\d)(\d{4})$/, "$1-$2");
                    whatsappInput.value = number;

                    whatsappValid = (number.length === 14 || number.length === 15);
                    validateInput(whatsappInput, whatsappValid);
                });

                linkInput.addEventListener("input", function () {
                    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/.+$/;
                    videoValid = urlPattern.test(linkInput.value.trim());
                    validateInput(linkInput, videoValid);

                    if (videoValid) {
                        // Fetch counts
                        const linkValue = linkInput.value.trim();

                        // Determine if we need to get video views or channel subscribers
                        if (['mudaqui1', 'mudaqui2', 'mudaqui3', 'mudaqui4', 'mudaqui5', 'mudaqui6', 'mudaqui7', 'mudaqui8'].includes(popupId)) {
                            // Precisa obter visualizações do vídeo
                            getVideoViewCount(linkValue).then(result => {
                                videoViewCount = result.viewCount;
                                videoTitle = result.title;
                            });
                        } else if (['mudaqui9', 'mudaqui10', 'mudaqui11', 'mudaqui12'].includes(popupId)) {
                            // Precisa obter inscritos do canal
                            getSubscriberCount(linkValue).then(result => {
                                channelSubscriberCount = result.subscriberCount;
                                channelName = result.channelName;
                            });
                        }
                    }
                });

                // Evento de mudança do método de pagamento
                popup.querySelectorAll('input[name="payment"]').forEach(radio => {
                    radio.addEventListener('change', function () {
                        updateProgress();
                        if (nameValid && whatsappValid && videoValid) {
                            progressBar.style.width = "90%";
                            progressText.textContent = "90%";
                            progressBar.classList.add("smoke-effect");
                            confirmationSection.classList.remove("hidden");
                            confirmationSection.style.opacity = 1;

                            // Determine o tipo de link com base no popupId
                            let linkType = '';
                            if (['mudaqui9', 'mudaqui10', 'mudaqui11', 'mudaqui12'].includes(popupId)) {
                                linkType = 'CANAL';
                            } else {
                                linkType = 'vídeo';
                            }

                            // Atualize a mensagem de confirmação
                            const confirmationText = confirmationSection.querySelector('.confirmation-text');
                            confirmationText.innerHTML = `Tudo pronto! Após a confirmação do pagamento, será iniciado <strong class="highlight">${initialTitle}</strong> no ${linkType} inserido.`;

                            // Obter o método de pagamento selecionado em maiúsculas
                            const selectedPayment = this.value.toUpperCase();

                            // Obter o preço correspondente do pacote
                            const price = packagePrices[popupId][selectedPayment];
                            let initialPrice = price;
                            totalPrice = initialPrice;

                            // Atualiza o preço no botão
                            const priceSpan = finalizeButton.querySelector('.price');
                            priceSpan.textContent = ` ${totalPrice.toFixed(2)} R$`;

                            // Configurar a seção de Campanha Otimizada
                            const campaignOptimizedCheckbox = confirmationSection.querySelector('.campaign-optimized');
                            const campaignOptimizedLabel = campaignOptimizedCheckbox.closest('label');
                            campaignOptimizedCheckbox.checked = false;
                            isCampaignOptimized = false;

                            // Remover event listener anterior se houver
                            const oldCampaignOptimizedHandler = campaignOptimizedCheckbox.getAttribute('data-handler');
                            if (oldCampaignOptimizedHandler) {
                                campaignOptimizedCheckbox.removeEventListener('change', window[oldCampaignOptimizedHandler]);
                            }

                            const campaignOptimizedHandler = function () {
                                isCampaignOptimized = this.checked;
                                updateTotalPrice();
                                toggleBackground(this, campaignOptimizedLabel);
                                // Gravar no Airtable
                                gravarDadosCarrinho('Otimizada', isCampaignOptimized ? 'SIM' : 'NÃO');
                                // Removido gravarDadosPedidofeito
                                // Atualizar mensagem
                                const mensagem = construirMensagem(false);
                                gravarDadosCarrinho('Mensagem', mensagem);
                                // Removido gravarDadosPedidofeito
                            };

                            // Atribuir um nome único para o handler
                            const handlerName = `campaignOptimizedHandler_${popupId}`;
                            window[handlerName] = campaignOptimizedHandler;
                            campaignOptimizedCheckbox.setAttribute('data-handler', handlerName);

                            campaignOptimizedCheckbox.addEventListener('change', campaignOptimizedHandler);

                            // Configurar pacotes adicionais
                            const additionalPackages = additionalPackagesMapping[popupId] || [];
                            const additionalOptionsDiv = confirmationSection.querySelector('.additional-options');
                            additionalOptionsDiv.innerHTML = ''; // Limpar opções existentes

                            // Limitar a 2 pacotes adicionais
                            const limitedAdditionalPackages = additionalPackages.slice(0, 2);

                            if (limitedAdditionalPackages.length > 0) {
                                // Mostrar a seção de pacotes adicionais
                                confirmationSection.querySelector('.additional-package').classList.remove('hidden');

                                limitedAdditionalPackages.forEach(pkg => {
                                    const label = document.createElement('label');
                                    const input = document.createElement('input');
                                    input.type = 'checkbox';
                                    input.className = 'additional-package-option';
                                    input.value = pkg.price;
                                    input.dataset.name = pkg.name; // Use o nome normal aqui
                                    label.appendChild(input);
                                    label.appendChild(document.createTextNode(` ${pkg.name} = ${pkg.price.toFixed(2)} R$`));

                                    additionalOptionsDiv.appendChild(label);
                                });

                                // Adicionar evento aos pacotes adicionais
                                const additionalPackageOptions = confirmationSection.querySelectorAll('.additional-package-option');
                                additionalPackageOptions.forEach(option => {
                                    const label = option.closest('label');

                                    // Remover event listener anterior se houver
                                    const oldAdditionalPackageHandler = option.getAttribute('data-handler');
                                    if (oldAdditionalPackageHandler) {
                                        option.removeEventListener('change', window[oldAdditionalPackageHandler]);
                                    }

                                    const additionalPackageHandler = function () {
                                        additionalPackageOptions.forEach(otherOption => {
                                            const otherLabel = otherOption.closest('label');
                                            otherLabel.style.backgroundColor = '#e60000'; // Reseta o fundo dos labels para vermelho
                                            otherOption.style.backgroundColor = ''; // Remove o fundo das caixas de seleção

                                            if (otherOption !== this) {
                                                otherOption.checked = false;
                                            }
                                        });

                                        // Marca o checkbox atual e aplica o estilo
                                        toggleBackground(this, label);

                                        if (this.checked) {
                                            selectedAdditionalPackage = {
                                                name: this.dataset.name,
                                                price: parseFloat(this.value)
                                            };
                                            // Gravar no Airtable
                                            gravarDadosCarrinho('Adicional', selectedAdditionalPackage.name);
                                            // Removido gravarDadosPedidofeito
                                        } else {
                                            selectedAdditionalPackage = null;
                                            // Limpar no Airtable
                                            gravarDadosCarrinho('Adicional', 'NÃO');
                                            // Removido gravarDadosPedidofeito
                                        }
                                        updateTotalPrice();
                                        // Atualizar mensagem
                                        const mensagem = construirMensagem(false);
                                        gravarDadosCarrinho('Mensagem', mensagem);
                                        // Removido gravarDadosPedidofeito
                                    };

                                    // Atribuir um nome único para o handler
                                    const handlerName = `additionalPackageHandler_${popupId}_${option.dataset.name}`;
                                    window[handlerName] = additionalPackageHandler;
                                    option.setAttribute('data-handler', handlerName);

                                    option.addEventListener('change', additionalPackageHandler);
                                });
                            } else {
                                // Ocultar a seção se não houver pacotes adicionais
                                confirmationSection.querySelector('.additional-package').classList.add('hidden');
                            }

                            // Função para atualizar o preço total
                            function updateTotalPrice() {
                                totalPrice = initialPrice;

                                // Adicionar 17 R$ se "Campanha Otimizada" estiver selecionada
                                if (isCampaignOptimized) {
                                    totalPrice += 17;
                                }

                                // Adicionar preço do pacote adicional
                                if (selectedAdditionalPackage) {
                                    totalPrice += selectedAdditionalPackage.price;
                                }

                                // Atualiza o preço no botão
                                priceSpan.textContent = ` ${totalPrice.toFixed(2)} R$`;
                            }

                            // Inicializar o preço total
                            updateTotalPrice();

                            // Atualizar o ícone de pagamento
                            if (selectedPayment === "PIX") {
                                paymentIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#07b87b" width="16" height="16"><path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C256.1 224.4 247.9 224.5 242.4 218.9L165.7 142.2C151.5 127.1 132.6 120.2 112.6 120.2H103.3L200.7 22.8C231.1-7.6 280.3-7.6 310.6 22.8L407.8 119.9H392.6C372.6 119.9 353.7 127.7 339.5 141.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C365.3 148.1 378.8 142.5 392.6 142.5H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 368.9H392.6C378.8 368.9 365.3 363.3 355.5 353.5L278.5 276.5C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.2C139.1 363 126.4 368.6 112.6 368.6H80.8L22.8 310.6C-7.6 280.3-7.6 231.1 22.8 200.8L80.8 142.7H112.6z"/></svg>'; // Ícone PIX
                            } else if (selectedPayment === "CREDITO") {
                                paymentIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="black" width="16" height="16"><path d="M0 80C0 53.5 21.5 32 48 32H528C554.5 32 576 53.5 576 80V432C576 458.5 554.5 480 528 480H48C21.5 480 0 458.5 0 432V80zM64 128V176H512V128H64zM64 384H512V256H64V384z"/></svg>'; // Ícone Crédito
                            }
                        }
                    });
                });

                function updateProgress() {
                    let validCount = 0;
                    if (nameValid) validCount++;
                    if (whatsappValid) validCount++;
                    if (videoValid) validCount++;

                    let progress = (validCount / 3) * 75;
                    if (popup.querySelector('input[name="payment"]:checked')) {
                        progress = 90;
                    }
                    progressBar.style.width = `${progress}%`;
                    progressText.textContent = `${Math.round(progress)}%`;

                    if (validCount === 3) {
                        paymentSection.classList.remove("hidden");
                        paymentSection.style.opacity = 1;
                        const firstName = nameInput.value.trim().split(" ")[0];
                        userNameDisplay.textContent = firstName;
                    }
                }

                function validateInput(input, condition) {
                    if (condition) {
                        input.classList.remove('invalid');
                        input.classList.add('valid');
                    } else {
                        input.classList.remove('valid');
                        input.classList.add('invalid');
                    }
                    updateProgress();
                }
            }

            // Função para resetar o modal
            function resetModal() {
                // Restaurar o conteúdo original do popup-box
                popupBox.innerHTML = originalPopupContent;

                // Resetar a posição de scroll para o topo
                popupBox.scrollTop = 0;

                // Re-inicializar variáveis e event listeners
                recordIdCarrinho = null;
                recordIdPedidofeito = null;
                totalPrice = 0;
                totalPurchaseValue = 0;
                paymentId = null;
                orderId = null;
                countdownTime = 4;

                selectedAdditionalPackage = null;
                isCampaignOptimized = false;

                videoViewCount = null;
                channelSubscriberCount = null;
                videoTitle = '';
                channelName = '';

                linkAdicional = '';
                quantidadeInicialAdicional = '';
                additionalVideoLinkValue = '';

                nameValid = false;
                whatsappValid = false;
                videoValid = false;

                isPaymentApproved = false;

                // Limpar intervalos se estiverem ativos
                if (paymentCheckInterval) {
                    clearInterval(paymentCheckInterval);
                    paymentCheckInterval = null;
                }
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                }

                // Inicializar elementos e event listeners
                initializeElements();

                // Botão de fechar
                popup.querySelector('.close-btn').addEventListener('click', closeModal);
            }

            // Inicializar elementos e event listeners
            initializeElements();

            // Botão de fechar
            popup.querySelector('.close-btn').addEventListener('click', closeModal);

            // Abrir o pop-up ao clicar no botão
            button.addEventListener('click', function() {
                popup.style.display = 'flex';

                // Resetar a posição de scroll para o topo
                popupBox.scrollTop = 0;

                // Cria a sobreposição de desfoque
                const blurOverlay = document.createElement('div');
                blurOverlay.classList.add('blur-overlay');
                blurOverlay.id = 'blur-overlay';
                document.body.appendChild(blurOverlay);

                // Resetar o modal ao abrir
                resetModal();
            });
        }

        // Inicialize cada pop-up
        initializePopup('mudaqui1');
        initializePopup('mudaqui2');
        initializePopup('mudaqui3');
        initializePopup('mudaqui4');
        initializePopup('mudaqui5');
        initializePopup('mudaqui6');
        initializePopup('mudaqui7');
        initializePopup('mudaqui8');
        initializePopup('mudaqui9');
        initializePopup('mudaqui10');
        initializePopup('mudaqui11');
        initializePopup('mudaqui12');

    });
</script>