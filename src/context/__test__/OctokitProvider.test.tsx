import { render, screen } from "@testing-library/react";
import { useContext, useEffect, useState } from "react";
import OctokitProvider, { OctokitContext } from "../OctokitProvider";

type User = {
  name: string;
};

describe("OctokitProvider test", () => {
  const Test = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
      (async () => {
        const { data } = await octokit.request("GET /user");
        setUser(data as User);
      })();
    }, []);

    const octokit = useContext(OctokitContext);
    return <>{user && user.name}</>;
  };

  it("should get user's fullname", async () => {
    render(
      <OctokitProvider>
        <Test />
      </OctokitProvider>
    );

    expect(await screen.findByText(/Victor Aremu/)).toBeInTheDocument();
  });
});
