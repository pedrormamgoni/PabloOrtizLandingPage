// Script principal para DinaBox Marcenarias
document.addEventListener('DOMContentLoaded', function() {
    // Importar Lucide
    const lucide = window.lucide;
    if (!lucide) {
        console.error('Lucide não foi importado corretamente.');
        return;
    }
    
    // Inicializar ícones Lucide
    lucide.createIcons();
    
    // Configurações
    const CONFIG = {
        whatsappNumber: '5511999999999',
        email: 'pablo@dinabox.net',
        animationDelay: 100
    };
    
    // Elementos do DOM
    const elements = {
        // Botões principais
        btnFalarPablo: document.getElementById('btn-falar-pablo'),
        btnFalarPabloFinal: document.getElementById('btn-falar-pablo-final'),
        btnWhatsAppDireto: document.getElementById('btn-whatsapp-direto'),
        btnEmailDireto: document.getElementById('btn-email-direto'),
        btnSolicitarDemo: document.getElementById('btn-solicitar-demo'),
        
        // Formulário
        formDemonstracao: document.getElementById('form-demonstracao'),
        inputNome: document.getElementById('input-nome'),
        inputWhatsApp: document.getElementById('input-whatsapp'),
        inputEmail: document.getElementById('input-email'),
        inputMarcenaria: document.getElementById('input-marcenaria'),
        inputMensagem: document.getElementById('input-mensagem'),
        
        // Cards animados
        cardsHover: document.querySelectorAll('.card-hover'),
        
        // Links de navegação
        linksNavegacao: document.querySelectorAll('a[href^="#"]')
    };
    
    // Função para abrir WhatsApp
    function abrirWhatsApp(mensagemPersonalizada = '') {
        const mensagemPadrao = "Olá Pablo! Tenho uma marcenaria e gostaria de conhecer o DinaBox para transformar meu negócio. Pode me ajudar?";
        const mensagem = mensagemPersonalizada || mensagemPadrao;
        const mensagemCodificada = encodeURIComponent(mensagem);
        const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${mensagemCodificada}`;
        
        // Analytics (se necessário)
        const gtag = window.gtag;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'WhatsApp',
                event_label: 'Contato Pablo'
            });
        }
        
        window.open(url, '_blank');
    }
    
    // Função para abrir email
    function abrirEmail() {
        const assunto = encodeURIComponent("Interesse no DinaBox para Marcenarias");
        const corpo = encodeURIComponent(`Olá Pablo,

Tenho uma marcenaria e gostaria de conhecer mais sobre o DinaBox e como ele pode transformar meu negócio.

Principais desafios da minha marcenaria:
- Controle de projetos
- Gestão de estoque de madeira
- Organização financeira
- Relacionamento com clientes

Aguardo seu contato para uma demonstração.

Obrigado!`);
        
        const url = `mailto:${CONFIG.email}?subject=${assunto}&body=${corpo}`;
        
        // Analytics
        const gtag = window.gtag;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Email',
                event_label: 'Contato Pablo'
            });
        }
        
        window.open(url, '_blank');
    }
    
    // Função para enviar formulário
    function enviarFormulario(event) {
        event.preventDefault();
        
        // Validar campos
        const nome = elements.inputNome.value.trim();
        const whatsapp = elements.inputWhatsApp.value.trim();
        const email = elements.inputEmail.value.trim();
        const marcenaria = elements.inputMarcenaria.value.trim();
        const mensagem = elements.inputMensagem.value.trim();
        
        if (!nome || !whatsapp || !email || !marcenaria) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        // Mostrar loading
        elements.btnSolicitarDemo.classList.add('loading');
        elements.btnSolicitarDemo.textContent = 'Enviando...';
        
        // Simular envio (aqui você integraria com seu backend)
        setTimeout(() => {
            // Remover loading
            elements.btnSolicitarDemo.classList.remove('loading');
            elements.btnSolicitarDemo.innerHTML = `
                <i data-lucide="message-circle" class="mr-2 h-5 w-5"></i>
                Solicitar Demonstração Gratuita
            `;
            lucide.createIcons();
            
            // Mostrar sucesso
            alert('Formulário enviado com sucesso! Pablo entrará em contato em até 30 minutos.');
            
            // Criar mensagem personalizada para WhatsApp
            const mensagemWhatsApp = `Olá Pablo! Acabei de preencher o formulário no site.

Meus dados:
Nome: ${nome}
Marcenaria: ${marcenaria}
Email: ${email}
WhatsApp: ${whatsapp}

${mensagem ? `Mensagem: ${mensagem}` : ''}

Gostaria de agendar uma demonstração do DinaBox.`;
            
            // Redirecionar para WhatsApp após 1 segundo
            setTimeout(() => {
                abrirWhatsApp(mensagemWhatsApp);
            }, 1000);
            
            // Limpar formulário
            elements.formDemonstracao.reset();
            
        }, 2000);
    }
    
    // Função para smooth scroll
    function smoothScroll(target) {
        const elemento = document.querySelector(target);
        if (elemento) {
            elemento.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Função para animação de entrada dos cards
    function animarCards() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animate-fade-in-up');
                    }, index * CONFIG.animationDelay);
                }
            });
        }, observerOptions);

        // Aplicar animação aos cards
        elements.cardsHover.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Função para formatar número de telefone
    function formatarTelefone(input) {
        let valor = input.value.replace(/\D/g, '');
        
        if (valor.length <= 11) {
            valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            if (valor.length < 14) {
                valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
        }
        
        input.value = valor;
    }
    
    // Função para destacar seção ativa na navegação
    function destacarSecaoAtiva() {
        const secoes = document.querySelectorAll('section[id]');
        const linksNav = document.querySelectorAll('#navegacao-principal a');
        
        window.addEventListener('scroll', () => {
            let secaoAtual = '';
            
            secoes.forEach(secao => {
                const rect = secao.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    secaoAtual = secao.getAttribute('id');
                }
            });
            
            linksNav.forEach(link => {
                link.classList.remove('text-amber-600', 'font-semibold');
                if (link.getAttribute('href') === `#${secaoAtual}`) {
                    link.classList.add('text-amber-600', 'font-semibold');
                }
            });
        });
    }
    
    // Função para contador animado nas estatísticas
    function animarContadores() {
        const contadores = document.querySelectorAll('#estatisticas-hero .text-3xl');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elemento = entry.target;
                    const valorFinal = elemento.textContent.replace(/\D/g, '');
                    const sufixo = elemento.textContent.replace(/\d/g, '');
                    
                    let valorAtual = 0;
                    const incremento = Math.ceil(valorFinal / 50);
                    
                    const timer = setInterval(() => {
                        valorAtual += incremento;
                        if (valorAtual >= valorFinal) {
                            valorAtual = valorFinal;
                            clearInterval(timer);
                        }
                        elemento.textContent = valorAtual + sufixo;
                    }, 30);
                    
                    observer.unobserve(elemento);
                }
            });
        });
        
        contadores.forEach(contador => observer.observe(contador));
    }
    
    // Event Listeners
    
    // Botões WhatsApp
    if (elements.btnFalarPablo) {
        elements.btnFalarPablo.addEventListener('click', () => abrirWhatsApp());
    }
    
    if (elements.btnFalarPabloFinal) {
        elements.btnFalarPabloFinal.addEventListener('click', () => abrirWhatsApp());
    }
    
    if (elements.btnWhatsAppDireto) {
        elements.btnWhatsAppDireto.addEventListener('click', () => abrirWhatsApp());
    }
    
    // Botão Email
    if (elements.btnEmailDireto) {
        elements.btnEmailDireto.addEventListener('click', abrirEmail);
    }
    
    // Formulário
    if (elements.formDemonstracao) {
        elements.formDemonstracao.addEventListener('submit', enviarFormulario);
    }
    
    // Formatação do telefone
    if (elements.inputWhatsApp) {
        elements.inputWhatsApp.addEventListener('input', (e) => formatarTelefone(e.target));
    }
    
    // Navegação suave
    elements.linksNavegacao.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Menu mobile (se implementado)
    const menuMobile = document.getElementById('menu-mobile');
    if (menuMobile) {
        menuMobile.addEventListener('click', function() {
            // Implementar lógica do menu mobile aqui
            console.log('Menu mobile clicado');
        });
    }
    
    // Inicializar funções
    animarCards();
    destacarSecaoAtiva();
    animarContadores();
    
    // Adicionar efeitos de hover nos botões
    document.querySelectorAll('button').forEach(botao => {
        botao.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        botao.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Lazy loading para imagens
    const imagens = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('animate-fade-in-up');
                imageObserver.unobserve(img);
            }
        });
    });
    
    imagens.forEach(img => imageObserver.observe(img));
    
    // Adicionar classe de carregamento completo
    document.body.classList.add('loaded');
    
    // Console log para debug
    console.log('DinaBox Marcenarias - Script carregado com sucesso!');
    console.log('Elementos encontrados:', Object.keys(elements).length);
});

// Funções globais (acessíveis via HTML onclick)
window.abrirWhatsApp = function(mensagem = '') {
    const mensagemPadrao = "Olá Pablo! Tenho uma marcenaria e gostaria de conhecer o DinaBox. Pode me ajudar?";
    const mensagemFinal = mensagem || mensagemPadrao;
    const mensagemCodificada = encodeURIComponent(mensagemFinal);
    window.open(`https://wa.me/5511999999999?text=${mensagemCodificada}`, '_blank');
};

window.abrirEmail = function() {
    const assunto = encodeURIComponent("Interesse no DinaBox para Marcenarias");
    const corpo = encodeURIComponent("Olá Pablo,\n\nTenho uma marcenaria e gostaria de conhecer mais sobre o DinaBox.\n\nAguardo seu contato.\n\nObrigado!");
    window.open(`mailto:pablo@dinabox.net?subject=${assunto}&body=${corpo}`, '_blank');
};

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registrado com sucesso:', registration.scope);
            })
            .catch(function(error) {
                console.log('Falha ao registrar ServiceWorker:', error);
            });
    });
}
