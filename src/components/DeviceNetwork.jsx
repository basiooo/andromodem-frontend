import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDevice } from "../hooks/useDevice";
import { TbMobiledata } from "react-icons/tb";
import DeviceNetworkWifi from "./DeviceNetworkWifi";
import DeviceNetworkCarrier from "./DeviceNetworkCarrier";
import { BASE_URL } from "../utils/config";

const DeviceNetwork = () => {
  const { device } = useDevice();
  const [deviceNetwork, setDeviceNetwork] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (device) {
          const response = await fetch(
            `${BASE_URL}/api/network/${device}`
          );
          const data = await response.json();
          setDeviceNetwork(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [device]);

  return (
    <>
      {deviceNetwork && device ? (
        <Card mt={10} boxShadow="lg">
          <CardHeader borderBottom="1px">
            <Heading size="md">Network Info</Heading>
          </CardHeader>
          <CardBody>
            <Tabs>
              <TabList>
                {
                    deviceNetwork.carriers.map((carrier)=>(
                        <Tab key={carrier.name}>{carrier.name} {(carrier.connection_state == "Connected" || carrier.connection_state == "Connecting") && !deviceNetwork.wifi.connected? <TbMobiledata color="green" fontSize={23}/>:""}</Tab>
                    ))
                }
                <Tab>Wifi {deviceNetwork.wifi.connected? <TbMobiledata color="green" fontSize={23}/>:""}</Tab>
              </TabList>
              <TabPanels>
                {
                    deviceNetwork.carriers.map((carrier)=>(
                        <TabPanel key={carrier.name}>
                            <DeviceNetworkCarrier carrier={carrier}/>
                        </TabPanel>
                    ))
                }
                <TabPanel>
                    <DeviceNetworkWifi wifi={deviceNetwork.wifi}/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};
export default DeviceNetwork;
