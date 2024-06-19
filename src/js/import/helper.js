export default {
  textSlice (text, length){
    const number = Number(length)
    const txt = text.trim()
    if (typeof number !== 'number' || typeof txt !== 'string' || txt.length <= length) return text
    return txt.slice(0, number) + '...';
  },
  elementTextSlice(selector, length) {
    const textNodes = typeof selector === 'string' ? document.querySelectorAll(selector) : selector
    textNodes.length ? textNodes.forEach(i => {
      i.innerHTML = this.textSlice(i.textContent, length)
    }) : null;
  }
}