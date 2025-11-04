'use client';
import React from 'react';
import AboutPage from '../../components/AboutPage';
import { useAppContext } from '../../context/AppContext';

export default function About() {
  const { onNavigate } = useAppContext();
  return <AboutPage onNavigate={onNavigate} />;
}