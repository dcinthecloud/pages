const root = document.documentElement
const navToggle = document.getElementById('navToggle')
const navMenu = document.getElementById('siteNavMenu')
const themeToggle = document.getElementById('themeToggle')
const yearEl = document.getElementById('year')

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

const applyTheme = theme => {
  root.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
  themeToggle?.setAttribute('aria-pressed', String(theme === 'dark'))
}

const storedTheme = localStorage.getItem('theme')
if (storedTheme) {
  applyTheme(storedTheme)
} else if (prefersDark.matches) {
  applyTheme('dark')
}

prefersDark.addEventListener('change', event => {
  if (!localStorage.getItem('theme')) {
    applyTheme(event.matches ? 'dark' : 'light')
  }
})

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu?.getAttribute('data-open') === 'true'
  const next = String(!isOpen)
  navMenu?.setAttribute('data-open', next)
  navToggle.setAttribute('aria-expanded', next)
})

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  applyTheme(current === 'dark' ? 'light' : 'dark')
})

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear())
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const target = document.querySelector(anchor.getAttribute('href') ?? '')
    if (target) {
      event.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
      navMenu?.setAttribute('data-open', 'false')
      navToggle?.setAttribute('aria-expanded', 'false')
    }
  })
})
