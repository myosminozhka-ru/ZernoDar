import $ from "jquery";

export default class Modal {
  constructor(name, scrollLock = true) {
      this.name = name;
      this.scrollLock = scrollLock;
      this.modal = document.querySelector(`[data-modal="${name}"]`);
      this.callbackClose = null;
      this.init();
  }
  init() {
    if (this.modal) {
      this.content = this.modal.querySelector(`.modal__content`);
      this.openHendler();
      this.closeHendler();
    }
  }
  open() {
    window.lastZIndexModal = window.lastZIndexModal ? window.lastZIndexModal + 1 : 150;
    this.modal ? this.modal.style['z-index'] = window.lastZIndexModal : null;
    this.modal ? this.modal.classList.remove('hide') : null;
    this.modal ? this.modal.classList.add('active') : null;
    this.scrollLock ? document.body.classList.add('lock') : null;
  }
  close() {
    // this.modal ? this.modal.style['z-index'] = -150 : null;
    this.modal ? this.modal.classList.remove('active') : null;
    this.modal ? this.modal.classList.add('hide') : null;
    this.scrollLock ? document.body.classList.remove('lock') : null;
    this.onCloseAction()
  }
  openHendler() {
      const name = this.name
      $(document).on('click', `[data-class="${name}"]`, (e) => {
        this.open();
        const carElementId = this.modal.querySelector('[name="ELEMENT_ID"]');
        if(carElementId){
            carElementId.value = e.target.dataset.elementId || '';
        }
      });
  }
  closeHendler() {
      this.modal ? this.modal.addEventListener('click', (e) => {
          if (e.target.classList.contains('close-x')) {
              this.close()
          }
      }) : null;
      this.modal ? this.modal.querySelector('button.close-x').addEventListener('click', (e) => {
        this.close()
      }) : null;
  }
  onClose(callback) {
    this.callbackClose = callback
  }
  onCloseAction() {
    this.callbackClose ? this.callbackClose() : null
  }
}
