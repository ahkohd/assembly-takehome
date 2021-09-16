import OctokitProvider from "@/context/OctokitProvider";
import StoreProvider from "@/context/StoreProvider";
import Content from "@/types/Content";

function App() {
  return (
    <div className="App h-screen bg-gray-200">
      <StoreProvider>
        <OctokitProvider>
          <Content />
        </OctokitProvider>
      </StoreProvider>
    </div>
  );
}

export default App;
