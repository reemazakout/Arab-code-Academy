import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

export const AuthRequiredModal = ({
  isOpen,
  onClose,
  onSignIn,
}: AuthRequiredModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>التسجيل مطلوب</ModalHeader>
        <ModalBody>يجب عليك تسجيل الدخول لإضافة الأدوات إلى المفضلة.</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onSignIn}>
            تسجيل الدخول
          </Button>
          <Button variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
