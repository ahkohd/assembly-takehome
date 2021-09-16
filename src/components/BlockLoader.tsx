import { SyncLoader } from "react-spinners";

interface BlockLoaderProps {
  isLoading: boolean;
}
const BlockLoader = ({ isLoading }: BlockLoaderProps) => {
  return (
    <div
      className="flex"
      style={{ visibility: isLoading ? "visible" : "hidden" }}
    >
      <div className="m-auto">
        <SyncLoader color="#ecc16b" />
      </div>
    </div>
  );
};

export default BlockLoader;
