'use client';
import React from 'react';
import ComputerSetPage from '../../components/ComputerSetPage';
import { useAppContext } from '../../context/AppContext';

export default function ComputerSet() {
  const { computerSetGroups } = useAppContext();
  return <ComputerSetPage groups={computerSetGroups} />;
}
