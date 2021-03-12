import * as React from 'react';
import AddItems from './AddItems';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import MyOutfit from '../Pages/MyOutfit';
import CreateOutfitWhiteBoard from './CreateOutfitWhiteBoard';


const cn = (...args): any => args.filter(Boolean).join(' ');

const ClosetTab = ({ children }): any => {
  const { isActive, onClick } = useTabState();

  return (
    <button className={cn('tab', isActive && 'active')} onClick={onClick}>
      {children}
    </button>
  );
};

export default (): any => (
  <Tabs>
    <div className='tabs'>
      <div className='tab-list'>
        <ClosetTab>Create Outfit</ClosetTab>

        <ClosetTab>My Outfits</ClosetTab>

        <ClosetTab>Add Items to Closet</ClosetTab>

      </div>

      <div className='tab-progress' />

      <Panel>
        <CreateOutfitWhiteBoard />
      </Panel>

      <Panel>
        {/* this is where my closet outfits go */}
        <MyOutfit />
      </Panel>

      <Panel>
        <AddItems />
      </Panel>

    </div>
  </Tabs>
);
