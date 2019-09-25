import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";

const LoginPrompt = () => (
  <Modal trigger={<Button>Add a Question</Button>} basic size="small">
    <Header icon="warning" content="Adding a question" />
    <Modal.Content>
      <p>
        Adding a question would required our users to Login, if you don't have
        an account with us, please register first.
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color="green" inverted as={Link} to="/login">
        <Icon name="sign in" /> Login
      </Button>
      <Button color="green" inverted as={Link} to="/register">
        <Icon name="signup" /> Register
      </Button>
    </Modal.Actions>
  </Modal>
);

export default LoginPrompt;
