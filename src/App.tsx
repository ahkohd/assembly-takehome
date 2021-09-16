import OctokitProvider from "@/context/OctokitProvider";
import StoreProvider from "@/context/StoreProvider";
import Content from "@/types/Content";

function App() {
  return (
    <div className="App min-h-screen w-full flex p-5 lg:p-0">
      <StoreProvider>
        <OctokitProvider>
          <Content />
        </OctokitProvider>
      </StoreProvider>
    </div>
  );
}

export default App;
