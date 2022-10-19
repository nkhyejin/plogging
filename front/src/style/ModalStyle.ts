import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalWrap = styled.div`
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalContainer = styled(motion.form)<{ width?: string; height?: string }>`
  position: relative;
  z-index: 1000;
  width: ${props => (props.width ? props.width : "600px")};
  height: ${props => (props.height ? props.height : "570px")};
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  align-items: center;
 
`;
export const ModalTitle = styled.h1`
  margin-top: 70px;
  margin-bottom: 28px;
  font-size: 28px;
  color: ${props => props.theme.mainColor};
`;
export const ModalDesc = styled.p`
  display: flex;
  font-size: 24px;
  color: ${props => props.theme.textColor};
  margin-bottom: 18px;
`;
export const ModalAccent = styled.h1`
  color: ${props => props.theme.mainColor};
`;
export const ModalBtnContainer = styled.div`
  display: flex;
  width: 230px;
  justify-content: space-between;
`;
export const Overlay = styled(motion.div)`
  z-index: 100;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;
