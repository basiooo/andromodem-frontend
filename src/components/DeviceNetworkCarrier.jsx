import { Button, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  MdSignalCellular0Bar,
  MdSignalCellular1Bar,
  MdSignalCellular2Bar,
  MdSignalCellular3Bar,
  MdSignalCellular4Bar,
} from "react-icons/md";
import DeviceNetworkLte from "./DeviceNetworkLte";

const signalLevelToIcon = (level) => {
  switch (level) {
    case "1":
      return <MdSignalCellular1Bar fontSize={30} />;
    case "2":
      return <MdSignalCellular2Bar fontSize={30} />;
    case "3":
      return <MdSignalCellular3Bar fontSize={30} />;
    case "4":
      return <MdSignalCellular4Bar fontSize={30} />;
    default:
      return <MdSignalCellular0Bar fontSize={30} />;
  }
};
const DeviceNetworkCarrier = ({ carrier }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <Tbody>
            {carrier.connection_state == "Connected" ||
            carrier.connection_state == "Connecting" ||
            carrier.connection_state == "Disconnected" ? (
              <Tr>
                <Td w={10}>Action</Td>
                <Td w={1}>:</Td>
                <Td textAlign="start">
                  <Button colorScheme="blue">
                    {carrier.connection_state == "Connected" ||
                    carrier.connection_state == "Connecting"
                      ? "Disable Data"
                      : "Enable Data"}
                  </Button>{" "}
                </Td>
              </Tr>
            ) : (
              ""
            )}

            <Tr>
              <Td w={10}>Operator</Td>
              <Td w={1}>:</Td>
              <Td textAlign="start">{carrier.name}</Td>
            </Tr>
            <Tr>
              <Td w={10}>Network Type</Td>
              <Td w={1}>:</Td>
              <Td textAlign="start">{Object.keys(carrier.signal_strength)}</Td>
            </Tr>
            <Tr>
              <Td w={10}>Signal Strength</Td>
              <Td w={1}>:</Td>
              <Td textAlign="start">
                {signalLevelToIcon(
                  carrier.signal_strength[Object.keys(carrier.signal_strength)]
                    .level
                )}
              </Td>
            </Tr>
            <DeviceNetworkLte lte={carrier.signal_strength["Lte"]} />
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
DeviceNetworkCarrier.propTypes = {
  carrier: PropTypes.shape({
    name: PropTypes.string,
    connection_state: PropTypes.string.isRequired,
    signal_strength: PropTypes.object,
  }).isRequired,
};
export default DeviceNetworkCarrier;
