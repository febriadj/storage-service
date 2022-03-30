import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as icon from 'react-icons/bi';
import * as helper from '../../helpers';

function Table({
  documents,
  folders,
  setSelected,
}) {
  const navigate = useNavigate();
  const [doubleKeys, setDoubleKeys] = useState({
    multipleSelect: false,
  });

  const handleOnSelection = (event, item) => {
    const e = event.currentTarget;
    const tr = [...document.getElementsByTagName('tr')];

    if (doubleKeys.multipleSelect) {
      setSelected((prev) => {
        const exists = prev.payload.find((item1) => item1 === item.id);
        const indexOfItem = prev.payload.indexOf(exists);

        if (exists) {
          const filter = prev.payload.filter((item2) => item2 !== item.id);
          const newTypes = prev.types.filter((item1, index) => index !== indexOfItem);
          e.classList.remove('bg-gray-100');
          return {
            types: [...newTypes],
            payload: [...filter],
          };
        }

        e.classList.add('bg-gray-100');
        return {
          types: [...prev.types, item.type],
          payload: [...prev.payload, { id: item.id, url: item.url }],
        };
      });
    } else {
      setSelected((prev) => ({
        ...prev,
        types: [item.type],
        payload: [{ id: item.id, url: item.url }],
      }));

      tr.map((item1) => item1.classList.remove('bg-gray-100'));
      e.classList.add('bg-gray-100');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Control') {
        setDoubleKeys((prev) => ({
          ...prev,
          multipleSelect: true,
        }));
      }
    });

    window.addEventListener('keyup', () => {
      setDoubleKeys((prev) => ({
        ...prev,
        multipleSelect: false,
      }));
    });
  }, []);

  return (
    <div className="absolute w-full flex">
      <table className="w-full border-collapse md:mr-5">
        <thead>
          <tr className="h-12 px-1.5 sm:px-0 grid sm:grid-cols-2/1fr-0.3fr md:grid-cols-4/1fr-0.5fr-0.5fr-0.5fr items-center border-0 border-b border-solid border-gray-300">
            <td>Name</td>
            <td className="hidden md:block">Mimetype</td>
            <td className="hidden md:block">Published</td>
            <td className="hidden sm:block">Size</td>
          </tr>
        </thead>
        <tbody>
          {
            folders.map((item) => (
              <tr
                key={item._id}
                className="h-12 px-1.5 sm:px-0 grid sm:grid-cols-2/1fr-0.3fr md:grid-cols-4/1fr-0.5fr-0.5fr-0.5fr items-center border-0 border-b border-solid border-gray-300 cursor-default"
                onDoubleClick={() => navigate(`/folder${item.url}`)}
                onClick={(event) => {
                  handleOnSelection(event, {
                    id: item._id,
                    type: item.type,
                    url: item.url,
                  });
                }}
              >
                <td className="flex items-center gap-3.5 overflow-x-hidden">
                  <icon.BiFolder className="text-2xl" />
                  <p className="text-base truncate">{item.name}</p>
                </td>
                <td className="hidden md:block"><span className="block w-3 h-px bg-black"></span></td>
                <td className="hidden md:block truncate">{helper.formatDate(item.createdAt)}</td>
                <td className="hidden sm:block"><span className="block w-3 h-px bg-black"></span></td>
              </tr>
            ))
          }
          {
            documents.map((item) => (
              <tr
                key={item._id}
                className="h-12 px-1.5 sm:px-0 grid sm:grid-cols-2/1fr-0.3fr md:grid-cols-4/1fr-0.5fr-0.5fr-0.5fr items-center border-0 border-b border-solid border-gray-300 cursor-default"
                onClick={(event) => {
                  handleOnSelection(event, {
                    id: item._id,
                    type: item.type,
                    url: item.url,
                  });
                }}
              >
                <td className="grid grid-cols-2/auto-1fr items-center gap-3.5 overflow-x-hidden">
                  {
                    /image/.test(item.mimetype) ? (
                      <span className="relative w-6 h-6 overflow-hidden flex justify-center items-center bg-gray-800">
                        <img
                          src={`${axios.defaults.baseURL}/documents/${item.userId}/file${item.url}`}
                          alt=""
                          className="w-[100%] h-[100%]"
                        />
                      </span>
                    ) : (
                      <icon.BiFileBlank className="text-2xl" />
                    )
                  }
                  <p className="truncate">{`${item.filename}.${item.format}`}</p>
                </td>
                <td className="hidden md:block truncate">{item.mimetype}</td>
                <td className="hidden md:block truncate">{helper.formatDate(item.createdAt)}</td>
                <td className="hidden sm:block truncate">{helper.bytesToSize(item.size)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
