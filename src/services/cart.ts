import { reactive } from 'vue'
import type { IProduct } from "@/interfaces/product";

const cart = reactive<{ items: IProduct[] }>({
  items: [],
})

export function addToCart(item: IProduct) {
  const existingItem = cart.items.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    // If the item exists, increment the quantity.
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // If the item does not exist, add it with an initial quantity of 1.
    cart.items.push({ ...item, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart.items));
}

export function removeFromCart(item: IProduct) {
  const index = cart.items.findIndex(cartItem => cartItem.id === item.id);
  cart.items.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cart.items))
}

export function emptyCart() {
  cart.items = [];
  localStorage.removeItem('cart')
}

export function updateCartItem(id: number, quantity: number) {
  const cartItem = cart.items.find(cartItem => cartItem.id === id);
  cartItem!.quantity = quantity;
  localStorage.setItem('cart', JSON.stringify(cart.items))
}

export function loadCart() {
  const stored = localStorage.getItem('cart')
  if (stored) {
    cart.items = JSON.parse(stored)
  }
}

export function getCartItemById(id: number) {
  return cart.items.find(cartItem => cartItem.id === id);
}

export default cart
