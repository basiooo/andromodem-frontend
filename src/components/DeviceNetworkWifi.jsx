import { Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import PropTypes from "prop-types";

const DeviceNetworkWifi = ({ wifi }) => {
  return (
    <TableContainer>
        <Table>
    <Tbody>
      <Tr>
        <Td w={10}>Status</Td>
        <Td w={1}>:</Td>
        <Td textAlign="start">{wifi.connected ? "Connected": "Not Connect"}</Td>
      </Tr>
      {
        wifi.connected ? 
        <Tr>
          <Td>SSID</Td>
          <Td>:</Td>
          <Td>{wifi.SSID}</Td>
        </Tr>:""

      }
    </Tbody>
  </Table>
    </TableContainer>
  );
};
DeviceNetworkWifi.propTypes = {
  wifi: PropTypes.shape({
    SSID: PropTypes.string,
    connected: PropTypes.bool.isRequired,
  }).isRequired,
};
export default DeviceNetworkWifi;
