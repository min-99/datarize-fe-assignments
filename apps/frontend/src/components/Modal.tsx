import styled from 'styled-components'

export interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, handleClose, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <SOverlayModal>
      <SContentModal>
        <SCloseButtonModal onClick={handleClose}>&times;</SCloseButtonModal>
        {children}
      </SContentModal>
    </SOverlayModal>
  )
}

const SOverlayModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const SContentModal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
`

const SCloseButtonModal = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

export default Modal
