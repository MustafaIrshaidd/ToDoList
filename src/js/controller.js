import { Header } from "./views/pages/components/Header/index.js";

export const renderIndexPage = (root) => {
    root.innerHTML = Header();
};
