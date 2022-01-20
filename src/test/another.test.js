import { mount } from 'enzyme';
import * as React from 'react';
import Modal_window from '../component/navbar/modal'
// import ModalManager from '@restart/ui/ModalManager';
import {Modal} from 'react-bootstrap';
import 'chai/register-should';


describe('<Modal>', () => {
  afterEach(() => {
    // make sure the dangling portal elements get cleaned up
    document.body.innerHTML = '';
  });

  it('Should forward ref to BaseModal', () => {
    const noOp = () => {};
    const ref = React.createRef();
    mount(
        <Modal_window show onHide={noOp}  />
    //   <Modal show onHide={noOp} animation={false} ref={ref}>
    //     <strong>Message</strong>
    //   </Modal>,
    );
    ref.current.dialog.should.exist;
  });
});