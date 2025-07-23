import { IoMdAdd } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { ContextMenu } from "./ContextMenu";
import { FlippingClock } from "./FlippingClock";
import { SettingsModal } from "./SettingsModel";
import { EditDockModal } from "./EditDockModel";
import { AddDocks } from "./AddDocks";
import { useCallback, useEffect, useState } from "react";

export default function Docks() {
    const [openAddDockModel, setOpenAddDockModel] = useState(false);
    const [openSettingsModal, setOpenSettingsModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [docks, setDocks] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [draggedOverIndex, setDraggedOverIndex] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);
    const [editingDock, setEditingDock] = useState(null);
    const [showClock, setShowClock] = useState(false);
    const [lastActivity, setLastActivity] = useState(Date.now());

    // Activity tracking
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

    // Clock timer
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
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            dock
        });
    };

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    const handleEdit = () => {
        setEditingDock(contextMenu.dock);
        setOpenEditModal(true);
        closeContextMenu();
    };

    const handleDelete = () => {
        const newDocks = docks.filter(dock => dock.id !== contextMenu.dock.id);
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

    // Drag and drop handlers
    const handleDragStart = (e, index) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDraggedOverIndex(index);
    };

    const handleDragLeave = () => {
        setDraggedOverIndex(null);
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();

        if (draggedItem === null || draggedItem === dropIndex) {
            setDraggedItem(null);
            setDraggedOverIndex(null);
            return;
        }

        const newDocks = [...docks];
        const draggedDock = newDocks[draggedItem];

        newDocks.splice(draggedItem, 1);
        newDocks.splice(dropIndex, 0, draggedDock);

        saveDocks(newDocks);
        setDraggedItem(null);
        setDraggedOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
        setDraggedOverIndex(null);
    };

    useEffect(() => {
        GetDocksFromLocalStorage();
    }, []);

    return (
        <>
            <AddDocks
                open={openAddDockModel}
                close={setOpenAddDockModel}
                setDockData={setDocksToLocalStorage}
            />

            <EditDockModal
                open={openEditModal}
                close={() => setOpenEditModal(false)}
                dockItem={editingDock}
                onSave={handleEditSave}
            />

            <SettingsModal
                open={openSettingsModal}
                close={() => setOpenSettingsModal(false)}
            />

            <FlippingClock show={showClock} />

            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onClose={closeContextMenu}
                />
            )}

            <div className="dock">
                <div className="dock-container">
                    <div className="flex">
                        {docks?.map((item, index) => (
                            <div
                                key={item.id || index}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                onContextMenu={(e) => handleContextMenu(e, { ...item, id: item.id || Date.now() })}
                                className={`dock-icon dock-item cursor-pointer transition-all duration-200 ${draggedOverIndex === index ? 'transform scale-110' : ''
                                    } ${draggedItem === index ? 'opacity-50' : ''}`}
                            >
                                <a href={item.address} className="block">
                                    <img
                                        className="pointer-events-none"
                                        src={`https://www.google.com/s2/favicons?domain=${item.address}&sz=64`}
                                        alt={item.name}
                                    />
                                    <span className="tooltip">{item.name}</span>
                                </a>
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
        </>
    );
}