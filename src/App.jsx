import { ChakraProvider, Container } from "@chakra-ui/react";
import { DeviceProvider } from "./contexts/DeviceContext";
import DeviceInfo from "./components/DeviceInfo";
import DeviceSelector from "./components/DeviceSelector";
import DeviceNetwork from "./components/DeviceNetwork";

export default function App() {
  return (
    <ChakraProvider>
      <DeviceProvider>
        <Container
          mt={10}
          maxW={{ base: "100%", sm: "70%", md: "60%", lg: "50%" }}
          mx="auto"
        >
          <DeviceSelector />
          <DeviceInfo />
          <DeviceNetwork/>
        </Container>
      </DeviceProvider>
    </ChakraProvider>
  );
}
