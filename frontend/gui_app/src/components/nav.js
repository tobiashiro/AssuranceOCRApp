import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

function Nav(props) {
  const logged_out_nav = (
    <ul>
      <li onClick={() => props.display_form('login')}>login</li>
      <li onClick={() => props.display_form('signup')}>signup</li>
    </ul>
  );

  const logged_in_nav = (
    <ul>
      <Button onClick={props.handle_logout}>wyloguj</Button>
    </ul>
  );
  return <button>{logged_in_nav}</button>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};