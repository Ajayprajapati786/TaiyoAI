import React, { useState } from 'react';
import Contacts from './Contacts';
import Charts from './Charts';
import Maps from './Maps'

interface Tab {
  label: string;
  component: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: Tab[] = [
    {
      label: 'Contacts',
      component: <Contacts />,
    },
    {
      label: 'Chart',
      component: <Charts />,
    },
    {
      label: 'Maps',
      component: <Maps/>,
    },
  ];

  return (
    <div className="flex">
      <div className="w-1/4 h-screen bg-gray-200">
        <div className="flex flex-col h-full">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 ${
                activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-3/4">{tabs[activeTab].component}</div>
    </div>
  );
};

export default Sidebar;
