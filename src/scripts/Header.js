class Header {
  selectors = {
    root: '[data-js-header]',
    title: '[data-js-header-title]',
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]',
    menuLink: '[data-js-header-menu-link]',
    theme: '[data-js-header-theme]'
  }

  stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
    darkTheme: 'dark-theme'
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.titleElement = this.rootElement.querySelector(this.selectors.title)
    this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
    this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)
    this.menuLinkElements = this.rootElement.querySelectorAll(this.selectors.menuLink)
    this.themeElement = this.rootElement.querySelector(this.selectors.theme)
    this.bindEvents()
    this.initTheme()
  }

  initTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      this.onThemeToggle()
    }
  }

  onThemeToggle = () => {
    document.body.classList.toggle(this.stateClasses.darkTheme)

    if (document.body.classList.contains(this.stateClasses.darkTheme)) {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.setItem('theme', 'light')
    }
  }

  onburgerButtontoggle = () => {
    this.titleElement.classList.toggle(this.stateClasses.isActive)
    this.overlayElement.classList.toggle(this.stateClasses.isActive)
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)
    document.documentElement.classList.toggle(this.stateClasses.isLock)
  }

  closeMenu = () => {
    if (this.burgerButtonElement.classList.contains(this.stateClasses.isActive)) {
      this.onburgerButtontoggle()
    }
  }

  onMenuLinkClick = (event) => {
    this.menuLinkElements.forEach((el) => {
      el.classList.remove(this.stateClasses.isActive)
    })

    event.currentTarget.classList.add(this.stateClasses.isActive)

    this.closeMenu()
  }

  bindEvents() {
    this.burgerButtonElement.addEventListener('click', this.onburgerButtontoggle)
    this.menuLinkElements.forEach((link) => {
      link.addEventListener('click', this.onMenuLinkClick)
    })
    this.themeElement.addEventListener('click', this.onThemeToggle)
  }
}

export default Header
