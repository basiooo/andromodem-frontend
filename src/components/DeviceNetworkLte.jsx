import { Badge, Td, Tr } from "@chakra-ui/react";
import PropTypes from "prop-types";

// LTE https://support.cel-fi.com/hc/en-us/articles/1260805036129-Understanding-LTE-Signal-Strength-Values
const RSSIQualityBadge = (rssi) => {
  let rssiInt = parseInt(rssi);
  if (rssiInt > -65) {
    return (
      <Badge variant="solid" colorScheme="green">
        Excellent
      </Badge>
    );
  } else if (rssiInt < -65 && rssiInt >= -75) {
    return (
      <Badge variant="solid" colorScheme="yellow">
        Good
      </Badge>
    );
  } else if (rssiInt < -75 && rssiInt > -85) {
    return (
      <Badge variant="solid" colorScheme="orange">
        Fair
      </Badge>
    );
  } else if (rssiInt < -85) {
    return (
      <Badge variant="solid" colorScheme="red">
        Poor
      </Badge>
    );
  }
};
// LTE https://support.cel-fi.com/hc/en-us/articles/1260805036129-Understanding-LTE-Signal-Strength-Values
const RSRPQualityBadge = (rsrp) => {
  let rsrpInt = parseInt(rsrp);
  if (rsrpInt > -84) {
    return (
      <Badge variant="solid" colorScheme="green">
        Excellent
      </Badge>
    );
  } else if (rsrpInt <= -85 && rsrpInt >= -75) {
    return (
      <Badge variant="solid" colorScheme="yellow">
        Good
      </Badge>
    );
  } else if (rsrpInt <= -103 && rsrpInt >= -111) {
    return (
      <Badge variant="solid" colorScheme="orange">
        Fair
      </Badge>
    );
  } else if (rsrpInt < -111) {
    return (
      <Badge variant="solid" colorScheme="red">
        Poor
      </Badge>
    );
  }
};
// LTE https://support.cel-fi.com/hc/en-us/articles/1260805036129-Understanding-LTE-Signal-Strength-Values
const RSRQQualityBadge = (rsrq) => {
  let rsrqInt = parseInt(rsrq);
  if (rsrqInt > -5) {
    return (
      <Badge variant="solid" colorScheme="green">
        Excellent
      </Badge>
    );
  } else if (rsrqInt >= -9 && rsrqInt <= -5) {
    return (
      <Badge variant="solid" colorScheme="yellow">
        Good
      </Badge>
    );
  } else if (rsrqInt >= -12 && rsrqInt <= -9) {
    return (
      <Badge variant="solid" colorScheme="orange">
        Fair
      </Badge>
    );
  } else if (rsrqInt < -12) {
    return (
      <Badge variant="solid" colorScheme="red">
        Poor
      </Badge>
    );
  }
};
const DeviceNetworkLte = ({ lte }) => {
  return (
    <>
      <Tr>
        <Td w={10}>RSSI</Td>
        <Td w={1}>:</Td>
        <Td textAlign="start">
          {lte.rssi} {RSSIQualityBadge(lte.rssi)}
        </Td>
      </Tr>
      <Tr>
        <Td w={10}>RSRP</Td>
        <Td w={1}>:</Td>
        <Td textAlign="start">
          {lte.rsrp} {RSRPQualityBadge(lte.rsrp)}
        </Td>
      </Tr>
      <Tr>
        <Td w={10}>RSRQ</Td>
        <Td w={1}>:</Td>
        <Td textAlign="start">
          {lte.rsrq} {RSRQQualityBadge(lte.rsrq)}
        </Td>
      </Tr>
      <Tr>
        <Td w={10}>RSSNR</Td>
        <Td w={1}>:</Td>
        <Td textAlign="start">
          {lte.rssnr}
        </Td>
      </Tr>
      <Tr>
        <Td w={10}>CQI</Td>
        <Td w={1}>:</Td>
        <Td textAlign="start">
          {lte.cqi}
        </Td>
      </Tr>
      <Tr>
        <Td w={10}>TA</Td>
        <Td w={1}>:</Td>
        <Td textAlign="start">
          {lte.ta}
        </Td>
      </Tr>
      <Tr>
        <Td w={10}>Level</Td>
        <Td w={1}>:</Td>
        <Td textAlign="start">
          {lte.level}
        </Td>
      </Tr>
    </>
  );
};
DeviceNetworkLte.propTypes = {
  lte: PropTypes.shape({
    rssi: PropTypes.string,
    rsrp: PropTypes.string,
    rsrq: PropTypes.string,
    rssnr: PropTypes.string,
    cqiTableIndex: PropTypes.string,
    cqi: PropTypes.string,
    ta: PropTypes.string,
    level: PropTypes.string,
    parametersUseForLevel: PropTypes.string,
  }).isRequired,
};
export default DeviceNetworkLte;
