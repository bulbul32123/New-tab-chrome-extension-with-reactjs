import React, { useEffect, useRef } from 'react'
import {  FaTimes, FaEdit } from "react-icons/fa";

// Context Menu Component
export const ContextMenu = ({ x, y, onEdit, onDelete, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed -top-20 z-50 bg-[#2a2a2a] rounded-xl shadow-2xl border border-gray-600 overflow-hidden"
    >
      <div className="p-2 min-w-[200px]">
        <button
          onClick={onEdit}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white hover:bg-gray-600 rounded-lg transition-colors"
        >
          <FaEdit size={14} />
          Edit Shortcut
        </button>
        <button
          onClick={onDelete}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
        >
          <FaTimes size={14} />
          Remove
        </button>
      </div>
    </div>
  );
};