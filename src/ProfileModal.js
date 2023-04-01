import * as React from "react";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";

export default function ProfileModal() {
    const [visible, setVisible] = React.useState(false);
    return (
      <Modal
        onDismiss={() => setVisible(false)}
        visible={visible}
        closeAriaLabel="Close modal"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link">Cancel</Button>
              <Button variant="primary">Ok</Button>
            </SpaceBetween>
          </Box>
        }
        header="Modal title"
      >
        Your description should go here
      </Modal>
    );
}
