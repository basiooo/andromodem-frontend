import { ListIcon, ListItem, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types'

const DeviceInfoListItem = ({ icon, label, value }) => {
  return (
    <ListItem>
      <ListIcon as={icon} fontSize="20px" />
      <Text display="inline" as="b" fontSize="19">
        {label}
      </Text>
      <Text as="b" display="block">
        {value}
      </Text>
    </ListItem>
  );
};
DeviceInfoListItem.propTypes = {
    icon: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired
}
export default DeviceInfoListItem;
