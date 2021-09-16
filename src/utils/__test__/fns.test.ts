import { formatNumber } from "../fns";

describe("utility functions", () => {
  it("should format number", () => {
    expect(formatNumber(1000)).toEqual("1.0k");
  });
});
