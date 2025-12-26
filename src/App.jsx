import EmptyState from "./Componenets/EmptyState.jsx";

function App() {
  return (
    <div>
      <div className="p-8">
        <EmptyState searchQuery="" filter="all" />
      </div>
    </div>
  );
}

export default App;
