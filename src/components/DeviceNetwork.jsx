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
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDevice } from "../hooks/useDevice";
import { TbMobiledata } from "react-icons/tb";
import DeviceNetworkWifi from "./DeviceNetworkWifi";
import DeviceNetworkCarrier from "./DeviceNetworkCarrier";
import { BASE_URL } from "../utils/config";
import { MdOutlineMobiledataOff, MdOutlineSignalWifi4Bar } from "react-icons/md";
import { CONNECTION_STATE } from "../utils/const";

const DeviceNetwork = () => {
  const { device } = useDevice();
  const [deviceNetwork, setDeviceNetwork] = useState();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (device) {
          const response = await fetch(
            `${BASE_URL}/api/network/${device}`
          );
          const data = await response.json();
          if (response.status !== 200) {
            if (!toast.isActive("failed-get-device")) {
              toast({
                id: "failed-get-device",
                title: `Failed Get Device.`,
                status: "error",
                description: data.error ?? "Unknown Error",
                isClosable: true,
              })
            }
            setDeviceNetwork(undefined);
          } else {
            setDeviceNetwork(data);
          }
        }
      } catch (error) {
        setDeviceNetwork(undefined);
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
                  deviceNetwork.carriers.map((carrier) => (
                    <Tab key={carrier.name}>
                      {carrier.name}
                      {(carrier.connection_state == CONNECTION_STATE.CONNECTED || carrier.connection_state == CONNECTION_STATE.CONNECTING) ?
                        <Tooltip shouldWrapChildren label={deviceNetwork.wifi.connected ? `mobile data is ${carrier.connection_state} but not used when wifi is connected` : carrier.connection_state}>
                          {deviceNetwork.wifi.connected ? <MdOutlineMobiledataOff color="red" fontSize={23} /> : <TbMobiledata color="green" fontSize={23} />}
                        </Tooltip> :
                        ""
                      }
                    </Tab>
                  ))
                }
                <Tab>Wifi {deviceNetwork.wifi.connected ? <Tooltip label="Connected" shouldWrapChildren><MdOutlineSignalWifi4Bar color="green" fontSize={23} /></Tooltip> : ""}</Tab>
              </TabList>
              <TabPanels>
                {
                  deviceNetwork.carriers.map((carrier) => (
                    <TabPanel key={carrier.name}>
                      <DeviceNetworkCarrier carrier={carrier} />
                    </TabPanel>
                  ))
                }
                <TabPanel>
                  <DeviceNetworkWifi wifi={deviceNetwork.wifi} />
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
