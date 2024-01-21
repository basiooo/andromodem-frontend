import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
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
import { MdOutlineMobiledataOff, MdOutlineSignalWifi4Bar } from "react-icons/md";
import { CONNECTION_STATE } from "../utils/const";
import { LuRefreshCw } from "react-icons/lu";
import { getBaseUrl } from "../utils/utils";

const DeviceNetwork = () => {
  const { device } = useDevice();
  const [deviceNetwork, setDeviceNetwork] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const fetchData = async (is_refresh=true) => {
    try {
      if (device) {
        setLoading(true)
        const response = await fetch(
          `${getBaseUrl()}/api/network/${device}`
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
          if(!is_refresh){
            setDeviceNetwork(undefined);
          }
        } else {
          setDeviceNetwork(data);
        }
      }
    } catch (error) {
      if(!is_refresh){
        setDeviceNetwork(undefined);
      }
      console.error("Error fetching data:", error);
    }
    finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, [device]);

  const handleRefresh = () => {
    const id = "refresh_device_network";
    if (!toast.isActive(id)) {
      toast({
        isClosable: true,
        id,
        title: "Refreshing Device Network",
      });
    }
    fetchData();
  };
  return (
    <>
      {deviceNetwork && device ? (
        <Card mt={10} boxShadow="lg">
        <CardHeader borderBottom="1px">
            <Flex spacing='4'>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Heading size="md">Device Info</Heading>
              </Flex>
              <Tooltip label="Refresh Device Network">
                <IconButton
                  aria-label="Refresh"
                  isRound={true}
                  isLoading={loading}
                  onClick={handleRefresh}
                  icon={<LuRefreshCw />}
                />
            </Tooltip>
            </Flex>
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
