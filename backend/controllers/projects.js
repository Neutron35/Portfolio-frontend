import Project from '../models/Project.js';

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID invalide.' });
    }

    const project = await Project.findOne({
      projectId: id,
    });

    if (!project) {
      return [];
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const projectObject = req.body.project;

    if (!projectObject) {
      return res
        .status(400)
        .json({ message: 'Erreur de validation des données, cest ici !' });
    }

    console.log(projectObject);
    const project = new Project({
      ...projectObject,
    });

    await project.save();
    res.status(201).json({ message: 'Projet ajouté !' });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Erreur de validation des données, cest là !' });
  }
};
