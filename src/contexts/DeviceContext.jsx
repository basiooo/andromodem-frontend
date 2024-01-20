import { createContext, useState } from "react";
import PropTypes from 'prop-types'

export const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [device, setDevice] = useState();

  return (
    <DeviceContext.Provider value={{ device, setDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};
DeviceProvider.propTypes = {
    children: PropTypes.node.isRequired
}