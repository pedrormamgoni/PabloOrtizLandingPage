// Script principal para DinaBox
document.addEventListener("DOMContentLoaded", () => {
  // Importar Lucide
  const lucide = window.lucide
  if (!lucide) {
    console.error("Lucide não foi importado corretamente.")
    return
  }

  // Inicializar ícones Lucide
  lucide.createIcons()

  // Configurações
  const CONFIG = {
    whatsappNumber: "5511999999999",
    email: "pablo@dinabox.net",
    animationDelay: 100,
  }

  // Elementos do DOM
  const elements = {
    // Botões principais
    btnFalarPablo: document.getElementById("btn-falar-pablo"),
    btnFalarPabloFinal: document.getElementById("btn-falar-pablo-final"),
    btnWhatsAppDireto: document.getElementById("btn-whatsapp-direto"),
    btnEmailDireto: document.getElementById("btn-email-direto"),
    btnSolicitarDemo: document.getElementById("btn-solicitar-demo"),

    // Formulário
    formDemonstracao: document.getElementById("form-demonstracao"),
    inputNome: document.getElementById("input-nome"),
    inputWhatsApp: document.getElementById("input-whatsapp"),
    inputEmail: document.getElementById("input-email"),
    inputMarcenaria: document.getElementById("input-marcenaria"),
    inputMensagem: document.getElementById("input-mensagem"),

    // Cards animados
    cardsHover: document.querySelectorAll(".card-hover"),

    // Links de navegação
    linksNavegacao: document.querySelectorAll('a[href^="#"]'),
  }

  // Função para abrir WhatsApp
  function abrirWhatsApp(mensagemPersonalizada = "") {
    const mensagemPadrao =
      "Olá Pablo! Tenho uma empresa e gostaria de conhecer o DinaBox para transformar meu negócio. Pode me ajudar?"
    const mensagem = mensagemPersonalizada || mensagemPadrao
    const mensagemCodificada = encodeURIComponent(mensagem)
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${mensagemCodificada}`

    // Analytics (se necessário)
    const gtag = window.gtag
    if (typeof gtag !== "undefined") {
      gtag("event", "click", {
        event_category: "WhatsApp",
        event_label: "Contato Pablo",
      })
    }

    window.open(url, "_blank")
  }

  // Função para abrir email
  function abrirEmail() {
    const assunto = encodeURIComponent("Interesse no DinaBox")
    const corpo = encodeURIComponent(`Olá Pablo,

Tenho uma empresa e gostaria de conhecer mais sobre o DinaBox e como ele pode transformar meu negócio.

Principais desafios da minha empresa:
- Controle de processos
- Gestão de dados
- Organização financeira
- Relacionamento com clientes

Aguardo seu contato para uma demonstração.

Obrigado!`)

    const url = `mailto:${CONFIG.email}?subject=${assunto}&body=${corpo}`

    // Analytics
    const gtag = window.gtag
    if (typeof gtag !== "undefined") {
      gtag("event", "click", {
        event_category: "Email",
        event_label: "Contato Pablo",
      })
    }

    window.open(url, "_blank")
  }

  // Função para smooth scroll
  function smoothScroll(target) {
    const elemento = document.querySelector(target)
    if (elemento) {
      elemento.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Função para animação de entrada dos cards
  function animarCards() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            entry.target.classList.add("animate-fade-in-up")
          }, index * CONFIG.animationDelay)
        }
      })
    }, observerOptions)

    // Aplicar animação aos cards
    elements.cardsHover.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(card)
    })
  }

  // Navegação suave
  elements.linksNavegacao.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = this.getAttribute("href")
      smoothScroll(target)
    })
  })

  // Inicializar funções
  animarCards()

  // Adicionar efeitos de hover nos botões
  document.querySelectorAll("button").forEach((botao) => {
    botao.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-1px)"
    })

    botao.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Lazy loading para imagens
  const imagens = document.querySelectorAll("img")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.classList.add("animate-fade-in-up")
        imageObserver.unobserve(img)
      }
    })
  })

  imagens.forEach((img) => imageObserver.observe(img))

  // Adicionar classe de carregamento completo
  document.body.classList.add("loaded")

  // Console log para debug
  console.log("DinaBox - Script carregado com sucesso!")
  console.log("Elementos encontrados:", Object.keys(elements).length)
})

// Funções globais (acessíveis via HTML onclick)
window.openWhatsApp = (mensagem = "") => {
  const mensagemPadrao = "Olá Pablo! Tenho uma empresa e gostaria de conhecer o DinaBox. Pode me ajudar?"
  const mensagemFinal = mensagem || mensagemPadrao
  const mensagemCodificada = encodeURIComponent(mensagemFinal)
  window.open(`https://wa.me/55546000209?text=${mensagemCodificada}`, "_blank")
}

window.openEmail = () => {
  const assunto = encodeURIComponent("Interesse no DinaBox")
  const corpo = encodeURIComponent(
    "Olá Pablo,\n\nTenho uma empresa e gostaria de conhecer mais sobre o DinaBox.\n\nAguardo seu contato.\n\nObrigado!",
  )
  window.open(`mailto:pablo@dinabox.net?subject=${assunto}&body=${corpo}`, "_blank")
}

window.submitForm = (event) => {
  event.preventDefault()

  // Aqui você pode adicionar a lógica para enviar o formulário
  // Por exemplo, enviar para um serviço de email ou API

  alert("Formulário enviado com sucesso! Pablo entrará em contato em até 30 minutos.")

  // Opcional: redirecionar para WhatsApp após envio
  setTimeout(() => {
    window.openWhatsApp()
  }, 1000)
}

// Service Worker para cache (opcional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registrado com sucesso:", registration.scope)
      })
      .catch((error) => {
        console.log("Falha ao registrar ServiceWorker:", error)
      })
  })
}
