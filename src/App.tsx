import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client'
import { SEARCH_USER } from './services';
import useDebounce from 'hooks/useDebounce';

interface IUser {
  id: number
  name: string 
  bioHTML: string
}

function App() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const {loading, error, data} = useQuery(SEARCH_USER, { variables: {query} })

  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    if(debouncedSearch) {
      setQuery(debouncedSearch)
    }
  }, [debouncedSearch])
  
  return (
    <React.StrictMode>
      <div>
        <input value={search} onChange={(event) => setSearch(event.target.value)} />
        {loading && <div>Loading...</div>}
        {error && <div>Error! { error.message }</div>}
        {data && data.search.nodes.map( (data:IUser) => <div key={data.id}>
          <p>{data.name}</p>
          <p dangerouslySetInnerHTML={{__html: data.bioHTML}} ></p>
        </div>)}
      </div>
    </React.StrictMode>
  );
}

export default App;
