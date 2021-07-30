import { FormEvent, useState } from 'react';

import { SearchResults } from '../components/SearchResults';

interface Product {
  id: string;
  price: number;
  title: string;
}

export default function Home() {
  const [search, setSearch] = useState('');

  const [results, setResults] = useState<Product[]>([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
  }

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

        <SearchResults results={results} />
      </div>
    </div>
  );
}
