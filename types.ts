import { ReactNode } from 'react';

export interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: ReactNode;
  tags: string[];
  demoUrl?: string; // Optional URL for embed demo
}

export interface FeatureItem {
  title: string;
  description: string;
}