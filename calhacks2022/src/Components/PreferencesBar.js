import React, { Component } from 'react'
import { Input, Menu, Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class PreferencesBar extends Component {
  state = { 
      startDate: '',
      endDate: '',
    }


  render() {
    const { } = this.state
    
    return (
        <Menu secondary>

            {/* <Image src="static/img/frontpage-logo.jpg" class="center-logo"> */}

            <Menu.Item
                name='Name of Website'
            />

            <Menu.Menu position='right'>
                <Menu.Item>
                    <label>Start date </label>
                    <form onSubmit={ this.onFormSubmit }>
                        <div className="form-group">
                        <DatePicker
                            selected={ this.state.startDate }
                            onChange={(startVal) => {
                                this.props.startDate(startVal)
                                this.setState({
                                    startDate: startVal,
                                  });
                            }}
                            name="startDate"
                            dateFormat="yyyy-MM-dd"
                        />
                        </div>
                    </form>
                </Menu.Item>
            
            <Menu.Item>
            <Menu.Item>
                    <label>End date </label>
                    <form onSubmit={ this.onFormSubmit }>
                        <div className="form-group">
                        <DatePicker
                            selected={ this.state.endDate }
                            onChange={(endVal) => {
                                this.props.endDate(endVal)
                                this.setState({
                                    endDate: endVal,
                                  });
                            }}
                            name="endDate"
                            dateFormat="yyyy-MM-dd"
                        />
                        </div>
                    </form>
                </Menu.Item>
            </Menu.Item>

            <Menu.Item>
                <Form.Field>
                    <label>Start location </label>
                    <Input placeholder='Start location' />
                </Form.Field>
            </Menu.Item>

            </Menu.Menu>
        </Menu>
    )
  }
}
