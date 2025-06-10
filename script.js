document.addEventListener("DOMContentLoaded", () => {
    const chatbotHTML = `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

    body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
    }
    
    #chatbot {
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 350px;
        max-height: 500px;
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 15px;
        display: none;
        flex-direction: column;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        z-index: 1000;
    }
    
    #chatbot.visible {
        display: flex;
        animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    #chat-header {
        background: linear-gradient(135deg, #129600, #0d7400);
        color: white;
        padding: 15px;
        text-align: center;
        font-weight: 600;
        border-radius: 15px 15px 0 0;
        font-size: 16px;
        position: relative;
    }

    #close-btn {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    #chat-window {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        font-size: 14px;
        color: #333;
        max-height: 350px;
    }
    
    #messages .message {
        margin: 8px 0;
        padding: 12px 15px;
        border-radius: 18px;
        max-width: 85%;
        word-wrap: break-word;
        line-height: 1.4;
    }
    
    #messages .user {
        align-self: flex-end;
        background: #129600;
        color: white;
        border-radius: 18px 18px 4px 18px;
        margin-left: auto;
        margin-right: 0;
    }
    
    #messages .bot {
        align-self: flex-start;
        background: #f5f5f5;
        color: #333;
        border-radius: 18px 18px 18px 4px;
        margin-left: 0;
        margin-right: auto;
    }

    /* Estilos para carrusel */
    .carousel-container {
        margin: 10px 0;
        overflow-x: auto;
        padding: 5px 0;
    }

    .carousel {
        display: flex;
        gap: 10px;
        padding: 5px;
        min-width: max-content;
    }

    .carousel-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 15px;
        min-width: 200px;
        max-width: 200px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .carousel-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .carousel-card img {
        width: 100%;
        height: 100px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 10px;
    }

    .carousel-card h4 {
        margin: 0 0 8px 0;
        font-size: 14px;
        font-weight: 600;
        color: #333;
    }

    .carousel-card p {
        margin: 0 0 10px 0;
        font-size: 12px;
        color: #666;
        line-height: 1.3;
    }

    .carousel-card .price {
        font-weight: 600;
        color: #129600;
        font-size: 14px;
    }

    /* Estilos para imágenes en mensajes */
    .message-image {
        max-width: 100%;
        border-radius: 12px;
        margin: 8px 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    /* Quick replies mejoradas */
    .quick-replies {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
    }

    .quick-reply-btn {
        background: #129600;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s;
        font-family: 'Poppins', sans-serif;
    }

    .quick-reply-btn:hover {
        background: #0d7400;
        transform: scale(1.05);
    }

    /* Typing indicator */
    .typing-indicator {
        display: flex;
        align-items: center;
        padding: 12px 15px;
        margin: 8px 0;
        background: #f5f5f5;
        border-radius: 18px 18px 18px 4px;
        max-width: 85%;
    }

    .typing-dots {
        display: flex;
        gap: 4px;
    }

    .typing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #999;
        animation: typing 1.4s infinite;
    }

    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-10px); }
    }
    
    #input-area {
        display: flex;
        padding: 15px;
        border-top: 1px solid #e0e0e0;
        background: #ffffff;
        border-radius: 0 0 15px 15px;
        gap: 10px;
    }
    
    #user-input {
        flex: 1;
        padding: 12px 15px;
        border: 1px solid #e0e0e0;
        border-radius: 25px;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        outline: none;
        transition: border-color 0.2s;
    }

    #user-input:focus {
        border-color: #129600;
    }
    
    #send-btn {
        background: #129600;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        transition: all 0.2s;
        min-width: 60px;
    }
    
    #send-btn:hover {
        background: #0d7400;
        transform: scale(1.05);
    }

    #send-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
        transform: none;
    }
    
    #bot-icon {
        position: fixed;
        bottom: 20px;
        right: 20px;
        cursor: pointer;
        transition: transform 0.2s;
        z-index: 1001;
    }

    #bot-icon:hover {
        transform: scale(1.1);
    }

    /* Responsive */
    @media (max-width: 480px) {
        #chatbot {
            width: calc(100vw - 40px);
            right: 20px;
            left: 20px;
            bottom: 80px;
        }
    }
    </style>
    
    <div id="chatbot">
        <div id="chat-header">
            🤖 Asistente Virtual
            <button id="close-btn">×</button>
        </div>
        <div id="chat-window">
            <div id="messages"></div>
        </div>
        <div id="input-area">
            <input type="text" id="user-input" placeholder="Escribe tu mensaje aquí..." />
            <button id="send-btn">Enviar</button>
        </div>
    </div>
    
    <div id="bot-icon">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="#129600"/>
            <path d="M20 25C20 23.8954 20.8954 23 22 23H38C39.1046 23 40 23.8954 40 25V35C40 36.1046 39.1046 37 38 37H22C20.8954 37 20 36.1046 20 35V25Z" fill="white"/>
            <circle cx="26" cy="29" r="2" fill="#129600"/>
            <circle cx="34" cy="29" r="2" fill="#129600"/>
            <path d="M26 33H34" stroke="#129600" stroke-width="2" stroke-linecap="round"/>
        </svg>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", chatbotHTML);

    const chatBot = document.getElementById("chatbot");
    const botIcon = document.getElementById("bot-icon");
    const closeBtn = document.getElementById("close-btn");
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const messages = document.getElementById("messages");

    // Base de conocimientos mejorada
    const knowledgeBase = {
        // Productos con carrusel
        productos: {
            type: 'carousel',
            items: [
                {
                    title: 'Pasteles de Cumpleaños',
                    description: '30 porciones, decoración personalizada',
                    price: '170 Bs',
                    image: 'https://via.placeholder.com/200x100/129600/ffffff?text=Pastel+Cumpleaños',
                    action: 'cumpleaños'
                },
                {
                    title: 'Pasteles de Boda',
                    description: 'Elegantes diseños para tu día especial',
                    price: 'Desde 300 Bs',
                    image: 'https://via.placeholder.com/200x100/129600/ffffff?text=Pastel+Boda',
                    action: 'boda'
                },
                {
                    title: 'Queques Caseros',
                    description: 'Perfectos para cualquier ocasión',
                    price: 'Desde 80 Bs',
                    image: 'https://via.placeholder.com/200x100/129600/ffffff?text=Queques',
                    action: 'queques'
                }
            ]
        },

        // Respuestas con quick replies
        servicios: {
            type: 'quick_replies',
            text: '¿Qué servicio te interesa más?',
            replies: ['Delivery', 'Pedidos Personalizados', 'Catering', 'Consultas']
        },

        // Respuesta con imagen
        ubicacion: {
            type: 'image',
            text: '📍 Nos encontramos en:',
            image: 'https://via.placeholder.com/300x200/129600/ffffff?text=Mapa+Ubicación',
            description: 'Calle 17 de Calacote, edificio Río Beni, No 560'
        }
    };

    // Reglas de conversación mejoradas
    const conversationRules = [
        // Saludos
        { 
            patterns: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'hi'],
            response: {
                type: 'text_with_quick_replies',
                text: '¡Hola! 👋 Bienvenido a nuestra pastelería. ¿En qué puedo ayudarte hoy?',
                quick_replies: ['Ver Productos', 'Hacer Pedido', 'Ubicación', 'Horarios']
            }
        },

        // Productos
        {
            patterns: ['producto', 'productos', 'pastel', 'pasteles', 'queque', 'queques', 'ver productos'],
            response: knowledgeBase.productos
        },

        // Servicios
        {
            patterns: ['servicio', 'servicios', 'que ofrecen'],
            response: knowledgeBase.servicios
        },

        // Ubicación
        {
            patterns: ['ubicación', 'dirección', 'donde están', 'ubicacion', 'direccion'],
            response: knowledgeBase.ubicacion
        },

        // Horarios
        {
            patterns: ['horario', 'horarios', 'cuando abren', 'hora'],
            response: {
                type: 'text',
                text: '🕐 Nuestros horarios de atención:\n\n📅 Lunes a Sábado: 07:30 - 21:00\n📅 Domingos: Cerrado\n\n¿Te gustaría hacer una reserva?',
                quick_replies: ['Hacer Reserva', 'Ver Productos', 'Contacto']
            }
        },

        // Promociones
        {
            patterns: ['promoción', 'promociones', 'descuento', 'oferta', 'ofertas'],
            response: {
                type: 'text',
                text: '🎉 ¡Promociones especiales de Navidad!\n\n✨ 20% de descuento en compras mayores a 100Bs\n🎂 2x1 en queques los miércoles\n🍰 Delivery gratis en pedidos +150Bs',
                quick_replies: ['Ver Productos', 'Hacer Pedido', 'Más Info']
            }
        },

        // Contacto humano
        {
            patterns: ['humano', 'persona', 'operador', 'ayuda personal'],
            response: {
                type: 'text',
                text: '👥 Nuestros operadores están ocupados en este momento.\n\n📲 Por favor déjanos tu número de contacto y te llamaremos pronto.\n\n¿O prefieres que te ayude con algo específico?',
                quick_replies: ['Dejar Número', 'Ver Productos', 'Hacer Pedido']
            }
        }
    ];

    // Funciones mejoradas
    const showTypingIndicator = () => {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messages.appendChild(typingDiv);
        scrollToBottom();
        return typingDiv;
    };

    const addMessage = (sender, content) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        if (typeof content === 'string') {
            messageDiv.textContent = content;
        } else {
            // Manejar diferentes tipos de contenido
            switch (content.type) {
                case 'carousel':
                    messageDiv.innerHTML = createCarousel(content.items);
                    break;
                case 'image':
                    messageDiv.innerHTML = `
                        <div>${content.text}</div>
                        <img src="${content.image}" alt="Imagen" class="message-image">
                        <div style="margin-top: 8px; font-size: 12px; color: #666;">${content.description}</div>
                    `;
                    break;
                case 'text_with_quick_replies':
                case 'quick_replies':
                    messageDiv.innerHTML = `
                        <div>${content.text}</div>
                        <div class="quick-replies">
                            ${content.quick_replies ? content.quick_replies.map(reply => 
                                `<button class="quick-reply-btn" onclick="handleQuickReply('${reply}')">${reply}</button>`
                            ).join('') : ''}
                        </div>
                    `;
                    break;
                default:
                    messageDiv.textContent = content.text || content;
            }
        }

        messages.appendChild(messageDiv);
        scrollToBottom();
    };

    const createCarousel = (items) => {
        return `
            <div class="carousel-container">
                <div class="carousel">
                    ${items.map(item => `
                        <div class="carousel-card" onclick="handleCarouselClick('${item.action}')">
                            <img src="${item.image}" alt="${item.title}">
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                            <div class="price">${item.price}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    const findResponse = (input) => {
        const normalizedInput = input.toLowerCase().trim();
        
        for (const rule of conversationRules) {
            if (rule.patterns.some(pattern => normalizedInput.includes(pattern))) {
                return rule.response;
            }
        }

        // Respuesta por defecto con sugerencias
        return {
            type: 'text_with_quick_replies',
            text: 'Lo siento, no entendí tu consulta. 🤔\n\n¿Podrías ser más específico o elegir una de estas opciones?',
            quick_replies: ['Ver Productos', 'Horarios', 'Ubicación', 'Hablar con Humano']
        };
    };

    const sendMessage = async () => {
        const input = userInput.value.trim();
        if (!input) return;

        // Deshabilitar input mientras se procesa
        sendBtn.disabled = true;
        userInput.disabled = true;

        // Agregar mensaje del usuario
        addMessage('user', input);
        userInput.value = '';

        // Mostrar indicador de escritura
        const typingIndicator = showTypingIndicator();

        // Simular delay de respuesta
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Remover indicador de escritura
        typingIndicator.remove();

        // Obtener y mostrar respuesta
        const response = findResponse(input);
        addMessage('bot', response);

        // Rehabilitar input
        sendBtn.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            const chatWindow = document.getElementById("chat-window");
            if (chatWindow) {
                chatWindow.scrollTo({
                    top: chatWindow.scrollHeight,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    // Funciones globales para manejar clicks
    window.handleQuickReply = (reply) => {
        addMessage('user', reply);
        setTimeout(() => {
            const response = findResponse(reply);
            addMessage('bot', response);
        }, 500);
    };

    window.handleCarouselClick = (action) => {
        const responses = {
            'cumpleaños': {
                type: 'text_with_quick_replies',
                text: '🎂 ¡Excelente elección!\n\nNuestros pasteles de cumpleaños incluyen:\n• 30 porciones generosas\n• Decoración personalizada\n• Sabores: chocolate, vainilla, red velvet\n• Precio: 170 Bs\n\n¿Te gustaría hacer un pedido?',
                quick_replies: ['Hacer Pedido', 'Ver Más Sabores', 'Personalizar Diseño']
            },
            'boda': {
                type: 'text_with_quick_replies',
                text: '💒 ¡Perfecto para tu día especial!\n\nPasteles de boda desde 300 Bs:\n• Diseños elegantes y únicos\n• Múltiples pisos disponibles\n• Decoración con flores naturales\n• Consulta gratuita de diseño\n\n¿Quieres agendar una cita?',
                quick_replies: ['Agendar Cita', 'Ver Diseños', 'Cotizar']
            },
            'queques': {
                type: 'text_with_quick_replies',
                text: '🧁 ¡Los favoritos de todos!\n\nQueques caseros desde 80 Bs:\n• Recetas tradicionales\n• Ingredientes frescos\n• Perfectos para el desayuno\n• Disponibles todos los días\n\n¿Cuántos necesitas?',
                quick_replies: ['1-5 Queques', '6-12 Queques', 'Pedido Grande']
            }
        };

        setTimeout(() => {
            addMessage('bot', responses[action] || {
                type: 'text',
                text: 'Gracias por tu interés. ¿En qué más puedo ayudarte?'
            });
        }, 500);
    };

    // Event listeners
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    botIcon.addEventListener("click", () => {
        chatBot.classList.add("visible");
        userInput.focus();
        
        // Mensaje de bienvenida si es la primera vez
        if (messages.children.length === 0) {
            setTimeout(() => {
                addMessage('bot', {
                    type: 'text_with_quick_replies',
                    text: '¡Hola! 👋 Soy tu asistente virtual.\n\n¿En qué puedo ayudarte hoy?',
                    quick_replies: ['Ver Productos', 'Horarios', 'Ubicación', 'Promociones']
                });
            }, 500);
        }
    });

    closeBtn.addEventListener("click", () => {
        chatBot.classList.remove("visible");
    });

    // Cerrar con Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && chatBot.classList.contains("visible")) {
            chatBot.classList.remove("visible");
        }
    });
});