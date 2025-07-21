// store/provider.tsx
"use client";

import { useRef, type ReactNode } from "react";
import { Provider } from 'react-redux'
import { store } from "./index";
type ReduxProvider = typeof Provider


export interface ProvidersProps {
  children: ReactNode;
}

/**
 * Wrap your app in the Redux store.
 * Usage (in app/layout.tsx):
 *   import { Providers } from "@/store/provider";
 *   ...
 *   <Providers>{children}</Providers>
 */
const Providers = ({ children }: ProvidersProps) =>{
  
    return (<Provider store={store}>{children}</Provider>)
}

export default Providers;

// (optional) default export if you prefer:
// export default Providers;
