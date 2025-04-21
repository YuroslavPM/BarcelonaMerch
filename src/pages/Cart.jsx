import Card from "../components/Card";
import { useCartContext } from "../context/CartContext";
import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { A, useNavigate } from "@solidjs/router";

export default function Cart() {
  const { items, removeFromCart, getTotalPrice } = useCartContext();
  const navigate = useNavigate();

  // За предотвратяване на многократни кликове при изтриване
  const [disabledItems, setDisabledItems] = createStore({});

  const handleRemove = (id, title) => {
    if (confirm(`Are you sure you want to remove ${title} from your cart?`)) {
      setDisabledItems(id, true);
      removeFromCart(id);
      setTimeout(() => setDisabledItems(id, false), 500);
      location.reload();
    }
  };

  return (
    <div class="max-w-2xl w-full my-8 mx-auto px-4">
      <Card rounded={true} flat={false} class="p-6">
        <h2 class="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h2>

        <Show
          when={items.length > 0}
          fallback={
            <div class="py-8 text-center">
              <p class="text-gray-500 text-lg">Your cart is empty</p>
              <A
                href="/products"
                class="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Continue Shopping
              </A>
            </div>
          }
        >
          <div class="divide-y divide-gray-200">
            <For each={items}>
              {(item) => (
                <div class="py-6 flex justify-between items-start" key={item.id}>
                  <div class="flex items-start space-x-6">
                    <div class="flex-shrink-0">
                      <img
                        src={item.img}
                        alt={item.title}
                        class="h-24 w-24 rounded-lg object-cover shadow-sm"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/96?text=No+Image";
                          e.target.onerror = null;
                        }}
                      />
                    </div>

                    <div class="flex-1 min-w-0">
                      <h3 class="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p class="text-gray-500 mb-2">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div class="flex flex-col items-end">
                    <span class="text-lg font-medium mb-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemove(item.id, item.title)}
                      class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Remove item"
                      disabled={disabledItems[item.id]}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </For>
          </div>

          <div class="mt-8 pt-6 border-t-2 border-gray-200">
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-gray-800">Total:</span>
              <span class="text-xl font-bold">${Number(getTotalPrice() || 0).toFixed(2)}</span>
            </div>

            <div class="mt-6 flex justify-end space-x-4">
              <A
                href="/"
                class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Continue Shopping
              </A>
              <button class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </Show>
      </Card>
    </div>
  );
}
