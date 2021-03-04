import * as React from 'react';
import CreateOutfit from './CreateOutfit';
import OutfitGrid from './OutfitGrid';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';



const cn = (...args) => args.filter(Boolean).join(' ');

const ClosetTab = ({ children }) => {
  const { isActive, onClick } = useTabState();

  return (
    <button className={cn('tab', isActive && 'active')} onClick={onClick}>
      {children}
    </button>
  );
};

export default () => (
  <Tabs>
    <div className='tabs'>
      <div className='tab-list'>
        <ClosetTab>Create Outfit</ClosetTab>

        <ClosetTab>My Outfits</ClosetTab>

      </div>

      <div className='tab-progress' />

      <Panel>
        <CreateOutfit />
      </Panel>

      <Panel>
        <OutfitGrid />
      </Panel>

    </div>
  </Tabs>
);
