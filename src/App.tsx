import OctokitProvider from "@/context/OctokitProvider";
import StoreProvider from "@/context/StoreProvider";
import Content from "@/types/Content";
import { useRef } from "react";
import ScrollArrow from "./components/ScrollArrow";

function App() {
  const ref = useRef(null);

  return (
    <div
      className="App h-screen w-screen flex bg-gray-100 overflow-scroll p-5 lg:p-0"
      ref={ref}
    >
      <StoreProvider>
        <OctokitProvider>
          <Content />
        </OctokitProvider>
      </StoreProvider>
      <ScrollArrow elementRef={ref} />
    </div>
  );
}

export default App;
