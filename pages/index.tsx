import { FormEvent, useState, useCallback } from 'react';

import { SearchResults } from '../components/SearchResults';

interface Product {
  id: number;
  title: string;
  price: number;
  priceFormatted: string;
}

interface Results {
  totalPrice: number;
  data: Product[];
}

export default function Home() {
  const [search, setSearch] = useState('');

  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  }

  const addToWishlist = useCallback((id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Hello, world!</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid libero
        architecto, impedit placeat fugiat culpa doloremque? Itaque quos, natus
        rem omnis unde dolorem repudiandae laudantium tempora magnam harum nihil
        atque!
      </p>

      <div>
        <h2>Search</h2>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />

          <button type="submit">Buscar</button>
        </form>

        <SearchResults
          totalPrice={results.totalPrice}
          results={results.data}
          onAddToWishlist={addToWishlist}
        />
      </div>
    </div>
  );
}
