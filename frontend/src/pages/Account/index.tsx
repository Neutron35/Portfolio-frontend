import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiProjects, apiUrl, tokenGithub, userGithub } from '@/env';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import axios from 'axios';

interface GitHubRepo {
  id: number;
  name: string;
  url: string;
}

interface Project {
  projectId: number;
  title: string;
  description: string;
  difficulties: string;
  skills: string;
  linkToCode: string;
}

function Account() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  // Fonction pour récupérer les dépôts GitHub
  const getGithubRepos = async (): Promise<GitHubRepo[]> => {
    try {
      const response = await axios.get(`https://api.github.com/users/${userGithub}/repos`, {
        headers: {
          Authorization: `Bearer ${tokenGithub}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      // Spécification du type pour éviter l'usage implicite de 'any'
      const filteredRepos: GitHubRepo[] = response.data.map((repo: { id: number; name: string; html_url: string }) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
      }));
      return filteredRepos; // Retourne les dépôts GitHub
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Fonction pour récupérer les projets depuis l'API
  const getProjects = async (): Promise<Project[]> => {
    try {
      const response = await axios.get(`${apiUrl}${apiProjects}`);
      return response.data; // Retourne les projets
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Fonction pour comparer les dépôts GitHub avec les projets existants
  const compareReposAndProjects = async () => {
    try {
      // Attendre que les deux requêtes soient terminées
      const [githubRepos, projects] = await Promise.all([getGithubRepos(), getProjects()]);

      // Mettre à jour la liste des projets
      setProjectsList(projects);

      for (const repo of githubRepos) {
        const existingProject = projects.find((project: Project) => project.projectId === repo.id);

        if (!existingProject) {
          // Si le projet n'existe pas, on le crée
          await axios.post(`${apiUrl}${apiProjects}`, {
            project: {
              projectId: repo.id,
              title: repo.name,
              description: 'Description',
              difficulties: 'Aucune difficulté spécifiée',
              skills: 'Compétences associées au projet',
              linkToCode: repo.url,
            },
          });
          console.log(`Projet créé pour le dépôt ${repo.id} ${repo.name}`);
        } else if (existingProject.title !== repo.name || existingProject.linkToCode !== repo.url) {
          // Si le projet existe mais que certaines informations ont changé, on le met à jour
          await axios.put(`${apiUrl}${apiProjects}/${existingProject.projectId}`, {
            project: {
              title: repo.name,
              linkToCode: repo.url,
            },
          });
          console.log(`Projet mis à jour pour le dépôt ${repo.id} ${repo.name}`);
        } else {
          // Si le projet est déjà à jour
          console.log(`Projet déjà existant et à jour : ${repo.id} ${repo.name}`);
        }
      }

      // Recharger la liste des projets après toutes les modifications
      setProjectsList(await getProjects());
    } catch (error) {
      console.log('Erreur lors de la comparaison des dépôts et des projets', error);
    }
  };

  // Lancer la comparaison une fois au chargement du composant
  useEffect(() => {
    compareReposAndProjects();
  }, []);

  return (
    <Table className="mx-auto">
      <TableCaption>Liste des projets</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Difficultés</TableHead>
          <TableHead>Compétences</TableHead>
          <TableHead>Lien</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projectsList.map((project) => (
          <TableRow key={project.projectId}>
            <TableCell>{project.projectId}</TableCell>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell>{project.difficulties}</TableCell>
            <TableCell>{project.skills}</TableCell>
            <TableCell>{project.linkToCode}</TableCell>
            <TableCell>
              <Button>Modifier</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Account;
