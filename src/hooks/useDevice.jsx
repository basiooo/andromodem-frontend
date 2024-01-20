import { useContext } from "react";
import { DeviceContext } from "../contexts/DeviceContext";

export const useDevice = () => {
    return useContext(DeviceContext);
};
  