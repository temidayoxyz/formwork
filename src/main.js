import './style.css'

const GH_ICON = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`

export function renderHeader(activePage) {
  const links = [
    { href: './index.html', label: 'Home', key: 'home' },
    { href: './work.html', label: 'Work', key: 'work' },
    { href: './studio.html', label: 'Studio', key: 'studio' },
    { href: './contact.html', label: 'Contact', key: 'contact' }
  ]

  const nav = document.getElementById('siteHeader')
  if (!nav) return

  nav.innerHTML = `
    <div class="shell header-inner">
      <a class="brand" href="./index.html" aria-label="Formwork home">
        <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
        FORMWORK
      </a>
      <nav class="primary-nav" id="primaryNav" aria-label="Primary">
        ${links.map(l => `<a href="${l.href}" ${l.key === activePage ? 'class="active" aria-current="page"' : ''}>${l.label}</a>`).join('')}
      </nav>
      <button class="menu-btn" id="menuBtn" aria-label="Toggle menu" aria-expanded="false" aria-controls="primaryNav">
        <span></span><span></span><span></span>
      </button>
    </div>
  `

  const btn = document.getElementById('menuBtn')
  const menu = document.getElementById('primaryNav')

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open')
    btn.setAttribute('aria-expanded', open)
    document.body.style.overflow = open ? 'hidden' : ''
  })

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open')
    btn.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
  }))

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open')
      btn.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
      btn.focus()
    }
  })
}

export function renderFooter() {
  const el = document.getElementById('siteFooter')
  if (!el) return

  el.innerHTML = `
    <div class="shell">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="./index.html">
            <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
            FORMWORK
          </a>
          <p>Architecture and urban design for civic and cultural buildings. Copenhagen, Denmark.</p>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li><a href="./work.html">Selected work</a></li>
            <li><a href="./studio.html">About the studio</a></li>
            <li><a href="./studio.html#people">People</a></li>
            <li><a href="./contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Address</h4>
          <ul>
            <li>Refshalevej 167A</li>
            <li>1432 Copenhagen K</li>
            <li>Denmark</li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:mail@formwork.studio">mail@formwork.studio</a></li>
            <li><a href="tel:+4535123400">+45 35 12 34 00</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="mono">© 2026 Formwork ApS — CVR 41 88 23 06</span>
        <a class="gh-link" href="https://github.com/temidayoxyz/formwork" target="_blank" rel="noopener noreferrer" aria-label="Formwork repository on GitHub">
          ${GH_ICON} temidayoxyz/formwork
        </a>
      </div>
    </div>
  `
}

export function initReveal() {
  const els = document.querySelectorAll('.rv')
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'))
    return
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in')
        obs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' })
  els.forEach(el => obs.observe(el))
}

export function initForm() {
  const form = document.getElementById('contactForm')
  if (!form) return

  form.addEventListener('submit', e => {
    e.preventDefault()
    const btn = form.querySelector('.btn-submit')
    const note = form.querySelector('.form-note')
    btn.textContent = 'Message sent'
    btn.disabled = true
    note.textContent = 'Thank you. We reply to new inquiries within three working days.'
    form.reset()
  })
}
