import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  InputGroup,
  InputRightElement,
  Select,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { useDevice } from "../hooks/useDevice";
import { BASE_URL } from "../utils/config";

const DeviceSelector = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setDevice } = useDevice();
  const toast = useToast();

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/api/devices/`);
      const data = await response.json();
      setDevices(data.devices);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false)
    }
  };
  const handleSelectChange = (selected) => {
    setDevice(selected.target.value);
  };

  const handleRefresh = () => {
    const id = "reload_device";
    if (!toast.isActive(id)) {
      toast({
        isClosable: true,
        id,
        title: "Refreshing Devices",
      });
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader borderBottom="1px">
        <Heading size="md">Select Device</Heading>
      </CardHeader>
      <CardBody>
        <InputGroup size="lg">
          <Select
            placeholder="Select Device"
            onChange={(value) => handleSelectChange(value)}
            disabled={loading}
          >
            {devices.map((device) => (
              <option key={device.serial} value={device.serial} disabled={device.state != "online"}>
                {`${device.model}/${device.serial} (${device.state})`}
              </option>
            ))}
          </Select>
          <InputRightElement width="4.5rem">
            <Tooltip label="Refresh">
              <IconButton
                aria-label="Refresh"
                isRound={true}
                isLoading={loading}
                onClick={handleRefresh}
                icon={<LuRefreshCw />}
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      </CardBody>
    </Card>
  );
};

export default DeviceSelector