/**
 * DINABOX - SCRIPT PRINCIPAL
 * Funcionalidades JavaScript para a landing page
 */

// ===================================
// CONFIGURAÇÕES GLOBAIS
// ===================================
const CONFIG = {
  whatsappNumber: "54996000209",
  email: "contato@dinabox.com.br",
  animationDelay: 100,
  scrollOffset: 80,
}

// ===================================
// INICIALIZAÇÃO
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DinaBox - Inicializando aplicação...")

  // Inicializar ícones Lucide
  initializeLucideIcons()

  // Configurar navegação suave
  setupSmoothScrolling()

  // Configurar animações de scroll
  setupScrollAnimations()

  // Configurar efeitos de hover
  setupHoverEffects()

  // Configurar lazy loading de imagens
  setupLazyLoading()

  // Marcar como carregado
  document.body.classList.add("loaded")

  console.log("✅ DinaBox - Aplicação carregada com sucesso!")
})

// ===================================
// INICIALIZAÇÃO DE ÍCONES
// ===================================
function initializeLucideIcons() {
  const lucide = window.lucide // Declare the variable before using it
  if (lucide) {
    lucide.createIcons()
    console.log("✅ Ícones Lucide inicializados")
  } else {
    console.error("❌ Lucide não foi carregado corretamente")
  }
}

// ===================================
// NAVEGAÇÃO SUAVE
// ===================================
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - CONFIG.scrollOffset

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Fechar menu mobile se estiver aberto
        const mobileMenu = document.getElementById("mobile-menu")
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden")
        }
      }
    })
  })

  console.log("✅ Navegação suave configurada")
}

// ===================================
// ANIMAÇÕES DE SCROLL
// ===================================
function setupScrollAnimations() {
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

        // Parar de observar após animar
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Aplicar animação aos cards
  const animatedElements = document.querySelectorAll(".card-hover, .feature-card")
  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })

  console.log(`✅ Animações configuradas para ${animatedElements.length} elementos`)
}

// ===================================
// EFEITOS DE HOVER
// ===================================
function setupHoverEffects() {
  const buttons = document.querySelectorAll("button")

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      if (!this.disabled) {
        this.style.transform = "translateY(-1px)"
      }
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  console.log(`✅ Efeitos de hover configurados para ${buttons.length} botões`)
}

// ===================================
// LAZY LOADING DE IMAGENS
// ===================================
function setupLazyLoading() {
  const images = document.querySelectorAll("img")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.classList.add("animate-fade-in-up")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  console.log(`✅ Lazy loading configurado para ${images.length} imagens`)
}

// ===================================
// FUNÇÕES DE CONTATO
// ===================================
function openWhatsApp(customMessage = "") {
  const defaultMessage = "Olá Pablo! Tenho uma empresa e gostaria de conhecer o DinaBox. Pode me ajudar?"
  const message = customMessage || defaultMessage
  const encodedMessage = encodeURIComponent(message)
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`

  // Analytics (se disponível)
  const gtag = window.gtag // Declare the variable before using it
  if (typeof gtag !== "undefined") {
    gtag("event", "click", {
      event_category: "WhatsApp",
      event_label: "Contato Pablo",
    })
  }

  window.open(url, "_blank")
  console.log("📱 WhatsApp aberto:", message.substring(0, 50) + "...")
}

function openEmail() {
  const subject = encodeURIComponent("Interesse no DinaBox")
  const body = encodeURIComponent(`Olá Pablo,

Tenho uma empresa e gostaria de conhecer mais sobre o DinaBox e como ele pode transformar meu negócio.

Principais desafios da minha empresa:
- Controle de processos
- Gestão de dados
- Organização financeira
- Relacionamento com clientes

Aguardo seu contato para uma demonstração.

Obrigado!`)

  const url = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`

  // Analytics (se disponível)
  const gtag = window.gtag // Declare the variable before using it
  if (typeof gtag !== "undefined") {
    gtag("event", "click", {
      event_category: "Email",
      event_label: "Contato Pablo",
    })
  }

  window.open(url, "_blank")
  console.log("📧 Email aberto")
}

