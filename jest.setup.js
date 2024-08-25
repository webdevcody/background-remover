import "@testing-library/jest-dom/extend-expect";
import fetch from "node-fetch";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.fetch = fetch;
