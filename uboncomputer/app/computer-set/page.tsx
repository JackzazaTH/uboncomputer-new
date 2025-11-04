'use client';
import React from 'react';
import ComputerSetPage from '../../components/ComputerSetPage';
import { useAppContext } from '../../context/AppContext';
import { NavigateFunction } from '../../types';

export default function ComputerSet() {
  const { computerSetGroups, onNavigate } = useAppContext();
  return <ComputerSetPage groups={computerSetGroups} onNavigate={onNavigate} />;
}