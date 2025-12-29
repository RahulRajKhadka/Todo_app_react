import React from "react";
import { Inbox } from "lucide-react";

const EmptyState = ({ searchQuery, filter }) => {
  const getMessage = () => {
    if (searchQuery) {
      return {
        title: "No tasks found",
        description: `No tasks match "${searchQuery}". Try a different search term.`,
      };
    }

    if (filter === "pending") {
      return {
        title: "No pending tasks",
        description: "All caught up! You have no pending tasks.",
      };
    }

    if (filter === "done") {
      return {
        title: "No completed tasks",
        description: "Complete some tasks to see them here.",
      };
    }

    return {
      title: "No tasks yet",
      description: "Get started by creating your first task!",
    };
  };

  const { title, description } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <Inbox className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md">{description}</p>
    </div>
  );
};

export default EmptyState;
