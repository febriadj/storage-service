import React from 'react';
import { Link } from 'react-router-dom';
import * as icon from 'react-icons/bi';

function Sidebar({ page }) {
  return (
    <div className="absolute w-full h-14 flex border-0 border-t border-solid bg-white border-gray-300 z-10 sm:z-0 sm:left-0 bottom-0 sm:bg-white sm:h-full sm:w-16 sm:block md:w-56">
      <div className="w-full h-full flex px-2.5 sm:px-0">
        <div className="w-full sm:mt-16 sm:pt-5 grid grid-cols-3/auto-1fr-auto items-center md:items-start sm:flex sm:flex-col">
          <button type="button" className="flex items-center justify-center gap-5 py-2.5 px-2.5 rounded-[50%] md:justify-start md:rounded-none md:rounded-r-3xl md:px-5 md:w-full">
            <icon.BiPlus className="text-2xl" />
            <p className="text-base hidden md:block">New</p>
          </button>
          <div className="w-full flex justify-center sm:flex-col items-center md:items-start sm:mt-5">
            <Link to="/" className={`flex items-center justify-center gap-5 py-2.5 px-2.5 rounded-[50%] md:justify-start md:rounded-none md:rounded-r-3xl md:px-5 md:w-full ${page === '/' && 'bg-gray-100'}`}>
              <icon.BiHomeSmile className="text-2xl" />
              <p className="text-base hidden md:block">My Storage</p>
            </Link>
            <Link to="/trash" className={`flex items-center justify-center gap-5 py-2.5 px-2.5 rounded-[50%] md:justify-start md:rounded-none md:rounded-r-3xl md:px-5 md:w-full ${page === '/trash' && 'bg-gray-100'}`}>
              <icon.BiTrashAlt className="text-2xl" />
              <p className="text-base hidden md:block">Trash</p>
            </Link>
          </div>
          <div className="md:w-full flex sm:flex-col sm:border-0 sm:border-t sm:border-solid border-gray-300 sm:mt-5 sm:pt-5 md:items-start">
            <Link to="/docs" className="flex items-center justify-center gap-5 py-2.5 px-2.5 rounded-[50%] md:justify-start md:rounded-none md:rounded-r-3xl md:px-5 md:w-full">
              <icon.BiHelpCircle className="text-2xl" />
              <p className="text-base hidden md:block">How to Use</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
