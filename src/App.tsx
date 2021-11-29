import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { MoviesProvider, useMoviesContext } from './contexts/movies';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MoviesProvider>
        <SideBar />

        <Content />
      </MoviesProvider>
    </div>
  )
}