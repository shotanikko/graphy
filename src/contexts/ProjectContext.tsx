import React, { createContext, useState, ReactNode } from 'react';

export type GraphType = "line" | "stackedLine" | "bar" | "stackedBar";

export interface RecordEntry {
  date: string;
  value: number;
}

export interface Project {
  id: number;
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
  addRecord: (projectId: number, record: RecordEntry) => void;
  updateProject: (projectId: number, project: Omit<Project, "id" | "records" | "createdAt">) => void;
}

export const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  addProject: () => {},
  addRecord: () => {},
  updateProject: () => {},
});

export const ProjectContextProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Omit<Project, "id" | "records" | "createdAt">) => {
    const newProject: Project = {
      id: Date.now(),
      name: project.name,
      graphType: project.graphType,
      unit: project.unit,
      records: [],
      createdAt: new Date().toLocaleDateString('ja-JP'),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const addRecord = (projectId: number, record: RecordEntry) => {
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

  const updateProject = (projectId: number, updatedProject: Omit<Project, "id" | "records" | "createdAt">) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId
          ? { ...proj, ...updatedProject }
          : proj
      )
    );
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, addRecord, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
