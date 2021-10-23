import React, { Component } from 'react'
import { Input, Menu, Form } from 'semantic-ui-react'


export default class PreferencesBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <Menu secondary>

            {/* <Image src="static/img/frontpage-logo.jpg" class="center-logo"> */}

            <Menu.Item
            name='Name of Website'
            active={activeItem === 'Name of Website'}
            onClick={this.handleItemClick}
            />

            <Menu.Menu position='right'>
                <Menu.Item>
                    <Form.Field>
                        <label>Start date </label>
                        <Input placeholder='Start date' />
                    </Form.Field>
                </Menu.Item>
            
            <Menu.Item>
                <Form.Field>
                    <label>End date </label>
                    <Input placeholder='End date' />
                </Form.Field>
            </Menu.Item>

            <Menu.Item>
                <Form.Field>
                    <label>Start location </label>
                    <Input placeholder='Start location' />
                </Form.Field>
            </Menu.Item>
            
            {/* <Menu.Item>
                <Form.Input fluid label='End date' placeholder='End date' />
            </Menu.Item> */}
            
            {/* <Menu.Item>
                <Input icon='search' placeholder='Start Location' />
            </Menu.Item> */}

            </Menu.Menu>
        </Menu>
    )
  }
}
