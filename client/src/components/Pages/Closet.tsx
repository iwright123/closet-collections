import * as React from 'react';
import CreateOutfit from './CreateOutfit';
import OutfitGrid from './OutfitGrid';
import AddItems from './AddItems'
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import * as axios from 'axios'


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

        <ClosetTab>Add Items to Closet</ClosetTab>

      </div>

      <div className='tab-progress' />

      <Panel>
        <CreateOutfit />
      </Panel>

      <Panel>
        <OutfitGrid />
      </Panel>

      <Panel>
        <AddItems />
      </Panel>

    </div>
  </Tabs>
);
