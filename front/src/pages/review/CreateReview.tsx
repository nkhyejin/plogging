import ReviewForm from "@components/review/ReviewForm";

const CreateReviewPage = () => {
  /*
  리뷰를 생성하기 위한 initialValue를 prop으로 넘겨주세요.
  import { IReviewFormData } from '@types/review'
  
  const data: IReviewFormData = {
    type: 'CREATE'
  }
*/
  return <ReviewForm {...data} />;
};
export default CreateReviewPage;