// ===================================
// FORMULÁRIO DE CONTATO
// ===================================
function submitForm(event) {
  event.preventDefault()

  const form = event.target
  const button = form.querySelector('button[type="submit"]')
  const originalText = button.innerHTML

  // Estado de loading
  button.innerHTML = '<i data-lucide="loader-2" class="mr-2 h-5 w-5 animate-spin"></i>Enviando...'
  button.disabled = true
  button.classList.add("loading")

  // Coletar dados do formulário
  const formData = new FormData(form)
  const data = {
    nome: form.querySelector('input[type="text"]').value,
    whatsapp: form.querySelector('input[type="tel"]').value,
    email: form.querySelector('input[type="email"]').value,
    empresa: form.querySelectorAll('input[type="text"]')[1].value,
    mensagem: form.querySelector("textarea").value,
  }

  console.log("📝 Dados do formulário:", data)

  // Simular envio (substituir por integração real)
  setTimeout(() => {
    // Restaurar botão
    button.innerHTML = originalText
    button.disabled = false
    button.classList.remove("loading")

    // Mostrar sucesso
    showNotification("Formulário enviado com sucesso! Pablo entrará em contato em breve.", "success")

    // Limpar formulário
    form.reset()

    // Redirecionar para WhatsApp após delay
    setTimeout(() => {
      const message = `Olá Pablo! Acabei de preencher o formulário no site. 

Meus dados:
- Nome: ${data.nome}
- Empresa: ${data.empresa}
- WhatsApp: ${data.whatsapp}

Gostaria de saber mais sobre o DinaBox.`

      openWhatsApp(message)
    }, 1500)
  }, 2000)
}

// ===================================
// MENU MOBILE
// ===================================
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu")
  const menuIcon = document.querySelector('[data-lucide="menu"]')

  if (menu) {
    menu.classList.toggle("hidden")

    // Alterar ícone
    if (menu.classList.contains("hidden")) {
      menuIcon.setAttribute("data-lucide", "menu")
    } else {
      menuIcon.setAttribute("data-lucide", "x")
    }

    // Reinicializar ícones
    const lucide = window.lucide // Declare the variable before using it
    if (lucide) {
      lucide.createIcons()
    }
  }
}

// ===================================
// NOTIFICAÇÕES
// ===================================
function showNotification(message, type = "info") {
  // Criar elemento de notificação
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`

  // Definir cores baseadas no tipo
  const colors = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  }

  notification.className += ` ${colors[type] || colors.info}`
  notification.textContent = message

  // Adicionar ao DOM
  document.body.appendChild(notification)

  // Animar entrada
  setTimeout(() => {
    notification.classList.remove("translate-x-full")
  }, 100)

  // Remover após 5 segundos
  setTimeout(() => {
    notification.classList.add("translate-x-full")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)

  console.log(`🔔 Notificação (${type}):`, message)
}

// ===================================
// UTILITÁRIOS
// ===================================
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// ===================================
// SERVICE WORKER (OPCIONAL)
// ===================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("✅ ServiceWorker registrado:", registration.scope)
      })
      .catch((error) => {
        console.log("❌ Falha ao registrar ServiceWorker:", error)
      })
  })
}

// ===================================
// SCROLL HEADER EFFECT
// ===================================
window.addEventListener(
  "scroll",
  debounce(() => {
    const header = document.querySelector("header")
    if (window.scrollY > 100) {
      header.classList.add("shadow-lg")
    } else {
      header.classList.remove("shadow-lg")
    }
  }, 10),
)

// ===================================
// EXPOSIÇÃO DE FUNÇÕES GLOBAIS
// ===================================
window.openWhatsApp = openWhatsApp
window.openEmail = openEmail
window.submitForm = submitForm
window.toggleMobileMenu = toggleMobileMenu

// ===================================
// DEBUG (APENAS EM DESENVOLVIMENTO)
// ===================================
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  window.DinaBoxDebug = {
    CONFIG,
    showNotification,
    debounce,
  }
  console.log("🔧 Modo debug ativado. Use window.DinaBoxDebug para acessar utilitários.")
}
