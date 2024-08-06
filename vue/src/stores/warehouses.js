import { defineStore } from 'pinia'

export const useWarehousesStore = defineStore('warehouses', {
  state: () => {
    return { 
      listWarehouses: [
        { name: 'Склад 1', coordinates: [55.76, 37.64], type: 'Тип склада A', price: '12 000 ₽/тн', tags: ['Объем продажи: до 100 т']  },
        { name: 'Склад 2', coordinates: [55.75, 37.65], type: 'Тип склада B', price: '12 000 ₽/тн', tags: ['Объем продажи: до 100 т'] },
      ]
    }
  },
  actions: {
    addWarehouses() {
      this.listWarehouses.push(
        { name: 'Склад 3', coordinates: [55.75, 37.65], type: 'Тип склада B', price: '12 000 ₽/тн', tags: ['Объем продажи: до 100 т'] },)
    },
  },
})