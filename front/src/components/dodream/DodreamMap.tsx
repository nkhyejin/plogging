/*global kakao*/
import LogoutModal from "@components/modal/LogoutModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DodreamDetail from "@components/modal/DodreamDetail";
import { useRecoilState } from "recoil";
import { isDodreamDetalModalAtom, selectedDodreamAtom } from "@atom/dodream";
import { IDodream } from "@type/dodream";
const { kakao }: any = window;

interface dodream {
  course_category_nm: string;
  course_name: string;
  distance: string;
  area_gu: string;
  lead_time: string;
  course_level: string;
  x: number;
  y: number;
}

export default function DodreamMap({ dodream }: { dodream: IDodream[] }) {
  const [isDodreamDetalModal, setIsDodreamDetalModal] = useRecoilState(isDodreamDetalModalAtom);
  const [selectedDodream, setSelectedDodream] = useRecoilState(selectedDodreamAtom);
  useEffect(() => {
    // 지도생성
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.5587081222, 127.1583825733),
      level: 7,
    };
    let map = new kakao.maps.Map(container, options);

    // 마커 데이터 할당
    let markerPositions = dodream?.map(road => {
      // console.log("-------------", road.x, road.y);
      return {
        title: road.course_name,
        content: road.course_name,
        latlng: new kakao.maps.LatLng(road.x, road.y),
      };
    });
    let imageSrc = "/assets/images/1.png";

    // 데이터 기반 마커 생성
    for (let i = 0; i < markerPositions!.length; i++) {
      let imageSize = new kakao.maps.Size(30, 40);
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerPositions![i].latlng, // 마커를 표시할 위치
        title: markerPositions![i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      let infowindow = new kakao.maps.InfoWindow({
        // 인포윈도우에 표시할 내용
        content: `<div style="width:150px;text-align:center;padding:8px;background-color:#2A9C6B;color:white;">${
          markerPositions![i].content
        }</div>`,
      });
      // 마커에 호버/클릭 이번트 등록하기
      kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
      kakao.maps.event.addListener(marker, "click", () => handleClickMarker(dodream[i]));

      // 마우스 호버 시 함수
      function makeOverListener(map: any, marker: any, infowindow: any) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 마우스 리빙 시 함수
      function makeOutListener(infowindow: any) {
        return function () {
          infowindow.close();
        };
      }
      // 마우스 클릭 시 함수
      function handleClickMarker(dodream: IDodream) {
        console.log(dodream);
        setSelectedDodream(dodream);
        setIsDodreamDetalModal(true);
      }
    }
  }, [dodream]);

  return (
    <>
      <MapBox id="map" />
    </>
  );
}
const MapBox = styled.div`
  width: 700px;
  height: 750px;
  border: 5px solid #88caae;
  border-radius: 10px;
`;
const DescBox = styled.div`
  width: 150px;
  text-align: center;
  padding: 8px;
  background-color: #2a9c6b;
  color: white;
`;
