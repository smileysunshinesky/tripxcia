import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { GlobalDataProvider } from "./hooks/GlobalData";
import { Provider as ReduxProvider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./redux/store.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <GlobalDataProvider>
            <ChakraProvider>
              <Toaster />
              <ThemeProvider>
                <MaterialTailwindControllerProvider>
                  <App />
                </MaterialTailwindControllerProvider>
              </ThemeProvider>
            </ChakraProvider>
          </GlobalDataProvider>
        </BrowserRouter>
      </ReduxProvider>
    </HelmetProvider>
  </React.StrictMode>
);
