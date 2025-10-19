import { Outlet } from 'react-router-dom';
import SynapseHeader from '/src/components/projetos/SynapseHeader.tsx';
import type { JSX } from 'react';

export default function LayoutSynapse(): JSX.Element {
  return (
    <div className="layout">
      <SynapseHeader />
      <main className="layout_content">
        <Outlet />
      </main>
    </div>
  );
}
