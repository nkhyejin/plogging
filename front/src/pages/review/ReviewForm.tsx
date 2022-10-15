import { useForm, useWatch } from "react-hook-form";
// import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { editReview, getOneReview, getReviews, createReview } from "@api/review";
import { IReview, IReviewContent, IReviewUpdateData } from "@type/review";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@atom/user";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { isReviewCancelAtom } from "@atom/atom";
import ReviewModal from "@components/modal/ReviewCancelModal";
import { Wrapper } from "@style/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ReviewForm({ formProps }: { formProps: IReviewUpdateData }) {
  const user = useRecoilValue(userAtom);
  const [isReviewCancelModal, setIsReviewCancelModal] = useRecoilState(isReviewCancelAtom);
  const navigate = useNavigate();
  const [review, setReview] = useState<IReview>();

  const mode = formProps?.type;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IReviewContent>();
  //img preview test
  const [imagePreview, setImagePreview] = useState<any>(null); // any 말고??
  const [uploadImg, setUploadImg] = useState<any>(); // any 말고??
  const image = watch("reviewImg");

  const { isLoading, data } = useQuery<IReview>(["review"], () => getOneReview(formProps?.reviewId!), {
    onSuccess(data) {
      console.log(data);
      setReview(data);
      setImagePreview(data?.reviewImg!);
    },
    enabled: mode === "UPDATE",
  });

  //qeury
  const queryClient = useQueryClient();
  const crateMutation = useMutation(createReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const editMutation = useMutation(editReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  useEffect(() => {
    setIsReviewCancelModal(false);
  }, []);

  // useEffect(() => {
  //   if (isEdit) {
  //     setImagePreview(review?.reviewImg!);
  //   }
  // }, [review]);

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(window.URL.createObjectURL(file as File));
      setUploadImg(file);
    }
  }, [image]);

  const handleSubmitReview = handleSubmit(data => {
    const formData = new FormData();
    formData.append("description", watch("description"));
    switch (mode) {
      case "CREATE":
        const date = new Date();
        formData.append("createAt", date.toString());
        formData.append("file", uploadImg);
        formData.append("name", user?.name!);
        console.log("Create formData", formData);
        crateMutation.mutate(formData);
        // createReview(formData);
        navigate("/review");
        break;

      case "UPDATE":
        formData.append("userId", user?.id!.toString()!);
        formData.append("reviewId", formProps?.reviewId!.toString());

        if (uploadImg) {
          // 사진파일이 변했다면 ,file 객체 전달
          formData.append("file", uploadImg);
        } else {
          // 사진파일이 그대로라면, 이미지 url 전달
          console.log("reviewImg", review?.reviewImg!);
          formData.append("imageUrl", review?.reviewImg! as string);
        }
        // editReview(formData, review?.reviewId!);
        console.log("Update formData", formData.get("reviewId"));
        editMutation.mutate(formData);
        navigate("/review");
        break;
    }
  });

  const handleClickCancel = () => {
    console.log("handleclickcancel");
    setIsReviewCancelModal(true);
  };

  return (
    <>
      <FormWrap>
        <Form as="form" onSubmit={handleSubmitReview}>
          <TitleContainer>
            <Title>플로깅</Title>
            <SubTitle>
              함께한
              <Accent> 생생한 경험</Accent>를 공유해주세요!
            </SubTitle>
          </TitleContainer>
          <ImgBox>
            {image && <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={imagePreview} />}
          </ImgBox>
          <ImgLabel htmlFor="input-file">이미지 업로드</ImgLabel>
          <input id="input-file" type="file" style={{ display: "none" }} {...register("reviewImg")} />
          <SelectInput as="select" height={40}>
            <option>근교산 자락길 모임1</option>
            <option>근교산 자락길 모임2</option>
            <option>근교산 자락길 모임3</option>
            <option>근교산 자락길 모임4</option>
          </SelectInput>

          <ReviewTextArea
            placeholder="내용을 입력해주세요."
            defaultValue={review?.description}
            {...register("description", {
              required: { value: true, message: "내용을 입력해주세요." },
            })}
          />

          <ButtonContainer>
            <Button>{mode === "UPDATE" ? "수정하기" : "등록하기"}</Button>
            <Button className="cancle" type="button" onClick={handleClickCancel}>
              취소
            </Button>
          </ButtonContainer>
          <ReviewModal />
        </Form>
      </FormWrap>
    </>
  );
}

const FormWrap = styled(Wrapper)`
  flex-direction: column;
  background-image: url("/assets/images/walk.jpg");
  margin-top: 50px;
  padding: 50px 250px;
`;
const Form = styled.form`
  width: 700px;
  height: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  color: ${props => props.theme.mainColor};
  text-decoration: underline;
  text-underline-position: under;
  margin-right: 10px;
`;
const SubTitle = styled.p`
  font-size: 18px;
  color: ${props => props.theme.mainColor};
`;
const Accent = styled.span`
  color: ${props => props.theme.dangerColor};
`;

const Button = styled.button`
  width: 180px;
  height: 45px;

  &.cancle {
    background-color: ${props => props.theme.dangerColor};
  }
`;
const Input = styled.input<{ height: number }>`
  width: 550px;
  height: ${props => props.height}px;
  border: solid 1px #a7a7a7;
  margin-bottom: 15px;
`;
const SelectInput = styled(Input)``;
const ImageInput = styled(Input)``;
const ReviewTextArea = styled.textarea`
  width: 550px;
  height: 300px;
  font-size: 16px;
  padding: 10px 10px;
  border: solid 1px #a7a7a7;
  margin-bottom: 15px;
  resize: none;
`;
const ImgLabel = styled.label`
  padding: 6px 25px;
  background-color: ${props => props.theme.mainColor};
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 420px;
  height: 45px;
  justify-content: space-between;
`;
const ImgBox = styled.div`
  width: 400px;
  height: 260px;
  background-color: gray;
  overflow: hidden;
  margin: 0 auto;
`;
const ErrorMessage = styled.div`
  position: absolute;
  font-size: 12px;
  color: ${props => props.theme.dangerColor};
  height: 14px;
  right: 0px;
  bottom: -20px;
`;