import React, { useState, useEffect } from 'react';
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
        const exists = prev.payload.find((item1) => item1 === item._id);
        const indexOfItem = prev.payload.indexOf(exists);

        if (exists) {
          const filter = prev.payload.filter((item2) => item2 !== item._id);
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
          payload: [...prev.payload, item._id],
        };
      });
    } else {
      setSelected((prev) => ({
        ...prev,
        types: [item.type],
        payload: [item._id],
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
      <table className="w-full border-collapse mr-5">
        <thead>
          <tr className="py-2.5 grid grid-cols-4/1fr-0.5fr-0.5fr-0.5fr border-0 border-b border-solid border-gray-300">
            <td>Name</td>
            <td>Mimetype</td>
            <td>Published</td>
            <td>Size</td>
          </tr>
        </thead>
        <tbody>
          {
            folders.map((item) => (
              <tr
                key={item._id}
                className="py-2.5 grid grid-cols-4/1fr-0.5fr-0.5fr-0.5fr items-center border-0 border-b border-solid border-gray-300 cursor-default"
                onDoubleClick={() => navigate(`/folder${item.url}`)}
                onClick={(event) => {
                  handleOnSelection(event, {
                    _id: item._id,
                    type: item.type,
                  });
                }}
              >
                <td className="flex items-center gap-3.5 overflow-x-hidden">
                  <icon.BiFolder className="text-2xl" type="solid" />
                  <p className="text-base truncate">{item.name}</p>
                </td>
                <td><span className="block w-3 h-px bg-black"></span></td>
                <td className="truncate">{helper.formatDate(item.createdAt)}</td>
                <td><span className="block w-3 h-px bg-black"></span></td>
              </tr>
            ))
          }
          {
            documents.map((item) => (
              <tr
                key={item._id}
                className="py-2.5 grid grid-cols-4/1fr-0.5fr-0.5fr-0.5fr border-0 border-b border-solid border-gray-300 cursor-default"
                onClick={(event) => {
                  handleOnSelection(event, {
                    _id: item._id,
                    type: item.type,
                  });
                }}
              >
                <td className="grid grid-cols-2/auto-1fr items-center gap-3.5 overflow-x-hidden">
                  <icon.BiFileBlank className="text-2xl" />
                  <p className="truncate">{`${item.filename}.${item.format}`}</p>
                </td>
                <td className="truncate">{item.mimetype}</td>
                <td className="truncate">{helper.formatDate(item.createdAt)}</td>
                <td className="truncate">{helper.bytesToSize(item.size)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
