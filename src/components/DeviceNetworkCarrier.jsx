import { Button, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  MdSignalCellular0Bar,
  MdSignalCellular1Bar,
  MdSignalCellular2Bar,
  MdSignalCellular3Bar,
  MdSignalCellular4Bar,
} from "react-icons/md";
import { CONNECTION_STATE } from "../utils/const";

const signalLevelToIcon = (data) => {
  const level = data.level ?? data.mLevel;
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
            {carrier.connection_state == CONNECTION_STATE.CONNECTED ||
            carrier.connection_state == CONNECTION_STATE.CONNECTING ||
            carrier.connection_state == CONNECTION_STATE.DISCONNECTED ? (
              <Tr>
                <Td w={10}>Action</Td>
                <Td w={1}>:</Td>
                <Td textAlign="start">
                  <Button colorScheme="blue" size='sm'>
                    {carrier.connection_state == CONNECTION_STATE.CONNECTED ||
                    carrier.connection_state == CONNECTION_STATE.CONNECTING
                      ? "Disable Data"
                      : "Enable Data"}
                  </Button>
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
                )}
              </Td>
            </Tr>
            {
              Object.entries(carrier.signal_strength[Object.keys(carrier.signal_strength)]).map(([key,value])=>{
                return (
                  <Tr>
                    <Td w={10}>{key}</Td>
                    <Td w={1}>:</Td>
                    <Td textAlign="start">
                      {value}
                    </Td>
                  </Tr>
                )
              })
            }
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
