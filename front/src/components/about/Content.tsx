import React from "react";
import styled from "styled-components";
import ReactFullpage from "@fullpage/react-fullpage";
const anchors = ["firstPage", "secondPage", "thirdPage"];
export default function Content() {
  return (
    <ReactFullpage
      anchors={anchors}
      navigation
      navigationTooltips={anchors}
      sectionsColor={["#f7f7f7", "#C7E1D6", "#d8d8d8"]}
      onLeave={(origin, destination, direction) => {
        console.log("onLeave event", { origin, destination, direction });
      }}
      render={({ state, fullpageApi }) => {
        console.log("render prop change", state, fullpageApi);
        return (
          <ContentWrap>
            <Section01 id="1" className="section">
              <Box>
                <Title>첫번째 컨테츠입니다.</Title>
                <Description>내용입니다.</Description>
              </Box>
            </Section01>
            <Section02 id="2" className="section">
              <Box>
                <Title>두번째 컨테츠입니다.</Title>
                <Description>내용입니다.</Description>
              </Box>
            </Section02>
            <Section03 id="3" className="section">
              <Box>
                <Title>세번째 컨테츠입니다.</Title>
                <Description>내용입니다.</Description>
              </Box>
            </Section03>
          </ContentWrap>
        );
      }}
    />
  );
}
const ContentWrap = styled.div`
  width: 80vw;
  margin-left: 20vw;
  height: 100vw;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Section01 = styled.div`
  height: 100vh;
`;
const Section02 = styled(Section01)``;
const Section03 = styled(Section01)``;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* padding-top: 70px; */
  height: 100vh;
`;
const Title = styled.h1`
  font-size: 36px;
  color: ${props => props.theme.mainColor};
`;
const Description = styled.p`
  font-size: 22px;
  color: ${props => props.theme.textColor};
`;
