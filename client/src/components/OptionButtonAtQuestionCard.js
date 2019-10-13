import React from "react";
import { Grid, Header, Dropdown, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default ({ link }) => {
  return (
    <Grid>
      <Grid.Column floated="right" width={1}>
        <Header>
          <Header.Content>
            <Dropdown
              item
              direction="left"
              size="small"
              icon="ellipsis vertical"
              style={{ color: "blue" }}
            >
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={link}>
                  <Icon name="expand" color="blue" />
                  Open Question Page
                </Dropdown.Item>
                <Dropdown.Item
                  target="_blank"
                  as="a"
                  href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmiqa.herokuapp.com%2F${link}&amp;src=sdkpreparse`}
                >
                  <Icon name="facebook" fitted color="blue">
                    {" "}
                    Share
                  </Icon>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Header.Content>
        </Header>
      </Grid.Column>
    </Grid>
  );
};
