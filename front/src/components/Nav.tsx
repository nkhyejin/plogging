import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useRoutes } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";

const Wrap = styled(motion.nav)`
    z-index: 1000;
    display: flex;
    position: fixed;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    margin-bottom: 60px;
`;
const Col = styled.div`
    display: flex;
    align-items: center;
`;
const Items = styled.ul`
    display: flex;
    align-items: center;
`;
const Logo = styled(motion.svg)`
    width: 300px;
    margin-top: 5px;
`;
const Item = styled.li`
    position: relative;
    padding: 10px;
    display: flex;
    justify-content: center;
    color: #618872;
`;
const CurCircle = styled(motion.div)`
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    bottom: -3px;
    background-color: rgba(0, 128, 55, 1);
`;
const SearchBox = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
`;
const Magnifify = styled(motion.svg)`
    z-index: 10;
`;
const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 50px;
    text-align: center;
    height: 30px;
    border-radius: 15px;
    border: none;
`;
// Variants
const LogoVariants = {
    normal: {
        fill: "rgba(0, 128, 55,1)",
    },
    active: {
        fill: "rgb(0,0,0)",
    },
};
const navVariants = {
    top: {
        backgroundColor: "rgba(0, 128, 55,0)",
    },
    scroll: {
        backgroundColor: "rgba(0, 128, 55,0.1)",
    },
};

