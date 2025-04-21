import { createContext, useContext, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

export const CartContext = createContext();

export function CartContextProvider(props) {
  // Initialize from localStorage
  const [store, setStore] = createStore({
    items: JSON.parse(localStorage.getItem("cart") || "[]")
  });

  // Persist to localStorage on changes
  createEffect(() => {
    localStorage.setItem("cart", JSON.stringify(store.items));
  });

  // Cart actions
  const cartActions = {
    get items() {
      return store.items; // Reactive through Solid's store
    },
    addToCart: (product) => {
      const existingIndex = store.items.findIndex(item => item.id === product.id);
      if (existingIndex >= 0) {
        setStore("items", existingIndex, "quantity", q => q + 1);
      } else {
        setStore("items", [...store.items, { ...product, quantity: 1 }]);
      }
    },
    removeFromCart: (productId) => {
      setStore("items", items => items.filter(item => item.id !== productId));
    }
    ,
    clearCart: () => {
      setStore("items", []);
    },
    getTotalItems: () => {
      return store.items.reduce((total, item) => total + item.quantity, 0);
    },
    getTotalPrice: () => {
      return store.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  };

  return (
    <CartContext.Provider value={cartActions}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}