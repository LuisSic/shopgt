import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu } from 'mdbreact';
interface Props {
  children: React.ReactNode;
  ropdownToggle: string;
}
const Dropdown = ({ children, ropdownToggle }: Props) => {
  return (
    <MDBDropdown>
      <MDBDropdownToggle
        caret
        color="default"
        style={{ margin: '15px 0px 20px 0px' }}
      >
        {ropdownToggle}
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>{children}</MDBDropdownMenu>
    </MDBDropdown>
  );
};

export default Dropdown;
