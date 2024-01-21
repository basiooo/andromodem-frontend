import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  List,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDevice } from "../hooks/useDevice";
import { FaBuilding } from "react-icons/fa";
import { BsFillPhoneFill } from "react-icons/bs";
import { CiBatteryFull } from "react-icons/ci";
import { LiaIdCard } from "react-icons/lia";
import { ImAndroid } from "react-icons/im";
import { GiRobberMask } from "react-icons/gi";
import DeviceInfoListItem from "./DeviceInfoListItem";
import { BASE_URL } from "../utils/config";

const DeviceInfo = () => {
  const { device } = useDevice();
  const [deviceInfo, setDeviceInfo] = useState();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (device) {
          const response = await fetch(
            `${BASE_URL}/api/device/${device}`
          );
          const data = await response.json();
          if (response.status !== 200){
            if(!toast.isActive("failed-get-device")){
              toast({
                id:"failed-get-device",
                title: `Failed Get Device.`,
                status: "error",
                description: data.error?? "Unknown Error",
                isClosable: true,
              })
            }
            setDeviceInfo(undefined);
          }else{
            setDeviceInfo(data);
          }
        }
      } catch (error) {
        setDeviceInfo(undefined);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [device]);

  return (
    <>
      {device && deviceInfo ? (
        <Card mt={10} boxShadow="lg">
          <CardHeader borderBottom="1px">
            <Heading size="md">Device Info</Heading>
          </CardHeader>
          <CardBody paddingX={{ base: 10 }}>
            <Grid templateColumns={{ base: "1fr",sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }}  gap={6}>
              <GridItem w="100%">
                <List spacing={3}>
                  <DeviceInfoListItem icon={FaBuilding} label="Brand" value={deviceInfo?.brand}/>
                  <DeviceInfoListItem icon={LiaIdCard} label="Codename" value={deviceInfo?.name}/>
                  <DeviceInfoListItem icon={BsFillPhoneFill} label="Model" value={deviceInfo?.model}/>
                </List>
              </GridItem>
              <GridItem w="100%">
                <List spacing={3}>
                  <DeviceInfoListItem icon={ImAndroid} label="Android" value={deviceInfo?.android_version}/>
                  <DeviceInfoListItem icon={CiBatteryFull} label="Battery Level" value={deviceInfo?.battery_level}/>
                  <DeviceInfoListItem icon={GiRobberMask} label="Root" value={deviceInfo.root.is_rooted ? <>Rooted ({deviceInfo?.root.name}:{deviceInfo?.root.version})</> : "Not Rooted"}/>
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
