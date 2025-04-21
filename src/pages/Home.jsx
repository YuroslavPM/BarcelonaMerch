import Card from '../components/Card';
import { Router, Routes, Route, A } from "@solidjs/router";
import { createResource, Show } from 'solid-js';
import { useCartContext } from "../context/CartContext"

const fetchProducts = async () => {
  const res = await fetch('http://localhost:4000/products');
  return res.json();
};

export default function Home() {
  const [products] = createResource(fetchProducts);

  return (
    <Show when={products()} fallback={<p>Loading...</p>}>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
 <For each={products()}>
          {(product) => (
            <Card rounded={true} flat={true} class="h-full flex flex-col group">
              {/* Image container with fixed height */}
              <div class="overflow-hidden" style={{ height: '430px' }}>
                <img 
                  src={product.img} 
                  alt={product.title} 
                  class="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="400"
                  height="430"
                />
              </div>
              
              {/* Product info section */}
              <div class="p-4 flex flex-col flex-grow">
                <h1 class="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h1>
                <div class="mt-auto">
                  <Show when={product.price}>
                    <p class="text-lg font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                  </Show>
                  <Show when={product.originalPrice}>
                    <p class="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </p>
                  </Show>
                  <A href={`/product/${product.id}`} class='btn'>View Product</A>
                </div>
              </div>
            </Card>
          )}
        </For>
      </div>
    </Show>
  );
}