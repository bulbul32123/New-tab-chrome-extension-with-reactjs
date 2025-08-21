import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { FlippingClock } from "./FlippingClock";
import { SettingsModal } from "./SettingsModel";
import { EditDockModal } from "./EditDockModel";
import { AddDocks } from "./AddDocks";
import { useCallback, useEffect, useState, useRef } from "react";
import { FaEdit } from "react-icons/fa";

export default function Docks() {
    const [openAddDockModel, setOpenAddDockModel] = useState(false);
    const [openSettingsModal, setOpenSettingsModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [docks, setDocks] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [draggedOverIndex, setDraggedOverIndex] = useState(null);
    const [editDockOnRightClick, setEditDockOnRightClick] = useState(false);
    const [editingDock, setEditingDock] = useState(null);
    const [showClock, setShowClock] = useState(false);
    const [lastActivity, setLastActivity] = useState(Date.now());
    const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    
    const dockRef = useRef(null);

    const updateActivity = useCallback(() => {
        setLastActivity(Date.now());
        setShowClock(false);
    }, []);

    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

        events.forEach(event => {
            document.addEventListener(event, updateActivity, true);
        });

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, updateActivity, true);
            });
        };
    }, [updateActivity]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dockRef.current && !dockRef.current.contains(event.target)) {
                setEditDockOnRightClick(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('contextmenu', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('contextmenu', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastActivity > 10000) {
                setShowClock(true);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [lastActivity]);

    const GetDocksFromLocalStorage = () => {
        try {
            const docksData = localStorage.getItem("dockItems");
            const parsed = JSON.parse(docksData) || [];
            setDocks(parsed);
        } catch (error) {
            setDocks([]);
            console.log(error);
        }
    };

    const saveDocks = (newDocks) => {
        localStorage.setItem("dockItems", JSON.stringify(newDocks));
        setDocks(newDocks);
    };

    const setDocksToLocalStorage = (key, newItem) => {
        const existing = [...docks];
        existing.push({ ...newItem, id: Date.now() });
        saveDocks(existing);
        setOpenAddDockModel(false);
    };

    const handleContextMenu = (e, dock) => {
        e.preventDefault();
        e.stopPropagation();
        setEditDockOnRightClick(dock);
    };

    const closeContextMenu = () => {
        setEditDockOnRightClick(false);
    };

    const handleEdit = (dock) => {
        setEditingDock(dock);
        setOpenEditModal(true);
        closeContextMenu();
    };

    const handleDelete = (id) => {
        const newDocks = docks.filter(dock => dock.id !== id);
        saveDocks(newDocks);
        closeContextMenu();
    };

    const handleEditSave = (updatedData) => {
        const newDocks = docks.map(dock =>
            dock.id === editingDock.id ? { ...dock, ...updatedData } : dock
        );
        saveDocks(newDocks);
        setEditingDock(null);
    };

    const handleDragStart = (e, index) => {
        setDraggedItem(index);
        setIsDragging(true);
        setDragStartPosition({ x: e.clientX, y: e.clientY });
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', '');
        
        setEditDockOnRightClick(false);
        
        const dragImage = e.target.cloneNode(true);
        dragImage.style.transform = 'rotate(5deg)';
        dragImage.style.opacity = '0.8';
        e.dataTransfer.setDragImage(dragImage, 25, 25);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        if (draggedItem !== null && draggedItem !== index) {
            setDraggedOverIndex(index);
        }
    };

    const handleDragEnter = (e, index) => {
        e.preventDefault();
        if (draggedItem !== null && draggedItem !== index) {
            setDraggedOverIndex(index);
        }
    };

    const handleDragLeave = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const { clientX, clientY } = e;
        
        if (
            clientX < rect.left ||
            clientX > rect.right ||
            clientY < rect.top ||
            clientY > rect.bottom
        ) {
            setDraggedOverIndex(null);
        }
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        e.stopPropagation();

        if (draggedItem === null || draggedItem === dropIndex) {
            resetDragState();
            return;
        }

        const newDocks = [...docks];
        const draggedDock = newDocks[draggedItem];

        newDocks.splice(draggedItem, 1);
        
        const insertIndex = draggedItem < dropIndex ? dropIndex - 1 : dropIndex;
        newDocks.splice(insertIndex, 0, draggedDock);

        saveDocks(newDocks);
        resetDragState();
    };

    const handleDragEnd = (e) => {
        resetDragState();
    };

    const resetDragState = () => {
        setDraggedItem(null);
        setDraggedOverIndex(null);
        setIsDragging(false);
        setDragStartPosition({ x: 0, y: 0 });
    };

    const handleDockClick = (e) => {
        e.preventDefault();
        if (editDockOnRightClick) {
            setEditDockOnRightClick(false);
        }
    };

    useEffect(() => {
        GetDocksFromLocalStorage();
    }, []);

    return (
        <div className="relative w-full h-full">
            <AddDocks
                open={openAddDockModel}
                close={setOpenAddDockModel}
                setDockData={setDocksToLocalStorage}
            />

            <SettingsModal
                open={openSettingsModal}
                close={() => setOpenSettingsModal(false)}
            />

            <FlippingClock show={showClock} />

            <div className="dock">
                <div className="dock-container" ref={dockRef}>
                    <div className="flex">
                        {docks?.map((item, index) => (
                            <div
                                key={item.id || index}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragEnter={(e) => handleDragEnter(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                onContextMenu={(e) => handleContextMenu(e, item)}
                                onClick={handleDockClick}
                                className={`dock-icon dock-item relative cursor-pointer transition-all duration-300 ease-out ${
                                    draggedOverIndex === index ? 'transform scale-110 z-10' : ''
                                } ${
                                    draggedItem === index ? 'opacity-30 transform scale-95' : ''
                                } ${
                                    isDragging && draggedItem !== index ? 'transform scale-95' : ''
                                }`}
                                style={{
                                    transformOrigin: 'center',
                                    zIndex: draggedItem === index ? 1000 : 'auto'
                                }}
                            >
                                <a href={item.address} className="block" onClick={(e) => {
                                    if (editDockOnRightClick) {
                                        e.preventDefault();
                                    }
                                }}>
                                    <img
                                        className="pointer-events-none transition-transform duration-200"
                                        src={`https://www.google.com/s2/favicons?domain=${item.address}&sz=64`}
                                        alt={item.name}
                                        style={{
                                            filter: draggedItem === index ? 'blur(1px)' : 'none'
                                        }}
                                    />
                                    <span className="tooltip">{item.name}</span>
                                </a>
                                
                                <div className={`absolute inset-0 transition-all duration-300 ease-out ${
                                    editDockOnRightClick && editDockOnRightClick.id === item.id 
                                        ? 'opacity-100 scale-100' 
                                        : 'opacity-0 scale-90 pointer-events-none'
                                }`}>
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleDelete(item.id);
                                        }}
                                        className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-20"
                                    > 
                                        <IoMdCloseCircle size={21} /> 
                                    </button>
                                    
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleEdit(item);
                                        }}
                                        className="absolute inset-0 rounded-full bg-white/90 backdrop-blur-sm flex justify-center items-center hover:bg-white transition-all duration-200 shadow-lg z-10"
                                    > 
                                        <FaEdit size={14} className="text-gray-700" /> 
                                    </button>
                                </div>
                                
                                {draggedOverIndex === index && draggedItem !== index && (
                                    <div className="absolute inset-0 border-2 border-blue-400 rounded-lg animate-pulse pointer-events-none" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="dock-divider"></div>

                    <button className="dock-item add-dock-item" onClick={() => setOpenAddDockModel(true)}>
                        <div className="dock-icon">
                            <span><IoMdAdd size={20} /></span>
                        </div>
                        <span className="tooltip">Add</span>
                    </button>

                    <button className="dock-item" onClick={() => setOpenSettingsModal(true)}>
                        <div className="dock-icon">
                            <span><IoSettingsSharp size={20} /></span>
                        </div>
                        <span className="tooltip">Settings</span>
                    </button>
                </div>
            </div>

            <EditDockModal
                open={openEditModal}
                close={() => setOpenEditModal(false)}
                dock={editingDock}
                onSave={handleEditSave}
            />
        </div>
    );
}