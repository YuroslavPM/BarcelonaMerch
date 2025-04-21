import { useParams } from "@solidjs/router"
import { createResource, createSignal, Show } from "solid-js"
import { useCartContext } from "../context/CartContext"

const fetchProduct = async (id) => {
  const res = await fetch('http://localhost:4000/products/' + id)
  return res.json()
}

export default function Product() {
  const params = useParams()
  const [product] = createResource(params.id, fetchProduct)
  const { addToCart } = useCartContext()
  const [adding, setAdding] = createSignal(false)

  const handleAddToCart = () => {
    setAdding(true)
    setTimeout(() => setAdding(false), 2000)
    
    const productData = product()
    if (productData) {
      addToCart(productData)
    }
  }

  return (
    <div class="container mx-auto px-4 py-12 max-w-7xl">
      <Show when={product()} fallback={
        <div class="flex justify-center items-center h-96">
          <div class="animate-pulse text-lg">Loading product details...</div>
        </div>
      }>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="aspect-square overflow-hidden">
              <img 
                src={product().img} 
                alt={product().title}
                class="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>
            <div class="p-4 grid grid-cols-4 gap-2">
              {/* Thumbnail placeholders */}
              {[1,2,3,4].map(() => (
                <div class="aspect-square bg-gray-100 rounded-md cursor-pointer"></div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div class="flex flex-col">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product().title}
            </h1>
            
            <div class="flex items-center mb-6">
              <div class="flex text-yellow-400 mr-2">
                {[1,2,3,4,5].map(() => (
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span class="text-gray-500 text-sm">(24 reviews)</span>
            </div>

            <div class="prose max-w-none text-gray-700 mb-8">
              <p>{product().description}</p>
            </div>

            <div class="mt-auto space-y-6">
              <div class="flex items-center">
                <span class="text-3xl font-bold text-gray-900 mr-4">
                  £{product().price.toFixed(2)}
                </span>
                {product().originalPrice && (
                  <span class="text-xl text-gray-500 line-through">
                    £{product().originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div class="flex space-x-4">
                <div class="flex items-center border rounded-lg px-4 py-2">
                  <button class="text-xl px-2">-</button>
                  <span class="mx-4">1</span>
                  <button class="text-xl px-2">+</button>
                </div>
                <button 
                  class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  onclick={handleAddToCart} 
                  disabled={adding()}
                >
                  Add to Cart
                </button>
                <Show when={adding()}>
                  <div class="m-2 p-2 border-amber-500 border-2 rounded-md inline-block">
                    {product().title} was added to the cart!
                  </div>
                </Show>
              </div>

              <div class="pt-6 border-t border-gray-200">
                <div class="flex items-center text-sm text-gray-500 space-x-4">
                  <span>Category: {product().category || 'Electronics'}</span>
                  <span>SKU: {product().sku || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  )
}