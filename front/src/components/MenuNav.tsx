import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { userAtom } from "@atom/user";
import { isLoginModalAtom, isLogoutModalAtom } from "@atom/atom";
import { UserNavProps } from "./layout/Nav";
import { motion, AnimatePresence, useScroll, useAnimation } from "framer-motion";

export default function MenuNav({
  setIsMenuNav,
  isLogin,
}: {
  setIsMenuNav: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
}) {
  const navMenus = ["home", "about", "dodream", "greencrew", "review", "logout"];
  const navKorMenus = ["홈", "소개", "산책로", "모임", "후기", "로그아웃"];
  const setIsLoginModalAtom = useSetRecoilState(isLoginModalAtom);
  const setIsLogoutModalAtom = useSetRecoilState(isLogoutModalAtom);
  const { pathname } = useLocation();
  const handleClickLogin = async () => {
    setIsLoginModalAtom(true);
    setIsMenuNav(false);
  };
  const menuVariants = {
    visible: { x: 0 },
    hidden: {
      x: 200,
      transition: {
        type: "tween",
      },
    },
  };
  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  };

  return (
    <AnimatePresence>
      <UserNavWrapper
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        exit={{ x: 200 }}
        transition={{ type: "tween", duration: 0.4 }}
      >
        {navMenus.map((menu, index) =>
          menu === "logout" ? (
            isLogin && (
              <Button
                onClick={() => {
                  setIsMenuNav(false);
                  setIsLogoutModalAtom(true);
                }}
              >
                {navKorMenus[index]}
              </Button>
            )
          ) : (
            <Link key={index} to={menu === "home" ? "/" : menu}>
              <Button onClick={() => setIsMenuNav(false)}>{navKorMenus[index]}</Button>
            </Link>
          ),
        )}
      </UserNavWrapper>
    </AnimatePresence>
  );
}

const UserNavWrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 0px;
  top: 0px;
  height: 100vh;
  background: white;
  width: 200px;
  background-color: ${props => props.theme.mainColor};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const Button = styled.button`
  min-width: 180px;
  &:not(last-child) {
    border-bottom: solid 1px ${props => props.theme.accentColor};
  }
`;
const BtnText = styled(motion.p)``;
