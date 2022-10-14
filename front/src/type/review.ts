export interface IReview {
  name?: string;
  userId?: number; // 작성자
  reviewId?: number;
  description: string;
  createAt?: Date;
  reviewImg?: any;
}

export interface IReviewContent extends Omit<IReview, "createAt"> {}

// 해당 객체에는 리뷰데이터를 생성/수정관련 객체를 전부 넣어주시고 생성인지, 수정인지를 구분할 수 있는 타입을 넣어주세요.
export interface IReviewFormData extends IReview {
  type: "CREATE" | "UPDATE";
}
