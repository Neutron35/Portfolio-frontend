import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiProjects, apiUrl } from '@/env';
import { useEffect, useState } from 'react';

import axios from 'axios';

function Account() {
  const [data, setData] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');

  async function getRepos() {
    try {
      const response = await axios.get('https://api.github.com/users/Neutron35/repos');
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRepos();
  }, []);

  return (
    <div>
      <Select onValueChange={setSelectedRepo}>
        <SelectTrigger className="max-w-fit mx-auto bg-primary-light-500 dark:bg-primary-dark-500 text-text-light-500">
          <SelectValue placeholder="Choisir un repo" />
        </SelectTrigger>
        <SelectContent className="dark:bg-secondary-light-500">
          <SelectGroup>
            {data.map((repo) => (
              <SelectItem key={repo.id} value={repo.id}>
                {repo.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Account;
