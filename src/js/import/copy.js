export default class Copy {
  constructor() {
    this.nodes = document.querySelectorAll('[data-copy-trigger]')
    this.textarea = document.querySelector('#urlCopy')
    this.init()
  }
  init() {
    if (!this.textarea) return
    this.copyHandler()
  }
  copy(id) {
    
    if (id) {
      const text = document.querySelector(`[data-copy-text=${id}]`)
      
      this.textarea.innerHTML = text.textContent
    } else {
      this.textarea.innerHTML = window.location.href;
    }
    this.textarea.select();
    document.execCommand("copy");
  }
  copyHandler() {
    this.nodes.forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-copy-trigger')
        this.copy(id)
        this.alert()
      })
    })
  }
  alert() {
    alert('Скопировано!')
  }
}