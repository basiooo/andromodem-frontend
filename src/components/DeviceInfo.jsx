import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  List,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDevice } from "../hooks/useDevice";
import { FaBuilding } from "react-icons/fa";
import { BsFillPhoneFill, BsThreeDotsVertical } from "react-icons/bs";
import { CiBatteryFull } from "react-icons/ci";
import { LiaIdCard } from "react-icons/lia";
import { ImAndroid } from "react-icons/im";
import { GiRobberMask } from "react-icons/gi";
import DeviceInfoListItem from "./DeviceInfoListItem";
import { LuRefreshCw } from "react-icons/lu";
import { getBaseUrl } from "../utils/utils";

const DeviceInfo = () => {
  const { device } = useDevice();
  const [deviceInfo, setDeviceInfo] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const fetchData = async (is_refresh=true) => {
    try {
      if (device) {
        setLoading(true)
        const response = await fetch(
          `${getBaseUrl()}/api/device/${device}`
        );
        const data = await response.json();
        if (response.status !== 200) {
          if (!toast.isActive("failed-get-device")) {
            toast({
              id: "failed-get-device",
              title: `Failed Refresing Device Info.`,
              status: "error",
              description: data.error ?? "Unknown Error",
              isClosable: true,
            })
          }
          if(!is_refresh){
            setDeviceInfo(undefined);
          }
        } else {
          setDeviceInfo(data);
        }
      }
    } catch (error) {
      if(!is_refresh){
        setDeviceInfo(undefined);
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
    const id = "refresh_device_info";
    if (!toast.isActive(id)) {
      toast({
        isClosable: true,
        id,
        title: "Refreshing Device Info",
      });
    }
    fetchData();
  };
  return (
    <>
      {device && deviceInfo ? (
        <Card mt={10} boxShadow="lg">
          <CardHeader borderBottom="1px">
            <Flex spacing='4'>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Heading size="md">Device Info</Heading>
              </Flex>
              <Tooltip label="Refresh Device Info">
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
          <CardBody paddingX={{ base: 10 }}>
            <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }} gap={6}>
              <GridItem w="100%">
                <List spacing={3}>
                  <DeviceInfoListItem icon={FaBuilding} label="Brand" value={deviceInfo?.brand} />
                  <DeviceInfoListItem icon={LiaIdCard} label="Codename" value={deviceInfo?.name} />
                  <DeviceInfoListItem icon={BsFillPhoneFill} label="Model" value={deviceInfo?.model} />
                </List>
              </GridItem>
              <GridItem w="100%">
                <List spacing={3}>
                  <DeviceInfoListItem icon={ImAndroid} label="Android" value={deviceInfo?.android_version} />
                  <DeviceInfoListItem icon={CiBatteryFull} label="Battery Level" value={deviceInfo?.battery_level} />
                  <DeviceInfoListItem icon={GiRobberMask} label="Root" value={deviceInfo.root.is_rooted ? <>Rooted ({deviceInfo?.root.name}:{deviceInfo?.root.version})</> : "Not Rooted"} />
                </List>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};
export default DeviceInfo;
