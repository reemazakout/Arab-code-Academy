type ReviewCardProps = {
  id?: number; // the api dose not return id
  reviewerName: string;
  reviewerLastName: string;
  reviewText: string;
  rating: number;
  image?: string;
  date: string | number;
};
export default ReviewCardProps;