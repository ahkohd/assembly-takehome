import { createContext, FC } from "react";
import { Octokit } from "@octokit/core";

export const OctokitContext = createContext<Octokit>({} as Octokit);

const OctokitProvider: FC = ({ children }) => {
  const octokit = new Octokit({
    auth: process.env.REACT_APP_GH_ACCESS_TOKEN,
  });

  return (
    <OctokitContext.Provider value={octokit}>
      {children}
    </OctokitContext.Provider>
  );
};

export default OctokitProvider;