// Interface
interface SearchForm {
    keyword: string;
}
export default function Nav() {
    const { pathname } = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();
    const [curState, setCurState] = useState(pathname === "/" ? "home" : pathname.slice(1));
    const { register, handleSubmit, reset } = useForm<SearchForm>();
    const { scrollY } = useScroll();
    const navAnimation = useAnimation();
    const navMenus = ["home", "about", "map"];
    const navKorMenus = ["홈", "소개", "지도"];

    console.log(curState);

    const onvalid = (data: SearchForm) => {
        navigate(`/search?keyword=${data.keyword}`);
        console.log(data);
    };
    const toggleSearch = () => setSearchOpen((cur) => !cur);
    useEffect(() => {
        scrollY.onChange(() => {
            // console.log(scrollY.get());
            if (scrollY.get() > 80) {
                navAnimation.start("scroll");
            } else {
                navAnimation.start("top");
            }
        });
    }, []);
    useEffect(() => {
        console.log(pathname);
        // setCurState();
    }, [pathname]);
    return (
        <Wrap variants={navVariants} initial="top" animate={navAnimation}>
            <Col>
                <Link to="/">
                    <Logo
                        onClick={() => setCurState("home")}
                        variants={LogoVariants}
                        initial="normal"
                        whileHover="active"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 375 374.999991"
                    >
                        <defs>
                            <g />
                            <clipPath id="ea2f4ca703">
                                <path
                                    d="M 83.144531 162.394531 L 124.394531 162.394531 L 124.394531 203.644531 L 83.144531 203.644531 Z M 83.144531 162.394531 "
                                    clip-rule="nonzero"
                                />
                            </clipPath>
                        </defs>
                        <g clip-path="url(#ea2f4ca703)">
                            <motion.path
                                fill="rgba(0, 128, 55,1)"
                                d="M 103.769531 162.394531 C 109.464844 162.394531 114.625 164.703125 118.355469 168.4375 C 122.089844 172.167969 124.394531 177.324219 124.394531 183.019531 C 124.394531 188.714844 122.089844 193.875 118.355469 197.605469 C 118.140625 197.820312 117.917969 198.03125 117.691406 198.238281 L 117.691406 194.988281 C 120.457031 191.769531 122.128906 187.589844 122.128906 183.019531 C 122.128906 177.949219 120.074219 173.359375 116.75 170.039062 C 113.429688 166.71875 108.839844 164.664062 103.769531 164.664062 C 98.703125 164.664062 94.113281 166.71875 90.789062 170.039062 C 87.46875 173.359375 85.414062 177.949219 85.414062 183.019531 C 85.414062 188.089844 87.46875 192.679688 90.789062 196 C 91.214844 196.421875 91.652344 196.824219 92.117188 197.203125 L 92.117188 188.925781 L 92.121094 188.925781 C 92.121094 188.585938 92.273438 188.253906 92.558594 188.027344 L 101.238281 181.34375 C 101.023438 181.261719 100.808594 181.167969 100.597656 181.0625 C 99.578125 180.5625 98.5625 179.84375 97.644531 178.925781 C 96.730469 178.015625 96.007812 176.992188 95.511719 175.976562 C 94.976562 174.882812 94.699219 173.78125 94.714844 172.789062 C 94.71875 172.175781 95.21875 171.683594 95.832031 171.671875 C 96.824219 171.660156 97.921875 171.9375 99.015625 172.46875 C 99.425781 172.671875 99.835938 172.90625 100.238281 173.179688 C 100.289062 171.78125 100.535156 170.464844 100.933594 169.304688 C 101.414062 167.910156 102.121094 166.730469 102.984375 165.890625 C 103.421875 165.464844 104.121094 165.464844 104.558594 165.890625 L 104.5625 165.894531 C 105.421875 166.730469 106.128906 167.910156 106.605469 169.304688 C 107.003906 170.464844 107.25 171.78125 107.300781 173.179688 C 107.703125 172.90625 108.117188 172.671875 108.523438 172.46875 C 109.617188 171.9375 110.722656 171.660156 111.710938 171.671875 C 112.328125 171.683594 112.820312 172.179688 112.828125 172.789062 C 112.839844 173.78125 112.566406 174.882812 112.03125 175.976562 C 111.53125 176.992188 110.8125 178.015625 109.894531 178.925781 C 108.980469 179.84375 107.960938 180.5625 106.945312 181.0625 C 106.730469 181.167969 106.515625 181.261719 106.304688 181.34375 L 114.910156 187.972656 C 115.21875 188.175781 115.425781 188.527344 115.425781 188.925781 L 115.425781 200.039062 C 113.3125 201.488281 110.917969 202.554688 108.339844 203.136719 L 108.339844 203.160156 L 107.582031 203.292969 C 107.105469 203.382812 106.621094 203.457031 106.132812 203.511719 L 106.105469 203.515625 L 106.078125 203.515625 L 106.046875 203.519531 L 105.90625 203.535156 L 105.851562 203.542969 L 105.792969 203.546875 L 105.765625 203.550781 L 105.734375 203.550781 L 105.707031 203.554688 L 105.59375 203.566406 L 105.566406 203.570312 L 105.507812 203.570312 L 105.425781 203.582031 L 105.398438 203.582031 L 105.367188 203.585938 L 105.3125 203.585938 L 105.28125 203.589844 L 105.253906 203.59375 L 105.226562 203.59375 L 105.199219 203.597656 L 105.171875 203.597656 L 105.140625 203.601562 L 105.113281 203.601562 L 105.058594 203.605469 L 105.027344 203.605469 L 105 203.609375 L 104.96875 203.609375 L 104.941406 203.613281 L 104.914062 203.613281 L 104.898438 203.617188 L 104.859375 203.617188 L 104.828125 203.621094 L 104.714844 203.621094 L 104.707031 203.625 L 104.65625 203.625 L 104.628906 203.628906 L 104.570312 203.628906 L 104.542969 203.632812 L 104.488281 203.632812 L 104.460938 203.636719 L 104.257812 203.636719 L 104.238281 203.640625 L 104.113281 203.640625 L 104.058594 203.644531 L 103.476562 203.644531 L 103.453125 203.640625 L 103.3125 203.640625 L 103.28125 203.636719 L 103.085938 203.636719 L 103 203.632812 L 102.984375 203.632812 L 102.96875 203.628906 L 102.941406 203.628906 L 102.882812 203.625 L 102.855469 203.625 L 102.828125 203.621094 L 102.738281 203.621094 C 102.652344 203.617188 102.566406 203.609375 102.484375 203.605469 C 101.609375 203.550781 100.753906 203.445312 99.914062 203.285156 L 99.203125 203.160156 L 99.203125 192.664062 L 108.339844 192.664062 L 108.339844 200.804688 C 110.054688 200.367188 111.671875 199.683594 113.15625 198.800781 L 113.15625 189.476562 L 103.769531 182.25 L 94.386719 189.476562 L 94.386719 201.394531 C 93.792969 201.085938 93.214844 200.753906 92.65625 200.398438 L 92.640625 200.386719 L 92.628906 200.382812 L 92.625 200.378906 C 91.378906 199.578125 90.226562 198.644531 89.1875 197.605469 C 85.457031 193.875 83.144531 188.714844 83.144531 183.019531 C 83.144531 177.324219 85.457031 172.167969 89.1875 168.4375 C 92.921875 164.703125 98.074219 162.394531 103.769531 162.394531 Z M 101.226562 185.972656 L 103.457031 185.972656 L 103.457031 188.417969 L 101.011719 188.417969 L 101.011719 185.972656 Z M 104.296875 185.972656 L 106.53125 185.972656 L 106.53125 188.417969 L 104.085938 188.417969 L 104.085938 185.972656 Z M 106.53125 189.257812 L 106.53125 191.488281 L 104.085938 191.488281 L 104.085938 189.046875 L 106.53125 189.046875 Z M 103.246094 191.488281 L 101.011719 191.488281 L 101.011719 189.046875 L 103.457031 189.046875 L 103.457031 191.488281 Z M 101.46875 201.234375 C 101.65625 201.257812 101.839844 201.277344 102.027344 201.296875 L 102.050781 201.296875 L 102.058594 201.300781 L 102.089844 201.300781 L 102.113281 201.304688 L 102.144531 201.304688 L 102.164062 201.308594 L 102.171875 201.308594 L 102.269531 201.316406 L 102.292969 201.320312 L 102.296875 201.320312 L 102.320312 201.324219 L 102.390625 201.324219 L 102.417969 201.328125 L 102.445312 201.328125 L 102.46875 201.332031 L 102.480469 201.332031 L 102.496094 201.335938 L 102.519531 201.335938 L 102.539062 201.339844 L 102.621094 201.339844 L 102.644531 201.34375 L 102.671875 201.34375 L 102.695312 201.347656 L 102.746094 201.347656 L 102.773438 201.351562 L 102.796875 201.351562 L 102.824219 201.355469 L 102.847656 201.355469 L 102.875 201.359375 L 103 201.359375 L 103.027344 201.363281 L 103.078125 201.363281 L 103.105469 201.367188 L 103.179688 201.367188 L 103.207031 201.371094 L 103.308594 201.371094 L 103.328125 201.375 L 104.207031 201.375 L 104.234375 201.371094 L 104.335938 201.371094 L 104.34375 201.367188 L 104.386719 201.367188 L 104.464844 201.363281 L 104.515625 201.363281 L 104.539062 201.359375 C 104.628906 201.359375 104.714844 201.355469 104.804688 201.347656 L 104.820312 201.347656 L 104.949219 201.339844 L 104.953125 201.339844 C 105.105469 201.328125 105.257812 201.320312 105.410156 201.304688 C 105.628906 201.285156 105.851562 201.261719 106.070312 201.234375 L 106.070312 194.933594 L 101.46875 194.933594 Z M 103.765625 178.886719 L 103.769531 178.90625 L 103.78125 178.890625 L 103.785156 178.882812 L 103.796875 178.863281 L 103.796875 178.859375 L 103.808594 178.839844 L 103.816406 178.832031 L 103.820312 178.820312 L 103.832031 178.800781 L 103.84375 178.777344 L 103.851562 178.769531 L 103.855469 178.757812 L 103.867188 178.742188 L 103.871094 178.734375 L 103.882812 178.714844 L 103.890625 178.691406 L 103.902344 178.679688 L 103.917969 178.648438 L 103.953125 178.582031 L 103.964844 178.558594 L 103.96875 178.554688 L 104 178.492188 L 104 178.488281 C 104.171875 178.15625 104.328125 177.785156 104.464844 177.390625 C 104.832031 176.316406 105.042969 175.058594 105.042969 173.71875 C 105.042969 172.371094 104.832031 171.117188 104.464844 170.042969 C 104.273438 169.476562 104.039062 168.96875 103.769531 168.527344 C 103.503906 168.96875 103.269531 169.476562 103.078125 170.042969 C 102.707031 171.117188 102.496094 172.371094 102.496094 173.71875 C 102.496094 175.058594 102.707031 176.316406 103.078125 177.390625 C 103.191406 177.714844 103.3125 178.023438 103.453125 178.3125 L 103.460938 178.332031 L 103.464844 178.332031 L 103.472656 178.355469 L 103.476562 178.363281 L 103.488281 178.378906 L 103.492188 178.394531 L 103.523438 178.457031 L 103.53125 178.46875 L 103.539062 178.488281 L 103.542969 178.492188 L 103.574219 178.554688 L 103.574219 178.558594 L 103.589844 178.582031 L 103.59375 178.585938 L 103.609375 178.617188 L 103.613281 178.628906 L 103.625 178.648438 L 103.636719 178.671875 L 103.644531 178.679688 L 103.648438 178.691406 L 103.660156 178.710938 L 103.664062 178.714844 L 103.710938 178.800781 L 103.730469 178.832031 L 103.730469 178.839844 L 103.746094 178.859375 L 103.746094 178.863281 L 103.757812 178.882812 Z M 98.023438 174.5 C 97.746094 174.363281 97.46875 174.25 97.207031 174.164062 C 97.292969 174.433594 97.402344 174.707031 97.539062 174.984375 C 97.925781 175.773438 98.5 176.574219 99.25 177.324219 C 99.875 177.949219 100.542969 178.453125 101.203125 178.828125 C 101.105469 178.601562 101.015625 178.367188 100.933594 178.125 C 100.738281 177.554688 100.578125 176.941406 100.460938 176.304688 L 100.367188 176.207031 C 99.617188 175.460938 98.8125 174.886719 98.023438 174.5 Z M 110 174.984375 C 110.136719 174.707031 110.25 174.433594 110.339844 174.164062 C 110.070312 174.25 109.796875 174.363281 109.515625 174.5 C 108.730469 174.886719 107.925781 175.460938 107.179688 176.207031 L 107.082031 176.304688 C 106.964844 176.941406 106.804688 177.554688 106.605469 178.125 C 106.527344 178.367188 106.433594 178.601562 106.339844 178.828125 C 107.003906 178.453125 107.664062 177.949219 108.292969 177.324219 C 109.039062 176.574219 109.617188 175.773438 110 174.984375 Z M 110 174.984375 "
                                fill-opacity="1"
                                fill-rule="nonzero"
                            />
                        </g>
                        <g fill="rgba(0, 128, 55,1)" fill-opacity="1">
                            <g transform="translate(128.804424, 190.851859)">
                                <g>
                                    <motion.path d="M 8.21875 1.234375 L 8.21875 2.039062 L 26.753906 2.039062 L 26.753906 5.003906 L 2.59375 5.003906 L 2.59375 -1.574219 L 21.128906 -1.574219 L 21.128906 -2.410156 L 2.59375 -2.410156 L 2.59375 -5.375 L 11.863281 -5.375 L 11.863281 -7.011719 L 1.976562 -7.011719 L 1.976562 -11.183594 L 27.371094 -11.183594 L 27.371094 -7.011719 L 17.484375 -7.011719 L 17.484375 -5.375 L 26.753906 -5.375 L 26.753906 1.234375 Z M 2.316406 -20.542969 L 27.03125 -20.542969 L 27.03125 -16.992188 L 23.632812 -16.992188 L 23.632812 -15.847656 L 27.183594 -15.847656 L 27.183594 -12.296875 L 2.164062 -12.296875 L 2.164062 -15.847656 L 5.808594 -15.847656 L 5.808594 -16.992188 L 2.316406 -16.992188 Z M 11.429688 -15.847656 L 18.011719 -15.847656 L 18.011719 -16.992188 L 11.429688 -16.992188 Z M 11.429688 -15.847656 " />
                                </g>
                            </g>
                        </g>
                        <g fill="rgba(0, 128, 55,1)" fill-opacity="1">
                            <g transform="translate(158.150529, 190.851859)">
                                <g>
                                    <motion.path d="M 1.636719 -20.542969 L 6.734375 -20.542969 L 6.734375 -18.8125 L 12.046875 -18.8125 L 12.046875 -20.542969 L 17.144531 -20.542969 L 17.144531 -8.742188 L 1.636719 -8.742188 Z M 2.253906 -5.777344 L 11.585938 -5.777344 L 11.585938 -7.816406 L 17.207031 -7.816406 L 17.207031 -5.777344 L 26.566406 -5.777344 L 26.566406 -1.761719 L 15.785156 -1.761719 L 8.558594 4.851562 L 2.347656 4.851562 L 9.578125 -1.761719 L 2.253906 -1.761719 Z M 26.566406 -7.199219 L 20.945312 -7.199219 L 20.945312 -21.160156 L 26.566406 -21.160156 Z M 14.457031 0.679688 L 26.566406 0.679688 L 26.566406 4.851562 L 14.457031 4.851562 Z M 12.046875 -12.757812 L 12.046875 -14.796875 L 6.734375 -14.796875 L 6.734375 -12.757812 Z M 12.046875 -12.757812 " />
                                </g>
                            </g>
                        </g>
                        <g fill="rgba(0, 128, 55,1)" fill-opacity="1">
                            <g transform="translate(187.496634, 190.851859)">
                                <g>
                                    <motion.path d="M 16.835938 -20.542969 L 16.835938 4.851562 L 1.636719 4.851562 L 1.636719 -20.542969 Z M 25.484375 -11.027344 L 28.945312 -11.027344 L 28.945312 -6.550781 L 25.484375 -6.550781 L 25.484375 4.851562 L 19.863281 4.851562 L 19.863281 -21.160156 L 25.484375 -21.160156 Z M 7.042969 -16.0625 L 7.042969 0.371094 L 11.429688 0.371094 L 11.429688 -16.0625 Z M 7.042969 -16.0625 " />
                                </g>
                            </g>
                        </g>
                        <g fill="rgba(0, 128, 55,1)" fill-opacity="1">
                            <g transform="translate(216.84274, 190.851859)">
                                <g>
                                    <motion.path d="M 26.566406 -8.742188 L 20.945312 -8.742188 L 20.945312 -21.160156 L 26.566406 -21.160156 Z M 7.878906 0.371094 L 7.878906 1.484375 L 26.566406 1.484375 L 26.566406 4.851562 L 2.253906 4.851562 L 2.253906 -2.871094 L 20.945312 -2.871094 L 20.945312 -4.015625 L 2.253906 -4.015625 L 2.253906 -7.382812 L 26.566406 -7.382812 L 26.566406 0.371094 Z M 17.144531 -20.542969 L 17.144531 -8.742188 L 11.738281 -8.742188 L 11.738281 -16.0625 L 9.609375 -16.0625 L 6.179688 -8.742188 L 0.773438 -8.742188 L 6.300781 -20.542969 Z M 17.144531 -20.542969 " />
                                </g>
                            </g>
                        </g>
                    </Logo>
                </Link>
                <Items>
                    {navMenus.map((menu, index) => (
                        <Link key={index} to={menu === "home" ? "/" : menu}>
                            <Item onClick={() => setCurState(menu)}>
                                {navKorMenus[index]}
                                {curState === menu && <CurCircle layoutId="point" />}
                            </Item>
                        </Link>
                    ))}
                </Items>
            </Col>
            <Col>
                <SearchBox onSubmit={handleSubmit(onvalid)}>
                    <Magnifify
                        onClick={toggleSearch}
                        width={20}
                        animate={{ x: searchOpen ? -145 : 0 }}
                        transition={{ duration: 0.6 }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
                    </Magnifify>
                    <AnimatePresence>
                        {searchOpen && (
                            <Input
                                {...register("keyword", {
                                    required: "검색어를 입력해주세요",
                                    minLength: {
                                        value: 2,
                                        message: "두글자 이상 입력해주세요",
                                    },
                                })}
                                type="text"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                exit={{ scaleX: 0 }}
                                transition={{ duration: 0.6 }}
                                placeholder="무엇을 찾고싶나요?"
                            />
                        )}
                    </AnimatePresence>
                </SearchBox>
                {/*유저아이콘 <div>
                    <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                    </svg>
                </div> */}
            </Col>
        </Wrap>
    );
}
