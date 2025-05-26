import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const tools = [
  { name: "Сақталғандар", icon: "⭐" },
  { name: "Папкалар", icon: "📂" },
  { name: "Қаралып жатқан", icon: "✏️" },
  { name: "Бетбелгілер", icon: "🔖" },
  { name: "Құжаттар", icon: "📄" },
  { name: "Еске салулар", icon: "⏰" }, // ✅ Түзетілген
  { name: "Баптаулар", icon: "⚙️" },
];


interface ToolPanelProps {
  activeTool: string | null;
  setActiveTool: (val: string) => void;
  setShowToolPage: (val: boolean) => void;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({
  activeTool,
  setActiveTool,
  setShowToolPage,
}) => {
  return (
    <Card className="bg-white text-black p-4 w-64">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Мәзір</h2>
        <button onClick={() => setShowToolPage(false)} className="text-xl">✖</button>
      </div>
      <div className="space-y-2">
        {tools.map((tool) => (
          <Button
            key={tool.name}
            variant={activeTool === tool.name ? "default" : "ghost"}
            className="w-full justify-start text-left"
            onClick={() => setActiveTool(tool.name)}
          >
            {tool.icon} {tool.name}
          </Button>
        ))}
      </div>
    </Card>
  );
};
