import React, { createContext, useState, ReactNode } from 'react';

export type GraphType = "line" | "stackedLine" | "bar" | "stackedBar";

export interface RecordEntry {
  date: string;
  value: number;
}

export interface Project {
  id: string;
  name: string;
  graphType: GraphType;
  unit: string;
  records: RecordEntry[];
  createdAt: string;
  lastUpdatedAt?: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "records" | "createdAt">) => void;
  addRecord: (projectId: string, record: RecordEntry) => void;
  updateProject: (projectId: string, project: Omit<Project, "id" | "records" | "createdAt">) => void;
  deleteProject: (projectId: string) => void;
}

export const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  addProject: () => {},
  addRecord: () => {},
  updateProject: () => {},
  deleteProject: () => {},
});

export const ProjectContextProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Omit<Project, "id" | "records" | "createdAt">) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: project.name,
      graphType: project.graphType,
      unit: project.unit,
      records: [],
      createdAt: new Date().toLocaleDateString('ja-JP'),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const addRecord = (projectId: string, record: RecordEntry) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId 
          ? { 
              ...proj, 
              records: [...proj.records, record],
              lastUpdatedAt: new Date().toLocaleDateString('ja-JP')
            } 
          : proj
      )
    );
  };

  const updateProject = (projectId: string, updatedProject: Omit<Project, "id" | "records" | "createdAt">) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId 
          ? { ...proj, ...updatedProject, lastUpdatedAt: new Date().toLocaleDateString('ja-JP') }
          : proj
      )
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(proj => proj.id !== projectId));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, addRecord, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
