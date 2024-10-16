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
  const [githubReposList, setGithubReposList] = useState<GitHubRepo[]>([]);
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  const getGithubRepos = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${userGithub}/repos`, {
        headers: {
          Authorization: `Bearer ${tokenGithub}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      const filteredRepos: GitHubRepo[] = response.data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
      }));
      setGithubReposList(filteredRepos);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}${apiProjects}`);
      setProjectsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const compareReposAndProjects = async () => {
    try {
      const existingProjectId = projectsList.map((project) => project.projectId);
      for (const repo of githubReposList) {
        if (!existingProjectId.includes(repo.id)) {
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
          console.log(`Projet créé pour le dépot ${repo.id} ${repo.name}`);
        }
      }
      getProjects();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGithubRepos();
    getProjects();
  }, []);

  useEffect(() => {
    if (githubReposList.length) {
      compareReposAndProjects();
    }
  }, [githubReposList.length]);

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
