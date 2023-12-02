import { Modal } from 'antd';

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title="Modal"
      // eslint-disable-next-line no-restricted-globals
      open={open}
      // eslint-disable-next-line no-undef
      onOk={performAction}
      // eslint-disable-next-line no-undef
      onCancel={hideModal}
      okText="OK"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};
export default CustomModal;
