import React from "react";
import FoldersTool from "./FoldersTool";
import BookmarksTool from "../tools/BookmarksTool";
import DocumentsTool from "../tools/DocumentsTool";
import DraftsTool from "../tools/DraftsTool";
import RemindersTool from "../tools/RemindersTool";
import SavedTools from "../tools/SavedTool";
import SettingsTool from "../tools/SeetingsTool";

interface ToolContentProps {
  activeTool: string;
  setActiveTool: (val: string | null) => void;
}

const ToolContent: React.FC<ToolContentProps> = ({ activeTool, setActiveTool }) => {
  const renderContent = () => {
    switch (activeTool) {
      case "Папкалар":
        return <FoldersTool setActiveTool={setActiveTool} />;
      case "Бетбелгілер":
        return <BookmarksTool setActiveTool={setActiveTool} />;
      case "Еске салулар":
        return <RemindersTool setActiveTool={setActiveTool} />;
      case "Құжаттар":
        return <DocumentsTool setActiveTool={setActiveTool} />;
      case "Қаралып жатқан":
        return <DraftsTool setActiveTool={setActiveTool} />;
      case "Сақталғандар":
        return <SavedTools setActiveTool={setActiveTool} />;
      case "Баптаулар":
        return <SettingsTool setActiveTool={setActiveTool} />;
      default:
        return <div className="text-gray-400">Белгісіз құрал</div>;
    }
  };

  return (
    <div className="flex-1 p-6 bg-[#1C1F2E] text-white">
      {renderContent()}
    </div>
  );
};

export default ToolContent;
