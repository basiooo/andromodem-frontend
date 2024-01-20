import { Tooltip } from "@chakra-ui/react"
import { FaInfoCircle } from "react-icons/fa";

export const RootTooltip = ()=>{
    
    return(
        <Tooltip label='xxx'>
            <FaInfoCircle/>
        </Tooltip>
    )
}